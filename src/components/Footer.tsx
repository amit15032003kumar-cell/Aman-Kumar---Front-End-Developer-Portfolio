import React from 'react';
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  GraduationCap,
  ArrowUp,
  MapPin
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenLanyard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onOpenLanyard }) => {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-12 pb-10 text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-bold text-white text-xs">
                AK
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {studentProfile.name}
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono">
                  Front-End Developer
                </p>
              </div>
            </div>

            <p className="text-zinc-400 max-w-md text-xs leading-relaxed">
              BCA 2nd Year student at G.J. College Rambagh Bihta (Patliputra University, Patna). Building responsive web interfaces with React, JavaScript, and Tailwind CSS.
            </p>

            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                Bihta, Patna (Bihar)
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                G.J. College
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-2.5 text-left font-mono">
            <span className="text-[11px] uppercase text-zinc-300 font-semibold tracking-wider block">
              Sections
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <a href="#academic-id" className="hover:text-white transition-colors">
                  Student ID Card
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenLanyard}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Pull ID Badge
                </button>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  GitHub Repositories
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & GitHub */}
          <div className="md:col-span-3 space-y-2.5 text-left font-mono">
            <span className="text-[11px] uppercase text-zinc-300 font-semibold tracking-wider block">
              Connect
            </span>
            <div className="space-y-2 text-xs">
              <a
                href={studentProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-zinc-400" />
                <span>@{studentProfile.githubUsername}</span>
              </a>

              <a
                href={studentProfile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-zinc-400" />
                <span>@{studentProfile.instagramUsername}</span>
              </a>

              <a
                href={studentProfile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={`mailto:${studentProfile.email}`}
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span className="truncate">{studentProfile.email}</span>
              </a>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onScrollToTop}
                id="footer-back-to-top-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 text-[11px] font-mono">
          <p>
            © {new Date().getFullYear()} Aman Kumar • Bihta, Patna, Bihar
          </p>
          <p className="text-zinc-400">
            BCA 2nd Year, G.J. College Rambagh Bihta
          </p>
        </div>

      </div>
    </footer>
  );
};
