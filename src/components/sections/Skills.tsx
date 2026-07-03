import { usePortfolioData } from '../../hooks/usePortfolioData';
import { type SkillGroup, type SkillItem } from '../../types';

export function Skills() {
  const { data, isLoading, error } = usePortfolioData();

  if (isLoading || error || !data) {
    return null;
  }

  // Separate the data into Left and Right columns for the staggered effect
  const leftColumnSkills = data.skills.filter((_, index) => index % 2 === 0);
  const rightColumnSkills = data.skills.filter((_, index) => index % 2 !== 0);

  // Extracted render function utilizing the globally imported types
  const renderSkillGroup = (group: SkillGroup) => (
    <div key={group.category} className="flex flex-col">
      {/* Minimalist Header with solid underline */}
      <h3 className="text-xl md:text-[22px] font-semibold text-[#1C1B1B] dark:text-[#FDF8F8] pb-3 border-b-[1.5px] border-[#1C1B1B] dark:border-[#FDF8F8]">
        {group.category}
      </h3>

      {/* List Items */}
      <ul className="mt-6 flex flex-col gap-5">
        {group.items.map((skill: SkillItem) => (
          <li key={skill.name} className="flex items-center gap-4">
            
            {/* Custom Triangle Bullet */}
            <svg 
              width="6" 
              height="8" 
              viewBox="0 0 6 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-[#1C1B1B] dark:text-[#FDF8F8] shrink-0"
            >
              <path d="M0 0L6 4L0 8V0Z" fill="currentColor"/>
            </svg>
            
            {/* Skill Name */}
            <span className="text-[15px] md:text-base text-[#5F5E5E] dark:text-[#A3A3A3] font-medium tracking-wide">
              {skill.name}
            </span>
            
            {/* Optional Status Tag */}
            {skill.status && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b949e] dark:text-[#5F5E5E] ml-1">
                ({skill.status})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section 
      id="skills" 
      className="w-full px-4 md:px-6 max-w-[1120px] mx-auto pt-16 flex flex-col gap-12 md:gap-16"
    >
      {/* --- Section Header --- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-8 bg-[#1C1B1B] dark:bg-[#FDF8F8]"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C1B1B] dark:text-[#FDF8F8]">
            Technical Arsenal
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1C1B1B] dark:text-[#FDF8F8]">
          Tools of the trade.
        </h2>
      </div>

      {/* --- Staggered Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-16 mt-4">
        
        {/* Left Column */}
        <div className="flex flex-col gap-16">
          {leftColumnSkills.map(renderSkillGroup)}
        </div>

        {/* Right Column (Staggered down on desktop) */}
        <div className="flex flex-col gap-16 md:mt-24">
          {rightColumnSkills.map(renderSkillGroup)}
        </div>

      </div>
    </section>
  );
}