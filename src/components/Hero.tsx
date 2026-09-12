import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  IdCard,
  Code,
  ExternalLink
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';
import { LanyardBadge } from './LanyardBadge';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenContact: () => void;
  isLanyardExpanded: boolean;
  onToggleLanyard: (expanded: boolean) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onOpenContact,
  isLanyardExpanded,
  onToggleLanyard
}) => {
  const roles = useMemo(
    () => ['Front-End Developer', 'BCA Student', 'UI Designer'],
    []
  );

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      // Completed typing the current role, wait before backspacing
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText === '') {
      // Finished backspacing, move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      // Typing or backspacing each character
      const typingSpeed = isDeleting ? 40 : 85;
      timer = setTimeout(() => {
        setDisplayText((prev) => {
          if (isDeleting) {
            return currentRole.substring(0, prev.length - 1);
          } else {
            return currentRole.substring(0, prev.length + 1);
          }
        });
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section id="academic-id" className="relative pt-4 sm:pt-8 pb-16 lg:pb-20 border-b border-zinc-900 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid: ID Card is prioritized at the top on mobile and prominently presented on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Lanyard Student ID Card */}
          <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
            <div className="w-full flex flex-col items-center">
              <LanyardBadge
                isExpandedControlled={isLanyardExpanded}
                onToggleExpand={onToggleLanyard}
              />
            </div>
          </div>

          {/* Genuine Human Developer Bio */}
          <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1 pt-2 lg:pt-4">
            
            {/* Real status indicator - Black & Grey styling */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
              <span>Available for front-end developer roles & internships</span>
            </div>

            {/* Direct personal intro */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Aman Kumar
              </h1>

              {/* Dynamic Typing Animation for Roles */}
              <div
                id="hero-typing-role"
                className="flex items-center min-h-[2.25rem] text-lg sm:text-xl font-medium text-zinc-300"
              >
                <span className="text-zinc-500 font-mono text-sm sm:text-base mr-2 select-none">
                  ❯
                </span>
                <span className="text-white font-semibold font-mono tracking-tight">
                  {displayText}
                </span>
                <span className="inline-block w-2 h-5 bg-zinc-400 ml-1.5 animate-pulse" />
              </div>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                I'm a student at <span className="text-white font-medium">G.J. College Rambagh, Bihta</span> (Patliputra University, Patna). 
                I focus on building clean, responsive web applications using React, JavaScript, and Tailwind CSS.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono">
                Pull down my college badge on the right (or tap the button) to inspect my student credentials, verified roll number, and direct contact channels.
              </p>
            </div>

            {/* College & Academic Details Table */}
            <div className="grid grid-cols-2 gap-2.5 max-w-lg pt-1 text-xs font-mono">
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase block">College</span>
                <span className="text-zinc-200 font-medium">G.J. College Rambagh</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase block">Affiliation</span>
                <span className="text-zinc-200 font-medium">Patliputra University</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase block">Location</span>
                <span className="text-zinc-200 font-medium">Bihta, Patna (Bihar)</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase block">Program</span>
                <span className="text-zinc-200 font-medium">BCA (Session 2024–27)</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreProjects}
                id="hero-explore-projects-btn"
                className="px-5 py-2.5 rounded-lg font-semibold text-xs bg-white hover:bg-zinc-200 text-black flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onToggleLanyard(!isLanyardExpanded)}
                id="hero-toggle-lanyard-btn"
                className="px-4 py-2.5 rounded-lg font-medium text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <IdCard className="w-3.5 h-3.5 text-zinc-400" />
                <span>{isLanyardExpanded ? 'Fold ID Card' : 'Pull Student ID'}</span>
              </button>

              <a
                href={studentProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-github-btn"
                className="px-4 py-2.5 rounded-lg font-medium text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 flex items-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub ({studentProfile.githubUsername})</span>
              </a>

              <a
                href={studentProfile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-instagram-btn"
                className="px-4 py-2.5 rounded-lg font-medium text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 flex items-center gap-2 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@{studentProfile.instagramUsername}</span>
              </a>

              <a
                href={studentProfile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-linkedin-btn"
                className="px-4 py-2.5 rounded-lg font-medium text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href="#contact"
                onClick={onOpenContact}
                id="hero-contact-btn"
                className="px-4 py-2.5 rounded-lg font-medium text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 flex items-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Message Me</span>
              </a>
            </div>

            {/* Human developer note */}
            <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400 font-mono">
              <span>● Real GitHub repositories</span>
              <span>● G.J. College Rambagh verified ID</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
