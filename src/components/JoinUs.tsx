import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface DustParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
}

export const JoinUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const isHovered = useRef(false);
  const isVisible = useRef(true);

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initialize swirling quantum particle cloud
    const count = 180;
    const particles: DustParticle[] = [];

    const initParticles = () => {
      particles.length = 0;
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < count; i++) {
        // Distribute along an elliptical dust band (matching screenshot)
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (width * 0.45) + 30;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * (dist * 0.35);

        particles.push({
          x: px,
          y: py,
          originX: px,
          originY: py,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2.5 + 0.6,
          alpha: Math.random() * 0.7 + 0.2,
          orbitRadius: dist,
          orbitAngle: angle,
          orbitSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      if (!isVisible.current) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          // Slow orbital motion
          p.orbitAngle += p.orbitSpeed;
          const targetX = cx + Math.cos(p.orbitAngle) * p.orbitRadius;
          const targetY = cy + Math.sin(p.orbitAngle) * (p.orbitRadius * 0.35);

          p.x += (targetX - p.x) * 0.05;
          p.y += (targetY - p.y) * 0.05;

          // Mouse dynamic repulsion
          if (isHovered.current) {
            const dx = p.x - mousePos.current.x;
            const dy = p.y - mousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const force = (1 - dist / 120) * 12;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
        }

        // Draw particle
        ctx.fillStyle = `rgba(10, 10, 10, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw faint interconnected synaptic filaments between close particles
      for (let i = 0; i < 40; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < 40; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 50) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.15 * (1 - d / 50)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    isHovered.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
  }, []);

  return (
    <section
      id="join-us"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-32 sm:py-40 bg-white border-t border-neutral-100 overflow-hidden flex items-center justify-center select-none"
    >
      {/* Interactive Swirling Quantum Dust Canvas (Matches Screenshot Nebula Effect) */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-obsidian-950 uppercase mb-4 font-sans">
            JOIN US
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-600 mb-8 max-w-lg mx-auto font-normal leading-relaxed">
            We're always looking for exceptional talent to join our team.
          </p>

          {/* Interactive Action CTA (Matches Screenshot: Career →) */}
          {!applied ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#careers-inquire"
                onClick={(e) => {
                  e.preventDefault();
                  setApplied(true);
                }}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-mono-tech text-xs tracking-wider uppercase hover:bg-neutral-800 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <span>Career</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 border border-neutral-200 text-obsidian-950 rounded-full font-mono-tech text-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>TALENT PIPELINE INITIALIZED — RESUME TELEMETRY ACTIVE</span>
            </motion.div>
          )}

          {/* Micro Telemetry */}
          <div className="mt-8 text-[11px] font-mono-tech text-neutral-400">
            LOCATIONS :: SOUTH AFRICA • AFRICA
          </div>
        </motion.div>
      </div>
    </section>
  );
};
