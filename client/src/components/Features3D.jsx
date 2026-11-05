import React from 'react';
import { Box, Cpu, Sparkles, Zap, ShieldCheck, Compass } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Features3D() {
  const features = [
    {
      icon: Box,
      title: 'Procedural 3D Geometries',
      desc: 'Dynamic parametric surfaces, gyroscopic rings, and floating shards rendered with real-time mathematical transforms and lighting.',
      color: 'from-cyan-500 to-blue-600',
      badge: 'WebGL Core'
    },
    {
      icon: Sparkles,
      title: 'Real-Time Raycasting',
      desc: 'Direct GPU raycasting detecting mouse hover & clicks on 3D skill constellations, updating UI coordinates with zero perceptible latency.',
      color: 'from-pink-500 to-purple-600',
      badge: 'Interactive'
    },
    {
      icon: Cpu,
      title: 'Node.js Express Backend',
      desc: 'Robust event-driven Node.js server managing dynamic 3D scene configs, project telemetry, health probes, and message processing.',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Full-Stack'
    },
    {
      icon: Zap,
      title: 'Procedural Web Audio Engine',
      desc: 'Zero external MP3 dependencies. Real-time sound synthesis utilizing Web Audio API oscillators, biquad filters, and ambient drones.',
      color: 'from-amber-500 to-orange-600',
      badge: 'Audio Synth'
    },
    {
      icon: Compass,
      title: 'Cinematic Orbit Controls',
      desc: 'Smooth spherical coordinate damping, focal lerping, exploded view mechanics, and one-touch camera preset viewpoints.',
      color: 'from-indigo-500 to-cyan-500',
      badge: 'Camera'
    },
    {
      icon: ShieldCheck,
      title: 'Reactive State Architecture',
      desc: 'Bidirectional sync between React 18 state and Three.js scene graphs without dropping frames or triggering unnecessary re-renders.',
      color: 'from-violet-500 to-pink-500',
      badge: 'React 18'
    }
  ];

  return (
    <section id="features" className="relative z-20 py-24 px-4 md:px-12 bg-[#050713]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-cyan-400 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>ENGINE ARCHITECTURE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Engineered for High-Performance 3D
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Bridging Three.js hardware acceleration with modern React component architecture
            and scalable Node.js services.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="glass-panel p-6 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} p-[1.5px] shadow-lg`}
                    >
                      <div className="w-full h-full bg-[#050713] rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-cyan-400/80">
                  <span>SPECS: OPTIMIZED</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
