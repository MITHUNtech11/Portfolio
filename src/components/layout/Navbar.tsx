import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download, Terminal, ChevronRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { Button } from '../ui/Button';
import { smoothScrollTo } from '../../lib/gsap';

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
 * Minimalist editorial sticky header inspired by modern Hostinger templates.
 * Clean typography in Midnight Navy (#010736), active indicator in Burgundy (#800020),
 * and quick-action Resume CTA.
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

  // Track scroll position for sticky background styling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

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

  // Close mobile drawer on desktop resize
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
    e.preventDefault();
    setInternalActiveSection(href);
    setIsMobileMenuOpen(false);
    smoothScrollTo(href, 75);
    if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5EFE1]/90 backdrop-blur-md border-b border-[#E5D3AF] shadow-[0_4px_20px_rgba(1,7,54,0.04)]'
          : 'bg-transparent border-b border-transparent'
      } ${className}`.trim()}
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Clean Brand Identity (No status beacon) */}
          <div className="flex items-center gap-3">
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, '#about')}
              className="group flex items-center gap-2.5 font-display text-lg font-bold text-[#010736] tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/40 rounded-lg p-1"
              aria-label="Mithun Senthil S - Home"
            >
              <span className="w-8 h-8 rounded-lg bg-[#010736] text-[#F5EFE1] flex items-center justify-center font-display font-extrabold text-sm shadow-sm group-hover:bg-[#800020] transition-colors">
                M
              </span>
              <span className="flex items-baseline gap-1 font-display font-bold">
                <span>{profileData.preferredName || 'Mithun'}</span>
                <span className="text-[#DB9558] text-xs font-mono">.dev</span>
              </span>
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-3"
          >
            {NAV_LINKS.map((link) => {
              const isActive = currentActiveSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/40 ${
                    isActive
                      ? 'text-[#800020] font-semibold'
                      : 'text-[#010736]/75 hover:text-[#010736] hover:bg-[#E5D3AF]/30'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#800020] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Resume CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button
                variant="primary"
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

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="md:hidden p-2 rounded-xl text-[#010736] hover:bg-[#E5D3AF]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/40 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#800020]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-16 bg-[#010736]/30 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="absolute top-full left-0 right-0 z-50 md:hidden bg-[#F5EFE1] border-b border-[#E5D3AF] shadow-[0_20px_40px_rgba(1,7,54,0.12)] px-4 py-6 flex flex-col gap-4 overflow-hidden"
            >
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = currentActiveSection === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#E5D3AF] text-[#800020] font-semibold'
                          : 'text-[#010736] hover:bg-[#E5D3AF]/40'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-[#800020] translate-x-0.5' : 'text-[#6B7280]'
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>

              <div className="pt-2">
                <Button
                  variant="primary"
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
