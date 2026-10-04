import React from 'react';

export type BadgeVariant =
  | 'sage'
  | 'burgundy'
  | 'sand'
  | 'terracotta'
  | 'navy'
  | 'gold'
  | 'crimson'
  | 'obsidian'
  | 'emerald';

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
  sage: {
    container: 'border-[#8B9A6E]/40 bg-[#8B9A6E]/15 text-[#4D5A34] dark:border-[#A2B784]/30 dark:bg-[#A2B784]/15 dark:text-[#A2B784]',
    dot: 'bg-[#8B9A6E] dark:bg-[#A2B784]',
    dotPulse: 'bg-[#8B9A6E]/50 dark:bg-[#A2B784]/50',
  },
  burgundy: {
    container: 'border-[#800020]/30 bg-[#800020]/10 text-[#800020] dark:border-[#C72C48]/30 dark:bg-[#C72C48]/15 dark:text-[#F5A663]',
    dot: 'bg-[#800020] dark:bg-[#C72C48]',
    dotPulse: 'bg-[#800020]/50 dark:bg-[#C72C48]/50',
  },
  sand: {
    container: 'border-[#d8c397] bg-[#E5D3AF]/60 text-[#010736] dark:border-[#E5D3AF]/20 dark:bg-[#111C40] dark:text-[#F5EFE1]',
    dot: 'bg-[#DB9558] dark:bg-[#F5A663]',
    dotPulse: 'bg-[#DB9558]/50 dark:bg-[#F5A663]/50',
  },
  terracotta: {
    container: 'border-[#DB9558]/40 bg-[#DB9558]/15 text-[#B86F30] dark:border-[#F5A663]/30 dark:bg-[#F5A663]/15 dark:text-[#F5A663]',
    dot: 'bg-[#DB9558] dark:bg-[#F5A663]',
    dotPulse: 'bg-[#DB9558]/50 dark:bg-[#F5A663]/50',
  },
  navy: {
    container: 'border-[#010736]/20 bg-[#010736]/8 text-[#010736] dark:border-[#E5D3AF]/20 dark:bg-[#0B132B] dark:text-[#F5EFE1]',
    dot: 'bg-[#010736] dark:bg-[#F5A663]',
    dotPulse: 'bg-[#010736]/50 dark:bg-[#F5A663]/50',
  },
  // Compatibility aliases
  gold: {
    container: 'border-[#DB9558]/40 bg-[#DB9558]/15 text-[#B86F30] dark:border-[#F5A663]/30 dark:bg-[#F5A663]/15 dark:text-[#F5A663]',
    dot: 'bg-[#DB9558] dark:bg-[#F5A663]',
    dotPulse: 'bg-[#DB9558]/50 dark:bg-[#F5A663]/50',
  },
  crimson: {
    container: 'border-[#800020]/30 bg-[#800020]/10 text-[#800020] dark:border-[#C72C48]/30 dark:bg-[#C72C48]/15 dark:text-[#F5A663]',
    dot: 'bg-[#800020] dark:bg-[#C72C48]',
    dotPulse: 'bg-[#800020]/50 dark:bg-[#C72C48]/50',
  },
  obsidian: {
    container: 'border-[#010736]/20 bg-[#010736]/8 text-[#010736] dark:border-[#E5D3AF]/20 dark:bg-[#0B132B] dark:text-[#F5EFE1]',
    dot: 'bg-[#010736] dark:bg-[#F5A663]',
    dotPulse: 'bg-[#010736]/50 dark:bg-[#F5A663]/50',
  },
  emerald: {
    container: 'border-[#8B9A6E]/40 bg-[#8B9A6E]/15 text-[#4D5A34] dark:border-[#A2B784]/30 dark:bg-[#A2B784]/15 dark:text-[#A2B784]',
    dot: 'bg-[#8B9A6E] dark:bg-[#A2B784]',
    dotPulse: 'bg-[#8B9A6E]/50 dark:bg-[#A2B784]/50',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
  md: 'text-xs px-3 py-1 gap-1.5',
  lg: 'text-sm px-3.5 py-1.5 gap-2',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'sand',
  size = 'sm',
  dot = false,
  pulse = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  const styles = variantStyles[variant] || variantStyles.sand;

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

Badge.displayName = 'Badge';
