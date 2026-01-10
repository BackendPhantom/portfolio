import { useState } from "react";

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

export const Navbar = ({ currentView, setView, toggleTheme, isDark }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['home', 'skills', 'projects', 'contact'];

  const handleNavClick = (view: string) => {
    setView(view);
    setIsOpen(false); // Close mobile menu on click
  };

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-background-light/90 dark:bg-background-dark/80 border-b border-gray-300 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
            onClick={() => handleNavClick('home')}
          >
             <span className="text-xl font-mono font-bold dark:text-text-light tracking-tighter flex items-center gap-1">
               <span className="text-gray-400 animate-symbol">&lt;</span>
               Sulaiman
               <span className="text-gray-400 animate-symbol">/&gt;</span>
             </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium font-mono transition-all duration-300
                    ${currentView === item 
                      ? 'text-primary dark:text-primary scale-105' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}
                  `}
                >
                  _{item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-4">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle Theme"
            >
                <span className="material-icons text-xl dark:text-white">
                    {isDark ? "light_mode" : "dark_mode"}
                </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 focus:outline-none"
              aria-label="Open Menu"
            >
              <span className="material-icons">{isOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background-light dark:bg-background-dark border-b border-gray-300 dark:border-white/5 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`
                  block w-full text-left px-3 py-3 rounded-md text-base font-medium font-mono
                  ${currentView === item 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'}
                `}
              >
                _{item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};