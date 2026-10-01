import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { Badge, BadgeVariant } from '../ui/Badge';
import { profileData } from '../../data/profile';

export interface FloatingBadgeConfig {
  text: string;
  icon?: React.ReactNode;
  variant?: BadgeVariant;
}

export interface PortraitCardProps {
  avatarUrl?: string;
  name?: string;
  className?: string;
  topBadge?: FloatingBadgeConfig;
  bottomBadge?: FloatingBadgeConfig;
  availableBadgeText?: string;
  showAvailability?: boolean;
}

export const PortraitCard: React.FC<PortraitCardProps> = ({
  avatarUrl = profileData.avatarUrl,
  name = profileData.name,
  className = '',
  topBadge = {
    text: 'Oracle Java SE 11 Certified',
    variant: 'gold',
    icon: <Award className="w-3.5 h-3.5 text-[#f5cb78]" />,
  },
  bottomBadge = {
    text: 'Saveetha CGPA 8.46',
    variant: 'crimson',
    icon: <GraduationCap className="w-3.5 h-3.5 text-[#e74c3c]" />,
  },
  availableBadgeText = 'Available for Roles (2027)',
  showAvailability = true,
}) => {
  const [imageError, setImageError] = React.useState(false);

  // Normalize avatar URL for public directory assets
  const resolvedAvatarUrl = React.useMemo(() => {
    const raw = avatarUrl || profileData.avatarUrl || 'Mithun.jpeg';
    if (raw.startsWith('/') || raw.startsWith('http')) return raw;
    return `/${raw}`;
  }, [avatarUrl]);

  // Fallback icons if caller passes topBadge/bottomBadge without explicit icon
  const topIcon = topBadge?.icon ?? (
    topBadge?.text?.toLowerCase().includes('cert') ||
    topBadge?.text?.toLowerCase().includes('oracle') ||
    topBadge?.text?.toLowerCase().includes('java')
      ? <Award className="w-3.5 h-3.5 text-[#f5cb78]" />
      : undefined
  );

  const bottomIcon = bottomBadge?.icon ?? (
    bottomBadge?.text?.toLowerCase().includes('cgpa') ||
    bottomBadge?.text?.toLowerCase().includes('saveetha') ||
    bottomBadge?.text?.toLowerCase().includes('grade') ||
    bottomBadge?.text?.toLowerCase().includes('gpa')
      ? <GraduationCap className="w-3.5 h-3.5 text-[#e74c3c]" />
      : undefined
  );

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
      {/* Ambient gold/crimson rim lighting backdrop glow */}
      <div
        className="pointer-events-none absolute -inset-6 sm:-inset-8 rounded-full bg-gradient-to-tr from-[#d4af37]/25 via-[#c0392b]/20 to-[#f5cb78]/25 blur-3xl opacity-75 animate-pulse"
        aria-hidden="true"
      />

      <TiltCard
        maxTilt={8}
        perspective={1000}
        glare={true}
        glareColor="rgba(212, 175, 55, 0.16)"
        glareSize={380}
        hoverScale={1.02}
        className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]"
      >
        <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-[#d4af37]/50 via-[#c0392b]/35 to-[#d4af37]/25 shadow-[0_16px_50px_rgba(0,0,0,0.6)]">
          {/* Inner Image Container */}
          <div className="relative overflow-hidden rounded-[22px] bg-[#170c08] aspect-[4/5] sm:aspect-square w-full">
            {!imageError ? (
              <img
                src={resolvedAvatarUrl}
                alt={name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#170c08] p-6 text-center border border-[#d4af37]/20">
                <div className="w-20 h-20 rounded-full bg-[#23120d] border border-[#d4af37]/50 flex items-center justify-center text-3xl font-display font-bold text-[#f5cb78] mb-3 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                  {initials}
                </div>
                <p className="font-mono text-xs text-[#d8c8b8] tracking-wider uppercase font-semibold">
                  {name}
                </p>
              </div>
            )}

            {/* Cinematic dark gradient vignette overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0604]/90 via-[#0d0604]/20 to-transparent"
              aria-hidden="true"
            />

            {/* Corner status beacon */}
            {showAvailability && (
              <div className="absolute top-3 left-3 z-20">
                <Badge
                  variant="emerald"
                  size="sm"
                  dot
                  pulse
                  className="backdrop-blur-md bg-[#0d0604]/85 border-emerald-500/40 shadow-lg text-[11px]"
                >
                  {availableBadgeText}
                </Badge>
              </div>
            )}
          </div>

          {/* Floating Badge 1 (Top-Right): Oracle Java SE 11 Certified */}
          {topBadge && (
            <motion.div
              initial={{ opacity: 0, y: -10, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -top-3.5 -right-2 sm:-right-4 z-20 shadow-xl shadow-black/70"
            >
              <Badge
                variant={topBadge.variant || 'gold'}
                size="md"
                icon={topIcon}
                className="backdrop-blur-md bg-[#170c08]/95 border-[#d4af37]/50 py-1.5 px-3.5 font-sans font-semibold tracking-normal shadow-md"
              >
                {topBadge.text}
              </Badge>
            </motion.div>
          )}

          {/* Floating Badge 2 (Bottom-Left): Saveetha CGPA 8.46 */}
          {bottomBadge && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-3.5 -left-2 sm:-left-4 z-20 shadow-xl shadow-black/70"
            >
              <Badge
                variant={bottomBadge.variant || 'crimson'}
                size="md"
                icon={bottomIcon}
                className="backdrop-blur-md bg-[#170c08]/95 border-[#e74c3c]/50 py-1.5 px-3.5 font-sans font-semibold tracking-normal shadow-md"
              >
                {bottomBadge.text}
              </Badge>
            </motion.div>
          )}
        </div>
      </TiltCard>
    </div>
  );
};

PortraitCard.displayName = 'PortraitCard';
