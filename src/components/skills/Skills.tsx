import { useState, useMemo } from "react";
import { useSkills } from "../../hooks/useSkills";
import { JsonView, ViewToggle, SkillsSkeleton } from "../ui";
import type { ViewMode } from "../../types";

export const Skills = () => {
  const { loading, technicalSkillGroups, softSkills, totalTechnicalCount } =
    useSkills();

  const [viewMode, setViewMode] = useState<ViewMode>("ui");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allSkills = {
    technicalSkills: technicalSkillGroups,
    softSkills: softSkills.map((s) => s.name),
  };

  // Filter skills based on search query
  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return technicalSkillGroups;

    const query = searchQuery.toLowerCase();
    return technicalSkillGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (skill) =>
            skill.name.toLowerCase().includes(query) ||
            group.category.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [technicalSkillGroups, searchQuery]);

  // Get category icon based on sub_category name
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      language: "💻",
      framework: "⚡",
      library: "📚",
      database: "🗄️",
      tool: "🔧",
      cloud: "☁️",
      testing: "✅",
      devops: "🚀",
      frontend: "🎨",
      backend: "⚙️",
      mobile: "📱",
      other: "📦",
    };
    return icons[category.toLowerCase()] || "📦";
  };

  const filteredSkillsCount = filteredSkills.reduce(
    (acc, group) => acc + group.items.length,
    0
  );

  return (
    <div className="w-full flex justify-center px-4 py-8 animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-[90vw] xl:max-w-6xl">
        {/* Main Container */}
        <div className="relative border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#191919]/90 shadow-2xl transition-all duration-300 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-3xl hover:border-blue-500/30 dark:hover:border-blue-400/30">
          {/* Inner Window Container */}
          <div className="relative w-full bg-[#fcfcfa] dark:bg-[#22252a] min-h-[600px] overflow-hidden transition-colors duration-300 flex flex-col">
            {/* Window Header (IDE Style) */}
            <div className="w-full h-12 bg-gradient-to-r from-[#e8e8e8] to-[#e3e3e3] dark:from-[#1f2226] dark:to-[#252830] flex items-center justify-between px-4 border-b border-gray-300 dark:border-black/50 sticky top-0 z-30 backdrop-blur-sm">
              {/* Left: Window Controls + Filename */}
              <div className="flex items-center gap-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/40 dark:bg-black/30 rounded-md text-xs font-mono text-gray-600 dark:text-gray-400 border border-gray-300/50 dark:border-white/10">
                  <span className="material-icons text-[14px] text-blue-600 dark:text-blue-400">
                    dns
                  </span>
                  <span className="font-semibold">stack.config</span>
                </div>
              </div>

              {/* Right: View Toggle */}
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-8 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 flex-1">
              {loading ? (
                <SkillsSkeleton />
              ) : viewMode === "json" ? (
                <JsonView data={allSkills} />
              ) : (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Header Text */}
                  <div className="border-b border-gray-200 dark:border-white/10 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white font-mono">
                        System_Capabilities
                      </h1>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono ml-16">
                      <span className="text-gray-400 dark:text-gray-500">
                        //
                      </span>{" "}
                      Loaded modules and core competencies
                    </p>

                    {/* Stats Summary + Search */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 ml-16">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800">
                            {totalTechnicalCount} Technical Skills
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded border border-green-200 dark:border-green-800">
                            {softSkills.length} Soft Skills
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded border border-purple-200 dark:border-purple-800">
                            {technicalSkillGroups.length} Categories
                          </span>
                        </div>
                      </div>

                      {/* Search Input */}
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-[18px] text-gray-400">
                          search
                        </span>
                        <input
                          type="text"
                          placeholder="Search skills..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm font-mono bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <span className="material-icons text-[16px]">
                              close
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Search results indicator */}
                    {searchQuery && (
                      <div className="mt-4 ml-16 text-sm font-mono text-gray-500">
                        Showing {filteredSkillsCount} of {totalTechnicalCount}{" "}
                        skills
                      </div>
                    )}
                  </div>

                  {/* No results message */}
                  {filteredSkills.length === 0 && (
                    <div className="text-center py-12">
                      <span className="material-icons text-5xl text-gray-300 dark:text-gray-600 mb-4">
                        search_off
                      </span>
                      <p className="text-gray-500 font-mono">
                        No skills found matching "{searchQuery}"
                      </p>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="mt-4 text-sm text-blue-500 hover:text-blue-600 font-mono">
                        Clear search
                      </button>
                    </div>
                  )}

                  {/* Technical Skills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((group, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredCategory(group.category)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        className={`
                                relative p-5 rounded-lg border transition-all duration-300 group card-hover min-h-[220px]
                                ${
                                  hoveredCategory === group.category
                                    ? "border-blue-500/50 dark:border-blue-400/50 bg-blue-50/50 dark:bg-blue-900/10 shadow-xl shadow-blue-500/10"
                                    : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#2d3139]"
                                }
                            `}
                        style={{
                          animationDelay: `${idx * 50}ms`,
                        }}>
                        {/* Category Header with Icon */}
                        <div className="absolute -top-3.5 left-4 flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-[#1f2226] dark:to-[#252830] text-xs font-mono font-bold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/20 rounded-lg shadow-sm">
                          <span className="text-base">
                            {getCategoryIcon(group.category)}
                          </span>
                          <span className="uppercase tracking-wider">
                            {group.category}
                          </span>
                        </div>

                        {/* Skills List */}
                        <div className="space-y-1 mt-4">
                          {group.items.map((skill) => (
                            <div
                              key={skill.id}
                              onClick={() =>
                                setSelectedSkill(
                                  selectedSkill === skill.name
                                    ? null
                                    : skill.name
                                )
                              }
                              className="group/skill cursor-pointer select-none">
                              <div className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                                    selectedSkill === skill.name
                                      ? "bg-blue-500"
                                      : "bg-gray-400 group-hover/skill:bg-blue-500"
                                  }`}></span>
                                <span className="text-sm font-mono text-gray-700 dark:text-gray-300 group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 transition-colors capitalize">
                                  {skill.name}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Skill count indicator */}
                        {/* <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/10">
                          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                            {group.items.length}{" "}
                            {group.items.length === 1 ? "skill" : "skills"}
                          </span>
                        </div> */}
                      </div>
                    ))}
                  </div>

                  {/* Soft Skills Section (Terminal Style) */}
                  <div className="mt-8 rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#1e1e1e] border border-gray-700 dark:border-gray-600 shadow-2xl overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700">
                      <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-widest">
                        <span className="material-icons text-[14px] text-green-500">
                          terminal
                        </span>
                        <span className="text-gray-300">
                          core_competencies.log
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                        <span className="text-[10px] text-gray-500 font-mono">
                          RUNNING
                        </span>
                      </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
                        {softSkills.map((skill, i) => (
                          <div
                            key={skill.id}
                            className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors cursor-default group"
                            style={{ animationDelay: `${i * 100}ms` }}>
                            <span className="text-green-500 group-hover:scale-125 transition-transform">
                              ➜
                            </span>
                            <span className="group-hover:translate-x-1 transition-transform capitalize">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-gray-400">
                          <span className="text-green-500">➜</span>
                          <span className="animate-pulse w-2 h-4 bg-green-500 block"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="h-7 bg-gradient-to-r from-[#e8e8e8] to-[#e3e3e3] dark:from-[#1f2226] dark:to-[#252830] border-t border-gray-300 dark:border-black/50 flex items-center justify-between px-4 text-[10px] font-mono text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-semibold">System: Online</span>
                </div>
                <div className="hidden sm:block text-gray-400">|</div>
                <div className="hidden sm:block">
                  {technicalSkillGroups.length} modules loaded
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block">UTF-8</div>
                <div className="hidden md:block">TypeScript React</div>
                <div className="text-gray-500">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
