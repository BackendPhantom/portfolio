import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Background } from './components/Background';
import { Home } from './components/Home';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { portfolioData } from './data';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [loading, setLoading] = useState(true); // <--- This is the variable

  // Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme) return localStorage.theme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Handle Theme
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

  // Simulate System Boot
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds boot time
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <Home />;
      case 'skills': return <Skills data={portfolioData} />;
      case 'projects': return <Projects data={portfolioData} />;
      case 'contact': return <div className="w-full max-w-5xl animate-in slide-in-from-bottom-4 duration-500"><Contact /></div>;
      default: return <Home />;
    }
  };

  // --- THE FIX: USE THE 'loading' VARIABLE HERE ---
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center font-mono text-primary">
        <div className="w-64 space-y-4">
            <div className="h-1 w-full bg-primary/20 overflow-hidden rounded-full">
                <div className="h-full bg-primary w-full animate-[loading_2s_ease-in-out]"></div>
            </div>
            <div className="flex justify-between text-xs">
                <span>SYSTEM_BOOT</span>
                <span className="animate-pulse">INITIALIZING...</span>
            </div>
            <div className="text-[10px] text-gray-500 space-y-1">
                <p>Loading modules...</p>
                <p>Verifying integrity...</p>
                <p>Establishing connection...</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-primary selection:text-white overflow-x-hidden">
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

      {currentView === 'home' && (
          <footer className="fixed bottom-0 w-full py-4 text-center text-xs font-mono text-gray-500 z-10">
              <p>© 2026 Suboms. git status: clean</p>
          </footer>
      )}
    </div>
  );
}

export default App;