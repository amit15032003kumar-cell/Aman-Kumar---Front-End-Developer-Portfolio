import React from 'react';
import {
  GraduationCap,
  BookOpen,
  School,
  CheckCircle2
} from 'lucide-react';
import { academicTimeline, studentProfile } from '../data/portfolioData';

export const AcademicStatus: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-20 bg-black border-b border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl space-y-2 mb-10 pb-6 border-b border-zinc-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
            <span>Education</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Academic Background
          </h2>
          <p className="text-sm text-zinc-400">
            Currently enrolled in the Bachelor of Computer Applications (BCA) program at G.J. College Rambagh, Bihta (Patliputra University).
          </p>
        </div>

        {/* Current College Card */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-950 border border-zinc-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-200 font-mono text-xs border border-zinc-700">
                  BCA 2nd Year (Regular)
                </span>
                <span className="px-2.5 py-0.5 rounded bg-black text-zinc-400 font-mono text-xs border border-zinc-800">
                  2024 – 2027
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                G.J. College Rambagh, Bihta
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Constituent college under Patliputra University (PPU), Patna, situated in Bihta, Bihar. The curriculum covers core computer science subjects, programming in C/C++, DBMS, and web technology foundations.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-black border border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-400 block">Department</span>
                  <span className="text-zinc-200">Computer Applications</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black border border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-400 block">Location</span>
                  <span className="text-zinc-200">Bihta, Patna (Bihar)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black border border-zinc-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-zinc-400 block">Status</span>
                  <span className="text-zinc-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    Enrolled (2nd Yr)
                  </span>
                </div>
              </div>
            </div>

            {/* Right details box */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-lg bg-black border border-zinc-850 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Patliputra University</h4>
                <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                  Roll: <span className="text-zinc-200">{studentProfile.rollNo}</span>
                </p>
              </div>
              <div className="text-[11px] text-zinc-400 font-mono pt-1">
                Bihta Campus • Patna, Bihar
              </div>
            </div>

          </div>
        </div>

        {/* Education History List */}
        <div className="space-y-4 text-left">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-zinc-400" />
            <span>Timeline</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicTimeline.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs">
                      {item.period}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-0.5">
                    {item.degree}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mb-2">
                    {item.institution} • {item.university}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-900 space-y-1">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
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
