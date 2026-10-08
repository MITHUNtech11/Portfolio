import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type BlurHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';

export interface BlurHeadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: BlurHeadingTag;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blur?: number;
  yOffset?: number;
  once?: boolean;
}

/**
 * BlurHeading
 *
 * Cinematic headline reveal component that animates from a heavy Gaussian blur
 * (default 100px) down to 0px while fading and sliding up into view.
 */
export const BlurHeading: React.FC<BlurHeadingProps> = ({
  as = 'h2',
  children,
  className = '',
  delay = 0,
  duration = 0.85,
  blur = 100,
  yOffset = 24,
  once = true,
  style,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = (motion[as] as typeof motion.h2) || motion.h2;

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur}px)`,
      };

  const whileInView = shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      };

  return (
    <Component
      initial={initial}
      whileInView={whileInView}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // outExpo
      }}
      className={className}
      style={{
        ...style,
        willChange: shouldReduceMotion ? 'opacity' : 'transform, opacity, filter',
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

BlurHeading.displayName = 'BlurHeading';
