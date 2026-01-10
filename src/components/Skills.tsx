import { useState } from 'react';
import { PortfolioData } from "../data";
import { JsonView } from "./JsonView";

export const Skills = ({ data }: { data: PortfolioData }) => {
  const [viewMode, setViewMode] = useState<'ui' | 'json'>('ui');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Combine soft and technical for JSON view, but keep separate for UI
  const allSkills = { ...data.technicalSkills, soft: data.softSkills };

  return (
    <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="glass-card border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-surface-dark/90 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden transition-colors duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 p-6">
          <div className="flex items-center gap-3">
             <span className="material-icons text-primary animate-pulse">memory</span>
             <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-mono uppercase tracking-wider">
                System_Modules
             </h2>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-black/40 rounded p-1 font-mono text-xs">
             <button onClick={() => setViewMode('ui')} className={`px-3 py-1 rounded transition-colors ${viewMode === 'ui' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}>UI</button>
             <button onClick={() => setViewMode('json')} className={`px-3 py-1 rounded transition-colors ${viewMode === 'json' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}>JSON</button>
          </div>
        </div>

        <div className="p-6 md:p-10">
          {viewMode === 'json' ? (
             <JsonView data={allSkills} />
          ) : (
            <div className="space-y-12">
              
              {/* Technical Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.technicalSkills.map((group, idx) => (
                  <div 
                    key={idx}
                    onMouseEnter={() => setHoveredCategory(group.category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`
                        relative p-6 rounded-lg border transition-all duration-300 group
                        ${hoveredCategory === group.category 
                            ? 'border-primary bg-primary/5 dark:bg-primary/5 -translate-y-1 shadow-lg' 
                            : 'border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5'}
                    `}
                  >
                    {/* Category Label */}
                    <div className="absolute -top-3 left-4 px-2 bg-white dark:bg-[#121212] text-xs font-mono text-primary border border-gray-200 dark:border-white/10 rounded">
                        {group.category}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {group.items.map((skill) => (
                            <span 
                                key={skill.name} 
                                className="px-3 py-1.5 text-sm font-mono text-gray-700 dark:text-gray-300 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded hover:border-primary hover:text-primary transition-colors cursor-default select-none"
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Soft Skills "Processor" Bar */}
              <div className="border-t border-gray-200 dark:border-white/10 pt-8">
                  <h3 className="text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest pl-1">
                    // Core_Competencies
                  </h3>
                  <div className="flex flex-wrap gap-4">
                      {data.softSkills.map((skill, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-primary hover:text-white dark:hover:text-black transition-all duration-300 cursor-default transform hover:scale-105"
                          >
                              <span className="material-icons text-base opacity-50">bolt</span>
                              {skill}
                          </div>
                      ))}
                  </div>
              </div>

            </div>
          )}
        </div>
        
        {/* Footer Decoration */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20"></div>
      </div>
    </div>
  );
};