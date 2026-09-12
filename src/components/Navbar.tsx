import React, { useState, useEffect } from 'react';
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  IdCard,
  Menu,
  X,
  ArrowDown,
  Contrast,
  Volume2,
  VolumeX
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { playUiClick, playUiPing } from '../utils/audioFeedback';

interface NavbarProps {
  onTriggerLanyardPull?: () => void;
  isLanyardExpanded?: boolean;
  theme: ThemeMode;
  onToggleTheme: () => void;
  arcadeSoundEnabled: boolean;
  onToggleArcadeSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTriggerLanyardPull,
  isLanyardExpanded,
  theme,
  onToggleTheme,
  arcadeSoundEnabled,
  onToggleArcadeSound
}) => {
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
    { name: 'College ID', href: '#academic-id' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Arcade', href: '#arcade' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-3'
          : 'bg-black/60 backdrop-blur-sm border-b border-zinc-900/60 py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Simple Brand */}
        <a
          href="#academic-id"
          onClick={() => playUiClick()}
          className="flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors"
          id="navbar-brand-link"
        >
          <span className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-xs font-bold text-zinc-200">
            AK
          </span>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-tight text-white leading-tight">
              {studentProfile.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-400 leading-none">
              G.J. College Bihta • BCA 2nd Yr
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => playUiPing()}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right quick actions */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Global Arcade Sound Toggle Button */}
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onToggleArcadeSound();
            }}
            id="navbar-arcade-sound-btn"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
              arcadeSoundEnabled
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border-zinc-750'
                : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 border-zinc-850'
            }`}
            title={arcadeSoundEnabled ? 'Global Game Audio: ON (Click to Mute)' : 'Global Game Audio: MUTED (Click to Unmute)'}
            aria-label={arcadeSoundEnabled ? 'Mute Game Audio' : 'Unmute Game Audio'}
          >
            {arcadeSoundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
                <span className="hidden lg:inline text-[11px]">Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden lg:inline text-[11px]">Muted</span>
              </>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onToggleTheme();
            }}
            id="theme-toggle-btn"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'deep-black' ? 'Slate Gray mode' : 'Deep Black mode'}`}
          >
            <Contrast className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden md:inline text-[11px]">
              {theme === 'deep-black' ? 'Deep Black' : 'Slate Gray'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playUiClick();
              onTriggerLanyardPull?.();
            }}
            id="navbar-lanyard-toggle-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
          >
            <IdCard className="w-3.5 h-3.5 text-zinc-400" />
            <span>{isLanyardExpanded ? 'Fold ID' : 'Student ID'}</span>
          </button>

          <a
            href={studentProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playUiClick()}
            id="navbar-github-link"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={studentProfile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playUiClick()}
            id="navbar-instagram-link"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Instagram (@darky__here)"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href={studentProfile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playUiClick()}
            id="navbar-linkedin-link"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="LinkedIn (Aman Kumar)"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            onClick={() => playUiPing()}
            id="navbar-contact-cta"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-zinc-200 text-black transition-colors"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => {
            playUiClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          id="navbar-mobile-toggle"
          className="md:hidden p-1.5 rounded-md text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          id="navbar-mobile-menu"
          className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-4 space-y-2 mt-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                playUiPing();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-sm text-zinc-300 hover:text-white hover:bg-zinc-900"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-900 grid grid-cols-2 gap-2">
            {/* Mobile Sound Toggle */}
            <button
              type="button"
              onClick={() => {
                playUiClick();
                onToggleArcadeSound();
              }}
              id="mobile-arcade-sound-btn"
              className="flex items-center gap-1.5 text-xs text-zinc-300 py-2 px-3 rounded-md bg-zinc-900 border border-zinc-800 justify-center cursor-pointer col-span-2 sm:col-span-1"
            >
              {arcadeSoundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Arcade Audio: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Arcade Audio: Muted</span>
                </>
              )}
            </button>

            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              id="mobile-theme-toggle-btn"
              className="flex items-center gap-1.5 text-xs text-zinc-300 py-2 px-3 rounded-md bg-zinc-900 border border-zinc-800 justify-center"
            >
              <Contrast className="w-3.5 h-3.5" />
              <span>{theme === 'deep-black' ? 'Slate Gray' : 'Deep Black'}</span>
            </button>

            <a
              href={studentProfile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-300 py-2 px-3 rounded-md bg-zinc-900 border border-zinc-800 justify-center"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={studentProfile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-300 py-2 px-3 rounded-md bg-zinc-900 border border-zinc-800 justify-center"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onTriggerLanyardPull) onTriggerLanyardPull();
              }}
              className="flex items-center gap-1.5 text-xs text-zinc-300 py-2 px-3 rounded-md bg-zinc-900 border border-zinc-800 justify-center"
            >
              <IdCard className="w-3.5 h-3.5" />
              <span>{isLanyardExpanded ? 'Fold ID' : 'Open ID'}</span>
            </button>
          </div>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-black bg-white py-2 px-3 rounded-md block w-full text-center"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
