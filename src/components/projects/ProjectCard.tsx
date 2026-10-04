import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Github,
  Workflow,
  Eye,
  Zap,
  FileText,
  Boxes,
  ShieldCheck,
  Database,
  Cloud,
  Gauge,
  Building,
  Route,
  Layers,
  Brain,
  FileUp,
  LayoutDashboard,
  CloudUpload,
  GitBranch,
  MapPin,
  Network,
} from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Project, ProjectMetric } from '../../types';

export interface ProjectCardProps {
  project: Project;
  onOpenModal?: (project: Project, initialDiagramIndex?: number) => void;
  className?: string;
  index?: number;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileUp,
  Brain,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  Database,
  CloudUpload,
  GitBranch,
  MapPin,
  Network,
  Route,
  Gauge,
  Zap,
  FileText,
  Boxes,
  Cloud,
  Building,
  Workflow,
};

function renderMetricIcon(iconName?: string, className = 'w-3.5 h-3.5') {
  if (!iconName) return <Zap className={className} />;
  const IconComponent = ICON_MAP[iconName] || Zap;
  return <IconComponent className={className} />;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenModal,
  className = '',
  index = 0,
}) => {
  const [imageError, setImageError] = useState(false);
  const primaryDiagram = project.diagrams?.[0];
  const hasValidImage = Boolean(primaryDiagram?.src) && !imageError;

  const handleOpenArchitecture = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onOpenModal?.(project, 0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className={`h-full flex flex-col ${className}`.trim()}
    >
      <TiltCard
        maxTilt={5}
        perspective={1200}
        glare={true}
        glareColor="rgba(229, 211, 175, 0.2)"
        glareSize={320}
        hoverScale={1.015}
        className="h-full flex flex-col"
      >
        <article
          className="relative flex flex-col h-full rounded-2xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 hover:border-[#DB9558] dark:hover:border-[#F5A663]/40 shadow-[0_4px_24px_rgba(1,7,54,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_rgba(1,7,54,0.08)] dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden group"
          aria-labelledby={`project-title-${project.id}`}
        >
          {/* Workflow Thumbnail Preview Container */}
          <div
            onClick={handleOpenArchitecture}
            className="relative w-full aspect-[16/10] bg-[#F5EFE1] dark:bg-[#050B20] border-b border-[#E5D3AF] dark:border-[#E5D3AF]/15 overflow-hidden cursor-pointer select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenArchitecture();
              }
            }}
            aria-label={`Open architecture lightbox for ${project.title}`}
          >
            {hasValidImage ? (
              <img
                src={primaryDiagram!.src}
                alt={primaryDiagram?.caption || `${project.title} architecture workflow`}
                className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-all duration-500 ease-out"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#E5D3AF]/20 dark:bg-[#111C40]/50 p-4 text-center">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 mb-2 text-[#800020] dark:text-[#F5A663] shadow-xs">
                  <Workflow className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-[#010736] dark:text-[#F5EFE1] font-semibold">{project.title}</span>
                <span className="font-sans text-[11px] text-[#6B7280] dark:text-[#8C9BB5] mt-0.5">Interactive Architecture</span>
              </div>
            )}

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
              <Badge
                variant="navy"
                size="sm"
                className="font-mono text-[10px] tracking-wider uppercase bg-white/95 dark:bg-[#0B132B]/95 border-[#E5D3AF] dark:border-[#E5D3AF]/15 text-[#010736] dark:text-[#F5EFE1] shadow-sm backdrop-blur-sm"
              >
                SYSTEM {project.number}
              </Badge>

              {project.diagrams && project.diagrams.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/95 dark:bg-[#0B132B]/95 text-[#2C3352] dark:text-[#C5CEE0] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-sm backdrop-blur-sm">
                  <Workflow className="w-3 h-3 text-[#DB9558] dark:text-[#F5A663]" />
                  <span>{project.diagrams.length} {project.diagrams.length === 1 ? 'Flow' : 'Flows'}</span>
                </span>
              )}
            </div>

            {/* Hover Floating Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#010736]/40 dark:bg-black/60 backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 text-xs font-mono font-semibold text-[#800020] dark:text-[#F5A663] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-3.5 h-3.5 text-[#800020] dark:text-[#F5A663]" />
                <span>Inspect Architecture</span>
              </span>
            </div>
          </div>

          {/* Card Body Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Category / Label */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-bold text-[#8B9A6E] dark:text-[#A2B784] tracking-wider uppercase">
                {project.label}
              </span>
            </div>

            {/* Title */}
            <h3
              id={`project-title-${project.id}`}
              className="font-display font-bold text-lg sm:text-xl text-[#010736] dark:text-[#F5EFE1] group-hover:text-[#800020] dark:group-hover:text-[#F5A663] transition-colors leading-snug mb-2.5 line-clamp-1"
            >
              {project.title}
            </h3>

            {/* Overview */}
            <p className="text-xs sm:text-sm text-[#2C3352]/75 dark:text-[#C5CEE0]/80 leading-relaxed line-clamp-3 mb-5 font-sans">
              {project.overview || project.description}
            </p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5 mb-5 p-3 rounded-xl bg-[#F5EFE1]/60 dark:bg-[#050B20]/60 border border-[#E5D3AF] dark:border-[#E5D3AF]/15">
                {project.metrics.slice(0, 4).map((metric: ProjectMetric, mIdx: number) => (
                  <div key={mIdx} className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-[#800020] dark:text-[#F5A663] truncate">
                      <span className="text-[#DB9558] dark:text-[#F5A663] shrink-0">
                        {renderMetricIcon(metric.icon, 'w-3.5 h-3.5')}
                      </span>
                      <span className="truncate">{metric.num}</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-sans text-[#6B7280] dark:text-[#8C9BB5] truncate mt-0.5" title={metric.label}>
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
              {(project.tags || []).slice(0, 5).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-[#E5D3AF]/40 dark:bg-[#111C40] text-[#010736] dark:text-[#F5EFE1] border border-[#E5D3AF] dark:border-[#E5D3AF]/15"
                >
                  {tag}
                </span>
              ))}
              {(project.tags || []).length > 5 && (
                <span className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-[#F5EFE1] dark:bg-[#050B20] text-[#6B7280] dark:text-[#8C9BB5] border border-[#E5D3AF] dark:border-[#E5D3AF]/15">
                  +{(project.tags || []).length - 5}
                </span>
              )}
            </div>

            {/* Card Footer Actions */}
            <div className="pt-4 border-t border-[#E5D3AF] dark:border-[#E5D3AF]/15 flex items-center justify-between gap-2.5">
              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenArchitecture}
                leftIcon={<Workflow className="w-3.5 h-3.5 shrink-0" />}
                className="flex-1 font-mono text-xs min-w-0"
                aria-label={`Open architecture deep dive for ${project.title}`}
              >
                <span className="truncate">Architecture</span>
              </Button>

              {project.github && (
                <Button
                  variant="outline"
                  size="sm"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<Github className="w-3.5 h-3.5" />}
                  className="font-mono text-xs px-3"
                  aria-label={`View ${project.title} on GitHub`}
                  title="View Repository on GitHub"
                >
                  GitHub
                </Button>
              )}

              {project.demoUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  className="font-mono text-xs px-2.5"
                  aria-label={`Open live demo for ${project.title}`}
                  title="Live Demo"
                >
                  Live
                </Button>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
};

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;
