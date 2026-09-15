import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, Layers, AlertTriangle, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/AudioEffects';

interface MonolithCanvasProps {
  onDiscoverSolutions?: () => void;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

type BadgeType = 'Agents' | 'Workflows' | 'Brain';

interface BadgeTelemetry {
  title: string;
  tag: string;
  icon: React.ReactNode;
  metric: string;
  architecture: string;
  capabilities: string[];
}

const badgeData: Record<BadgeType, BadgeTelemetry> = {
  Agents: {
    title: 'AUTONOMOUS AGENT HOSTING',
    tag: 'AGENT_RUN v3.4',
    icon: <Cpu className="w-4 h-4 text-sky-400" />,
    metric: '10,000+ Concurrent Agent Loops',
    architecture: 'Sandboxed MicroVM Execution & Tool Calling',
    capabilities: [
      'Multi-agent supervisor hierarchies & swarm routing',
      'Dynamic tool invocation, browser control & API execution',
      'Persistent memory states with zero cold-start recovery',
    ],
  },
  Workflows: {
    title: 'WORKFLOW INTEGRATION ENGINE',
    tag: 'FLOW_OPS v2.8',
    icon: <Layers className="w-4 h-4 text-purple-400" />,
    metric: '10x Velocity • Automated Dev Loops',
    architecture: 'Composable AI Connectors & Event Triggers',
    capabilities: [
      'Seamless AI integration into existing codebases & IDEs',
      'Automated PR review, bug synthesis & unit test coverage',
      'Human-in-the-loop approval gates & policy guardrails',
    ],
  },
  Brain: {
    title: 'SECOND BRAIN & DEV KNOWLEDGE',
    tag: 'NEURAL_GRAPH v4.1',
    icon: <Database className="w-4 h-4 text-emerald-400" />,
    metric: 'Sub-15ms Hybrid RAG Retrieval',
    architecture: 'Polyglot Code & Enterprise Memory Vault',
    capabilities: [
      'Real-time codebase indexing & deep architectural recall',
      'Personal & organizational note synthesis & doc indexing',
      'Full-stack bespoke software development synchronization',
    ],
  },
};

export const MonolithCanvas: React.FC<MonolithCanvasProps> = ({ onDiscoverSolutions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beastContainerRef = useRef<HTMLDivElement>(null);
  
  const [hoveredBadge, setHoveredBadge] = useState<BadgeType | null>(null);

  // Mouse tilt tracking with lerping
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const isVisible = useRef(true);

  // Dual eye pupil tracking
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Shockwave ripples
  const shockwaves = useRef<{ x: number; y: number; radius: number; alpha: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
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

    // Viewport-gated rendering
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // High-performance particle swarm
    const particleCount = 150;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35 - 0.15, // gentle upward drift
        vz: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.55 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    let time = 0;

    const render = () => {
      if (!isVisible.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Lerp mouse tilt
      const lerp = 0.08;
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerp;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerp;

      // Apply 3D perspective transform to beast container
      if (beastContainerRef.current) {
        const rotX = currentRotation.current.x * 12;
        const rotY = currentRotation.current.y * 16;
        const transX = currentRotation.current.y * 14;
        const transY = currentRotation.current.x * 10;
        beastContainerRef.current.style.transform = `perspective(1000px) rotateX(${-rotX}deg) rotateY(${rotY}deg) translate3d(${transX}px, ${transY}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.52;
      const cy = height * 0.48;


      // 2. Animated Concentric Holographic Tech Orbit Rings Behind Beast
      const ringAngles = [time * 0.25, -time * 0.18, time * 0.12];
      const ringRadii = [210, 290, 370];

      ringRadii.forEach((r, idx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ringAngles[idx]);
        ctx.scale(1, 0.42); // Isometric slant

        ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 - idx * 0.02})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 16, 2, 16]);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // High-tech orbital indicator notch
        const dotAngle = time * (0.4 + idx * 0.15);
        const dotX = Math.cos(dotAngle) * r;
        const dotY = Math.sin(dotAngle) * r;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 3. Render 3D Background Particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx * p.z;
          p.y += p.vy * p.z;
          p.pulsePhase += p.pulseSpeed;

          // Wrap around edges seamlessly
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // Dynamic Mouse Interaction (Attract / Repel)
          if (isHovered.current) {
            const dx = p.x - mousePos.current.x;
            const dy = p.y - mousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140 && dist > 1) {
              const force = (1 - dist / 140) * 4;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
        }

        const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;
        const alpha = Math.max(0.08, p.alpha * pulse);

        ctx.fillStyle = `rgba(15, 15, 15, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.z * 0.8, 0, Math.PI * 2);
        ctx.fill();

        if (p.z > 1.8) {
          ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.z * 1.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // 4. Subtle Interconnecting Neural / Constellation Lines
      for (let i = 0; i < 45; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < 45; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 * (1 - dist / 60)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 5. Draw Shockwave Ripples from Clicks
      shockwaves.current.forEach((sw, idx) => {
        sw.radius += 5.5;
        sw.alpha *= 0.93;

        ctx.strokeStyle = `rgba(0, 0, 0, ${sw.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (sw.alpha < 0.01) {
          shockwaves.current.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    targetRotation.current = {
      x: y,
      y: x,
    };
    isHovered.current = true;

    // Dual optical eye pupil tracking
    setEyeOffset({
      x: x * 4.5,
      y: y * 4.5,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRotation.current = { x: 0, y: 0 };
    isHovered.current = false;
    setHoveredBadge(null);
    setEyeOffset({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    shockwaves.current.push({
      x,
      y,
      radius: 12,
      alpha: 0.85,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative w-full h-[560px] sm:h-[660px] lg:h-[760px] flex items-center justify-center cursor-crosshair select-none overflow-visible"
      aria-label="Interactive MANALITH Cybernetic Frontal Beast Core"
    >
      {/* Dynamic Background Particle & Orbital Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 3D Animated Cybernetic Frontal Beast Centerpiece */}
      <div
        ref={beastContainerRef}
        className="relative z-10 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Floating / Breathing Idle Motion */}
        <motion.div
          animate={{
            y: [-7, 7, -7],
            rotateZ: [-0.3, 0.3, -0.3],
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center"
        >
          {/* Subtle Ambient Backlight Aura (Only active on badge hover) */}
          <div
            className={`absolute inset-0 rounded-full blur-3xl transition-all duration-500 pointer-events-none ${
              hoveredBadge === 'Agents'
                ? 'bg-sky-500/20 scale-115 opacity-100'
                : hoveredBadge === 'Workflows'
                ? 'bg-purple-500/20 scale-115 opacity-100'
                : hoveredBadge === 'Brain'
                ? 'bg-emerald-500/20 scale-115 opacity-100'
                : 'opacity-0 scale-95'
            }`}
          />

          {/* Pedestal Base Shadow */}
          <div className="absolute -bottom-6 w-80 h-8 bg-neutral-900/10 rounded-full blur-xl scale-y-50 pointer-events-none" />

          {/* High-Resolution Frontal Cybernetic Beast with "MANALITH" Inscription */}
          <img
            src="/assets/monolith-beast-front-transparent.png"
            alt="MANALITH Autonomous Frontal Cybernetic Intelligence Core"
            className="w-auto h-[490px] sm:h-[590px] lg:h-[670px] max-w-none object-contain filter contrast-105 pointer-events-auto transition-transform duration-300 hover:scale-[1.02]"
            draggable={false}
          />

          {/* Dual Interactive Optical Ocular Pupil Lenses (Track Cursor in Real-Time) */}
          {/* Left Eye */}
          <div
            className="absolute pointer-events-none transition-transform duration-75 ease-out"
            style={{
              top: '43.4%',
              left: '37.48%',
              transform: `translate3d(calc(-50% + ${eyeOffset.x}px), calc(-50% + ${eyeOffset.y}px), 0)`,
            }}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-cyan-400/50 scale-75 animate-ping opacity-40" />
              <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)] animate-pulse" />
              <span className="absolute w-0.5 h-0.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Right Eye */}
          <div
            className="absolute pointer-events-none transition-transform duration-75 ease-out"
            style={{
              top: '43.16%',
              right: '36.19%',
              transform: `translate3d(calc(50% + ${eyeOffset.x}px), calc(-50% + ${eyeOffset.y}px), 0)`,
            }}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-cyan-400/50 scale-75 animate-ping opacity-40" />
              <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)] animate-pulse" />
              <span className="absolute w-0.5 h-0.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Reactive Energy Highlights when Hovering Badges */}
          {hoveredBadge === 'Agents' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[12%] w-48 h-20 rounded-2xl bg-sky-400/25 blur-lg pointer-events-none border border-sky-300/40"
            />
          )}

          {hoveredBadge === 'Brain' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[38%] w-44 h-16 rounded-full bg-emerald-400/25 blur-lg pointer-events-none"
            />
          )}

          {hoveredBadge === 'Workflows' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-[16%] w-48 h-24 rounded-2xl bg-purple-400/25 blur-lg pointer-events-none"
            />
          )}
          {/* Floating Center Chest Window Badge: "NO FEAR" (Exact match to Image 1) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => soundFx.playHudHover()}
            className="absolute top-[48%] sm:top-[50%] left-1/2 -translate-x-1/2 pointer-events-auto bg-black border border-white/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] px-4 py-1.5 rounded-xs flex flex-col items-center select-none z-30"
          >
            {/* Mini Window Header (Image 1 top bar) */}
            <div className="w-full flex items-center justify-between border-b border-neutral-700 pb-1 mb-1 text-[7px] font-mono-tech text-neutral-400 gap-3">
              <span>CORE_WINDOW // 01</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-neutral-600 rounded-xs" />
                <span className="w-1.5 h-1.5 bg-neutral-600 rounded-xs" />
              </div>
            </div>
            <span className="font-mono-tech font-black text-sm sm:text-base tracking-[0.2em] text-white uppercase">
              NO FEAR
            </span>
            <span className="text-[7px] font-mono-tech tracking-wider text-amber-400 uppercase">
              // AGENTIC WORKFLOWS
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Crosshair Reticles (Image 1 & 3) */}
      <div className="absolute top-3 left-3 text-neutral-400 font-mono-tech text-xs pointer-events-none select-none">
        ◸ +
      </div>
      <div className="absolute top-3 right-3 text-neutral-400 font-mono-tech text-xs pointer-events-none select-none">
        + ◹
      </div>
      <div className="absolute bottom-3 left-3 text-neutral-400 font-mono-tech text-xs pointer-events-none select-none">
        ◺ +
      </div>
      <div className="absolute bottom-3 right-3 text-neutral-400 font-mono-tech text-xs pointer-events-none select-none">
        + ◿
      </div>

      {/* Left Floating Chamfered Card (Matches Image 1 Left Widget) */}
      <div className="hidden xl:flex absolute bottom-[8%] -left-[140px] w-64 bg-black/95 text-white border border-neutral-700 rounded-sm p-3.5 backdrop-blur-md z-20 flex-col gap-2 pointer-events-auto shadow-2xl clip-chamfer-tr">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-amber-400 rounded-xs" />
            <span className="font-mono-tech font-bold text-[10px] tracking-wider uppercase text-amber-400">
              AGENTIC WORKFLOWS
            </span>
          </div>
          <span className="text-[8px] font-mono-tech text-neutral-500">[01]</span>
        </div>
        <p className="text-[9px] font-mono-tech text-neutral-400 leading-tight">
          Deploy autonomous agent swarms, connect your enterprise second brain, and build production software with AI-native workflows.
        </p>
        <div className="pt-1 flex items-center justify-between">
          <button
            onClick={() => {
              soundFx.playCyberClick();
              onDiscoverSolutions?.();
            }}
            onMouseEnter={() => soundFx.playHudHover()}
            className="px-3 py-1.5 rounded-sm bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-[10px] font-bold tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <span>EXPLORE WORKFLOWS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[8px] font-mono-tech text-neutral-500">v4.8</span>
        </div>
      </div>

      {/* Right Floating Alert Widget */}
      <div className="hidden xl:flex absolute top-[18%] -right-[130px] w-56 bg-black/95 text-white border border-neutral-700 rounded-sm p-3.5 backdrop-blur-md z-20 flex-col gap-2.5 pointer-events-auto shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-mono-tech font-bold text-[10px] tracking-wider uppercase text-white">
              SWARM // ACTIVE
            </span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>

        {/* Real-time Audio Waveform Equalizer (Image 2 style) */}
        <div className="flex items-end justify-between h-5 px-1 py-0.5 bg-neutral-900 border border-neutral-800 rounded-xs">
          {[40, 80, 55, 95, 70, 30, 85, 60, 100, 45].map((h, idx) => (
            <span
              key={idx}
              className="w-1 bg-amber-400 rounded-xs transition-all duration-300"
              style={{
                height: `${h}%`,
                animation: `barPulse ${0.8 + (idx % 4) * 0.2}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono-tech text-neutral-400">
          <span>AGENT: ORCHESTRATOR-X9</span>
          <span className="px-1.5 py-0.5 bg-neutral-800 text-neutral-300 font-bold rounded-xs border border-neutral-700">
            AUTONOMOUS
          </span>
        </div>

        {/* Barcode Graphic (Image 2 & 3 style) */}
        <div className="pt-1 border-t border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-[2px] opacity-70">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 ${i % 3 === 0 ? 'w-[2px] bg-white' : 'w-[1px] bg-neutral-400'}`}
              />
            ))}
          </div>
          <span className="text-[7px] font-mono-tech text-neutral-500">AGENT-RUN</span>
        </div>
      </div>

      {/* Floating 3D HUD Badges (Agents, Workflows, Brain) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        <div className="relative w-[440px] h-[540px]">
          
          {/* Main Top Tag: [Agents] / [Workflows] / [Brain] - Positioned on the left flank */}
          <div className="absolute top-[16%] left-[0%] sm:left-[-6%] flex flex-col items-start gap-2 pointer-events-auto">
            {(['Agents', 'Workflows', 'Brain'] as BadgeType[]).map((badge) => {
              const isSelected = hoveredBadge === badge;
              return (
                <button
                  key={badge}
                  onMouseEnter={() => setHoveredBadge(badge)}
                  onMouseLeave={() => setHoveredBadge((prev) => (prev === badge ? null : prev))}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoveredBadge((prev) => (prev === badge ? null : badge));
                  }}
                  className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-md text-[11px] font-mono-tech tracking-wider cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white text-black border-black shadow-[0_0_25px_rgba(0,0,0,0.2)] scale-105 ring-2 ring-black'
                      : 'bg-black text-white border-neutral-700 shadow-md hover:scale-105 hover:border-neutral-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-emerald-400 animate-pulse'}`} />
                  <span>{badge}</span>
                </button>
              );
            })}
          </div>

          {/* Real-time Telemetry Overlay (Bottom Left) */}
          <div className="absolute bottom-[2%] left-[-6%] sm:left-[-12%] pointer-events-auto bg-white/90 backdrop-blur-sm border border-neutral-200 px-3 py-1.5 rounded-sm text-[10px] font-mono-tech text-neutral-600 shadow-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>AGENT_CORE: ACTIVE</span>
            <span className="text-neutral-400">|</span>
            <span>60 FPS</span>
          </div>

          {/* Contextual Interactive HUD Popover with Spring Animation */}
          <AnimatePresence>
            {hoveredBadge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: -16, y: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: -16, y: -10 }}
                transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                className="absolute top-[6%] -left-[270px] sm:-left-[310px] w-[260px] sm:w-[300px] pointer-events-auto z-30 bg-black text-white border border-neutral-700 rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              >
                {/* Header with Icon and Tag */}
                <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-neutral-900 border border-neutral-700">
                      {badgeData[hoveredBadge].icon}
                    </div>
                    <div>
                      <div className="text-[9px] font-mono-tech text-neutral-400">
                        {badgeData[hoveredBadge].tag}
                      </div>
                      <div className="text-xs font-bold font-sans tracking-tight text-white">
                        {badgeData[hoveredBadge].title}
                      </div>
                    </div>
                  </div>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </div>

                {/* Metric Callout */}
                <div className="bg-neutral-900/80 border border-neutral-800 p-2.5 rounded-lg mb-3">
                  <div className="text-[9px] font-mono-tech text-neutral-400 uppercase">Live Performance</div>
                  <div className="text-xs font-mono-tech font-semibold text-emerald-400 mt-0.5">
                    {badgeData[hoveredBadge].metric}
                  </div>
                </div>

                {/* Architecture Subtitle */}
                <div className="text-[11px] font-sans font-medium text-neutral-300 mb-3 leading-snug">
                  {badgeData[hoveredBadge].architecture}
                </div>

                {/* Capabilities List */}
                <div className="space-y-1.5 border-t border-neutral-800/80 pt-2.5">
                  {badgeData[hoveredBadge].capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[10px] text-neutral-400 leading-tight">
                      <span className="text-neutral-500 mt-0.5">•</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Dismiss / Indicator */}
                <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between text-[9px] font-mono-tech text-neutral-500">
                  <span>TELEMETRY_STREAM</span>
                  <span className="text-neutral-400">HOVER_INSPECT</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};
