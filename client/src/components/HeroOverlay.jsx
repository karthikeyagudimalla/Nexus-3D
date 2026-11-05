import React from 'react';
import { Sparkles, ArrowRight, Terminal, Layers, Flame, Compass, Palette } from 'lucide-react';
import { sound } from '../utils/sound';

export default function HeroOverlay({ currentTheme, onSelectTheme, stats }) {
  const themes = [
    {
      id: 'cyberpunk',
      name: 'Cyber Neon',
      primary: '#00f2fe',
      secondary: '#fe0979',
      border: 'border-cyan-500/50',
      bgGlow: 'shadow-cyan-500/20'
    },
    {
      id: 'deepSpace',
      name: 'Deep Cosmos',
      primary: '#8a2be2',
      secondary: '#4169e1',
      border: 'border-purple-500/50',
      bgGlow: 'shadow-purple-500/20'
    },
    {
      id: 'emeraldMatrix',
      name: 'Quantum Emerald',
      primary: '#10b981',
      secondary: '#06b6d4',
      border: 'border-emerald-500/50',
      bgGlow: 'shadow-emerald-500/20'
    },
    {
      id: 'solarFlare',
      name: 'Solar Flare',
      primary: '#f59e0b',
      secondary: '#ef4444',
      border: 'border-amber-500/50',
      bgGlow: 'shadow-amber-500/20'
    }
  ];

  return (
    <div className="relative z-20 min-h-screen flex flex-col justify-center px-4 md:px-12 pointer-events-none pt-20">
      <div className="max-w-3xl pointer-events-auto">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>REACT 18 • THREE.JS • NODE.JS EXPRESS</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] mb-6">
          <span className="block text-white">Next-Gen</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-pink-500 drop-shadow-[0_0_35px_rgba(0,242,254,0.35)]">
            3D Web Universe
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-2xl">
          An interactive WebGL experience built with procedural 3D geometries, raycast-responsive
          skill nodes, custom lighting, and a high-throughput Node.js backend. Drag to orbit,
          zoom to explore, or customize the 3D core in real-time.
        </p>

        {/* Theme Picker */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select 3D Core Theme:</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {themes.map((theme) => {
              const isActive = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectTheme(theme.id);
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all border ${
                    isActive
                      ? `glass-panel-glow ${theme.border} text-white ${theme.bgGlow} shadow-lg scale-105`
                      : 'glass-panel border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                    }}
                  />
                  <span>{theme.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#api"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel hover:bg-slate-800/60 border-slate-700/80 hover:border-cyan-500/40 text-slate-200 text-sm font-medium transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Inspect Node API</span>
          </a>
        </div>

        {/* Live Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
          <div className="glass-panel p-3 rounded-xl">
            <span className="block text-[11px] font-mono text-slate-400 uppercase">Particles</span>
            <span className="font-display font-bold text-lg text-cyan-400">
              {stats?.activeParticles?.toLocaleString() || '3,500+'}
            </span>
          </div>

          <div className="glass-panel p-3 rounded-xl">
            <span className="block text-[11px] font-mono text-slate-400 uppercase">Triangles</span>
            <span className="font-display font-bold text-lg text-pink-400">
              {stats?.trianglesRendered || '185k'}
            </span>
          </div>

          <div className="glass-panel p-3 rounded-xl">
            <span className="block text-[11px] font-mono text-slate-400 uppercase">Target FPS</span>
            <span className="font-display font-bold text-lg text-emerald-400">
              {stats?.targetFPS || '60'} FPS
            </span>
          </div>

          <div className="glass-panel p-3 rounded-xl">
            <span className="block text-[11px] font-mono text-slate-400 uppercase">API Status</span>
            <span className="font-display font-bold text-lg text-purple-400">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
