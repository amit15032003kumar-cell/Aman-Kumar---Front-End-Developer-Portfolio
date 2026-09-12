import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Globe,
  Database,
  CheckCircle2,
  Smartphone,
  Palette,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { skillsData, studentProfile } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-16 sm:py-20 bg-[#07090e] relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities & Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Front-End Specialization & Academic Mastery
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered with a strong foundation in modern web technologies, responsive layouts, 
            and computer science principles from the BCA curriculum at G.J. College Bihta.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skillsData.map((cat, idx) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveTab(idx)}
              id={`skills-tab-${idx}`}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Active Skills Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillsData[activeTab].skills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-[#0d121c] border border-slate-800/90 hover:border-cyan-500/40 transition-all group shadow-lg shadow-black/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700/80 text-[10px] font-mono font-medium text-slate-300">
                    {skill.level}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {skill.name}
                </h4>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-cyan-300 font-semibold">{skill.percent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic & Front-End Philosophy Banner */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e131d] to-slate-950 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Mobile-First Responsiveness</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every layout is meticulously designed to adapt fluidly from 360px mobile viewports to large 4K displays with zero layout shifts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e131d] to-slate-950 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
              <Palette className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Sleek Dark Mode Aesthetics</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crafted with deep charcoal tones, mathematical padding scales, accessible contrast ratios, and refined glowing accents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e131d] to-slate-950 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Interactive 3D Animations</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive physics, hanging lanyard badges, and 3D card flips that engage users while maintaining snappy 60fps performance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
