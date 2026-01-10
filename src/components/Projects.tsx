import { useState } from 'react';
import type { PortfolioData, Project } from "../data";
import { JsonView } from "./JsonView";

export const Projects = ({ data }: { data: PortfolioData }) => {
  const [viewMode, setViewMode] = useState<'ui' | 'json'>('ui');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // 1. Pagination State
  const [visibleCount, setVisibleCount] = useState(6);

  // 2. Show More Handler
  const handleShowMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  return (
    <div className="w-full flex justify-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-[90vw] md:max-w-5xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#191919]/90 shadow-2xl transition-colors duration-300 backdrop-blur-sm rounded-md">
        
        {/* Inner Window Container */}
        <div className="relative w-full bg-[#fcfcfa] dark:bg-[#22252a] min-h-[600px] overflow-hidden group transition-colors duration-300 rounded-md flex flex-col">
            
            {/* Window Header */}
            <div className="w-full h-12 bg-[#e3e3e3] dark:bg-[#1f2226] flex items-center justify-between px-4 border-b border-gray-300 dark:border-black/50 z-20 sticky top-0">
                <div className="flex items-center gap-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-black/20 rounded text-xs font-mono text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/5">
                        <span className="material-icons text-[14px] text-blue-400">folder_open</span>
                        <span>repositories.list</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 bg-gray-200 dark:bg-black/20 p-1 rounded-md">
                    <button onClick={() => setViewMode('ui')} className={`px-3 py-1 rounded text-[10px] sm:text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${viewMode === 'ui' ? 'bg-white dark:bg-[#2d3139] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                        <span className="material-icons text-[12px]">grid_view</span>
                        GUI
                    </button>
                    <button onClick={() => setViewMode('json')} className={`px-3 py-1 rounded text-[10px] sm:text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${viewMode === 'json' ? 'bg-white dark:bg-[#2d3139] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                        <span className="material-icons text-[12px]">data_object</span>
                        JSON
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-8 overflow-y-auto max-h-[80vh]">
                {viewMode === 'json' ? (
                   /* JSON View (Now wraps correctly due to update in JsonView.tsx) */
                   <JsonView data={data.projects} />
                ) : (
                  <div className="space-y-8">
                    {/* Intro */}
                    <div className="border-b border-gray-200 dark:border-white/5 pb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white font-mono mb-2">
                            Deployed_Projects
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            // Select a repository to view "README.md"
                        </p>
                    </div>

                    {/* Project Grid - Sliced by visibleCount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.projects.slice(0, visibleCount).map((project, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedProject(project)}
                          className="group relative flex flex-col p-6 rounded bg-white dark:bg-[#2d3139] border border-gray-200 dark:border-black/20 hover:border-primary/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                          {/* Folder Icon */}
                          <div className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors">
                              <span className="material-icons text-3xl">folder</span>
                          </div>

                          <h3 className="text-lg font-bold font-mono text-gray-800 dark:text-white mb-2 group-hover:text-primary transition-colors">
                              {project.title}
                          </h3>
                          
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-sans leading-relaxed line-clamp-2">
                              {project.desc}
                          </p>

                          {/* Tech Stack */}
                          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                              <div className="flex flex-wrap gap-2">
                                  {project.stack.slice(0, 3).map((tech) => (
                                      <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded bg-gray-100 dark:bg-black/20 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5">
                                          {tech}
                                      </span>
                                  ))}
                                  {project.stack.length > 3 && (
                                      <span className="text-[10px] font-mono px-2 py-1 text-gray-400">
                                          +{project.stack.length - 3}
                                      </span>
                                  )}
                              </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 3. SHOW MORE BUTTON */}
                    {visibleCount < data.projects.length && (
                        <div className="flex justify-center pt-4">
                            <button 
                                onClick={handleShowMore}
                                className="flex items-center gap-2 px-6 py-2 text-xs font-mono font-bold text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 rounded hover:bg-gray-100 dark:hover:bg-white/5 hover:text-primary transition-all active:scale-95"
                            >
                                <span className="material-icons text-[14px]">expand_more</span>
                                LOAD_MORE_REPOS()
                            </button>
                        </div>
                    )}

                  </div>
                )}
            </div>

            {/* STATUS BAR */}
            <div className="h-6 bg-[#e3e3e3] dark:bg-[#1f2226] border-t border-gray-300 dark:border-black/50 flex items-center justify-between px-4 text-[10px] font-mono text-gray-500">
                <div className="flex items-center gap-2">
                     <span className="material-icons text-[10px]">branch</span>
                     <span>main</span>
                </div>
                <div className="flex items-center gap-4">
                    {/* Updates to show currently visible count */}
                    <span>{Math.min(visibleCount, data.projects.length)} of {data.projects.length} repos</span>
                    <span>0 errors</span>
                </div>
            </div>
        </div>
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedProject(null)}>
            <div className="w-full max-w-2xl bg-[#fcfcfa] dark:bg-[#22252a] rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-4 py-3 bg-[#e3e3e3] dark:bg-[#1f2226] border-b border-gray-300 dark:border-black/50">
                    <div className="flex items-center gap-2 text-sm font-mono text-gray-600 dark:text-gray-300">
                        <span className="material-icons text-[16px]">description</span>
                        README.md
                    </div>
                    <button onClick={() => setSelectedProject(null)} className="text-gray-500 hover:text-red-500 transition-colors">
                        <span className="material-icons">close</span>
                    </button>
                </div>
                
                <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex gap-2 mb-6">
                        {selectedProject.liveLink && (
                            <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded hover:opacity-80 transition-opacity">
                                <span className="material-icons text-[12px]">launch</span> Live Demo
                            </a>
                        )}
                        {selectedProject.githubLink && (
                            <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded hover:opacity-80 transition-opacity">
                                <span className="material-icons text-[12px]">code</span> Source Code
                            </a>
                        )}
                    </div>
                    <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-gray-600 dark:text-gray-300 font-sans">
                         <p className="whitespace-pre-wrap">{selectedProject.fullDesc || selectedProject.desc}</p>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xs font-mono uppercase text-gray-400 mb-3">Dependencies</h3>
                        <div className="flex flex-wrap gap-2">
                             {selectedProject.stack.map(tech => (
                                 <span key={tech} className="px-3 py-1 text-xs font-mono bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded text-gray-600 dark:text-gray-400">
                                     {tech}
                                 </span>
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