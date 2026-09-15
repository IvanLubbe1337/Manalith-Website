import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Loader2, Shield } from 'lucide-react';

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestDemoModal: React.FC<RequestDemoModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [tier, setTier] = useState('AI Workflow Integration & Automation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setName('');
        setEmail('');
        setCompany('');
      }, 2500);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 p-8 sm:p-10 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <>
                <div className="flex items-center gap-2 text-[11px] font-mono-tech text-neutral-500 uppercase tracking-wider mb-2">
                  <Shield className="w-3.5 h-3.5 text-obsidian-950" />
                  <span>CONFIDENTIAL ARCHITECTURE BRIEFING</span>
                </div>

                <h3 id="modal-title" className="text-2xl sm:text-3xl font-black tracking-tight text-obsidian-950 mb-2 font-sans">
                  Request Platform Briefing
                </h3>

                <p className="text-sm text-neutral-500 mb-8 font-normal leading-relaxed">
                  Connect with our lead architects to discuss integrating AI into your workflow, hosting autonomous agents, building a second brain, or developing software projects.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-neutral-700 uppercase mb-1.5">
                      Full Name
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 text-sm focus:bg-white focus:border-obsidian-950 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-neutral-700 uppercase mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 text-sm focus:bg-white focus:border-obsidian-950 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-neutral-700 uppercase mb-1.5">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Organization Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 text-sm focus:bg-white focus:border-obsidian-950 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-neutral-700 uppercase mb-1.5">
                      Project & Engagement Focus
                    </label>
                    <select
                      value={tier}
                      onChange={(e) => setTier(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 text-sm focus:bg-white focus:border-obsidian-950 focus:outline-none transition-all"
                    >
                      <option>AI Workflow Integration & Automation</option>
                      <option>Autonomous Agent Hosting & Tool Runtimes</option>
                      <option>Second Brain & Enterprise Knowledge Graph</option>
                      <option>Bespoke Software Development Project</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-lg bg-black text-white font-mono-tech text-xs tracking-wider uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>ALLOCATING ARCHITECTURE ENVIRONMENT...</span>
                        </>
                      ) : (
                        <>
                          <span>INITIALIZE DEMO PROTOCOL</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-obsidian-950 mb-2 font-sans">
                  Demo Session Scheduled
                </h4>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto font-mono-tech">
                  An encrypted calendar invitation and deployment specification packet have been dispatched to {email}.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
