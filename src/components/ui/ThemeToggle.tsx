import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/theme';

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'icon' | 'labeled';
  className?: string;
}

/**
 * ThemeToggle
 *
 * Micro-animated theme switch button using Motion spring physics.
 * Displays a rotating Moon icon in light mode and radiant Sun icon in dark mode.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
  onClick,
  ...rest
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme();
    onClick?.(e);
  };

  const ariaLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  if (variant === 'labeled') {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={handleClick}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium border border-[#E5D3AF] dark:border-[#E5D3AF]/15 bg-white/60 dark:bg-[#0B132B]/80 text-[#010736] dark:text-[#F5EFE1] hover:bg-[#E5D3AF]/40 dark:hover:bg-[#111C40] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/40 dark:focus-visible:ring-[#F5A663]/40 ${className}`.trim()}
        {...(rest as any)}
      >
        <span className="flex items-center gap-2.5 font-display font-medium">
          <span>Theme Mode</span>
          <span className="text-xs font-mono text-[#DB9558] dark:text-[#F5A663] uppercase tracking-wider">
            [{theme}]
          </span>
        </span>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280] dark:text-[#8C9BB5]">
            {isDark ? 'Light' : 'Dark'}
          </span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E5D3AF]/40 dark:bg-[#111C40] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 text-[#010736] dark:text-[#F5A663]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 25 }}
              >
                {isDark ? <Sun className="w-4 h-4 text-[#F5A663]" /> : <Moon className="w-4 h-4 text-[#010736]" />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={handleClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/40 dark:focus-visible:ring-[#F5A663]/40 ${
        isDark
          ? 'border-[#E5D3AF]/20 bg-[#0B132B]/90 text-[#F5A663] hover:bg-[#111C40] hover:border-[#F5A663]/40 shadow-xs'
          : 'border-[#E5D3AF] bg-white/80 text-[#010736] hover:bg-[#E5D3AF]/40 hover:border-[#DB9558]/50 shadow-xs'
      } ${className}`.trim()}
      {...(rest as any)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 25 }}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#F5A663]" />
          ) : (
            <Moon className="w-4 h-4 text-[#010736]" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

ThemeToggle.displayName = 'ThemeToggle';
