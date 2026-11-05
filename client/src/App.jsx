import React, { useState, useEffect } from 'react';
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import HudControls from './components/HudControls';
import HeroOverlay from './components/HeroOverlay';
import Features3D from './components/Features3D';
import ProjectsSection from './components/ProjectsSection';
import SkillsConstellation from './components/SkillsConstellation';
import BackendTelemetry from './components/BackendTelemetry';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import {
  fetchHealth,
  fetchSceneConfig,
  fetchProjects,
  fetchSkills,
  fetchStats
} from './utils/api';
import { sound } from './utils/sound';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('cyberpunk');
  const [themeConfigs, setThemeConfigs] = useState({
    cyberpunk: {
      primaryColor: '#00f2fe',
      secondaryColor: '#fe0979',
      ambientColor: '#050713'
    },
    deepSpace: {
      primaryColor: '#8a2be2',
      secondaryColor: '#4169e1',
      ambientColor: '#050515'
    },
    emeraldMatrix: {
      primaryColor: '#10b981',
      secondaryColor: '#06b6d4',
      ambientColor: '#021810'
    },
    solarFlare: {
      primaryColor: '#f59e0b',
      secondaryColor: '#ef4444',
      ambientColor: '#1f0d05'
    }
  });

  const [wireframeMode, setWireframeMode] = useState(false);
  const [explodedView, setExplodedView] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraPreset, setCameraPreset] = useState('hero');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [fps, setFps] = useState(60);

  const [serverStatus, setServerStatus] = useState('CONNECTING');
  const [serverHealth, setServerHealth] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [stats, setStats] = useState(null);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Initialize data from Node.js backend
  useEffect(() => {
    async function loadData() {
      // 1. Health
      const health = await fetchHealth();
      setServerHealth(health);
      if (health?.status === 'ONLINE') {
        setServerStatus('ONLINE');
      } else {
        setServerStatus('LOCAL');
      }

      // 2. Scene Config
      const config = await fetchSceneConfig();
      if (config?.themes) {
        setThemeConfigs(config.themes);
      }

      // 3. Projects
      const projData = await fetchProjects();
      setProjects(projData);

      // 4. Skills
      const skillData = await fetchSkills();
      setSkills(skillData);

      // 5. Stats
      const statData = await fetchStats();
      setStats(statData);
    }

    loadData();

    // Periodic health check
    const interval = setInterval(async () => {
      const health = await fetchHealth();
      if (health?.status === 'ONLINE') {
        setServerStatus('ONLINE');
        setServerHealth(health);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
  };

  const handleToggleAmbient = () => {
    const isPlaying = sound.toggleAmbient();
    setIsAmbientPlaying(isPlaying);
  };

  return (
    <div className="relative min-h-screen bg-[#050713] text-slate-100 overflow-x-hidden">
      {/* 1. Header Navigation */}
      <Navbar
        serverStatus={serverStatus}
        onToggleAmbient={handleToggleAmbient}
        isAmbientPlaying={isAmbientPlaying}
      />

      {/* 2. Hero Section with 3D Canvas Background & Interactive Overlays */}
      <section id="hero" className="relative w-full min-h-screen overflow-hidden">
        {/* Three.js Canvas Container */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Scene3D
            themeConfig={themeConfigs[currentTheme]}
            wireframeMode={wireframeMode}
            explodedView={explodedView}
            autoRotate={autoRotate}
            cameraPreset={cameraPreset}
            onNodeHover={setHoveredNode}
            onFpsUpdate={setFps}
          />
        </div>

        {/* 3D HUD Controls (Camera angles, wireframe, explode view, FPS) */}
        <HudControls
          cameraPreset={cameraPreset}
          setCameraPreset={setCameraPreset}
          wireframeMode={wireframeMode}
          setWireframeMode={setWireframeMode}
          explodedView={explodedView}
          setExplodedView={setExplodedView}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          fps={fps}
          hoveredNode={hoveredNode}
        />

        {/* Hero Interactive Typography, Theme Switcher & Stats */}
        <HeroOverlay
          currentTheme={currentTheme}
          onSelectTheme={handleSelectTheme}
          stats={stats}
        />
      </section>

      {/* 3. Features Section */}
      <Features3D />

      {/* 4. Projects Showcase (Dynamic from Node API) */}
      <ProjectsSection projects={projects} />

      {/* 5. Skills Constellation (Synced with 3D nodes) */}
      <SkillsConstellation skills={skills} />

      {/* 6. Node.js Backend Telemetry & Live Interactive Terminal */}
      <BackendTelemetry serverHealth={serverHealth} stats={stats} />

      {/* 7. Transmission / Contact Section */}
      <ContactSection />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
