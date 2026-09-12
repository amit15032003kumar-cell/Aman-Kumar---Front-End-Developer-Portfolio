import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Github,
  MapPin,
  GraduationCap,
  Download,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  IdCard
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
  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Introduction & Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Academic & Status Chips */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>BCA 2nd Year • G.J. College Rambagh Bihta</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Bihta, Bihar (Patna)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Internships & Projects</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">{studentProfile.name}</span>.
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-300">
                  Building Modern Front-End Web Experiences.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed pt-2">
                I am a BCA 2nd year student at <span className="text-slate-200 font-semibold">G.J. College Rambagh Bihta</span> (Patna, Bihar). 
                I specialize in <strong className="text-cyan-300 font-semibold">Front-End Development</strong>, crafting high-performance, 
                responsive, and aesthetic web interfaces with modern frameworks, 3D animations, and clean architectures.
              </p>
            </div>

            {/* Key Skill Highlights Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Expertise</div>
                  <div className="text-sm font-bold text-slate-200">React & Modern UI</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/40">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Design</div>
                  <div className="text-sm font-bold text-slate-200">Responsive & Dark</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Code Hub</div>
                  <div className="text-sm font-bold text-slate-200">8+ GitHub Repos</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                type="button"
                onClick={onExploreProjects}
                id="hero-explore-projects-btn"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore GitHub Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onToggleLanyard(!isLanyardExpanded)}
                id="hero-toggle-lanyard-btn"
                className="px-5 py-3 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <IdCard className="w-4 h-4 text-cyan-400" />
                <span>{isLanyardExpanded ? 'Fold College ID' : 'Pull Academic Lanyard ID'}</span>
              </button>

              <a
                href={studentProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-github-btn"
                className="px-4 py-3 rounded-xl font-medium text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-2 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Front-End Specialization
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Patliputra University Affiliated
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Interactive 3D UI & Flip Cards
              </span>
            </div>

          </div>

          {/* Right Column: College Lanyard ID Card Hanging Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-start relative">
            {/* Lanyard Feature Header Badge */}
            <div className="mb-2 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 font-semibold">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Interactive College Lanyard Card</span>
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Pull down the ID badge below to inspect contact details
              </p>
            </div>

            {/* The Lanyard Badge */}
            <LanyardBadge
              isExpandedControlled={isLanyardExpanded}
              onToggleExpand={onToggleLanyard}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
