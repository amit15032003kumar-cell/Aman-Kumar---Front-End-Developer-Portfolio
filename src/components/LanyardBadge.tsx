import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import {
  Mail,
  Github,
  MapPin,
  GraduationCap,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  QrCode,
  ShieldCheck,
  ExternalLink,
  Phone,
  Camera,
  RotateCcw
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';

interface LanyardBadgeProps {
  isExpandedControlled?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
}

export const LanyardBadge: React.FC<LanyardBadgeProps> = ({
  isExpandedControlled,
  onToggleExpand,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string>(studentProfile.photoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Controlled or uncontrolled expansion state
  const isExpanded = isExpandedControlled !== undefined ? isExpandedControlled : internalExpanded;

  const toggleExpand = (val?: boolean) => {
    const nextVal = val !== undefined ? val : !isExpanded;
    setInternalExpanded(nextVal);
    if (onToggleExpand) onToggleExpand(nextVal);
    playSnapSound();
  };

  // Subtle web audio tactile feedback for card pull
  const playSnapSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio not permitted or supported; ignore silently
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(studentProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const res = event.target.result as string;
          setActivePhoto(res);
          localStorage.setItem('aman_portfolio_avatar', res);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Check saved avatar from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('aman_portfolio_avatar');
    if (saved) {
      setActivePhoto(saved);
    }
  }, []);

  const resetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhoto(studentProfile.photoUrl);
    localStorage.removeItem('aman_portfolio_avatar');
  };

  // Motion physics drag tracking
  const y = useMotionValue(0);
  const lanyardLength = useTransform(y, [0, 200], [100, 260]);

  return (
    <div id="academic-id" className="relative flex flex-col items-center w-full max-w-md mx-auto select-none pt-4 pb-12">
      {/* Hidden file input for photo customization */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCustomPhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Anchor ceiling mount hook */}
      <div className="flex flex-col items-center z-20">
        <div className="w-12 h-3.5 bg-slate-800 rounded-t-md border-t border-x border-slate-600 shadow-md flex items-center justify-center">
          <div className="w-2.5 h-1.5 bg-slate-400 rounded-full" />
        </div>
        <div className="w-8 h-2 bg-slate-700 rounded-b-md shadow-inner" />
      </div>

      {/* Lanyard Fabric Strap (Top Loop) */}
      <motion.div
        className="relative w-14 overflow-hidden shadow-2xl flex items-center justify-center -mt-0.5 z-10"
        style={{
          height: isExpanded ? 180 : 100,
          transition: 'height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Woven strap pattern */}
        <div className="w-full h-full bg-gradient-to-b from-cyan-900 via-blue-950 to-slate-900 border-x border-cyan-500/30 flex flex-col justify-around items-center relative shadow-lg">
          {/* Subtle stitches along edges */}
          <div className="absolute inset-y-0 left-1 w-px border-r border-dashed border-cyan-400/40" />
          <div className="absolute inset-y-0 right-1 w-px border-l border-dashed border-cyan-400/40" />
          
          {/* Repeating College lanyard ribbon typography */}
          <div className="rotate-90 text-[8px] font-mono tracking-widest text-cyan-300/80 font-bold whitespace-nowrap uppercase opacity-90">
            G.J. COLLEGE BIHTA • BCA 2024–27
          </div>
        </div>
      </motion.div>

      {/* Chrome Metal Swivel Clip & Snap Hook */}
      <div className="relative flex flex-col items-center z-20 -mt-1">
        {/* Metal Swivel ring */}
        <div className="w-9 h-4 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 rounded-md border border-slate-300 shadow-md flex items-center justify-center">
          <div className="w-6 h-1.5 bg-slate-800 rounded-sm" />
        </div>
        {/* Snap hook clip */}
        <div className="w-5 h-7 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-b-sm border-x border-b border-slate-400 shadow-lg flex items-center justify-center relative">
          <div className="w-2.5 h-3 bg-slate-900/60 rounded-sm" />
          {/* Spring gate latch */}
          <div className="absolute right-0.5 top-1.5 w-1 h-3 bg-slate-400 rounded-sm shadow-inner" />
        </div>
        {/* Badge Card Slot Hole */}
        <div className="w-12 h-3.5 bg-slate-800/90 rounded-t-lg border-t border-x border-slate-600 shadow-inner flex items-center justify-center">
          <div className="w-7 h-1.5 bg-slate-950 rounded-full border border-slate-700" />
        </div>
      </div>

      {/* Interactive Pullable ID Badge Container */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: isExpanded ? 0 : 160 }}
        dragElastic={0.25}
        dragSnapToOrigin={true}
        onDragEnd={(_, info) => {
          if (info.offset.y > 60 && !isExpanded) {
            toggleExpand(true);
          } else if (info.offset.y < -40 && isExpanded) {
            toggleExpand(false);
          }
        }}
        animate={{
          y: isExpanded ? 16 : 0,
          rotate: isExpanded ? 0 : [0, 0.6, -0.6, 0],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
          y: { type: 'spring', damping: 20, stiffness: 220 },
        }}
        id="hanging-student-id-card"
        className="w-full max-w-[360px] sm:max-w-[380px] z-30 cursor-grab active:cursor-grabbing"
      >
        {/* ID Card Acrylic Outer Sleeve */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 via-[#0e131d]/95 to-[#090b10] border border-cyan-500/30 p-1 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl transition-all duration-300 group hover:border-cyan-400/60">
          
          {/* Holographic Security Overlay Ribbon */}
          <div className="absolute -top-3 right-6 z-40 bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1 border border-white/40">
            <ShieldCheck className="w-3 h-3 text-slate-950" />
            <span>Verified Student ID</span>
          </div>

          {/* Card Inner Plastic Surface */}
          <div className="rounded-[14px] bg-[#0c1017] p-4 sm:p-5 border border-slate-800/80 relative overflow-hidden">
            
            {/* Background Guilloche / Security Pattern Watermark */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* College Header Section */}
            <div className="border-b border-slate-800/90 pb-3 mb-4 text-center relative">
              <div className="flex items-center justify-between gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-white leading-tight">
                    G.J. College Rambagh
                  </h3>
                  <p className="text-[10px] text-cyan-400 font-medium tracking-wide">
                    Bihta, Patna • Affiliated to PPU
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-[10px] font-mono font-bold">
                  BCA
                </div>
              </div>
              
              <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>STUDENT ID CARD • 2024–2027</span>
              </div>
            </div>

            {/* Middle Section: Photo & Primary Info */}
            <div className="flex items-start gap-4 mb-4">
              {/* Photo Frame */}
              <div className="relative group/photo flex-shrink-0">
                <div className="w-24 h-28 sm:w-26 sm:h-30 rounded-xl overflow-hidden bg-slate-900 border-2 border-cyan-500/40 shadow-md relative">
                  <img
                    src={activePhoto}
                    alt={studentProfile.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/photo:scale-105"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = 'https://avatars.githubusercontent.com/u/253225413?v=4';
                    }}
                  />
                  {/* Hologram Shimmer Corner */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>

                {/* Quick Photo Upload & Reset Buttons */}
                <div className="absolute -bottom-2 -right-1 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    title="Upload / Change Photo"
                    className="p-1 rounded-md bg-slate-900/90 text-cyan-400 hover:text-white border border-slate-700 shadow-md hover:bg-cyan-600 transition-colors"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                  {activePhoto !== studentProfile.photoUrl && (
                    <button
                      type="button"
                      onClick={resetPhoto}
                      title="Reset default photo"
                      className="p-1 rounded-md bg-slate-900/90 text-amber-400 hover:text-white border border-slate-700 shadow-md hover:bg-amber-600 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Student Academic Details */}
              <div className="flex-1 min-w-0 space-y-1.5 text-left">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                    Student Name
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight truncate">
                    {studentProfile.name}
                  </h4>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                    Degree & Year
                  </span>
                  <p className="text-xs font-semibold text-cyan-300">
                    BCA • 2nd Year (Regular)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                    Roll / Reg. No
                  </span>
                  <p className="text-xs font-mono text-slate-300">
                    {studentProfile.rollNo}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                    Location
                  </span>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
                    <span className="truncate">Bihta, Bihar, Patna</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Specialization Badge */}
            <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800/80 mb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Core Specialization
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Front-End Web Development
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Status</span>
                <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/60">
                  Active 2nd Yr
                </span>
              </div>
            </div>

            {/* Barcode Strip */}
            <div className="pt-2 border-t border-slate-800/90 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500">
                <QrCode className="w-4 h-4 text-slate-400" />
                <span>ID: PPU-GJC-2024-BCA-082</span>
              </div>
              {/* Simulated barcode bars */}
              <div className="flex items-center gap-[2px] h-4 opacity-50">
                <div className="w-[1px] h-full bg-slate-300" />
                <div className="w-[2px] h-full bg-slate-300" />
                <div className="w-[1px] h-full bg-slate-300" />
                <div className="w-[3px] h-full bg-slate-300" />
                <div className="w-[1px] h-full bg-slate-300" />
                <div className="w-[2px] h-full bg-slate-300" />
                <div className="w-[1px] h-full bg-slate-300" />
                <div className="w-[3px] h-full bg-slate-300" />
                <div className="w-[2px] h-full bg-slate-300" />
              </div>
            </div>

            {/* Interactive Pull Down Action Tab */}
            <button
              type="button"
              onClick={() => toggleExpand()}
              id="lanyard-pull-down-btn"
              className={`mt-4 w-full py-2.5 px-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                isExpanded
                  ? 'bg-slate-800 text-slate-200 border-slate-700'
                  : 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/30 animate-pulse'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{isExpanded ? 'Fold Contact Dossier' : 'Pull Down for Full Contact & Socials'}</span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
              )}
            </button>

            {/* Expandable Revealed Contact Tray */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  id="revealed-contact-dossier"
                  className="mt-3 pt-3 border-t border-slate-800 space-y-2.5 text-left"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Direct Communication Channels
                    </span>

                    {/* Email Copy Box */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#090c12] border border-slate-800 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="text-slate-200 font-mono truncate select-all">
                          {studentProfile.email}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-medium transition-colors cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* GitHub Profile Box */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#090c12] border border-slate-800 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Github className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                        <span className="text-slate-200 font-mono truncate">
                          {studentProfile.githubUsername}
                        </span>
                      </div>
                      <a
                        href={studentProfile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* College & Residence Info */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-[#090c12] border border-slate-800/80">
                        <span className="text-[9px] uppercase font-mono text-slate-400 block">Home District</span>
                        <p className="text-xs font-semibold text-slate-200">Patna, Bihar</p>
                      </div>
                      <div className="p-2 rounded-lg bg-[#090c12] border border-slate-800/80">
                        <span className="text-[9px] uppercase font-mono text-slate-400 block">Campus Town</span>
                        <p className="text-xs font-semibold text-slate-200">Bihta (Rambagh)</p>
                      </div>
                    </div>
                  </div>

                  {/* Fast Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`mailto:${studentProfile.email}?subject=Portfolio%20Inquiry%20from%20Website`}
                      className="py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>
                    <a
                      href="#contact"
                      onClick={() => toggleExpand(false)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Hire Form</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Tactile interaction hint below badge */}
        <div className="text-center mt-2.5 flex items-center justify-center gap-1 text-[11px] font-mono text-slate-400">
          <span>↕ Drag / pull badge down or click button to toggle dossier</span>
        </div>
      </motion.div>
    </div>
  );
};
