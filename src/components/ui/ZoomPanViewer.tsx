import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

export interface ZoomPanViewerProps {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
}

interface Point {
  x: number;
  y: number;
}

export const ZoomPanViewer: React.FC<ZoomPanViewerProps> = ({
  src,
  alt = 'Visual document viewer',
  caption,
  className = '',
  initialScale = 1,
  minScale = 0.5,
  maxScale = 4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(initialScale);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active pointers for multi-touch pinch & pan
  const pointersRef = useRef<Map<number, Point>>(new Map());
  const dragStartRef = useRef<Point>({ x: 0, y: 0 });
  const initialDistanceRef = useRef<number | null>(null);
  const initialScaleOnPinchRef = useRef<number>(initialScale);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const clampScale = useCallback(
    (newScale: number) => Math.min(Math.max(newScale, minScale), maxScale),
    [minScale, maxScale]
  );

  const zoomIn = useCallback(() => {
    setScale((prev) => clampScale(prev * 1.25));
  }, [clampScale]);

  const zoomOut = useCallback(() => {
    setScale((prev) => clampScale(prev / 1.25));
  }, [clampScale]);

  const resetView = useCallback(() => {
    setScale(initialScale);
    setPosition({ x: 0, y: 0 });
  }, [initialScale]);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen toggle failed:', err);
    }
  }, []);

  // Handle active non-passive Wheel Zoom to prevent page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      setScale((prev) => clampScale(prev * zoomFactor));
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, [clampScale]);

  // Double Click to Toggle Zoom
  const handleDoubleClick = useCallback(() => {
    if (scale > 1.05) {
      resetView();
    } else {
      setScale(2);
    }
  }, [scale, resetView]);

  // Pointer Down
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with primary mouse button or touch
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    } else if (pointersRef.current.size === 2) {
      // Start pinch
      const points = Array.from(pointersRef.current.values()) as Point[];
      const dist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      initialDistanceRef.current = dist;
      initialScaleOnPinchRef.current = scale;
    }
  };

  // Pointer Move
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;

    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1 && isDragging) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    } else if (pointersRef.current.size === 2 && initialDistanceRef.current) {
      const points = Array.from(pointersRef.current.values()) as Point[];
      const currentDist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const scaleDelta = currentDist / initialDistanceRef.current;
      setScale(clampScale(initialScaleOnPinchRef.current * scaleDelta));
    }
  };

  // Pointer Up & Cancel
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);

    if (pointersRef.current.size === 0) {
      setIsDragging(false);
      initialDistanceRef.current = null;
    } else if (pointersRef.current.size === 1) {
      // Transition from pinch back to single finger drag
      const remaining = (Array.from(pointersRef.current.values()) as Point[])[0];
      dragStartRef.current = {
        x: remaining.x - position.x,
        y: remaining.y - position.y,
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[360px] sm:h-[460px] md:h-[560px] bg-[#0d0604] border border-[rgba(212,175,55,0.18)] rounded-xl overflow-hidden select-none touch-none flex flex-col justify-center items-center ${
        isFullscreen ? 'h-screen w-screen rounded-none border-none' : ''
      } ${className}`.trim()}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(212, 175, 55, 0.07) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Interactive canvas / image */}
      <div
        className={`w-full h-full flex items-center justify-center ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="max-w-none max-h-none object-contain pointer-events-none transition-transform will-change-transform"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            maxWidth: '90%',
            maxHeight: '90%',
          }}
        />
      </div>

      {/* Floating Controls Toolbar */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1.5 bg-[#170c08]/90 backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl shadow-xl"
      >
        <button
          type="button"
          onClick={zoomOut}
          disabled={scale <= minScale}
          title="Zoom out"
          aria-label="Zoom out"
          className="p-1.5 text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.08] active:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none rounded-lg transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="font-mono text-xs font-semibold px-2 py-0.5 text-[#f5cb78] min-w-[3.5rem] text-center select-none">
          {Math.round(scale * 100)}%
        </span>

        <button
          type="button"
          onClick={zoomIn}
          disabled={scale >= maxScale}
          title="Zoom in"
          aria-label="Zoom in"
          className="p-1.5 text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.08] active:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none rounded-lg transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-[rgba(212,175,55,0.2)] mx-0.5" />

        <button
          type="button"
          onClick={resetView}
          title="Reset zoom and position"
          aria-label="Reset zoom and position"
          className="p-1.5 text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.08] active:bg-white/[0.12] rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
          className="p-1.5 text-[#d8c8b8] hover:text-[#fbf5ee] hover:bg-white/[0.08] active:bg-white/[0.12] rounded-lg transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Optional Caption Overlay */}
      {caption && (
        <div className="absolute top-4 left-4 z-20 max-w-[80%] px-3 py-1.5 bg-[#170c08]/85 backdrop-blur-md border border-[rgba(212,175,55,0.2)] rounded-lg text-xs font-mono text-[#d8c8b8] shadow-lg pointer-events-none">
          {caption}
        </div>
      )}
    </div>
  );
};
