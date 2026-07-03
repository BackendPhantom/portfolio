import { Navbar } from './components/layouts/Navbar';
import { Hero, Skills, Projects, Contact } from './components/sections';

function App() {
  return (
    <div className="min-h-screen bg-[#FDF8F8] dark:bg-[#1C1B1B] text-[#1C1B1B] dark:text-[#FDF8F8] font-sans antialiased transition-colors duration-300 pt-16">
      <Navbar />
      
      {/* Main content will go here.
        The pt-16 offset ensures content is not hidden behind the fixed Navbar.
      */}
      <main className="flex flex-col gap-16 md:gap-24 py-16">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
    </div>
  );
}

export default App;