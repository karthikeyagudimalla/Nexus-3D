import React, { useState } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, Terminal, Activity, Layers } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({ serverStatus, onToggleAmbient, isAmbientPlaying }) {
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) sound.playClick();
  };

  const navLinks = [
    { label: '3D Core', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Node API', href: '#api' },
    { label: 'Transmit', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-5 py-2.5 rounded-2xl shadow-2xl">
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
            <div className="w-full h-full bg-[#050713] rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400">
                NEXUS-3D
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                v2.5
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              React 18 • Three.js • Node.js
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-lg text-sm text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Server Status & Audio Controls */}
        <div className="flex items-center gap-3">
          {/* Server Status Pill */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
              serverStatus === 'ONLINE'
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                serverStatus === 'ONLINE'
                  ? 'bg-emerald-400 animate-ping'
                  : 'bg-amber-400 animate-pulse'
              }`}
            />
            <span>Node.js: {serverStatus}</span>
          </div>

          {/* Ambient Sound Drone Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleAmbient();
            }}
            title={isAmbientPlaying ? 'Mute Ambient Space Drone' : 'Enable Ambient Space Drone'}
            className={`p-2 rounded-xl border transition-all ${
              isAmbientPlaying
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className={`w-4 h-4 ${isAmbientPlaying ? 'animate-pulse text-cyan-400' : ''}`} />
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={handleMuteToggle}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className={`p-2 rounded-xl border transition-all ${
              !isMuted
                ? 'bg-purple-500/20 border-purple-400/50 text-purple-300'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-500'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* CTA Link */}
          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transmit</span>
          </a>
        </div>
      </div>
    </header>
  );
}
