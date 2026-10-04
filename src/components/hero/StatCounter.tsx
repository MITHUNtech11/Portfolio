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
    return <Briefcase className="w-4 h-4" />;
  }
  if (normalized.includes('production') || normalized.includes('system') || normalized.includes('backend')) {
    return <Server className="w-4 h-4" />;
  }
  if (normalized.includes('cert') || normalized.includes('award') || normalized.includes('license')) {
    return <Award className="w-4 h-4" />;
  }
  if (
    normalized.includes('cgpa') ||
    normalized.includes('saveetha') ||
    normalized.includes('education') ||
    normalized.includes('gpa')
  ) {
    return <GraduationCap className="w-4 h-4" />;
  }
  return <Award className="w-4 h-4" />;
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

  const decimalPlaces = React.useMemo(() => {
    if (numericTarget === undefined) return 0;
    const fallbackMatch = fallbackValue.match(/\.(\d+)/);
    if (fallbackMatch) return fallbackMatch[1].length;
    const targetMatch = numericTarget.toString().match(/\.(\d+)/);
    return targetMatch ? targetMatch[1].length : 2;
  }, [numericTarget, fallbackValue]);

  const [displayValue, setDisplayValue] = useState<number>(() => {
    if (typeof window === 'undefined' && numericTarget !== undefined) {
      return numericTarget;
    }
    return 0;
  });

  useEffect(() => {
    if (numericTarget === undefined) return;

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
      className={`w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 ${className}`.trim()}
    >
      {stats.map((stat, idx) => {
        const icon = getStatIcon(stat.label);

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group relative rounded-2xl bg-white/70 dark:bg-[#0B132B]/80 backdrop-blur-sm p-5 sm:p-6 border border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-[0_4px_16px_rgba(1,7,54,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-[#DB9558] dark:hover:border-[#F5A663]/50 hover:shadow-[0_8px_24px_rgba(219,149,88,0.1)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top row: Icon and decorative dot */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center justify-center p-2 rounded-xl bg-[#E5D3AF]/40 dark:bg-[#111C40] text-[#800020] dark:text-[#F5A663] group-hover:bg-[#800020] dark:group-hover:bg-[#C72C48] group-hover:text-white transition-all duration-300">
                {icon}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#E5D3AF] dark:bg-[#E5D3AF]/20 group-hover:bg-[#DB9558] dark:group-hover:bg-[#F5A663] transition-all duration-300"
                aria-hidden="true"
              />
            </div>

            {/* Bottom row: Counter number & label */}
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#800020] dark:text-[#F5A663]">
                <AnimatedValue
                  numericTarget={stat.numericTarget}
                  fallbackValue={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#2C3352]/75 dark:text-[#C5CEE0]/80 mt-1 font-semibold">
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
