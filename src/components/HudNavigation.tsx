import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Volume2, VolumeX, X, Terminal, Cpu, ShieldAlert, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/AudioEffects';
import { useTextScramble } from '../hooks/useTextScramble';

interface HudNavigationProps {
  onRequestDemo: () => void;
}

export const HudNavigation: React.FC<HudNavigationProps> = ({ onRequestDemo }) => {
  const [isNavMatrixOpen, setIsNavMatrixOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(soundFx.getMuted());
  const [activeLang, setActiveLang] = useState<'ENG' | 'DEV'>('ENG');
  const [timeString, setTimeString] = useState('00:00:00');
  const { displayText: brandText, triggerScramble } = useTextScramble('MANALITH');

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setTimeString(d.toTimeString().split(' ')[0]);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut: ESC closes nav matrix
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isNavMatrixOpen) {
        setIsNavMatrixOpen(false);
        soundFx.playCyberClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNavMatrixOpen]);

  const handleToggleAudio = () => {
    const nextMuted = soundFx.toggleMute();
    setIsAudioMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playCyberClick();
    }
  };

  const handleOpenMatrix = () => {
    soundFx.playMatrixOpen();
    setIsNavMatrixOpen(true);
  };

  const handleCloseMatrix = () => {
    soundFx.playCyberClick();
    setIsNavMatrixOpen(false);
  };

  const navMatrixItems = [
    { code: '01', title: 'SOLUTIONS', href: '#solutions', spec: 'INTEGRATIONS / AGENTS / BRAIN' },
    { code: '02', title: 'ARCHITECTURE', href: '#how-we-build', spec: 'PIPELINE AUTOMATION & DEV' },
    { code: '03', title: 'PARTNERS', href: '#trusted-by', spec: 'ENTERPRISE TECH STACKS' },
    { code: '04', title: 'METHODOLOGY', href: '#how-we-build', spec: 'HOW WE BUILD & DEPLOY' },
    { code: '05', title: 'CAREERS', href: '#join-us', spec: 'ENGINEERING & AGENTIC ROLES' },
  ];

  const handleNavClick = (href: string) => {
    soundFx.playCyberClick();
    setIsNavMatrixOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Avant-Garde Cybernetic Top HUD Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/10 select-none">
        {/* Top calibration hairline with tick pattern */}
        <div className="w-full h-1 bg-black/5 flex items-center justify-between px-3 overflow-hidden">
          <div className="flex items-center gap-1.5 opacity-40">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className={`h-1 w-[1px] ${i % 5 === 0 ? 'bg-black h-1.5' : 'bg-neutral-400'}`} />
            ))}
          </div>
          <span className="text-[8px] font-mono-tech tracking-widest text-neutral-400">LAT: 37.7749° N // LON: -122.4194° W</span>
        </div>

        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left Wing: PROTOTYPE Tag + Counter + Brand */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* PROTOTYPE Yellow Pill Badge (Matches Image 1) */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-amber-400 text-black font-mono-tech text-[10px] font-bold tracking-wider shadow-sm border border-amber-500">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span>PROTOTYPE</span>
            </div>

            {/* Counter Box [ 03 • 09 ] (Matches Image 1) */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 border border-neutral-300 bg-neutral-50 font-mono-tech text-[10px] text-neutral-600 rounded-sm">
              <span className="text-black font-bold">03</span>
              <span className="text-amber-500">•</span>
              <span>09</span>
            </div>

            {/* Dotted Matrix Indicator Box */}
            <div className="hidden lg:grid grid-cols-4 gap-0.5 p-1 border border-neutral-200 bg-neutral-100 rounded-sm">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className={`w-1 h-1 rounded-full ${i === 2 || i === 5 ? 'bg-amber-500 animate-ping' : 'bg-neutral-400'}`} />
              ))}
            </div>

            {/* Brand Title with Scramble micro-interaction */}
            <a
              href="#"
              onMouseEnter={() => {
                soundFx.playHudHover();
                triggerScramble();
              }}
              className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
              aria-label="MANALITH Home"
            >
              <span className="font-mono-tech font-black text-lg sm:text-xl tracking-tight text-obsidian-950 uppercase">
                {brandText}
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono-tech tracking-widest text-neutral-400 uppercase">
                // AGENTS & DEV WORKFLOWS
              </span>
            </a>

            {/* Mode Switcher: ENG / DEV (Matches Image 1 Language Switcher) */}
            <div className="hidden xl:flex items-center gap-1 text-[10px] font-mono-tech border border-neutral-300 rounded px-1.5 py-0.5 bg-neutral-50">
              <button
                onClick={() => {
                  soundFx.playCyberClick();
                  setActiveLang('ENG');
                }}
                className={`px-1 rounded transition-colors ${activeLang === 'ENG' ? 'bg-black text-white font-bold' : 'text-neutral-500 hover:text-black'}`}
              >
                ENG
              </button>
              <span className="text-neutral-300">/</span>
              <button
                onClick={() => {
                  soundFx.playCyberClick();
                  setActiveLang('DEV');
                }}
                className={`px-1 rounded transition-colors ${activeLang === 'DEV' ? 'bg-black text-white font-bold' : 'text-neutral-500 hover:text-black'}`}
              >
                DEV
              </button>
            </div>
          </div>

          {/* Center Wing: Binary Hex Stream & Editorial Telemetry (Matches Image 2) */}
          <div className="hidden 2xl:flex items-center gap-4 text-[10px] font-mono-tech text-neutral-400 tracking-wider overflow-hidden">
            <span className="text-neutral-500">SLASH-IVD</span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-600 font-mono tracking-tighter">
              01010011 01001111 01001001 01010011
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-black font-semibold flex items-center gap-1">
              <span className="text-amber-500">+</span> ENDLESS CELLS // INTERLINKED. ▰ ◥
            </span>
          </div>

          {/* Right Wing: Audio Synthesizer Toggle + [Request Demo] + Mecha Nav Matrix Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Synthesis Toggle */}
            <button
              onClick={handleToggleAudio}
              onMouseEnter={() => soundFx.playHudHover()}
              className="p-1.5 rounded border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-neutral-700 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono-tech focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
              title={isAudioMuted ? 'Unmute Procedural HUD Audio' : 'Mute Procedural HUD Audio'}
              aria-label={isAudioMuted ? 'Sound Muted' : 'Sound Active'}
            >
              {isAudioMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden md:inline text-amber-600 font-bold">AUDIO</span>
                </>
              )}
            </button>

            {/* Quick Request Demo Pill (Desktop & Tablet) */}
            <button
              onClick={() => {
                soundFx.playCyberClick();
                onRequestDemo();
              }}
              onMouseEnter={() => soundFx.playHudHover()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-black text-white font-mono-tech text-[11px] tracking-wider uppercase transition-all duration-200 hover:bg-neutral-800 hover:shadow-sm active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
            >
              <span>[Request Demo]</span>
              <ArrowUpRight className="w-3 h-3 text-amber-400" />
            </button>

            {/* Cybernetic Navigation Matrix Trigger (Non-standard Navbar Launcher) */}
            <button
              onClick={handleOpenMatrix}
              onMouseEnter={() => soundFx.playHudHover()}
              className="group relative px-3 py-1.5 rounded-sm border border-black bg-white hover:bg-black text-black hover:text-white transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label="Open Cybernetic Navigation Matrix"
              aria-expanded={isNavMatrixOpen}
            >
              <div className="flex flex-col gap-1 items-end">
                <span className="w-4 h-[2px] bg-current transition-all group-hover:w-5" />
                <span className="w-3 h-[2px] bg-amber-400 transition-all group-hover:w-5" />
              </div>
              <span className="font-mono-tech text-[11px] font-bold tracking-widest uppercase">
                NAV // MATRIX
              </span>
              <span className="text-[9px] font-mono-tech text-neutral-400 group-hover:text-neutral-300">
                001
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Mecha HUD Navigation Matrix Overlay */}
      <AnimatePresence>
        {isNavMatrixOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Matrix"
          >
            {/* Background Micro Tech Grid Overlay */}
            <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />
            
            {/* Cyber scanline sweep */}
            <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-amber-400/5 to-transparent pointer-events-none animate-scanline" />

            {/* Modal Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="px-2 py-0.5 bg-amber-400 text-black font-mono-tech text-[10px] font-bold">
                  HUD // NAVIGATION MATRIX
                </div>
                <span className="text-xs font-mono-tech text-neutral-400">
                  SYS_TIME: {timeString}
                </span>
                <span className="hidden sm:inline text-xs font-mono-tech text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  CORE: ONLINE
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseMatrix}
                onMouseEnter={() => soundFx.playHudHover()}
                className="group flex items-center gap-2 px-3 py-1 border border-neutral-700 hover:border-amber-400 rounded text-neutral-300 hover:text-white font-mono-tech text-xs tracking-wider transition-colors cursor-pointer"
                aria-label="Close Navigation Matrix"
              >
                <span>[CLOSE // ESC]</span>
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200 text-amber-400" />
              </button>
            </div>

            {/* Main Asymmetric Grid: Left Section Index, Right Telemetry Diagnostics */}
            <div className="relative z-10 my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto w-full">
              
              {/* Left Column: Massive Brutalist Navigation Coordinates */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>TARGET VECTOR DIRECTORY</span>
                </div>

                {navMatrixItems.map((item, idx) => (
                  <motion.a
                    key={item.code}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    onMouseEnter={() => soundFx.playHudHover()}
                    className="group flex items-baseline justify-between p-3 rounded hover:bg-neutral-900/80 border border-transparent hover:border-neutral-800 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono-tech text-xs sm:text-sm text-neutral-500 group-hover:text-amber-400 transition-colors">
                        [{item.code}]
                      </span>
                      <span className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tighter text-neutral-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-200 uppercase">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden md:inline font-mono-tech text-[10px] text-neutral-500 group-hover:text-neutral-300">
                        {item.spec}
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:text-amber-400 transition-opacity" />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Right Column: Live Mecha Diagnostic Telemetry Console */}
              <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 sm:p-8 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-300">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span>SYSTEM DIAGNOSTICS</span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-neutral-500">v4.8.2-PROD</span>
                </div>

                <div className="space-y-4 font-mono-tech text-xs">
                  <div className="p-3 bg-black/50 border border-neutral-800 rounded flex justify-between items-center">
                    <span className="text-neutral-400">AGENT TOOL LATENCY</span>
                    <span className="text-emerald-400 font-bold">&lt; 15ms (OPTIMAL)</span>
                  </div>

                  <div className="p-3 bg-black/50 border border-neutral-800 rounded flex justify-between items-center">
                    <span className="text-neutral-400">HOSTED AGENT LOOPS</span>
                    <span className="text-amber-400 font-bold">10,000+ ACTIVE</span>
                  </div>

                  <div className="p-3 bg-black/50 border border-neutral-800 rounded flex justify-between items-center">
                    <span className="text-neutral-400">SECOND BRAIN RAG</span>
                    <span className="text-neutral-200 font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> 99.4% PRECISION
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      soundFx.playCyberClick();
                      setIsNavMatrixOpen(false);
                      onRequestDemo();
                    }}
                    onMouseEnter={() => soundFx.playHudHover()}
                    className="w-full py-3 px-4 rounded bg-amber-400 text-black font-mono-tech text-xs font-bold tracking-wider uppercase hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>[LAUNCH REQUEST DEMO]</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer Telemetry */}
            <div className="relative z-10 border-t border-neutral-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono-tech text-neutral-500 gap-2">
              <div>MANALITH PROTOCOL // ENDLESS CELLS INTERLINKED</div>
              <div className="flex items-center gap-3">
                <span>PRESS [ESC] TO CLOSE</span>
                <span className="text-neutral-700">|</span>
                <span>SHA-256: 8F2B...C901</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
