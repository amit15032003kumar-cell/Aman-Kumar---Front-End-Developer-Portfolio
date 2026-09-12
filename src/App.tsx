import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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

export default function App() {
  const [isLanyardExpanded, setIsLanyardExpanded] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      return saved === 'slate-gray' ? 'slate-gray' : 'deep-black';
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

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'deep-black' ? 'slate-gray' : 'deep-black'));
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
      className={`min-h-screen ${
        theme === 'slate-gray' ? 'theme-slate-gray' : 'theme-deep-black'
      } bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white font-sans antialiased transition-colors duration-200`}
    >
      {/* Top Navbar with Theme & Global Sound Toggle */}
      <Navbar
        onTriggerLanyardPull={handleTriggerLanyard}
        isLanyardExpanded={isLanyardExpanded}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        arcadeSoundEnabled={arcadeSoundEnabled}
        onToggleArcadeSound={handleToggleArcadeSound}
      />

      <main>
        {/* Hero with Lanyard Badge */}
        <Hero
          onExploreProjects={handleScrollToProjects}
          onOpenContact={handleScrollToContact}
          isLanyardExpanded={isLanyardExpanded}
          onToggleLanyard={setIsLanyardExpanded}
        />

        {/* Live System & Developer Status Bar (Black & Slate Grey) */}
        <DeveloperStatusBar
          arcadeSoundEnabled={arcadeSoundEnabled}
          onToggleArcadeSound={handleToggleArcadeSound}
        />

        {/* Dynamic GitHub Project Gallery */}
        <ProjectGallery />

        {/* Technical Skills & Capabilities */}
        <SkillsSection />

        {/* Retro Terminal Arcade Mini-Game (Byte Runner & Console) */}
        <DevArcadeGame
          soundEnabled={arcadeSoundEnabled}
          onToggleSound={handleToggleArcadeSound}
        />

        {/* Academic Profile: G.J. College Rambagh Bihta */}
        <AcademicStatus />

        {/* Integrated Contact Form */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onOpenLanyard={handleTriggerLanyard}
      />

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
