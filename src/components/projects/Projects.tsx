import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Layers, Workflow, Cpu, Sparkles, Filter } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ArchitectureModal } from './ArchitectureModal';
import { Badge } from '../ui/Badge';
import { projectsData as defaultProjects } from '../../data/projects';
import type { Project } from '../../types';

export interface ProjectsProps {
  projects?: Project[];
  className?: string;
}

type CategoryFilter = 'all' | 'python' | 'java' | 'dsa' | 'cloud';

interface FilterOption {
  id: CategoryFilter;
  label: string;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects = defaultProjects,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeDiagramIndex, setActiveDiagramIndex] = useState<number>(0);

  const filterOptions = useMemo<FilterOption[]>(() => {
    const base: FilterOption[] = [
      { id: 'all', label: 'All Architectures' },
      { id: 'python', label: 'Python & AI' },
      { id: 'java', label: 'Java & Cloud' },
      { id: 'dsa', label: 'DSA & Graph Engine' },
    ];
    if (projects.some((p) => p.category === 'cloud')) {
      base.push({ id: 'cloud', label: 'Cloud Architecture' });
    }
    return base;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const handleOpenModal = (project: Project, initialDiagramIndex = 0) => {
    setActiveProject(project);
    setActiveDiagramIndex(initialDiagramIndex);
  };

  const handleCloseModal = () => {
    setActiveProject(null);
  };

  return (
    <section
      id="projects"
      className={`relative py-24 md:py-32 bg-[#0d0604] overflow-hidden ${className}`.trim()}
      aria-label="Featured Systems Showcase"
    >
      {/* Background Decorative Mesh & Radial Glows */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[rgba(212,175,55,0.06)] via-[rgba(192,57,43,0.04)] to-transparent blur-[120px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[350px] bg-[rgba(212,175,55,0.03)] blur-[100px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mb-3"
          >
            <Badge
              variant="gold"
              size="sm"
              dot
              pulse
              className="px-3.5 py-1 tracking-wider uppercase font-mono shadow-[0_0_16px_rgba(212,175,55,0.15)]"
            >
              PRODUCTION SYSTEMS &amp; ARCHITECTURES
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#fbf5ee] tracking-tight leading-tight mb-4"
          >
            Featured Systems{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5cb78] to-[#d4af37]">
              Showcase
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#9e8779] leading-relaxed font-sans"
          >
            Production-grade backends, high-throughput distributed screening pipelines, and
            graph algorithmic engines engineered with strict MVC separation, normalized relational
            schemas, and measured latency benchmarks.
          </motion.p>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
            role="group"
            aria-label="Filter systems by category"
          >
            {filterOptions.map((opt) => {
              const isActive = selectedCategory === opt.id;
              const count =
                opt.id === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === opt.id).length;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedCategory(opt.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[rgba(212,175,55,0.22)] to-[rgba(212,175,55,0.1)] text-[#f5cb78] font-semibold border border-[rgba(212,175,55,0.45)] shadow-[0_0_16px_rgba(212,175,55,0.15)] scale-[1.02]'
                      : 'bg-[#170c08]/80 text-[#9e8779] border border-[rgba(212,175,55,0.12)] hover:border-[rgba(212,175,55,0.28)] hover:text-[#fbf5ee]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{opt.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[rgba(212,175,55,0.3)] text-[#f5cb78]'
                        : 'bg-white/[0.05] text-[#9e8779]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* Empty State Fallback (if any filter has 0 items) */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-[#9e8779] bg-[#170c08] rounded-2xl border border-dashed border-[rgba(212,175,55,0.2)]">
            <Layers className="w-10 h-10 mx-auto text-[#d4af37]/60 mb-3" />
            <p className="text-base font-display font-medium text-[#fbf5ee]">
              No architecture systems found in this category.
            </p>
            <p className="text-xs font-mono mt-1 text-[#9e8779]">
              Try selecting "All Architectures" to view full portfolio systems.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Architecture Lightbox Modal */}
      <ArchitectureModal
        isOpen={Boolean(activeProject)}
        onClose={handleCloseModal}
        project={activeProject}
        initialDiagramIndex={activeDiagramIndex}
      />
    </section>
  );
};

Projects.displayName = 'Projects';
export default Projects;
