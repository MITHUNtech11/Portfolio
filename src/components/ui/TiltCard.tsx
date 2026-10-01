import React, { useRef, useState, useCallback } from 'react';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
  glareColor?: string;
  glareSize?: number;
  hoverScale?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  glare = true,
  glareColor = 'rgba(212, 175, 55, 0.12)',
  glareSize = 350,
  hoverScale = 1.015,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Inverted Y so cursor moving up tilts the top forward
      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTilt({
        rotateX: Number(rotateX.toFixed(2)),
        rotateY: Number(rotateY.toFixed(2)),
      });

      if (glare) {
        setGlarePos({ x, y, opacity: 1 });
      }
    },
    [maxTilt, glare]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [glare]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative will-change-transform ${className}`.trim()}
      style={{
        transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
          isHovered && hoverScale ? `scale3d(${hoverScale}, ${hoverScale}, 1)` : 'scale3d(1, 1, 1)'
        }`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.45s ease-out',
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {/* Glare / Spotlight Reflection Overlay */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300 will-change-opacity overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle ${glareSize}px at ${glarePos.x}px ${glarePos.y}px, ${glareColor}, transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {children}
    </div>
  );
};
