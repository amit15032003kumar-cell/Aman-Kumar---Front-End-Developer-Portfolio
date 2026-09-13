import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Terminal,
  Zap,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Shield,
  Check,
  Copy
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type ItemType = 'code' | 'commit' | 'star' | 'bug';

interface Position {
  x: number;
  y: number;
}

interface Collectible extends Position {
  type: ItemType;
  points: number;
  label: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const GRID_SIZE = 20; // 20x20 grid

interface DevArcadeGameProps {
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const DevArcadeGame: React.FC<DevArcadeGameProps> = ({
  soundEnabled: externalSoundEnabled,
  onToggleSound: externalToggleSound,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('aman-arcade-highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [linesOfCode, setLinesOfCode] = useState(0);
  const [level, setLevel] = useState(1);
  const [difficulty, setDifficulty] = useState<'relaxed' | 'normal' | 'turbo'>('normal');
  const [wrapWalls, setWrapWalls] = useState(true);
  const [internalSoundEnabled, setInternalSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('arcade-audio-enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const soundEnabled = externalSoundEnabled !== undefined ? externalSoundEnabled : internalSoundEnabled;

  const handleToggleSound = useCallback(() => {
    if (externalToggleSound) {
      externalToggleSound();
    } else {
      setInternalSoundEnabled((prev) => {
        const next = !prev;
        try {
          localStorage.setItem('arcade-audio-enabled', String(next));
        } catch {
          // ignore
        }
        return next;
      });
    }
  }, [externalToggleSound]);

  const [scanlines, setScanlines] = useState(false);

  // Terminal Companion State
  const [activeTab, setActiveTab] = useState<'game' | 'terminal'>('game');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ type: 'input' | 'output' | 'system'; text: string; link?: string }>
  >([
    { type: 'system', text: 'ByteOS v2.4 (Patna, Bihar) - Interactive Dev Console' },
    { type: 'system', text: 'Type "help" or click quick commands below to interact.' },
  ]);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Snake & collectible refs to avoid unnecessary re-renders in animation loop
  const snakeRef = useRef<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const dirRef = useRef<Direction>('RIGHT');
  const nextDirRef = useRef<Direction>('RIGHT');
  const collectibleRef = useRef<Collectible>({
    x: 15,
    y: 10,
    type: 'code',
    points: 10,
    label: '<CODE />',
  });
  const bugRef = useRef<Position | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const gameLoopRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  // Web Audio Synthesizer (Zero external dependencies)
  const playBeep = useCallback((freq: number, type: OscillatorType = 'sine', duration: number = 0.08) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, [soundEnabled]);

  // Spawn collectible logic
  const spawnCollectible = useCallback((currentSnake: Position[]): Collectible => {
    let newX = 0;
    let newY = 0;
    let overlap = true;
    let tries = 0;

    while (overlap && tries < 100) {
      newX = Math.floor(Math.random() * GRID_SIZE);
      newY = Math.floor(Math.random() * GRID_SIZE);
      overlap = currentSnake.some((seg) => seg.x === newX && seg.y === newY);
      tries++;
    }

    const rand = Math.random();
    let type: ItemType = 'code';
    let points = 10;
    let label = '<CODE />';

    if (rand > 0.85) {
      type = 'star';
      points = 50;
      label = '★ RELEASE';
    } else if (rand > 0.6) {
      type = 'commit';
      points = 25;
      label = '● COMMIT';
    }

    return { x: newX, y: newY, type, points, label };
  }, []);

  // Spawn obstacle bug
  const spawnBug = useCallback((currentSnake: Position[], collectible: Collectible): Position | null => {
    if (Math.random() > 0.6) return null;
    let newX = 0;
    let newY = 0;
    let overlap = true;
    let tries = 0;

    while (overlap && tries < 50) {
      newX = Math.floor(Math.random() * GRID_SIZE);
      newY = Math.floor(Math.random() * GRID_SIZE);
      overlap =
        (newX === collectible.x && newY === collectible.y) ||
        currentSnake.some((seg) => seg.x === newX && seg.y === newY);
      tries++;
    }
    return overlap ? null : { x: newX, y: newY };
  }, []);

  // Spawn visual particles
  const addParticles = (x: number, y: number, color: string, count = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      particlesRef.current.push({
        x: (x + 0.5) * (360 / GRID_SIZE),
        y: (y + 0.5) * (360 / GRID_SIZE),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color,
      });
    }
  };

  // Speed based on difficulty and score
  const getInterval = useCallback(() => {
    let base = 120;
    if (difficulty === 'relaxed') base = 160;
    if (difficulty === 'turbo') base = 75;
    const speedBoost = Math.min(45, Math.floor(score / 50) * 5);
    return Math.max(50, base - speedBoost);
  }, [difficulty, score]);

  // Start / Restart game
  const startGame = () => {
    const initialSnake: Position[] = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    snakeRef.current = initialSnake;
    dirRef.current = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    const firstCol = spawnCollectible(initialSnake);
    collectibleRef.current = firstCol;
    bugRef.current = spawnBug(initialSnake, firstCol);
    particlesRef.current = [];
    setScore(0);
    setLevel(1);
    setLinesOfCode(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
    playBeep(440, 'triangle', 0.1);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    playBeep(180, 'sawtooth', 0.25);
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('aman-arcade-highscore', score.toString());
      } catch {
        // ignore storage error
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent page scrolling on arrow keys while playing
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        if (activeTab === 'game' && isPlaying) {
          e.preventDefault();
        }
      }

      if (e.key === ' ' && isPlaying && !isGameOver) {
        setIsPaused((prev) => !prev);
        return;
      }

      const current = dirRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (current !== 'DOWN') nextDirRef.current = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (current !== 'UP') nextDirRef.current = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (current !== 'RIGHT') nextDirRef.current = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (current !== 'LEFT') nextDirRef.current = 'RIGHT';
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver, activeTab]);

  // Main Canvas Render and Game Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = (time: number) => {
      // Canvas dimensions
      const width = canvas.width;
      const height = canvas.height;
      const cellSize = width / GRID_SIZE;

      // Update game physics on interval
      if (isPlaying && !isPaused && !isGameOver) {
        if (time - lastTickRef.current > getInterval()) {
          lastTickRef.current = time;

          // Commit chosen direction
          dirRef.current = nextDirRef.current;
          const head = { ...snakeRef.current[0] };

          if (dirRef.current === 'UP') head.y -= 1;
          if (dirRef.current === 'DOWN') head.y += 1;
          if (dirRef.current === 'LEFT') head.x -= 1;
          if (dirRef.current === 'RIGHT') head.x += 1;

          // Wall handling
          if (wrapWalls) {
            if (head.x < 0) head.x = GRID_SIZE - 1;
            if (head.x >= GRID_SIZE) head.x = 0;
            if (head.y < 0) head.y = GRID_SIZE - 1;
            if (head.y >= GRID_SIZE) head.y = 0;
          } else {
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
              handleGameOver();
              return;
            }
          }

          // Self collision check
          const selfHit = snakeRef.current.some((seg) => seg.x === head.x && seg.y === head.y);
          if (selfHit) {
            handleGameOver();
            return;
          }

          // Bug collision check
          if (bugRef.current && head.x === bugRef.current.x && head.y === bugRef.current.y) {
            handleGameOver();
            return;
          }

          // Move snake
          const newSnake = [head, ...snakeRef.current];

          // Check collectible collision
          if (head.x === collectibleRef.current.x && head.y === collectibleRef.current.y) {
            const earned = collectibleRef.current.points;
            const newScore = score + earned;
            setScore(newScore);
            setLinesOfCode((prev) => prev + (earned === 50 ? 5 : earned === 25 ? 3 : 1));
            setLevel(Math.floor(newScore / 70) + 1);

            // Audio & particles
            playBeep(earned === 50 ? 880 : earned === 25 ? 660 : 520, 'triangle', 0.08);
            addParticles(head.x, head.y, earned === 50 ? '#f8fafc' : '#94a3b8', 10);

            // Respawn
            const nextCol = spawnCollectible(newSnake);
            collectibleRef.current = nextCol;
            bugRef.current = spawnBug(newSnake, nextCol);
          } else {
            newSnake.pop(); // remove tail
          }

          snakeRef.current = newSnake;
        }
      }

      // -------------------------------------------------------------
      // DRAWING LAYER: Pure Black and Slate Gray Palette
      // -------------------------------------------------------------
      ctx.clearRect(0, 0, width, height);

      // Deep Black Canvas Background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Subtle Slate Coordinate Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, height);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(width, i * cellSize);
        ctx.stroke();
      }

      // Draw Collectible Item
      const col = collectibleRef.current;
      const colPx = col.x * cellSize;
      const colPy = col.y * cellSize;

      if (col.type === 'star') {
        // Glowing Release Star
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(colPx + cellSize / 2, colPy + cellSize / 2, cellSize / 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold ${cellSize * 0.55}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', colPx + cellSize / 2, colPy + cellSize / 2);
      } else if (col.type === 'commit') {
        // Git Commit Node
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(colPx + cellSize / 2, colPy + cellSize / 2, cellSize / 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Clean Code Byte
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(colPx + 2, colPy + 2, cellSize - 4, cellSize - 4);
        ctx.fillStyle = '#09090b';
        ctx.font = `bold ${cellSize * 0.5}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(';', colPx + cellSize / 2, colPy + cellSize / 2);
      }

      // Draw Bug (Obstacle)
      if (bugRef.current) {
        const bx = bugRef.current.x * cellSize;
        const by = bugRef.current.y * cellSize;
        ctx.fillStyle = '#334155';
        ctx.fillRect(bx + 2, by + 2, cellSize - 4, cellSize - 4);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(bx + 2, by + 2, cellSize - 4, cellSize - 4);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = `bold ${cellSize * 0.5}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✕', bx + cellSize / 2, by + cellSize / 2);
      }

      // Draw Snake Body with Slate Gradient
      const snake = snakeRef.current;
      snake.forEach((seg, index) => {
        const sx = seg.x * cellSize;
        const sy = seg.y * cellSize;

        if (index === 0) {
          // Snake Head: High-contrast white/slate cursor
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(sx + 1, sy + 1, cellSize - 2, cellSize - 2);

          // Head direction prompt indicator
          ctx.fillStyle = '#09090b';
          ctx.font = `bold ${cellSize * 0.6}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          let symbol = '>';
          if (dirRef.current === 'UP') symbol = '^';
          if (dirRef.current === 'DOWN') symbol = 'v';
          if (dirRef.current === 'LEFT') symbol = '<';
          ctx.fillText(symbol, sx + cellSize / 2, sy + cellSize / 2);
        } else {
          // Segments fading smoothly to deeper slate gray
          const shadeRatio = Math.max(0.2, 1 - index / snake.length);
          const r = Math.floor(148 * shadeRatio + 30 * (1 - shadeRatio));
          const g = Math.floor(163 * shadeRatio + 41 * (1 - shadeRatio));
          const b = Math.floor(184 * shadeRatio + 59 * (1 - shadeRatio));
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(sx + 1.5, sy + 1.5, cellSize - 3, cellSize - 3);
        }
      });

      // Update & Draw Particles
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(p.x, p.y, 2.5, 2.5);
        ctx.globalAlpha = 1;
      });

      // CRT Scanlines Overlay
      if (scanlines) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 1.5);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isPaused, isGameOver, wrapWalls, scanlines, getInterval, playBeep, score]);

  // Handle on-screen D-pad direction input
  const handleDirectionPress = (dir: Direction) => {
    const current = dirRef.current;
    if (dir === 'UP' && current !== 'DOWN') nextDirRef.current = 'UP';
    if (dir === 'DOWN' && current !== 'UP') nextDirRef.current = 'DOWN';
    if (dir === 'LEFT' && current !== 'RIGHT') nextDirRef.current = 'LEFT';
    if (dir === 'RIGHT' && current !== 'LEFT') nextDirRef.current = 'RIGHT';
    playBeep(320, 'sine', 0.04);
  };

  // Terminal command executor
  const handleTerminalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: 'input' as const, text: `$ ${terminalInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'AVAILABLE COMMANDS: \n• play: Start or restart arcade game\n• sound: Toggle 8-bit game audio on/off\n• skills: Display technical stack\n• bca: View student academic info\n• repos: Inspect GitHub repositories\n• contact: View direct contact channels\n• clear: Wipe terminal screen\n• theme: Toggle high-contrast themes',
        });
        break;
      case 'sound':
      case 'mute':
      case 'unmute':
      case 'audio':
        handleToggleSound();
        newHistory.push({
          type: 'output',
          text: `ARCADE AUDIO: Sound is now ${soundEnabled ? 'MUTED [OFF]' : 'ENABLED [ON]'}.`,
        });
        break;
      case 'play':
      case 'start':
        setActiveTab('game');
        startGame();
        newHistory.push({ type: 'output', text: 'Initiating BYTE RUNNER arcade session...' });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'TECH STACK: React, TypeScript, JavaScript (ES6+), Tailwind CSS, Node.js, C / C++, HTML5/CSS3, Git/GitHub, REST APIs.',
        });
        break;
      case 'bca':
      case 'college':
        newHistory.push({
          type: 'output',
          text: `ACADEMIC STATUS: ${studentProfile.name} • ${studentProfile.degree} (${studentProfile.year}) at ${studentProfile.college}. Session: ${studentProfile.session}. Roll: ${studentProfile.rollNo}`,
        });
        break;
      case 'repos':
      case 'projects':
        newHistory.push({
          type: 'output',
          text: `GITHUB: Over 20 public repositories synced at https://github.com/${studentProfile.githubUsername}`,
          link: studentProfile.githubUrl,
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `CHANNELS: Email (${studentProfile.email}) | LinkedIn (${studentProfile.linkedinUsername}) | Instagram (@${studentProfile.instagramUsername})`,
          link: studentProfile.linkedinUrl,
        });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'theme':
        newHistory.push({
          type: 'output',
          text: 'Tip: Use the top-right toggle in the navigation bar to switch between Deep Black, Slate Gray, and Light Mode themes.',
        });
        break;
      default:
        newHistory.push({
          type: 'output',
          text: `Command not recognized: "${cmd}". Type "help" for a list of commands.`,
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const copyQuickInstall = () => {
    navigator.clipboard.writeText(`npx aman-kumar`);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section id="arcade" className="py-20 bg-black relative border-t border-zinc-900 overflow-hidden">
      {/* Background Slate Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-850 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                <Gamepad2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>TERMINAL ARCADE</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
              <span className="text-[11px] font-mono text-zinc-400">Byte Runner v1.0</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dev Byte Runner & Console
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mt-1">
              A minimalist retro arcade game and companion terminal built strictly in black and slate grey.
              Collect clean code bytes, push commits, avoid syntax bugs!
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-850">
            <button
              type="button"
              onClick={() => setActiveTab('game')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'game'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Byte Runner</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terminal')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Dev Console</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: ARCADE GAME
           ========================================================================= */}
        {activeTab === 'game' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Canvas Stage */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-[420px] rounded-2xl bg-zinc-950 border border-zinc-800 p-4 shadow-2xl shadow-black/80 relative">
                
                {/* Machine Header Bar */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-850" />
                    <span className="text-zinc-300 ml-1">byte_runner.bin</span>
                  </div>

                  {/* Sound & Scanline Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleSound}
                      id="arcade-canvas-sound-btn"
                      title={soundEnabled ? 'Mute 8-bit Audio (Global)' : 'Enable 8-bit Audio (Global)'}
                      className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4 text-zinc-300" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanlines((prev) => !prev)}
                      title={scanlines ? 'Turn off CRT scanlines' : 'Turn on CRT scanlines'}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono border transition-colors cursor-pointer ${
                        scanlines
                          ? 'bg-zinc-800 text-white border-zinc-600'
                          : 'bg-black text-zinc-500 border-zinc-850 hover:text-zinc-300'
                      }`}
                    >
                      CRT
                    </button>
                  </div>
                </div>

                {/* The Canvas */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-zinc-850 bg-black flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={360}
                    height={360}
                    className="w-full h-full block cursor-crosshair select-none"
                  />

                  {/* Idle / Start Overlay */}
                  {!isPlaying && !isGameOver && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-750 flex items-center justify-center shadow-lg">
                        <Gamepad2 className="w-6 h-6 text-zinc-200" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white font-mono">READY PLAYER ONE</h3>
                        <p className="text-xs text-zinc-400 max-w-xs font-mono">
                          Navigate the dev cursor to absorb clean code packets and level up.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={startGame}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs font-mono flex items-center gap-2 transition-transform hover:scale-105 shadow-xl cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-black" />
                        <span>START RUNNER</span>
                      </button>
                    </div>
                  )}

                  {/* Game Over Overlay */}
                  {isGameOver && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3 z-30">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                        CRITICAL STACK EXCEPTION
                      </span>
                      <h3 className="text-xl font-extrabold text-white font-mono">GAME OVER</h3>
                      <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 w-full max-w-[240px] space-y-1 font-mono text-xs text-left">
                        <div className="flex justify-between text-zinc-400">
                          <span>Final Score:</span>
                          <span className="text-white font-bold">{score}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>High Score:</span>
                          <span className="text-zinc-200">{Math.max(score, highScore)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Lines of Code:</span>
                          <span className="text-zinc-200">{linesOfCode}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={startGame}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs font-mono flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer mt-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>RETRY SESSION</span>
                      </button>
                    </div>
                  )}

                  {/* Paused Overlay */}
                  {isPlaying && isPaused && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                      <Pause className="w-8 h-8 text-zinc-300 animate-pulse" />
                      <span className="text-sm font-mono text-white font-bold">SESSION PAUSED</span>
                      <button
                        type="button"
                        onClick={() => setIsPaused(false)}
                        className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-white cursor-pointer"
                      >
                        Resume (Space)
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Tactile Slate D-Pad */}
                <div className="mt-4 pt-3 border-t border-zinc-850 flex flex-col items-center">
                  <div className="text-[10px] font-mono text-zinc-500 mb-2">TACTILE CONTROLS</div>
                  <div className="grid grid-cols-3 gap-2 w-48">
                    <div />
                    <button
                      type="button"
                      onClick={() => handleDirectionPress('UP')}
                      disabled={!isPlaying || isPaused}
                      className="h-10 rounded-lg bg-zinc-900 active:bg-zinc-800 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <div />

                    <button
                      type="button"
                      onClick={() => handleDirectionPress('LEFT')}
                      disabled={!isPlaying || isPaused}
                      className="h-10 rounded-lg bg-zinc-900 active:bg-zinc-800 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (isPlaying) setIsPaused((prev) => !prev);
                        else startGame();
                      }}
                      className="h-10 rounded-lg bg-black active:bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-mono flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      {isPlaying ? (isPaused ? 'RESUME' : 'PAUSE') : 'START'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectionPress('RIGHT')}
                      disabled={!isPlaying || isPaused}
                      className="h-10 rounded-lg bg-zinc-900 active:bg-zinc-800 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div />
                    <button
                      type="button"
                      onClick={() => handleDirectionPress('DOWN')}
                      disabled={!isPlaying || isPaused}
                      className="h-10 rounded-lg bg-zinc-900 active:bg-zinc-800 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <div />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Game Stats, Mechanics & Settings */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* HUD Stats Dashboard */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                    Telemetry & Score
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                    <Trophy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Best: {highScore}</span>
                  </div>
                </div>

                {/* Score Big Display */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-black border border-zinc-850">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Score</span>
                    <span className="text-2xl font-bold font-mono text-white">{score}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black border border-zinc-850">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Level</span>
                    <span className="text-2xl font-bold font-mono text-zinc-200">{level}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black border border-zinc-850">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">LOC Written</span>
                    <span className="text-2xl font-bold font-mono text-zinc-300">{linesOfCode}</span>
                  </div>
                </div>

                {/* Collectibles Legend */}
                <div className="space-y-2 pt-2 border-t border-zinc-900">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block font-semibold">
                    Payload Items
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-black border border-zinc-900 flex items-center gap-2">
                      <span className="w-4 h-4 bg-zinc-800 rounded border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                        ;
                      </span>
                      <div>
                        <div className="text-zinc-200 text-[11px]">Clean Code</div>
                        <div className="text-[10px] text-zinc-500">+10 pts</div>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-black border border-zinc-900 flex items-center gap-2">
                      <span className="w-4 h-4 bg-zinc-300 text-black rounded-full flex items-center justify-center text-[10px] font-bold">
                        ●
                      </span>
                      <div>
                        <div className="text-zinc-200 text-[11px]">Git Commit</div>
                        <div className="text-[10px] text-zinc-500">+25 pts</div>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-black border border-zinc-900 flex items-center gap-2">
                      <span className="w-4 h-4 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-bold">
                        ★
                      </span>
                      <div>
                        <div className="text-zinc-200 text-[11px]">Prod Release</div>
                        <div className="text-[10px] text-zinc-500">+50 pts</div>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-black border border-zinc-900 flex items-center gap-2">
                      <span className="w-4 h-4 bg-zinc-900 text-zinc-300 border border-zinc-700 rounded flex items-center justify-center text-[10px] font-bold">
                        ✕
                      </span>
                      <div>
                        <div className="text-zinc-400 text-[11px]">Syntax Bug</div>
                        <div className="text-[10px] text-zinc-600">Avoid!</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configuration Options */}
                <div className="space-y-3 pt-2 border-t border-zinc-900">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block font-semibold">
                    Engine Settings
                  </span>

                  {/* Wall mode */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-300">Grid Boundary Mode:</span>
                    <button
                      type="button"
                      onClick={() => setWrapWalls((prev) => !prev)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
                        wrapWalls
                          ? 'bg-zinc-800 text-white border-zinc-600'
                          : 'bg-black text-zinc-400 border-zinc-800'
                      }`}
                    >
                      {wrapWalls ? 'Wrap-Around Grid' : 'Hard Wall Collision'}
                    </button>
                  </div>

                  {/* Difficulty selector */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-300">Clock Frequency:</span>
                    <div className="flex items-center gap-1">
                      {(['relaxed', 'normal', 'turbo'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setDifficulty(mode)}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize border transition-colors cursor-pointer ${
                            difficulty === mode
                              ? 'bg-zinc-700 text-white border-zinc-500 font-semibold'
                              : 'bg-black text-zinc-400 border-zinc-850 hover:text-zinc-200'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Developer Quick-Command Card */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-2.5 text-left">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>CLI INSTALL CARD</span>
                  <span className="text-[10px] text-zinc-500">Node Package</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black border border-zinc-800 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-200 truncate">
                    $ npx aman-kumar
                  </span>
                  <button
                    type="button"
                    onClick={copyQuickInstall}
                    className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                    title="Copy command"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-zinc-300" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            VIEW 2: COMPANION TERMINAL CONSOLE
           ========================================================================= */}
        {activeTab === 'terminal' && (
          <div className="w-full rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl shadow-black/80 font-mono text-left">
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-zinc-850">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700 inline-block" />
                <span className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700 inline-block" />
                <span className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700 inline-block" />
                <span className="text-xs text-zinc-400 ml-2">aman@bihta-station:~ (zsh)</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase">Patna, Bihar</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 bg-[#080808] min-h-[300px] max-h-[420px] overflow-y-auto space-y-2 text-xs leading-relaxed">
              {terminalHistory.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.type === 'input'
                      ? 'text-white font-bold'
                      : line.type === 'system'
                      ? 'text-zinc-500'
                      : 'text-zinc-300'
                  }
                >
                  <pre className="font-mono whitespace-pre-wrap">{line.text}</pre>
                  {line.link && (
                    <a
                      href={line.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-zinc-400 hover:text-white underline"
                    >
                      Open Link →
                    </a>
                  )}
                </div>
              ))}

              {/* Active Prompt Input */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-zinc-400 font-bold">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'help', 'play', 'skills', or 'contact'..."
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-zinc-600 text-xs"
                  autoFocus
                />
              </form>
            </div>

            {/* Quick Command Chips Toolbar */}
            <div className="p-3 bg-black border-t border-zinc-850 flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-zinc-500 uppercase mr-1">Quick Run:</span>
              {[
                { cmd: 'play', label: 'Play Game' },
                { cmd: 'sound', label: soundEnabled ? 'Mute Audio' : 'Unmute Audio' },
                { cmd: 'skills', label: 'Skills' },
                { cmd: 'bca', label: 'Academic' },
                { cmd: 'repos', label: 'Repos' },
                { cmd: 'contact', label: 'Contact' },
                { cmd: 'clear', label: 'Clear' },
              ].map((item) => (
                <button
                  key={item.cmd}
                  type="button"
                  onClick={() => {
                    setTerminalInput(item.cmd);
                    // trigger execution immediately
                    setTimeout(() => {
                      const event = new Event('submit', { cancelable: true });
                      handleTerminalSubmit();
                    }, 50);
                  }}
                  className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
