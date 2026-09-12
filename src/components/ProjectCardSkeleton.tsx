import React from 'react';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="w-full rounded-xl bg-zinc-950 border border-zinc-850 p-5 flex flex-col justify-between shadow-xl shadow-black/60 relative overflow-hidden text-left"
    >
      {/* Subtle shimmer sweep overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

      {/* Main Content Area */}
      <div className="space-y-3.5">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Language tag shimmer */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-zinc-700 animate-pulse" />
            <span className="w-14 h-3 bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Stars shimmer */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            <span className="w-3 h-3 bg-zinc-700 rounded animate-pulse" />
            <span className="w-4 h-3 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Title and Repo slug shimmer */}
        <div>
          <div className="w-3/4 h-5 bg-zinc-800 rounded animate-pulse mb-1.5" />
          <div className="w-1/2 h-3 bg-zinc-900 rounded animate-pulse" />
        </div>

        {/* Description shimmer */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-3 bg-zinc-900 rounded animate-pulse" />
          <div className="w-5/6 h-3 bg-zinc-900/80 rounded animate-pulse" />
          <div className="w-3/5 h-3 bg-zinc-900/60 rounded animate-pulse" />
        </div>

        {/* Highlights skeleton */}
        <div className="space-y-1.5 pt-1">
          <div className="w-16 h-2 bg-zinc-900 rounded animate-pulse mb-1" />
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-zinc-900 flex-shrink-0 animate-pulse" />
            <span className="w-3/4 h-2.5 bg-zinc-900 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-zinc-900 flex-shrink-0 animate-pulse" />
            <span className="w-2/3 h-2.5 bg-zinc-900 rounded animate-pulse" />
          </div>
        </div>

        {/* Tech tags skeleton */}
        <div className="flex items-center gap-1.5 pt-1">
          <div className="w-12 h-4 rounded bg-zinc-900 animate-pulse" />
          <div className="w-16 h-4 rounded bg-zinc-900 animate-pulse" />
          <div className="w-14 h-4 rounded bg-zinc-900 animate-pulse" />
        </div>
      </div>

      {/* Action Buttons shimmer */}
      <div className="pt-4 mt-4 border-t border-zinc-900 grid grid-cols-2 gap-2">
        <div className="h-9 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse" />
        <div className="h-9 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse" />
      </div>
    </div>
  );
};
