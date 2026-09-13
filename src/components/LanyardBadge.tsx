import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import {
  Mail,
  Github,
  Instagram,
  Linkedin,
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
  RotateCcw,
  RefreshCw,
  User
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';
import { IdCardSkeleton } from './IdCardSkeleton';
import { playCardPullUpSound, playCardPullDownSound, playUiClick } from '../utils/audioFeedback';

interface LanyardBadgeProps {
  isExpandedControlled?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
  isLoading?: boolean;
}

export const LanyardBadge: React.FC<LanyardBadgeProps> = ({
  isExpandedControlled,
  onToggleExpand,
  isLoading,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string>(studentProfile.photoUrl);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isLoading !== undefined ? isLoading : true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoading !== undefined) {
      setInitialLoading(isLoading);
      return;
    }
    // Smooth preparation transition on initial load
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const retriggerVerification = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInitialLoading(true);
    setPhotoLoaded(false);
    setTimeout(() => {
      setInitialLoading(false);
    }, 700);
  };

  // Controlled or uncontrolled expansion state
  const isExpanded = isExpandedControlled !== undefined ? isExpandedControlled : internalExpanded;

  const toggleExpand = (val?: boolean) => {
    const nextVal = val !== undefined ? val : !isExpanded;
    setInternalExpanded(nextVal);
    if (onToggleExpand) onToggleExpand(nextVal);
    if (nextVal) {
      playCardPullDownSound();
    } else {
      playCardPullUpSound();
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    playUiClick();
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

  if (initialLoading) {
    return (
      <div id="academic-id" className="relative flex flex-col items-center w-full max-w-md mx-auto select-none pt-1 sm:pt-2 pb-8 sm:pb-10 px-2 sm:px-0">
        <IdCardSkeleton statusMessage="Preparing Academic Credentials..." />
      </div>
    );
  }

  return (
    <div id="academic-id" className="relative flex flex-col items-center w-full max-w-md mx-auto select-none pt-1 sm:pt-2 pb-8 sm:pb-10 px-2 sm:px-0">
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
        <div className="w-14 h-4 bg-zinc-800 rounded-t-md border-t border-x border-zinc-700 shadow-md flex items-center justify-center">
          <div className="w-3 h-1.5 bg-zinc-400 rounded-full" />
        </div>
        <div className="w-10 h-2 bg-zinc-900 rounded-b-md border-b border-zinc-800 shadow-inner" />
      </div>

      {/* Lanyard Fabric Strap (Top Loop) */}
      <motion.div
        className="relative w-14 overflow-hidden shadow-2xl flex items-center justify-center -mt-0.5 z-10"
        style={{
          height: isExpanded ? 170 : 95,
          transition: 'height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Woven dark strap */}
        <div className="w-full h-full bg-[#141414] border-x border-zinc-700 flex flex-col justify-around items-center relative shadow-lg">
          {/* Subtle stitches along edges */}
          <div className="absolute inset-y-0 left-1 w-px border-r border-dashed border-zinc-600/70" />
          <div className="absolute inset-y-0 right-1 w-px border-l border-dashed border-zinc-600/70" />
          
          {/* Repeating College lanyard ribbon typography */}
          <div className="rotate-90 text-[8px] font-mono tracking-widest text-zinc-300 font-bold whitespace-nowrap uppercase">
            G.J. COLLEGE BIHTA • BCA 2024–27
          </div>
        </div>
      </motion.div>

      {/* Chrome Metal Swivel Clip & Snap Hook */}
      <div className="relative flex flex-col items-center z-20 -mt-1">
        {/* Metal Swivel ring */}
        <div className="w-9 h-4 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 rounded-md border border-zinc-300 shadow-md flex items-center justify-center">
          <div className="w-6 h-1.5 bg-zinc-900 rounded-sm" />
        </div>
        {/* Snap hook clip */}
        <div className="w-5 h-7 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 rounded-b-sm border-x border-b border-zinc-400 shadow-lg flex items-center justify-center relative">
          <div className="w-2.5 h-3 bg-zinc-900/70 rounded-sm" />
          {/* Spring gate latch */}
          <div className="absolute right-0.5 top-1.5 w-1 h-3 bg-zinc-400 rounded-sm shadow-inner" />
        </div>
        {/* Badge Card Slot Hole */}
        <div className="w-12 h-3.5 bg-zinc-900 rounded-t-lg border-t border-x border-zinc-700 shadow-inner flex items-center justify-center">
          <div className="w-7 h-1.5 bg-black rounded-full border border-zinc-800" />
        </div>
      </div>

      {/* Interactive Pullable ID Badge Container */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: isExpanded ? 0 : 160 }}
        dragElastic={0.25}
        dragSnapToOrigin={true}
        onDragStart={() => playCardPullDownSound(0.08)}
        onDragEnd={(_, info) => {
          if (info.offset.y > 50 && !isExpanded) {
            toggleExpand(true);
          } else if (info.offset.y < -30 && isExpanded) {
            toggleExpand(false);
          } else if (Math.abs(info.offset.y) > 15) {
            playCardPullUpSound(0.12);
          }
        }}
        animate={{
          y: isExpanded ? 16 : 0,
          rotate: isExpanded ? 0 : [0, 0.4, -0.4, 0],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut' },
          y: { type: 'spring', damping: 22, stiffness: 220 },
        }}
        id="hanging-student-id-card"
        className="w-full max-w-[min(360px,calc(100vw-2.5rem))] sm:max-w-[390px] z-30 cursor-grab active:cursor-grabbing"
      >
        {/* ID Card Acrylic Outer Sleeve */}
        <div className="relative rounded-2xl bg-[#0d0d0d] border border-zinc-800 p-1 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-200 group hover:border-zinc-600">
          
          {/* Holographic Security Overlay Ribbon */}
          <div className="absolute -top-3 right-6 z-40 bg-zinc-900 text-zinc-200 text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1.5 border border-zinc-700">
            <ShieldCheck className="w-3 h-3 text-zinc-300" />
            <span>STUDENT ID • VERIFIED</span>
            <button
              type="button"
              onClick={retriggerVerification}
              title="Re-verify credentials (test skeleton state)"
              className="ml-1 p-0.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Card Inner Plastic Surface */}
          <div className="rounded-[14px] bg-[#000000] p-4 sm:p-5 border border-zinc-800/80 relative overflow-hidden text-left">
            {/* College Header Section */}
            <div className="border-b border-zinc-800 pb-3 mb-4 text-center relative">
              <div className="flex items-center justify-between gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 shadow-sm">
                  <GraduationCap className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="flex-1 text-center">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-white leading-tight">
                    G.J. College Rambagh
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono tracking-wide">
                    Bihta, Patna • Patliputra University
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 text-[10px] font-mono font-bold">
                  BCA
                </div>
              </div>
              
              <div className="mt-2.5 inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>SESSION: 2024 – 2027 (2ND YEAR)</span>
              </div>
            </div>

            {/* Middle Section: Photo & Primary Info */}
            <div className="flex items-start gap-4 mb-4">
              {/* Photo Frame */}
              <div className="relative group/photo flex-shrink-0">
                <div className="w-24 h-28 sm:w-26 sm:h-30 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700 shadow-md relative">
                  {!photoLoaded && (
                    <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center animate-pulse z-10">
                      <User className="w-8 h-8 text-zinc-700 animate-pulse" />
                    </div>
                  )}
                  <img
                    src={activePhoto}
                    alt={studentProfile.name}
                    onLoad={() => setPhotoLoaded(true)}
                    className={`w-full h-full object-cover object-top transition-all duration-300 group-hover/photo:scale-105 ${
                      photoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = 'https://avatars.githubusercontent.com/u/253225413?v=4';
                      setPhotoLoaded(true);
                    }}
                  />
                </div>

                {/* Quick Photo Upload & Reset Buttons */}
                <div className="absolute -bottom-2 -right-1 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    title="Change Photo"
                    className="p-1 rounded-md bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700 shadow-md hover:bg-zinc-800 transition-colors"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                  {activePhoto !== studentProfile.photoUrl && (
                    <button
                      type="button"
                      onClick={resetPhoto}
                      title="Reset default photo"
                      className="p-1 rounded-md bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 shadow-md hover:bg-zinc-800 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Student Academic Details */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block tracking-wider">
                    Student Name
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight truncate">
                    {studentProfile.name}
                  </h4>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block tracking-wider">
                    Course & Year
                  </span>
                  <p className="text-xs font-semibold text-zinc-200 font-mono">
                    BCA • 2nd Year (Regular)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block tracking-wider">
                    Roll Number
                  </span>
                  <p className="text-xs font-mono text-zinc-300">
                    {studentProfile.rollNo}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block tracking-wider">
                    Location
                  </span>
                  <p className="text-xs text-zinc-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-400 flex-shrink-0" />
                    <span className="truncate">Bihta, Patna, Bihar</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Specialization Badge */}
            <div className="bg-zinc-900/90 rounded-xl p-2.5 border border-zinc-800 mb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Focus
                </span>
                <span className="text-xs font-semibold text-zinc-200">
                  Front-End Web Development
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">Status</span>
                <span className="text-[11px] font-mono text-zinc-300 flex items-center gap-1 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  Active Student
                </span>
              </div>
            </div>

            {/* Card Footer: Barcode & Stylized Handwritten Digital Signature */}
            <div className="pt-2.5 mt-1 border-t border-zinc-800/80 flex items-end justify-between gap-3 relative z-20">
              {/* Barcode & Student ID token */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400">
                  <QrCode className="w-3.5 h-3.5 text-zinc-400" />
                  <span>PPU-GJC-2024-BCA-082</span>
                </div>
                {/* Simulated barcode bars */}
                <div className="flex items-center gap-[2px] h-3.5 opacity-40">
                  <div className="w-[1px] h-full bg-zinc-300" />
                  <div className="w-[2px] h-full bg-zinc-300" />
                  <div className="w-[1px] h-full bg-zinc-300" />
                  <div className="w-[3px] h-full bg-zinc-300" />
                  <div className="w-[1px] h-full bg-zinc-300" />
                  <div className="w-[2px] h-full bg-zinc-300" />
                  <div className="w-[1px] h-full bg-zinc-300" />
                  <div className="w-[3px] h-full bg-zinc-300" />
                  <div className="w-[2px] h-full bg-zinc-300" />
                  <div className="w-[1px] h-full bg-zinc-300" />
                  <div className="w-[2px] h-full bg-zinc-300" />
                </div>
              </div>

              {/* Bottom Right Corner: Stylized Handwritten Digital Signature */}
              <div 
                id="student-id-digital-signature"
                className="flex flex-col items-end text-right select-none pr-0.5"
              >
                <div className="relative group/sig cursor-default">
                  {/* Handwritten script signature */}
                  <span 
                    className="font-signature text-xl sm:text-2xl text-zinc-100 tracking-wide block -rotate-3 leading-none transition-transform duration-200 group-hover/sig:-rotate-1"
                    style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
                  >
                    Aman Kumar
                  </span>
                  {/* Authentic SVG ink flourish pen stroke */}
                  <svg 
                    className="w-24 h-2 text-zinc-400/80 -mt-0.5 overflow-visible" 
                    viewBox="0 0 100 8" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.3"
                  >
                    <path d="M2,5 Q26,1.5 54,5 T98,3.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 mt-0.5">
                  Student Signature
                </span>
              </div>
            </div>

            {/* Interactive Pull Down Action Tab */}
            <button
              type="button"
              onClick={() => toggleExpand()}
              id="lanyard-pull-down-btn"
              className={`mt-4 w-full py-2.5 px-3 rounded-xl border flex items-center justify-between text-xs font-medium transition-all cursor-pointer ${
                isExpanded
                  ? 'bg-zinc-800 text-white border-zinc-700'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>{isExpanded ? 'Fold Contact Details' : 'Pull Down for Email & GitHub'}</span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-zinc-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              )}
            </button>

            {/* Expandable Revealed Contact Tray */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  id="revealed-contact-dossier"
                  className="mt-3 pt-3 border-t border-zinc-800 space-y-2 text-left"
                >
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-medium block">
                      Direct Contact
                    </span>

                    {/* Email Copy Box */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black border border-zinc-800 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="text-zinc-200 font-mono text-[11px] truncate select-all">
                          {studentProfile.email}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-mono transition-colors cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-white" />
                            <span className="text-white font-medium">Copied</span>
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
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black border border-zinc-800 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Github className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="text-zinc-200 font-mono text-[11px] truncate">
                          @{studentProfile.githubUsername}
                        </span>
                      </div>
                      <a
                        href={studentProfile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Instagram Profile Box */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black border border-zinc-800 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Instagram className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="text-zinc-200 font-mono text-[11px] truncate">
                          @{studentProfile.instagramUsername}
                        </span>
                      </div>
                      <a
                        href={studentProfile.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors"
                      >
                        <span>Insta</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* LinkedIn Profile Box */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black border border-zinc-800 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Linkedin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="text-zinc-200 font-mono text-[11px] truncate">
                          {studentProfile.linkedinUsername}
                        </span>
                      </div>
                      <a
                        href={studentProfile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors"
                      >
                        <span>LinkedIn</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Location Info */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-zinc-400">
                      <div className="p-2 rounded-lg bg-black border border-zinc-800">
                        <span className="text-[9px] uppercase text-zinc-400 block">District</span>
                        <span className="text-zinc-200">Patna, Bihar</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black border border-zinc-800">
                        <span className="text-[9px] uppercase text-zinc-400 block">Campus</span>
                        <span className="text-zinc-200">Bihta (Rambagh)</span>
                      </div>
                    </div>
                  </div>

                  {/* Fast Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`mailto:${studentProfile.email}`}
                      className="py-2 px-3 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>
                    <a
                      href="#contact"
                      onClick={() => toggleExpand(false)}
                      className="py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-medium text-xs flex items-center justify-center gap-1.5 border border-zinc-800 transition-colors"
                    >
                      <span>Leave Message</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Interaction hint */}
        <div className="text-center mt-2.5 text-[11px] font-mono text-zinc-400">
          <span>↕ Drag / pull badge down to reveal contact info</span>
        </div>
      </motion.div>
    </div>
  );
};
