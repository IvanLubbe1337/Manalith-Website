import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-neutral-200 py-16 text-obsidian-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-neutral-100">
          
          {/* Column 1: Legal Info (Matches Screenshot) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold font-mono-tech tracking-wider uppercase text-neutral-900 mb-4">
              Legal Info
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-500 font-normal">
              <li>
                <a href="#contact" className="hover:text-black transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-black transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-black transition-colors">
                  Terms and Notices
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Social (Matches Screenshot) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold font-mono-tech tracking-wider uppercase text-neutral-900 mb-4">
              Social
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-500 font-normal">
              <li>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                  Links (X / Twitter)
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                  GitHub Organization
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-black transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Telemetry & Protocol */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold font-mono-tech tracking-wider uppercase text-neutral-900 mb-4">
              Telemetry
            </h4>
            <div className="space-y-2 text-xs font-mono-tech text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>AGENT RUNTIME HEALTH: 100%</span>
              </div>
              <div>WORKFLOW ENGINE: NOMINAL</div>
              <div>SECOND BRAIN: ENCRYPTED AES-256</div>
            </div>
          </div>

          {/* Column 4: Brand Typography (Matches Screenshot: MANALITH on right) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <span className="font-black text-3xl tracking-tighter text-obsidian-950 font-sans">
              MANALITH
            </span>
            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 p-2.5 rounded-full border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-colors flex items-center justify-center text-obsidian-950 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tech text-neutral-400 gap-4">
          <div>
            © {new Date().getFullYear()} MANALITH SYSTEMS CORP. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>SOC-2 TYPE II CERTIFIED</span>
            <span>ISO/IEC 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
