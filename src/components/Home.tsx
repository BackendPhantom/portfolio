import { useState } from 'react';

export const Home = () => {
  const [copied, setCopied] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const rawCode = `class SoftwareEngineer:
    """
    Hello, I'm Sulaiman.
    Specializing in backend development, scalable APIs,
    and clean architecture. Welcome to my digital space.
    """
    def __init__(self):
        self.name = "Sulaiman Olasubomi"
        self.role = "Backend Developer"
        self.stack = ["Python", "Django", "APIs"]

if __name__ == "__main__":
    dev = SoftwareEngineer()
    print(dev.name)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    if (isRunning) return;
    
    setShowTerminal(true);
    setIsRunning(true);
    setTerminalOutput([]); // Clear previous output

    // Simulate execution delay
    setTimeout(() => {
        setTerminalOutput([
            "> python3 main.py",
            "Sulaiman Olasubomi"
        ]);
        setIsRunning(false);
    }, 800);
  };

  const closeTerminal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTerminal(false);
    setTerminalOutput([]);
  };

  return (
    <div className="w-full flex justify-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-[90vw] md:max-w-4xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#191919]/90 shadow-2xl transition-colors duration-300 backdrop-blur-sm rounded-md">
        
        {/* Inner Code Editor Window */}
        <div className="relative w-full bg-[#fcfcfa] dark:bg-[#22252a] p-4 sm:p-8 md:p-12 pb-0 overflow-hidden group transition-colors duration-300 rounded-md min-h-[400px] flex flex-col">
            
            {/* Header: Controls + Actions */}
            <div className="absolute top-0 left-0 w-full h-10 bg-[#e3e3e3] dark:bg-[#1f2226] flex items-center justify-between px-4 border-b border-gray-300 dark:border-black/50 z-20">
                {/* Window Controls */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                </div>

                {/* Filename */}
                <div className="text-xs font-mono text-gray-500 dark:text-gray-400 select-none flex items-center gap-2">
                    <span className="material-icons text-[14px] text-[#ffd866]">data_object</span>
                    main.py
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {/* RUN BUTTON */}
                    <button 
                        onClick={handleRun}
                        className="group flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        title="Run Code"
                    >
                        <span className={`material-icons text-[14px] text-green-600 dark:text-green-400 ${isRunning ? 'animate-spin' : ''}`}>
                            {isRunning ? 'sync' : 'play_arrow'}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            RUN
                        </span>
                    </button>

                    {/* COPY BUTTON */}
                    <button 
                        onClick={handleCopy}
                        className="group flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        title="Copy Code"
                    >
                        <span className="material-icons text-[14px] text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                            {copied ? 'check' : 'content_copy'}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                            {copied ? 'COPIED' : 'COPY'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Python Code Content */}
            <div className={`mt-10 font-mono text-sm sm:text-base md:text-lg leading-relaxed overflow-x-auto transition-all duration-300 ${showTerminal ? 'h-[200px] overflow-y-auto' : 'h-auto'}`}>
                <pre className="whitespace-pre-wrap break-words">
                    <code>
                        <span className="text-[#ff6188]">class</span>{' '}
                        <span className="text-[#78dce8]">SoftwareEngineer</span>:
                        {'\n'}
                        <span className="text-[#727072] italic pl-4 sm:pl-8 block mb-4 select-none md:select-text">
                            """<br/>
                            Hello, I'm Sulaiman.<br/>
                            Specializing in backend development, scalable APIs,<br/>
                            and clean architecture. Welcome to my digital space.<br/>
                            """
                        </span>
                        <span className="pl-4 sm:pl-8 block">
                            <span className="text-[#ff6188]">def</span>{' '}
                            <span className="text-[#a9dc76]">__init__</span>(
                            <span className="text-[#fc9867] italic">self</span>):
                        </span>
                        <span className="pl-8 sm:pl-16 block">
                            <span className="text-[#fc9867] italic">self</span>.name ={' '}
                            <span className="text-[#ffd866]">"Sulaiman Olasubomi"</span>
                        </span>
                        <span className="pl-8 sm:pl-16 block">
                            <span className="text-[#fc9867] italic">self</span>.role ={' '}
                            <span className="text-[#ffd866]">"Backend Developer"</span>
                        </span>
                        <span className="pl-8 sm:pl-16 block">
                            <span className="text-[#fc9867] italic">self</span>.stack = [
                            <span className="text-[#ffd866]">"Python"</span>,{' '}
                            <span className="text-[#ffd866]">"Django"</span>,{' '}
                            <span className="text-[#ffd866]">"APIs"</span>]
                        </span>
                        {'\n'}
                        <span className="block mt-4">
                            <span className="text-[#ff6188]">if</span> __name__ == <span className="text-[#ffd866]">"__main__"</span>:
                        </span>
                        <span className="pl-4 sm:pl-8 block">
                            dev = <span className="text-[#78dce8]">SoftwareEngineer</span>()
                        </span>
                        <span className="pl-4 sm:pl-8 block flex items-center text-gray-800 dark:text-[#fdf9f3]">
                            print(dev.name)
                        </span>
                    </code>
                </pre>
            </div>

            {/* TERMINAL PANE */}
            {showTerminal && (
                <div className="absolute bottom-0 left-0 w-full bg-[#1e1e1e] border-t border-gray-700 animate-in slide-in-from-bottom-10 duration-300 z-10">
                    {/* Terminal Header */}
                    <div className="flex justify-between items-center px-4 py-1 bg-[#252526] border-b border-black/50">
                        <div className="flex gap-4 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                            <span className="border-b border-white text-white">Terminal</span>
                            <span>Output</span>
                            <span>Debug Console</span>
                        </div>
                        <button onClick={closeTerminal} className="text-gray-400 hover:text-white">
                            <span className="material-icons text-[14px]">close</span>
                        </button>
                    </div>
                    
                    {/* Terminal Body */}
                    <div className="p-4 font-mono text-xs sm:text-sm h-32 overflow-y-auto text-gray-300 selection:bg-white/20">
                        {isRunning ? (
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">➜</span>
                                <span>Running script...</span>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-blue-400">~/portfolio</span>
                                    <span className="text-gray-400">{terminalOutput[0]}</span>
                                </div>
                                <div className="text-white pl-4 font-bold text-base animate-in fade-in duration-300">
                                    {terminalOutput[1]}
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-blue-400">~/portfolio</span>
                                    <span className="animate-pulse inline-block w-2 h-4 bg-gray-400 align-middle"></span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};