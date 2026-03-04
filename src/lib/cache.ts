/**
 * Lightweight in-memory + sessionStorage API cache.
 * Prevents redundant fetches across component mounts and
 * survives soft-navigations within the same browser tab.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

const memoryCache = new Map<string, CacheEntry<unknown>>();

function storageKey(key: string) {
  return `api_cache:${key}`;
}

function isExpired(entry: CacheEntry<unknown>, ttl: number): boolean {
  return Date.now() - entry.timestamp > ttl;
}

export function getCached<T>(key: string, ttl = DEFAULT_TTL): T | null {
  // 1. Check memory (fastest)
  const mem = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (mem && !isExpired(mem, ttl)) return mem.data;

  // 2. Check sessionStorage (survives re-mounts)
  try {
    const raw = sessionStorage.getItem(storageKey(key));
    if (raw) {
      const entry: CacheEntry<T> = JSON.parse(raw);
      if (!isExpired(entry, ttl)) {
        // Promote back to memory
        memoryCache.set(key, entry);
        return entry.data;
      }
      sessionStorage.removeItem(storageKey(key));
    }
  } catch {
    // sessionStorage unavailable or corrupted — ignore
  }

  return null;
}

export function setCache<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, timestamp: Date.now() };

  memoryCache.set(key, entry as CacheEntry<unknown>);

  try {
    sessionStorage.setItem(storageKey(key), JSON.stringify(entry));
  } catch {
    // Storage full or unavailable — memory cache still works
  }
}

export function invalidateCache(key: string): void {
  memoryCache.delete(key);
  try {
    sessionStorage.removeItem(storageKey(key));
  } catch {
    // ignore
  }
}

export function clearAllCache(): void {
  memoryCache.clear();
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k?.startsWith("api_cache:")) toRemove.push(k);
    }
    toRemove.forEach((k) => sessionStorage.removeItem(k));
  } catch {
    // ignore
  }
}
