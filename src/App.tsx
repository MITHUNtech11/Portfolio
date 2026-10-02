import React, { useEffect } from 'react';
import { ReadingProgress, Navbar, Footer } from './components/layout';
import { Hero } from './components/hero';
import { About } from './components/about';
import { SkillsMatrix } from './components/skills';
import { Projects } from './components/projects';
import { ExperienceTimeline } from './components/experience';
import { Credentials } from './components/credentials';
import { Contact } from './components/contact';
import { Toast, useToast } from './components/ui';
import { profileData } from './data/profile';
import { ScrollTrigger } from './lib/gsap';

/**
 * App
 *
 * Root editorial portfolio application component.
 * Assembles all sections in light minimalist Hostinger aesthetic:
 * ReadingProgress → Navbar → Hero → About → Skills → Projects →
 * Experience → Credentials → Contact → Footer → Toast
 */
export default function App(): React.JSX.Element {
  const { toasts, show: showToast, dismiss } = useToast();

  useEffect(() => {
    // Refresh GSAP ScrollTrigger after initial mount and font rendering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F5EFE1] text-[#010736] antialiased overflow-x-hidden font-body selection:bg-[#800020] selection:text-white">
      {/* ── Reading progress bar ── */}
      <ReadingProgress />

      {/* ── Sticky Navbar ── */}
      <Navbar resumeUrl={profileData.resumeUrl} />

      {/* ── Main content ── */}
      <main>
        {/* Hero with Three.js particle canvas & anime.js letter stagger */}
        <Hero />

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
