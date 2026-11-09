import React, { useEffect, useRef } from 'react';

export default function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Golden dust particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles = [];

    const colors = [
      'rgba(212, 175, 55, ',   // Gold
      'rgba(229, 193, 88, ',   // Champagne
      'rgba(243, 234, 205, ',  // Ivory
      'rgba(196, 114, 138, ',  // Rose Burgundy
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.angle += p.angleSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.2;

        // Wrap around borders
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.baseAlpha + Math.sin(p.angle * 2) * 0.15;
        const radius = p.radius + Math.sin(p.angle) * 0.3;

        // Radial glow for particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.5);
        gradient.addColorStop(0, `${p.colorBase}${Math.max(currentAlpha, 0.05)})`);
        gradient.addColorStop(0.5, `${p.colorBase}${Math.max(currentAlpha * 0.3, 0.01)})`);
        gradient.addColorStop(1, `${p.colorBase}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Bright particle core
        ctx.fillStyle = `${p.colorBase}${Math.min(currentAlpha + 0.2, 1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
