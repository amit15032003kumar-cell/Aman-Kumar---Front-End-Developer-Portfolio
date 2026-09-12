import React, { useState, useEffect } from 'react';
import {
  Github,
  RefreshCw,
  Search,
  Filter,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  FolderGit2
} from 'lucide-react';
import { Project } from '../types';
import { fallbackProjects, studentProfile } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

export const ProjectGallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Fetch real GitHub repos dynamically
  const fetchGitHubRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/users/${studentProfile.githubUsername}/repos?sort=updated&per_page=30`
      );
      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }
      const repos = await response.json();
      if (Array.isArray(repos)) {
        // Map GitHub API repos and merge with known highlights & titles
        const mergedProjects: Project[] = repos.map((repo: {
          id: number;
          name: string;
          description: string | null;
          html_url: string;
          homepage: string | null;
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          topics: string[];
          updated_at: string;
        }) => {
          const existing = fallbackProjects.find(
            (p) => p.name.toLowerCase() === repo.name.toLowerCase()
          );

          const language = repo.language || (existing ? existing.language : 'Web');
          let languageColor = '#38bdf8';
          if (language === 'HTML' || language.includes('HTML')) languageColor = '#e34c26';
          else if (language === 'JavaScript' || language === 'JS') languageColor = '#f1e05a';
          else if (language === 'Kotlin') languageColor = '#A97BFF';
          else if (language === 'Jupyter Notebook' || language === 'Python') languageColor = '#DA5B0B';
          else if (language === 'TypeScript' || language === 'TS') languageColor = '#3178c6';
          else if (language === 'CSS') languageColor = '#563d7c';

          return {
            id: repo.id,
            name: repo.name,
            title: existing ? existing.title : repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || (existing ? existing.description : 'Open-source repository engineered by Aman Kumar for web and software development.'),
            detailedDescription: existing ? existing.detailedDescription : (repo.description || 'Developed as part of Aman Kumar\'s BCA development portfolio, emphasizing responsive UI design, modular code structure, and modern developer workflows.'),
            language,
            languageColor: existing ? existing.languageColor : languageColor,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            repoUrl: repo.html_url,
            liveUrl: repo.homepage || (existing ? existing.liveUrl : repo.html_url),
            topics: repo.topics && repo.topics.length > 0 ? repo.topics : (existing ? existing.topics : ['web-development', 'front-end']),
            category: existing ? existing.category : 'web',
            featured: existing ? existing.featured : repo.stargazers_count > 0,
            highlights: existing ? existing.highlights : [
              'Clean modular source architecture',
              'Responsive mobile and desktop rendering',
              'Integrated Git version control workflow'
            ],
            previewGradient: existing ? existing.previewGradient : 'from-slate-900 via-slate-800 to-slate-950',
            updatedAt: repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : undefined
          };
        });

        // Ensure priority ordering: featured first
        mergedProjects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        setProjects(mergedProjects);
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch from GitHub';
      console.warn('GitHub API fetch notice (using robust cached portfolio):', msg);
      // Retain fallback curated list gracefully
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  // Filter projects by category and search query
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeCategory === 'all') return true;
    if (activeCategory === 'featured') return proj.featured;
    return proj.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'All Repositories' },
    { id: 'featured', label: 'Featured Projects' },
    { id: 'web', label: 'Web Applications' },
    { id: 'mobile', label: 'Mobile / Android' },
    { id: 'utility', label: 'Data & Utilities' },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800/80">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub Repository Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Dynamic Project Showcase
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              Extracted directly from <a href={studentProfile.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline font-mono">@{studentProfile.githubUsername}</a>. 
              Featuring interactive <strong className="text-slate-200">3D rotating cards</strong> that flip on hover to reveal architectural details.
            </p>
          </div>

          {/* GitHub Sync Status Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>Extracted {projects.length} Repos</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <button
              type="button"
              onClick={fetchGitHubRepos}
              disabled={loading}
              id="refresh-github-repos-btn"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 hover:text-cyan-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh repositories from GitHub"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Extracting...' : 'Sync Live'}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                id={`filter-category-${cat.id}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              id="search-projects-input"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 3D Animated Flipping Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div
            id="projects-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
            <Code2 className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-base font-bold text-white">No matching repositories found</h4>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or reset category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Footer Callout to GitHub */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e1420] to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Interested in inspecting full commits & pull requests?
              </h4>
              <p className="text-xs text-slate-400">
                Explore all branches, source files, and contribution graphs on Aman's GitHub profile.
              </p>
            </div>
          </div>

          <a
            href={studentProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="gallery-github-cta"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all flex-shrink-0"
          >
            <span>Visit @{studentProfile.githubUsername}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
