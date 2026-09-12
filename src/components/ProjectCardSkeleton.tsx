import React from 'react';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="w-full h-[400px] rounded-xl bg-zinc-950 border border-zinc-850 p-5 flex flex-col justify-between shadow-xl shadow-black/60 relative overflow-hidden text-left"
    >
      {/* Subtle shimmer sweep overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Language tag shimmer */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-zinc-700 animate-pulse" />
            <span className="w-16 h-3 bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Stars shimmer */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            <span className="w-3 h-3 bg-zinc-700 rounded animate-pulse" />
            <span className="w-4 h-3 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Title and Repo slug shimmer */}
        <div className="w-3/4 h-5 bg-zinc-800 rounded animate-pulse mb-2 mt-1" />
        <div className="w-1/2 h-3 bg-zinc-900 rounded animate-pulse mb-3" />

        {/* Source preview box skeleton */}
        <div className="w-full h-28 rounded-lg bg-black border border-zinc-850 p-3 flex flex-col justify-between relative overflow-hidden my-2">
          <div className="flex items-center justify-between">
            <div className="w-24 h-3 bg-zinc-900 rounded animate-pulse" />
            <div className="w-8 h-3 bg-zinc-900 rounded animate-pulse" />
          </div>
          <div className="space-y-1.5 z-10">
            <div className="w-full h-2.5 bg-zinc-900 rounded animate-pulse" />
            <div className="w-5/6 h-2.5 bg-zinc-900/80 rounded animate-pulse" />
            <div className="w-3/5 h-2.5 bg-zinc-900/60 rounded animate-pulse" />
          </div>
        </div>

        {/* Highlights skeleton */}
        <div className="space-y-1.5 my-2">
          <div className="w-14 h-2 bg-zinc-900 rounded animate-pulse mb-1" />
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-zinc-900 flex-shrink-0 animate-pulse" />
            <span className="w-3/4 h-2.5 bg-zinc-900 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-zinc-900 flex-shrink-0 animate-pulse" />
            <span className="w-2/3 h-2.5 bg-zinc-900 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom Area: Metrics & Action links shimmer */}
      <div className="space-y-3 pt-2 border-t border-zinc-900">
        {/* Meta Stats Row */}
        <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-2 rounded-lg border border-zinc-850">
          <div className="space-y-1 text-center flex flex-col items-center">
            <span className="w-8 h-2 bg-zinc-900 rounded animate-pulse" />
            <span className="w-5 h-3 bg-zinc-800 rounded animate-pulse" />
          </div>
          <div className="space-y-1 text-center flex flex-col items-center">
            <span className="w-8 h-2 bg-zinc-900 rounded animate-pulse" />
            <span className="w-5 h-3 bg-zinc-800 rounded animate-pulse" />
          </div>
          <div className="space-y-1 text-center flex flex-col items-center">
            <span className="w-8 h-2 bg-zinc-900 rounded animate-pulse" />
            <span className="w-5 h-3 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Action Buttons shimmer */}
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse" />
          <div className="h-8 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
