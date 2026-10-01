import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowUp,
  Terminal,
  ExternalLink,
  Heart,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { NAV_LINKS } from './Navbar';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  showBackToTop?: boolean;
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  phone: Phone,
};

/**
 * Footer
 *
 * Obsidian dark footer with branding, quick section navigation, social links,
 * copyright notice, and a smooth back-to-top button.
 */
export const Footer: React.FC<FooterProps> = ({
  className = '',
  showBackToTop = true,
  ...rest
}) => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    <footer
      className={`relative bg-[#090403] border-t border-[rgba(212,175,55,0.12)] text-[#d8c8b8] overflow-hidden ${className}`.trim()}
      {...rest}
    >
      {/* Decorative top ambient glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand & Headline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c0392b] to-[#170c08] border border-[#e74c3c]/40 flex items-center justify-center text-[#fbf5ee] shadow-[0_0_12px_rgba(231,76,60,0.25)]">
                <Terminal className="w-4 h-4 text-[#f5cb78]" />
              </span>
              <span className="font-display text-lg font-bold text-[#fbf5ee] tracking-tight">
                {profileData.name}
              </span>
            </div>

            <p className="text-sm text-[#9e8779] max-w-md leading-relaxed">
              {profileData.headline}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#d8c8b8]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
              <span>{profileData.status}</span>
              <span className="text-[#9e8779]">•</span>
              <span className="text-[#9e8779]">{profileData.location}</span>
            </div>
          </div>

          {/* Column 2: Navigation Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f5cb78]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#9e8779] hover:text-[#fbf5ee] hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150 focus:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f5cb78]">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {profileData.socialLinks.map((item) => {
                const IconComponent = socialIconMap[item.platform] || ExternalLink;
                const isWebUrl = item.url.startsWith('http://') || item.url.startsWith('https://');
                return (
                  <motion.a
                    key={item.platform}
                    href={item.url}
                    target={isWebUrl ? '_blank' : undefined}
                    rel={isWebUrl ? 'noopener noreferrer' : undefined}
                    aria-label={`Open ${item.label}`}
                    title={item.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    className="p-2.5 rounded-xl bg-[#140a07] border border-[rgba(212,175,55,0.18)] text-[#d8c8b8] hover:text-[#f5cb78] hover:border-[#d4af37]/60 hover:shadow-[0_0_14px_rgba(212,175,55,0.25)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-2 text-xs text-[#9e8779]">
              <a
                href={`mailto:${profileData.email}`}
                className="hover:text-[#fbf5ee] transition-colors focus:outline-none focus-visible:underline"
              >
                {profileData.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-[rgba(212,175,55,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9e8779]">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {currentYear} {profileData.name}. All rights reserved.</span>
            <span className="hidden md:inline">• Built with React 19 &amp; Tailwind</span>
          </p>

          {showBackToTop && (
            <motion.button
              type="button"
              onClick={handleScrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#170c08] border border-[rgba(212,175,55,0.2)] text-[#d8c8b8] hover:text-[#fbf5ee] hover:border-[#d4af37]/50 hover:bg-[#23120d] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#f5cb78]" />
            </motion.button>
          )}
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
