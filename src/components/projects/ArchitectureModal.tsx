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

  // Sync active diagram index when project or initial index changes
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
        variant="obsidian"
        size="sm"
        className="font-mono text-[10px] tracking-wider uppercase bg-[#0d0604] border-[rgba(212,175,55,0.3)] text-[#f5cb78]"
      >
        SYSTEM {displayProject.number}
      </Badge>
      <span className="font-display font-bold text-lg md:text-xl text-[#fbf5ee]">
        {displayProject.title}
      </span>
      {displayProject.featured && (
        <Badge variant="crimson" size="sm" dot pulse className="text-[10px]">
          FEATURED SYSTEM
        </Badge>
      )}
    </span>
  );

  const modalDescNode = (
    <span className="font-mono text-xs text-[#d4af37] tracking-wide uppercase">
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
      className="bg-[#120906] border-[rgba(212,175,55,0.28)]"
    >
      <div className="space-y-8 pb-4 text-[#d8c8b8]">
        {/* Top Architecture Overview & Summary */}
        <section className="bg-[#170c08] p-5 sm:p-6 rounded-2xl border border-[rgba(212,175,55,0.15)] shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <h3 className="font-display font-semibold text-base sm:text-lg text-[#fbf5ee] mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#d4af37]" />
                Architectural Overview
              </h3>
              <p className="text-sm text-[#d8c8b8] leading-relaxed">
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
                  variant="gold"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[rgba(212,175,55,0.12)]">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-[#d4af37]" />
              <h3 className="font-display font-semibold text-base sm:text-lg text-[#fbf5ee]">
                Interactive Architecture Lightbox
              </h3>
            </div>

            {/* Diagram Selector Tabs */}
            {diagrams.length > 1 && (
              <div
                role="tablist"
                aria-label="Architecture Diagrams"
                className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#0d0604] border border-[rgba(212,175,55,0.18)] rounded-xl"
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
                          ? 'bg-[rgba(212,175,55,0.18)] text-[#f5cb78] font-bold border border-[rgba(212,175,55,0.4)] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                          : 'text-[#9e8779] hover:text-[#fbf5ee] hover:bg-white/[0.05]'
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
              className="rounded-xl overflow-hidden border border-[rgba(212,175,55,0.2)] bg-[#0d0604] shadow-2xl"
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
              <div className="px-4 py-2.5 bg-[#170c08] border-t border-[rgba(212,175,55,0.12)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#9e8779]">
                <div className="flex items-center gap-2">
                  <span className="text-[#f5cb78] font-semibold">{currentDiagram.title}:</span>
                  <span className="text-[#d8c8b8] line-clamp-1">{currentDiagram.caption}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[#9e8779]/80 text-[11px]">
                  <span>Scroll or pinch to zoom</span>
                  <span>•</span>
                  <span>Drag to pan</span>
                  <span>•</span>
                  <span>Double-click to reset</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center rounded-xl bg-[#0d0604] border border-dashed border-[rgba(212,175,55,0.2)] text-sm text-[#9e8779]">
              No architecture diagram available for this system.
            </div>
          )}
        </section>

        {/* 4-Step Visual Pipeline Flow */}
        {displayProject.pipeline && displayProject.pipeline.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#d4af37]" />
              <h3 className="font-display font-semibold text-base sm:text-lg text-[#fbf5ee]">
                End-to-End Pipeline Execution Flow
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative">
              {displayProject.pipeline.map((step: PipelineStep, sIdx: number) => (
                <div
                  key={sIdx}
                  className="relative p-4 rounded-xl bg-[#170c08] border border-[rgba(212,175,55,0.15)] shadow-sm hover:border-[rgba(212,175,55,0.35)] transition-all flex flex-col group"
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.2)] text-[#f5cb78] group-hover:scale-105 group-hover:border-[rgba(212,175,55,0.4)] transition-all">
                      {resolveIcon(step.icon, 'w-4 h-4')}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#d4af37]/60">
                      STEP 0{sIdx + 1}
                    </span>
                  </div>

                  {/* Step Title & Details */}
                  <h4 className="font-display font-semibold text-sm sm:text-base text-[#fbf5ee] mb-1 group-hover:text-[#f5cb78] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#9e8779] leading-relaxed mt-auto">
                    {step.sub}
                  </p>

                  {/* Visual Directional Flow Connectors between pipeline steps */}
                  {sIdx < displayProject.pipeline.length - 1 && (
                    <>
                      {/* Desktop horizontal flow connector */}
                      <div
                        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#120906] border border-[rgba(212,175,55,0.35)] items-center justify-center text-[#d4af37] shadow-md pointer-events-none"
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                      {/* Mobile/tablet vertical flow connector */}
                      <div
                        className="flex lg:hidden justify-center -mb-2 mt-2 text-[#d4af37]/50"
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </>
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
              <Gauge className="w-4 h-4 text-[#d4af37]" />
              <h3 className="font-display font-semibold text-base sm:text-lg text-[#fbf5ee]">
                Engineered Performance &amp; Scalability Benchmarks
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {displayProject.metrics.map((metric: ProjectMetric, mIdx: number) => (
                <div
                  key={mIdx}
                  className="p-4 rounded-xl bg-[#170c08] border border-[rgba(212,175,55,0.15)] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-md bg-[rgba(212,175,55,0.06)] text-[#d4af37]">
                      {resolveIcon(metric.icon, 'w-4 h-4')}
                    </span>
                    <span className="relative flex h-2 w-2" title="Benchmark verified">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                  </div>
                  <div className="font-mono font-bold text-xl sm:text-2xl text-[#f5cb78] tracking-tight">
                    {metric.num}
                  </div>
                  <div className="text-xs text-[#9e8779] mt-1 font-sans">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Architectural Challenges & Solutions Deep Dive */}
        {displayProject.challenges && displayProject.challenges.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <h3 className="font-display font-semibold text-base sm:text-lg text-[#fbf5ee]">
                Architectural Challenges &amp; Engineering Decisions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayProject.challenges.map((challenge: ProjectChallenge, cIdx: number) => (
                <div
                  key={cIdx}
                  className="p-5 rounded-xl bg-[#170c08] border-l-2 border-l-[#d4af37] border-y border-r border-[rgba(212,175,55,0.12)] shadow-sm flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#f5cb78]">
                      Decision 0{cIdx + 1}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#fbf5ee] mb-2">
                    {challenge.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9e8779] leading-relaxed">
                    {challenge.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack Pills & Modal Footer */}
        <section className="pt-6 border-t border-[rgba(212,175,55,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 max-w-2xl">
            <span className="text-xs font-mono text-[#9e8779] mr-2">Technologies:</span>
            {(displayProject.tags || []).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-[#d8c8b8] border border-[rgba(212,175,55,0.12)]"
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
