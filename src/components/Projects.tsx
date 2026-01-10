import { useState } from 'react';
import { PortfolioData, Project } from "../data";
import { JsonView } from "./JsonView";

// Modal Component
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="p-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white font-mono">{project.title}</h2>
                    <p className="text-sm text-primary font-mono mt-1">{project.date}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                    <span className="material-icons">close</span>
                </button>
            </div>

            <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded border-l-2 border-primary">
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {project.fullDesc || project.desc}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.stack.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-xs font-mono">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center bg-primary hover:bg-primary-dark text-black font-bold rounded transition-colors flex items-center justify-center gap-2">
                        <span className="material-icons text-sm">open_in_new</span> Live Demo
                    </a>
                )}
                {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center border border-white/20 hover:bg-white/5 text-white rounded transition-colors flex items-center justify-center gap-2">
                        <span className="material-icons text-sm">code</span> View Code
                    </a>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export const Projects = ({ data }: { data: PortfolioData }) => {
  const [viewMode, setViewMode] = useState<'ui' | 'json'>('ui');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsToShow = data.projects.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, data.projects.length));
  };

  return (
    <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="glass-card border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-surface-dark/90 backdrop-blur-md rounded-lg shadow-2xl p-6 md:p-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-300 dark:border-white/10 pb-4">
            <h2 className="text-2xl font-bold dark:text-white font-mono uppercase tracking-wider">
                Mission_Logs
            </h2>
            <div className="flex bg-gray-200 dark:bg-black/40 rounded p-1 font-mono text-xs">
                 <button 
                   onClick={() => setViewMode('ui')}
                   className={`px-3 py-1 rounded transition-colors ${viewMode === 'ui' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}
                 >UI</button>
                 <button 
                   onClick={() => setViewMode('json')}
                   className={`px-3 py-1 rounded transition-colors ${viewMode === 'json' ? 'bg-white dark:bg-white/10 shadow text-primary' : 'text-gray-500'}`}
                 >JSON</button>
            </div>
        </div>

        {viewMode === 'ui' ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsToShow.map((project, idx) => (
                        <div 
                            key={idx}
                            onClick={() => setSelectedProject(project)}
                            className="group cursor-pointer border border-gray-300 dark:border-white/10 p-6 bg-white/50 dark:bg-black/20 hover:border-primary transition-all duration-300 flex flex-col justify-between h-64 rounded-lg hover:-translate-y-2 hover:shadow-neon relative overflow-hidden animate-in fade-in zoom-in-95"
                            style={{ animationFillMode: 'both', animationDelay: `${idx * 100}ms` }}
                        >
                             {/* Hover Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                                        {project.title}
                                    </h3>
                                    <span className="material-icons text-gray-400 text-sm group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-2">
                                        open_in_full
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-text-dim line-clamp-3 font-mono leading-relaxed">
                                    {project.desc}
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/5 flex flex-wrap gap-2">
                                {project.stack.slice(0, 3).map(tech => (
                                    <span key={tech} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                                {project.stack.length > 3 && (
                                    <span className="text-xs font-mono text-gray-500 py-1">+{project.stack.length - 3}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                {visibleCount < data.projects.length && (
                    <div className="flex justify-center mt-12">
                        <button 
                            onClick={handleShowMore}
                            className="group flex items-center gap-2 px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black font-bold font-mono text-sm rounded transition-all uppercase tracking-wider"
                        >
                            <span className="material-icons group-hover:translate-y-1 transition-transform">expand_more</span>
                            Load_More_Data
                        </button>
                    </div>
                )}
            </>
        ) : (
            <JsonView data={data.projects} />
        )}

        {/* Modal */}
        {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}

      </div>
    </div>
  );
};