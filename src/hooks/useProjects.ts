import { useState, useEffect, useMemo, useRef } from "react";
import type { ApiProject } from "../types";
import api from "../lib/api";
import { getCached, setCache } from "../lib/cache";

const CACHE_KEY = "projects";

export function useProjects() {
  const cached = getCached<ApiProject[]>(CACHE_KEY);
  const [projects, setProjects] = useState<ApiProject[]>(cached ?? []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<Error | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const isRevalidation = !!cached;

    const fetchProjects = async () => {
      try {
        const { data: res } = await api.get("/projects/my-projects/");
        const data = res.results || [];
        setProjects(data);
        setCache(CACHE_KEY, data);
      } catch (err) {
        if (!isRevalidation) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch projects")
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filterCounts = useMemo(
    () => ({
      all: projects.length,
      active: projects.filter((p) => p.status === "active").length,
      completed: projects.filter((p) => p.status === "completed").length,
      archived: projects.filter((p) => p.status === "archived").length,
    }),
    [projects]
  );

  return { projects, loading, error, filterCounts };
}
