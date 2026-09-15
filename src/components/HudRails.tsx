import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/AudioEffects';
import { FileText, ChevronDown, ChevronUp, Disc as DiscordIcon } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const HudRails: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);

        // Compute 1..5 active section based on scroll
        const section = Math.min(5, Math.max(1, Math.ceil((progress / 100) * 5)));
        setActiveSectionIndex(section);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFx.playCyberClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    soundFx.playCyberClick();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      {/* Left HUD Vertical Telemetry Rail (Matches Image 1 & 2) */}
      <aside
        className="hidden lg:flex fixed left-4 top-24 bottom-14 z-30 flex-col items-center justify-between pointer-events-none select-none"
        aria-label="System Telemetry Left Rail"
      >
        {/* Top Rail Telemetry */}
        <div className="flex flex-col items-center gap-2 pointer-events-auto">
          <div className="w-[1px] h-10 bg-neutral-300" />
          <span className="text-[8px] font-mono-tech text-neutral-400 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
            SYS_TELEMETRY // CH-01
          </span>
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
        </div>

        {/* Vertical Social & Doc Connectors with Calibrated Dots */}
        <div className="flex flex-col items-center gap-4 py-4 pointer-events-auto">
          <span className="text-[9px] font-mono-tech text-neutral-400 [writing-mode:vertical-rl] rotate-180 tracking-widest">
            FOLLOW US
          </span>
          <div className="w-4 h-[1px] bg-neutral-300" />

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHudHover()}
            className="p-1.5 rounded text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHudHover()}
            className="p-1.5 rounded text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="X / Twitter"
          >
            <XIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHudHover()}
            className="p-1.5 rounded text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Discord Community"
          >
            <DiscordIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="#how-we-build"
            onMouseEnter={() => soundFx.playHudHover()}
            className="p-1.5 rounded text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Architecture Docs"
          >
            <FileText className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Rail Calibrated Height Track */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] font-mono-tech text-neutral-400">01</span>
          <div className="w-[1px] h-12 bg-neutral-200 relative overflow-hidden">
            <div
              className="w-full bg-black transition-all duration-150"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
          <span className="text-[8px] font-mono-tech text-neutral-400">99</span>
        </div>
      </aside>

      {/* Right HUD Vertical Progress & Coordinate Rail (Matches Image 2 & 3) */}
      <aside
        className="hidden lg:flex fixed right-4 top-24 bottom-14 z-30 flex-col items-center justify-between pointer-events-none select-none"
        aria-label="System Coordinate Right Rail"
      >
        {/* Scroll To Top Quick Trigger */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundFx.playHudHover()}
          className="pointer-events-auto p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
          title="Return to Origin"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        {/* Section Coordinate Indicator [ 01 / 05 ] */}
        <div className="flex flex-col items-center gap-3 pointer-events-auto">
          <div className="px-1.5 py-0.5 border border-neutral-300 bg-white/90 font-mono-tech text-[9px] text-neutral-800 rounded shadow-xs">
            <span className="font-bold text-black">0{activeSectionIndex}</span>
            <span className="text-neutral-400"> / </span>
            <span className="text-neutral-500">05</span>
          </div>

          <span className="text-[8px] font-mono-tech text-neutral-400 tracking-widest [writing-mode:vertical-rl]">
            MANALITH.SYS // VSN-092
          </span>

          {/* Precision Tick Markers */}
          <div className="flex flex-col gap-1.5 opacity-60">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-[1.5px] ${i + 1 === activeSectionIndex ? 'bg-amber-500 w-3' : 'bg-neutral-400'} transition-all`}
              />
            ))}
          </div>

          <span className="text-[8px] font-mono-tech text-neutral-400 [writing-mode:vertical-rl]">
            AUTONOMOUS_MESH
          </span>
        </div>

        {/* Scroll To Bottom Quick Trigger */}
        <button
          onClick={scrollToBottom}
          onMouseEnter={() => soundFx.playHudHover()}
          className="pointer-events-auto p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
          title="Advance to Base"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </aside>

      {/* Bottom HUD Calibration Ruler & Viewport Frame (Matches Image 1 bottom bar) */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-neutral-200 pointer-events-none select-none">
        <div className="max-w-[1720px] mx-auto px-4 py-1.5 flex items-center justify-between text-[9px] font-mono-tech text-neutral-500">
          
          {/* Left Corner Crosshair & Telemetry */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-bold">+</span>
            <span className="text-neutral-600 font-semibold">[ GBM 798M ]</span>
            <span className="hidden sm:inline text-neutral-400">M 04</span>
          </div>

          {/* Center Precision Ruler with Millimeter Ticks & Amber Cursor (Image 1) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] text-neutral-400">00</span>
              <div className="flex items-end gap-1 h-3 px-2">
                {Array.from({ length: 21 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-[1px] ${
                      i === 10
                        ? 'h-3 bg-amber-500 w-[1.5px]'
                        : i % 5 === 0
                        ? 'h-2.5 bg-neutral-600'
                        : 'h-1.5 bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[8px] text-neutral-400">20</span>
            </div>
            <span className="text-[8px] text-neutral-400 tracking-wider">
              {Math.round(scrollProgress)}% CALIBRATED
            </span>
          </div>

          {/* Right Corner Telemetry */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-neutral-500 font-mono">ENDLESS CELLS // INTERLINKED</span>
            <span className="text-amber-500 font-bold">SYS: OK</span>
            <span className="text-neutral-400 font-bold">+</span>
          </div>

        </div>
      </footer>
    </>
  );
};
