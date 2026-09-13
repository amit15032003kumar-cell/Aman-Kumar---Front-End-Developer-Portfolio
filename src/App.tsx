import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ScrollReveal } from './components/ScrollReveal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DeveloperStatusBar } from './components/DeveloperStatusBar';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsSection } from './components/SkillsSection';
import { DevArcadeGame } from './components/DevArcadeGame';
import { AcademicStatus } from './components/AcademicStatus';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ThemeMode } from './types';
import { playUiClick } from './utils/audioFeedback';

export default function App() {
  const [isLanyardExpanded, setIsLanyardExpanded] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'slate-gray' || saved === 'deep-black') {
        return saved;
      }
      return 'deep-black';
    } catch {
      return 'deep-black';
    }
  });

  // Global Arcade Sound State (Mute / Unmute across entire portfolio)
  const [arcadeSoundEnabled, setArcadeSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('arcade-audio-enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });
  const [soundToastMessage, setSoundToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleArcadeSound = () => {
    setArcadeSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('arcade-audio-enabled', String(next));
      } catch {
        // ignore
      }
      setSoundToastMessage(next ? 'Arcade Audio: Enabled [ON]' : 'Arcade Audio: Muted [OFF]');
      return next;
    });
  };

  // Auto-dismiss sound toast
  useEffect(() => {
    if (!soundToastMessage) return;
    const timer = setTimeout(() => {
      setSoundToastMessage(null);
    }, 2200);
    return () => clearTimeout(timer);
  }, [soundToastMessage]);

  // Global subtle tactile click feedback on interactive element clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest('button, a, [role="button"], input[type="radio"], input[type="checkbox"]');
      if (clickable) {
        playUiClick();
      }
    };
    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
    return () => window.removeEventListener('click', handleGlobalClick, { capture: true });
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'deep-black') return 'slate-gray';
      if (prev === 'slate-gray') return 'light';
      return 'deep-black';
    });
  };

  const handleSelectTheme = (mode: ThemeMode) => {
    setTheme(mode);
  };

  const handleTriggerLanyard = () => {
    setIsLanyardExpanded((prev) => !prev);
    const element = document.getElementById('academic-id');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden ${
        theme === 'light'
          ? 'theme-light'
          : theme === 'slate-gray'
          ? 'theme-slate-gray'
          : 'theme-deep-black'
      } bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white font-sans antialiased transition-colors duration-200`}
    >
      {/* Top Navbar with Theme & Global Sound Toggle */}
      <Navbar
        onTriggerLanyardPull={handleTriggerLanyard}
        isLanyardExpanded={isLanyardExpanded}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onSelectTheme={handleSelectTheme}
        arcadeSoundEnabled={arcadeSoundEnabled}
        onToggleArcadeSound={handleToggleArcadeSound}
      />

      <main className="w-full overflow-x-hidden">
        {/* Hero with Lanyard Badge */}
        <Hero
          onExploreProjects={handleScrollToProjects}
          onOpenContact={handleScrollToContact}
          isLanyardExpanded={isLanyardExpanded}
          onToggleLanyard={setIsLanyardExpanded}
        />

        {/* Live System & Developer Status Bar */}
        <ScrollReveal delayMs={50}>
          <DeveloperStatusBar
            arcadeSoundEnabled={arcadeSoundEnabled}
            onToggleArcadeSound={handleToggleArcadeSound}
          />
        </ScrollReveal>

        {/* Dynamic GitHub Project Gallery */}
        <ScrollReveal delayMs={100}>
          <ProjectGallery />
        </ScrollReveal>

        {/* Technical Skills & Capabilities */}
        <ScrollReveal delayMs={100}>
          <SkillsSection />
        </ScrollReveal>

        {/* Retro Terminal Arcade Mini-Game */}
        <ScrollReveal delayMs={100}>
          <DevArcadeGame
            soundEnabled={arcadeSoundEnabled}
            onToggleSound={handleToggleArcadeSound}
          />
        </ScrollReveal>

        {/* Academic Profile: G.J. College Rambagh Bihta */}
        <ScrollReveal delayMs={100}>
          <AcademicStatus />
        </ScrollReveal>

        {/* Integrated Contact Form */}
        <ScrollReveal delayMs={100}>
          <ContactForm />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <ScrollReveal delayMs={60}>
        <Footer
          onScrollToTop={handleScrollToTop}
          onOpenLanyard={handleTriggerLanyard}
        />
      </ScrollReveal>

      {/* Floating Audio Toast Notification for Instant Feedback */}
      {soundToastMessage && (
        <div
          id="global-sound-toast"
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-zinc-950/95 border border-zinc-750 text-xs font-mono shadow-2xl backdrop-blur-md text-zinc-200 transition-all pointer-events-none"
        >
          {arcadeSoundEnabled ? (
            <Volume2 className="w-4 h-4 text-zinc-300" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-500" />
          )}
          <span>{soundToastMessage}</span>
        </div>
      )}
    </div>
  );
}
