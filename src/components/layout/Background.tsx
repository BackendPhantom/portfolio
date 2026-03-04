import { useEffect, useRef } from "react";

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    const fontSize = 16;
    const columns = Math.ceil(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    const speeds: number[] = new Array(columns)
      .fill(0)
      .map(() => 0.5 + Math.random() * 0.8);
    const brightness: number[] = new Array(columns)
      .fill(0)
      .map(() => 0.3 + Math.random() * 0.7);

    const chars = "01アイウエオカキクサシスセABCDEF{}[]<>/\\|0101010101ABCDEF";

    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      lastTime = currentTime - (deltaTime % frameInterval);

      const isDark = document.documentElement.classList.contains("dark");

      ctx.fillStyle = isDark
        ? "rgba(10, 10, 15, 0.08)"
        : "rgba(250, 250, 252, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Fira Code', 'Monaco', 'Consolas', monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const alpha = brightness[i];

        if (isDark) {
          const colorVariants = [
            `rgba(88, 129, 87, ${alpha})`,
            `rgba(52, 168, 83, ${alpha * 1.2})`,
            `rgba(74, 222, 128, ${alpha * 0.8})`,
            `rgba(6, 182, 212, ${alpha * 0.6})`,
          ];
          ctx.fillStyle = colorVariants[i % 4];
        } else {
          const colorVariants = [
            `rgba(100, 116, 139, ${alpha * 0.6})`,
            `rgba(71, 85, 105, ${alpha * 0.7})`,
            `rgba(59, 130, 246, ${alpha * 0.4})`,
            `rgba(139, 92, 246, ${alpha * 0.3})`,
          ];
          ctx.fillStyle = colorVariants[i % 4];
        }

        if (Math.random() > 0.98) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = isDark ? "#4ade80" : "#60a5fa";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        drops[i] += speeds[i];

        if (drops[i] * fontSize > height + Math.random() * height * 0.5) {
          if (Math.random() > 0.95) {
            drops[i] = -Math.random() * 20;
            speeds[i] = 0.5 + Math.random() * 0.8;
            brightness[i] = 0.3 + Math.random() * 0.7;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full bg-[#fafafc] dark:bg-[#0a0a0f] transition-opacity duration-1000 ease-out"
      style={{
        imageRendering: "crisp-edges",
        WebkitFontSmoothing: "antialiased",
      }}
    />
  );
};
