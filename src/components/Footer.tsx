import React from 'react';
import {
  Github,
  Mail,
  GraduationCap,
  ArrowUp,
  MapPin,
  Heart,
  Code2
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenLanyard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onOpenLanyard }) => {
  return (
    <footer className="bg-[#05070a] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full bg-[#0d1117] rounded-[11px] flex items-center justify-center font-mono font-bold text-cyan-400 text-xs">
                  AK
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {studentProfile.name}
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  Front-End Web Developer
                </p>
              </div>
            </div>

            <p className="text-slate-400 max-w-md text-xs leading-relaxed">
              BCA 2nd Year student at <span className="text-slate-200">G.J. College Rambagh Bihta</span> (Patna, Bihar). 
              Crafting responsive, human-centric web applications and dynamic interfaces with modern tools.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                Bihta, Bihar, Patna
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                GJC Bihta (PPU)
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <span className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenLanyard}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Interactive College ID Card
                </button>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  GitHub Repositories
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">
                  Tech Stack & Skills
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-cyan-400 transition-colors">
                  G.J. College Rambagh Bihta
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-3 space-y-3 text-left">
            <span className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider block">
              Social & GitHub
            </span>
            <div className="space-y-2.5">
              <a
                href={studentProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span className="font-mono">github.com/{studentProfile.githubUsername}</span>
              </a>

              <a
                href={`mailto:${studentProfile.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="font-mono truncate">{studentProfile.email}</span>
              </a>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onScrollToTop}
                id="footer-back-to-top-btn"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p className="text-[11px] font-mono">
            © {new Date().getFullYear()} Aman Kumar • Built with React 19, TypeScript, Tailwind CSS & Motion.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400/80">
            <span>BCA 2nd Year • G.J. College Rambagh Bihta</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
