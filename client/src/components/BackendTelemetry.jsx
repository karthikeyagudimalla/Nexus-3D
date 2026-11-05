import React, { useState } from 'react';
import { Terminal, Activity, Server, Play, CheckCircle2, Clock } from 'lucide-react';
import { sound } from '../utils/sound';

export default function BackendTelemetry({ serverHealth, stats }) {
  const [activeEndpoint, setActiveEndpoint] = useState('/api/health');
  const [terminalOutput, setTerminalOutput] = useState(
    JSON.stringify(serverHealth, null, 2)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [latencyMs, setLatencyMs] = useState(14);

  const endpoints = [
    { method: 'GET', path: '/api/health', desc: 'Server health and system status' },
    { method: 'GET', path: '/api/stats', desc: 'Live WebGL & server metrics' },
    { method: 'GET', path: '/api/scene-config', desc: '3D themes, camera positions' },
    { method: 'GET', path: '/api/projects', desc: 'Portfolio deployment catalog' },
    { method: 'POST', path: '/api/contact', desc: 'Dispatches validated transmission' },
  ];

  const handleTestEndpoint = async (path) => {
    sound.playClick();
    setActiveEndpoint(path);
    setIsLoading(true);
    const start = performance.now();

    try {
      const res = await fetch(path);
      const data = await res.json();
      const elapsed = Math.round(performance.now() - start);
      setLatencyMs(elapsed);
      setTerminalOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      setTerminalOutput(JSON.stringify({ error: 'Endpoint query failed', details: err.message }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="api" className="relative z-20 py-24 px-4 md:px-12 bg-cyber-bg/95">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-cyan-400 text-xs font-mono mb-4">
            <Server className="w-3.5 h-3.5" />
            <span>NODE.JS EXPRESS RUNTIME</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Full-Stack Backend Telemetry
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            The frontend connects dynamically with the Node.js backend. Test the live endpoints
            below to inspect raw JSON responses directly in real-time.
          </p>
        </div>

        {/* Console / Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Endpoints & Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-display font-bold text-white text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  API Endpoints
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  HTTP/1.1 Active
                </span>
              </div>

              <div className="space-y-2">
                {endpoints.map((ep) => {
                  const isSelected = activeEndpoint === ep.path;
                  return (
                    <button
                      key={ep.path}
                      onClick={() => handleTestEndpoint(ep.path)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400/60 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            ep.method === 'GET'
                              ? 'bg-blue-950 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {ep.method}
                        </span>
                        <div>
                          <p className="text-xs font-mono font-medium text-slate-200">
                            {ep.path}
                          </p>
                          <p className="text-[11px] text-slate-400">{ep.desc}</p>
                        </div>
                      </div>
                      <Play className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Status Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-panel p-4 rounded-2xl flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="block text-[10px] font-mono uppercase text-slate-400">
                    Server Uptime
                  </span>
                  <span className="font-mono font-bold text-sm text-white">
                    {serverHealth?.uptime || '99.98%'}
                  </span>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-2xl flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="block text-[10px] font-mono uppercase text-slate-400">
                    Ping Latency
                  </span>
                  <span className="font-mono font-bold text-sm text-emerald-400">
                    {latencyMs} ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Terminal (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl overflow-hidden border-slate-700/80 shadow-2xl">
              {/* Terminal Window Header */}
              <div className="bg-slate-950/80 px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    nexus-node-shell — {activeEndpoint}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    200 OK
                  </span>
                </div>
              </div>

              {/* Terminal Code Body */}
              <div className="p-5 bg-slate-950/95 font-mono text-xs overflow-x-auto min-h-[340px] max-h-[460px]">
                <div className="flex items-center gap-2 text-slate-400 mb-3 text-[11px] pb-2 border-b border-white/5">
                  <span className="text-emerald-400">$</span>
                  <span>curl -X GET http://localhost:5000{activeEndpoint}</span>
                  {isLoading && (
                    <span className="text-cyan-400 animate-pulse ml-2">Transmitting...</span>
                  )}
                </div>
                <pre className="text-cyan-300 font-mono leading-relaxed whitespace-pre">
                  {terminalOutput}
                </pre>
              </div>

              {/* Terminal Footer */}
              <div className="bg-slate-950/90 px-5 py-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Node.js v24 • Express 4.x • JSON</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> REST Protocol Validated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
