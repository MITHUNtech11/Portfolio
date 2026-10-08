import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import {
  Terminal,
  Cpu,
  Layers,
  Database,
  Code2,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { skillsData } from '../../data/skills';
import { SkillCategory } from '../../types';
import { BlurHeading } from '../ui';

export const SKILL_FILTER_TABS = [
  'All',
  'Backend Systems',
  'AI & Machine Learning',
  'Cloud & Databases',
  'Core Engineering & Tools',
] as const;

export type SkillFilterTab = (typeof SKILL_FILTER_TABS)[number];

export const skillCategories = skillsData;

export interface SkillsMatrixProps {
  categories?: SkillCategory[];
  activeFilter?: SkillFilterTab;
  onFilterChange?: (tab: SkillFilterTab) => void;
  className?: string;
}

function renderSkillIcon(iconName?: string) {
  if (!iconName) {
    return <Code2 className="w-4 h-4 text-[#8B9A6E]" />;
  }
  const IconComponent = (LucideIcons as Record<string, any>)[iconName];
  if (IconComponent && (typeof IconComponent === 'object' || typeof IconComponent === 'function')) {
    return React.createElement(IconComponent, { className: 'w-4 h-4 text-[#8B9A6E]' });
  }
  return <Code2 className="w-4 h-4 text-[#8B9A6E]" />;
}

function getCategoryIcon(id: string) {
  switch (id) {
    case 'python':
      return <Terminal className="w-5 h-5 text-[#800020] dark:text-[#F5A663]" />;
    case 'java':
      return <Cpu className="w-5 h-5 text-[#800020] dark:text-[#F5A663]" />;
    case 'database':
      return <Database className="w-5 h-5 text-[#800020] dark:text-[#F5A663]" />;
    case 'web':
      return <Code2 className="w-5 h-5 text-[#800020] dark:text-[#F5A663]" />;
    case 'devops':
      return <Layers className="w-5 h-5 text-[#800020] dark:text-[#F5A663]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#800020] dark:text-[#F5A663]" />;
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
      className={`relative py-24 sm:py-32 bg-[#F5EFE1] dark:bg-[#050B20] text-[#010736] dark:text-[#F5EFE1] overflow-hidden transition-colors duration-300 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#8B9A6E] dark:bg-[#A2B784]" />
            <span className="font-mono text-xs font-bold text-[#8B9A6E] dark:text-[#A2B784] uppercase tracking-widest">
              03 // Technical Capabilities
            </span>
            <span className="h-px w-6 bg-[#8B9A6E] dark:bg-[#A2B784]" />
          </div>

          <BlurHeading className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#010736] dark:text-[#F5EFE1] mb-5">
            Technical Stack &amp;{' '}
            <span className="text-[#800020] dark:text-[#F5A663]">Systems Matrix</span>
          </BlurHeading>
          <p className="font-body text-base sm:text-lg text-[#2C3352]/80 dark:text-[#C5CEE0]/80 leading-relaxed">
            Multi-domain competency breakdown spanning high-throughput backend services, applied AI
            and graph algorithms, normalized relational architectures, and core software engineering
            standards.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-col items-center mb-14">
          <div
            role="tablist"
            aria-label="Skills categories filter"
            className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl border border-[#E5D3AF] dark:border-[#E5D3AF]/15 bg-white/80 dark:bg-[#0B132B]/80 backdrop-blur-sm max-w-4xl shadow-sm"
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
                  className={`relative px-4 py-2 rounded-xl font-display text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/40 dark:focus-visible:ring-[#F5A663]/40 ${
                    isActive
                      ? 'text-white font-semibold shadow-sm'
                      : 'text-[#2C3352] dark:text-[#C5CEE0] hover:text-[#010736] dark:hover:text-[#F5EFE1] hover:bg-[#E5D3AF]/40 dark:hover:bg-[#111C40]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-xl bg-[#800020] dark:bg-[#C72C48]"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[#2C3352]/70 dark:text-[#C5CEE0]/70">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B9A6E] dark:text-[#A2B784]" />
            <span>
              Categorizing <strong className="text-[#800020] dark:text-[#F5A663]">{totalVisibleSkills}</strong> skills across{' '}
              <strong className="text-[#010736] dark:text-[#F5EFE1]">{filteredCategories.length}</strong> functional domains
            </span>
          </div>
        </div>

        {/* Categories Grid (Clean Editorial Typography - No Percentage Bars, No Pills) */}
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
                className="rounded-3xl border border-[#E5D3AF] dark:border-[#E5D3AF]/15 bg-white dark:bg-[#0B132B] p-7 sm:p-8 shadow-[0_4px_20px_rgba(1,7,54,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:border-[#DB9558] dark:hover:border-[#F5A663]/40 transition-all duration-300"
              >
                {/* Category Header */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5D3AF] dark:border-[#E5D3AF]/15">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5D3AF] dark:border-[#E5D3AF]/15 bg-[#E5D3AF]/30 dark:bg-[#111C40] text-[#800020] dark:text-[#F5A663]">
                        {getCategoryIcon(category.id)}
                      </div>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#010736] dark:text-[#F5EFE1]">
                          {category.title}
                        </h3>
                        <span className="font-mono text-xs text-[#8B9A6E] dark:text-[#A2B784] font-medium">
                          {category.skills.length} Capabilities
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills List (Clean Minimal Editorial Structure) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3.5 rounded-xl border border-[#E5D3AF]/80 dark:border-[#E5D3AF]/15 bg-[#F5EFE1]/40 dark:bg-[#050B20]/50 hover:bg-white dark:hover:bg-[#111C40] hover:border-[#DB9558] dark:hover:border-[#F5A663]/40 transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <span className="shrink-0 p-1 rounded-lg bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-xs">
                            {renderSkillIcon(skill.icon)}
                          </span>
                          <h4 className="font-display text-sm font-bold text-[#010736] dark:text-[#F5EFE1]">
                            {skill.name}
                          </h4>
                        </div>
                        <p className="font-mono text-xs text-[#2C3352]/75 dark:text-[#C5CEE0]/70 leading-relaxed pl-7">
                          {skill.sub}
                        </p>
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
