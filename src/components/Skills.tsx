import { useState } from 'react';
import type { PortfolioData } from "../data";
import { JsonView } from "./JsonView";

export const Skills = ({ data }: { data: PortfolioData }) => {
  const [viewMode, setViewMode] = useState<'ui' | 'json'>('ui');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const allSkills = { ...data.technicalSkills, soft: data.softSkills };

  return (
    <div className="w-full flex justify-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-[90vw] md:max-w-5xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#191919]/90 shadow-2xl transition-colors duration-300 backdrop-blur-sm rounded-md">
        
        {/* Inner Window Container */}
        <div className="relative w-full bg-[#fcfcfa] dark:bg-[#22252a] min-h-[600px] overflow-hidden group transition-colors duration-300 rounded-md flex flex-col">
            
            {/* Window Header (IDE Style) */}
            <div className="w-full h-12 bg-[#e3e3e3] dark:bg-[#1f2226] flex items-center justify-between px-4 border-b border-gray-300 dark:border-black/50 z-20 sticky top-0">
                
                {/* Left: Window Controls + Filename */}
                <div className="flex items-center gap-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-black/20 rounded text-xs font-mono text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/5">
                        <span className="material-icons text-[14px] text-primary">dns</span>
                        <span>stack.config</span>
                    </div>
                </div>

                {/* Right: View Toggle (Tab Style) */}
                <div className="flex items-center gap-1 bg-gray-200 dark:bg-black/20 p-1 rounded-md">
                    <button 
                        onClick={() => setViewMode('ui')}
                        className={`
                            px-3 py-1 rounded text-[10px] sm:text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5
                            ${viewMode === 'ui' 
                                ? 'bg-white dark:bg-[#2d3139] text-primary shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}
                        `}
                    >
                        <span className="material-icons text-[12px]">grid_view</span>
                        GUI_VIEW
                    </button>
                    <button 
                        onClick={() => setViewMode('json')}
                        className={`
                            px-3 py-1 rounded text-[10px] sm:text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5
                            ${viewMode === 'json' 
                                ? 'bg-white dark:bg-[#2d3139] text-primary shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}
                        `}
                    >
                        <span className="material-icons text-[12px]">data_object</span>
                        JSON_VIEW
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-8 overflow-y-auto max-h-[80vh]">
                {viewMode === 'json' ? (
                   <JsonView data={allSkills} />
                ) : (
                  <div className="space-y-10">
                    
                    {/* Header Text */}
                    <div className="border-b border-gray-200 dark:border-white/5 pb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white font-mono mb-2">
                            System_Capabilities
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            // Loaded modules and core competencies
                        </p>
                    </div>

                    {/* Technical Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data.technicalSkills.map((group, idx) => (
                        <div 
                          key={idx}
                          onMouseEnter={() => setHoveredCategory(group.category)}
                          onMouseLeave={() => setHoveredCategory(null)}
                          className={`
                              relative p-5 rounded border transition-all duration-300 group
                              ${hoveredCategory === group.category 
                                  ? 'border-primary/50 bg-primary/5 -translate-y-1 shadow-lg shadow-primary/5' 
                                  : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#2d3139]'}
                          `}
                        >
                          {/* Folder Tab Effect */}
                          <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-[#e3e3e3] dark:bg-[#1f2226] text-[10px] font-mono font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#333] rounded uppercase tracking-wider">
                              {group.category}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2">
                              {group.items.map((skill) => (
                                  <div 
                                      key={skill.name} 
                                      className="group/tag flex items-center gap-2 px-2 py-1.5 text-xs font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#1f2226] border border-gray-200 dark:border-black/20 rounded hover:border-primary/50 hover:text-primary transition-colors cursor-default select-none w-full sm:w-auto"
                                  >
                                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover/tag:bg-primary transition-colors"></span>
                                      {skill.name}
                                  </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Soft Skills Section (Terminal Style) */}
                    <div className="mt-8 p-6 rounded bg-[#1e1e1e] border border-[#333]">
                        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-[#333] pb-2">
                          <span className="material-icons text-[14px]">terminal</span>
                          <span>core_competencies.log</span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
                            {data.softSkills.map((skill, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                                    <span className="text-green-500">➜</span>
                                    <span>{skill}</span>
                                </div>
                            ))}
                            <div className="flex items-center gap-2 text-gray-400">
                                <span className="text-green-500">➜</span>
                                <span className="animate-pulse w-2 h-4 bg-gray-500 block"></span>
                            </div>
                        </div>
                    </div>

                  </div>
                )}
            </div>
            
            {/* Status Bar */}
            <div className="h-6 bg-[#e3e3e3] dark:bg-[#1f2226] border-t border-gray-300 dark:border-black/50 flex items-center justify-end px-4 text-[10px] font-mono text-gray-500 gap-4">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>System: Online</span>
                </div>
                <div>UTF-8</div>
                <div>TypeScript React</div>
            </div>

        </div>
      </div>
    </div>
  );
};