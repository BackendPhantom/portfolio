import type { ReactNode } from "react";

interface WindowFrameProps {
  filename: string;
  icon: string;
  iconColor?: string;
  children: ReactNode;
  viewToggle?: ReactNode;
  statusBar?: ReactNode;
}

export const WindowFrame = ({
  filename,
  icon,
  iconColor = "text-blue-600 dark:text-blue-400",
  children,
  viewToggle,
  statusBar,
}: WindowFrameProps) => {
  return (
    <div className="relative border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#191919]/90 shadow-2xl transition-all duration-300 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-3xl hover:border-blue-500/30 dark:hover:border-blue-400/30">
      <div className="relative w-full bg-[#fcfcfa] dark:bg-[#22252a] min-h-[500px] overflow-hidden transition-colors duration-300 flex flex-col">
        {/* Window Header */}
        <div className="w-full h-12 bg-gradient-to-r from-[#e8e8e8] to-[#e3e3e3] dark:from-[#1f2226] dark:to-[#252830] flex items-center justify-between px-4 border-b border-gray-300 dark:border-black/50 sticky top-0 z-30 backdrop-blur-sm">
          {/* Left: Window Controls + Filename */}
          <div className="flex items-center gap-4">
            <div className="flex space-x-2">
              <div
                className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm hover:shadow-md hover:scale-110 transition-all cursor-pointer"
                title="Close"></div>
              <div
                className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm hover:shadow-md hover:scale-110 transition-all cursor-pointer"
                title="Minimize"></div>
              <div
                className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm hover:shadow-md hover:scale-110 transition-all cursor-pointer"
                title="Maximize"></div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/40 dark:bg-black/30 rounded-md text-xs font-mono text-gray-600 dark:text-gray-400 border border-gray-300/50 dark:border-white/10">
              <span className={`material-icons text-[14px] ${iconColor}`}>
                {icon}
              </span>
              <span className="font-semibold">{filename}</span>
            </div>
          </div>

          {/* Right: View Toggle */}
          {viewToggle}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Status Bar */}
        {statusBar && (
          <div className="h-7 bg-gradient-to-r from-[#e8e8e8] to-[#e3e3e3] dark:from-[#1f2226] dark:to-[#252830] border-t border-gray-300 dark:border-black/50 flex items-center justify-between px-4 text-[10px] font-mono text-gray-600 dark:text-gray-400">
            {statusBar}
          </div>
        )}
      </div>
    </div>
  );
};
