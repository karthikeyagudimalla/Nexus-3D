import React from 'react';
import { Cpu, CheckCircle2, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

export default function SkillsConstellation({ skills }) {
  return (
    <section id="skills" className="relative z-20 py-24 px-4 md:px-12 bg-[#050713]/90">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-emerald-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>CORE PROFICIENCIES</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            3D & Fullstack Constellation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            These competencies are mapped directly to the orbiting 3D celestial nodes in the hero
            scene. Hover or click on the 3D viewport or explore the breakdown below.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="glass-panel p-6 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3.5 h-3.5 rounded-full shadow-lg group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: skill.color, boxShadow: `0 0 12px ${skill.color}` }}
                  />
                  <h3 className="font-display font-bold text-lg text-white">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {skill.category}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Mastery Index</span>
                  <span className="text-emerald-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden p-[1px] border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, #10b981)`
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Production Tested
                </span>
                <span className="text-emerald-400/80">3D Synchronized</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
