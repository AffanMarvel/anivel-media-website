'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface DepthCarouselItemObject {
  image?: string;
  video?: string;
  title?: string;
  subtitle?: string;
  category?: string;
  alt?: string;
  onClick?: () => void;
}

export type DepthCarouselItem = string | DepthCarouselItemObject;
type TiltDirection = 'left' | 'right';

export interface DepthCarouselProps {
  items?: DepthCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: TiltDirection;
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onItemClick?: (item: DepthCarouselItemObject, index: number) => void;
  onChange?: (index: number, item: DepthCarouselItemObject) => void;
  className?: string;
}

interface DragState {
  startX: number;
  lastX: number;
  moved: boolean;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const normalizeItem = (it: DepthCarouselItem): DepthCarouselItemObject =>
  typeof it === 'string' ? { image: it, title: '', alt: '' } : it;

const DepthCardMedia: React.FC<{
  video?: string;
  image?: string;
  title?: string;
  isCurrent: boolean;
  isInView: boolean;
}> = ({ video, image, title, isCurrent, isInView }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlay = isCurrent && isInView;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (shouldPlay) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [shouldPlay]);

  if (video) {
    return (
      <video
        ref={videoRef}
        src={video}
        poster={image}
        loop
        muted
        playsInline
        preload="none"
        className="w-full h-full object-cover select-none pointer-events-none brightness-105 contrast-105"
      />
    );
  }

  return (
    <img
      src={image || ''}
      alt={title || ''}
      draggable={false}
      loading="lazy"
      className="w-full h-full object-cover select-none"
    />
  );
};

export const DepthCarousel: React.FC<DepthCarouselProps> = ({
  items = [],
  cardWidth = 320,
  cardHeight = 440,
  radius = 20,
  tint = '#05060a',
  depth = 240,
  spread = 110,
  tilt = 24,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.22,
  blur = 6,
  autoplay = false,
  autoplayDelay = 3500,
  loop = true,
  showControls = true,
  showIndicators = true,
  onItemClick,
  onChange,
  className = '',
}) => {
  const data = useMemo(() => (Array.isArray(items) ? items : []).map(normalizeItem), [items]);
  const count = data.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const activeIndexRef = useRef(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragRef = useRef<DragState | null>(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const posRef = useRef(0);
  const targetPosRef = useRef(0);

  // Viewport intersection gating: pause video decoding & rendering when carousel is scrolled offscreen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Update layout positions
  const updateLayout = useCallback(
    (currentPos: number) => {
      const n = count;
      if (!n) return;
      const dir = tiltDirection === 'left' ? -1 : 1;

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let d = i - currentPos;
        if (loop && n > 1) {
          d = ((d % n) + n) % n;
          if (d > n / 2) d -= n;
        }

        const back = Math.max(0, d);
        const az = Math.abs(d);
        const shown = az <= visibleCards + 0.6;

        const tz = -depth * d;
        const tx = dir * spread * d;
        const ry = dir * tilt * clamp(d, 0, 1.2);

        let opacity = d < 0 ? Math.max(0, 1 + d * 1.5) : 1;
        if (!shown) opacity = 0;

        const brightness = Math.max(0.2, 1 - back * falloff);
        const blurPx = blur > 0 ? Math.min(blur, (back / Math.max(1, visibleCards)) * blur) : 0;
        const zi = Math.round(2000 - d * 25);

        el.style.transform = `translate(-50%, -50%) translate3d(${tx.toFixed(2)}px, 0px, ${tz.toFixed(
          2
        )}px) rotateY(${ry.toFixed(2)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `brightness(${brightness.toFixed(3)}) ${
          blurPx > 0.5 ? `blur(${blurPx.toFixed(1)}px)` : ''
        }`;
        el.style.zIndex = `${zi}`;
        el.style.pointerEvents = Math.abs(d) < 0.35 ? 'auto' : 'none';
      }
    },
    [count, depth, falloff, loop, spread, tilt, tiltDirection, visibleCards, blur]
  );

  // Smooth lerp loop
  useEffect(() => {
    // Run initial layout immediately so cards are positioned correctly on frame 0
    updateLayout(posRef.current);

    let active = true;

    const tick = () => {
      if (!active) return;
      const diff = targetPosRef.current - posRef.current;
      if (Math.abs(diff) > 0.001) {
        posRef.current += diff * 0.18; // smooth spring lerp
        updateLayout(posRef.current);
      } else if (posRef.current !== targetPosRef.current) {
        posRef.current = targetPosRef.current;
        updateLayout(posRef.current);
      }

      // Continuously synchronize activeIndex so the front-facing card is always recognized and plays video
      if (count > 0) {
        const curIdx = ((Math.round(posRef.current) % count) + count) % count;
        if (curIdx !== activeIndexRef.current) {
          activeIndexRef.current = curIdx;
          setActiveIndex(curIdx);
          if (onChange && data[curIdx]) {
            onChange(curIdx, data[curIdx]);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateLayout, count, data, onChange]);

  const goTo = useCallback(
    (index: number) => {
      let target = index;
      if (loop && count > 1) {
        let diff = (target - targetPosRef.current) % count;
        if (diff > count / 2) diff -= count;
        if (diff < -count / 2) diff += count;
        target = targetPosRef.current + diff;
      }
      targetPosRef.current = target;
      const realIndex = ((Math.round(target) % count) + count) % count;
      setActiveIndex(realIndex);
      if (onChange && data[realIndex]) {
        onChange(realIndex, data[realIndex]);
      }
    },
    [count, data, loop, onChange]
  );

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || count <= 1) return;
    autoTimerRef.current = setInterval(next, autoplayDelay);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [autoplay, autoplayDelay, count, next]);

  // Drag / Swipe handling
  const handlePointerDown = (e: ReactPointerEvent) => {
    dragRef.current = {
      startX: e.clientX,
      lastX: e.clientX,
      moved: false,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (!dragRef.current) return;
    const delta = e.clientX - dragRef.current.lastX;
    if (Math.abs(e.clientX - dragRef.current.startX) > 6) {
      dragRef.current.moved = true;
    }
    dragRef.current.lastX = e.clientX;
    targetPosRef.current -= delta * 0.007; // drag sensitivity
  };

  const handlePointerUp = (e: ReactPointerEvent) => {
    if (!dragRef.current) return;
    const moved = dragRef.current.moved;
    dragRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}

    if (moved) {
      // Snap to nearest integer index
      const snapTarget = Math.round(targetPosRef.current);
      goTo(snapTarget);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-[520px] sm:h-[600px] flex items-center justify-center select-none overflow-hidden outline-none ${className}`}
      style={{
        perspective: `${perspective}px`,
        touchAction: 'pan-y',
      }}
    >
      {/* 3D Depth Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {data.map((item, idx) => {
          const isCurrent = idx === activeIndex;

          return (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => {
                if (isCurrent) {
                  if (item.onClick) item.onClick();
                  else if (onItemClick) onItemClick(item, idx);
                } else {
                  goTo(idx);
                }
              }}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${radius}px`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transformOrigin: '50% 50%',
                willChange: 'transform, opacity, filter',
                cursor: isCurrent ? 'pointer' : 'default',
              }}
              className="group/card rounded-[22px] border border-white/15 bg-[#08080D] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] transition-shadow duration-300 hover:border-crimson/70 hover:shadow-[0_25px_70px_-10px_rgba(203,41,87,0.35)]"
            >
              {/* Card Video or Image Media: Real client video streams directly without stock photos */}
              <DepthCardMedia
                video={item.video}
                image={item.image}
                title={item.title || item.alt}
                isCurrent={isCurrent}
                isInView={isInView}
              />

              {/* Real Video Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson/50 bg-black/75 backdrop-blur-md px-3 py-1 font-mono text-[9px] font-bold text-rose-200 shadow-[0_0_12px_rgba(203,41,87,0.4)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                  REAL CLIENT SHOOT
                </span>
              </div>

              {/* Clean bottom gradient for crisp text legibility without darkening the video */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

              {/* Crimson Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#CB2957]" />

              {/* Card Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 space-y-2 z-10 pointer-events-none">
                {item.category && (
                  <span className="inline-block rounded-[5px] border border-white/15 bg-black/70 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-rose-200">
                    {item.category}
                  </span>
                )}
                {item.title && (
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight drop-shadow-lg">
                    {item.title}
                  </h3>
                )}
                {item.subtitle && (
                  <p className="font-mono text-xs text-zinc-200 leading-snug drop-shadow-md">
                    {item.subtitle}
                  </p>
                )}
                <div className="pt-2 flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-wider text-crimson">
                  <span>Explore Shoot Unit &rarr;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls: Prev / Next buttons */}
      {showControls && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous card"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition-all hover:border-crimson hover:bg-crimson hover:shadow-crimson-glow"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next card"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition-all hover:border-crimson hover:bg-crimson hover:shadow-crimson-glow"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Navigation Dots Indicator */}
      {showIndicators && count > 1 && (
        <div className="absolute bottom-5 inset-x-0 z-30 flex items-center justify-center gap-2 pointer-events-auto">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-7 bg-crimson shadow-[0_0_8px_#CB2957]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepthCarousel;
