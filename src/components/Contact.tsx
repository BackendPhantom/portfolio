import { useState, useEffect } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  
  // New State for Server Metrics
  const [metrics, setMetrics] = useState({ uptime: "99.9%", latency: 24 });

  // Simulate Live Server Metrics
  useEffect(() => {
    // 1. Set a random uptime on mount (between 99.0% and 99.99%)
    const randomUptime = (99 + Math.random()).toFixed(2) + "%";
    
    // 2. Interval to fluctuate latency every 2 seconds
    const interval = setInterval(() => {
        const randomLatency = Math.floor(Math.random() * (85 - 20 + 1)) + 20; // Random between 20-85ms
        setMetrics({ uptime: randomUptime, latency: randomLatency });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API Call
    setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="w-full flex justify-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-[90vw] md:max-w-4xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#191919]/90 shadow-2xl transition-colors duration-300 backdrop-blur-sm rounded-md">
        
        <div className="relative w-full bg-[#fcfcfa] dark:bg-[#22252a] min-h-[500px] overflow-hidden group transition-colors duration-300 rounded-md flex flex-col">
            
            {/* Window Header */}
            <div className="w-full h-12 bg-[#e3e3e3] dark:bg-[#1f2226] flex items-center justify-between px-4 border-b border-gray-300 dark:border-black/50 z-20 sticky top-0">
                <div className="flex items-center gap-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-black/20 rounded text-xs font-mono text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/5">
                        <span className="material-icons text-[14px] text-purple-400">mail</span>
                        <span>contact_me.sh</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-8 md:p-12 flex flex-col md:flex-row gap-12">
                
                {/* Left: The Form (Script Style) */}
                <div className="flex-1">
                    <div className="mb-6 font-mono text-sm text-gray-500 dark:text-gray-400">
                        <p># Initialize communication protocol</p>
                        <p># Fill parameters to establish connection</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
                        
                        {/* Name Input */}
                        <div className="group">
                            <label className="block text-purple-600 dark:text-[#ff7b72] mb-1">sender_name <span className="text-gray-400">=</span></label>
                            <div className="flex items-center bg-white dark:bg-[#1a1d21] border border-gray-300 dark:border-white/10 rounded px-3 py-2 focus-within:border-primary transition-colors">
                                <span className="text-green-600 dark:text-[#a5d6ff] mr-2">"</span>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="bg-transparent w-full outline-none text-gray-700 dark:text-white placeholder-gray-400"
                                    placeholder="John Doe"
                                />
                                <span className="text-green-600 dark:text-[#a5d6ff]">"</span>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="group">
                            <label className="block text-purple-600 dark:text-[#ff7b72] mb-1">sender_email <span className="text-gray-400">=</span></label>
                            <div className="flex items-center bg-white dark:bg-[#1a1d21] border border-gray-300 dark:border-white/10 rounded px-3 py-2 focus-within:border-primary transition-colors">
                                <span className="text-green-600 dark:text-[#a5d6ff] mr-2">"</span>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="bg-transparent w-full outline-none text-gray-700 dark:text-white placeholder-gray-400"
                                    placeholder="john@example.com"
                                />
                                <span className="text-green-600 dark:text-[#a5d6ff]">"</span>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="group">
                            <label className="block text-purple-600 dark:text-[#ff7b72] mb-1">message_content <span className="text-gray-400">=</span></label>
                            <div className="relative bg-white dark:bg-[#1a1d21] border border-gray-300 dark:border-white/10 rounded p-3 focus-within:border-primary transition-colors">
                                <span className="absolute top-3 left-3 text-green-600 dark:text-[#a5d6ff]">"""</span>
                                <textarea 
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                    className="bg-transparent w-full outline-none text-gray-700 dark:text-white resize-none pl-6 pt-1 placeholder-gray-400 font-sans"
                                    placeholder="Type your message here..."
                                />
                                <span className="absolute bottom-3 right-3 text-green-600 dark:text-[#a5d6ff]">"""</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={status !== 'idle'}
                            className="mt-4 px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 rounded flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center"
                        >
                            {status === 'idle' && <><span className="material-icons text-sm">play_arrow</span> <span>execute_script()</span></>}
                            {status === 'sending' && <><span className="material-icons text-sm animate-spin">sync</span> <span>sending...</span></>}
                            {status === 'success' && <><span className="material-icons text-sm">check</span> <span>packet_sent</span></>}
                        </button>

                    </form>
                </div>

                {/* Right: Network Info (Socials) */}
                <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-200 dark:border-white/10 pt-8 md:pt-0 md:pl-8 flex flex-col gap-6">
                    <div>
                        <h3 className="text-xs font-mono uppercase text-gray-400 mb-4">Network_Origins</h3>
                        <div className="space-y-3">
                            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group">
                                <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-full group-hover:bg-primary/10 transition-colors">
                                    <span className="material-icons text-base">code</span>
                                </div>
                                <span className="font-mono">github.com</span>
                            </a>
                            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group">
                                <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-full group-hover:bg-primary/10 transition-colors">
                                    <span className="material-icons text-base">work</span>
                                </div>
                                <span className="font-mono">linkedin.com</span>
                            </a>
                            <a href="mailto:sulaiman@example.com" className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group">
                                <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-full group-hover:bg-primary/10 transition-colors">
                                    <span className="material-icons text-base">alternate_email</span>
                                </div>
                                <span className="font-mono">email_direct</span>
                            </a>
                        </div>
                    </div>

                    {/* LIVE SERVER STATUS */}
                    <div className="mt-auto p-4 bg-gray-100 dark:bg-black/20 rounded border border-gray-200 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                             <span className="text-[10px] font-mono text-gray-500 uppercase">Server Status</span>
                        </div>
                        <div className="font-mono text-xs text-gray-400 space-y-1">
                             <div className="flex justify-between">
                                <span>Region:</span>
                                <span className="text-gray-600 dark:text-gray-300">LAG-NG</span>
                             </div>
                             <div className="flex justify-between">
                                <span>Uptime:</span>
                                <span className="text-green-600 dark:text-green-400">{metrics.uptime}</span>
                             </div>
                             <div className="flex justify-between">
                                <span>Latency:</span>
                                <span className={`${metrics.latency > 60 ? 'text-yellow-500' : 'text-green-600 dark:text-green-400'}`}>
                                    {metrics.latency}ms
                                </span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
};