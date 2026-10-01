import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { Briefcase, Server, Award, GraduationCap } from 'lucide-react';
import { profileData } from '../../data/profile';
import { RecruiterStat } from '../../types';

export interface StatCounterProps {
  stats?: RecruiterStat[];
  className?: string;
}

interface AnimatedValueProps {
  numericTarget?: number;
  fallbackValue: string;
  prefix?: string;
  suffix?: string;
}

const getStatIcon = (label: string): React.ReactNode => {
  const normalized = label.toLowerCase();
  if (normalized.includes('internship') || normalized.includes('experience')) {
    return <Briefcase className="w-5 h-5" />;
  }
  if (normalized.includes('production') || normalized.includes('system') || normalized.includes('backend')) {
    return <Server className="w-5 h-5" />;
  }
  if (normalized.includes('cert') || normalized.includes('award') || normalized.includes('license')) {
    return <Award className="w-5 h-5" />;
  }
  if (
    normalized.includes('cgpa') ||
    normalized.includes('saveetha') ||
    normalized.includes('education') ||
    normalized.includes('gpa')
  ) {
    return <GraduationCap className="w-5 h-5" />;
  }
  return <Award className="w-5 h-5" />;
};

const AnimatedValue: React.FC<AnimatedValueProps> = ({
  numericTarget,
  fallbackValue,
  prefix = '',
  suffix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const isFloat = numericTarget !== undefined && numericTarget % 1 !== 0;

  // Determine decimal precision from fallback string or numeric value
  const decimalPlaces = React.useMemo(() => {
    if (numericTarget === undefined) return 0;
    const fallbackMatch = fallbackValue.match(/\.(\d+)/);
    if (fallbackMatch) return fallbackMatch[1].length;
    const targetMatch = numericTarget.toString().match(/\.(\d+)/);
    return targetMatch ? targetMatch[1].length : 2;
  }, [numericTarget, fallbackValue]);

  // In SSR / static rendering environments, initialize directly to numericTarget
  const [displayValue, setDisplayValue] = useState<number>(() => {
    if (typeof window === 'undefined' && numericTarget !== undefined) {
      return numericTarget;
    }
    return 0;
  });

  useEffect(() => {
    if (numericTarget === undefined) return;

    // Direct update if reduced motion is requested or IntersectionObserver is unsupported
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (
      prefersReducedMotion ||
      (typeof window !== 'undefined' && !('IntersectionObserver' in window))
    ) {
      setDisplayValue(numericTarget);
      return;
    }

    if (!isInView) return;

    const controls = animate(0, numericTarget, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, numericTarget]);

  if (numericTarget === undefined) {
    return (
      <span ref={ref}>
        {prefix}
        {fallbackValue}
        {suffix}
      </span>
    );
  }

  const formatted = isFloat
    ? displayValue.toFixed(decimalPlaces)
    : Math.round(displayValue).toString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export const StatCounter: React.FC<StatCounterProps> = ({
  stats = profileData.recruiterStats,
  className = '',
}) => {
  return (
    <div
      className={`w-full grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-6 ${className}`.trim()}
    >
      {stats.map((stat, idx) => {
        const icon = getStatIcon(stat.label);

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-2xl bg-[#170c08]/85 backdrop-blur-md p-4 sm:p-5 lg:p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/50 shadow-[0_8px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_12px_36px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Ambient radial highlight on hover */}
            <div
              className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-[#d4af37]/10 blur-2xl transition-all duration-500 group-hover:bg-[#d4af37]/25 group-hover:scale-125"
              aria-hidden="true"
            />

            {/* Top row: Icon and decorative dot */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center justify-center p-2 rounded-xl bg-[#23120d] text-[#f5cb78] border border-[#d4af37]/25 group-hover:border-[#d4af37]/60 group-hover:text-[#fbf5ee] group-hover:bg-[#d4af37]/20 transition-all duration-300">
                {icon}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#d4af37]/40 group-hover:bg-[#f5cb78] group-hover:scale-125 transition-all duration-300"
                aria-hidden="true"
              />
            </div>

            {/* Bottom row: Counter number & label */}
            <div className="mt-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#fbf5ee] group-hover:text-[#f5cb78] transition-colors">
                <AnimatedValue
                  numericTarget={stat.numericTarget}
                  fallbackValue={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#9e8779] group-hover:text-[#d8c8b8] transition-colors mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

StatCounter.displayName = 'StatCounter';
