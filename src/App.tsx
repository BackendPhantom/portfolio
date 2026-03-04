import { useState, useEffect, lazy, Suspense } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Background } from "./components/layout/Background";
import { MobileNav } from "./components/layout/MobileNav";
import { BackgroundSelector } from "./components/layout/BackgroundSelector";
import { ErrorBoundary, PageLoader } from "./components/ui";
import type { BackgroundType } from "./types";
import {
  ParticleNetwork,
  GeometricGrid,
  Constellation,
} from "./components/backgrounds";

// Lazy load page components for better performance
const Home = lazy(() =>
  import("./components/home/Home").then((m) => ({ default: m.Home }))
);
const Skills = lazy(() =>
  import("./components/skills/Skills").then((m) => ({ default: m.Skills }))
);
const Projects = lazy(() =>
  import("./components/projects/Projects").then((m) => ({
    default: m.Projects,
  }))
);
const Contact = lazy(() =>
  import("./components/contact/Contact").then((m) => ({ default: m.Contact }))
);

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Background State
  const [currentBackground, setCurrentBackground] = useState<BackgroundType>(
    () => {
      if (typeof window !== "undefined" && localStorage.background) {
        return localStorage.background as BackgroundType;
      }
      return "matrix";
    }
  );

  // Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      if (localStorage.theme) return localStorage.theme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  // Handle Background change
  const handleBackgroundChange = (bg: BackgroundType) => {
    setCurrentBackground(bg);
    localStorage.background = bg;
  };

  // Render current background
  const renderBackground = () => {
    switch (currentBackground) {
      case "particles":
        return <ParticleNetwork />;
      case "grid":
        return <GeometricGrid />;
      case "constellation":
        return <Constellation />;
      case "matrix":
      default:
        return <Background />;
    }
  };

  // Handle Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  // Boot — show loading only when truly cold (no cache)
  useEffect(() => {
    const hasCachedData =
      sessionStorage.getItem("api_cache:user_profile") ||
      sessionStorage.getItem("api_cache:skills") ||
      sessionStorage.getItem("api_cache:projects");

    const timer = setTimeout(
      () => {
        setLoading(false);
      },
      hasCachedData ? 400 : 1200
    );
    return () => clearTimeout(timer);
  }, []);

  // Handle view change with transition
  const handleViewChange = (view: string) => {
    if (view === currentView) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsTransitioning(false);
      // Scroll to top on view change
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 80);
  };

  const renderContent = () => {
    const transitionClass = isTransitioning
      ? "opacity-0 translate-y-2"
      : "opacity-100 translate-y-0";

    return (
      <div
        className={`transition-all duration-200 ease-out will-change-[opacity,transform] ${transitionClass}`}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            {currentView === "home" && <Home onNavigate={handleViewChange} />}
            {currentView === "skills" && <Skills />}
            {currentView === "projects" && <Projects />}
            {currentView === "contact" && (
              <div className="w-full max-w-5xl animate-in slide-in-from-bottom-4 duration-500">
                <Contact />
              </div>
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center font-mono text-primary">
        <div className="w-64 space-y-4">
          {/* Loading animation */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          <div className="h-1 w-full bg-primary/20 overflow-hidden rounded-full">
            <div className="h-full bg-primary w-full animate-[loading_2s_ease-in-out]"></div>
          </div>
          <div className="flex justify-between text-xs">
            <span>SYSTEM_BOOT</span>
            <span className="animate-pulse">INITIALIZING...</span>
          </div>
          <div className="text-[10px] text-gray-500 space-y-1">
            <p
              className="animate-in fade-in slide-in-from-left-2 duration-300"
              style={{ animationDelay: "0ms" }}>
              Loading modules...
            </p>
            <p
              className="animate-in fade-in slide-in-from-left-2 duration-300"
              style={{ animationDelay: "500ms" }}>
              Verifying integrity...
            </p>
            <p
              className="animate-in fade-in slide-in-from-left-2 duration-300"
              style={{ animationDelay: "1000ms" }}>
              Establishing connection...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-primary selection:text-white overflow-x-hidden">
      <div key={currentBackground}>{renderBackground()}</div>

      <Navbar
        currentView={currentView}
        setView={handleViewChange}
        toggleTheme={() => setIsDark(!isDark)}
        isDark={isDark}>
        <BackgroundSelector
          currentBackground={currentBackground}
          onSelect={handleBackgroundChange}
        />
      </Navbar>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 pt-24 pb-24 md:pb-4 w-full">
        {renderContent()}
      </main>

      {/* Footer - only on home */}
      {currentView === "home" && (
        <footer className="hidden md:block fixed bottom-0 w-full py-4 text-center text-xs font-mono text-gray-500 z-10">
          <p>© 2026 Suboms. git status: clean</p>
        </footer>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav currentView={currentView} setView={handleViewChange} />
    </div>
  );
}

export default App;
