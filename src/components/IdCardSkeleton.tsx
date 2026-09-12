import React from 'react';
import { ShieldCheck, QrCode, User } from 'lucide-react';

interface IdCardSkeletonProps {
  statusMessage?: string;
}

export const IdCardSkeleton: React.FC<IdCardSkeletonProps> = ({
  statusMessage = 'Preparing Academic Credentials...'
}) => {
  return (
    <div
      aria-hidden="true"
      id="academic-id-card-skeleton"
      className="relative flex flex-col items-center select-none w-full max-w-[360px] sm:max-w-[390px]"
    >
      {/* Lanyard Top Suspension Mount */}
      <div className="w-16 h-3 bg-zinc-900 rounded-t-sm border-t border-x border-zinc-700 shadow-md flex items-center justify-center">
        <div className="w-8 h-1 bg-zinc-700 rounded-full" />
      </div>

      {/* Hanging dark woven ribbon strap */}
      <div className="relative w-14 h-24 overflow-hidden shadow-2xl flex items-center justify-center -mt-0.5 z-10">
        <div className="w-full h-full bg-[#141414] border-x border-zinc-700 flex flex-col justify-around items-center relative shadow-lg">
          <div className="absolute inset-y-0 left-1 w-px border-r border-dashed border-zinc-600/70" />
          <div className="absolute inset-y-0 right-1 w-px border-l border-dashed border-zinc-600/70" />
          <div className="rotate-90 text-[8px] font-mono tracking-widest text-zinc-500 font-bold whitespace-nowrap uppercase">
            LOADING CREDENTIALS • 2024–27
          </div>
        </div>
      </div>

      {/* Chrome Metal Swivel Ring & Snap Hook */}
      <div className="relative flex flex-col items-center z-20 -mt-1">
        <div className="w-9 h-4 bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 rounded-md border border-zinc-400 shadow-md flex items-center justify-center">
          <div className="w-6 h-1.5 bg-zinc-900 rounded-sm" />
        </div>
        <div className="w-5 h-7 bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-400 rounded-b-sm border-x border-b border-zinc-400 shadow-lg flex items-center justify-center relative">
          <div className="w-2.5 h-3 bg-zinc-900/70 rounded-sm" />
          <div className="absolute right-0.5 top-1.5 w-1 h-3 bg-zinc-400 rounded-sm shadow-inner" />
        </div>
        <div className="w-12 h-3.5 bg-zinc-900 rounded-t-lg border-t border-x border-zinc-700 shadow-inner flex items-center justify-center">
          <div className="w-7 h-1.5 bg-black rounded-full border border-zinc-800" />
        </div>
      </div>

      {/* Card Body Acrylic Outer Sleeve */}
      <div className="w-full relative rounded-2xl bg-[#0d0d0d] border border-zinc-800 p-1 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden text-left">
        {/* Shimmer sweep animation across the whole card */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none z-50" />

        {/* Holographic Security Overlay Ribbon Skeleton */}
        <div className="absolute -top-3 right-6 z-40 bg-zinc-900 text-zinc-300 text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1.5 border border-zinc-700">
          <ShieldCheck className="w-3 h-3 text-zinc-400 animate-pulse" />
          <span className="animate-pulse">STUDENT ID • VERIFYING</span>
        </div>

        {/* Card Main Plate */}
        <div className="rounded-xl bg-gradient-to-b from-zinc-950 via-[#0a0a0a] to-zinc-950 border border-zinc-850 p-4 sm:p-5 space-y-4 relative">
          
          {/* Top College Header Skeleton */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 gap-2">
            <div className="flex items-center gap-2.5">
              {/* Seal avatar skeleton */}
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-zinc-800 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <div className="w-36 h-3.5 bg-zinc-800 rounded animate-pulse" />
                <div className="w-44 h-2.5 bg-zinc-900 rounded animate-pulse" />
              </div>
            </div>
            {/* Department Badge Shimmer */}
            <div className="w-14 h-5 rounded-md bg-zinc-900 border border-zinc-800 animate-pulse" />
          </div>

          {/* Student Identity Core: Photo + Credentials Skeleton */}
          <div className="flex gap-4 items-center">
            {/* Photo Box Skeleton */}
            <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center flex-shrink-0 overflow-hidden">
              <User className="w-8 h-8 text-zinc-700 animate-pulse" />
              <span className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">Photo</span>
            </div>

            {/* Credentials details skeleton */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="space-y-1">
                <div className="w-32 h-5 bg-zinc-800 rounded animate-pulse" />
                <div className="w-24 h-3 bg-zinc-900 rounded animate-pulse" />
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-2.5 bg-zinc-900 rounded animate-pulse" />
                  <div className="w-20 h-2.5 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-2.5 bg-zinc-900 rounded animate-pulse" />
                  <div className="w-24 h-2.5 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-2.5 bg-zinc-900 rounded animate-pulse" />
                  <div className="w-16 h-2.5 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Program & Status Two-Column Box */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 rounded-lg bg-black border border-zinc-800 space-y-1">
              <div className="w-12 h-2 bg-zinc-900 rounded animate-pulse" />
              <div className="w-24 h-3 bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="p-2.5 rounded-lg bg-black border border-zinc-800 space-y-1 text-right flex flex-col items-end">
              <div className="w-10 h-2 bg-zinc-900 rounded animate-pulse" />
              <div className="w-20 h-3 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>

          {/* Barcode Strip Skeleton */}
          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-zinc-600 animate-pulse" />
              <div className="w-28 h-2.5 bg-zinc-900 rounded animate-pulse" />
            </div>
            {/* Simulated barcode bars */}
            <div className="flex items-center gap-[2px] h-4 opacity-25">
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[2px] h-full bg-zinc-400" />
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[3px] h-full bg-zinc-400" />
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[2px] h-full bg-zinc-400" />
            </div>
          </div>

          {/* Bottom Pull Down Action Placeholder */}
          <div className="mt-4 w-full py-2.5 px-3 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-ping" />
              <span className="text-xs font-mono text-zinc-400">{statusMessage}</span>
            </div>
            <div className="w-4 h-4 rounded bg-zinc-800 animate-pulse" />
          </div>

        </div>
      </div>
    </div>
  );
};
