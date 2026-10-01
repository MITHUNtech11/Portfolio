import React from 'react';

export type BadgeVariant = 'gold' | 'crimson' | 'obsidian' | 'emerald';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string; dotPulse: string }> = {
  gold: {
    container:
      'border-[#d4af37]/35 bg-[#d4af37]/10 text-[#f5cb78] shadow-[0_0_12px_rgba(212,175,55,0.12)] hover:border-[#d4af37]/60 hover:bg-[#d4af37]/15',
    dot: 'bg-[#d4af37]',
    dotPulse: 'bg-[#f5cb78]',
  },
  crimson: {
    container:
      'border-[#e74c3c]/35 bg-[#c0392b]/15 text-[#e74c3c] shadow-[0_0_12px_rgba(231,76,60,0.15)] hover:border-[#e74c3c]/60 hover:bg-[#c0392b]/20',
    dot: 'bg-[#e74c3c]',
    dotPulse: 'bg-[#ff6b6b]',
  },
  obsidian: {
    container:
      'border-white/10 bg-[#170c08] text-[#d8c8b8] shadow-sm hover:border-white/20 hover:text-[#fbf5ee]',
    dot: 'bg-[#9e8779]',
    dotPulse: 'bg-[#d8c8b8]',
  },
  emerald: {
    container:
      'border-emerald-500/35 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)] hover:border-emerald-500/60 hover:bg-emerald-500/15',
    dot: 'bg-emerald-400',
    dotPulse: 'bg-emerald-300',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
  md: 'text-xs px-3 py-1 gap-1.5',
  lg: 'text-sm px-3.5 py-1.5 gap-2',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  size = 'sm',
  dot = false,
  pulse = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  const styles = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center font-mono font-medium tracking-wide rounded-full border transition-all duration-200 select-none ${styles.container} ${sizeStyles[size]} ${className}`.trim()}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2 shrink-0">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${styles.dotPulse}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${styles.dot}`} />
        </span>
      )}
      {icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
