import React, { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
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
import { PortraitCard } from './PortraitCard';
import { StatCounter } from './StatCounter';
import { useParticleField } from '../../lib/three-particles';
import { smoothScrollTo } from '../../lib/gsap';

export interface HeroProps {
  profile?: ProfileData;
  className?: string;
  isReady?: boolean;
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
  isReady = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleField(canvasRef);

  const rawTexts =
    profile.typewriterTexts && profile.typewriterTexts.length > 0
      ? profile.typewriterTexts
      : [profile.tagline || profile.headline || 'Backend & Systems Engineer'];
  const texts = rawTexts.filter(Boolean);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState(() => (texts.length > 0 ? texts[0] : ''));
  const [isDeleting, setIsDeleting] = useState(false);

  // Name letter stagger animation via anime.js v4
  const nameRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!isReady || typeof window === 'undefined' || !nameRef.current) return;
    const letters = nameRef.current.querySelectorAll('.hero-letter');
    if (letters.length > 0) {
      animate(letters, {
        opacity: [0, 1],
        translateY: [24, 0],
        ease: 'outExpo',
        duration: 900,
        delay: stagger(35, { start: 100 }),
      });
    }
  }, [isReady]);

  // Dynamic typewriter state machine
  useEffect(() => {
    if (!texts.length) return;

    const fullText = texts[currentTextIndex % texts.length] || '';
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 28);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 14);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }, 350);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  const rawResume = profile.resumeUrl || 'Mithun_Senthil_Resume.docx';
  const resumeHref =
    rawResume.startsWith('/') || rawResume.startsWith('http')
      ? rawResume
      : `/${rawResume}`;
  const resumeFileName = rawResume.split('/').pop() || 'Mithun_Senthil_Resume.docx';

  // Split candidate name into individual character spans for anime.js
  const candidateName = profile.name || 'Mithun Senthil S';
  const nameLetters = candidateName.split('').map((char, index) => (
    <span
      key={index}
      className="hero-letter inline-block opacity-0"
      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </span>
  ));

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className={`relative w-full min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#F5EFE1] dark:bg-[#050B20] text-[#010736] dark:text-[#F5EFE1] pt-24 pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 transition-colors duration-300 ${className}`.trim()}
    >
      {/* --- Three.js WebGL Interactive Particle Background --- */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 w-full h-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 lg:gap-16 my-auto">
        {/* --- Top Row: Split Editorial Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Editorial Eyebrow Tag in Sage Green */}
            <div
              className={`flex items-center gap-2 mb-4 transition-all duration-700 ease-out delay-75 ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
              }`}
            >
              <span className="h-px w-6 bg-[#8B9A6E] dark:bg-[#A2B784]" />
              <span className="font-mono text-xs font-bold text-[#8B9A6E] dark:text-[#A2B784] uppercase tracking-widest">
                01 // Portfolio
              </span>
              <span className="text-xs font-mono text-[#6B7280] dark:text-[#8C9BB5] ml-2 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#DB9558] dark:text-[#F5A663]" />
                {profile.location}
              </span>
            </div>

            {/* Candidate Name Stagger Heading */}
            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold font-display tracking-tight text-[#010736] dark:text-[#F5EFE1] leading-[1.08] mb-4"
            >
              {nameLetters}
            </h1>

            {/* Headline Subtitle */}
            <h2
              className={`text-xl sm:text-2xl font-display font-medium text-[#2C3352] dark:text-[#C5CEE0] mb-6 transition-all duration-700 ease-out delay-150 ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Backend &amp; Systems Engineer{' '}
              <span className="text-[#800020] dark:text-[#F5A663] font-semibold">with Applied AI</span>
            </h2>

            {/* Typewriter Terminal Bar with Sage Green prompt */}
            <div
              className={`w-full max-w-2xl min-h-[52px] rounded-xl bg-white/80 dark:bg-[#0B132B]/90 border border-[#E5D3AF] dark:border-[#E5D3AF]/15 p-3 sm:px-4 sm:py-3 flex items-start gap-2.5 shadow-[0_4px_16px_rgba(1,7,54,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] mb-6 backdrop-blur-sm transition-all duration-700 ease-out delay-200 ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              aria-live="polite"
            >
              <Terminal className="w-4 h-4 text-[#8B9A6E] dark:text-[#A2B784] shrink-0 mt-0.5" />
              <p className="font-mono text-xs sm:text-sm text-[#2C3352] dark:text-[#C5CEE0] leading-relaxed break-words flex-1">
                <span className="text-[#8B9A6E] dark:text-[#A2B784] font-semibold">sys@mithun:~$ </span>
                <span>{displayText}</span>
                <span
                  className="inline-block w-1.5 h-4 ml-1 bg-[#800020] dark:bg-[#F5A663] animate-pulse align-middle"
                  aria-hidden="true"
                />
              </p>
            </div>

            {/* Bio summary */}
            <p
              className={`text-sm sm:text-base text-[#2C3352]/80 dark:text-[#C5CEE0]/80 leading-relaxed font-body max-w-2xl mb-8 transition-all duration-700 ease-out delay-300 ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Final-year B.Tech (AI &amp; Data Science, CGPA 8.46) at Saveetha University with Oracle certifications in Java SE 11 &amp; SQL. Hands-on experience developing automated healthcare ingestion vaults, schema validation microservices, and graph optimization algorithms.
            </p>

            {/* Primary Action Buttons */}
            <div
              className={`flex flex-wrap items-center gap-3 sm:gap-4 mb-8 transition-all duration-700 ease-out delay-350 ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#projects', 75);
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Systems
              </Button>

              <Button
                variant="outline"
                size="lg"
                href={resumeHref}
                download={resumeFileName}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download Resume
              </Button>

              <Button
                variant="ghost"
                size="lg"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#contact', 75);
                }}
                leftIcon={<Mail className="w-4 h-4 text-[#800020] dark:text-[#F5A663]" />}
              >
                Get in Touch
              </Button>
            </div>

            {/* Quick Connect Social Links */}
            <div
              className={`flex items-center gap-2.5 transition-all duration-700 ease-out delay-400 ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-xs font-mono text-[#6B7280] dark:text-[#8C9BB5] uppercase tracking-wider hidden sm:inline-block mr-1">
                Connect:
              </span>
              {(profile.socialLinks || []).map((link, idx) => {
                const icon = getSocialIcon(link.platform);
                return (
                  <a
                    key={`${link.platform}-${idx}`}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 text-[#010736] dark:text-[#F5EFE1] hover:text-[#800020] dark:hover:text-[#F5A663] hover:border-[#800020] dark:hover:border-[#F5A663] hover:bg-[#E5D3AF]/30 dark:hover:bg-[#111C40] transition-all duration-200 shadow-sm"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Clean Editorial Portrait (Cols 8-12) */}
          <div
            className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 ease-out delay-200 ${
              isReady ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
            }`}
          >
            <PortraitCard
              avatarUrl={profile.avatarUrl}
              name={profile.name}
            />
          </div>
        </div>

        {/* --- Bottom Row: Editorial Stat Highlights --- */}
        <div
          className={`w-full pt-4 transition-all duration-700 ease-out delay-500 ${
            isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-[#8B9A6E] dark:bg-[#A2B784]" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#8B9A6E] dark:text-[#A2B784] font-bold">
              Engineering Impact Metrics
            </h2>
            <span className="h-px flex-1 bg-gradient-to-r from-[#E5D3AF] dark:from-[#E5D3AF]/20 to-transparent" />
          </div>

          <StatCounter stats={profile.recruiterStats} />
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';
