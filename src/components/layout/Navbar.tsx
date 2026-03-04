import { useState, useEffect, useCallback, type ReactNode } from "react";
import { ScrollProgress } from "../ui/ScrollProgress";

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
  children?: ReactNode;
}

export const Navbar = ({
  currentView,
  setView,
  toggleTheme,
  isDark,
  children,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["home", "skills", "projects", "contact"];

  const handleNavClick = useCallback(
    (view: string) => {
      setView(view);
      setIsOpen(false);
    },
    [setView]
  );

  // Keyboard shortcuts (Alt + number)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const keyMap: Record<string, string> = {
          "1": "home",
          "2": "skills",
          "3": "projects",
          "4": "contact",
        };

        if (keyMap[e.key]) {
          e.preventDefault();
          handleNavClick(keyMap[e.key]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNavClick]);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-background-light/90 dark:bg-background-dark/80 border-b border-gray-300 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
            onClick={() => handleNavClick("home")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleNavClick("home")}
            aria-label="Go to home">
            <span className="text-xl font-mono font-bold dark:text-text-light tracking-tighter flex items-center gap-1">
              <span className="text-gray-400 animate-symbol">&lt;</span>
              Sulaiman
              <span className="text-gray-400 animate-symbol">/&gt;</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  aria-current={currentView === item ? "page" : undefined}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium font-mono transition-all duration-300 group
                    ${
                      currentView === item
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5"
                    }
                  `}
                  title={`Alt + ${index + 1}`}>
                  <span className="relative z-10">_{item.toUpperCase()}</span>

                  {currentView === item && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  )}

                  <span className="ml-2 text-[10px] text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    ⌥{index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Background Selector, Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">{children}</div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300 group"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }>
              <span className="material-icons text-xl dark:text-white group-hover:rotate-12 transition-transform">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 focus:outline-none transition-all"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}>
              <span
                className="material-icons transition-transform duration-200"
                style={{
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}>
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="md:hidden absolute top-16 left-0 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-b border-gray-300 dark:border-white/5 animate-in slide-in-from-top-2 duration-200 shadow-xl z-50">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  aria-current={currentView === item ? "page" : undefined}
                  className={`
                    flex items-center justify-between w-full text-left px-4 py-3.5 rounded-lg text-base font-medium font-mono transition-all
                    ${
                      currentView === item
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                    }
                  `}>
                  <span>_{item.toUpperCase()}</span>
                  <span className="text-xs text-gray-400">
                    Alt + {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <ScrollProgress />
    </nav>
  );
};
