import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioManager } from '../utils/audioManager';

export default function GiftBox3D({ onOpen, isOpened }) {
  const mountRef = useRef(null);
  const isOpenedRef = useRef(isOpened);
  isOpenedRef.current = isOpened;

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd2, 3.2);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe5c158, 2.2);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const interiorGlow = new THREE.PointLight(0xffd700, 0, 5);
    interiorGlow.position.set(0, 0.5, 0);
    scene.add(interiorGlow);

    // Box Materials
    // Deep burgundy velvet texture
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x481223,
      roughness: 0.35,
      metalness: 0.2,
    });

    // Metallic Champagne Gold for ribbon and trim
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.85,
    });

    // Luxury Inner Velvet Cushion
    const cushionMaterial = new THREE.MeshStandardMaterial({
      color: 0x240812,
      roughness: 0.8,
      metalness: 0.1,
    });

    // Root Group
    const rootGroup = new THREE.Group();
    rootGroup.position.y = -0.3;
    scene.add(rootGroup);

    // 1. Box Base
    const baseSize = 2.0;
    const baseHeight = 1.3;
    const baseGeometry = new THREE.BoxGeometry(baseSize, baseHeight, baseSize);
    const baseMesh = new THREE.Mesh(baseGeometry, boxMaterial);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    rootGroup.add(baseMesh);

    // Inner velvet lining
    const innerCushion = new THREE.Mesh(
      new THREE.BoxGeometry(baseSize * 0.92, baseHeight * 0.5, baseSize * 0.92),
      cushionMaterial
    );
    innerCushion.position.y = 0.3;
    rootGroup.add(innerCushion);

    // Base Ribbons (Vertical and Horizontal)
    const ribbonWidth = 0.28;
    const ribbonThickness = 0.02;

    const ribbonH = new THREE.Mesh(
      new THREE.BoxGeometry(baseSize + ribbonThickness * 2, baseHeight + ribbonThickness, ribbonWidth),
      goldMaterial
    );
    ribbonH.castShadow = true;
    rootGroup.add(ribbonH);

    const ribbonV = new THREE.Mesh(
      new THREE.BoxGeometry(ribbonWidth, baseHeight + ribbonThickness, baseSize + ribbonThickness * 2),
      goldMaterial
    );
    ribbonV.castShadow = true;
    rootGroup.add(ribbonV);

    // Base gold trim bevels
    const trimGeometry = new THREE.BoxGeometry(baseSize + 0.04, 0.06, baseSize + 0.04);
    const bottomTrim = new THREE.Mesh(trimGeometry, goldMaterial);
    bottomTrim.position.y = -baseHeight / 2 + 0.03;
    rootGroup.add(bottomTrim);

    // 2. Box Lid Group (Hinged / Floating)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, baseHeight / 2 + 0.05, 0);
    rootGroup.add(lidGroup);

    const lidHeight = 0.32;
    const lidSize = baseSize + 0.12;
    const lidGeometry = new THREE.BoxGeometry(lidSize, lidHeight, lidSize);
    const lidMesh = new THREE.Mesh(lidGeometry, boxMaterial);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Lid Rim gold band
    const lidRim = new THREE.Mesh(
      new THREE.BoxGeometry(lidSize + 0.02, 0.04, lidSize + 0.02),
      goldMaterial
    );
    lidRim.position.y = -lidHeight / 2 + 0.02;
    lidGroup.add(lidRim);

    // Lid Ribbon Cross
    const lidRibbonH = new THREE.Mesh(
      new THREE.BoxGeometry(lidSize + 0.02, lidHeight + 0.02, ribbonWidth),
      goldMaterial
    );
    lidRibbonH.position.y = 0.01;
    lidGroup.add(lidRibbonH);

    const lidRibbonV = new THREE.Mesh(
      new THREE.BoxGeometry(ribbonWidth, lidHeight + 0.02, lidSize + 0.02),
      goldMaterial
    );
    lidRibbonV.position.y = 0.01;
    lidGroup.add(lidRibbonV);

    // 3. Ribbon Bow Knot on Top
    const bowGroup = new THREE.Group();
    bowGroup.position.y = lidHeight / 2 + 0.05;
    lidGroup.add(bowGroup);

    // Center knot sphere
    const knotMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      goldMaterial
    );
    bowGroup.add(knotMesh);

    // Bow loops (Torus)
    const loopGeom = new THREE.TorusGeometry(0.28, 0.08, 16, 32, Math.PI * 1.6);
    const loop1 = new THREE.Mesh(loopGeom, goldMaterial);
    loop1.rotation.set(0.4, 0.6, 0.8);
    loop1.position.set(0.18, 0.18, 0);
    bowGroup.add(loop1);

    const loop2 = new THREE.Mesh(loopGeom, goldMaterial);
    loop2.rotation.set(0.4, -0.6, -0.8);
    loop2.position.set(-0.18, 0.18, 0);
    bowGroup.add(loop2);

    // 4. Inside Treasure (Radiant Floating Golden Gem / Star)
    const gemGeometry = new THREE.OctahedronGeometry(0.38, 2);
    const gemMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe680,
      emissive: 0xffaa00,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
    });
    const gemMesh = new THREE.Mesh(gemGeometry, gemMaterial);
    gemMesh.position.set(0, 0.35, 0);
    gemMesh.scale.set(0, 0, 0); // hidden until opened
    rootGroup.add(gemMesh);

    // 5. Sparkle Particle Fountain System
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = 0.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      velocities.push({
        x: (Math.random() - 0.5) * 0.035,
        y: Math.random() * 0.05 + 0.02,
        z: (Math.random() - 0.5) * 0.035,
        rot: Math.random() * 0.1,
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffe072,
      size: 0.09,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particleSystem);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0.6;
    let targetRotationX = 0.25;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.6;
      mouseY = y * 0.4;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    let lidOpenProgress = isOpenedRef.current ? 1 : 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth idle floating and rotation
      targetRotationY = 0.5 + mouseX;
      targetRotationX = 0.25 - mouseY;

      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;
      rootGroup.position.y = -0.3 + Math.sin(elapsedTime * 1.5) * 0.06;

      // Opening Animation interpolation
      const targetProgress = isOpenedRef.current ? 1 : 0;
      lidOpenProgress += (targetProgress - lidOpenProgress) * 0.06;

      if (lidOpenProgress > 0.01) {
        // Lift and tilt lid
        lidGroup.position.y = baseHeight / 2 + 0.05 + lidOpenProgress * 1.4;
        lidGroup.position.z = -lidOpenProgress * 0.8;
        lidGroup.rotation.x = -lidOpenProgress * 0.9;
        lidGroup.rotation.y = lidOpenProgress * 0.3;

        // Interior light & Gem
        interiorGlow.intensity = lidOpenProgress * 3.5;
        const gemScale = Math.min(lidOpenProgress * 1.2, 1);
        gemMesh.scale.set(gemScale, gemScale, gemScale);
        gemMesh.rotation.y += 0.03;
        gemMesh.rotation.x += 0.01;
        gemMesh.position.y = 0.35 + Math.sin(elapsedTime * 3) * 0.1;

        // Animate particles
        particleMaterial.opacity = Math.min(lidOpenProgress * 0.9, 0.9);
        const posAttr = particleGeometry.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          let px = posAttr.getX(i) + velocities[i].x;
          let py = posAttr.getY(i) + velocities[i].y;
          let pz = posAttr.getZ(i) + velocities[i].z;

          // recycle particles
          if (py > 2.5) {
            py = 0.4;
            px = (Math.random() - 0.5) * 0.4;
            pz = (Math.random() - 0.5) * 0.4;
          }

          posAttr.setXYZ(i, px, py, pz);
        }
        posAttr.needsUpdate = true;
      } else {
        interiorGlow.intensity = 0;
        particleMaterial.opacity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      baseGeometry.dispose();
      boxMaterial.dispose();
      goldMaterial.dispose();
      cushionMaterial.dispose();
    };
  }, []);

  const handleClick = () => {
    if (!isOpened) {
      audioManager.playGiftOpenSound();
      onOpen();
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow highlight under the box */}
      <div
        className={`absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isOpened
            ? 'bg-champagne-500/35 scale-125'
            : hovered
            ? 'bg-champagne-500/25 scale-110'
            : 'bg-burgundy-600/30 scale-95'
        }`}
      />

      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] relative z-10 transition-transform duration-500 group-hover:scale-105"
      />

      {/* Interactive Hint / Status Badge */}
      <div className="relative z-20 mt-2 text-center">
        {!isOpened ? (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-luxury-surface/90 border border-champagne-500/30 backdrop-blur-md shadow-luxury-glow transition-all duration-300 group-hover:border-champagne-500 group-hover:scale-105">
            <span className="w-2 h-2 rounded-full bg-champagne-400 animate-ping" />
            <span className="text-xs uppercase tracking-widest text-champagne-300 font-medium">
              Click to Open Your Gift
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-burgundy-900/60 border border-champagne-500/20 text-champagne-400 text-xs tracking-wider">
            <span>✨ Vault Unlocked</span>
          </div>
        )}
      </div>
    </div>
  );
}
