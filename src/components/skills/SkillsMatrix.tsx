import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import {
  Sparkles,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Database,
  Route,
  Code2,
  SlidersHorizontal,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { TiltCard } from '../ui/TiltCard';
import { skillsData } from '../../data/skills';
import { SkillCategory, SkillItem } from '../../types';

export const SKILL_FILTER_TABS = [
  'All',
  'Backend Systems',
  'AI & Machine Learning',
  'Cloud & Databases',
  'Core Engineering & Tools',
] as const;

export type SkillFilterTab = (typeof SKILL_FILTER_TABS)[number];

// Re-export skillsData as skillCategories for compatibility
export const skillCategories = skillsData;

export interface SkillsMatrixProps {
  categories?: SkillCategory[];
  activeFilter?: SkillFilterTab;
  onFilterChange?: (tab: SkillFilterTab) => void;
  className?: string;
}

// Dynamic Lucide icon resolver with robust fallback
function renderSkillIcon(iconName?: string) {
  if (!iconName) {
    return <Code2 className="w-5 h-5 text-[#f5cb78]" />;
  }
  const IconComponent = (LucideIcons as Record<string, any>)[iconName];
  if (IconComponent && (typeof IconComponent === 'object' || typeof IconComponent === 'function')) {
    return React.createElement(IconComponent, { className: 'w-5 h-5 text-[#f5cb78]' });
  }
  return <Code2 className="w-5 h-5 text-[#f5cb78]" />;
}

// Category icon map for category headers
function getCategoryIcon(id: string) {
  switch (id) {
    case 'python':
      return <Terminal className="w-5 h-5 text-[#f5cb78]" />;
    case 'java':
      return <Cpu className="w-5 h-5 text-[#f5cb78]" />;
    case 'database':
      return <Database className="w-5 h-5 text-[#f5cb78]" />;
    case 'web':
      return <Code2 className="w-5 h-5 text-[#f5cb78]" />;
    case 'devops':
      return <Layers className="w-5 h-5 text-[#f5cb78]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#f5cb78]" />;
  }
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({
  categories = skillsData,
  activeFilter: controlledFilter,
  onFilterChange,
  className = '',
}) => {
  const [internalFilter, setInternalFilter] = useState<SkillFilterTab>('All');
  const activeTab = controlledFilter ?? internalFilter;

  const handleTabChange = (tab: SkillFilterTab) => {
    if (!controlledFilter) {
      setInternalFilter(tab);
    }
    if (onFilterChange) {
      onFilterChange(tab);
    }
  };

  // Filter categories and their skills according to the selected tab
  const filteredCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    if (activeTab === 'All') return categories;

    if (activeTab === 'Backend Systems') {
      return categories
        .map((cat) => {
          if (cat.id === 'java') return cat;
          if (cat.id === 'python') {
            return {
              ...cat,
              skills: cat.skills.filter((s) =>
                ['Python 3.x', 'Data Structures', 'Data Processing'].includes(s.name)
              ),
            };
          }
          if (cat.id === 'database') {
            return {
              ...cat,
              skills: cat.skills.filter((s) =>
                ['SQL', 'PostgreSQL', 'MySQL'].includes(s.name)
              ),
            };
          }
          if (cat.id === 'devops') {
            return {
              ...cat,
              skills: cat.skills.filter((s) =>
                ['MVC Architecture', 'OOP Principles'].includes(s.name)
              ),
            };
          }
          return null;
        })
        .filter((c): c is SkillCategory => Boolean(c && c.skills.length > 0));
    }

    if (activeTab === 'AI & Machine Learning') {
      return categories
        .map((cat) => {
          if (cat.id === 'python') {
            return {
              ...cat,
              skills: cat.skills.filter((s) =>
                [
                  'NLP & AI Pipelines',
                  'Graph DSA & Dijkstra',
                  'Streamlit',
                  'Data Processing',
                  'Data Structures',
                ].includes(s.name)
              ),
            };
          }
          return null;
        })
        .filter((c): c is SkillCategory => Boolean(c && c.skills.length > 0));
    }

    if (activeTab === 'Cloud & Databases') {
      return categories.filter((cat) => cat.id === 'database');
    }

    if (activeTab === 'Core Engineering & Tools') {
      return categories.filter((cat) => cat.id === 'devops' || cat.id === 'web');
    }

    return categories;
  }, [categories, activeTab]);

  const totalVisibleSkills = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [filteredCategories]);

  return (
    <section
      id="skills"
      className={`relative py-24 sm:py-32 bg-[#0d0604] text-[#fbf5ee] overflow-hidden ${className}`.trim()}
    >
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute top-1/3 -left-40 -z-10 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-40 -z-10 h-96 w-96 rounded-full bg-[#c0392b]/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="crimson" dot pulse className="mb-4">
            FULL STACK & SYSTEMS EXPERTISE
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fbf5ee] mb-6">
            Technical Capabilities &{' '}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f5cb78] to-[#e74c3c] bg-clip-text text-transparent">
              Systems Matrix
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#d8c8b8] leading-relaxed">
            Multi-domain competency breakdown spanning high-throughput backend services, applied AI
            and graph algorithms, normalized relational architectures, and core software engineering
            standards.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-col items-center mb-14">
          <div
            role="tablist"
            aria-label="Skills categories filter"
            className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-[#170c08]/90 backdrop-blur-md max-w-4xl"
          >
            {SKILL_FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(tab)}
                  className={`relative px-4 py-2 rounded-xl font-display text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60 ${
                    isActive
                      ? 'text-[#0d0604] font-semibold shadow-md'
                      : 'text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5cb78] to-[#d4af37]"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[#9e8779]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>
              Showing <strong className="text-[#f5cb78]">{totalVisibleSkills}</strong> skills across{' '}
              <strong className="text-[#fbf5ee]">{filteredCategories.length}</strong> functional
              domains
            </span>
          </div>
        </div>

        {/* Categories & Skill Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-3xl border border-white/10 bg-[#170c08]/80 p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between hover:border-[#d4af37]/30 transition-all duration-300"
              >
                {/* Category Header */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f5cb78]">
                        {getCategoryIcon(category.id)}
                      </div>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#fbf5ee]">
                          {category.title}
                        </h3>
                        <span className="font-mono text-xs text-[#9e8779]">
                          {category.skills.length} Specialized Capabilities
                        </span>
                      </div>
                    </div>

                    {category.badge && (
                      <Badge
                        variant={
                          category.id === 'python'
                            ? 'crimson'
                            : category.id === 'java' || category.id === 'database'
                            ? 'gold'
                            : 'obsidian'
                        }
                        size="sm"
                      >
                        {category.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`group relative rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                          skill.highlight
                            ? 'border-[#d4af37]/35 bg-gradient-to-br from-[#1c0f0a] to-[#24130d] shadow-[0_0_15px_rgba(212,175,55,0.06)] hover:border-[#d4af37]/60'
                            : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="shrink-0 p-1.5 rounded-lg bg-white/[0.04] border border-white/5 group-hover:scale-105 transition-transform duration-200">
                                {renderSkillIcon(skill.icon)}
                              </span>
                              <h4 className="font-display text-sm font-bold text-[#fbf5ee] group-hover:text-[#f5cb78] transition-colors">
                                {skill.name}
                              </h4>
                            </div>

                            {skill.highlight && (
                              <Badge variant="gold" size="sm" className="text-[10px] px-1.5 py-0">
                                Core
                              </Badge>
                            )}
                          </div>

                          <p className="font-mono text-xs text-[#9e8779] leading-relaxed mb-4">
                            {skill.sub}
                          </p>
                        </div>

                        {/* Proficiency Level Bar */}
                        {typeof skill.level === 'number' && (
                          <div className="pt-2 border-t border-white/5">
                            <div className="flex items-center justify-between font-mono text-[11px] mb-1.5">
                              <span className="text-[#9e8779]">Proficiency</span>
                              <span className="font-semibold text-[#f5cb78]">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${
                                  skill.highlight
                                    ? 'bg-gradient-to-r from-[#d4af37] via-[#f5cb78] to-[#e74c3c]'
                                    : 'bg-gradient-to-r from-[#d4af37]/80 to-[#f5cb78]'
                                }`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

SkillsMatrix.displayName = 'SkillsMatrix';
