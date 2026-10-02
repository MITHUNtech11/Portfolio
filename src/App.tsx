import React from 'react';
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

/**
 * App
 *
 * Root portfolio application component. Assembles all sections in order:
 * ReadingProgress → Navbar → Hero → About → Skills → Projects →
 * Experience → Credentials → Contact → Footer → Toast
 *
 * Features:
 * - Radial gradient ambient glow background layered below all content
 * - Smooth scrolling (CSS level) for anchor navigation
 * - Centralized Toast notification system via useToast hook
 * - Scroll spy active section tracking is handled inside Navbar
 */
export default function App(): React.JSX.Element {
  const { toasts, show: showToast, dismiss } = useToast();

  return (
    <div className="relative min-h-screen bg-[#0d0604] text-[#fbf5ee] antialiased overflow-x-hidden">
      {/* ── Ambient radial glow layers ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 15% 10%, rgba(192,57,43,0.07) 0%, transparent 55%)',
            'radial-gradient(ellipse 70% 50% at 85% 90%, rgba(212,175,55,0.05) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      {/* ── Reading progress bar ── */}
      <ReadingProgress />

      {/* ── Sticky Navbar ── */}
      <Navbar resumeUrl={profileData.resumeUrl} />

      {/* ── Main content ── */}
      <main>
        {/* Hero */}
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

      {/* ── Footer ── */}
      <Footer />

      {/* ── Toast notifications ── */}
      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
