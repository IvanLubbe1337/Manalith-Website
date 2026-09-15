import React from 'react';
import { motion } from 'framer-motion';
import { MonolithCanvas } from './MonolithCanvas';
import { ArrowRight, Terminal, Crosshair } from 'lucide-react';
import { soundFx } from '../utils/AudioEffects';
import { useTextScramble } from '../hooks/useTextScramble';

interface HeroProps {
  onDiscoverSolutions: () => void;
  onExplorePlatform: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverSolutions, onExplorePlatform }) => {
  const { displayText: headlineText, triggerScramble } = useTextScramble('INTELLIGENCE.');

  return (
    <section className="relative min-h-[94vh] pt-24 pb-16 md:pt-28 md:pb-24 flex items-center bg-white overflow-hidden select-none">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

      {/* Giant Avant-Garde Editorial Typography Backdrop (Matches "NOISIA" in Image 2 & 3) */}
      <div className="absolute top-12 sm:top-16 left-0 right-0 z-0 pointer-events-none select-none flex justify-center overflow-hidden">
        <span className="font-mono-tech font-black text-[15vw] leading-none tracking-[-0.06em] text-black/[0.035] uppercase whitespace-nowrap">
          MANALITH
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        {/* Top Micro Editorial Header (Matches Image 2) */}
        <div className="hidden sm:flex items-center justify-between pb-6 mb-2 border-b border-neutral-100 text-[10px] font-mono-tech text-neutral-400">
          <div className="flex items-center gap-2">
            <Crosshair className="w-3 h-3 text-amber-500" />
            <span>SYS_COORD: 3401 // LATENCY_OPTIMAL</span>
          </div>
          <div className="flex items-center gap-4">
            <span>+ + + 01</span>
            <span>ENDLESS CELLS // INTERLINKED</span>
            <span className="text-black font-bold">[ 2026.09.15 ]</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* System Status Pill (Image 1 Prototype / Tech Badge) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-sm border border-neutral-300 bg-neutral-50/90 w-fit text-[11px] font-mono-tech text-neutral-700 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span className="font-bold text-black">AGENT & WORKFLOW FABRIC v4.8</span>
              <span className="text-neutral-400">::</span>
              <span className="text-emerald-600 font-semibold">INITIALIZED</span>
            </div>

            {/* Giant Bold Futuristic Typography */}
            <h1
              onMouseEnter={() => {
                soundFx.playHudHover();
                triggerScramble();
              }}
              className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tighter text-obsidian-950 uppercase leading-[0.94] mb-6 font-sans cursor-default"
            >
              ENGINEERING<br />
              <span className="text-black inline-block">{headlineText}</span><br />
              ACCELERATING<br />
              INNOVATION.
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mb-8 font-normal leading-relaxed tracking-tight">
              MANALITH delivers bespoke AI integrations, autonomous agent hosting, second-brain knowledge systems, and modern software development to transform your engineering workflows.
            </p>

            {/* Cyber Micro Telemetry Roster */}
            <div className="mb-8 flex flex-wrap items-center gap-3 text-[10px] font-mono-tech text-neutral-500">
              <span className="px-2 py-0.5 bg-neutral-100 rounded-xs border border-neutral-200">
                /AI-WORKFLOWS° ▽
              </span>
              <span className="px-2 py-0.5 bg-neutral-100 rounded-xs border border-neutral-200">
                /AGENT-HOSTING ▦
              </span>
              <span className="px-2 py-0.5 bg-neutral-100 rounded-xs border border-neutral-200">
                /SECOND-BRAIN ▱
              </span>
              <span className="px-2 py-0.5 bg-neutral-100 rounded-xs border border-neutral-200">
                /SOFTWARE-DEV ◈
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary CTA: DISCOVER SOLUTIONS (With Sound FX & Cyber Styling) */}
              <button
                onClick={() => {
                  soundFx.playCyberClick();
                  onDiscoverSolutions();
                }}
                onMouseEnter={() => soundFx.playHudHover()}
                className="group relative px-7 py-3.5 rounded-sm bg-black text-white font-mono-tech text-xs tracking-wider uppercase transition-all duration-200 hover:bg-neutral-800 hover:shadow-lg active:scale-[0.98] flex items-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 border border-black"
              >
                <span>DISCOVER SOLUTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: EXPLORE OUR PLATFORM */}
              <button
                onClick={() => {
                  soundFx.playCyberClick();
                  onExplorePlatform();
                }}
                onMouseEnter={() => soundFx.playHudHover()}
                className="group px-7 py-3.5 rounded-sm bg-white text-black border border-black font-mono-tech text-xs tracking-wider uppercase transition-all duration-200 hover:bg-neutral-50 hover:shadow-sm active:scale-[0.98] flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <Terminal className="w-3.5 h-3.5 opacity-70" />
                <span>EXPLORE OUR PLATFORM</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="mt-10 pt-6 border-t border-neutral-200 grid grid-cols-3 gap-6 text-left">
              <div className="p-2 border-l border-neutral-300 pl-3">
                <div className="text-2xl font-black tracking-tight text-obsidian-950 font-sans">10x</div>
                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase mt-0.5">Workflow Velocity</div>
              </div>
              <div className="p-2 border-l border-neutral-300 pl-3">
                <div className="text-2xl font-black tracking-tight text-obsidian-950 font-sans">&lt;15ms</div>
                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase mt-0.5">Brain Retrieval</div>
              </div>
              <div className="p-2 border-l border-neutral-300 pl-3">
                <div className="text-2xl font-black tracking-tight text-obsidian-950 font-sans">100+</div>
                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase mt-0.5">Agents Hosted</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Monolith Interactive Centerpiece with Floating HUD Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <MonolithCanvas onDiscoverSolutions={onDiscoverSolutions} />
          </div>

        </div>
      </div>
    </section>
  );
};
