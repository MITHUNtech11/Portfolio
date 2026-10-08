import React, { useState, useEffect } from 'react';
import { ReadingProgress, Navbar, Footer } from './components/layout';
import { Hero } from './components/hero';
import { About } from './components/about';
import { SkillsMatrix } from './components/skills';
import { Projects } from './components/projects';
import { ExperienceTimeline } from './components/experience';
import { Credentials } from './components/credentials';
import { Contact } from './components/contact';
import { Toast, useToast, PageLoader } from './components/ui';
import { profileData } from './data/profile';
import { ScrollTrigger } from './lib/gsap';

/**
 * App
 *
 * Root editorial portfolio application component.
 * Assembles all sections in light minimalist Hostinger aesthetic:
 * PageLoader → ReadingProgress → Navbar → Hero → About → Skills → Projects →
 * Experience → Credentials → Contact → Footer → Toast
 */
export default function App(): React.JSX.Element {
  const { toasts, show: showToast, dismiss } = useToast();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoaderMounted, setIsLoaderMounted] = useState(true);

  // Called when curtain reveal starts lifting
  const handleStartReveal = () => {
    setIsRevealed(true);
  };

  // Called when curtain has completely exited
  const handleLoaderComplete = () => {
    setIsLoaderMounted(false);
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    // Refresh GSAP ScrollTrigger after initial mount and font rendering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F5EFE1] dark:bg-[#050B20] text-[#010736] dark:text-[#F5EFE1] transition-colors duration-300 antialiased overflow-x-hidden font-body selection:bg-[#800020] selection:text-white dark:selection:bg-[#C72C48]">
      {/* ── High-tech Editorial Page Opening Curtain Loader ── */}
      {isLoaderMounted && (
        <PageLoader
          onStartReveal={handleStartReveal}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* ── Reading progress bar ── */}
      <ReadingProgress />

      {/* ── Sticky Navbar ── */}
      <Navbar isReady={isRevealed} resumeUrl={profileData.resumeUrl} />

      {/* ── Main content ── */}
      <main>
        {/* Hero with Three.js particle canvas & anime.js letter stagger */}
        <Hero isReady={isRevealed} />

        {/* About & Education */}
        <section id="about" aria-label="About and Education">
          <About />
        </section>

        {/* Skills Matrix */}
        <section id="skills" aria-label="Skills">
          <SkillsMatrix />
        </section>

        {/* Projects */}
        <section id="projects" aria-label="Projects">
          <Projects />
        </section>

        {/* Experience Timeline */}
        <section id="experience" aria-label="Experience">
          <ExperienceTimeline />
        </section>

        {/* Credentials & Certificates */}
        <section id="credentials" aria-label="Credentials and Certificates">
          <Credentials />
        </section>

        {/* Contact */}
        <Contact
          onToast={(message, variant) => showToast(message, variant)}
        />
      </main>

      {/* ── Grounded Contrast Footer ── */}
      <Footer />

      {/* ── Toast notifications ── */}
      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
