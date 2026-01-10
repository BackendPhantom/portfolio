export const Home = () => {
  return (
    <div className="w-full flex justify-center px-4 animate-in fade-in zoom-in duration-500">
      {/* Outer Card: Added max-w-[90vw] to ensure mobile safety */}
      <div className="relative w-full max-w-[90vw] md:max-w-4xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 shadow-2xl transition-colors duration-300 backdrop-blur-sm">
        
        {/* Inner Terminal */}
        <div className="relative w-full border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-black/40 p-6 sm:p-10 md:p-16 overflow-hidden group transition-colors duration-300">
            
            {/* Corner Brackets - Hidden on very small screens to save space */}
            <div className="hidden sm:block absolute bottom-4 left-4 text-gray-300 dark:text-white/10 font-mono text-xl select-none">&lt;/&gt;</div>
            <div className="hidden sm:block absolute bottom-4 right-4 text-gray-300 dark:text-white/10 font-mono text-xl select-none">&lt;/&gt;</div>

            {/* Window Controls */}
            <div className="absolute top-4 left-4 flex space-x-1.5 sm:space-x-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80 border border-red-500/50"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80 border border-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80 border border-green-500/50"></div>
            </div>
            
            <div className="absolute top-4 right-4 sm:right-6 text-[10px] sm:text-xs font-mono text-gray-400 dark:text-white/20 select-none">
                main.py
            </div>

            {/* Content - Using break-words and responsive text sizing */}
            <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 mt-6 sm:mt-4">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors break-words w-full">
                    Hello, I'm Sulaiman.
                </h1>
                
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-mono text-primary break-words w-full">
                    Software Engineer.<span className="text-gray-900 dark:text-white typewriter-cursor">|</span>
                </h2>
                
                <div className="h-px w-16 bg-gray-300 dark:bg-white/10 my-4 sm:my-6"></div>

                <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 font-mono max-w-2xl leading-relaxed border-l-2 border-primary/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0 transition-colors">
                    Specializing in backend development, scalable APIs, and clean architecture. Welcome to my digital space.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};