import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from '../ui/TiltCard';
import { profileData } from '../../data/profile';

export interface PortraitCardProps {
  avatarUrl?: string;
  name?: string;
  className?: string;
}

/**
 * PortraitCard
 *
 * Minimalist editorial portrait featuring a circular profile presentation
 * framed with a bespoke dual-ring in Terracotta (#DB9558) and Sand (#E5D3AF).
 * Completely clean without distracting status badges or overlays.
 */
export const PortraitCard: React.FC<PortraitCardProps> = ({
  avatarUrl = profileData.avatarUrl,
  name = profileData.name,
  className = '',
}) => {
  const [imageError, setImageError] = React.useState(false);

  const resolvedAvatarUrl = React.useMemo(() => {
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

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`.trim()}
    >
      {/* Subtle warm ambient halo */}
      <div
        className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#DB9558]/20 via-[#E5D3AF]/30 to-[#8B9A6E]/15 blur-2xl opacity-60"
        aria-hidden="true"
      />

      <TiltCard
        maxTilt={7}
        perspective={1000}
        glare={true}
        glareColor="rgba(229, 211, 175, 0.25)"
        glareSize={320}
        hoverScale={1.03}
        className="relative z-10 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]"
      >
        <div className="relative p-2.5 rounded-full bg-gradient-to-tr from-[#DB9558] via-[#E5D3AF] to-[#DB9558] shadow-[0_12px_36px_rgba(1,7,54,0.08)]">
          {/* Inner Circular Frame */}
          <div className="relative overflow-hidden rounded-full aspect-square w-full bg-[#E5D3AF]/30 p-1">
            <div className="relative overflow-hidden rounded-full w-full h-full bg-[#F5EFE1]">
              {!imageError ? (
                <img
                  src={resolvedAvatarUrl}
                  alt={name}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 ease-out hover:scale-105"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#E5D3AF]/30 p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#010736] flex items-center justify-center text-3xl font-display font-bold text-[#F5EFE1] mb-2 shadow-sm">
                    {initials}
                  </div>
                  <p className="font-mono text-xs text-[#010736] tracking-wider uppercase font-semibold">
                    {name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

PortraitCard.displayName = 'PortraitCard';
