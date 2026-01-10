import { useEffect, useRef } from "react";

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    // Configuration
    const fontSize = 14;
    const columns = Math.ceil(width / fontSize);
    const drops: number[] = new Array(columns).fill(1); // Y-coordinate of the drop

    // The Matrix/Data Characters (Binary + Hex for backend feel)
    const chars = "0101010101ABCDEF"; 

    const draw = () => {
      // Semi-transparent black fill to create "trail" effect
      // We check theme to adjust trail color
      const isDark = document.documentElement.classList.contains("dark");
      
      ctx.fillStyle = isDark ? "rgba(5, 5, 5, 0.05)" : "rgba(243, 244, 246, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Color logic: Green for dark mode, Gray for light mode
        ctx.fillStyle = isDark ? "#588157" : "#a3b18a"; 
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-30 dark:opacity-20 transition-opacity duration-500"
    />
  );
};