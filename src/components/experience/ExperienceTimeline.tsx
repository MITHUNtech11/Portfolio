import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Archive,
  UserCheck,
  FolderGit2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ExperienceItem } from '../../types';
import { experienceData } from '../../data/experience';
import { Badge } from '../ui/Badge';

export interface ExperienceTimelineProps {
  experiences?: ExperienceItem[];
  className?: string;
  id?: string;
}

const getSubprojectIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Archive':
      return <Archive className="w-4 h-4 text-[#f5cb78]" />;
    case 'UserCheck':
      return <UserCheck className="w-4 h-4 text-[#f5cb78]" />;
    case 'MapPin':
      return <MapPin className="w-4 h-4 text-[#f5cb78]" />;
    default:
      return <FolderGit2 className="w-4 h-4 text-[#f5cb78]" />;
  }
};

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences = experienceData,
  className = '',
  id = 'experience',
}) => {
  return (
    <section
      id={id}
      aria-label="Professional Experience"
      className={`relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24 ${className}`.trim()}
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <Badge variant="gold" size="sm" dot pulse>
            CAREER MILESTONES
          </Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fbf5ee]"
        >
          Corporate <span className="text-[#f5cb78]">Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-[#9e8779] max-w-2xl mx-auto"
        >
          Applied AI engineering and high-throughput backend systems built during
          production healthcare and consulting engagements.
        </motion.p>
      </div>

      {/* Timeline Tree */}
      <div className="relative pl-7 sm:pl-10 md:pl-14">
        {/* Glowing vertical spine */}
        <div
          className="absolute left-[13px] sm:left-[19px] md:left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#d4af37] via-[#c0392b] to-[#170c08] shadow-[0_0_12px_rgba(212,175,55,0.35)]"
          aria-hidden="true"
        />

        <div className="space-y-12 sm:space-y-16">
          {experiences.map((exp, expIdx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: expIdx * 0.15 }}
              className="relative group"
            >
              {/* Glowing Node Marker */}
              <div
                className="absolute -left-[27px] sm:-left-[33px] md:-left-[41px] top-1.5 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#170c08] border-2 border-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.5)] group-hover:scale-110 group-hover:border-[#f5cb78] transition-transform duration-300">
                  <Briefcase className="w-3.5 h-3.5 text-[#f5cb78]" />
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-25" />
                </div>
              </div>

              {/* Main Card Container */}
              <div className="rounded-2xl bg-[#170c08] border border-[rgba(212,175,55,0.2)] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[rgba(212,175,55,0.45)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.08)] transition-all duration-300">
                {/* Header: Company, Role, Badges */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(212,175,55,0.12)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#fbf5ee] tracking-tight">
                        {exp.company}
                      </h3>
                      {exp.division && (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[#d8c8b8]">
                          <Building2 className="w-3 h-3 text-[#9e8779]" />
                          {exp.division}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[#9e8779]">
                      <span className="font-semibold text-[#f5cb78] text-base">
                        {exp.role}
                      </span>
                      {exp.location && (
                        <>
                          <span className="text-white/20">•</span>
                          <span className="inline-flex items-center gap-1 font-mono text-xs">
                            <MapPin className="w-3.5 h-3.5 text-[#9e8779]" />
                            {exp.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Period badge */}
                  <div className="shrink-0">
                    <Badge variant="gold" size="md" icon={<Calendar className="w-3.5 h-3.5" />}>
                      {exp.period}
                    </Badge>
                  </div>
                </div>

                {/* Subprojects Section */}
                <div className="mt-6 space-y-6">
                  {exp.subprojects.map((sub, subIdx) => {
                    const techPills = sub.tech
                      ? sub.tech.split('•').map((t) => t.trim()).filter(Boolean)
                      : [];

                    return (
                      <div
                        key={sub.title || subIdx}
                        className="rounded-xl bg-[#120906]/75 border border-[rgba(212,175,55,0.1)] p-5 hover:border-[rgba(212,175,55,0.25)] transition-all duration-200"
                      >
                        {/* Subproject Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/25 shrink-0">
                              {getSubprojectIcon(sub.icon)}
                            </div>
                            <h4 className="font-display font-semibold text-base sm:text-lg text-[#fbf5ee]">
                              {sub.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[#9e8779] font-mono">
                            <Sparkles className="w-3 h-3 text-[#f5cb78]" />
                            <span>Milestone Deliverable</span>
                          </div>
                        </div>

                        {/* Technology Pills */}
                        {techPills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {techPills.map((techItem) => (
                              <span
                                key={techItem}
                                className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#23120d] border border-[rgba(212,175,55,0.18)] text-[#d4af37] tracking-tight"
                              >
                                {techItem}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Bulleted task achievements */}
                        <ul className="space-y-2.5 text-sm text-[#d8c8b8]">
                          {sub.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-[#e74c3c] shrink-0 mt-1" />
                              <span className="flex-1">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
