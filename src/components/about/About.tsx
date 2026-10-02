import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Route,
  Database,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { TiltCard } from '../ui/TiltCard';
import { educationData } from '../../data/education';
import { profileData } from '../../data/profile';
import { EducationItem, ProfileData } from '../../types';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export interface AboutProps {
  profile?: ProfileData;
  education?: EducationItem[];
  className?: string;
}

const philosophyPillars = [
  {
    id: 'systems-rigor',
    title: 'Distributed Systems & Enterprise Java',
    badge: 'Deterministic Latency',
    badgeVariant: 'burgundy' as const,
    icon: Layers,
    description:
      'Designing decoupled microservices and service layers with Java SE 11 (Oracle Certified) and Spring Boot. Prioritizing strict ACID compliance, parameterized JDBC connection pools, 3NF schema normalization, and robust concurrency control over quick-fix scripts.',
    technologies: ['Java SE 11', 'Spring Boot', 'JDBC', 'PostgreSQL', 'JUnit / Mockito'],
  },
  {
    id: 'applied-ai',
    title: 'Applied AI & Graph DSA Pipelines',
    badge: 'Heuristic Optimization',
    badgeVariant: 'terracotta' as const,
    icon: Route,
    description:
      'Deploying high-efficiency Python algorithms into real-world pipelines: Dijkstra shortest-path route planning over NetworkX/OSMnx graphs, O(N log K) priority queues for rapid candidate ranking, and transformer/NLP tokenization for unstructured data extraction.',
    technologies: ['FastAPI', 'NetworkX Dijkstra', 'NLP Pipelines', 'Pandas', 'Streamlit'],
  },
  {
    id: 'production-execution',
    title: 'Healthcare & Enterprise Impact',
    badge: 'Zero-Defect Standard',
    badgeVariant: 'sage' as const,
    icon: Database,
    description:
      'Translating architectural concepts into production systems. Engineered automated healthcare ingestion vaults eliminating patient duplicate records at Kauvery Hospital, and built sub-50ms schema validation microservices at RedBack IT Solutions.',
    technologies: ['Data Vaults', 'Schema Validation', 'Azure Blob', 'Audit Logging', 'Agile / Scrum'],
  },
];

export const About: React.FC<AboutProps> = ({
  profile = profileData,
  education = educationData,
  className = '',
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className={`relative py-24 sm:py-32 bg-[#F5EFE1] overflow-hidden text-[#010736] ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#8B9A6E]" />
            <span className="font-mono text-xs font-bold text-[#8B9A6E] uppercase tracking-widest">
              02 // Philosophy &amp; Foundation
            </span>
            <span className="h-px w-6 bg-[#8B9A6E]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#010736] mb-5">
            Systems Rigor Meets{' '}
            <span className="text-[#800020]">Applied AI</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#2C3352]/80 leading-relaxed">
            Bridging deterministic distributed enterprise backends, graph data structures, and
            machine learning pipelines. Engineering reliable software systems that optimize both
            latency and decision intelligence.
          </p>
        </div>

        {/* Philosophy Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {philosophyPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="h-full"
              >
                <TiltCard
                  hoverScale={1.02}
                  className="h-full rounded-2xl border border-[#E5D3AF] bg-white/80 p-8 shadow-[0_4px_20px_rgba(1,7,54,0.03)] backdrop-blur-sm transition-all duration-300 hover:border-[#DB9558] hover:shadow-[0_8px_30px_rgba(219,149,88,0.12)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E5D3AF] bg-[#E5D3AF]/30 text-[#800020] shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant={pillar.badgeVariant} size="sm">
                        {pillar.badge}
                      </Badge>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#010736] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[#2C3352]/80 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div>
                    <div className="h-px w-full bg-[#E5D3AF] mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {pillar.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs text-[#2C3352] bg-[#E5D3AF]/40 px-2.5 py-1 rounded-md border border-[#E5D3AF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Academic Foundation & Saveetha University Spotlight */}
        <div className="relative mb-20 rounded-3xl border border-[#E5D3AF] bg-white p-8 sm:p-12 shadow-[0_6px_28px_rgba(1,7,54,0.04)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Saveetha Highlight & CGPA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="navy" size="md" icon={<GraduationCap className="w-4 h-4 text-[#800020]" />}>
                  Saveetha School of Engineering
                </Badge>
                <Badge variant="sage" size="sm">
                  Graduating 2027
                </Badge>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#010736] tracking-tight mb-2">
                  B.Tech — Artificial Intelligence &amp; Data Science
                </h3>
                <p className="font-mono text-sm text-[#800020] font-semibold">
                  Saveetha University • Academic Distinction
                </p>
              </div>

              <p className="font-body text-sm sm:text-base text-[#2C3352]/80 leading-relaxed">
                Tenure combining theoretical computer science with heavy practical software engineering.
                Focus areas include distributed backend architecture, relational database design
                (PostgreSQL/MySQL), graph algorithm optimization, and applied ML pipeline engineering.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-xl border border-[#E5D3AF] bg-[#F5EFE1]/60 p-4 text-center">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#800020]">
                    8.46
                  </div>
                  <div className="font-body text-xs text-[#2C3352] mt-1 font-medium">
                    Cumulative CGPA / 10.0
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5D3AF] bg-[#F5EFE1]/60 p-4 text-center">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DB9558]">
                    SE 11
                  </div>
                  <div className="font-body text-xs text-[#2C3352] mt-1 font-medium">
                    Oracle Java Certified
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5D3AF] bg-[#F5EFE1]/60 p-4 text-center col-span-2 sm:col-span-1">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#8B9A6E]">
                    2
                  </div>
                  <div className="font-body text-xs text-[#2C3352] mt-1 font-medium">
                    Enterprise Internships
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Specialized Core Modules */}
            <div className="lg:col-span-5 rounded-2xl border border-[#E5D3AF] bg-[#F5EFE1]/50 p-6 sm:p-8">
              <h4 className="font-display text-sm font-semibold tracking-wider uppercase text-[#010736] mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8B9A6E]" />
                Specialized Core Modules
              </h4>
              <ul className="space-y-3 font-body text-sm text-[#2C3352]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#010736]">Distributed Backends:</strong> REST APIs,
                    microservices, and concurrency handling in Spring Boot &amp; FastAPI.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#010736]">Graph DSA &amp; Optimization:</strong> Priority
                    queues, heaps, and shortest-path Dijkstra algorithms.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#010736]">Database Systems (RDBMS):</strong> 3NF
                    normalization, indexing, and transactional isolation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#010736]">Machine Learning &amp; NLP:</strong> Tokenization,
                    embedding pipelines, and interactive deployment.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-mono text-xs font-bold text-[#8B9A6E] uppercase tracking-widest block mb-1">
                Academic Trajectory
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#010736]">
                Education Timeline
              </h3>
            </div>
            <p className="font-body text-sm text-[#2C3352]/75 max-w-md">
              From foundational CBSE sciences to university-level AI &amp; Data Science engineering.
            </p>
          </div>

          <div className="relative">
            {/* GSAP animated connecting line */}
            <div
              ref={lineRef}
              className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#E5D3AF] -translate-y-1/2 origin-left z-0"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {education.map((item, idx) => {
                const isUniversity = item.id === 'saveetha';
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <div
                      className={`h-full rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                        isUniversity
                          ? 'border-[#800020]/30 bg-white shadow-[0_4px_24px_rgba(128,0,32,0.06)]'
                          : 'border-[#E5D3AF] bg-white/70 hover:border-[#DB9558]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#2C3352]/70">
                            <Calendar className="w-3.5 h-3.5 text-[#8B9A6E]" />
                            {item.period}
                          </span>
                          <Badge
                            variant={isUniversity ? 'burgundy' : 'sand'}
                            size="sm"
                            icon={<Award className="w-3 h-3" />}
                          >
                            {item.score}
                          </Badge>
                        </div>

                        <h4 className="font-display text-base sm:text-lg font-bold text-[#010736] mb-1">
                          {item.institution}
                        </h4>
                        <p className="font-mono text-xs text-[#800020] mb-3 font-semibold">{item.degree}</p>

                        {item.details && (
                          <p className="font-body text-xs sm:text-sm text-[#2C3352]/80 leading-relaxed">
                            {item.details}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E5D3AF] flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#6B7280] uppercase tracking-wider">
                          {isUniversity ? 'Higher Education' : 'Secondary Schooling'}
                        </span>
                        {isUniversity && (
                          <span className="inline-flex items-center text-xs font-semibold text-[#800020] gap-1">
                            Current Focus
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

About.displayName = 'About';
