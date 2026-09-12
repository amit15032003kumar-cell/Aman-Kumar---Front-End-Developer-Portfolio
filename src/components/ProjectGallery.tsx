import React, { useState, useEffect } from 'react';
import {
  Github,
  RefreshCw,
  Search,
  ExternalLink,
  Code2,
  FolderGit2
} from 'lucide-react';
import { Project } from '../types';
import { fallbackProjects, studentProfile } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';

export const ProjectGallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Fetch real GitHub repos dynamically
  const fetchGitHubRepos = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await fetch(
        `https://api.github.com/users/${studentProfile.githubUsername}/repos?sort=updated&per_page=30`
      );
      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }
      const repos = await response.json();
      if (Array.isArray(repos)) {
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
          let languageColor = '#a1a1aa';
          if (language === 'HTML' || language.includes('HTML')) languageColor = '#d4d4d8';
          else if (language === 'JavaScript' || language === 'JS') languageColor = '#e4e4e7';
          else if (language === 'Kotlin') languageColor = '#71717a';
          else if (language === 'Python' || language === 'Jupyter') languageColor = '#a1a1aa';
          else if (language === 'TypeScript' || language === 'TS') languageColor = '#e4e4e7';
          else if (language === 'CSS') languageColor = '#a1a1aa';

          return {
            id: repo.id,
            name: repo.name,
            title: existing ? existing.title : repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || (existing ? existing.description : 'Open-source repository built by Aman Kumar.'),
            detailedDescription: existing ? existing.detailedDescription : (repo.description || 'Developed during BCA coursework and independent front-end exploration, prioritizing responsive design and clean code.'),
            language,
            languageColor: existing ? existing.languageColor : languageColor,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            repoUrl: repo.html_url,
            liveUrl: repo.homepage || (existing ? existing.liveUrl : repo.html_url),
            topics: repo.topics && repo.topics.length > 0 ? repo.topics : (existing ? existing.topics : ['web', 'front-end']),
            category: existing ? existing.category : 'web',
            featured: existing ? existing.featured : repo.stargazers_count > 0,
            highlights: existing ? existing.highlights : [
              'Clean modular structure',
              'Responsive mobile layout',
              'Git version controlled'
            ],
            previewGradient: existing ? existing.previewGradient : 'from-zinc-900 to-black',
            updatedAt: repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : undefined
          };
        });

        mergedProjects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        setProjects(mergedProjects);
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err: unknown) {
      console.warn('GitHub sync notice:', err);
    } finally {
      // Ensure smooth skeleton visibility to prevent visual flickering
      const elapsed = Date.now() - startTime;
      const remainingDelay = Math.max(0, 650 - elapsed);
      setTimeout(() => {
        setLoading(false);
      }, remainingDelay);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  // Filter projects
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
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'web', label: 'Web Applications' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'utility', label: 'Tools' },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 bg-black border-b border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <FolderGit2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub Repositories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Projects & Code
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Real repositories synced from <a href={studentProfile.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-200 hover:underline font-mono">@{studentProfile.githubUsername}</a>. 
              Hover cards for interactive spotlight glow, or tap to inspect full architecture details.
            </p>
          </div>

          {/* GitHub Status & Refresh */}
          <div className="flex items-center gap-2.5">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 font-mono flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-zinc-400" />
              <span>{projects.length} repos</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            </div>

            <button
              type="button"
              onClick={fetchGitHubRepos}
              disabled={loading}
              id="refresh-github-repos-btn"
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Sync live from GitHub"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Syncing...' : 'Sync'}</span>
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
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-black font-semibold'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or tech..."
              id="search-projects-input"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 3D Animated Flipping Cards Grid or Skeleton Loader */}
        {loading ? (
          <div
            id="projects-grid-skeleton"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-busy="true"
            aria-label="Loading repositories"
          >
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <ProjectCardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div
            id="projects-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-3">
            <Code2 className="w-7 h-7 text-zinc-600 mx-auto" />
            <h4 className="text-sm font-semibold text-white">No repositories matched your search</h4>
            <p className="text-xs text-zinc-400">
              Try a different keyword or reset the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono hover:bg-zinc-800"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* GitHub Footnote */}
        <div className="mt-10 p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-zinc-400">
            Looking for all repositories and active branches?
          </span>
          <a
            href={studentProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-mono flex items-center gap-1.5 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Open github.com/{studentProfile.githubUsername} ↗</span>
          </a>
        </div>

      </div>
    </section>
  );
};
