interface MobileNavProps {
  currentView: string;
  setView: (view: string) => void;
}

export const MobileNav = ({ currentView, setView }: MobileNavProps) => {
  const navItems = [
    { id: "home", icon: "home", label: "Home" },
    { id: "skills", icon: "code", label: "Skills" },
    { id: "projects", icon: "folder", label: "Projects" },
    { id: "contact", icon: "mail", label: "Contact" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#191919]/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 z-50 safe-area-inset-bottom">
      <div className="flex justify-around py-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`
              relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl min-w-[60px] transition-all duration-300
              ${
                currentView === item.id
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }
            `}
            aria-current={currentView === item.id ? "page" : undefined}>
            {currentView === item.id && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            )}

            <span
              className={`material-icons text-xl transition-transform duration-200 ${
                currentView === item.id ? "scale-110" : ""
              }`}>
              {item.icon}
            </span>
            <span
              className={`text-[10px] font-mono font-semibold uppercase tracking-wider transition-all ${
                currentView === item.id ? "opacity-100" : "opacity-70"
              }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
