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
  switch (iconName?.toLowerCase()) {
    case 'archive':
      return <Archive className="w-4 h-4 text-[#800020]" />;
    case 'usercheck':
      return <UserCheck className="w-4 h-4 text-[#800020]" />;
    case 'mappin':
      return <MapPin className="w-4 h-4 text-[#800020]" />;
    default:
      return <FolderGit2 className="w-4 h-4 text-[#800020]" />;
  }
};

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences = experienceData,
  className = '',
  id = 'experience',
}) => {
  const items = experiences || experienceData || [];

  return (
    <section
      id={id}
      aria-label="Professional Experience"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24 text-[#010736] ${className}`.trim()}
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-px w-6 bg-[#8B9A6E]" />
          <span className="font-mono text-xs font-bold text-[#8B9A6E] uppercase tracking-widest">
            05 // Industry Track Record
          </span>
          <span className="h-px w-6 bg-[#8B9A6E]" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#010736]">
          Corporate <span className="text-[#800020]">Experience</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#2C3352]/80 max-w-2xl mx-auto leading-relaxed">
          Applied AI engineering and high-throughput backend systems built during
          production healthcare and consulting engagements.
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative pl-7 sm:pl-10 md:pl-14">
        {/* Vertical spine */}
        <div
          className="absolute left-[13px] sm:left-[19px] md:left-[27px] top-4 bottom-4 w-[2px] bg-[#E5D3AF]"
          aria-hidden="true"
        />

        {items.length === 0 ? (
          <div className="py-12 text-center text-[#6B7280] font-mono text-sm border border-dashed border-[#E5D3AF] rounded-2xl p-8 bg-white">
            No corporate experience milestones recorded.
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {items.map((exp, expIdx) => {
              const subprojects = exp.subprojects || [];

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: expIdx * 0.15 }}
                  className="relative group"
                >
                  {/* Sage Green Node Marker */}
                  <div
                    className="absolute -left-[27px] sm:-left-[33px] md:-left-[41px] top-1.5 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white border-2 border-[#8B9A6E] shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="w-3.5 h-3.5 text-[#8B9A6E]" />
                    </div>
                  </div>

                  {/* Main Card Container */}
                  <div className="rounded-2xl bg-white border border-[#E5D3AF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(1,7,54,0.03)] hover:border-[#DB9558] hover:shadow-[0_8px_30px_rgba(219,149,88,0.1)] transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5D3AF]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#010736] tracking-tight">
                            {exp.company}
                          </h3>
                          {exp.division && (
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#E5D3AF]/40 text-[#010736]">
                              <Building2 className="w-3 h-3 text-[#8B9A6E]" />
                              {exp.division}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[#2C3352]/80">
                          <span className="font-semibold text-[#800020] text-base">
                            {exp.role}
                          </span>
                          {exp.location && (
                            <>
                              <span className="text-[#E5D3AF]">•</span>
                              <span className="inline-flex items-center gap-1 font-mono text-xs text-[#6B7280]">
                                <MapPin className="w-3.5 h-3.5 text-[#DB9558]" />
                                {exp.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Period badge */}
                      <div className="shrink-0">
                        <Badge variant="navy" size="md" icon={<Calendar className="w-3.5 h-3.5 text-[#800020]" />}>
                          {exp.period}
                        </Badge>
                      </div>
                    </div>

                    {/* Subprojects Section */}
                    {subprojects.length > 0 && (
                      <div className="mt-6 space-y-6">
                        {subprojects.map((sub, subIdx) => {
                          const techPills = sub.tech
                            ? sub.tech.split(/[•,|]/).map((t) => t.trim()).filter(Boolean)
                            : [];
                          const tasks = sub.tasks || [];

                          return (
                            <div
                              key={sub.title || subIdx}
                              className="rounded-xl bg-[#F5EFE1]/50 border border-[#E5D3AF] p-5 hover:border-[#DB9558] transition-all duration-200"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-[#E5D3AF] shrink-0 shadow-xs">
                                    {getSubprojectIcon(sub.icon)}
                                  </div>
                                  <h4 className="font-display font-semibold text-base sm:text-lg text-[#010736]">
                                    {sub.title}
                                  </h4>
                                </div>
                              </div>

                              {techPills.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {techPills.map((techItem) => (
                                    <span
                                      key={techItem}
                                      className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-white border border-[#E5D3AF] text-[#010736]"
                                    >
                                      {techItem}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {tasks.length > 0 && (
                                <ul className="space-y-2.5 text-sm text-[#2C3352]/85">
                                  {tasks.map((task, tIdx) => (
                                    <li key={tIdx} className="flex items-start gap-2.5 leading-relaxed">
                                      <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
                                      <span className="flex-1">{task}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

ExperienceTimeline.displayName = 'ExperienceTimeline';
export default ExperienceTimeline;
