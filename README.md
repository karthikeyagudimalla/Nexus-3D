# NEXUS-3D | Interactive WebGL & Full-Stack Experience

An immersive, high-performance 3D website built using **React 18**, **Three.js (WebGL)**, and **Node.js (Express)**.

---

## 🌟 Key Features

### 🎮 1. Interactive 3D WebGL Engine (Three.js)
- **Central Cyber Core**: Procedural 3D Torus Knot with metallic reflections, dynamic vertex displacement, and glowing energy core.
- **Orbital Gyroscope Rings**: Concentric rings orbiting independently with customizable speed and axis rotation.
- **Floating Data Shards**: Dynamic orbital shards responding to user interaction and exploded view states.
- **Starfield & Cosmic Dust**: 3,500+ additive particle points with depth attenuation and camera responsiveness.
- **Raycast-Enabled Constellation**: Interactive 3D skill nodes that detect mouse hover & click in real time, triggering sound blips and HUD tooltips.
- **Multi-Angle Camera Controls**: Smooth spherical orbit controls with damping and 4 camera viewpoints (*Cinematic Front*, *Core Close-Up*, *Isometric Orbit*, *Orbital Zenith*).
- **Exploded View & Wireframe Mode**: Real-time toggles between holographic wireframe geometry and mechanical exploded views.
- **4 Live Color Themes**: *Cyber Neon*, *Deep Cosmos*, *Quantum Emerald*, and *Solar Flare* dynamically altering 3D lights, emissives, and fog.

### 🔊 2. Procedural Web Audio Engine
- Synthesized in real time using the **Web Audio API** (zero external MP3 assets needed).
- Sci-fi trigger blips on hover, laser confirmation sounds on button clicks, warp transitions on camera jumps, and a major-chord arpeggio on form submission.
- Optional ambient cosmic drone oscillator with low-pass biquad filter.

### ⚡ 3. Full-Stack Node.js Express API
- **Live Health Probes**: `/api/health` providing uptime and server status.
- **Dynamic 3D Scene Config**: `/api/scene-config` providing color palettes, bloom intensity, and camera presets.
- **Project Telemetry**: `/api/projects` serving deployment data, metrics, and tech stacks.
- **Skills Registry**: `/api/skills` returning 3D node coordinates and mastery metrics.
- **Transmission Inquiries**: `/api/contact` handling submissions with input validation, in-memory persistence, and status confirmations.
- **Live Interactive Terminal**: Built-in UI console allowing users to test API endpoints directly in browser.

---

## 🏗️ Project Architecture

```
anti gravity/
├── client/                     # Frontend (React 18 + Three.js + Tailwind CSS + Vite)
│   ├── index.html              # HTML shell with Google Fonts
│   ├── vite.config.js          # Vite config with backend API proxy
│   ├── tailwind.config.js      # Cyberpunk color tokens & animations
│   ├── src/
│   │   ├── main.jsx            # React root entry point
│   │   ├── App.jsx             # Main state coordinator
│   │   ├── index.css           # Glassmorphism & cyber grid styles
│   │   ├── components/
│   │   │   ├── Scene3D.jsx            # WebGL Canvas & Three.js render loop
│   │   │   ├── HudControls.jsx        # Floating 3D viewport controls
│   │   │   ├── HeroOverlay.jsx        # Typography, theme picker & live stats
│   │   │   ├── Features3D.jsx         # Architecture & capabilities grid
│   │   │   ├── ProjectsSection.jsx    # Projects with live metric counters
│   │   │   ├── SkillsConstellation.jsx# Competency bars synced with 3D nodes
│   │   │   ├── BackendTelemetry.jsx   # Interactive Node.js API tester
│   │   │   ├── ContactSection.jsx     # Form with confetti & validation
│   │   │   ├── Navbar.jsx             # Glassmorphic header & audio toggles
│   │   │   └── Footer.jsx             # Tech specs & system info
│   │   └── utils/
│   │       ├── api.js                 # API client with fallback data
│   │       └── sound.js               # Web Audio API sound generator
│   └── package.json
│
├── server/                     # Backend (Node.js + Express)
│   ├── server.js               # Express application & REST routes
│   └── package.json
│
├── package.json                # Root orchestration with concurrently
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Start Both Backend & Frontend Simultaneously (Recommended)
From the root directory:
```bash
npm run dev
```
- **React Frontend**: [http://localhost:5173](http://localhost:5173)
- **Node.js Express Backend**: [http://localhost:5000](http://localhost:5000)

### 2. Or Start Separately

#### Run Node.js Server:
```bash
cd server
npm run dev
```

#### Run React Client:
```bash
cd client
npm run dev
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server uptime and health probe |
| `GET` | `/api/scene-config` | 3D theme colors, camera presets, and lighting |
| `GET` | `/api/projects` | Catalog of featured 3D deployments & metrics |
| `GET` | `/api/skills` | Coordinates and mastery levels for 3D nodes |
| `GET` | `/api/stats` | Real-time particle counters and server uptime |
| `POST` | `/api/contact` | Handles transmission submissions with validation |
| `GET` | `/api/contact/messages` | Inspect stored transmissions (Admin) |

---

## 🎨 Interactive Controls & Shortcuts
- **Rotate / Orbit**: Click and drag on the 3D viewport.
- **Zoom**: Mouse wheel or pinch.
- **Inspect 3D Node**: Hover over any floating glowing skill sphere.
- **Theme Switcher**: Click on any theme pill in the Hero section (*Cyber Neon*, *Deep Cosmos*, *Quantum Emerald*, *Solar Flare*).
- **HUD Controls**: Click the top-left HUD buttons to change camera viewpoints, toggle wireframe mode, or explode the 3D core.
- **Sound Toggle**: Use the speaker and radio icons in the top navigation bar to toggle SFX and cosmic ambient drone.
