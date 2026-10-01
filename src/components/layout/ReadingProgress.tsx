import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export interface ReadingProgressProps {
  className?: string;
  height?: number | string;
}

/**
 * ReadingProgress
 *
 * Framer Motion scaleX scroll progress bar anchored to the top of the viewport.
 * Uses a warm gold gradient and spring physics for smooth tracking.
 */
export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  className = '',
  height = 3,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
      style={{ height: heightStyle }}
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className={`h-full w-full bg-gradient-to-r from-[#c0392b] via-[#d4af37] to-[#f5cb78] shadow-[0_0_12px_rgba(212,175,55,0.7),0_0_4px_rgba(245,203,120,0.9)] will-change-transform ${className}`.trim()}
      />
    </div>
  );
};

ReadingProgress.displayName = 'ReadingProgress';
