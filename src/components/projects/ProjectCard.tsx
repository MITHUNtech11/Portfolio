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
        maxTilt={6}
        perspective={1200}
        glare={true}
        glareColor="rgba(212, 175, 55, 0.08)"
        glareSize={320}
        hoverScale={1.01}
        className="h-full flex flex-col"
      >
        <article
          className="relative flex flex-col h-full rounded-2xl bg-[#170c08] border border-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.4)] shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.12)] transition-all duration-300 overflow-hidden group"
          aria-labelledby={`project-title-${project.id}`}
        >
          {/* Subtle Ambient Card Top Gradient Accent */}
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />

          {/* Workflow Thumbnail Preview Container */}
          <div
            onClick={handleOpenArchitecture}
            className="relative w-full aspect-[16/10] bg-[#0d0604] border-b border-[rgba(212,175,55,0.12)] overflow-hidden cursor-pointer select-none"
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
            {/* Diagram Image Thumbnail or Branded Fallback */}
            {hasValidImage ? (
              <img
                src={primaryDiagram!.src}
                alt={primaryDiagram?.caption || `${project.title} architecture workflow`}
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#170c08] to-[#0d0604] p-4 text-center">
                <div className="p-2.5 rounded-xl bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.2)] mb-2 text-[#d4af37]">
                  <Workflow className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-[#f5cb78] font-semibold">{project.title}</span>
                <span className="font-sans text-[11px] text-[#9e8779] mt-0.5">Interactive Workflow Architecture</span>
              </div>
            )}

            {/* Depth Gradient Mask */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#170c08] via-[#170c08]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Badges Bar */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
              <div className="flex items-center gap-2">
                <Badge
                  variant="obsidian"
                  size="sm"
                  className="font-mono text-[10px] tracking-wider uppercase bg-[#0d0604]/90 border-[rgba(212,175,55,0.25)] text-[#f5cb78] backdrop-blur-md shadow-md"
                >
                  SYSTEM {project.number}
                </Badge>
                {project.featured && (
                  <Badge
                    variant="crimson"
                    size="sm"
                    dot
                    pulse
                    className="font-mono text-[10px] tracking-wider bg-[#c0392b]/80 text-white border-transparent backdrop-blur-md shadow-md"
                  >
                    FEATURED
                  </Badge>
                )}
              </div>

              {project.diagrams && project.diagrams.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#0d0604]/85 text-[#d8c8b8] border border-[rgba(212,175,55,0.2)] backdrop-blur-md shadow-md">
                  <Workflow className="w-3 h-3 text-[#d4af37]" />
                  <span>{project.diagrams.length} {project.diagrams.length === 1 ? 'Flow' : 'Flows'}</span>
                </span>
              )}
            </div>

            {/* Hover Floating Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#0d0604]/40 backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#170c08]/95 border border-[#d4af37]/60 text-xs font-mono font-semibold text-[#f5cb78] shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.3)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Inspect Architecture</span>
              </span>
            </div>
          </div>

          {/* Card Body Content */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col">
            {/* Project Category / Technical Label */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold text-[#d4af37] tracking-wider uppercase">
                {project.label}
              </span>
            </div>

            {/* Title */}
            <h3
              id={`project-title-${project.id}`}
              className="font-display font-bold text-lg sm:text-xl text-[#fbf5ee] group-hover:text-[#f5cb78] transition-colors leading-snug mb-2.5 line-clamp-1"
            >
              {project.title}
            </h3>

            {/* Overview Snippet */}
            <p className="text-xs sm:text-sm text-[#9e8779] leading-relaxed line-clamp-3 mb-5 font-sans">
              {project.overview || project.description}
            </p>

            {/* Key Metrics Callouts Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5 mb-5 p-3 rounded-xl bg-[#120906] border border-[rgba(212,175,55,0.12)]">
                {project.metrics.slice(0, 4).map((metric: ProjectMetric, mIdx: number) => (
                  <div key={mIdx} className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-[#f5cb78] truncate">
                      <span className="text-[#d4af37]/80 shrink-0">
                        {renderMetricIcon(metric.icon, 'w-3.5 h-3.5')}
                      </span>
                      <span className="truncate">{metric.num}</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-sans text-[#9e8779] truncate mt-0.5" title={metric.label}>
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
              {(project.tags || []).slice(0, 5).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-white/[0.04] text-[#d8c8b8] border border-[rgba(212,175,55,0.12)] hover:border-[rgba(212,175,55,0.3)] hover:text-[#fbf5ee] transition-colors"
                >
                  {tag}
                </span>
              ))}
              {(project.tags || []).length > 5 && (
                <span className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-white/[0.02] text-[#9e8779] border border-white/5">
                  +{(project.tags || []).length - 5}
                </span>
              )}
            </div>

            {/* Card Footer Actions */}
            <div className="pt-4 border-t border-[rgba(212,175,55,0.12)] flex items-center justify-between gap-2.5">
              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenArchitecture}
                leftIcon={<Workflow className="w-3.5 h-3.5 shrink-0" />}
                className="flex-1 font-mono text-xs min-w-0"
                aria-label={`Open architecture deep dive for ${project.title}`}
              >
                <span className="truncate">Architecture Deep Dive</span>
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
