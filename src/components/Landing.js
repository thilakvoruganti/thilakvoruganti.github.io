import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EXTERNAL_LINKS } from "../constants";
import { trackEvent } from "../lib/firebaseAnalytics";

// Images
import FE_IMG from "../images/frontend.svg";
import BE_IMG from "../images/backend.svg";
import AI_IMG from "../images/AI.svg";
import UX_IMG from "../images/figma.svg";
import PROFILE_IMG from "../images/profile.png";

/* ----------------- small utils ----------------- */
const r = (n) => Math.round(n);
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * t;
const tRange = (vw, lo, hi) => clamp01((vw - lo) / (hi - lo));
const CARD_DATA = [
    { id: "ux", src: UX_IMG, alt: "UX Designer" },
  { id: "ai", src: AI_IMG, alt: "AI Engineer" },
  { id: "profile", src: PROFILE_IMG, alt: "Profile" },
  { id: "fe", src: FE_IMG, alt: "Front-end" },
  { id: "be", src: BE_IMG, alt: "Back-end" },
];

function useViewport() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1920);
  useEffect(() => {
    const onR = () => setVw(window.innerWidth);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return vw;
}

/* ----------------- sizing (fluid in bands) ----------------- */
function getConfig(vw) {
  if (vw >= 1440) {
    return {
      L: { w: 490, h: 653 },
      M: { w: 392, h: 522 },
      S: { w: 343, h: 457 },
      type: { w: 780, h: 245, fs: 40, lh: 48 },
      visibleOuter: true,
    };
  }
  if (vw >= 1280) {
    return {
      L: { w: 360, h: 480 },
      M: { w: 288, h: 384 },
      S: { w: 252, h: 336 },
      type: { w: 595, h: 195, fs: 32, lh: 40 },
      visibleOuter: true,
    };
  }
  if (vw >= 960) {
    const s = Math.max(0.001, vw / 1279);
    return {
      L: { w: r(360 * s), h: r(480 * s) },
      M: { w: r(288 * s), h: r(384 * s) },
      S: { w: r(252 * s), h: r(336 * s) },
      type: { w: r(500 * s), h: r(185 * s), fs: r(30 * s), lh: r(38 * s) },
      visibleOuter: true, // 5 cards at ≥960
    };
  }
  if (vw >= 767) {
    // 767 → 959 fluid 3-card band
    const t = tRange(vw, 767, 959); // 0 @767 → 1 @959
    const Lw = r(lerp(360, 400, t));
    const Lh = r(lerp(480, 533, t));
    const Mw = r(lerp(288, 320, t));
    const Mh = r(lerp(384, 426, t));
    const typeW = r(lerp(384, 475, t));
    const typeH = 175;
    const fs = r(lerp(30, 32, t));
    const lh = r(lerp(36, 40, t));
    return {
      L: { w: Lw, h: Lh },
      M: { w: Mw, h: Mh },
      S: { w: 0, h: 0 },
      type: { w: typeW, h: typeH, fs, lh },
      visibleOuter: false,
    };
  }
  if (vw >= 560) {
    // 560 → 766 fluid 3-card band
    const t = tRange(vw, 560, 766); // 0 @560 → 1 @766
    const Lw = r(lerp(280, 384, t));
    const Lh = r(lerp(374, 512, t));
    const Mw = r(lerp(225, 307, t));
    const Mh = r(lerp(300, 409, t));
    const typeW = r(lerp(323, 443, t));
    const typeH = 175;
    const fs = r(lerp(30, 32, t));
    const lh = 40;
    return {
      L: { w: Lw, h: Lh },
      M: { w: Mw, h: Mh },
      S: { w: 0, h: 0 },
      type: { w: typeW, h: typeH, fs, lh },
      visibleOuter: false,
    };
  }
  // <560 fluid toward mobile targets (ends at 389x520 etc. when vw≈559)
  const s = Math.max(0.001, vw / 559);
  const fs = Math.max(18, r(28 * s));
  const lh = Math.max(28, r(fs * 1.35));
  return {
    L: { w: r(487 * s), h: r(650 * s) },
    M: { w: r(389 * s), h: r(520 * s) },
    S: { w: 0, h: 0 },
    type: { w: r(507 * s), h: 175, fs, lh },
    visibleOuter: false,
  };
}

/* ----------------- autoplay + progress ring ----------------- */
function useAutoRotate({ running, durationMs, onTick }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const accumRef = useRef(0);
  const onTickRef = useRef(onTick);

  useEffect(() => { onTickRef.current = onTick; }, [onTick]);

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }
    const loop = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const rawDt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      // When the tab resumes after being hidden, clamp the delta so we don't fast-forward
      const dt = Math.min(rawDt, durationMs);

      // accumulate time and emit at most one tick per frame
      let acc = accumRef.current + dt;
      if (acc >= durationMs) {
        // carry remainder forward
        acc = acc - durationMs;
        accumRef.current = acc;
        setProgress(acc / durationMs);
        if (typeof onTickRef.current === 'function') onTickRef.current();
      } else {
        accumRef.current = acc;
        setProgress(acc / durationMs);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [running, durationMs]);

  const reset = () => { accumRef.current = 0; setProgress(0); };
  return { elapsed: progress * durationMs, reset };
}

/* ===================== Main ===================== */
export default function Landing() {
  const vw = useViewport();
  const cfg = getConfig(vw);

  // carousel position (0..4)
  const [shift, setShift] = useState(2);
  const [centerId, setCenterId] = useState("profile");

  // calm copy per card (2 lines each)
const copy = useMemo(
  () => ({
    profile: {
      text: "I build end-to-end products with 5+ years of experience.",
      hoverText: "Full-stack engineer with 5+ years building reliable products. Explore my resume to know more.",
      cta: "About me", to: "#about",
    },
    ai: {
      text: "I use practical AI to automate repetitive tasks and amplify focus.",
      hoverText: "AI-focused engineer shipping practical ML solutions. Explore projects to know more.",
      cta: "Projects", to: "#projects",
    },
    ux: {
      text: "I design simple, accessible flows that feel obvious and kind.",
      hoverText: "I design user-first product flows and interactions. Explore design work to know more.",
      cta: "Design", to: "#design",
    },
    fe: {
      text: "I craft fast, resilient React interfaces that feel effortless.",
      hoverText: "Frontend engineer with 5+ years building performant UI. Explore my resume to know more.",
      cta: "Resume", to: EXTERNAL_LINKS.resume,
    },
    be: {
      text: "I build quiet backends secure, reliable, and effortlessly scalable.",
      hoverText: "Backend engineer focused on scale, APIs, and reliability. Explore my resume to know more.",
      cta: "Resume", to: EXTERNAL_LINKS.resume,
    },
  }),
  []
);


  const current = copy[centerId] ?? copy.profile;

  /* autoplay + ring */
  const [running, setRunning] = useState(true);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isCarouselDragging, setIsCarouselDragging] = useState(false);
  const durationMs = 8000; // <- 8s highlight duration
  const onTick = useCallback(() => setShift((s) => (s + 1) % 5), []);
  const { elapsed, reset } = useAutoRotate({
    running: running && !isCtaHovered && !isCarouselDragging,
    durationMs,
    onTick,
  });
  const progress = clamp01(elapsed / durationMs);

  const next = useCallback(() => {
    setShift((s) => (s + 1) % 5);
    reset();
  }, [reset]);

  const prev = useCallback(() => {
    setShift((s) => (s + 4) % 5);
    reset();
  }, [reset]);

  // keyboard access
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.code === "Space") setRunning((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // height of the highlighted (center) card only
  const trackHeight = cfg.L.h;
  const typeBottom = useMemo(() => {
    if (vw >= 1440) return 300;
    if (vw >= 960) return 300;
    if (vw >= 767) return 300;
    if (vw >= 560) return 280;
    return 290;
  }, [vw]);



  return (
    <section id="landing" className="pt-6 min-[960px]:pt-0 overflow-x-hidden overflow-y-visible">
      <h1 className="sr-only">Thilak Voruganti</h1>
      <div className="cards-wrap relative mx-auto w-full isolate  pb-16 md:pb-20">
        <div>
          <Carousel5
            vw={vw}
            cfg={cfg}
            shift={shift}
            onCenterChange={setCenterId}
            trackHeight={trackHeight}
            onDragStateChange={setIsCarouselDragging}
            onSwipeBy={(steps) => {
              if (!steps) return;
              setShift((s) => ((s + steps) % 5 + 5) % 5);
              reset();
            }}
          />

          {/* Typing + Controls */}
          <div className="type-wrap z-[60]" style={{ bottom: typeBottom }}>
            <div className="relative pointer-events-none" style={{ width: cfg.type.w }}>
              <HeroTypingCard
                text={current.text}
                hoverText={current.hoverText}
                cta={current.cta}
                to={current.to}
                type={cfg.type}
                vw={vw}
                paused={isCtaHovered || isCarouselDragging}
                onCtaHoverChange={setIsCtaHovered}
              />
            </div>
          </div>
          <Controls
            vw={vw}
            onPrev={prev}
            onNext={next}
            running={running}
            interactionPaused={isCtaHovered || isCarouselDragging}
            onToggle={() => setRunning((v) => !v)}
            progress={progress}
          />

          {/* Bridge text between landing and About me, matched to typing card width */}
          <div className="w-full flex justify-center"
            style={{ marginTop: vw >= 960 ? 56 : 40 }}
          >
            <div
              className="hero-bridge text-neutral-900 text-center"
              style={{ width: cfg.type.w, maxWidth: "calc(100vw - 48px)" }}
            >
              I started in frontend engineering and grew into full-stack systems backed by scalable backend architecture, data pipelines, and machine learning in production.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ===================== Carousel ===================== */
function Carousel5({ vw, cfg, shift, onCenterChange, trackHeight, onSwipeBy, onDragStateChange }) {
  const cards = useMemo(() => CARD_DATA, []);
  const dragStartX = useRef(null);
  const dragStartTimeRef = useRef(0);
  const dragDeltaX = useRef(0);
  const activePointerId = useRef(null);
  const pointerTypeRef = useRef("mouse");
  const [dragX, setDragX] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragReleaseTimeoutRef = useRef(null);
  const MOUSE_DRAG_THRESHOLD = 30;
  const TOUCH_DRAG_THRESHOLD = 10;
  const FLICK_VELOCITY_THRESHOLD = 0.16; // px/ms
  const FLICK_DISTANCE_MIN = 3;
  const slideSize = cfg.L.w;
  const baseTrackX = Math.round((vw - slideSize) / 2);
  const virtualShift = shift - dragX / slideSize;
  const getSlideVisual = useCallback(
    (relative) => {
      const desktopNear = cfg.L.w * (33 / 490);
      const desktopFar = cfg.L.w * (131 / 490);
      const mobileNear = cfg.L.w * (22.4 / 384);
      const mobileFar = cfg.L.w * (88 / 384);
      const desktop = {
        x: [desktopFar, desktopNear, 0, -desktopNear, -desktopFar],
        scale: [0.7, 0.8, 1, 0.8, 0.7],
      };
      const mobile = {
        x: [mobileFar, mobileNear, 0, -mobileNear, -mobileFar],
        scale: [0.62, 0.84, 1, 0.84, 0.62],
      };
      const tokens = vw >= 960 ? desktop : mobile;
      const clamped = Math.max(-2, Math.min(2, relative));
      const left = Math.max(-2, Math.min(1, Math.floor(clamped)));
      const right = left + 1;
      const t = clamped - left;
      const from = left + 2;
      const to = right + 2;
      return {
        translateX: lerp(tokens.x[from], tokens.x[to], t),
        scale: lerp(tokens.scale[from], tokens.scale[to], t),
      };
    },
    [vw, cfg.L.w]
  );

  useEffect(() => {
    const centerIdx = ((shift % cards.length) + cards.length) % cards.length;
    if (centerIdx !== -1) onCenterChange?.(cards[centerIdx].id);
  }, [shift, cards, onCenterChange]);

  useEffect(() => {
    return () => {
      onDragStateChange?.(false);
      if (dragReleaseTimeoutRef.current) clearTimeout(dragReleaseTimeoutRef.current);
    };
  }, [onDragStateChange]);

  const wrapSigned = (value, size) => {
    let wrapped = ((value % size) + size) % size;
    if (wrapped > size / 2) wrapped -= size;
    return wrapped;
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerTypeRef.current = e.pointerType || "mouse";
    if (dragReleaseTimeoutRef.current) {
      clearTimeout(dragReleaseTimeoutRef.current);
      dragReleaseTimeoutRef.current = null;
    }
    onDragStateChange?.(true);
    activePointerId.current = e.pointerId;
    dragStartX.current = e.clientX;
    dragStartTimeRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();
    dragDeltaX.current = 0;
    setIsPointerDown(true);
    setIsDragging(false);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (dragStartX.current == null || activePointerId.current !== e.pointerId) return;
    const delta = e.clientX - dragStartX.current;
    dragDeltaX.current = delta;
    if (Math.abs(delta) > 0.5 && !isDragging) setIsDragging(true);
    setDragX(delta);
  };

  const onPointerEnd = (e) => {
    if (dragStartX.current == null || activePointerId.current !== e.pointerId) return;
    const delta = dragDeltaX.current;
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const elapsed = Math.max(1, now - (dragStartTimeRef.current || now));
    const velocity = Math.abs(delta) / elapsed;
    const dragThreshold = pointerTypeRef.current === "touch" ? TOUCH_DRAG_THRESHOLD : MOUSE_DRAG_THRESHOLD;
    const isFlick = Math.abs(delta) >= FLICK_DISTANCE_MIN && velocity >= FLICK_VELOCITY_THRESHOLD;
    const rawSteps =
      Math.abs(delta) >= dragThreshold
        ? Math.round(-delta / slideSize)
        : isFlick
        ? (delta < 0 ? 1 : -1)
        : 0;
    const steps = Math.max(-2, Math.min(2, rawSteps));
    if (steps) onSwipeBy?.(steps);
    setDragX(0);
    setIsDragging(false);
    setIsPointerDown(false);
    if (dragReleaseTimeoutRef.current) clearTimeout(dragReleaseTimeoutRef.current);
    dragReleaseTimeoutRef.current = setTimeout(() => {
      onDragStateChange?.(false);
      dragReleaseTimeoutRef.current = null;
    }, 120);

    e.currentTarget.releasePointerCapture?.(e.pointerId);
    activePointerId.current = null;
    dragStartX.current = null;
    dragStartTimeRef.current = 0;
    dragDeltaX.current = 0;
  };

  const blockNativeImageDrag = (e) => {
    e.preventDefault();
  };

  const trackX = baseTrackX - virtualShift * slideSize;

  return (
    <div
      className="landing-carousel-viewport hero-carousel-shell relative mx-auto select-none"
      style={{
        height: trackHeight,
        touchAction: "pan-y",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onDragStart={blockNativeImageDrag}
    >
      <div className="landing-carousel-track-clip">
        <div
          className="landing-carousel-track-frame"
          style={{
            "--slide-size": `${slideSize}px`,
            "--slide-height": `${cfg.L.h}px`,
            height: `${trackHeight}px`,
          }}
        >
          <div
            className="landing-carousel-track"
            style={{
              transform: `translate3d(${trackX}px, 0px, 0px)`,
              transition: isDragging ? "none" : "transform 200ms ease-out",
            }}
          >
            {cards.map((slide, index) => {
              const rawRelative = index - virtualShift;
              const relative = wrapSigned(rawRelative, cards.length);
              const wrapperTranslateX = (relative - rawRelative) * slideSize;
              const isVisible = cfg.visibleOuter ? Math.abs(relative) <= 2.2 : Math.abs(relative) <= 1.45;
              const visual = getSlideVisual(relative);
              const effectiveTranslateX = isPointerDown ? 0 : visual.translateX;
              const effectiveScale = isPointerDown ? 0.95 : visual.scale;
              const opacity = isVisible ? 1 : 0;
              const zIndex = 20 - Math.round(Math.abs(relative) * 4);
              const isCenterish = Math.abs(relative) < 0.55;

              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-hidden={isCenterish ? "false" : "true"}
                  className="landing-carousel-slide"
                  style={{
                    zIndex,
                    transform: `translate3d(${wrapperTranslateX}px, 0px, 0px)`,
                    transition: isDragging ? "none" : "transform 200ms ease-out",
                  }}
                >
                  <div
                    data-slide-content="true"
                    className="landing-carousel-slide-content"
                    style={{
                      transform: `translateX(${effectiveTranslateX}px) scale(${effectiveScale})`,
                      transformOrigin: "center center",
                      opacity,
                      transition: isDragging
                        ? "none"
                        : "transform 200ms ease-out, opacity 100ms ease-out",
                      pointerEvents: isCenterish ? "auto" : "none",
                    }}
                  >
                    <article aria-label={slide.alt} className="landing-carousel-card-shell">
                      <div className="landing-carousel-card-shell-inner">
                        <div>
                          <div className="landing-carousel-card-surface" style={{ width: "100%", height: "100%" }}>
                            <img
                              src={slide.src}
                              alt={slide.alt}
                              className="hero-carousel-img"
                              draggable={false}
                              onDragStart={blockNativeImageDrag}
                              loading="lazy"
                              decoding="async"
                              fetchPriority={isCenterish ? "high" : "low"}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== Typing Card ===================== */
function HeroTypingCard({ text, hoverText, cta, to, type, vw, paused = false, onCtaHoverChange }) {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  const padding = vw >= 960 ? "1rem" : "0.75rem 1rem";
  const isDesktop = vw >= 960;
  const dynamicButtonFont = isDesktop
    ? 16
    : Math.max(12, Math.round((type.fs || 18) * 0.45));
  const baseLetterPx = -0.005625 * 16;
  const buttonLetterSpacing = (dynamicButtonFont / 18) * baseLetterPx;
  const setHoverState = (next) => {
    setHovering(next);
    if (typeof onCtaHoverChange === "function") onCtaHoverChange(next);
  };

  return (
    <div className={`hero-cta-shell ${hovering ? "is-hover" : ""}`}>
      <div className="hero-cta-glow" />
      <div
        className="hero-typing-card rounded-2xl border border-neutral-200 bg-white pointer-events-auto"
        style={{
          width: type.w,
          minHeight: type.h,
          padding,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <h2
            className="font-semibold tracking-tight whitespace-pre-line"
            style={{
              fontSize: `${type.fs}px`,
              lineHeight: `${type.lh}px`,
            }}
          >
            <span style={{ display: hovering && hoverText ? "none" : "inline" }}>
              <TypingText
                text={text}
                speed={90}
                punctPause={500}
                startDelay={300}
                lineHeightPx={type.lh}
                fontSize={type.fs}
                paused={paused}
              />
            </span>
            {hovering && hoverText ? <span>{hoverText}</span> : null}
          </h2>
        </div>
        <div className={`mt-auto pt-3 ${isDesktop ? "flex justify-end" : ""}`}>
          <button
            className={`hero-cta-btn rounded-xl text-white transition ${isDesktop ? "w-auto px-4" : "w-full"}`}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onFocus={() => setHoverState(true)}
            onBlur={() => setHoverState(false)}
            onClick={() => {
              if (!to) return;
              trackEvent("cta_click", { section: "landing", label: cta || "Know more", target: to });
              if (to.startsWith('#')) {
                const el = document.querySelector(to);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
              }
              if (/^https?:/i.test(to)) {
                window.open(to, "_blank", "noreferrer");
              } else {
                navigate(to);
              }
            }}
            style={{
              padding: isDesktop ? "0.75rem 1.25rem" : "1rem",
              fontOpticalSizing: "auto",
              fontSize: `${dynamicButtonFont}px`,
              lineHeight: 1.4,
              letterSpacing: `${buttonLetterSpacing}px`,
              fontWeight: 480,
              fontVariationSettings: '"wdth" 98, "wght" 480',
              margin: 0,
              textAlign: "center",
            }}
          >
            {cta || "Know more"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TypingText({ text, speed = 80, punctPause = 450, startDelay = 300, lineHeightPx = 48, fontSize = 36, paused = false }) {
  const [sub, setSub] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => { setSub(0); setBlink(true); }, [text]);

  useEffect(() => {
    if (!text || sub >= text.length || paused) return;
    const charJustTyped = sub > 0 ? text[sub - 1] : "";
    const isPunct = /[.,!?;:]/.test(charJustTyped);
    const delay = sub === 0 ? startDelay : isPunct ? punctPause : speed;
    const t = setTimeout(() => setSub((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [sub, text, speed, punctPause, startDelay, paused]);

  useEffect(() => {
    if (!text || sub >= text.length) return;
    const t = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, [sub, text]);

  const done = sub >= (text?.length ?? 0);

  return (
    <span
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: `${lineHeightPx}px`,
      }}
    >
      {text?.slice(0, sub) ?? ""}
      {!done && (
        <span
          className={`inline-block w-0.5 ml-0.5 align-middle ${blink ? "bg-neutral-900" : "bg-transparent"}`}
          style={{ height: `${lineHeightPx}px` }}
        />
      )}
    </span>
  );
}

/* ===================== Controls (Prev / TimerRing / Next) ===================== */
function Controls({ vw, onPrev, onNext, running, interactionPaused = false, onToggle, progress }) {
  // Timer ring
  const size = 40;
  const stroke = 3;
  const rCircle = (size - stroke) / 2;
  const C = 2 * Math.PI * rCircle;
  const dash = C;
  const offset = C * (1 - progress);
  const showPauseIcon = running && !interactionPaused;

  const layout = useMemo(() => {
    if (vw >= 1440) return { paddingX: 48, marginTop: 0, justify: "flex-end" };
    if (vw >= 1280) return { paddingX: 40, marginTop: 24, justify: "flex-end" };
    if (vw >= 960) return { paddingX: 32, marginTop: 32, justify: "flex-end" };
    if (vw >= 560) return { paddingX: 24, marginTop: 69, justify: "center" }; // 4.3125rem
    return { paddingX: 24, marginTop: 109, justify: "center" }; // 6.8125rem
  }, [vw]);

  // Figma-like: responsive row below the carousel, centered on small, right-aligned ≥960px
  return (
    <div
      className="w-full max-w-[1440px] mx-auto flex items-center gap-3"
      style={{
        paddingLeft: layout.paddingX,
        paddingRight: layout.paddingX,
        marginTop: layout.marginTop,
        justifyContent: layout.justify,
      }}
    >
      {/* Prev */}
      <button
        aria-label="Previous"
        onClick={onPrev}
        className="h-10 w-10 rounded-full border border-black/10 bg-white shadow-sm grid place-items-center hover:bg-neutral-50 active:scale-95 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Play/Pause + progress ring */}
      <button
        aria-label={showPauseIcon ? "Pause" : "Play"}
        onClick={onToggle}
        className="relative h-10 w-10 rounded-full grid place-items-center bg-white border border-black/10 shadow-sm hover:bg-neutral-50 active:scale-95 transition"
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
          <circle cx={size / 2} cy={size / 2} r={rCircle} stroke="rgba(0,0,0,0.12)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2} cy={size / 2} r={rCircle}
            stroke="currentColor" strokeWidth={stroke} fill="none"
            strokeDasharray={dash} strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition:
                running && !interactionPaused
                  ? "none"
                  : "stroke-dashoffset 120ms linear",
            }}
          />
        </svg>
        {showPauseIcon ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M8 5l11 7-11 7V5z" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Next */}
      <button
        aria-label="Next"
        onClick={onNext}
        className="h-10 w-10 rounded-full border border-black/10 bg-white shadow-sm grid place-items-center hover:bg-neutral-50 active:scale-95 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
