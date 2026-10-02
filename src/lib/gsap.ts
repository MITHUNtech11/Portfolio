import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

/**
 * Smoothly scroll to a target element or selector using GSAP ScrollToPlugin
 */
export function smoothScrollTo(target: string | HTMLElement, offsetY = 80) {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      el?.scrollIntoView();
    } else {
      target.scrollIntoView();
    }
    return;
  }

  gsap.to(window, {
    scrollTo: {
      y: target,
      offsetY,
    },
    duration: 1.1,
    ease: 'power3.inOut',
  });
}

export { gsap, ScrollTrigger, ScrollToPlugin };
