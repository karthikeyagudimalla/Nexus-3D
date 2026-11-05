import React from 'react';
import { Layers, Heart, Terminal, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Footer() {
  return (
    <footer className="relative z-20 bg-slate-950 border-t border-white/10 py-12 px-4 md:px-12 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px]">
            <div className="w-full h-full bg-[#050713] rounded-lg flex items-center justify-center">
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-display font-bold text-white text-base tracking-wider">
              NEXUS-3D
            </span>
            <p className="text-[11px] font-mono text-slate-400">
              React 18 • Three.js • Node.js • Tailwind CSS
            </p>
          </div>
        </div>

        {/* System Specs Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
            WebGL 2.0
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-pink-300">
            Three.js r165
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-300">
            Node.js Express
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-purple-300">
            Web Audio API
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs font-mono text-slate-400">
          <p>Engineered for Next-Gen 3D Web Experiences</p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Designed with high-precision shaders & procedural geometry
          </p>
        </div>
      </div>
    </footer>
  );
}
