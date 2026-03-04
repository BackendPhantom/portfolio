import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useProjects } from "../../hooks/useProjects";
import { useSkills } from "../../hooks/useSkills";
import { HomeStatsSkeleton } from "../ui";

interface HomeProps {
  onNavigate?: (view: string) => void;
}

export const Home = ({ onNavigate }: HomeProps) => {
  const { user, loading: userLoading } = useUser();
  const { filterCounts, loading: projectsLoading } = useProjects();
  const { totalTechnicalCount, loading: skillsLoading } = useSkills();

  const statsLoading = userLoading || projectsLoading || skillsLoading;

  const [copied, setCopied] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const rawCode = `class SoftwareEngineer:
    """
    Hello, I'm ${user?.first_name ?? "Sulaiman"}.
    Specializing in backend development, scalable APIs,
    and clean architecture. Welcome to my digital space.
    """
    def __init__(self):
        self.name = "${user?.full_name ?? "Sulaiman Olasubomi Oladunjoye"}"
        self.role = "${user?.title ?? "Software Engineer"}"

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
    setTerminalOutput([]);

    setTimeout(() => {
      setTerminalOutput([
        "> python3 main.py",
        user?.full_name ?? "Sulaiman Olasubomi",
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
    <div className="w-full flex justify-center px-4 py-8 animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-[90vw] xl:max-w-7xl">
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* SUMMARY SECTION - Enhanced */}
          <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-24">
            {/* Profile Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent rounded-full"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-blue-500 dark:text-blue-400 font-semibold tracking-wider">
                    01.
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {user?.first_name || "Sulaiman"}
                  </h2>
                </div>
                {/* Title + Location */}
                <div className="flex flex-wrap items-center gap-3 pl-8">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {user?.title || "Software Engineer"}
                  </span>
                  {user?.location && (
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="material-icons text-[12px]">
                        location_on
                      </span>
                      {user.location}
                    </span>
                  )}
                </div>
                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 pl-8">
                  {user?.is_available_for_hire && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700/50 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Available for hire
                    </span>
                  )}
                  {user?.is_open_to_freelance && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700/50 rounded-full">
                      <span className="material-icons text-[10px]">work</span>
                      Freelance OK
                    </span>
                  )}
                </div>
                <div className="h-px w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            {statsLoading ? (
              <HomeStatsSkeleton />
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800/30 group hover:scale-105 transition-transform cursor-default">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    {user?.years_of_experience ?? "—"}+
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
                    Years Exp
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border border-green-200 dark:border-green-800/30 group hover:scale-105 transition-transform cursor-default">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                    {filterCounts.all || "—"}
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
                    Projects
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-200 dark:border-purple-800/30 group hover:scale-105 transition-transform cursor-default">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                    {totalTechnicalCount || "—"}
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
                    Technologies
                  </div>
                </div>
              </div>
            )}

            {/* Content with enhanced styling */}
            <div className="space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/0 p-6 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-sm">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {user?.bio ||
                  "Backend Software Engineer specializing in scalable APIs, clean architecture, and performance-driven systems."}
              </p>

              {/* Skills with hover effects
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                  Core Expertise
                </h3>
                <ul className="space-y-2.5">
                  {[
                    {
                      icon: "⚡",
                      text: "Database Optimization",
                      color: "text-yellow-600 dark:text-yellow-400",
                    },
                    {
                      icon: "🔧",
                      text: "Microservices Architecture",
                      color: "text-orange-600 dark:text-orange-400",
                    },
                    {
                      icon: "🌐",
                      text: "RESTful & GraphQL APIs",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                  ].map((skill, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 group cursor-default p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-200">
                      <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-mono text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {skill.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

             
              <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Django", "PostgreSQL", "Docker", "Redis"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-mono bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-white/20 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-default">
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div> */}

              {/* CTA + Social Links */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={() => onNavigate?.("contact")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-mono font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                  <span className="material-icons text-lg">mail</span>
                  Get In Touch
                </button>
                {/* Social Links */}
                {(user?.github_url || user?.linkedin_url || user?.website) && (
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-200 dark:border-white/10">
                    {user?.github_url && (
                      <a
                        href={user.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 hover:text-gray-900 dark:hover:text-white transition-all">
                        <span className="material-icons text-[14px]">code</span>
                        GitHub
                      </a>
                    )}
                    {user?.linkedin_url && (
                      <a
                        href={user.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all">
                        <span className="material-icons text-[14px]">work</span>
                        LinkedIn
                      </a>
                    )}
                    {user?.email && (
                      <a
                        href={`mailto:${user?.email}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800/50 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all">
                        <span className="material-icons text-[14px]">mail</span>
                        Email
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CODE EDITOR SECTION - Enhanced */}
          <div className="w-full lg:w-2/3">
            <div className="relative border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#191919]/90 shadow-2xl transition-colors duration-300 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-3xl hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300">
              <div className="relative w-full bg-[#fcfcfa] dark:bg-[#22252a] overflow-hidden group transition-colors duration-300">
                {/* Header: Controls + Actions */}
                <div className="w-full h-12 bg-gradient-to-r from-[#e8e8e8] to-[#e3e3e3] dark:from-[#1f2226] dark:to-[#252830] flex items-center justify-between px-4 border-b border-gray-300 dark:border-black/50">
                  {/* Window Controls */}
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                  </div>

                  {/* Filename */}
                  <div className="text-xs font-mono text-gray-600 dark:text-gray-400 select-none flex items-center gap-2 bg-white/30 dark:bg-black/20 px-3 py-1 rounded-md">
                    <span className="material-icons text-[14px] text-[#ffd866]">
                      data_object
                    </span>
                    <span className="font-semibold">main.py</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* RUN BUTTON */}
                    <button
                      onClick={handleRun}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-500/10 hover:bg-green-500/20 dark:bg-green-400/10 dark:hover:bg-green-400/20 border border-green-500/20 hover:border-green-500/40 transition-all duration-200"
                      title="Run Code">
                      <span
                        className={`material-icons text-[16px] text-green-600 dark:text-green-400 ${
                          isRunning ? "animate-spin" : ""
                        }`}>
                        {isRunning ? "sync" : "play_arrow"}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-green-600 dark:text-green-400">
                        {isRunning ? "RUNNING" : "RUN"}
                      </span>
                    </button>

                    {/* COPY BUTTON */}
                    <button
                      onClick={handleCopy}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-200"
                      title="Copy Code">
                      <span className="material-icons text-[16px] text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {copied ? "check" : "content_copy"}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {copied ? "COPIED" : "COPY"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Python Code Content */}
                <div className="p-6 sm:p-8 md:p-12">
                  <div
                    className={`font-mono text-sm sm:text-base md:text-lg leading-relaxed overflow-x-auto transition-all duration-300 ${
                      showTerminal ? "h-[200px] overflow-y-auto" : "h-auto"
                    }`}>
                    <pre className="whitespace-pre-wrap break-words">
                      <code>
                        <span className="text-[#ff6188]">class</span>{" "}
                        <span className="text-[#78dce8]">SoftwareEngineer</span>
                        :{"\n"}
                        <span className="text-[#727072] italic pl-4 sm:pl-8 block mb-4 select-none md:select-text">
                          """
                          <br />
                          Hello, I'm Sulaiman.
                          <br />
                          Specializing in backend development, scalable APIs,
                          <br />
                          and clean architecture. Welcome to my digital space.
                          <br />
                          """
                        </span>
                        <span className="pl-4 sm:pl-8 block">
                          <span className="text-[#ff6188]">def</span>{" "}
                          <span className="text-[#a9dc76]">__init__</span>(
                          <span className="text-[#fc9867] italic">self</span>):
                        </span>
                        <span className="pl-8 sm:pl-16 block">
                          <span className="text-[#fc9867] italic">self</span>
                          .name ={" "}
                          <span className="text-[#ffd866]">
                            {`"${user?.full_name ?? "Sulaiman Olasubomi"}"`}
                          </span>
                        </span>
                        <span className="pl-8 sm:pl-16 block">
                          <span className="text-[#fc9867] italic">self</span>
                          .role ={" "}
                          <span className="text-[#ffd866]">
                            {`"${user?.title ?? "Backend Developer"}"`}
                          </span>
                        </span>
                        <span className="pl-8 sm:pl-16 block">
                          <span className="text-[#fc9867] italic">self</span>
                          .stack = [
                          <span className="text-[#ffd866]">"Python"</span>,{" "}
                          <span className="text-[#ffd866]">"Django"</span>,{" "}
                          <span className="text-[#ffd866]">"APIs"</span>]
                        </span>
                        {"\n"}
                        <span className="block mt-4">
                          <span className="text-[#ff6188]">if</span> __name__ =={" "}
                          <span className="text-[#ffd866]">"__main__"</span>:
                        </span>
                        <span className="pl-4 sm:pl-8 block">
                          dev ={" "}
                          <span className="text-[#78dce8]">
                            SoftwareEngineer
                          </span>
                          ()
                        </span>
                        <span className="pl-4 sm:pl-8 block flex items-center text-gray-800 dark:text-[#fdf9f3]">
                          print(dev.name)
                        </span>
                      </code>
                    </pre>
                  </div>
                </div>

                {/* TERMINAL PANE */}
                {showTerminal && (
                  <div className="w-full bg-[#1e1e1e] border-t border-gray-700 animate-in slide-in-from-bottom-10 duration-300">
                    {/* Terminal Header */}
                    <div className="flex justify-between items-center px-4 py-2 bg-[#252526] border-b border-black/50">
                      <div className="flex gap-4 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        <span className="border-b-2 border-blue-500 text-white pb-1">
                          Terminal
                        </span>
                        <span className="hover:text-gray-300 cursor-pointer transition-colors">
                          Output
                        </span>
                        <span className="hover:text-gray-300 cursor-pointer transition-colors">
                          Debug Console
                        </span>
                      </div>
                      <button
                        onClick={closeTerminal}
                        className="text-gray-400 hover:text-white hover:bg-white/10 p-1 rounded transition-all">
                        <span className="material-icons text-[14px]">
                          close
                        </span>
                      </button>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-4 font-mono text-xs sm:text-sm h-32 overflow-y-auto text-gray-300 selection:bg-white/20">
                      {isRunning ? (
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 animate-pulse">
                            ➜
                          </span>
                          <span className="animate-pulse">
                            Running script...
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">➜</span>
                            <span className="text-blue-400">~/portfolio</span>
                            <span className="text-gray-400">
                              {terminalOutput[0]}
                            </span>
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
        </div>
      </div>
    </div>
  );
};
