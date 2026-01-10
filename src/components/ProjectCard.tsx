import type { Project } from "../data";

// 1. Restore the Skeleton Component
export const ProjectSkeleton = () => (
  <div className="border border-gray-300 dark:border-border-dark p-5 bg-white/50 dark:bg-black/20 rounded-lg h-56 animate-pulse flex flex-col justify-between">
    <div className="space-y-3">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
    <div className="flex justify-between items-end pt-4 border-t border-gray-200 dark:border-gray-800">
      <div className="flex gap-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
      </div>
      <div className="flex gap-2">
         <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
         <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

// 2. The Project Card (With Icons)
export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group border border-gray-300 dark:border-border-dark p-5 bg-white/50 dark:bg-black/20 hover:border-primary transition-all duration-300 flex flex-col justify-between h-56 rounded-lg hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <span className="text-gray-300 dark:text-gray-700 text-xs font-mono opacity-50 select-none">&lt;/&gt;</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-text-dim line-clamp-3 leading-relaxed font-mono">
          {project.desc}
        </p>
      </div>

      <div className="flex justify-between items-end mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 text-xs text-primary font-mono">
          {project.stack.slice(0, 3).map((s) => (
            <span key={s} className="bg-primary/10 px-1 rounded">{s}</span>
          ))}
          {project.stack.length > 3 && <span>+{project.stack.length - 3}</span>}
        </div>

        {/* CTA Icons */}
        <div className="flex space-x-3 text-gray-400">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1 group/link"
              title="Live Demo"
            >
              <span className="material-icons text-lg group-hover/link:-translate-y-0.5 transition-transform">open_in_new</span>
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1 group/link"
              title="View Code"
            >
              <span className="material-icons text-lg group-hover/link:-translate-y-0.5 transition-transform">code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};