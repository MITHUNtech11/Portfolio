import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[#c0392b] via-[#d63031] to-[#c0392b] text-[#fbf5ee] border border-[#e74c3c]/50 shadow-[0_4px_20px_rgba(231,76,60,0.35)] hover:shadow-[0_4px_28px_rgba(231,76,60,0.6)] hover:border-[#e74c3c]',
  gold:
    'bg-gradient-to-r from-[#d4af37] via-[#f5cb78] to-[#d4af37] text-[#0d0604] font-semibold border border-[#f5cb78]/60 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_28px_rgba(245,203,120,0.55)] hover:brightness-105',
  outline:
    'border border-[#d4af37]/35 text-[#fbf5ee] bg-[#170c08]/70 backdrop-blur-sm hover:border-[#d4af37] hover:bg-[#d4af37]/10 hover:text-[#f5cb78] hover:shadow-[0_0_18px_rgba(212,175,55,0.2)]',
  ghost:
    'bg-transparent text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.06] active:bg-white/[0.1] border border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-4 py-2 rounded-xl gap-2',
  lg: 'text-base px-6 py-3 rounded-xl gap-2.5 font-medium',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  icon,
  isLoading = false,
  href,
  target,
  rel,
  download,
  children,
  className = '',
  disabled,
  ref,
  ...props
}) => {
  const effectiveLeftIcon = leftIcon || icon;
  const baseClasses =
    'inline-flex items-center justify-center font-display font-medium select-none cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  const content = (
    <>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {!isLoading && effectiveLeftIcon && (
        <span className="inline-flex shrink-0 items-center justify-center">{effectiveLeftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0 items-center justify-center">{rightIcon}</span>
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || target === '_blank';
    const effectiveRel = rel || (isExternal ? 'noopener noreferrer' : undefined);
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={effectiveRel}
        download={download as any}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={combinedClasses}
        onClick={props.onClick as any}
        aria-label={props['aria-label']}
        title={props.title}
        id={props.id}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {content}
    </motion.button>
  );
};

Button.displayName = 'Button';
