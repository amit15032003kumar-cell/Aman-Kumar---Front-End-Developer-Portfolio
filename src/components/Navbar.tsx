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
  Sun,
  Moon,
  Volume2,
  VolumeX
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { playUiClick, playUiPing, playCardPullUpSound, playCardPullDownSound } from '../utils/audioFeedback';

interface NavbarProps {
  onTriggerLanyardPull?: () => void;
  isLanyardExpanded?: boolean;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSelectTheme?: (mode: ThemeMode) => void;
  arcadeSoundEnabled: boolean;
  onToggleArcadeSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTriggerLanyardPull,
  isLanyardExpanded,
  theme,
  onToggleTheme,
  onSelectTheme,
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
              <span className="md:hidden lg:inline">G.J. College Bihta • BCA 2nd Yr</span>
              <span className="hidden md:inline lg:hidden">G.J. College • BCA</span>
            </span>
          </div>
        </a>

        {/* Tablet Nav (768px - 1023px): Streamlined 4-item pill dock */}
        <nav className="hidden md:flex lg:hidden items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-950/70 border border-zinc-800 backdrop-blur-md text-[11px] font-mono text-zinc-400">
          {[
            { name: 'Projects', href: '#projects' },
            { name: 'Skills', href: '#skills' },
            { name: 'Arcade', href: '#arcade' },
            { name: 'Contact', href: '#contact' },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                playUiClick();
                playUiPing();
              }}
              id={`nav-link-tablet-${link.name.toLowerCase()}`}
              className="px-2 py-0.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Nav (1024px+): Full 6-item pill dock */}
        <nav className="hidden lg:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/70 border border-zinc-850/80 backdrop-blur-md shadow-inner text-xs font-mono text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                playUiClick();
                playUiPing();
              }}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-2.5 py-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900/80 transition-all cursor-pointer whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right quick actions */}
        <div className="hidden sm:flex items-center gap-1.5 md:gap-2 lg:gap-2.5">
          {/* Utility Cluster: Sound & Theme */}
          <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-lg p-0.5 shadow-sm">
            {/* Global Arcade Sound Toggle Button */}
            <button
              type="button"
              onClick={() => {
                playUiClick();
                onToggleArcadeSound();
              }}
              id="navbar-arcade-sound-btn"
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                arcadeSoundEnabled
                  ? 'bg-zinc-800 text-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title={arcadeSoundEnabled ? 'Global Game Audio: ON (Click to Mute)' : 'Global Game Audio: MUTED (Click to Unmute)'}
              aria-label={arcadeSoundEnabled ? 'Mute Game Audio' : 'Unmute Game Audio'}
            >
              {arcadeSoundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              )}
              <span className="hidden xl:inline text-[11px]">
                {arcadeSoundEnabled ? 'Sound' : 'Muted'}
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => {
                playUiClick();
                onToggleTheme();
              }}
              id="theme-toggle-btn"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title={`Theme: ${
                theme === 'light'
                  ? 'Light Mode'
                  : theme === 'slate-gray'
                  ? 'Slate Gray Mode'
                  : 'Deep Black Mode'
              } (Click to switch)`}
            >
              {theme === 'light' ? (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              ) : theme === 'slate-gray' ? (
                <Moon className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <Contrast className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span className="hidden xl:inline text-[11px]">
                {theme === 'light'
                  ? 'Light'
                  : theme === 'slate-gray'
                  ? 'Slate'
                  : 'Black'}
              </span>
            </button>
          </div>

          {/* Student ID Card Pull/Fold Trigger */}
          <button
            type="button"
            onClick={() => {
              playUiClick();
              if (isLanyardExpanded) {
                playCardPullUpSound();
              } else {
                playCardPullDownSound();
              }
              onTriggerLanyardPull?.();
            }}
            id="navbar-lanyard-toggle-btn"
            className="flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex-shrink-0"
            title={isLanyardExpanded ? 'Fold Student ID back up' : 'Pull Student ID down'}
          >
            <IdCard className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden md:inline">{isLanyardExpanded ? 'Fold ID' : 'Student ID'}</span>
          </button>

          {/* GitHub Icon (Desktop) */}
          <a
            href={studentProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playUiClick()}
            id="navbar-github-link"
            className="hidden lg:flex p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors flex-shrink-0"
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          {/* Contact Action */}
          <a
            href="#contact"
            onClick={() => {
              playUiClick();
              playUiPing();
            }}
            id="navbar-contact-cta"
            className="px-2.5 sm:px-3 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-zinc-200 text-black transition-colors flex-shrink-0 shadow-sm"
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

            {/* Mobile Theme Selector */}
            <div className="col-span-2 flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 gap-1">
              <span className="text-[10px] font-mono text-zinc-400 px-2 uppercase">Theme:</span>
              <button
                type="button"
                onClick={() => {
                  playUiClick();
                  onSelectTheme ? onSelectTheme('deep-black') : onToggleTheme();
                }}
                id="mobile-theme-black-btn"
                className={`flex-1 py-1.5 px-2 text-xs font-mono rounded-md flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  theme === 'deep-black'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Contrast className="w-3.5 h-3.5" />
                <span>Black</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playUiClick();
                  onSelectTheme ? onSelectTheme('slate-gray') : onToggleTheme();
                }}
                id="mobile-theme-slate-btn"
                className={`flex-1 py-1.5 px-2 text-xs font-mono rounded-md flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  theme === 'slate-gray'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-blue-400" />
                <span>Slate</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playUiClick();
                  onSelectTheme ? onSelectTheme('light') : onToggleTheme();
                }}
                id="mobile-theme-light-btn"
                className={`flex-1 py-1.5 px-2 text-xs font-mono rounded-md flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
            </div>

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
