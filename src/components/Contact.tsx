export const Contact = () => {
  return (
    <div className="glass-card border border-gray-300 dark:border-border-dark bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-sm shadow-2xl p-6 md:p-10">
      <h2 className="text-2xl font-bold dark:text-white font-mono uppercase mb-8 border-b border-gray-300 dark:border-border-dark pb-4">
        Contact
      </h2>
      
      <div className="border border-gray-300 dark:border-border-dark p-8 md:p-12 bg-white/50 dark:bg-black/20 rounded-lg text-center space-y-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-mono">
          <span className="text-primary">&lt;</span> Let's Connect <span className="text-primary">/&gt;</span>
        </h3>
        
        <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto space-y-4 text-left font-mono">
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full bg-transparent border border-gray-400 dark:border-border-dark rounded p-3 text-gray-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Name" type="text" />
            <input className="w-full bg-transparent border border-gray-400 dark:border-border-dark rounded p-3 text-gray-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Email" type="email" />
          </div>
          <textarea className="w-full bg-transparent border border-gray-400 dark:border-border-dark rounded p-3 text-gray-900 dark:text-white focus:border-primary focus:outline-none resize-none focus:ring-1 focus:ring-primary" placeholder="Message" rows={4}></textarea>
          <div className="flex justify-center mt-6">
            <button className="px-8 py-2 border border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black rounded transition-all uppercase text-sm tracking-wider font-bold">
              Send Message
            </button>
          </div>
        </form>

        <div className="flex justify-center space-x-12 border-t border-gray-200 dark:border-gray-700 pt-8 font-mono">
            {/* Replace with your actual links */}
            <a href="mailto:oladunjoyesulaimanolasubomi@gmail.com" className="group flex flex-col items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                <span className="material-icons text-2xl group-hover:-translate-y-1 transition-transform">email</span>
                <span className="text-xs">Email</span>
            </a>
            <a href="https://github.com/Suboms" className="group flex flex-col items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                <span className="material-icons text-2xl group-hover:-translate-y-1 transition-transform">code</span>
                <span className="text-xs">GitHub</span>
            </a>
        </div>
      </div>
    </div>
  );
};