import React, { useState, useEffect, useRef } from 'react';
import { HudNavigation } from './components/HudNavigation';
import { HudRails } from './components/HudRails';
import { Hero } from './components/Hero';
import { Solutions } from './components/Solutions';
import { HowWeBuild } from './components/HowWeBuild';
import { TrustedBy } from './components/TrustedBy';
import { JoinUs } from './components/JoinUs';
import { Footer } from './components/Footer';
import { RequestDemoModal } from './components/RequestDemoModal';

export const App: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const cursorAuraRef = useRef<HTMLDivElement>(null);

  // High-performance smooth cursor follow aura (decoupled via rAF)
  useEffect(() => {
    let animationFrameId: number;
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const loop = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (cursorAuraRef.current) {
        cursorAuraRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDiscoverSolutions = () => {
    const el = document.getElementById('solutions');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExplorePlatform = () => {
    const el = document.getElementById('how-we-build');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-obsidian-950 font-sans selection:bg-black selection:text-white pb-10">
      {/* Dynamic Subsurface Cursor Aura */}
      <div
        ref={cursorAuraRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-400/[0.04] blur-3xl z-0 transition-opacity duration-300"
      />

      {/* Cybernetic Mecha HUD Top Navigation */}
      <HudNavigation onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* Lateral HUD Telemetry Rails & Calibrated Bottom Viewport Ruler */}
      <HudRails />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onDiscoverSolutions={handleDiscoverSolutions}
          onExplorePlatform={handleExplorePlatform}
        />
        <Solutions />
        <HowWeBuild />
        <TrustedBy />
        <JoinUs />
      </main>

      {/* Minimalist Editorial Footer */}
      <Footer />

      {/* Interactive Request Demo Modal */}
      <RequestDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
};

export default App;
