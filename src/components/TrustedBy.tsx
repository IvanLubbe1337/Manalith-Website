import React from 'react';
import { ShieldCheck } from 'lucide-react';

const partners = [
  { name: 'Aetheris Dynamics', icon: '⟁ AETHERIS' },
  { name: 'Nexus Cognition', icon: '◈ NEXUS_AI' },
  { name: 'Kuroshio Systems', icon: 'KUROSHIO ▰' },
  { name: 'Vanguard Cybernetics', icon: '⬡ VANGUARD' },
  { name: 'Helios Automata', icon: '☀ HELIOS' },
  { name: 'Synthetix Neural', icon: 'SYNTHETIX ◬' },
  { name: 'OmniGrid Protocol', icon: '⧬ OMNIGRID' },
  { name: 'Hyperion Labs', icon: 'HYPERION // 01' },
];

export const TrustedBy: React.FC = () => {
  return (
    <section id="trusted-by" className="py-20 bg-white border-t border-neutral-100 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ENTERPRISE GRADE PROVENANCE</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-obsidian-950 uppercase font-sans">
          TRUSTED BY
        </h2>
      </div>

      {/* Infinite Seamless Hardware-Accelerated Marquee */}
      <div className="relative w-full flex overflow-x-hidden mask-gradient-fade">
        {/* Subtle Edge Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="animate-marquee-infinite flex items-center gap-16 py-4">
          {partners.concat(partners).map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-3 text-neutral-400 hover:text-black transition-colors duration-200 cursor-pointer font-bold tracking-tight text-lg sm:text-xl font-sans shrink-0"
            >
              <span>{partner.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
