export const PageLoader = () => (
  <div className="w-full min-h-[400px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
        Loading module...
      </span>
    </div>
  </div>
);
