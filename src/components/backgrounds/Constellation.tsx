import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  twinkleSpeed: number;
  twinklePhase: number;
  brightness: number;
}

export const Constellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    resize();

    // Create stars
    const starCount = Math.min(150, Math.floor((width * height) / 8000));
    const stars: Star[] = [];
    const connectionDistance = 120;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        brightness: 0.5 + Math.random() * 0.5,
      });
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

      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      if (isDark) {
        gradient.addColorStop(0, "#0a0a0f");
        gradient.addColorStop(0.5, "#0f0f1a");
        gradient.addColorStop(1, "#0a0a0f");
      } else {
        gradient.addColorStop(0, "#f8fafc");
        gradient.addColorStop(0.5, "#f1f5f9");
        gradient.addColorStop(1, "#f8fafc");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      time += 0.016;

      // Find stars near mouse
      const nearbyStars: number[] = [];
      stars.forEach((star, i) => {
        const dx = star.x - mouseRef.current.x;
        const dy = star.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          nearbyStars.push(i);
        }
      });

      // Draw connections between nearby stars (constellation effect)
      if (nearbyStars.length > 1) {
        for (let i = 0; i < nearbyStars.length; i++) {
          for (let j = i + 1; j < nearbyStars.length; j++) {
            const s1 = stars[nearbyStars[i]];
            const s2 = stars[nearbyStars[j]];
            const dx = s1.x - s2.x;
            const dy = s1.y - s2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const opacity = (1 - dist / connectionDistance) * 0.6;
              ctx.beginPath();
              ctx.moveTo(s1.x, s1.y);
              ctx.lineTo(s2.x, s2.y);
              ctx.strokeStyle = isDark
                ? `rgba(147, 197, 253, ${opacity})`
                : `rgba(59, 130, 246, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle effect
        const twinkle =
          Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase) * 0.3 +
          0.7;
        const currentBrightness = star.brightness * twinkle;

        // Check if near mouse
        const dx = star.x - mouseRef.current.x;
        const dy = star.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = dist < 200;

        // Draw glow for highlighted stars
        if (isNearMouse) {
          const glowIntensity = (1 - dist / 200) * 0.5;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(147, 197, 253, ${glowIntensity})`
            : `rgba(59, 130, 246, ${glowIntensity})`;
          ctx.fill();
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(
          star.x,
          star.y,
          star.radius * (isNearMouse ? 1.5 : 1),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = isDark
          ? `rgba(226, 232, 240, ${currentBrightness})`
          : `rgba(71, 85, 105, ${currentBrightness * 0.8})`;
        ctx.fill();
      }

      // Draw subtle shooting star occasionally
      if (Math.random() < 0.002) {
        const startX = Math.random() * width;
        const startY = Math.random() * (height * 0.5);
        const length = 50 + Math.random() * 100;

        const shootGradient = ctx.createLinearGradient(
          startX,
          startY,
          startX + length,
          startY + length * 0.3
        );
        shootGradient.addColorStop(
          0,
          isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(59, 130, 246, 0.8)"
        );
        shootGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + length, startY + length * 0.3);
        ctx.strokeStyle = shootGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-[#f8fafc] dark:bg-[#0a0a0f]"
      aria-hidden="true"
    />
  );
};
