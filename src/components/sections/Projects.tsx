import { usePortfolioData } from '../../hooks/usePortfolioData';

export function Projects() {
  const { data, isLoading, error } = usePortfolioData();

  if (isLoading || error || !data) {
    return null;
  }

  return (
    <section 
      id="projects" 
      className="w-full px-4 md:px-6 max-w-[1120px] mx-auto pt-16 flex flex-col gap-12 md:gap-16"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-8 bg-[#1C1B1B] dark:bg-[#FDF8F8]"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C1B1B] dark:text-[#FDF8F8]">
            Systems Log
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1C1B1B] dark:text-[#FDF8F8]">
          Executed Architecture.
        </h2>
      </div>

      {/* --- FEATURED PROJECTS --- */}
      <div className="flex flex-col gap-6">
        <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#5F5E5E] dark:text-[#A3A3A3] mb-2">
          Featured Deployments
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {data.featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-[#FFFFFF] dark:bg-[#232121] border border-[#E5E2E1] dark:border-[#333333] rounded-[24px] p-6 md:p-8 flex flex-col h-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span 
                    key={tech} 
                    className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#E5E2E1] dark:border-[#333333] bg-[#FDF8F8] dark:bg-[#1C1B1B] text-[#5F5E5E] dark:text-[#A3A3A3]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h4 className="text-xl font-bold tracking-tight text-[#1C1B1B] dark:text-[#FDF8F8] mb-3">
                {project.title}
              </h4>
              <p className="text-[13px] md:text-[14px] text-[#5F5E5E] dark:text-[#A3A3A3] leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="flex items-center gap-6 mt-auto pt-4 border-t border-[#E5E2E1] dark:border-[#333333]">
                {/* Mandatory GitHub Link */}
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold uppercase tracking-widest text-[#1C1B1B] dark:text-[#FDF8F8] hover:text-[#5F5E5E] dark:hover:text-[#A3A3A3] transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  Source
                </a>
                
                {/* Customizable Live Link */}
                {project.liveLink && (
                  <a 
                    href={project.liveLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold uppercase tracking-widest text-[#1C1B1B] dark:text-[#FDF8F8] hover:text-[#5F5E5E] dark:hover:text-[#A3A3A3] transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    {project.liveLink.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- OTHER PROJECTS --- */}
      {data.otherProjects && data.otherProjects.length > 0 && (
      <div className="flex flex-col gap-6 pt-8 md:pt-12">
        <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#5F5E5E] dark:text-[#A3A3A3] mb-2 border-b border-[#E5E2E1] dark:border-[#333333] pb-4">
          Archived / Minor Modules
        </h3>
        
        <div className="flex flex-col">
          {data.otherProjects.map((project) => (
            <div 
              key={project.id} 
              className="group flex flex-col md:flex-row md:items-start justify-between py-5 border-b border-[#E5E2E1] dark:border-[#333333] last:border-0 gap-3 md:gap-8 hover:bg-[#FFFFFF] dark:hover:bg-[#232121] transition-colors -mx-4 px-4 rounded-lg"
            >
              <div className="flex flex-col gap-1 md:w-1/3 shrink-0">
                <h4 className="text-[15px] font-bold text-[#1C1B1B] dark:text-[#FDF8F8] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h4>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-[#5F5E5E] dark:text-[#A3A3A3]">
                  {project.stack.map((tech, i) => (
                    <span key={tech} className="font-mono text-[10px] uppercase tracking-widest">
                      {tech}{i < project.stack.length - 1 ? ' •' : ''}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:w-2/3 gap-3">
                <p className="text-[13px] text-[#5F5E5E] dark:text-[#A3A3A3] leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-widest text-[#1C1B1B] dark:text-[#FDF8F8] hover:text-[#5F5E5E] dark:hover:text-[#A3A3A3] transition-colors flex items-center gap-1 opacity-70 hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-[14px]">code</span>
                    Source
                  </a>
                  {project.liveLink && (
                    <a 
                      href={project.liveLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-widest text-[#1C1B1B] dark:text-[#FDF8F8] hover:text-[#5F5E5E] dark:hover:text-[#A3A3A3] transition-colors flex items-center gap-1 opacity-70 hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      {project.liveLink.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>)}

    </section>
  );
}