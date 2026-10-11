import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { profileData } from '../../data/profile';

export interface PortraitCardProps {
  avatarUrl?: string;
  name?: string;
  className?: string;
  /**
   * Tailwind border-radius class for the square portrait.
   * Defaults to 'rounded-2xl' for modern squircle edges matching the portfolio design system.
   */
  roundedClassName?: string;
}

/**
 * PortraitCard
 *
 * Minimalist modern square portrait presentation with edge-to-edge imagery.
 * All static borders, outline frames, and dual rings have been removed.
 *
 * Interactive Behavior:
 * - When hovered: Pops front in 3D perspective with realistic elevation & depth shadow.
 * - Cursor follow: Tilts 3D perspective so the picture's edges dynamically track and follow
 *   the cursor, paired with responsive magnetic translation and a dynamic edge specular sheen.
 */
export const PortraitCard: React.FC<PortraitCardProps> = ({
  avatarUrl = profileData.avatarUrl,
  name = profileData.name,
  className = '',
  roundedClassName = 'rounded-2xl',
}) => {
  const [imageError, setImageError] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Target animation values
  const targets = useRef({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    scale: 1,
    glareX: 0,
    glareY: 0,
    glareOpacity: 0,
  });

  // Current interpolated values for 120 FPS lerp physics
  const current = useRef({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    scale: 1,
    glareX: 0,
    glareY: 0,
    glareOpacity: 0,
  });

  const resolvedAvatarUrl = useMemo(() => {
    const raw = avatarUrl || profileData.avatarUrl || 'Mithun.jpeg';
    if (raw.startsWith('/') || raw.startsWith('http')) return raw;
    return `/${raw}`;
  }, [avatarUrl]);

  const initials = (name || 'Mithun Senthil S')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Animation frame loop using linear interpolation (lerp)
  const updateFrame = useCallback(() => {
    const c = current.current;
    const t = targets.current;

    // Smooth dampening factor (0.12 gives responsive yet buttery elasticity)
    const ease = 0.12;

    c.rotateX += (t.rotateX - c.rotateX) * ease;
    c.rotateY += (t.rotateY - c.rotateY) * ease;
    c.translateX += (t.translateX - c.translateX) * ease;
    c.translateY += (t.translateY - c.translateY) * ease;
    c.translateZ += (t.translateZ - c.translateZ) * ease;
    c.scale += (t.scale - c.scale) * ease;
    c.glareOpacity += (t.glareOpacity - c.glareOpacity) * ease;
    c.glareX += (t.glareX - c.glareX) * ease;
    c.glareY += (t.glareY - c.glareY) * ease;

    // Apply 3D transform directly to card DOM element
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) translate3d(${c.translateX.toFixed(2)}px, ${c.translateY.toFixed(2)}px, ${c.translateZ.toFixed(2)}px) rotateX(${c.rotateX.toFixed(2)}deg) rotateY(${c.rotateY.toFixed(2)}deg) scale3d(${c.scale.toFixed(3)}, ${c.scale.toFixed(3)}, 1)`;

      // Dynamic elevation shadow: shifts in opposite direction of tilt and expands on pop-front
      const elev = Math.max(0, c.translateZ / 48); // 0 at rest, 1 at peak pop
      const shadowX = (-c.translateX * 1.5).toFixed(1);
      const shadowY = (8 - c.translateY * 1.2 + elev * 24).toFixed(1);
      const shadowBlur = (18 + elev * 36).toFixed(1);
      const shadowSpread = (-3 + elev * 4).toFixed(1);

      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        const primaryAlpha = (0.45 + elev * 0.42).toFixed(2);
        const warmAlpha = (elev * 0.22).toFixed(2);
        cardRef.current.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, ${primaryAlpha}), 0 16px 36px -12px rgba(245, 166, 99, ${warmAlpha})`;
      } else {
        const primaryAlpha = (0.09 + elev * 0.24).toFixed(2);
        const warmAlpha = (elev * 0.22).toFixed(2);
        cardRef.current.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px rgba(1, 7, 54, ${primaryAlpha}), 0 16px 36px -12px rgba(219, 149, 88, ${warmAlpha})`;
      }
    }

    // Specular edge light that illuminates the edges closest to the cursor
    if (glareRef.current) {
      glareRef.current.style.opacity = `${c.glareOpacity.toFixed(3)}`;
      glareRef.current.style.background = `radial-gradient(circle 320px at ${c.glareX.toFixed(1)}px ${c.glareY.toFixed(1)}px, rgba(255, 255, 255, 0.22), transparent 75%)`;
    }

    // Ambient background depth glow blooms as card pops front
    if (glowRef.current) {
      const elev = Math.max(0, c.translateZ / 48);
      glowRef.current.style.opacity = `${(0.35 + elev * 0.45).toFixed(2)}`;
      glowRef.current.style.transform = `scale(${(1 + elev * 0.08).toFixed(3)}) translate3d(${(c.translateX * 0.4).toFixed(1)}px, ${(c.translateY * 0.4).toFixed(1)}px, 0)`;
    }

    // Continue loop if hovered or if settling towards resting values
    const delta =
      Math.abs(t.rotateX - c.rotateX) +
      Math.abs(t.rotateY - c.rotateY) +
      Math.abs(t.translateX - c.translateX) +
      Math.abs(t.translateY - c.translateY) +
      Math.abs(t.translateZ - c.translateZ) +
      Math.abs(t.scale - c.scale) +
      Math.abs(t.glareOpacity - c.glareOpacity);

    if (isHoveredRef.current || delta > 0.005) {
      rafIdRef.current = requestAnimationFrame(updateFrame);
    } else {
      // Snap to exact resting values and pause RAF loop to conserve CPU/battery
      c.rotateX = t.rotateX;
      c.rotateY = t.rotateY;
      c.translateX = t.translateX;
      c.translateY = t.translateY;
      c.translateZ = t.translateZ;
      c.scale = t.scale;
      c.glareOpacity = t.glareOpacity;
      rafIdRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(updateFrame);
    }
  }, [updateFrame]);

  // Handle pointer enter: Pop front & activate 3D space
  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isHoveredRef.current = true;
      targets.current.translateZ = 48; // Elevate 48px forward in 3D
      targets.current.scale = 1.055;   // Scale up slightly for dramatic pop
      targets.current.glareOpacity = 1;

      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        targets.current.glareX = x;
        targets.current.glareY = y;
        current.current.glareX = x;
        current.current.glareY = y;
      }
      startLoop();
    },
    [startLoop]
  );

  // Handle pointer move: Picture edges follow the cursor
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized coordinates: [-1, 1]
      const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
      const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

      // Check if user prefers reduced motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        const maxTilt = 14; // Maximum 3D tilt angle in degrees

        // 3D Perspective Tilt:
        // As cursor moves towards an edge, that edge lifts towards the cursor in 3D space:
        // - Top edge (normY < 0): rotateX is negative -> tilts top edge towards user/cursor.
        // - Bottom edge (normY > 0): rotateX is positive -> tilts bottom edge towards user/cursor.
        // - Right edge (normX > 0): rotateY is negative -> tilts right edge towards user/cursor.
        // - Left edge (normX < 0): rotateY is positive -> tilts left edge towards user/cursor.
        targets.current.rotateX = normY * maxTilt;
        targets.current.rotateY = -normX * maxTilt;

        // Magnetic 2D edge follow: Picture drifts subtly towards the cursor
        targets.current.translateX = normX * 8;
        targets.current.translateY = normY * 8;
      }

      // Specular sheen tracking cursor coordinates along picture edges
      targets.current.glareX = x;
      targets.current.glareY = y;
      targets.current.glareOpacity = 1;

      startLoop();
    },
    [startLoop]
  );

  // Handle pointer leave: Reset back to rest state with elastic spring return
  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    targets.current.rotateX = 0;
    targets.current.rotateY = 0;
    targets.current.translateX = 0;
    targets.current.translateY = 0;
    targets.current.translateZ = 0;
    targets.current.scale = 1;
    targets.current.glareOpacity = 0;

    startLoop();
  }, [startLoop]);

  // Clean up animation loop on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`.trim()}
    >
      {/* Ambient square depth glow: expands and blooms when picture pops front */}
      <div
        ref={glowRef}
        className={`pointer-events-none absolute -inset-4 sm:-inset-6 ${roundedClassName} bg-gradient-to-tr from-[#DB9558]/30 via-[#E5D3AF]/25 to-[#8B9A6E]/20 dark:from-[#F5A663]/30 dark:via-[#C72C48]/25 dark:to-[#64B5F6]/20 blur-2xl opacity-40 transition-opacity duration-300 will-change-transform will-change-opacity`}
        aria-hidden="true"
      />

      {/* Interactive 3D Square Picture Card: Clean edge-to-edge presentation without outlines */}
      <div
        ref={cardRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`relative z-10 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] aspect-square ${roundedClassName} overflow-hidden cursor-pointer`}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          willChange: 'transform, box-shadow',
          boxShadow: '0 10px 28px -6px rgba(1, 7, 54, 0.1), 0 4px 12px -2px rgba(1, 7, 54, 0.05)',
        }}
      >
        {/* Edge-to-edge Square Image Container */}
        <div className="relative w-full h-full overflow-hidden bg-[#F5EFE1] dark:bg-[#0B132B]">
          {!imageError ? (
            <img
              src={resolvedAvatarUrl}
              alt={name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center filter contrast-[1.03] select-none pointer-events-none"
              loading="eager"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#E5D3AF]/30 dark:bg-[#111C40] p-6 text-center select-none">
              <div
                className={`w-20 h-20 ${roundedClassName} bg-[#010736] dark:bg-[#F5EFE1] flex items-center justify-center text-3xl font-display font-bold text-[#F5EFE1] dark:text-[#010736] mb-2 shadow-sm`}
              >
                {initials}
              </div>
              <p className="font-mono text-xs text-[#010736] dark:text-[#F5EFE1] tracking-wider uppercase font-semibold">
                {name}
              </p>
            </div>
          )}
        </div>

        {/* Dynamic Cursor-Following Specular Sheen: Highlights edges as cursor tracks them */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200 will-change-opacity overflow-hidden"
          style={{
            opacity: 0,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

PortraitCard.displayName = 'PortraitCard';
