import React, { useState } from 'react';
import { ExternalLink, Layers, Terminal, Sparkles, Filter } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'WebGL & Graphics', 'Creative Tech', 'Full-Stack Distributed', 'AI & Neural Systems'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative z-20 py-24 px-4 md:px-12 bg-cyber-bg/95">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-pink-400 text-xs font-mono mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>PROJECT SHOWCASE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Featured 3D Deployments
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Live production systems engineered with Three.js rendering pipelines, WebGL compute,
              and Node.js microservices.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                  activeCategory === cat
                    ? 'bg-pink-500/20 border-pink-400 text-pink-300 shadow-md shadow-pink-500/20'
                    : 'glass-panel border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onMouseEnter={() => sound.playHover()}
              className="glass-panel rounded-3xl p-7 hover:border-pink-500/40 transition-all duration-300 group flex flex-col justify-between hover:shadow-2xl hover:shadow-pink-500/10"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-cyan-300">
                    {proj.category}
                  </span>
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-md uppercase font-semibold"
                    style={{
                      backgroundColor: `${proj.color}20`,
                      color: proj.color,
                      border: `1px solid ${proj.color}40`
                    }}
                  >
                    {proj.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-2xl text-white mb-3 group-hover:text-pink-300 transition-colors">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {proj.description}
                </p>

                {/* Metrics Grid */}
                {proj.metrics && (
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/60 border border-white/5 mb-6">
                    {Object.entries(proj.metrics).map(([key, val]) => (
                      <div key={key} className="text-center">
                        <span className="block text-[10px] font-mono uppercase text-slate-400">
                          {key}
                        </span>
                        <span className="font-mono font-bold text-xs text-cyan-300">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags & Action Link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" /> WebGL Live Demo
                  </span>
                  <button
                    onClick={() => sound.playWarp()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-pink-500/20 text-slate-200 hover:text-pink-300 border border-white/10 hover:border-pink-500/40 text-xs font-mono font-medium transition-all"
                  >
                    <span>Launch Node</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
