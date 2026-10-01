import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download, Terminal, ChevronRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { Button } from '../ui/Button';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  activeSection?: string;
  resumeUrl?: string;
}

/**
 * Navbar
 *
 * Sticky frosted-glass header with active section tracking, live radar status beacon,
 * desktop navigation links, resume CTA, and a responsive mobile drawer.
 */
export const Navbar: React.FC<NavbarProps> = ({
  className = '',
  activeSection: controlledActiveSection,
  resumeUrl = '/Mithun_Senthil_Resume.docx',
  ...rest
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState<string>('#about');
  const [isScrolled, setIsScrolled] = useState(false);

  const currentActiveSection = controlledActiveSection ?? internalActiveSection;

  // Track scroll position for sticky background styling and bottom-of-page contact activation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      // If user reaches near the bottom of the page, activate the last section (#contact)
      if (!controlledActiveSection && typeof document !== 'undefined') {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageBottom = document.documentElement.scrollHeight - 60;
        if (scrollPosition >= pageBottom) {
          setInternalActiveSection('#contact');
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlledActiveSection]);

  // Listen to hash changes if present
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.hash) {
      setInternalActiveSection(window.location.hash);
    }

    const handleHashChange = () => {
      if (window.location.hash) {
        setInternalActiveSection(window.location.hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    if (typeof window === 'undefined' || controlledActiveSection) return;

    const sectionIds = ['about', 'skills', 'projects', 'experience', 'credentials', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          setInternalActiveSection(`#${topEntry.target.id}`);
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [controlledActiveSection]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Close mobile drawer on desktop resize to prevent scroll lock leak
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    },
    [isMobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setInternalActiveSection(href);
    setIsMobileMenuOpen(false);

    if (typeof document !== 'undefined') {
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        if (typeof window !== 'undefined' && window.history?.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#0d0604]/80 backdrop-blur-md ${
        isScrolled
          ? 'border-b border-[rgba(212,175,55,0.22)] shadow-[0_8px_32px_rgba(0,0,0,0.65)]'
          : 'border-b border-[rgba(212,175,55,0.12)]'
      } ${className}`.trim()}
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Left: Brand Identity & Live Radar Status Beacon */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, '#about')}
              className="group flex items-center gap-2.5 font-display text-base sm:text-lg font-bold text-[#fbf5ee] tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60 rounded-lg p-1"
              aria-label="Mithun Senthil S - Back to top / About"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c0392b] to-[#170c08] border border-[#e74c3c]/40 flex items-center justify-center text-[#fbf5ee] shadow-[0_0_12px_rgba(231,76,60,0.25)] group-hover:border-[#d4af37]/60 transition-colors">
                <Terminal className="w-4 h-4 text-[#f5cb78]" />
              </span>
              <span className="flex items-baseline gap-1">
                <span>{profileData.preferredName || 'Mithun'}</span>
                <span className="text-[#d4af37] text-xs font-mono">.dev</span>
              </span>
            </a>

            {/* Live Radar Status Beacon (Desktop & Tablet) */}
            <div
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-[0_0_12px_rgba(16,185,129,0.12)]"
              title="Live Availability Status"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-tight select-none">Available for Roles</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {NAV_LINKS.map((link) => {
              const isActive = currentActiveSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60 ${
                    isActive
                      ? 'text-[#f5cb78] font-semibold'
                      : 'text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute inset-0 bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] rounded-lg -z-10 shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Resume CTA & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop Resume Download CTA */}
            <div className="hidden sm:block">
              <Button
                variant="gold"
                size="sm"
                href={resumeUrl}
                download="Mithun_Senthil_Resume.docx"
                target="_blank"
                leftIcon={<Download className="w-3.5 h-3.5" />}
                className="font-mono text-xs uppercase tracking-wider"
              >
                Resume
              </Button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="md:hidden p-2 rounded-xl text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#f5cb78]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay & Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-16 bg-[#0d0604]/80 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Slide-out Drawer Menu */}
            <motion.div
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="absolute top-full left-0 right-0 z-50 md:hidden bg-[#140a07] border-b border-[rgba(212,175,55,0.2)] shadow-[0_20px_50px_rgba(0,0,0,0.85)] px-4 py-5 flex flex-col gap-4 overflow-hidden"
            >
              {/* Mobile Live Radar Beacon */}
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(212,175,55,0.12)]">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Available for Roles</span>
                </div>

                <span className="text-[11px] font-mono text-[#9e8779]">Saveetha '27</span>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = currentActiveSection === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[rgba(212,175,55,0.14)] text-[#f5cb78] border border-[rgba(212,175,55,0.25)] font-semibold'
                          : 'text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-[#f5cb78] translate-x-0.5' : 'text-[#9e8779]'
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>

              {/* Mobile Resume CTA */}
              <div className="pt-2">
                <Button
                  variant="gold"
                  size="md"
                  href={resumeUrl}
                  download="Mithun_Senthil_Resume.docx"
                  target="_blank"
                  leftIcon={<Download className="w-4 h-4" />}
                  className="w-full font-mono text-xs uppercase tracking-wider justify-center"
                >
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

Navbar.displayName = 'Navbar';
