import React from 'react';
import {
  Star,
  GitFork,
  ExternalLink,
  Github,
  CheckCircle
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article
      id={`project-card-${project.name}`}
      className="w-full rounded-xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 p-5 flex flex-col justify-between shadow-xl shadow-black/60 transition-colors text-left relative overflow-hidden group"
    >
      <div className="space-y-3.5">
        {/* Header: Language, Badges, and Stats */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.languageColor || '#71717a' }}
            />
            {project.language || 'Web'}
          </span>

          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700">
                Featured
              </span>
            )}
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1" title={`${project.stars} GitHub stars`}>
                <Star className="w-3.5 h-3.5 text-zinc-400" />
                <span>{project.stars}</span>
              </span>
              {project.forks > 0 && (
                <span className="flex items-center gap-1" title={`${project.forks} forks`}>
                  <GitFork className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{project.forks}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Title & Repository Path */}
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors line-clamp-1">
            {project.title || project.name}
          </h3>
          <p className="text-[11px] font-mono text-zinc-400 mt-0.5 truncate">
            amit15032003kumar-cell/{project.name}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
          {project.description || project.detailedDescription}
        </p>

        {/* Highlights / Features */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block font-semibold">
              Key Highlights
            </span>
            {project.highlights.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1 text-[11px] text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Topics / Tech Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(project.topics || []).slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400"
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>

      {/* Direct Action Buttons Footer */}
      <div className="pt-4 mt-4 border-t border-zinc-900 grid grid-cols-2 gap-2">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`project-github-btn-${project.name}`}
          className="py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
          title={`View ${project.name} on GitHub`}
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>

        <a
          href={project.liveUrl || project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`project-live-btn-${project.name}`}
          className="py-2 px-3 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          title={`Open live preview for ${project.title || project.name}`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Live</span>
        </a>
      </div>
    </article>
  );
};
