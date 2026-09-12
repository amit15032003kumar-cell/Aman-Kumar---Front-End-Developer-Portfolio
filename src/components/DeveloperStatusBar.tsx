import React, { useState, useEffect } from 'react';
import {
  Activity,
  Clock,
  GraduationCap,
  GitBranch,
  Gamepad2,
  MapPin,
  Cpu,
  Volume2,
  VolumeX
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';

interface DeveloperStatusBarProps {
  onOpenArcade?: () => void;
  arcadeSoundEnabled?: boolean;
  onToggleArcadeSound?: () => void;
}

export const DeveloperStatusBar: React.FC<DeveloperStatusBarProps> = ({
  onOpenArcade,
  arcadeSoundEnabled,
  onToggleArcadeSound
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToArcade = () => {
    if (onOpenArcade) {
      onOpenArcade();
      return;
    }
    const el = document.getElementById('arcade');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="dev-status-bar"
      aria-label="Developer Activity Status"
      className="w-full bg-[#050505] border-y border-zinc-900 py-3 text-xs font-mono text-zinc-400 select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Status Indicators Left */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Live Operational Status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-200" />
              </span>
              <span className="text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">
                AVAILABLE FOR INTERNSHIPS
              </span>
            </div>

            {/* Time in Bihta/Patna */}
            <div className="hidden sm:flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>Bihta Time:</span>
              <span className="text-zinc-200 font-medium">{timeStr || '12:00:00 PM'} IST</span>
            </div>

            {/* Location Pill */}
            <div className="hidden md:flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span>G.J. College Rambagh Bihta, Patna</span>
            </div>

            {/* Degree Pill */}
            <div className="hidden lg:flex items-center gap-1.5 text-zinc-400">
              <GraduationCap className="w-3.5 h-3.5 text-zinc-500" />
              <span>BCA 2nd Year (2024–27)</span>
            </div>
          </div>

          {/* Right Action / Arcade Shortcut */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
              <GitBranch className="w-3 h-3 text-zinc-400" />
              <span>git main: active</span>
            </div>

            <button
              type="button"
              onClick={scrollToArcade}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 border border-zinc-750 text-zinc-200 hover:text-white transition-colors cursor-pointer text-[11px]"
              title="Jump to Byte Runner arcade mini-game"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Play Byte Runner</span>
            </button>

            {onToggleArcadeSound && (
              <button
                type="button"
                onClick={onToggleArcadeSound}
                id="statusbar-arcade-sound-btn"
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[11px] font-mono transition-colors cursor-pointer ${
                  arcadeSoundEnabled
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-750'
                    : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 border-zinc-850'
                }`}
                title={arcadeSoundEnabled ? 'Global Game Audio: ON (Click to Mute)' : 'Global Game Audio: MUTED (Click to Unmute)'}
                aria-label={arcadeSoundEnabled ? 'Mute Game Audio' : 'Unmute Game Audio'}
              >
                {arcadeSoundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
                    <span className="hidden md:inline">Audio: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="hidden md:inline">Audio: MUTED</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
