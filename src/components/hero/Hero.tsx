import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Phone,
  Terminal,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { ProfileData } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PortraitCard } from './PortraitCard';
import { StatCounter } from './StatCounter';

export interface HeroProps {
  profile?: ProfileData;
  className?: string;
}

const getSocialIcon = (platform: string): React.ReactNode => {
  switch (platform.toLowerCase()) {
    case 'github':
      return <Github className="w-4 h-4" />;
    case 'linkedin':
      return <Linkedin className="w-4 h-4" />;
    case 'email':
      return <Mail className="w-4 h-4" />;
    case 'phone':
      return <Phone className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

export const Hero: React.FC<HeroProps> = ({
  profile = profileData,
  className = '',
}) => {
  const texts = profile.typewriterTexts && profile.typewriterTexts.length > 0
    ? profile.typewriterTexts
    : [profile.tagline];

  // Dynamic typewriter state machine
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    const fullText = texts[currentTextIndex % texts.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2600);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 15);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        timer = setTimeout(() => {}, 250);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  const resumeHref = profile.resumeUrl.startsWith('/')
    ? profile.resumeUrl
    : `/${profile.resumeUrl}`;

  return (
    <section
      id="hero"
      aria-label="Introduction & Recruiter Fast Scan"
      className={`relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#0d0604] text-[#fbf5ee] pt-20 pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`.trim()}
    >
      {/* --- Ambient Radial Obsidian Background Mesh --- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Amber/Gold radial highlight (top-left) */}
        <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.09)_0%,transparent_70%)] blur-2xl" />

        {/* Crimson radial glow (center-right) */}
        <div className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-[radial-gradient(circle,rgba(192,57,43,0.1)_0%,transparent_70%)] blur-3xl" />

        {/* Deep obsidian ambient floor glow (bottom-center) */}
        <div className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[30vw] max-w-[800px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.05)_0%,transparent_75%)] blur-3xl" />

        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(212, 175, 55, 0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 lg:gap-16 my-auto">
        {/* --- Top Row: Fast-Scan Profile Header & Portrait Card --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Recruiter Hook & Core Content (Cols 1-7) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Recruiter Fast-Scan Pill & Live Status */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
              <Badge
                variant="emerald"
                size="sm"
                dot
                pulse
                className="backdrop-blur-md bg-[#0d0604]/90 border-emerald-500/40"
              >
                {profile.status}
              </Badge>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9e8779] bg-[#170c08]/80 border border-white/5 rounded-full px-3 py-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                {profile.location}
              </span>

              <span className="text-xs font-mono text-[#d8c8b8] hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-[#170c08]/80 border border-[#d4af37]/20">
                {profile.university} (CGPA 8.46)
              </span>
            </div>

            {/* Candidate Name Pre-title */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#d4af37]/60" />
              <p className="font-mono text-xs sm:text-sm text-[#f5cb78] font-bold tracking-wider uppercase">
                {profile.name}
              </p>
            </div>

            {/* High-Impact Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold font-display tracking-tight text-[#fbf5ee] leading-[1.12] mb-5">
              Dual Hybrid:{' '}
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f5cb78] to-[#d4af37] bg-clip-text text-transparent">
                Backend &amp; Systems Engineer
              </span>{' '}
              with Applied AI
            </h1>

            {/* Dynamic Typewriter Role Pill */}
            <div
              className="w-full max-w-2xl min-h-[58px] rounded-xl bg-[#170c08]/90 border border-[#d4af37]/30 p-3 sm:px-4 sm:py-3 flex items-start gap-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] mb-6"
              aria-live="polite"
            >
              <Terminal className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="font-mono text-xs sm:text-sm text-[#d8c8b8] leading-relaxed break-words flex-1">
                <span className="text-[#f5cb78] font-semibold">sys@mithun:~$ </span>
                <span>{displayText}</span>
                <span
                  className="inline-block w-1.5 h-4 ml-1 bg-[#d4af37] animate-pulse align-middle"
                  aria-hidden="true"
                />
              </p>
            </div>

            {/* Brief Elevator Pitch */}
            <p className="text-sm sm:text-base text-[#d8c8b8] leading-relaxed font-body max-w-2xl mb-8">
              Final-year B.Tech (AI &amp; Data Science, CGPA 8.46) at Saveetha University with Oracle certifications in Java SE 11 &amp; SQL. Hands-on track record across healthcare (Kauvery Hospital) and enterprise IT (RedBack IT) engineering automated data ingestion vaults, schema validation microservices, and graph optimization algorithms.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Systems
              </Button>

              <Button
                variant="outline"
                size="lg"
                href={resumeHref}
                download="Mithun_Senthil_Resume.docx"
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download Resume
              </Button>

              <Button
                variant="ghost"
                size="lg"
                href="#contact"
                leftIcon={<Mail className="w-4 h-4" />}
              >
                Get in Touch
              </Button>
            </div>

            {/* Fast Connect Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#9e8779] uppercase tracking-wider hidden sm:inline-block mr-1">
                Quick Connect:
              </span>
              {profile.socialLinks.map((link) => {
                const icon = getSocialIcon(link.platform);
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.url.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#170c08] border border-[rgba(212,175,55,0.2)] text-[#d8c8b8] hover:text-[#f5cb78] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: 3D Tilt Portrait Card (Cols 8-12) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <PortraitCard
              avatarUrl={profile.avatarUrl}
              name={profile.name}
              topBadge={{
                text: 'Oracle Java SE 11 Certified',
                variant: 'gold',
              }}
              bottomBadge={{
                text: 'Saveetha CGPA 8.46',
                variant: 'crimson',
              }}
              availableBadgeText={profile.status}
            />
          </motion.div>
        </div>

        {/* --- Bottom Row: Animated Recruiter Impact Counters --- */}
        <div className="w-full pt-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#d4af37]/40" />
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f5cb78] font-semibold">
              Recruiter Impact Highlights
            </h2>
            <span className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
          </div>

          <StatCounter stats={profile.recruiterStats} />
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';
