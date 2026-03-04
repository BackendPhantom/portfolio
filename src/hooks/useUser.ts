import { useState, useEffect, useRef } from "react";
import type { ApiUser } from "../types";
import api from "../lib/api";
import { getCached, setCache } from "../lib/cache";

const CACHE_KEY = "user_profile";

export function useUser() {
  const cached = getCached<ApiUser>(CACHE_KEY);
  const [user, setUser] = useState<ApiUser | null>(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<Error | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    // If we have cache, still revalidate in background
    const isRevalidation = !!cached;

    const fetchUser = async () => {
      try {
        const { data } = await api.get<ApiUser>("/users/me/");
        setUser(data);
        setCache(CACHE_KEY, data);
      } catch (err) {
        if (!isRevalidation) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to fetch user profile")
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { user, loading, error };
}
