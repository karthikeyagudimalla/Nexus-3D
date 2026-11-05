const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('[API] Health endpoint unavailable, using fallback', err);
    return { status: 'OFFLINE', uptime: '0s', service: 'Nexus-3D Local Mode' };
  }
}

export async function fetchSceneConfig() {
  try {
    const res = await fetch(`${API_BASE}/scene-config`);
    if (!res.ok) throw new Error('Failed to fetch scene config');
    return await res.json();
  } catch (err) {
    console.warn('[API] Using default scene config', err);
    return null;
  }
}

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    return data.projects || [];
  } catch (err) {
    console.warn('[API] Using default projects', err);
    return [
      {
        id: 'proj-1',
        title: 'HyperSpace 3D Engine',
        category: 'WebGL & Graphics',
        description: 'Real-time procedural galaxy renderer with GPU compute shaders, gravity physics, and interactive celestial bodies.',
        tags: ['React.js', 'Three.js', 'GLSL', 'WebGL'],
        color: '#00f2fe',
        badge: '3D Simulation',
        metrics: { fps: '60 FPS', shaders: '12 Shaders', stars: '25,000+' }
      },
      {
        id: 'proj-2',
        title: 'Aura Holographic Studio',
        category: 'Creative Tech',
        description: 'Immersive audio-visualizer environment reacting to micro-frequencies with dynamic vertex displacement.',
        tags: ['Three.js', 'Web Audio API', 'React', 'Tailwind'],
        color: '#fe0979',
        badge: 'Audio-Reactive',
        metrics: { bands: '1024 FFT', latency: '< 5ms', particles: '15,000' }
      },
      {
        id: 'proj-3',
        title: 'Quantum Cloud Orchestrator',
        category: 'Full-Stack Distributed',
        description: 'High-throughput Node.js microservices topology visualizer with real-time 3D node telemetry.',
        tags: ['Node.js', 'Express', 'WebSocket', 'Three.js'],
        color: '#10b981',
        badge: 'Distributed Ops',
        metrics: { rps: '45k req/s', uptime: '99.99%', latency: '8ms' }
      }
    ];
  }
}

export async function fetchSkills() {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    const data = await res.json();
    return data.skills || [];
  } catch (err) {
    return [
      { name: 'React.js 18', level: 96, category: 'Frontend', color: '#61dafb' },
      { name: 'Three.js / WebGL', level: 94, category: '3D Graphics', color: '#00f2fe' },
      { name: 'Node.js & Express', level: 92, category: 'Backend', color: '#68a063' },
      { name: 'Shaders & GLSL', level: 86, category: '3D Graphics', color: '#ff2d55' },
      { name: 'Tailwind CSS', level: 95, category: 'Frontend', color: '#38bdf8' }
    ];
  }
}

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  } catch (err) {
    return {
      activeParticles: 12500,
      trianglesRendered: '185,420',
      targetFPS: 60,
      serverUptimeSeconds: 120,
      satisfactionRate: '99.8%'
    };
  }
}

export async function sendContactMessage(payload) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to dispatch message');
  }
  return data;
}
