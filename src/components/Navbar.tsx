import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onRequestDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'platform', href: '#architecture' },
    { name: 'solutions', href: '#solutions' },
    { name: 'company', href: '#trusted-by' },
    { name: 'blog', href: '#how-we-build' },
    { name: 'careers', href: '#join-us' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-black/5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
          aria-label="MANALITH Home"
        >
          <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-obsidian-950 font-sans transition-transform duration-300 group-hover:scale-[1.02]">
            MANALITH
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-tight text-neutral-600 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 transition-colors duration-200 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded"
            >
              {link.name}
            </a>
          ))}

          {/* Request Demo Pill Button (matches screenshot [Request Demo]) */}
          <button
            onClick={onRequestDemo}
            className="ml-2 px-5 py-2 rounded-full bg-black text-white font-mono-tech text-xs tracking-tight transition-all duration-200 hover:bg-neutral-800 hover:scale-[1.03] active:scale-[0.98] shadow-sm flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span>[Request Demo]</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-800 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-neutral-200 px-6 py-5 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-neutral-700 hover:text-black transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestDemo();
                }}
                className="mt-2 w-full py-3 rounded-full bg-obsidian-950 text-white font-mono-tech text-xs tracking-wider flex items-center justify-center gap-2"
              >
                <span>[Request Demo]</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
