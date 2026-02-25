import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../lib/firebaseAnalytics";

import CHImg from "../images/projects/CH.png";
import CVImg from "../images/projects/CV.png";
import ECImg from "../images/projects/EC.png";
import EFImg from "../images/projects/EF.png";
import ICDImg from "../images/projects/ICD.png";
import ARROW from "../images/projects/arrow_forward.png";

const CARD_COLORS = {
  CV: "#00B6FF",
  EF: "#24CB71",
  ICD: "#E4FF97",
  CH: "#FF7237",
  EC: "#8AA7E6",
};

const PROJECTS = [
  { key: "CV", title: "World of CV", img: CVImg, href: "https://thilakvoruganti.github.io/CV/" },
  { key: "EF", title: "Ecoflights", img: EFImg, href: "https://flight-booking-pdmr.vercel.app/" },
  { key: "ICD", title: "ICD Prediction", img: ICDImg, href: "https://github.com/thilakvoruganti/ICD_Prediction" },
  { key: "CH", title: "Consistent Hashing", img: CHImg, href: "https://drive.google.com/file/d/1vJtMIJd0bWMe-Yc7GE6Vr9wXAFsqPulm/view?usp=sharing" },
  { key: "EC", title: "E-commerce", img: ECImg, href: "https://github.com/thilakvoruganti/e-commerce" },
];

export default function Projects() {
  const total = PROJECTS.length;
  const GAP = 30;

  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  const [containerW, setContainerW] = useState(0);
  const viewportRef = useRef(null);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!viewportRef.current) return;
    const el = viewportRef.current;
    const ro = new ResizeObserver((entries) => {
      const nextW = entries[0]?.contentRect?.width || 0;
      setContainerW(nextW);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layout = useMemo(() => {
    const visible = vw <= 1277 && vw >= 767 ? 3 : vw < 767 ? 1 : 4;
    const width = containerW || 1320;
    const cardW = Math.max(200, Math.floor((width - GAP * (visible - 1)) / visible));
    const cardH = Math.round(cardW * 1.14);
    const imgH = Math.round(cardW * 0.68);
    return { visible, cardW, cardH, imgH, step: cardW + GAP };
  }, [vw, containerW]);

  const [trackIndex, setTrackIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(null);
  const dragStartTimeRef = useRef(0);
  const dragDeltaXRef = useRef(0);
  const activePointerIdRef = useRef(null);
  const didDragRef = useRef(false);
  const MOUSE_DRAG_THRESHOLD = 40;
  const TOUCH_DRAG_THRESHOLD = 24;
  const FLICK_VELOCITY_THRESHOLD = 0.35; // px/ms
  const FLICK_DISTANCE_MIN = 10;
  const STEP_SWITCH_RATIO = vw >= 960 ? 0.5 : 0.2; // desktop 50%, mobile/tablet 20%
  const pointerTypeRef = useRef("mouse");

  const advanceBy = useCallback(
    (delta) => {
      if (!delta) return;
      setTrackIndex((s) => s + delta);
      setPage((p) => {
        const nextPage = ((p - 1 + delta) % total + total) % total;
        return nextPage + 1;
      });
    },
    [total]
  );

  const next = useCallback(() => {
    advanceBy(1);
  }, [advanceBy]);

  const prev = useCallback(() => {
    advanceBy(-1);
  }, [advanceBy]);

  const wrapIntoViewportWindow = useCallback((value, size) => {
    let wrapped = value;
    // Keep all cards in unique recycled slots while preserving one left buffer slot.
    // For 5 cards, this yields a stable window of [-1 .. 3] (5 distinct positions).
    while (wrapped < -1) wrapped += size;
    while (wrapped > size - 2) wrapped -= size;
    return wrapped;
  }, []);

  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerTypeRef.current = e.pointerType || "mouse";
    activePointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    dragStartTimeRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();
    dragDeltaXRef.current = 0;
    didDragRef.current = false;
    setIsDragging(false);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (dragStartXRef.current == null || activePointerIdRef.current !== e.pointerId) return;
    const delta = e.clientX - dragStartXRef.current;
    dragDeltaXRef.current = delta;
    if (Math.abs(delta) > 2) {
      didDragRef.current = true;
      if (!isDragging) setIsDragging(true);
    }
    setDragX(delta);
  }, [isDragging]);

  const resetGesture = useCallback(() => {
    setDragX(0);
    setIsDragging(false);
    activePointerIdRef.current = null;
    dragStartXRef.current = null;
    dragStartTimeRef.current = 0;
    dragDeltaXRef.current = 0;
  }, []);

  const onPointerEnd = useCallback(
    (e) => {
      if (dragStartXRef.current == null || activePointerIdRef.current !== e.pointerId) return;
      const delta = dragDeltaXRef.current;
      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      const elapsed = Math.max(1, now - (dragStartTimeRef.current || now));
      const velocity = Math.abs(delta) / elapsed;
      const dragThreshold = pointerTypeRef.current === "touch" ? TOUCH_DRAG_THRESHOLD : MOUSE_DRAG_THRESHOLD;
      const isFlick = Math.abs(delta) >= FLICK_DISTANCE_MIN && velocity >= FLICK_VELOCITY_THRESHOLD;
      const distanceStepThreshold = layout.step * STEP_SWITCH_RATIO;
      const rawSteps =
        Math.abs(delta) >= dragThreshold
          ? Math.round(-delta / distanceStepThreshold)
          : isFlick
          ? (delta < 0 ? 1 : -1)
          : 0;
      const steps = Math.max(-2, Math.min(2, rawSteps));
      if (steps) advanceBy(steps);
      try {
        if (e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (_error) {
        // Mobile browsers can cancel pointers and invalidate capture before release.
      } finally {
        resetGesture();
      }
    },
    [advanceBy, layout.step, resetGesture, STEP_SWITCH_RATIO]
  );

  const onPointerCancel = useCallback(() => {
    resetGesture();
  }, [resetGesture]);

  const onLostPointerCapture = useCallback(() => {
    // Some mobile browsers end touch sequences via lostpointercapture without pointerup.
    resetGesture();
  }, [resetGesture]);

  const blockNativeDrag = useCallback((e) => {
    e.preventDefault();
  }, []);

  const virtualIndex = trackIndex - dragX / layout.step;
  const trackX = -virtualIndex * layout.step;

  return (
    <section id="projects" className="mt-20 w-full bg-black py-16 text-white md:py-24">
      <div className="f-container">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6">
          <h2 className="about-headline font-semibold">Projects</h2>

          <div className="flex items-center justify-between">
            <span className="text-[20px] leading-[26px] font-semibold">{page}/{total}</span>
            <div className="flex items-center gap-3">
              {["prev", "next"].map((key, idx) => (
                <button
                  key={key}
                  aria-label={key === "prev" ? "Previous" : "Next"}
                  onClick={key === "prev" ? prev : next}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/40 bg-white/5"
                >
                  <img
                    src={ARROW}
                    alt={key}
                    className={`h-[32px] w-[32px] object-contain ${idx === 0 ? "rotate-180" : ""}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>

          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden select-none"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerCancel}
            onLostPointerCapture={onLostPointerCapture}
            onDragStart={blockNativeDrag}
          >
            <div
              className="flex"
              style={{
                transform: `translate3d(${trackX}px, 0px, 0px)`,
                transition: isDragging ? "none" : "transform 0.2s ease-out",
                width: `${layout.step * total}px`,
                height: `${layout.cardH}px`,
              }}
            >
            {PROJECTS.map((project, idx) => {
              const rawRelative = idx - virtualIndex;
              const relative = wrapIntoViewportWindow(rawRelative, total);
              const wrapperTranslateX = (relative - rawRelative) * layout.step;

              return (
              <a
                key={project.key}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} link`}
                onClick={(e) => {
                  if (didDragRef.current) {
                    didDragRef.current = false;
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  const name = `project_${project.key.toLowerCase()}_click`;
                  trackEvent(name, {
                    project: project.key,
                    title: project.title,
                    target: project.href,
                  });
                }}
                className="flex flex-col justify-between rounded-2xl text-black shadow-lg"
                style={{
                  transform: `translate3d(${wrapperTranslateX}px, 0px, 0px)`,
                  transition: "none",
                  backgroundColor: CARD_COLORS[project.key],
                  flex: `0 0 ${layout.cardW}px`,
                  width: `${layout.cardW}px`,
                  height: `${layout.cardH}px`,
                  marginRight: `${idx === total - 1 ? 0 : GAP}px`,
                }}
              >
                <div className="px-4 pt-4 text-[26px] leading-[32px] font-semibold">{project.title}</div>
                <div className="flex flex-1 items-end justify-center pb-4">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-auto object-contain"
                    style={{ height: `${layout.imgH}px` }}
                    draggable={false}
                    onDragStart={blockNativeDrag}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </a>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
