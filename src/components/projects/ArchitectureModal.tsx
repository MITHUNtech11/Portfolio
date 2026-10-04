import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Github,
  Workflow,
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
  Info,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { ZoomPanViewer } from '../ui/ZoomPanViewer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Project, ArchitectureDiagram, PipelineStep, ProjectMetric, ProjectChallenge } from '../../types';

export interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  initialDiagramIndex?: number;
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
  Sparkles,
};

function resolveIcon(name?: string, className = 'w-4 h-4') {
  if (!name) return <Zap className={className} />;
  const Comp = ICON_MAP[name] || Zap;
  return <Comp className={className} />;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  project,
  initialDiagramIndex = 0,
}) => {
  const [activeDiagramIdx, setActiveDiagramIdx] = useState(initialDiagramIndex);
  const lastProjectRef = useRef<Project | null>(project);

  if (project) {
    lastProjectRef.current = project;
  }

  const displayProject = project || lastProjectRef.current;

  useEffect(() => {
    setActiveDiagramIdx(initialDiagramIndex);
  }, [project, initialDiagramIndex, isOpen]);

  if (!displayProject) {
    return (
      <Modal isOpen={false} onClose={onClose}>
        <div />
      </Modal>
    );
  }

  const diagrams = displayProject.diagrams || [];
  const safeIdx = Math.min(Math.max(activeDiagramIdx, 0), Math.max(diagrams.length - 1, 0));
  const currentDiagram: ArchitectureDiagram | undefined = diagrams[safeIdx];

  const modalTitleNode = (
    <span className="flex flex-wrap items-center gap-2.5">
      <Badge
        variant="navy"
        size="sm"
        className="font-mono text-[10px] tracking-wider uppercase bg-[#E5D3AF]/50 dark:bg-[#111C40] border-[#E5D3AF] dark:border-[#E5D3AF]/15 text-[#010736] dark:text-[#F5EFE1]"
      >
        SYSTEM {displayProject.number}
      </Badge>
      <span className="font-display font-bold text-lg md:text-xl text-[#010736] dark:text-[#F5EFE1]">
        {displayProject.title}
      </span>
    </span>
  );

  const modalDescNode = (
    <span className="font-mono text-xs text-[#800020] dark:text-[#F5A663] font-semibold tracking-wide uppercase">
      {displayProject.label}
    </span>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitleNode}
      description={modalDescNode}
      size="full"
      className="bg-white dark:bg-[#0B132B] border-[#E5D3AF] dark:border-[#E5D3AF]/20"
    >
      <div className="space-y-8 pb-4 text-[#2C3352] dark:text-[#C5CEE0]">
        {/* Top Architecture Overview */}
        <section className="bg-[#F5EFE1]/70 dark:bg-[#050B20]/60 p-5 sm:p-6 rounded-2xl border border-[#E5D3AF] dark:border-[#E5D3AF]/15">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#010736] dark:text-[#F5EFE1] mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#8B9A6E] dark:text-[#A2B784]" />
                Architectural Overview
              </h3>
              <p className="text-sm text-[#2C3352]/85 dark:text-[#C5CEE0]/85 leading-relaxed">
                {displayProject.overview || displayProject.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {displayProject.github && (
                <Button
                  variant="outline"
                  size="sm"
                  href={displayProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<Github className="w-4 h-4" />}
                  className="font-mono text-xs"
                >
                  GitHub Source
                </Button>
              )}
              {displayProject.demoUrl && (
                <Button
                  variant="primary"
                  size="sm"
                  href={displayProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                  className="font-mono text-xs"
                >
                  Live System
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Tabbed Interactive Architecture Diagram Section */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[#E5D3AF] dark:border-[#E5D3AF]/15">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-[#800020] dark:text-[#F5A663]" />
              <h3 className="font-display font-bold text-base sm:text-lg text-[#010736] dark:text-[#F5EFE1]">
                Interactive Architecture Lightbox
              </h3>
            </div>

            {/* Diagram Selector Tabs */}
            {diagrams.length > 1 && (
              <div
                role="tablist"
                aria-label="Architecture Diagrams"
                className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#F5EFE1] dark:bg-[#050B20] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 rounded-xl"
              >
                {diagrams.map((diag, dIdx) => {
                  const isActive = dIdx === safeIdx;
                  return (
                    <button
                      key={dIdx}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`diagram-panel-${dIdx}`}
                      id={`diagram-tab-${dIdx}`}
                      type="button"
                      onClick={() => setActiveDiagramIdx(dIdx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#800020] dark:bg-[#C72C48] text-white font-bold shadow-xs'
                          : 'text-[#2C3352] dark:text-[#C5CEE0] hover:text-[#010736] dark:hover:text-[#F5EFE1] hover:bg-[#E5D3AF]/40 dark:hover:bg-[#111C40]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                      <span>{diag.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Interactive Zoom/Pan Canvas */}
          {currentDiagram ? (
            <div
              role="tabpanel"
              id={`diagram-panel-${safeIdx}`}
              aria-labelledby={`diagram-tab-${safeIdx}`}
              className="rounded-xl overflow-hidden border border-[#E5D3AF] dark:border-[#E5D3AF]/15 bg-[#F5EFE1] dark:bg-[#050B20] shadow-md"
            >
              <ZoomPanViewer
                key={`${displayProject.id}-${safeIdx}-${currentDiagram.src}`}
                src={currentDiagram.src}
                alt={currentDiagram.title}
                caption={currentDiagram.caption}
                className="h-[380px] sm:h-[460px] md:h-[540px] lg:h-[580px]"
                initialScale={1}
                minScale={0.5}
                maxScale={4}
              />
              <div className="px-4 py-2.5 bg-white dark:bg-[#0B132B] border-t border-[#E5D3AF] dark:border-[#E5D3AF]/15 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#6B7280] dark:text-[#8C9BB5]">
                <div className="flex items-center gap-2">
                  <span className="text-[#010736] dark:text-[#F5EFE1] font-semibold">{currentDiagram.title}:</span>
                  <span className="text-[#2C3352] dark:text-[#C5CEE0] line-clamp-1">{currentDiagram.caption}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[#6B7280] dark:text-[#8C9BB5] text-[11px]">
                  <span>Scroll to zoom</span>
                  <span>•</span>
                  <span>Drag to pan</span>
                  <span>•</span>
                  <span>Double-click to reset</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center rounded-xl bg-[#F5EFE1] dark:bg-[#050B20] border border-dashed border-[#E5D3AF] dark:border-[#E5D3AF]/20 text-sm text-[#6B7280] dark:text-[#8C9BB5]">
              No architecture diagram available for this system.
            </div>
          )}
        </section>

        {/* 4-Step Visual Pipeline Flow */}
        {displayProject.pipeline && displayProject.pipeline.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#8B9A6E] dark:text-[#A2B784]" />
              <h3 className="font-display font-bold text-base sm:text-lg text-[#010736] dark:text-[#F5EFE1]">
                End-to-End Pipeline Execution Flow
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative">
              {displayProject.pipeline.map((step: PipelineStep, sIdx: number) => (
                <div
                  key={sIdx}
                  className="relative p-4 rounded-xl bg-[#F5EFE1]/60 dark:bg-[#050B20]/60 border border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-xs hover:border-[#DB9558] dark:hover:border-[#F5A663]/40 transition-all flex flex-col group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 text-[#800020] dark:text-[#F5A663] group-hover:scale-105 transition-all shadow-xs">
                      {resolveIcon(step.icon, 'w-4 h-4')}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#8B9A6E] dark:text-[#A2B784]">
                      STEP 0{sIdx + 1}
                    </span>
                  </div>

                  <h4 className="font-display font-semibold text-sm sm:text-base text-[#010736] dark:text-[#F5EFE1] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#2C3352]/75 dark:text-[#C5CEE0]/75 leading-relaxed mt-auto">
                    {step.sub}
                  </p>

                  {sIdx < displayProject.pipeline.length - 1 && (
                    <div
                      className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 items-center justify-center text-[#800020] dark:text-[#F5A663] shadow-sm pointer-events-none"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engineered Metrics Benchmarks Grid */}
        {displayProject.metrics && displayProject.metrics.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#800020] dark:text-[#F5A663]" />
              <h3 className="font-display font-bold text-base sm:text-lg text-[#010736] dark:text-[#F5EFE1]">
                Engineered Performance Benchmarks
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {displayProject.metrics.map((metric: ProjectMetric, mIdx: number) => (
                <div
                  key={mIdx}
                  className="p-4 rounded-xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 flex flex-col justify-between shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-md bg-[#E5D3AF]/40 dark:bg-[#111C40] text-[#800020] dark:text-[#F5A663]">
                      {resolveIcon(metric.icon, 'w-4 h-4')}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-xl sm:text-2xl text-[#800020] dark:text-[#F5A663] tracking-tight">
                    {metric.num}
                  </div>
                  <div className="text-xs text-[#2C3352]/75 dark:text-[#C5CEE0]/80 mt-1 font-sans">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Architectural Challenges & Solutions */}
        {displayProject.challenges && displayProject.challenges.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8B9A6E] dark:text-[#A2B784]" />
              <h3 className="font-display font-bold text-base sm:text-lg text-[#010736] dark:text-[#F5EFE1]">
                Architectural Challenges &amp; Engineering Decisions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayProject.challenges.map((challenge: ProjectChallenge, cIdx: number) => (
                <div
                  key={cIdx}
                  className="p-5 rounded-xl bg-white dark:bg-[#0B132B] border-l-3 border-l-[#800020] dark:border-l-[#C72C48] border-y border-r border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-xs flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#800020] dark:text-[#F5A663]">
                      Decision 0{cIdx + 1}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#010736] dark:text-[#F5EFE1] mb-2">
                    {challenge.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#2C3352]/75 dark:text-[#C5CEE0]/80 leading-relaxed">
                    {challenge.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack Chips & Modal Footer */}
        <section className="pt-6 border-t border-[#E5D3AF] dark:border-[#E5D3AF]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 max-w-2xl">
            <span className="text-xs font-mono text-[#6B7280] dark:text-[#8C9BB5] mr-2">Technologies:</span>
            {(displayProject.tags || []).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#E5D3AF]/40 dark:bg-[#111C40] text-[#010736] dark:text-[#F5EFE1] border border-[#E5D3AF] dark:border-[#E5D3AF]/15"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {displayProject.github && (
              <Button
                variant="primary"
                size="sm"
                href={displayProject.github}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<Github className="w-4 h-4" />}
                className="font-mono text-xs"
              >
                Repository
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="font-mono text-xs"
            >
              Close
            </Button>
          </div>
        </section>
      </div>
    </Modal>
  );
};

ArchitectureModal.displayName = 'ArchitectureModal';
export default ArchitectureModal;
