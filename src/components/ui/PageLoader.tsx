import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

export interface PageLoaderProps {
  /**
   * Called when the curtain animation starts lifting and the page begins to reveal.
   */
  onStartReveal?: () => void;
  /**
   * Called when the curtain has completely finished exiting and the loader can unmount.
   */
  onComplete: () => void;
  /**
   * Optional duration in milliseconds for the 0-100% loading progress counter.
   * Defaults to 1200ms.
   */
  durationMs?: number;
}

const PHASES = [
  { threshold: 0, text: 'Initializing runtime environments...' },
  { threshold: 25, text: 'Loading distributed systems & graph engines...' },
  { threshold: 55, text: 'Compiling AI pipelines & microservices...' },
  { threshold: 85, text: 'Calibrating Three.js particle dynamics...' },
  { threshold: 100, text: 'System operational. Welcome to portfolio.' },
];

/**
 * PageLoader
 *
 * Cinematic high-tech editorial preloader with curtain reveal.
 * Displays real-time 0-100% counter, terminal status checks, monogram emblem,
 * and slides open with a smooth cubic-bezier curtain wipe upon completion.
 */
export const PageLoader: React.FC<PageLoaderProps> = ({
  onStartReveal,
  onComplete,
  durationMs = 1200,
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(PHASES[0].text);
  const hasFinishedRef = useRef(false);

  // Complete and trigger reveal
  const triggerReveal = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    onStartReveal?.();
  }, [onStartReveal]);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onStartReveal?.();
      onComplete();
      return;
    }
  }, [onStartReveal, onComplete]);

  // Body scroll lock while preloader is active
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard / Click quick-skip handler
  useEffect(() => {
    const handleKeyDown = () => {
      triggerReveal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerReveal]);

  // Progress counter timer
  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgress(rawProgress);

      // Update status phase
      const currentPhase = [...PHASES]
        .reverse()
        .find((phase) => rawProgress >= phase.threshold);
      if (currentPhase) {
        setStatusMessage(currentPhase.text);
      }

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Pause briefly at 100% for satisfying visual feedback before curtain wipe
        setTimeout(() => {
          triggerReveal();
        }, 180);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [durationMs, triggerReveal]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        onComplete();
      }}
    >
      {!isExiting && (
        <motion.div
          key="curtain-loader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Cinematic cubic-bezier ease
            },
          }}
          onClick={triggerReveal}
          className="fixed inset-0 z-[100] flex flex-col justify-between items-center bg-[#050B20] text-[#F5EFE1] p-6 sm:p-10 select-none overflow-hidden cursor-pointer border-b-2 border-[#DB9558]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          aria-label="Loading Mithun Senthil Portfolio"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle warm ambient backdrop glow */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(128,0,32,0.18),rgba(5,11,32,0.98))]"
            aria-hidden="true"
          />

          {/* Decorative subtle grid lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#E5D3AF_1px,transparent_1px),linear-gradient(to_bottom,#E5D3AF_1px,transparent_1px)] bg-[size:4rem_4rem]"
            aria-hidden="true"
          />

          {/* ── Top Header Row ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-5xl flex items-center justify-between text-xs font-mono text-[#8C9BB5]"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B9A6E] animate-pulse" />
              <span className="tracking-widest uppercase font-semibold text-[#E5D3AF]">
                PORTFOLIO_CORE // v2.6
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 tracking-wider uppercase text-[#8C9BB5]">
              <span>CHENNAI, IN</span>
              <span className="text-[#DB9558]">/</span>
              <span>SAVEETHA UNIV</span>
            </div>
          </motion.div>

          {/* ── Centerpiece: Monogram & Dynamic Progress ── */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-md w-full px-4 text-center my-auto">
            {/* Monogram Badge with rotating orbital accent */}
            <div className="relative mb-6">
              {/* Rotating outer orbital ring */}
              <div
                className="absolute -inset-3.5 rounded-full border border-dashed border-[#DB9558]/40 animate-spin [animation-duration:14s] pointer-events-none"
                aria-hidden="true"
              />
              {/* Inner glowing badge */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#111C40] via-[#0B132B] to-[#050B20] border border-[#E5D3AF]/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#F5EFE1] tracking-tight">
                  M
                </span>
                <span className="absolute bottom-1.5 right-2 w-2 h-2 rounded-full bg-[#DB9558]" />
              </div>
            </div>

            {/* Candidate Title */}
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#F5EFE1] tracking-tight mb-1">
              Mithun Senthil S
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#DB9558] mb-8">
              Backend &amp; Systems Engineer <span className="text-[#8C9BB5]">//</span> Applied AI
            </p>

            {/* Large Real-time Numerical Progress */}
            <div className="flex items-baseline justify-center gap-1 font-mono mb-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#F5EFE1] tabular-nums tracking-tight">
                {progress}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#DB9558]">%</span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/10 p-[1px] overflow-hidden mb-4 border border-[#E5D3AF]/15">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#800020] via-[#DB9558] to-[#E5D3AF]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Phase Status Subtext */}
            <div className="flex items-center justify-center gap-2 min-h-[24px]">
              {progress >= 100 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8B9A6E] shrink-0" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#DB9558] animate-spin [animation-duration:3s] shrink-0" />
              )}
              <span className="font-mono text-xs text-[#C5CEE0] tracking-wide truncate max-w-[320px]">
                {statusMessage}
              </span>
            </div>
          </div>

          {/* ── Bottom Command Line & Skip Prompt ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#8C9BB5]"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#8B9A6E]" />
              <span className="text-[#8B9A6E]">sys@mithun:~$</span>
              <span className="text-[#C5CEE0]">launch --mode=production</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerReveal();
              }}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5D3AF]/20 hover:border-[#DB9558]/50 bg-white/5 hover:bg-white/10 text-[#8C9BB5] hover:text-[#F5EFE1] transition-all cursor-pointer text-[11px]"
              aria-label="Skip page introduction"
            >
              <span>Click or Press Any Key to Skip</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#DB9558]" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PageLoader.displayName = 'PageLoader';
