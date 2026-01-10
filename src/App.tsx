import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Skills } from './components/Skills';     // New file
import { Projects } from './components/Projects'; // New file
import { Contact } from './components/Contact';
import { Background } from './components/Background';
import type { portfolioData } from './data';           // New data structure

function App() {
  const [currentView, setCurrentView] = useState('home');
  
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage));
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  // View Router Logic
  const renderContent = () => {
    switch (currentView) {
      case 'home': return <Home />;
      case 'skills': return <Skills data={portfolioData} />;
      case 'projects': return <Projects data={portfolioData} />;
      case 'contact': return <div className="w-full max-w-5xl animate-in slide-in-from-bottom-4 duration-500"><Contact /></div>;
      default: return <Home />;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-primary selection:text-white overflow-x-hidden">
      
      {/* Replaces the old static bg-grid div */}
      <Background />
      
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        toggleTheme={() => setIsDark(!isDark)} 
        isDark={isDark} 
      />

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 pt-24 w-full">
        {renderContent()}
      </main>

      {/* Footer... */}
    </div>
  );
}

export default App;