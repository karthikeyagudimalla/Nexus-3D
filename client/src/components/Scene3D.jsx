import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { sound } from '../utils/sound';

export default function Scene3D({
  themeConfig,
  wireframeMode,
  explodedView,
  autoRotate,
  cameraPreset,
  onNodeHover,
  onFpsUpdate
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const coreMeshRef = useRef(null);
  const ringsRef = useRef([]);
  const shardsRef = useRef([]);
  const skillNodesRef = useRef([]);
  const particlesRef = useRef(null);
  const pointLightsRef = useRef([]);
  const targetCamPosRef = useRef(new THREE.Vector3(0, 0, 7));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2(-1000, -1000));
  const hoveredNodeRef = useRef(null);
  const animationFrameId = useRef(null);

  // Set camera target based on cameraPreset
  useEffect(() => {
    if (!cameraPreset) return;
    const presets = {
      hero: { pos: [0, 0, 7], target: [0, 0, 0] },
      cockpit: { pos: [0, 0, 3.8], target: [0, 0, 0] },
      isometric: { pos: [4.5, 4.2, 5.5], target: [0, 0, 0] },
      topdown: { pos: [0, 7.5, 1.2], target: [0, 0, 0] }
    };
    const cfg = presets[cameraPreset] || presets.hero;
    targetCamPosRef.current.set(...cfg.pos);
    targetLookAtRef.current.set(...cfg.target);
    sound.playWarp();
  }, [cameraPreset]);

  // Handle Scene Setup & Lifecycle
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050713, 0.035);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 14;
    controls.minDistance = 2.5;
    controls.enablePan = false;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1128, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Colored Orbiting Point Lights
    const lightCyan = new THREE.PointLight(0x00f2fe, 3, 15);
    const lightPink = new THREE.PointLight(0xfe0979, 3, 15);
    const lightViolet = new THREE.PointLight(0xa855f7, 2, 12);
    scene.add(lightCyan);
    scene.add(lightPink);
    scene.add(lightViolet);
    pointLightsRef.current = [lightCyan, lightPink, lightViolet];

    // 6. Central Cyber Core (Torus Knot)
    const coreGeo = new THREE.TorusKnotGeometry(1.0, 0.32, 128, 32, 2, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: false,
      emissive: 0x004754,
      emissiveIntensity: 0.6
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Inner glowing energy core
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreMesh.add(innerCore);

    // 7. Concentric Gyroscopic Rings
    const rings = [];
    const ringConfigs = [
      { radius: 1.85, tube: 0.02, color: 0x00f2fe, rotSpeed: 0.6 },
      { radius: 2.25, tube: 0.022, color: 0xfe0979, rotSpeed: -0.45 },
      { radius: 2.65, tube: 0.02, color: 0xa855f7, rotSpeed: 0.3 }
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.9
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      scene.add(ringMesh);
      rings.push({ mesh: ringMesh, baseRadius: cfg.radius, speed: cfg.rotSpeed });
    });
    ringsRef.current = rings;

    // 8. Floating Holographic Data Shards
    const shards = [];
    const shardGeo = new THREE.TetrahedronGeometry(0.18);
    for (let i = 0; i < 24; i++) {
      const shardMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x00f2fe : 0xfe0979,
        wireframe: true,
        emissive: i % 2 === 0 ? 0x00f2fe : 0xfe0979,
        emissiveIntensity: 0.5
      });
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / 24) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 0.8;
      const height = (Math.random() - 0.5) * 2;
      shard.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      scene.add(shard);
      shards.push({
        mesh: shard,
        angle,
        radius,
        height,
        orbitSpeed: 0.2 + Math.random() * 0.3,
        rotSpeed: Math.random() * 2
      });
    }
    shardsRef.current = shards;

    // 9. Interactive Skill Nodes (Constellation)
    const skillsList = [
      { name: 'React 18', color: 0x61dafb, desc: 'Declarative UI, Virtual DOM, Hooks' },
      { name: 'Three.js', color: 0x00f2fe, desc: 'WebGL 3D Rendering & Custom Shaders' },
      { name: 'Node.js', color: 0x68a063, desc: 'High-throughput Event-Driven Backend' },
      { name: 'Express API', color: 0x10b981, desc: 'RESTful Microservices & WebSockets' },
      { name: 'GLSL Shaders', color: 0xfe0979, desc: 'Vertex & Fragment GPU Pipelines' },
      { name: 'Tailwind CSS', color: 0x38bdf8, desc: 'Fluid Glassmorphism & Cyber Aesthetics' }
    ];

    const nodes = [];
    skillsList.forEach((sk, idx) => {
      const theta = (idx / skillsList.length) * Math.PI * 2;
      const r = 3.2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * 0.9 + (idx % 2 === 0 ? 0.4 : -0.4);
      const z = Math.sin(theta) * r;

      const sphereGeo = new THREE.SphereGeometry(0.18, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: sk.color,
        emissive: sk.color,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.9
      });
      const nodeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { ...sk, initialY: y, theta, r };

      // Halo ring around skill node
      const haloGeo = new THREE.RingGeometry(0.24, 0.28, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: sk.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeMesh.add(haloMesh);

      scene.add(nodeMesh);
      nodes.push(nodeMesh);
    });
    skillNodesRef.current = nodes;

    // 10. Starfield & Cosmic Particle Field
    const particleCount = 3500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor1 = new THREE.Color(0x00f2fe);
    const baseColor2 = new THREE.Color(0xfe0979);
    const baseColor3 = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 5 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      positions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[idx + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? baseColor1 : (i % 3 === 1 ? baseColor2 : baseColor3);
      colors[idx] = chosenColor.r;
      colors[idx + 1] = chosenColor.g;
      colors[idx + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 11. Mouse Movement & Raycasting Listeners
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      if (hoveredNodeRef.current) {
        sound.playClick();
        const data = hoveredNodeRef.current.userData;
        targetLookAtRef.current.copy(hoveredNodeRef.current.position);
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // 12. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 13. Render Loop & FPS calculation
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // FPS Calculation
      const now = performance.now();
      frameCount++;
      fpsTimer += (now - lastTime);
      lastTime = now;
      if (fpsTimer >= 1000) {
        if (onFpsUpdate) onFpsUpdate(Math.round((frameCount * 1000) / fpsTimer));
        frameCount = 0;
        fpsTimer = 0;
      }

      // Smooth camera position lerping to target
      camera.position.lerp(targetCamPosRef.current, 0.05);
      controls.target.lerp(targetLookAtRef.current, 0.05);

      // Controls Auto Rotate
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.2;
      controls.update();

      // Rotate central core
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.x = elapsedTime * 0.3;
        coreMeshRef.current.rotation.y = elapsedTime * 0.45;
        // Subtle floating bob
        coreMeshRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
      }

      // Rotate gyroscopic rings
      ringsRef.current.forEach((r, idx) => {
        r.mesh.rotation.x = elapsedTime * r.speed * 0.8;
        r.mesh.rotation.y = elapsedTime * r.speed;
        r.mesh.rotation.z = Math.sin(elapsedTime * 0.5 + idx) * 0.4;
      });

      // Orbit floating data shards
      shardsRef.current.forEach((shard) => {
        shard.angle += delta * shard.orbitSpeed;
        const curRadius = shard.radius * (explodedView ? 1.6 : 1.0);
        shard.mesh.position.x = Math.cos(shard.angle) * curRadius;
        shard.mesh.position.z = Math.sin(shard.angle) * curRadius;
        shard.mesh.position.y = shard.height + Math.sin(elapsedTime * 2 + shard.angle) * 0.2;
        shard.mesh.rotation.x += delta * shard.rotSpeed;
        shard.mesh.rotation.y += delta * shard.rotSpeed;
      });

      // Float Skill Nodes
      skillNodesRef.current.forEach((node, idx) => {
        const offset = Math.sin(elapsedTime * 2 + idx) * 0.15;
        node.position.y = node.userData.initialY + offset;
        // Make halo face camera
        if (node.children[0]) {
          node.children[0].quaternion.copy(camera.quaternion);
        }
      });

      // Slowly rotate starfield
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.02;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.015) * 0.08;
      }

      // Orbit colored point lights
      if (pointLightsRef.current.length >= 3) {
        pointLightsRef.current[0].position.set(
          Math.cos(elapsedTime * 1.2) * 4.5,
          Math.sin(elapsedTime * 0.8) * 3,
          Math.sin(elapsedTime * 1.2) * 4.5
        );
        pointLightsRef.current[1].position.set(
          Math.cos(elapsedTime * -1.0) * 4.2,
          Math.sin(elapsedTime * 1.1) * 2.5,
          Math.sin(elapsedTime * -1.0) * 4.2
        );
        pointLightsRef.current[2].position.set(
          0,
          Math.sin(elapsedTime * 1.5) * 4.0,
          Math.cos(elapsedTime * 0.7) * 3.5
        );
      }

      // Raycasting for interactive skill nodes
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(skillNodesRef.current, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hoveredNodeRef.current !== hit) {
          if (hoveredNodeRef.current) {
            hoveredNodeRef.current.scale.set(1, 1, 1);
            hoveredNodeRef.current.material.emissiveIntensity = 0.9;
          }
          hoveredNodeRef.current = hit;
          hit.scale.set(1.4, 1.4, 1.4);
          hit.material.emissiveIntensity = 2.2;
          sound.playHover();
          if (onNodeHover) onNodeHover(hit.userData);
        }
      } else {
        if (hoveredNodeRef.current) {
          hoveredNodeRef.current.scale.set(1, 1, 1);
          hoveredNodeRef.current.material.emissiveIntensity = 0.9;
          hoveredNodeRef.current = null;
          if (onNodeHover) onNodeHover(null);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Wireframe mode on state change
  useEffect(() => {
    if (coreMeshRef.current) {
      coreMeshRef.current.material.wireframe = wireframeMode;
    }
  }, [wireframeMode]);

  // Update Theme colors dynamically on state change
  useEffect(() => {
    if (!themeConfig || !sceneRef.current) return;
    const { primaryColor, secondaryColor, ambientColor } = themeConfig;

    if (coreMeshRef.current) {
      coreMeshRef.current.material.color.set(primaryColor);
      coreMeshRef.current.material.emissive.set(primaryColor);
    }

    if (pointLightsRef.current.length >= 2) {
      pointLightsRef.current[0].color.set(primaryColor);
      pointLightsRef.current[1].color.set(secondaryColor);
    }

    if (ringsRef.current.length >= 3) {
      ringsRef.current[0].mesh.material.color.set(primaryColor);
      ringsRef.current[0].mesh.material.emissive.set(primaryColor);
      ringsRef.current[1].mesh.material.color.set(secondaryColor);
      ringsRef.current[1].mesh.material.emissive.set(secondaryColor);
    }

    if (sceneRef.current.fog) {
      sceneRef.current.fog.color.set(ambientColor || '#050713');
    }
  }, [themeConfig]);

  // Exploded view animation
  useEffect(() => {
    ringsRef.current.forEach((r, idx) => {
      const targetScale = explodedView ? 1.45 + idx * 0.25 : 1.0;
      r.mesh.scale.set(targetScale, targetScale, targetScale);
    });
  }, [explodedView]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing outline-none"
    />
  );
}
