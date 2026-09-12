import React from 'react';
import {
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  School,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { academicTimeline, studentProfile } from '../data/portfolioData';

export const AcademicStatus: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-20 bg-[#090b10] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Credentials & Campus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            G.J. College Rambagh Bihta Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Currently pursuing the <strong className="text-slate-200">Bachelor of Computer Applications (BCA)</strong> 2nd Year, 
            blending rigorous computer science theory with modern self-driven front-end engineering.
          </p>
        </div>

        {/* Highlight Banner: Current College Profile */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0c121e] via-[#0f172a] to-[#0c121e] border border-cyan-500/30 shadow-xl shadow-cyan-950/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
                  CURRENT ENROLLMENT: BCA 2ND YEAR
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
                  Session 2024 – 2027
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ganga Ji College (G.J. College) Rambagh, Bihta
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                A prestigious constituent institution under <strong className="text-cyan-300">Patliputra University (PPU), Patna</strong>, 
                located in the educational hub of Bihta, Bihar. The BCA curriculum emphasizes structured software design, algorithms, 
                database systems, and web architecture.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Department</span>
                  <span className="text-xs font-bold text-white">Computer Applications</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Campus City</span>
                  <span className="text-xs font-bold text-white">Bihta (Patna, Bihar)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Student Status</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Regular 2nd Year
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card: College Crest & Quick Fact */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#090d15] border border-slate-800 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
                <School className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Academic Integrity</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Roll No: <span className="font-mono text-cyan-300">{studentProfile.rollNo}</span>
                </p>
              </div>
              <div className="text-xs text-slate-300 bg-slate-900/90 py-2 px-3 rounded-xl border border-slate-800 w-full text-center">
                Patliputra University Affiliation Code: Verified
              </div>
            </div>

          </div>
        </div>

        {/* Timeline of Education */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white text-left flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Educational Milestones</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicTimeline.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#0c1017] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between text-left space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
                      {item.period}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">
                    {item.degree}
                  </h4>
                  <p className="text-xs font-medium text-cyan-400 mb-2">
                    {item.institution} • {item.university}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/90 space-y-1.5">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
