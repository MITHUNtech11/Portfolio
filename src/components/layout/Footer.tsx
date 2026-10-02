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
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { NAV_LINKS } from './Navbar';
import { smoothScrollTo } from '../../lib/gsap';

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
 * Grounded Midnight Navy (#010736) footer providing architectural contrast.
 * Clean 3-column layout: Candidate identity, Navigation links, and Connect icons.
 */
export const Footer: React.FC<FooterProps> = ({
  className = '',
  showBackToTop = true,
  ...rest
}) => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    smoothScrollTo(document.body, 0);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href, 75);
    if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState(null, '', href);
    }
  };

  return (
    <footer
      className={`relative bg-[#010736] border-t border-[#010736] text-[#F5EFE1] overflow-hidden ${className}`.trim()}
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14 mb-14">
          {/* Column 1: Identity & Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#800020] text-[#F5EFE1] flex items-center justify-center font-display font-bold text-sm shadow-sm">
                M
              </span>
              <span className="font-display text-xl font-bold text-[#F5EFE1] tracking-tight">
                {profileData.name}
              </span>
            </div>

            <p className="text-sm text-[#E5D3AF]/85 max-w-md leading-relaxed">
              {profileData.headline}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#E5D3AF]/70 pt-2">
              <span className="text-[#8B9A6E] font-semibold">{profileData.university}</span>
              <span>•</span>
              <span>{profileData.location}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B9A6E]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#E5D3AF]/80 hover:text-[#F5EFE1] hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150 focus:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B9A6E]">
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
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#E5D3AF] hover:text-[#DB9558] hover:border-[#DB9558]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB9558]"
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-2 text-xs text-[#E5D3AF]/70">
              <a
                href={`mailto:${profileData.email}`}
                className="hover:text-[#F5EFE1] transition-colors focus:outline-none focus-visible:underline"
              >
                {profileData.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5D3AF]/60">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {currentYear} {profileData.name}. All rights reserved.</span>
          </p>

          {showBackToTop && (
            <motion.button
              type="button"
              onClick={handleScrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[#E5D3AF] hover:text-[#F5EFE1] hover:border-[#DB9558]/50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB9558]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#DB9558]" />
            </motion.button>
          )}
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
