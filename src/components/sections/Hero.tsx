import { Button } from '../ui/Button';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export function Hero() {
  const { data, isLoading, error } = usePortfolioData();

  // Handle the "API" loading state
  if (isLoading) {
    return (
      <section className="w-full px-4 md:px-6 max-w-[1120px] mx-auto mt-8 md:mt-16 min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2 font-mono text-[12px] text-[#5F5E5E]">
          <span>&gt; establishing connection to data cluster... █</span>
        </div>
      </section>
    );
  }

  // Handle fetch errors safely
  if (error || !data) {
    return (
      <section className="w-full px-4 md:px-6 max-w-[1120px] mx-auto mt-8 md:mt-16 text-red-500 font-mono text-sm">
        &gt; Error: Failed to load system configuration.
      </section>
    );
  }

  const { personalInfo, engineeringTenets } = data;

  return (
    <section 
      id="home" 
      className="w-full px-4 md:px-6 max-w-[1120px] mx-auto mt-8 md:mt-16 flex flex-col gap-16 md:gap-24"
    >
      {/* --- HEADER SECTION --- */}
      <div className="max-w-3xl flex flex-col gap-6 md:gap-8">
        
        <div className="flex items-center gap-3 w-fit px-3 py-1.5 rounded-full border border-[#E5E2E1] dark:border-[#333333] bg-[#FFFFFF] dark:bg-[#232121] shadow-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-[#5F5E5E] dark:text-[#A3A3A3] font-semibold">
            Sys_Online • Region: {personalInfo.region}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-[#1C1B1B] dark:text-[#FDF8F8] leading-[1.05]">
          Architecting highly available, scalable systems.
        </h1>
        
        <p className="text-base md:text-lg text-[#5F5E5E] dark:text-[#A3A3A3] max-w-2xl leading-relaxed">
          {personalInfo.summary}
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2">
          <Button href="#projects" variant="primary">
            View Systems Logs
          </Button>
          <Button href="#contact" variant="outline">
            Initiate Handshake
          </Button>
        </div>

        <div className="mt-2 flex items-center gap-2 font-mono text-[11px] md:text-[12px] text-[#5F5E5E] dark:text-[#A3A3A3]">
          <span className="text-[#1C1B1B] dark:text-[#FDF8F8]">&gt;</span>
          <span>current_process: {personalInfo.currentProcess}</span>
          <span className="animate-pulse text-[#1C1B1B] dark:text-[#FDF8F8]">█</span>
        </div>
      </div>

      {/* --- ENGINEERING TENETS SECTION --- */}
      <div className="flex flex-col gap-4 md:gap-6">
        
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[2px] w-8 bg-[#1C1B1B] dark:bg-[#FDF8F8]"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C1B1B] dark:text-[#FDF8F8]">
            Core Engineering Tenets
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
  
  {/* LEFT: Engineering Tenets (Balanced to a 2x2 grid for 4 items) */}
  <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
    {engineeringTenets.map((tenet) => (
      <div 
        key={tenet.id} 
        className="bg-[#FFFFFF] dark:bg-[#232121] border border-[#E5E2E1] dark:border-[#333333] rounded-[24px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5F5E5E] dark:text-[#A3A3A3]">
              {tenet.label}
            </span>
            <span className="material-symbols-outlined text-[#1C1B1B] dark:text-[#FDF8F8] text-[20px] opacity-70">
              {tenet.icon}
            </span>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-[#1C1B1B] dark:text-[#FDF8F8] mb-2 leading-snug">
            {tenet.title}
          </h3>
        </div>
        <p className="text-[12px] text-[#5F5E5E] dark:text-[#A3A3A3] leading-relaxed">
          {tenet.description}
        </p>
      </div>
    ))}
  </div>

  {/* RIGHT: bio.md (Added h-fit and self-start to stop vertical stretching) */}
  <div className="md:col-span-5 bg-[#1C1B1B] dark:bg-[#FDF8F8] rounded-[24px] p-6 md:p-8 flex flex-col justify-between h-fit self-start shadow-2xl transition-colors duration-300">
    <div>
      <div className="flex items-center gap-3 border-b border-[#333333] dark:border-[#E5E2E1] pb-4 mb-4 transition-colors duration-300">
        <span className="material-symbols-outlined text-[#FDF8F8] dark:text-[#1C1B1B] text-[18px]">
          terminal
        </span>
        <span className="font-mono text-[12px] text-[#FDF8F8] dark:text-[#1C1B1B] uppercase tracking-wider font-semibold">
          cat bio.md
        </span>
      </div>
      
      <p className="text-[#FDF8F8] dark:text-[#1C1B1B] text-[14px] md:text-[15px] leading-relaxed font-sans mb-8">
        {personalInfo.bio}
      </p>
    </div>

    <div className="flex flex-wrap gap-2 mt-auto">
      {personalInfo.environmentStack.map((tag) => (
        <span 
          key={tag} 
          className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#333333] dark:bg-[#E5E2E1] text-[#FDF8F8] dark:text-[#1C1B1B] transition-colors duration-300"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>

</div>
      </div>
    </section>
  );
}