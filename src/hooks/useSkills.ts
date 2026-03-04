import { useState, useEffect, useMemo, useRef } from "react";
import type { ApiSkill } from "../types";
import api from "../lib/api";
import { getCached, setCache } from "../lib/cache";

const CACHE_KEY = "skills";

export function useSkills() {
  const cached = getCached<ApiSkill[]>(CACHE_KEY);
  const [skills, setSkills] = useState<ApiSkill[]>(cached ?? []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<Error | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const isRevalidation = !!cached;

    const fetchSkills = async () => {
      try {
        const { data: res } = await api.get("/skills/");
        const data = res.results || [];
        setSkills(data);
        setCache(CACHE_KEY, data);
      } catch (err) {
        if (!isRevalidation) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch skills")
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Group technical skills by sub_category
  const technicalSkillGroups = useMemo(() => {
    const techSkills = skills.filter((s) => s.category === "technical skills");
    const groups: Record<string, ApiSkill[]> = {};
    techSkills.forEach((skill) => {
      const key = skill.sub_category || "other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(skill);
    });
    return Object.entries(groups).map(([category, items]) => ({
      category,
      items,
    }));
  }, [skills]);

  const softSkills = useMemo(
    () => skills.filter((s) => s.category === "soft skills"),
    [skills]
  );

  const totalTechnicalCount = technicalSkillGroups.reduce(
    (acc, group) => acc + group.items.length,
    0
  );

  return {
    skills,
    loading,
    error,
    technicalSkillGroups,
    softSkills,
    totalTechnicalCount,
  };
}
