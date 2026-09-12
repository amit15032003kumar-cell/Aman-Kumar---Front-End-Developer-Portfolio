import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsSection } from './components/SkillsSection';
import { AcademicStatus } from './components/AcademicStatus';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  const [isLanyardExpanded, setIsLanyardExpanded] = useState(false);

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
    <div className="min-h-screen bg-[#090b10] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        onTriggerLanyardPull={handleTriggerLanyard}
        isLanyardExpanded={isLanyardExpanded}
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
