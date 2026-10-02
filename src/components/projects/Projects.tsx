import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ArchitectureModal } from './ArchitectureModal';
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
      className={`relative py-24 md:py-32 bg-[#F5EFE1] overflow-hidden ${className}`.trim()}
      aria-label="Featured Systems Showcase"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#8B9A6E]" />
            <span className="font-mono text-xs font-bold text-[#8B9A6E] uppercase tracking-widest">
              04 // Featured Systems
            </span>
            <span className="h-px w-6 bg-[#8B9A6E]" />
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#010736] tracking-tight leading-tight mb-4">
            Production Systems{' '}
            <span className="text-[#800020]">Showcase</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#2C3352]/80 leading-relaxed font-sans">
            Production-grade backends, high-throughput distributed screening pipelines, and
            graph algorithmic engines engineered with strict MVC separation, normalized relational
            schemas, and measured latency benchmarks.
          </p>

          {/* Category Filter Tabs */}
          <div
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
                      ? 'bg-[#800020] text-white font-semibold shadow-sm scale-[1.02]'
                      : 'bg-white text-[#2C3352] border border-[#E5D3AF] hover:border-[#DB9558] hover:text-[#010736]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{opt.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#E5D3AF]/50 text-[#2C3352]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
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

        {/* Empty State Fallback */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-[#2C3352]/70 bg-white rounded-2xl border border-dashed border-[#E5D3AF]">
            <Layers className="w-10 h-10 mx-auto text-[#8B9A6E] mb-3" />
            <p className="text-base font-display font-medium text-[#010736]">
              No architecture systems found in this category.
            </p>
            <p className="text-xs font-mono mt-1 text-[#6B7280]">
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
