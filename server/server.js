import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// In-memory message store
const messages = [];

// Dynamic 3D Scene Configs
const sceneConfigs = {
  themes: {
    cyberpunk: {
      id: 'cyberpunk',
      name: 'Cyber Neon',
      primaryColor: '#00f2fe',
      secondaryColor: '#fe0979',
      ambientColor: '#12072b',
      bloomIntensity: 1.6,
      fogDensity: 0.035,
      coreGeometry: 'torusKnot',
      particleColor: '#00f2fe'
    },
    deepSpace: {
      id: 'deepSpace',
      name: 'Deep Cosmos',
      primaryColor: '#8a2be2',
      secondaryColor: '#4169e1',
      ambientColor: '#050515',
      bloomIntensity: 1.2,
      fogDensity: 0.02,
      coreGeometry: 'icosahedron',
      particleColor: '#a78bfa'
    },
    emeraldMatrix: {
      id: 'emeraldMatrix',
      name: 'Quantum Emerald',
      primaryColor: '#10b981',
      secondaryColor: '#06b6d4',
      ambientColor: '#021810',
      bloomIntensity: 1.8,
      fogDensity: 0.04,
      coreGeometry: 'octahedron',
      particleColor: '#34d399'
    },
    solarFlare: {
      id: 'solarFlare',
      name: 'Solar Flare',
      primaryColor: '#f59e0b',
      secondaryColor: '#ef4444',
      ambientColor: '#1f0d05',
      bloomIntensity: 2.0,
      fogDensity: 0.03,
      coreGeometry: 'dodecahedron',
      particleColor: '#fbbf24'
    }
  },
  cameraPresets: [
    { id: 'hero', name: 'Cinematic Front', position: [0, 0, 7], fov: 45 },
    { id: 'cockpit', name: 'Core Close-Up', position: [0, 0, 4.2], fov: 50 },
    { id: 'isometric', name: 'Isometric Orbit', position: [4, 4, 6], fov: 40 },
    { id: 'topdown', name: 'Orbital Zenith', position: [0, 7.5, 2], fov: 45 }
  ]
};

// Portfolio Projects data
const projects = [
  {
    id: 'proj-1',
    title: 'HyperSpace 3D Engine',
    category: 'WebGL & Graphics',
    description: 'Real-time procedural galaxy renderer with GPU compute shaders, gravity physics, and interactive celestial bodies.',
    tags: ['React.js', 'Three.js', 'GLSL', 'WebGL'],
    color: '#00f2fe',
    badge: '3D Simulation',
    metrics: { fps: '60 FPS', shaders: '12 Shaders', stars: '25,000+' },
    links: { live: '#', github: '#' }
  },
  {
    id: 'proj-2',
    title: 'Aura Holographic Studio',
    category: 'Creative Tech',
    description: 'Immersive audio-visualizer environment reacting to micro-frequencies with dynamic vertex displacement and bloom.',
    tags: ['Three.js', 'Web Audio API', 'React', 'Tailwind'],
    color: '#fe0979',
    badge: 'Audio-Reactive',
    metrics: { bands: '1024 FFT', latency: '< 5ms', particles: '15,000' },
    links: { live: '#', github: '#' }
  },
  {
    id: 'proj-3',
    title: 'Quantum Cloud Orchestrator',
    category: 'Full-Stack Distributed',
    description: 'High-throughput Node.js microservices topology visualizer with real-time 3D node telemetry and health monitoring.',
    tags: ['Node.js', 'Express', 'WebSocket', 'Three.js'],
    color: '#10b981',
    badge: 'Distributed Ops',
    metrics: { rps: '45k req/s', uptime: '99.99%', latency: '8ms' },
    links: { live: '#', github: '#' }
  },
  {
    id: 'proj-4',
    title: 'NeuroMesh AI Interface',
    category: 'AI & Neural Systems',
    description: 'Interactive 3D neural network visualizer that tracks activation layers and weights in real-time training workflows.',
    tags: ['Python', 'TensorFlow', 'React 18', 'Three.js'],
    color: '#f59e0b',
    badge: 'Neural Vis',
    metrics: { nodes: '3,400', layers: '18', latency: '12ms' },
    links: { live: '#', github: '#' }
  }
];

// Skills Constellation
const skills = [
  { name: 'React.js 18', level: 96, category: 'Frontend', color: '#61dafb', coords: [-2, 1.2, 0.5] },
  { name: 'Three.js / WebGL', level: 94, category: '3D Graphics', color: '#00f2fe', coords: [0, 2.2, -0.8] },
  { name: 'Node.js & Express', level: 92, category: 'Backend', color: '#68a063', coords: [2.2, 1.1, 0.4] },
  { name: 'Shaders & GLSL', level: 86, category: '3D Graphics', color: '#ff2d55', coords: [-1.8, -1.2, 0.6] },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend', color: '#38bdf8', coords: [1.8, -1.3, -0.5] },
  { name: 'TypeScript', level: 90, category: 'Fullstack', color: '#3178c6', coords: [0, -2.1, 0.7] }
];

// Start timestamp for server uptime
const serverStartTime = Date.now();

// API Routes
app.get('/api/health', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
  res.json({
    status: 'ONLINE',
    uptime: `${uptimeSeconds}s`,
    timestamp: new Date().toISOString(),
    environment: 'production-ready',
    service: 'Nexus-3D Core Engine API'
  });
});

app.get('/api/scene-config', (req, res) => {
  res.json(sceneConfigs);
});

app.get('/api/projects', (req, res) => {
  res.json({
    count: projects.length,
    projects
  });
});

app.get('/api/skills', (req, res) => {
  res.json({
    skills
  });
});

app.get('/api/stats', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
  res.json({
    activeParticles: 12500,
    trianglesRendered: '185,420',
    targetFPS: 60,
    serverUptimeSeconds: uptimeSeconds,
    inquiriesReceived: messages.length,
    satisfactionRate: '99.8%'
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required fields: name, email, and message.'
    });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.'
    });
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: subject ? subject.trim() : 'Project Inquiry',
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  messages.push(newMessage);
  console.log(`[CONTACT RECEIVED] From: ${newMessage.name} (${newMessage.email}) | Subject: ${newMessage.subject}`);

  return res.status(201).json({
    success: true,
    message: 'Transmission received successfully! Our system will dispatch a response shortly.',
    confirmationId: newMessage.id
  });
});

app.get('/api/contact/messages', (req, res) => {
  res.json({
    total: messages.length,
    messages
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Nexus-3D API Server operational on http://localhost:${PORT}`);
});
