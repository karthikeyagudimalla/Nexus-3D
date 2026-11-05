import React from 'react';
import { Eye, Box, Cpu, RefreshCw, Zap, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function HudControls({
  cameraPreset,
  setCameraPreset,
  wireframeMode,
  setWireframeMode,
  explodedView,
  setExplodedView,
  autoRotate,
  setAutoRotate,
  fps,
  hoveredNode
}) {
  const cameraPresets = [
    { id: 'hero', label: 'Front View' },
    { id: 'cockpit', label: 'Core Zoom' },
    { id: 'isometric', label: 'Isometric' },
    { id: 'topdown', label: 'Zenith' }
  ];

  return (
    <>
      {/* Top Left: 3D Camera & Scene Controls HUD */}
      <div className="absolute top-24 left-4 md:left-8 z-30 flex flex-col gap-3 pointer-events-auto">
        <div className="glass-panel p-3.5 rounded-2xl shadow-xl flex flex-col gap-3 min-w-[210px] border-slate-700/60">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> 3D Viewport
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
              {fps || 60} FPS
            </span>
          </div>

          {/* Camera Angles */}
          <div className="grid grid-cols-2 gap-1.5">
            {cameraPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  sound.playClick();
                  setCameraPreset(preset.id);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all text-left ${
                  cameraPreset === preset.id
                    ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/40 border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="h-[1px] bg-white/10 my-0.5" />

          {/* Toggles */}
          <div className="flex flex-col gap-1.5">
            {/* Wireframe Mode */}
            <button
              onClick={() => {
                sound.playClick();
                setWireframeMode(!wireframeMode);
              }}
              className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                wireframeMode
                  ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <Box className="w-3.5 h-3.5" /> Wireframe
              </span>
              <span className="text-[10px]">{wireframeMode ? 'ON' : 'OFF'}</span>
            </button>

            {/* Exploded View */}
            <button
              onClick={() => {
                sound.playClick();
                setExplodedView(!explodedView);
              }}
              className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                explodedView
                  ? 'bg-pink-500/20 border-pink-500/60 text-pink-300 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" /> Exploded View
              </span>
              <span className="text-[10px]">{explodedView ? 'EXP' : 'NORM'}</span>
            </button>

            {/* Auto Rotate */}
            <button
              onClick={() => {
                sound.playClick();
                setAutoRotate(!autoRotate);
              }}
              className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                autoRotate
                  ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} /> Auto Orbit
              </span>
              <span className="text-[10px]">{autoRotate ? 'ON' : 'PAUSED'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hovered Skill Node Floating Tooltip */}
      {hoveredNode && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-300 animate-float">
          <div className="glass-panel-glow px-5 py-3 rounded-2xl flex items-center gap-4 border-cyan-400/50 shadow-2xl">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-cyan-300">
                  {hoveredNode.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  Interactive 3D Node
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                {hoveredNode.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
