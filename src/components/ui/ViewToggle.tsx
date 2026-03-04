import type { ViewMode } from "../../types";

interface ViewToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-1 bg-gray-200/80 dark:bg-black/30 p-1 rounded-lg border border-gray-300/50 dark:border-white/10">
      <button
        onClick={() => setViewMode("ui")}
        className={`
          px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-1.5
          ${
            viewMode === "ui"
              ? "bg-white dark:bg-[#2d3139] text-blue-600 dark:text-blue-400 shadow-md scale-105"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5"
          }
        `}
        aria-pressed={viewMode === "ui"}>
        <span className="material-icons text-[14px]">grid_view</span>
        <span className="hidden sm:inline">GUI_VIEW</span>
      </button>
      <button
        onClick={() => setViewMode("json")}
        className={`
          px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-1.5
          ${
            viewMode === "json"
              ? "bg-white dark:bg-[#2d3139] text-blue-600 dark:text-blue-400 shadow-md scale-105"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5"
          }
        `}
        aria-pressed={viewMode === "json"}>
        <span className="material-icons text-[14px]">data_object</span>
        <span className="hidden sm:inline">JSON_VIEW</span>
      </button>
    </div>
  );
};
