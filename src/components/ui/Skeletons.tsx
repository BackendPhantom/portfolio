import { memo } from "react";

/* ── Shared shimmer pulse ────────────────────────────────────────────────── */
const shimmer =
  "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-white/10 dark:via-white/20 dark:to-white/10 rounded";

/* ── Generic bar ─────────────────────────────────────────────────────────── */
const Bar = ({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => <div className={`${shimmer} ${className}`} style={style} />;

const SKILL_WIDTHS = [72, 85, 63, 90, 68];

/* ── Skeleton for a single skill category card (matches Skills grid) ──── */
export const SkillCardSkeleton = memo(() => (
  <div className="relative p-5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2d3139] min-h-[220px]">
    {/* Category badge placeholder */}
    <div className="absolute -top-3.5 left-4">
      <Bar className="h-6 w-28" />
    </div>
    {/* Skill rows */}
    <div className="space-y-3 mt-6">
      {SKILL_WIDTHS.map((w, i) => (
        <div key={i} className="flex items-center gap-2 px-2">
          <Bar className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
          <Bar className="h-4" style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>
  </div>
));
SkillCardSkeleton.displayName = "SkillCardSkeleton";

/* ── Full skills page skeleton ────────────────────────────────────────── */
export const SkillsSkeleton = memo(() => (
  <div className="space-y-10">
    {/* Header */}
    <div className="border-b border-gray-200 dark:border-white/10 pb-6">
      <div className="flex items-center gap-3 mb-4">
        <Bar className="h-1 w-12" />
        <Bar className="h-8 w-64" />
      </div>
      <Bar className="h-4 w-80 ml-16" />
      <div className="flex flex-wrap gap-4 mt-6 ml-16">
        <Bar className="h-7 w-36" />
        <Bar className="h-7 w-28" />
        <Bar className="h-7 w-32" />
      </div>
    </div>
    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkillCardSkeleton key={i} />
      ))}
    </div>
  </div>
));
SkillsSkeleton.displayName = "SkillsSkeleton";

/* ── Skeleton for a single project card (matches Projects grid) ──────── */
export const ProjectCardSkeleton = memo(() => (
  <div className="relative flex flex-col p-6 rounded-lg bg-white dark:bg-[#2d3139] border border-gray-200 dark:border-white/10 min-h-[340px]">
    {/* Icon placeholder */}
    <Bar className="h-12 w-12 rounded-lg mb-4" />
    {/* Title */}
    <Bar className="h-5 w-3/4 mb-3" />
    {/* Description lines */}
    <div className="space-y-2 mb-4 flex-grow">
      <Bar className="h-3 w-full" />
      <Bar className="h-3 w-5/6" />
      <Bar className="h-3 w-2/3" />
    </div>
    {/* Quick links */}
    <div className="flex gap-2 mb-4">
      <Bar className="h-6 w-16 rounded-md" />
      <Bar className="h-6 w-16 rounded-md" />
    </div>
    {/* Tech stack */}
    <div className="pt-4 border-t border-gray-100 dark:border-white/5">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bar key={i} className="h-6 w-16 rounded-md" />
        ))}
      </div>
    </div>
  </div>
));
ProjectCardSkeleton.displayName = "ProjectCardSkeleton";

/* ── Full projects page skeleton ──────────────────────────────────────── */
export const ProjectsSkeleton = memo(() => (
  <div className="space-y-8">
    {/* Header */}
    <div className="border-b border-gray-200 dark:border-white/10 pb-6">
      <div className="flex items-center gap-3 mb-4">
        <Bar className="h-1 w-12" />
        <Bar className="h-8 w-56" />
      </div>
      <Bar className="h-4 w-72 ml-16" />
      <div className="flex flex-wrap gap-4 mt-6 ml-16">
        <Bar className="h-7 w-32" />
        <Bar className="h-7 w-20" />
        <Bar className="h-7 w-28" />
      </div>
    </div>
    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  </div>
));
ProjectsSkeleton.displayName = "ProjectsSkeleton";

/* ── Home stats skeleton ──────────────────────────────────────────────── */
export const HomeStatsSkeleton = memo(() => (
  <div className="grid grid-cols-3 gap-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="text-center p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
        <Bar className="h-7 w-10 mx-auto mb-2" />
        <Bar className="h-3 w-16 mx-auto" />
      </div>
    ))}
  </div>
));
HomeStatsSkeleton.displayName = "HomeStatsSkeleton";
