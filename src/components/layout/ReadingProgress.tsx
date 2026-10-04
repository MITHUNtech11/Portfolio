import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export interface ReadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  height?: number | string;
}

/**
 * ReadingProgress
 *
 * Framer Motion scaleX scroll progress bar anchored to the top of the viewport.
 * Uses a Burgundy to Terracotta gradient for smooth editorial tracking.
 */
export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  className = '',
  height = 3,
  ...rest
}) => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleX = shouldReduceMotion ? scrollYProgress : smoothScaleX;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
      style={{ height: heightStyle }}
      aria-hidden="true"
      {...rest}
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className={`h-full w-full bg-gradient-to-r from-[#800020] via-[#DB9558] to-[#8B9A6E] dark:from-[#C72C48] dark:via-[#F5A663] dark:to-[#A2B784] shadow-[0_1px_6px_rgba(128,0,32,0.3)] dark:shadow-[0_1px_8px_rgba(245,166,99,0.3)] will-change-transform ${className}`.trim()}
      />
    </div>
  );
};

ReadingProgress.displayName = 'ReadingProgress';
