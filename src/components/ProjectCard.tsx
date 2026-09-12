import React, { useState } from 'react';
import {
  Star,
  GitFork,
  ExternalLink,
  Github,
  RotateCw,
  Sparkles,
  Layers,
  Code,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Toggle flip on click for mobile/touch or desktop click
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="perspective-1000 w-full h-[430px] sm:h-[440px] group cursor-pointer select-none"
      onClick={toggleFlip}
      id={`project-card-container-${project.name}`}
      title="Click or hover to flip card"
    >
      {/* 3D Flipping Inner Wrapper */}
      <div
        className={`relative w-full h-full duration-700 preserve-3d transition-transform ease-out ${
          isFlipped ? 'rotate-y-180' : 'group-hover:rotate-y-180'
        }`}
      >
        {/* =========================================
            FRONT SIDE OF 3D CARD
           ========================================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-[#0e131d] border border-slate-800 group-hover:border-cyan-500/50 p-6 flex flex-col justify-between shadow-xl shadow-black/40 overflow-hidden transition-colors">
          
          {/* Subtle top corner gradient highlight */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          
          {/* Header Row: Language & Category */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-[11px] font-mono font-medium text-slate-300">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.languageColor || '#38bdf8' }}
                />
                {project.language || 'Code'}
              </span>

              <div className="flex items-center gap-2">
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-semibold text-cyan-300">
                    <Sparkles className="w-2.5 h-2.5 fill-current" />
                    Featured
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                  <span>{project.stars}</span>
                </div>
              </div>
            </div>

            {/* Project Title & Short Name */}
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors mb-1 line-clamp-1">
              {project.title || project.name}
            </h3>
            <p className="text-xs font-mono text-cyan-400/80 mb-3 truncate">
              github.com/amit15032003kumar-cell/{project.name}
            </p>

            {/* Visual Graphic / Preview Card Graphic */}
            <div className={`w-full h-32 sm:h-34 rounded-xl bg-gradient-to-br ${project.previewGradient || 'from-slate-900 to-slate-950'} border border-slate-800/90 p-3.5 flex flex-col justify-between relative overflow-hidden my-2 shadow-inner`}>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-slate-300">
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  <span>source/{project.name}</span>
                </span>
                <span className="text-[10px] text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                  repo:active
                </span>
              </div>

              <div className="space-y-1 z-10">
                <p className="text-xs text-slate-200 font-medium line-clamp-2 leading-snug">
                  {project.description}
                </p>
              </div>

              {/* Decorative background grid */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
            </div>
          </div>

          {/* Topics & Tags */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(project.topics || []).slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-400"
                >
                  #{topic}
                </span>
              ))}
            </div>

            {/* Flip Hint Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Hover or tap to reveal</span>
              </span>
              <span className="text-[11px] text-slate-400 font-sans">
                Details & Architecture →
              </span>
            </div>
          </div>

        </div>

        {/* =========================================
            BACK SIDE OF 3D CARD (Revealed on Rotate)
           ========================================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-b from-[#0f1422] via-[#0b0e16] to-[#07090e] border-2 border-cyan-500/50 p-6 flex flex-col justify-between shadow-2xl shadow-cyan-950/40 overflow-hidden text-left">
          
          {/* Header Row */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider">
                  Technical Architecture
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <RotateCw className="w-3 h-3" />
                <span>Flip Back</span>
              </button>
            </div>

            <h4 className="text-lg font-bold text-white mb-2 line-clamp-1">
              {project.title || project.name}
            </h4>

            {/* Deep Description */}
            <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-3">
              {project.detailedDescription || project.description}
            </p>

            {/* Architecture Highlights */}
            <div className="space-y-1.5 my-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block font-semibold">
                Key Highlights
              </span>
              {(project.highlights || []).slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1 text-[11px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Area: Metrics & Action Links */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            {/* Meta Stats Row */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-[9px] text-slate-400 uppercase block">Stars</span>
                <span className="font-bold text-amber-300">{project.stars}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase block">Forks</span>
                <span className="font-bold text-slate-300">{project.forks}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase block">Primary</span>
                <span className="font-bold text-cyan-300 truncate block">
                  {project.language || 'Code'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Repo</span>
              </a>

              <a
                href={project.liveUrl || project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch / Info</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
