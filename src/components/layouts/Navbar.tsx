import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useActiveSection } from '../../hooks/useActiveSection';

interface NavLink {
  name: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const sectionIds = useMemo(() => NAV_LINKS.map(link => link.id), []);
  const activeSection = useActiveSection(sectionIds);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Custom click handler to smoothly scroll without changing the URL hash
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Get the element's exact position relative to the top of the page
      // Subtract 64px (4rem) to account for the height of the fixed navbar
      const yOffset = -64; 
      const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FDF8F8] dark:bg-[#1C1B1B] border-b border-[#E5E2E1] dark:border-[#333333] transition-colors duration-300">
      
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex justify-between items-center relative">
        
        {/* LEFT: Branding */}
        <a 
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="font-sans text-lg md:text-xl font-bold text-[#1C1B1B] dark:text-[#FDF8F8] shrink-0 z-50 tracking-tight cursor-pointer"
        >
          <span className="hidden sm:inline">Oladunjoye Olasubomi.</span>
          <span className="sm:hidden">Olasubomi.</span>
        </a>

        {/* CENTER: Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            
            return (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`text-[12px] font-semibold uppercase tracking-widest transition-colors duration-200 block py-2 cursor-pointer ${
                    isActive 
                      ? 'text-[#1C1B1B] dark:text-[#FDF8F8]' 
                      : 'text-[#5F5E5E] dark:text-[#A3A3A3] hover:text-[#1C1B1B] dark:hover:text-[#FDF8F8]' 
                  }`}
                >
                  {link.name}
                </a>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1C1B1B] dark:bg-[#FDF8F8]" />
                )}
              </li>
            );
          })}
        </ul>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 md:gap-4 z-50">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[#E5E2E1] dark:hover:bg-[#333333] transition-colors text-[#1C1B1B] dark:text-[#FDF8F8] shrink-0"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* The Call-To-Action buttons have been completely removed from here */}

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#1C1B1B] dark:text-[#FDF8F8]"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-[#FDF8F8] dark:bg-[#1C1B1B] transition-all duration-300 ease-in-out border-t border-[#E5E2E1] dark:border-[#333333] ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <div className="flex flex-col p-6 overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`block py-4 text-[14px] font-semibold uppercase tracking-widest border-b transition-colors cursor-pointer ${
                      isActive 
                        ? 'text-[#1C1B1B] dark:text-[#FDF8F8] border-[#1C1B1B] dark:border-[#FDF8F8]'
                        : 'text-[#5F5E5E] dark:text-[#A3A3A3] border-[#E5E2E1] dark:border-[#333333]'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}