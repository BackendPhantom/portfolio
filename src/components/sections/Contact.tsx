import { useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export function Contact() {
  const { data, isLoading, error } = usePortfolioData();
  const [pingInput, setPingInput] = useState<string>('');

  if (isLoading || error || !data) {
    return null;
  }

  // Intercept the form submission to trigger a native mailto link
  const executePing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pingInput.trim()) return;
    
    const subject = encodeURIComponent("System Handshake Request");
    const body = encodeURIComponent(`> ping message payload:\n\n${pingInput}\n\n`);
    window.location.href = `mailto:${data.contact.email}?subject=${subject}&body=${body}`;
    
    // Clear terminal after execution
    setPingInput('');
  };

  return (
    <section 
      id="contact" 
      className="w-full px-4 md:px-6 max-w-[1120px] mx-auto pt-16 md:pt-24 flex flex-col gap-12 md:gap-16"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-8 bg-[#1C1B1B] dark:bg-[#FDF8F8]"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C1B1B] dark:text-[#FDF8F8]">
            Handshake Protocol
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1C1B1B] dark:text-[#FDF8F8]">
          Open a connection.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        
        {/* --- LEFT: The Terminal Ping Interface (Fixed Height Stretching) --- */}
        <div className="lg:col-span-7 bg-[#1C1B1B] dark:bg-[#000000] rounded-[24px] p-6 md:p-8 flex flex-col h-fit self-start shadow-2xl border border-transparent dark:border-[#333333] transition-colors duration-300">
          
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-[#333333] pb-4 mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3]">
              sys_ping_utility v1.0
            </span>
          </div>

          <div className="flex flex-col gap-4 font-mono text-[13px] md:text-[14px] text-[#A3A3A3]">
            <p>Initiating handshake sequence...</p>
            <p className="text-emerald-400">Resolving target: {data.personalInfo.name}</p>
            <p>Enter payload data below to transmit an email directly to the system architect.</p>

            {/* Interactive Terminal Form */}
            <form onSubmit={executePing} className="pt-6 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-emerald-400 shrink-0">guest@sys-arch:~$</span>
                <input
                  type="text"
                  value={pingInput}
                  onChange={(e) => setPingInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="bg-transparent border-none outline-none text-[#FDF8F8] w-full placeholder:text-[#5F5E5E]"
                  autoComplete="off"
                />
              </div>
              
              <button 
                type="submit"
                disabled={!pingInput.trim()}
                className="w-fit border border-[#333333] text-[#A3A3A3] hover:text-[#FDF8F8] hover:border-[#FDF8F8] disabled:opacity-50 disabled:hover:border-[#333333] disabled:hover:text-[#A3A3A3] transition-colors px-4 py-2 text-[11px] uppercase tracking-widest font-sans font-bold mt-2 rounded-[8px]"
              >
                Execute Ping
              </button>
            </form>
          </div>
        </div>

{/* --- RIGHT: Direct Bento Links (True 2x2 Grid Architecture) --- */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 h-fit self-start">
          
          {/* Direct Email Card (Spans both columns) */}
          <a 
            href={`mailto:${data.contact.email}`}
            className="sm:col-span-2 bg-[#FFFFFF] dark:bg-[#232121] border border-[#E5E2E1] dark:border-[#333333] rounded-[24px] p-6 md:p-8 flex flex-col justify-center items-start transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md group"
          >
            <div className="flex justify-between w-full items-start mb-6">
              <span className="material-symbols-outlined text-[#1C1B1B] dark:text-[#FDF8F8] text-[28px] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                mail
              </span>
              <span className="material-symbols-outlined text-[#1C1B1B] dark:text-[#FDF8F8] text-[20px] opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300">
                arrow_outward
              </span>
            </div>
            
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5F5E5E] dark:text-[#A3A3A3] mb-1">
              Direct Protocol
            </span>
            {/* Using break-all and dynamic text sizing to ensure your long email fits beautifully */}
            <span className="text-[15px] sm:text-lg md:text-xl font-bold tracking-tight text-[#1C1B1B] dark:text-[#FDF8F8] break-all">
              {data.contact.email}
            </span>
          </a>

          {/* Social Links Cards (Mapped as square tiles) */}
          {data.contact.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFFFFF] dark:bg-[#232121] border border-[#E5E2E1] dark:border-[#333333] rounded-[24px] p-5 md:p-6 flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md group"
            >
              <div className="flex justify-between items-start w-full">
                {/* Dynamically rendering the icon from data.json */}
                <span className="material-symbols-outlined text-[#1C1B1B] dark:text-[#FDF8F8] text-[24px] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {social.icon}
                </span>
                <span className="material-symbols-outlined text-[#1C1B1B] dark:text-[#FDF8F8] text-[18px] opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300">
                  arrow_outward
                </span>
              </div>
              
              <div className="flex flex-col mt-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#5F5E5E] dark:text-[#A3A3A3] mb-1">
                  Network Link
                </span>
                <span className="text-[15px] md:text-base font-bold tracking-tight text-[#1C1B1B] dark:text-[#FDF8F8]">
                  {social.platform}
                </span>
              </div>
            </a>
          ))}

        </div>
      </div>
    </section>
  );
}