import React, { useState, useEffect } from 'react';
import { Github, Mail, Sparkles, Menu, X, IdCard, ExternalLink } from 'lucide-react';
import { studentProfile } from '../data/portfolioData';

interface NavbarProps {
  onTriggerLanyardPull?: () => void;
  isLanyardExpanded?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerLanyardPull, isLanyardExpanded }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'College ID', href: '#academic-id' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090b10]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#top"
          className="flex items-center gap-3 group"
          id="navbar-brand-link"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-[#0d1117] rounded-[11px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
              AK
            </div>
          </div>
          <div>
            <div className="font-semibold tracking-tight text-white flex items-center gap-1.5 text-base">
              <span>{studentProfile.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" title="Open to Opportunities" />
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-wide">
              BCA 2nd Yr • G.J. College Bihta
            </p>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3.5 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Lanyard Interactive Quick Trigger */}
          <button
            type="button"
            onClick={onTriggerLanyardPull}
            id="navbar-lanyard-toggle-btn"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-cyan-300 shadow-sm hover:border-cyan-500/40 transition-all cursor-pointer"
            title="Interactive Pull-down College ID Card"
          >
            <IdCard className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>{isLanyardExpanded ? 'Fold ID' : 'Pull ID Card'}</span>
          </button>

          {/* GitHub Profile */}
          <a
            href={studentProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="navbar-github-link"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-300 hover:text-white transition-all shadow-sm"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Hire / Contact Button */}
          <a
            href="#contact"
            id="navbar-contact-cta"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-medium shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Hire Aman</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="navbar-mobile-toggle"
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="navbar-mobile-menu"
          className="md:hidden bg-[#0c1017]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 mt-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onTriggerLanyardPull) onTriggerLanyardPull();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-800 text-cyan-400 border border-slate-700"
            >
              <IdCard className="w-4 h-4" />
              <span>{isLanyardExpanded ? 'Close College ID Card' : 'Pull Down College ID Card'}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Aman Kumar</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
