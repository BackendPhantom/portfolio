import { useEffect, useRef } from "react";

export const GeometricGrid = () => {
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

    const spacing = 40;
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    interface Point {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      phase: number;
    }

    const points: Point[][] = [];

    for (let i = 0; i < cols; i++) {
      points[i] = [];
      for (let j = 0; j < rows; j++) {
        points[i][j] = {
          baseX: i * spacing,
          baseY: j * spacing,
          x: i * spacing,
          y: j * spacing,
          phase: Math.random() * Math.PI * 2,
        };
      }
    }

    let time = 0;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      lastFrameTime = currentTime - (deltaTime % frameInterval);

      const isDark = document.documentElement.classList.contains("dark");

      // Clear canvas
      ctx.fillStyle = isDark ? "#0a0a0f" : "#fafafc";
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      // Update point positions with wave effect
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const p = points[i][j];
          const wave = Math.sin(time + p.phase + i * 0.1 + j * 0.1) * 5;
          p.x = p.baseX + wave;
          p.y = p.baseY + Math.cos(time + p.phase + i * 0.1) * 5;
        }
      }

      // Draw connections
      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const p = points[i][j];

          // Calculate distance from center for gradient effect
          const centerX = width / 2;
          const centerY = height / 2;
          const distFromCenter = Math.sqrt(
            Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2)
          );
          const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
          const normalizedDist = distFromCenter / maxDist;

          const alpha = (1 - normalizedDist * 0.7) * 0.3;

          // Draw horizontal lines
          if (i < cols - 1) {
            const next = points[i + 1][j];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = isDark
              ? `rgba(59, 130, 246, ${alpha})`
              : `rgba(59, 130, 246, ${alpha * 0.7})`;
            ctx.stroke();
          }

          // Draw vertical lines
          if (j < rows - 1) {
            const next = points[i][j + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = isDark
              ? `rgba(139, 92, 246, ${alpha})`
              : `rgba(139, 92, 246, ${alpha * 0.7})`;
            ctx.stroke();
          }

          // Draw dots at intersections
          const dotAlpha = (1 - normalizedDist * 0.5) * 0.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(99, 102, 241, ${dotAlpha})`
            : `rgba(99, 102, 241, ${dotAlpha * 0.8})`;
          ctx.fill();
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
      className="fixed inset-0 z-0 bg-[#fafafc] dark:bg-[#0a0a0f]"
      aria-hidden="true"
    />
  );
};
