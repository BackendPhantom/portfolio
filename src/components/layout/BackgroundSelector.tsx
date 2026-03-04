import { useState, useRef, useEffect } from "react";
import type { BackgroundType } from "../../types";

interface BackgroundSelectorProps {
  currentBackground: BackgroundType;
  onSelect: (bg: BackgroundType) => void;
}

const backgrounds: { id: BackgroundType; name: string; icon: string }[] = [
  { id: "matrix", name: "Matrix Rain", icon: "terminal" },
  { id: "particles", name: "Particle Network", icon: "scatter_plot" },
  { id: "grid", name: "Geometric Grid", icon: "grid_on" },
  { id: "constellation", name: "Constellation", icon: "auto_awesome" },
];

export const BackgroundSelector = ({
  currentBackground,
  onSelect,
}: BackgroundSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const currentBg = backgrounds.find((bg) => bg.id === currentBackground);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium font-mono transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5"
        aria-label="Select background"
        aria-expanded={isOpen}
        aria-haspopup="listbox">
        <span className="material-icons text-lg">{currentBg?.icon}</span>
        <span className="hidden lg:inline">BG</span>
        <span
          className="material-icons text-sm transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          role="listbox"
          aria-label="Background options">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs font-mono text-gray-500 dark:text-gray-400 px-2">
              SELECT_BACKGROUND
            </p>
          </div>
          <div className="p-1">
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => {
                  onSelect(bg.id);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={currentBackground === bg.id}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentBackground === bg.id
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}>
                <span className="material-icons text-lg">{bg.icon}</span>
                <span className="flex-1 text-left">{bg.name}</span>
                {currentBackground === bg.id && (
                  <span className="material-icons text-lg text-blue-500">
                    check
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
