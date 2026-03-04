import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { JsonView, ViewToggle, ProjectsSkeleton } from "../ui";
import type { ApiProject, TechStackItem, ViewMode } from "../../types";

export const Projects = () => {
  const { projects, loading, filterCounts } = useProjects();

  const [viewMode, setViewMode] = useState<ViewMode>("ui");
  const [selectedProject, setSelectedProject] = useState<ApiProject | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(6);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<
    "all" | "active" | "completed" | "archived"
  >("all");

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredProjects.length));
  };

  // Filter projects based on status
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  // Get project status color and info
  const getStatusInfo = (project: ApiProject) => {
    const status = project.status || "completed";
    switch (status) {
      case "active":
        return {
          bg: "bg-green-500",
          text: "text-green-500",
          label: "ACTIVE",
        };
      case "completed":
        return {
          bg: "bg-blue-500",
          text: "text-blue-500",
          label: "COMPLETED",
        };
      case "archived":
        return {
          bg: "bg-gray-400",
          text: "text-gray-400",
          label: "ARCHIVED",
        };
      default:
        return {
          bg: "bg-gray-500",
          text: "text-gray-500",
          label: "UNKNOWN",
        };
    }
  };

  // Get project type icon based on tech_stack_display
  const getProjectIcon = (stack: TechStackItem[] = []) => {
    const names = stack.map((t) => t.name.toLowerCase());
    if (names.some((n) => ["react", "vue", "angular", "next.js"].includes(n)))
      return "web";
    if (
      names.some((n) => ["django", "flask", "fastapi", "node.js"].includes(n))
    )
      return "dns";
    if (names.some((n) => ["docker", "kubernetes", "aws"].includes(n)))
      return "cloud";
    if (names.some((n) => ["python", "go", "rust"].includes(n)))
      return "terminal";
    return "folder_open";
  };

  return (
    <div className="w-full flex justify-center px-4 py-8 animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-[90vw] xl:max-w-6xl">
        {/* Main Container */}
        <div className="relative border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#191919]/90 shadow-2xl transition-all duration-300 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-3xl hover:border-blue-500/30 dark:hover:border-blue-400/30">
          {/* Inner Window Container */}
          <div className="relative w-full bg-[#fcfcfa] dark:bg-[#22252a] min-h-[600px] overflow-hidden transition-colors duration-300 flex flex-col">
            {/* Window Header */}
            <div className="w-full h-12 bg-gradient-to-r from-[#e8e8e8] to-[#e3e3e3] dark:from-[#1f2226] dark:to-[#252830] flex items-center justify-between px-4 border-b border-gray-300 dark:border-black/50 sticky top-0 z-30 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/40 dark:bg-black/30 rounded-md text-xs font-mono text-gray-600 dark:text-gray-400 border border-gray-300/50 dark:border-white/10">
                  <span className="material-icons text-[14px] text-blue-600 dark:text-blue-400">
                    folder_open
                  </span>
                  <span className="font-semibold">repositories.list</span>
                </div>
              </div>

              {/* View Toggle */}
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-8 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 flex-1">
              {loading ? (
                <ProjectsSkeleton />
              ) : viewMode === "json" ? (
                <JsonView data={projects} />
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Header */}
                  <div className="border-b border-gray-200 dark:border-white/10 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white font-mono">
                        Deployed_Projects
                      </h1>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono ml-16">
                      <span className="text-gray-400 dark:text-gray-500">
                        //
                      </span>{" "}
                      Click any repository to view README.md
                    </p>

                    {/* Project Stats & Filter */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 ml-16">
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800">
                            {projects.length} Total Projects
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded border border-green-200 dark:border-green-800">
                            {projects.filter((p) => p.live_url).length} Live
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded border border-purple-200 dark:border-purple-800">
                            {projects.filter((p) => p.featured).length} Featured
                          </span>
                        </div>
                      </div>

                      {/* Filter Buttons */}
                      <div className="flex gap-1 bg-gray-100 dark:bg-black/30 p-1 rounded-lg">
                        {(
                          ["all", "active", "completed", "archived"] as const
                        ).map((f) => (
                          <button
                            key={f}
                            onClick={() => {
                              setFilter(f);
                              setVisibleCount(6);
                            }}
                            className={`
                              px-3 py-1.5 text-[10px] sm:text-xs font-mono font-semibold rounded-md transition-all capitalize
                              ${
                                filter === f
                                  ? "bg-white dark:bg-[#2d3139] text-blue-600 dark:text-blue-400 shadow-md"
                                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                              }
                            `}>
                            {f} ({filterCounts[f]})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* No projects message */}
                  {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                      <span className="material-icons text-5xl text-gray-300 dark:text-gray-600 mb-4">
                        folder_off
                      </span>
                      <p className="text-gray-500 font-mono">
                        No {filter} projects found
                      </p>
                    </div>
                  )}

                  {/* Project Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects
                      .slice(0, visibleCount)
                      .map((project, idx) => {
                        const status = getStatusInfo(project);
                        const projectIcon = getProjectIcon(
                          project.tech_stack_display
                        );
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedProject(project)}
                            onMouseEnter={() => setHoveredProject(idx)}
                            onMouseLeave={() => setHoveredProject(null)}
                            className="group relative flex flex-col p-6 rounded-lg bg-white dark:bg-[#2d3139] border border-gray-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-400/50 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl card-hover min-h-[340px]"
                            style={{ animationDelay: `${idx * 50}ms` }}>
                            {/* Featured Badge */}
                            {project.featured && (
                              <div className="absolute -top-2 -right-2 z-10 px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-bold font-mono rounded-full shadow-lg flex items-center gap-1">
                                <span className="material-icons text-[12px]">
                                  star
                                </span>
                                FEATURED
                              </div>
                            )}

                            {/* Status Indicator */}
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${status.bg} ${
                                  hoveredProject === idx ? "animate-pulse" : ""
                                }`}></div>
                              <span
                                className={`text-[9px] font-mono font-bold ${status.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                {status.label}
                              </span>
                            </div>

                            {/* Project Icon */}
                            <div className="mb-4 relative">
                              <div className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110">
                                <span className="material-icons text-5xl">
                                  {projectIcon}
                                </span>
                              </div>
                              <div className="absolute inset-0 blur-2xl bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                            </div>

                            <h3 className="text-lg font-bold font-mono text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                              {project.title}
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-sans leading-relaxed line-clamp-3 flex-grow">
                              {project.description}
                            </p>

                            {/* Quick Links */}
                            <div className="flex gap-2 mb-4">
                              {project.live_url && (
                                <a
                                  href={project.live_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                  <span className="material-icons text-[12px]">
                                    launch
                                  </span>
                                  DEMO
                                </a>
                              )}
                              {project.github_url && (
                                <a
                                  href={project.github_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                  <span className="material-icons text-[12px]">
                                    code
                                  </span>
                                  CODE
                                </a>
                              )}
                            </div>

                            {/* Tech Stack */}
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                                  Stack
                                </span>
                                <span className="text-[10px] font-mono text-gray-400">
                                  {project.tech_stack_display.length}{" "}
                                  {project.tech_stack_display.length === 1
                                    ? "tech"
                                    : "techs"}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {project.tech_stack_display
                                  .slice(0, 4)
                                  .map((tech) => (
                                    <span
                                      key={tech.id}
                                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-gradient-to-br from-gray-100 to-gray-50 dark:from-black/30 dark:to-black/20 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-colors capitalize">
                                      {tech.name}
                                    </span>
                                  ))}
                                {project.tech_stack_display.length > 4 && (
                                  <span className="text-[10px] font-mono px-2.5 py-1 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 rounded-md border border-gray-200 dark:border-white/10">
                                    +{project.tech_stack_display.length - 4}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 rounded-lg transition-all duration-300 pointer-events-none"></div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Show More Button */}
                  {visibleCount < filteredProjects.length && (
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={handleShowMore}
                        className="group flex items-center gap-3 px-8 py-3 text-sm font-mono font-bold text-gray-700 dark:text-gray-300 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5 border-2 border-gray-300 dark:border-white/20 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg transition-all duration-300 active:scale-95">
                        <span className="material-icons text-[18px] group-hover:animate-bounce">
                          expand_more
                        </span>
                        <span>
                          LOAD_MORE_REPOS(){" "}
                          <span className="text-gray-400">
                            // {filteredProjects.length - visibleCount}{" "}
                            remaining
                          </span>
                        </span>
                      </button>
                    </div>
                  )}

                  {/* All Loaded Message */}
                  {visibleCount >= filteredProjects.length &&
                    filteredProjects.length > 6 && (
                      <div className="flex justify-center pt-6">
                        <div className="flex items-center gap-2 px-6 py-3 text-sm font-mono text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <span className="material-icons text-[16px]">
                            check_circle
                          </span>
                          <span>All repositories loaded</span>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="h-7 bg-gradient-to-r from-[#e8e8e8] to-[#e3e3e3] dark:from-[#1f2226] dark:to-[#252830] border-t border-gray-300 dark:border-black/50 flex items-center justify-between px-4 text-[10px] font-mono text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="material-icons text-[12px] text-purple-500">
                    account_tree
                  </span>
                  <span className="font-semibold">main</span>
                </div>
                <div className="hidden sm:block text-gray-400">|</div>
                <div className="hidden sm:flex items-center gap-1">
                  <span className="material-icons text-[10px]">sync</span>
                  <span>synced</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">
                  {Math.min(visibleCount, projects.length)} / {projects.length}{" "}
                  repos
                </span>
                <div className="hidden sm:block text-gray-400">|</div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>0 errors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}>
          <div
            className="w-full max-w-3xl bg-[#fcfcfa] dark:bg-[#22252a] rounded-xl shadow-2xl overflow-hidden border-2 border-gray-300 dark:border-white/20 animate-in zoom-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#e8e8e8] to-[#e3e3e3] dark:from-[#1f2226] dark:to-[#252830] border-b border-gray-300 dark:border-black/50">
              <div className="flex items-center gap-3">
                <span className="material-icons text-[20px] text-blue-600 dark:text-blue-400">
                  description
                </span>
                <div>
                  <div className="text-sm font-mono font-bold text-gray-700 dark:text-gray-300">
                    README.md
                  </div>
                  <div className="text-[10px] font-mono text-gray-500">
                    {selectedProject.title}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                <span className="material-icons text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {/* Project Title */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {selectedProject.title}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                    <span className="material-icons text-[16px] group-hover:rotate-12 transition-transform">
                      launch
                    </span>
                    <span className="font-mono font-bold text-sm">
                      Live Demo
                    </span>
                  </a>
                )}
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg active:scale-95">
                    <span className="material-icons text-[16px] group-hover:rotate-12 transition-transform">
                      code
                    </span>
                    <span className="font-mono font-bold text-sm">
                      Source Code
                    </span>
                  </a>
                )}
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300 font-sans whitespace-pre-wrap">
                  {selectedProject.description}
                </div>
              </div>

              {/* Tech Stack Section */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/0 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-icons text-[16px] text-gray-500">
                    build
                  </span>
                  <h3 className="text-sm font-mono uppercase text-gray-700 dark:text-gray-300 font-bold tracking-wider">
                    Dependencies & Stack
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {selectedProject.tech_stack_display.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#2d3139] border border-gray-300 dark:border-white/20 rounded-lg shadow-sm hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-default group">
                      <span className="text-sm font-mono text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors capitalize">
                        {tech.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 capitalize">
                        {tech.sub_category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
