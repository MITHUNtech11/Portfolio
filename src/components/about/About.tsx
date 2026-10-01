import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Cpu,
  Route,
  Database,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { TiltCard } from '../ui/TiltCard';
import { educationData } from '../../data/education';
import { profileData } from '../../data/profile';
import { EducationItem, ProfileData } from '../../types';

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
    badgeVariant: 'gold' as const,
    icon: Layers,
    description:
      'Designing decoupled microservices and service layers with Java SE 11 (Oracle Certified) and Spring Boot. Prioritizing strict ACID compliance, parameterized JDBC connection pools, 3NF schema normalization, and robust concurrency control over quick-fix scripts.',
    technologies: ['Java SE 11', 'Spring Boot', 'JDBC', 'PostgreSQL', 'JUnit / Mockito'],
  },
  {
    id: 'applied-ai',
    title: 'Applied AI & Graph DSA Pipelines',
    badge: 'Heuristic Optimization',
    badgeVariant: 'crimson' as const,
    icon: Route,
    description:
      'Deploying high-efficiency Python algorithms into real-world pipelines: Dijkstra shortest-path route planning over NetworkX/OSMnx graphs, O(N log K) priority queues for rapid candidate ranking, and transformer/NLP tokenization for unstructured data extraction.',
    technologies: ['FastAPI', 'NetworkX Dijkstra', 'NLP Pipelines', 'Pandas', 'Streamlit'],
  },
  {
    id: 'production-execution',
    title: 'Healthcare & Enterprise Impact',
    badge: 'Zero-Defect Standard',
    badgeVariant: 'emerald' as const,
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
  return (
    <section
      id="about"
      className={`relative py-24 sm:py-32 bg-[#0d0604] overflow-hidden text-[#fbf5ee] ${className}`.trim()}
    >
      {/* Background Ambience / Mesh Gradients */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-[128px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 -z-10 h-96 w-96 rounded-full bg-[#c0392b]/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" dot pulse className="mb-4">
            ENGINEERING PHILOSOPHY & FOUNDATION
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fbf5ee] mb-6">
            Dual Hybrid Architecture:{' '}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f5cb78] to-[#e74c3c] bg-clip-text text-transparent">
              Systems Rigor Meets Applied AI
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#d8c8b8] leading-relaxed">
            Bridging deterministic distributed enterprise backends, graph data structures, and
            machine learning pipelines. Engineering reliable systems that optimize both latency and
            decision intelligence.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
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
                  className="h-full rounded-2xl border border-white/10 bg-[#170c08]/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-[#d4af37]/40 hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f5cb78] shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant={pillar.badgeVariant} size="sm">
                        {pillar.badge}
                      </Badge>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#fbf5ee] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[#d8c8b8] leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div>
                    <div className="h-px w-full bg-white/10 mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {pillar.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs text-[#9e8779] bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/5"
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
        <div className="relative mb-20 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-br from-[#170c08] via-[#1a0e0a] to-[#200f0a] p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div
            className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-[90px]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Saveetha Highlight & CGPA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="gold" size="md" icon={<GraduationCap className="w-4 h-4" />}>
                  Saveetha School of Engineering
                </Badge>
                <Badge variant="emerald" size="sm" dot>
                  Graduating 2027
                </Badge>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fbf5ee] tracking-tight mb-2">
                  B.Tech — Artificial Intelligence & Data Science
                </h3>
                <p className="font-mono text-sm text-[#f5cb78] font-medium">
                  Saveetha University • Academic Distinction
                </p>
              </div>

              <p className="font-body text-sm sm:text-base text-[#d8c8b8] leading-relaxed">
                Undergraduate tenure combining rigorous theoretical computer science with heavy
                practical software engineering. Focus areas include distributed architecture,
                relational database schema design (PostgreSQL/MySQL), graph algorithm optimization,
                and machine learning pipeline operationalization.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#f5cb78]">
                    8.46
                  </div>
                  <div className="font-body text-xs text-[#9e8779] mt-1 font-medium">
                    Cumulative CGPA / 10.0
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#e74c3c]">
                    SE 11
                  </div>
                  <div className="font-body text-xs text-[#9e8779] mt-1 font-medium">
                    Oracle Java Certified
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center col-span-2 sm:col-span-1">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
                    2+
                  </div>
                  <div className="font-body text-xs text-[#9e8779] mt-1 font-medium">
                    Enterprise Internships
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Academic Coursework & Accreditations */}
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0d0604]/80 p-6 sm:p-8 backdrop-blur-md">
              <h4 className="font-display text-sm font-semibold tracking-wider uppercase text-[#d4af37] mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Specialized Core Modules
              </h4>
              <ul className="space-y-3 font-body text-sm text-[#d8c8b8]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#fbf5ee]">Distributed Systems & Backends:</strong> REST
                    APIs, microservices, and concurrency handling.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#fbf5ee]">Graph DSA & Optimization:</strong> Priority
                    queues, heaps, and shortest-path Dijkstra algorithms.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#fbf5ee]">Database Systems (RDBMS & NoSQL):</strong> 3NF
                    normalization, indexing, and transactional isolation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#fbf5ee]">Machine Learning & NLP:</strong> Tokenization,
                    embedding pipelines, and interactive deployment.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Journey Cards */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <Badge variant="obsidian" size="sm" className="mb-2">
                ACADEMIC TRAJECTORY
              </Badge>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fbf5ee]">
                Education Timeline
              </h3>
            </div>
            <p className="font-body text-sm text-[#9e8779] max-w-md">
              From foundational CBSE sciences to university-level AI & Data Science engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        ? 'border-[#d4af37]/40 bg-[#170c08] shadow-[0_4px_24px_rgba(212,175,55,0.08)]'
                        : 'border-white/10 bg-[#170c08]/60 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#9e8779]">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                        <Badge
                          variant={isUniversity ? 'gold' : 'obsidian'}
                          size="sm"
                          icon={<Award className="w-3 h-3" />}
                        >
                          {item.score}
                        </Badge>
                      </div>

                      <h4 className="font-display text-base sm:text-lg font-bold text-[#fbf5ee] mb-1">
                        {item.institution}
                      </h4>
                      <p className="font-mono text-xs text-[#f5cb78] mb-3">{item.degree}</p>

                      {item.details && (
                        <p className="font-body text-xs sm:text-sm text-[#d8c8b8] leading-relaxed">
                          {item.details}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#9e8779] uppercase tracking-wider">
                        {isUniversity ? 'Higher Education' : 'Secondary Schooling'}
                      </span>
                      {isUniversity && (
                        <span className="inline-flex items-center text-xs font-semibold text-[#f5cb78] gap-1">
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
    </section>
  );
};

About.displayName = 'About';
