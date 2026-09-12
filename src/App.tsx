import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsSection } from './components/SkillsSection';
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

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

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
      {/* Top Navbar with Theme Toggle */}
      <Navbar
        onTriggerLanyardPull={handleTriggerLanyard}
        isLanyardExpanded={isLanyardExpanded}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main>
        {/* Hero with Lanyard Badge */}
        <Hero
          onExploreProjects={handleScrollToProjects}
          onOpenContact={handleScrollToContact}
          isLanyardExpanded={isLanyardExpanded}
          onToggleLanyard={setIsLanyardExpanded}
        />

        {/* Dynamic GitHub Project Gallery with 3D Flip Cards */}
        <ProjectGallery />

        {/* Technical Skills & Capabilities */}
        <SkillsSection />

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
    </div>
  );
}
