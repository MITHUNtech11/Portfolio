import { useEffect, RefObject } from 'react';
import * as THREE from 'three';
import { THEME_CHANGE_EVENT } from './theme';

export function useParticleField(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Scene & Renderer
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });

    const getWidth = () => canvas.parentElement?.clientWidth || window.innerWidth;
    const getHeight = () => canvas.parentElement?.clientHeight || window.innerHeight;

    renderer.setSize(getWidth(), getHeight());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      getWidth() / getHeight(),
      1,
      1000
    );
    camera.position.z = 400;

    // Particle geometry
    const particleCount = prefersReducedMotion ? 60 : 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle texture
    const createCircleTexture = () => {
      const size = 64;
      const cvs = document.createElement('canvas');
      cvs.width = size;
      cvs.height = size;
      const ctx = cvs.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      return new THREE.CanvasTexture(cvs);
    };

    const material = new THREE.PointsMaterial({
      size: 4.5,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.35,
      vertexColors: true,
      depthWrite: false,
    });

    // Dynamic theme colors helper
    const lightPalette = [
      new THREE.Color(0xdb9558), // Terracotta
      new THREE.Color(0x8b9a6e), // Sage
      new THREE.Color(0x010736), // Midnight Navy
    ];

    const darkPalette = [
      new THREE.Color(0xf5a663), // Glowing Amber
      new THREE.Color(0xf5efe1), // Warm Cream Starlight
      new THREE.Color(0x64b5f6), // Starlight Cyan/Blue
    ];

    const applyColorsForTheme = (isDark: boolean) => {
      const palette = isDark ? darkPalette : lightPalette;
      const colorsAttr = geometry.getAttribute('color') as THREE.BufferAttribute;
      if (!colorsAttr) return;

      const colorArray = colorsAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const rand = Math.random();
        const chosenColor = rand < 0.5 ? palette[0] : rand < 0.8 ? palette[1] : palette[2];
        colorArray[i * 3] = chosenColor.r;
        colorArray[i * 3 + 1] = chosenColor.g;
        colorArray[i * 3 + 2] = chosenColor.b;
      }
      colorsAttr.needsUpdate = true;
      material.opacity = isDark ? 0.55 : 0.35;
      material.needsUpdate = true;
    };

    // Initialize with current theme
    const initialIsDark = document.documentElement.classList.contains('dark');
    applyColorsForTheme(initialIsDark);

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Listen to theme switch events
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark?: boolean; theme?: string }>;
      const isDark =
        customEvent.detail?.isDark ??
        (customEvent.detail?.theme === 'dark') ??
        document.documentElement.classList.contains('dark');
      applyColorsForTheme(isDark);
    };
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.15;
      mouseY = (e.clientY - windowHalfY) * 0.15;
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    // Resize Handler
    const handleResize = () => {
      const width = getWidth();
      const height = getHeight();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (!prefersReducedMotion) {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0003;
        particles.position.x = targetX;
        particles.position.y = -targetY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [canvasRef]);
}
