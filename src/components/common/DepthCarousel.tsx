import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { type MotionValue, useMotionValue, useMotionValueEvent } from "framer-motion";
import "./DepthCarousel.css";

export interface DepthCarouselImageItem {
  image: string;
  alt?: string;
}

export type DepthCarouselItem = string | DepthCarouselImageItem;

const DEFAULT_ITEMS: DepthCarouselImageItem[] = [
  { image: "https://picsum.photos/seed/depth1/800/1000", alt: "Slide 1" },
  { image: "https://picsum.photos/seed/depth2/800/1000", alt: "Slide 2" },
  { image: "https://picsum.photos/seed/depth3/800/1000", alt: "Slide 3" },
  { image: "https://picsum.photos/seed/depth4/800/1000", alt: "Slide 4" },
  { image: "https://picsum.photos/seed/depth5/800/1000", alt: "Slide 5" },
  { image: "https://picsum.photos/seed/depth6/800/1000", alt: "Slide 6" },
];

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const normalizeItem = (it: DepthCarouselItem): DepthCarouselImageItem =>
  typeof it === "string" ? { image: it, alt: "" } : it;

export interface DepthCarouselProps<T = DepthCarouselItem> {
  items?: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: "left" | "right";
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onChange?: (index: number, item: T) => void;
  className?: string;
  scrollDriven?: boolean;
  positionMotionValue?: MotionValue<number>;
  controlledIndex?: number;
}

function DepthCarousel<T = DepthCarouselItem>({
  items = DEFAULT_ITEMS as T[],
  renderItem,
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = "#05060a",
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 700,
  ease = "power3.out",
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = "",
  scrollDriven = false,
  positionMotionValue,
  controlledIndex,
}: DepthCarouselProps<T>) {
  const data = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const count = data.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);
  const cfgRef = useRef({
    count: 0,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  });
  const onChangeRef = useRef(onChange);

  const dragRef = useRef<{
    x: number;
    startPos: number;
    lastX: number;
    lastT: number;
    v: number;
    moved: boolean;
    id: number;
  } | null>(null);
  const wheelAccumRef = useRef(0);
  const wheelLockRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedRef = useRef(false);
  const prevControlledRef = useRef<number | undefined>(undefined);
  const isControlled = controlledIndex !== undefined;

  const [active, setActive] = useState(0);
  const fallbackMotion = useMotionValue(0);
  const motionSource = positionMotionValue ?? fallbackMotion;

  onChangeRef.current = onChange;
  cfgRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  };

  const layout = useCallback((pos: number) => {
    const cfg = cfgRef.current;
    const n = cfg.count;
    if (!n) return;
    const dir = cfg.tiltDirection === "left" ? -1 : 1;
    const sc = scaleRef.current;

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let d = i - pos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const back = Math.max(0, d);
      const az = Math.abs(d);
      const shown = az <= cfg.visibleCards + 0.5;

      const tz = -cfg.depth * d;
      const tx = dir * cfg.spread * d;
      const ry = dir * cfg.tilt * clamp(d, 0, 1);

      let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.15, 1 - back * cfg.falloff);
      const blurPx =
        cfg.blur > 0
          ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur)
          : 0;
      const zi = Math.round(2000 - d * 20);

      el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      el.style.zIndex = String(zi);
      el.style.pointerEvents = shown && opacity > 0.05 ? "auto" : "none";

      const ov = overlayRefs.current[i];
      if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.25, 0, 0.86).toFixed(3);
    }
  }, []);

  const notify = useCallback(
    (idx: number) => {
      setActive(idx);
      onChangeRef.current?.(idx, data[idx]);
    },
    [data]
  );

  const clampPos = useCallback((pos: number) => {
    const cfg = cfgRef.current;
    const n = cfg.count;
    if (!n) return 0;
    if (cfg.loop) return pos;
    return clamp(pos, 0, n - 1);
  }, []);

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();
      const cfg = cfgRef.current;
      const bounded = clampPos(target);
      const proxy = { p: posRef.current };
      const dur = animate && !reducedRef.current ? cfg.duration / 1000 : 0;
      tweenRef.current = gsap.to(proxy, {
        p: bounded,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = cfg.count;
          if (n <= 0) return;
          if (cfg.loop) {
            posRef.current = ((posRef.current % n) + n) % n;
          } else {
            posRef.current = clamp(Math.round(posRef.current), 0, n - 1);
          }
          layout(posRef.current);
          wheelLockRef.current = false;
        },
      });
    },
    [layout, clampPos]
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const cfg = cfgRef.current;
      const n = cfg.count;
      if (!n) return;
      const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
      let delta = idx - posRef.current;
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [tweenTo, notify]
  );

  const navigateBy = useCallback(
    (step: number) => {
      const cfg = cfgRef.current;
      const next = focusRef.current + step;
      if (!cfg.loop && (next < 0 || next >= cfg.count)) return;
      setFocus(next, true);
    },
    [setFocus]
  );

  useEffect(() => {
    if (controlledIndex === undefined) {
      prevControlledRef.current = undefined;
      return;
    }
    if (prevControlledRef.current === controlledIndex) return;
    prevControlledRef.current = controlledIndex;
    tweenRef.current?.kill();
    wheelLockRef.current = false;
    setFocus(controlledIndex, true);
  }, [controlledIndex, setFocus]);

  useEffect(() => {
    if (controlledIndex === undefined) return;
    prevControlledRef.current = undefined;
  }, [count, controlledIndex]);

  useEffect(() => {
    if (!scrollDriven) return;
    posRef.current = 0;
    focusRef.current = 0;
    setActive(0);
    layout(0);
  }, [scrollDriven, count, layout]);

  useMotionValueEvent(motionSource, "change", (value) => {
    if (!scrollDriven || !positionMotionValue) return;
    posRef.current = value;
    layout(value);
    const idx = clamp(Math.round(value), 0, Math.max(0, count - 1));
    if (idx !== focusRef.current) {
      focusRef.current = idx;
      setActive(idx);
      onChangeRef.current?.(idx, data[idx]);
    }
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const cfg = cfgRef.current;
      const needed = cfg.cardWidth + Math.abs(cfg.spread) * 2 + (w < 640 ? 48 : 120);
      scaleRef.current = clamp(w / needed, w < 640 ? 0.28 : 0.4, 1);
      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [layout]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || scrollDriven || isControlled) return;
    const onWheel = (e: WheelEvent) => {
      const cfg = cfgRef.current;
      if (cfg.count < 2 || wheelLockRef.current) return;
      e.preventDefault();

      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const delta = e.deltaMode === 1 ? raw * 24 : raw;
      wheelAccumRef.current += delta;

      const threshold = 50;
      if (Math.abs(wheelAccumRef.current) < threshold) return;

      const direction = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;

      const next = focusRef.current + direction;
      if (!cfg.loop && (next < 0 || next >= cfg.count)) return;

      wheelLockRef.current = true;
      navigateBy(direction);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [navigateBy, scrollDriven, isControlled]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (scrollDriven) return;
    const cfg = cfgRef.current;
    if (cfg.count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: e.clientX,
      startPos: posRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId,
    };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (scrollDriven) return;
      const drag = dragRef.current;
      if (!drag) return;
      const cfg = cfgRef.current;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        if (!isControlled) rootRef.current?.setPointerCapture(drag.id);
      }
      if (isControlled || !drag.moved) return;
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;
      const next = drag.startPos - dx / stepPx;
      posRef.current = cfg.loop ? next : clamp(next, 0, cfg.count - 1);
      layout(posRef.current);
    },
    [layout, isControlled]
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const cfg = cfgRef.current;

    if (isControlled) {
      const dx = drag.lastX - drag.x;
      if (Math.abs(dx) > 22) {
        navigateBy(dx > 0 ? -1 : 1);
      }
      return;
    }

    const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
    const projected = posRef.current - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [setFocus, isControlled, navigateBy]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  const onCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved) return;
      setFocus(index, true);
    },
    [setFocus]
  );

  useEffect(() => {
    if (scrollDriven || isControlled) return;
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!autoplay || reducedRef.current || count < 2) return;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = setInterval(
        () => {
          if (hovered || focused) return;
          const cfg = cfgRef.current;
          if (!cfg.loop && focusRef.current >= cfg.count - 1) {
            stop();
            return;
          }
          navigateBy(1);
        },
        Math.max(cfgRef.current.autoplayDelay, 600)
      );
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    root?.addEventListener("mouseenter", onEnter);
    root?.addEventListener("mouseleave", onLeave);
    root?.addEventListener("focusin", onFocusIn);
    root?.addEventListener("focusout", onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener("mouseenter", onEnter);
      root?.removeEventListener("mouseleave", onLeave);
      root?.removeEventListener("focusin", onFocusIn);
      root?.removeEventListener("focusout", onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy, scrollDriven, isControlled]);

  useEffect(() => {
    layout(posRef.current);
  }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, cardWidth, cardHeight, radius, count]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    },
    []
  );

  const renderCardContent = (item: T, index: number) => {
    if (renderItem) return renderItem(item, index);
    const normalized = normalizeItem(item as DepthCarouselItem);
    return (
      <img
        className="depth-carousel__img"
        src={normalized.image}
        alt={normalized.alt || ""}
        draggable={false}
      />
    );
  };

  return (
    <div
      ref={rootRef}
      className={`depth-carousel${scrollDriven || isControlled ? " depth-carousel--scroll" : ""} ${className}`.trim()}
      style={{ "--dc-perspective": `${perspective}px` } as React.CSSProperties}
      role="group"
      aria-roledescription="carousel"
      aria-label="Depth carousel"
      tabIndex={scrollDriven ? -1 : 0}
      onPointerDown={scrollDriven ? undefined : onPointerDown}
      onPointerMove={scrollDriven ? undefined : onPointerMove}
      onPointerUp={scrollDriven ? undefined : onPointerEnd}
      onPointerCancel={scrollDriven ? undefined : onPointerEnd}
      onKeyDown={scrollDriven ? undefined : onKeyDown}
    >
      <div className="depth-carousel__stage" ref={stageRef}>
        {data.map((item, i) => (
          <div
            key={i}
            className="depth-carousel__card"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={active !== i}
            onClick={() => onCardClick(i)}
          >
            {renderCardContent(item, i)}
            <span
              className="depth-carousel__tint"
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              style={{ background: tint }}
            />
          </div>
        ))}
      </div>

      {showControls && !scrollDriven && count > 1 && (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            aria-label="Previous slide"
            disabled={!loop && active === 0}
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            aria-label="Next slide"
            disabled={!loop && active >= count - 1}
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="depth-carousel__dots" role="tablist" aria-label="Slides">
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`depth-carousel__dot${active === i ? " is-active" : ""}`}
              onClick={() => setFocus(i, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DepthCarousel;
