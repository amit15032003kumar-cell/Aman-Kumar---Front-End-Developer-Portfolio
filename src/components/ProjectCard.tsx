import React, { useState, useRef } from 'react';
import {
  Star,
  ExternalLink,
  Github,
  RotateCw,
  Code,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(380);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCardWidth(rect.width);
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardWidth(rect.width);
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Mirrored horizontal position for backface (rotated 180deg)
  const backX = Math.max(0, cardWidth - mousePos.x);

  return (
    <div
      ref={cardRef}
      className="perspective-1000 w-full h-[400px] group cursor-pointer select-none"
      onClick={toggleFlip}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={`project-card-container-${project.name}`}
      title="Click or hover to flip card"
    >
      {/* 3D Flipping Inner Wrapper */}
      <div
        className={`relative w-full h-full duration-500 preserve-3d transition-transform ease-out ${
          isFlipped ? 'rotate-y-180' : 'group-hover:rotate-y-180'
        }`}
      >
        {/* =========================================
            FRONT SIDE OF 3D CARD
           ========================================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-zinc-950 border border-zinc-850 p-5 flex flex-col justify-between shadow-xl shadow-black/60 overflow-hidden transition-colors text-left relative">
          
          {/* Subtle cursor spotlight glow follow effect */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-0"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.06), transparent 75%)`,
            }}
          />

          {/* Border spotlight glow follow effect */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl border border-white/30 transition-opacity duration-200 z-20"
            style={{
              opacity: isHovered ? 1 : 0,
              WebkitMaskImage: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
              maskImage: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
            }}
          />

          {/* Front Content Wrapper */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Header Row: Language & Star count */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.languageColor || '#71717a' }}
                  />
                  {project.language || 'Code'}
                </span>

                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700">
                      Featured
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
                    <Star className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{project.stars}</span>
                  </div>
                </div>
              </div>

              {/* Project Title & Repo Slug */}
              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors mb-0.5 line-clamp-1">
                {project.title || project.name}
              </h3>
              <p className="text-[11px] font-mono text-zinc-400 mb-3 truncate">
                amit15032003kumar-cell/{project.name}
              </p>

              {/* Visual Preview Box */}
              <div className="w-full h-28 rounded-lg bg-black border border-zinc-850 p-3 flex flex-col justify-between relative overflow-hidden my-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <Code className="w-3 h-3 text-zinc-400" />
                    <span>source/{project.name}</span>
                  </span>
                  <span className="text-[9px] text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                    repo
                  </span>
                </div>

                <div className="z-10">
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Topics & Flip Hint */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(project.topics || []).slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                  >
                    #{topic}
                  </span>
                ))}
              </div>

              {/* Flip Hint Bar */}
              <div className="pt-2.5 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <RotateCw className="w-3 h-3" />
                  <span>Hover or tap to flip</span>
                </span>
                <span className="text-[11px] text-zinc-400">
                  Architecture →
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================
            BACK SIDE OF 3D CARD (Revealed on Rotate)
           ========================================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-black border border-zinc-700 p-5 flex flex-col justify-between shadow-2xl shadow-black/80 overflow-hidden text-left relative">
          
          {/* Subtle cursor spotlight glow follow effect on backface */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-0"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(360px circle at ${backX}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 75%)`,
            }}
          />

          {/* Border spotlight glow follow effect on backface */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl border border-white/35 transition-opacity duration-200 z-20"
            style={{
              opacity: isHovered ? 1 : 0,
              WebkitMaskImage: `radial-gradient(220px circle at ${backX}px ${mousePos.y}px, black 30%, transparent 100%)`,
              maskImage: `radial-gradient(220px circle at ${backX}px ${mousePos.y}px, black 30%, transparent 100%)`,
            }}
          />

          {/* Back Content Wrapper */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Header Row */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-800">
                <span className="text-xs font-mono uppercase text-zinc-300 font-semibold tracking-wider">
                  Architecture & Code
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Flip Back</span>
                </button>
              </div>

              <h4 className="text-base font-bold text-white mb-2 line-clamp-1">
                {project.title || project.name}
              </h4>

              {/* Deep Description */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-3 line-clamp-3">
                {project.detailedDescription || project.description}
              </p>

              {/* Architecture Highlights */}
              <div className="space-y-1.5 my-2">
                <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block font-semibold">
                  Highlights
                </span>
                {(project.highlights || []).slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                    <CheckCircle className="w-3 h-3 text-zinc-400 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1 text-[11px] text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Area: Metrics & Action Links */}
            <div className="space-y-3 pt-2 border-t border-zinc-900">
              {/* Meta Stats Row */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono bg-zinc-950 p-2 rounded-lg border border-zinc-850">
                <div>
                  <span className="text-[9px] text-zinc-400 uppercase block">Stars</span>
                  <span className="font-bold text-zinc-200">{project.stars}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 uppercase block">Forks</span>
                  <span className="font-bold text-zinc-200">{project.forks}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 uppercase block">Lang</span>
                  <span className="font-bold text-zinc-200 truncate block">
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
                  className="py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-zinc-800 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={project.liveUrl || project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="py-1.5 px-3 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Live</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
