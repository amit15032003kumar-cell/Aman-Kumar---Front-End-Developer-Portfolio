import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Smartphone,
  Layers,
  Terminal
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-16 sm:py-20 bg-black border-b border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>Skills & Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Technologies & Tools
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Languages, frameworks, and core computer science subjects studied during BCA at G.J. College Rambagh Bihta.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-1.5">
            {skillsData.map((cat, idx) => (
              <button
                key={cat.category}
                type="button"
                onClick={() => setActiveTab(idx)}
                id={`skills-tab-${idx}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === idx
                    ? 'bg-white text-black font-semibold'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Active Skills Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsData[activeTab].skills.map((skill) => (
            <div
              key={skill.name}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                    {skill.level}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white mb-2">
                  {skill.name}
                </h4>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="space-y-1.5 pt-3 border-t border-zinc-900">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Proficiency</span>
                  <span className="text-zinc-200 font-medium">{skill.percent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full bg-zinc-300 rounded-full"
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Three focus areas */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-3">
              <Smartphone className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Responsive Front-End</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Mobile-first responsive interfaces tested on diverse mobile and desktop screen sizes without horizontal overflow.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Component Architecture</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Clean modular React code, typed props, Tailwind styling, and reusable hooks without bloat.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-3">
              <Terminal className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">CS Foundations</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              BCA curriculum grounding in C programming, Data Structures, Algorithms, DBMS, and Object-Oriented principles.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
