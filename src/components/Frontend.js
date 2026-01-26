import React, { useEffect, useRef, useState } from "react";

/**
 * FrontendLanding — hero + metrics + console, then Skills and Experience sections.
 * - Hero matches reference
 * - Console prints one line at a time (once)
 * - Skills uses your provided image on the right
 * - Experience shows company logo + 300×100 cropped world map centered on location
 */

// ---------------------------------------------------------------------------
// Demo Navbar (kept minimal; replace with your router Navbar when integrating)


// ---------------------------------------------------------------------------
function Metric({ label, value, divider }) {
  return (
    <div className="flex items-center gap-2 text-slate-200/90">
      <span className="font-medium">{label}</span>
      <span className="font-semibold text-white">{value}</span>
      {divider && <span className="mx-3 h-5 w-px bg-white/15" />}
    </div>
  );
}

// ---------------------------------------------------------------------------
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

function IconSplitView({ className = "" }) {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="1" y="2" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 2v14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconPane({ className = "" }) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="1" y="2" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 6h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconChevrons({ className = "" }) {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 3l4 4-4 4M10 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Console — prints one line at a time on load (once)
const RESUME_URL = "https://drive.google.com/file/d/14rIFd_nmR8ka2wxoVfjtY1i1wiVu220n/view?usp=sharing";
const LINKEDIN_URL = "https://www.linkedin.com/in/thilakvoruganti/";
const EMAIL_URL = "mailto:thilak.voruganti@gmail.com";

function ConsoleCard() {
  const lines = [
    {
      kind: "text",
      text: "Hey! I'm Thilak, a Front-end Engineer crafting fast, accessible, and scalable web experiences.Over the past 5+ years, I've built responsive UIs with React, Angular, and modern frameworks, turning complex ideas into pixel-perfect products.",
    },
    { kind: "link", label: "Resume ↗", href: RESUME_URL },
    { kind: "link", label: "LinkedIn ↗", href: LINKEDIN_URL },
    { kind: "link", label: "Gmail ↗", href: EMAIL_URL },
  ];
  const prefersReduced = usePrefersReducedMotion();
  const printedIdx = useRef(prefersReduced ? lines.length : 0);
  const [visibleCount, setVisibleCount] = useState(printedIdx.current);

  useEffect(() => {
    if (prefersReduced) return;
    let to;
    const step = () => {
      if (printedIdx.current < lines.length) {
        printedIdx.current += 1;
        setVisibleCount(printedIdx.current);
        to = window.setTimeout(step, 420);
      }
    };
    to = window.setTimeout(step, 240);
    return () => to && window.clearTimeout(to);
  }, [prefersReduced]);

  return (
    <div className="flex h-[480px] flex-col rounded-[24px] bg-[#1A2032] shadow-[0_18px_40px_rgba(4,6,11,0.55)] overflow-hidden backdrop-blur">
      <div className="flex h-[60px] items-center justify-between px-5 border-b border-white/10 bg-[#353C4C]">
        <div className="flex h-full items-center gap-4 text-slate-300">
          <div className="flex items-center gap-3 text-slate-400 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="h-[20px] w-auto"
            >
<path d="M27.1475 17V0.930664H0.793945V27.2842H17" stroke="#C5C6CC" stroke-dasharray="2 2"/>
<path d="M18.0001 17C17.4478 17 17.0001 17.4477 17.0001 18L17 27C17 27.5523 17.4477 28 18 28C18.5523 28 19 27.5523 19 27L19.0001 19L27.0001 19C27.5523 19 28.0001 18.5523 28.0001 18C28.0001 17.4478 27.5524 17 27.0001 17L18.0001 17ZM27 27L27.7071 26.2929L18.7072 17.2929L18.0001 18L17.293 18.7071L26.2929 27.7071L27 27Z" fill="#C5C6CC"/>
</svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="26"
              viewBox="0 0 32 26"
              fill="none"
              className="h-[20px] w-auto"
            >
<path d="M28.5408 1.04419H1.94058V23.2109H12.7073H0.516602V24.4776H15.2405" stroke="#90ABE5"/>
<rect x="17.2734" y="3.71045" width="13.6668" height="21.2667" rx="2.5" stroke="#90ABE5"/>
</svg>
          </div>
          <div className="relative flex h-full items-center">
            <span className="uppercase text-[12px] tracking-[0.22em] text-[#9EB8FF] font-semibold">
              Console
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-[2px] rounded bg-[#9EB8FF]" />
          </div>
        </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="19"
      viewBox="0 0 25 19"
      fill="none"
      className="h-[20px] w-auto"
    >
<path d="M0 1L1 0L10.5 9.5L1 19L0 18L8.5 9.5L0 1Z" fill="#C5C6CC"/>
<path d="M14 1L15 0L24.5 9.5L15 19L14 18L22.5 9.5L14 1Z" fill="#C5C6CC"/>
</svg>
      </div>
      <div className="flex-1 px-5 py-5 text-[24px] leading-[29px] text-slate-200 text-left font-[450] tracking-[-0.005em]">
        {lines.slice(0, visibleCount).map((line, i) => {
          const isLink = line.kind === "link";
          return (
            <div key={i} className={`flex items-start gap-3${i > 0 ? " mt-3" : ""}`}>
              <span className="mt-[1px] text-[#8FB2FF] text-[24px] leading-none">›</span>
              {isLink ? (
                <a
                  href={line.href}
                  target={line.href.startsWith("http") ? "_blank" : undefined}
                  rel={line.href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-slate-200 hover:text-white underline underline-offset-4 decoration-[#9EB8FF]"
                >
                  {line.label}
                </a>
              ) : (
                <p className="flex-1 whitespace-pre-wrap font-normal text-slate-200/95">
                  {line.text}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Projects carousel (slides swap images you will place under src/images)
const PROJECTS = [
  {
    id: "cc2",
    eyebrow: "Eco-Flights",
    title: "Eco-Flights",
    description:
      "To demonstrate my full stack skills, I created a project using React as the frontend, Express and Node as the backend, and MongoDB for databases.",
    tags: ["React", "Node"],
    image: require("../images/frontend.png"),
  },
  {
    id: "miami",
    eyebrow: "E-commerce",
    title: "E-commerce",
    description:
      "To demonstrate my full stack skills, I created a project using React as the frontend, Express and Node as the backend, and MongoDB for databases.",
    tags: ["React", "Node"],
    image: require("../images/backend.png"),
  },
  {
    id: "summit",
    eyebrow: "Eco-Flights",
    title: "Eco-Flights",
    description:
      "To demonstrate my full stack skills, I created a project using React as the frontend, Express and Node as the backend, and MongoDB for databases.",
    tags: ["React", "Node"],
    image: require("../images/gsu.png"),
  },
];

function ProjectsSection() {
  const scrollerRef = useRef(null);
  const scrollByCards = (dir) => {
    const node = scrollerRef.current;
    if (!node) return;
    const delta = node.getBoundingClientRect().width * 0.7 * dir;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="mx-auto w-[92%] max-w-[1200px] pt-10 pb-20">
      <div className="mb-6 text-left">
        <h2 className="text-[32px] sm:text-[36px] font-semibold text-white">Projects</h2>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:snap-none"
      >
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="snap-center md:snap-none shrink-0 min-w-[280px] md:min-w-0 rounded-[28px] border border-white/8 bg-[#0e1321] shadow-[0_20px_45px_rgba(0,0,0,0.45)] overflow-hidden"
          >
            <div className="px-6 pt-8 pb-4 text-center">
              <p className="text-white text-[14px] tracking-[0.08em] font-semibold uppercase">
                {project.eyebrow}
              </p>
              <h3 className="mt-2 text-[32px] sm:text-[36px] font-bold text-white leading-none">
                {project.title}
              </h3>
            </div>

            <div className="flex justify-center px-6 pb-4">
              <div className="h-[140px] w-full rounded-[22px] bg-gradient-to-b from-white/12 via-white/6 to-transparent flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} visual`}
                  className="h-full w-full object-contain mix-blend-screen"
                />
              </div>
            </div>

            <div className="relative px-6 pb-6">
              <div className="absolute inset-x-4 top-0 h-[190px] rounded-[24px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),rgba(12,19,33,0)),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.14),rgba(12,19,33,0))] blur-[1px]" />
              <div className="relative rounded-[24px] border border-white/12 bg-white/6 backdrop-blur-[14px] px-5 py-5 text-left">
                <p className="text-[14px] leading-6 text-white/90">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center h-8 px-3 rounded-full border border-white/30 bg-white/10 text-white text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm font-semibold text-white border border-white/20 shadow-[0_12px_26px_rgba(0,0,0,0.45)]"
                  >
                    Resume
                  </a>
                  <span className="inline-grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/10 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          aria-label="Previous projects"
          onClick={() => scrollByCards(-1)}
          className="h-10 w-10 rounded-full border border-white/25 text-white bg-white/5 hover:bg-white/10 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto"
          >
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next projects"
          onClick={() => scrollByCards(1)}
          className="h-10 w-10 rounded-full border border-white/25 text-white bg-white/5 hover:bg-white/10 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Skills graphic (right side) — uses the provided image instead of programmatic bubbles
function SkillsGraphic({ src = "/assets/skills-bubble.png" }) {
  return (
    <div className="relative mx-auto w-full max-w-[680px] xl:max-w-none xl:w-[796.5px] xl:h-[752.28px]">
      <img
        src={require("../images/skills-bubble.png")}
        alt="Skills bubble graphic"
        className="w-full h-auto xl:h-full select-none pointer-events-none object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,.35)]"
      />
    </div>
  );
}

function SkillsSection() {
  return (
    <section className="mx-auto w-[92%] max-w-[1100px] xl:max-w-[1140px] pt-20 pb-24">
      <div className="grid md:grid-cols-2 gap-12 items-start xl:grid-cols-[280px_auto] xl:gap-10">
        {/* Left list */}
        <div>
          <h2 className="text-white text-xl xl:text-[36px] xl:leading-[44px] font-semibold mb-4">Skills</h2>
          <ul className="space-y-4 text-2xl xl:text-[48px] xl:leading-[58px] font-semibold text-[#9FB0F8]">
            {["Frameworks", "Languages", "Styling", "Tools"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-left">
                <span className="text-[#8FB2FF]">›</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Right graphic (provided image) */}
        <div className="md:pl-6">
          <SkillsGraphic />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Experience — two-column console layout (matches mock)

const JOBS = [
  {
    id: "tcs",
    title: "Assistant System Engineer",
    timeframe: "Feb 2021 – Feb 2022",
    org: "Tata Consultancy Services",
    location: "Gujarat, India",
    coords: { lat: 22.2587, lon: 71.1924 }, // for the map crop
    skills: ["React", "Redux", "Bootstrap"],
    intro:
      "Hey! I’m Thilak, a Front-end Engineer crafting fast, accessible, and scalable web experiences. Over the past 5+ years, I’ve built responsive UIs with React, Angular, and modern frameworks, turning complex ideas into pixel-perfect products.",
    bullets: [
      "React, Angular, and modern frameworks, turning complex ideas",
      "React, Angular, and modern frameworks, turning complex ideas",
      "React, Angular, and modern frameworks, turning complex ideas",
    ],
  },
  {
    id: "icube",
    title: "Software Engineer",
    timeframe: "Mar 2022 – Dec 2023",
    org: "iCube Solutions",
    location: "Remote",
    coords: { lat: 0, lon: 0 },
    skills: ["React", "Node", "MongoDB"],
    intro:
      "Built performant UI and APIs; optimized caching and auth with JWT.",
    bullets: [
      "Optimized data-fetch and caching for bookings",
      "Implemented secure authentication and session",
      "Improved Lighthouse on key flows",
    ],
  },
  {
    id: "gsu",
    title: "Graduate Research Assistant",
    timeframe: "Jan 2024 – Present",
    org: "Georgia State University",
    location: "Atlanta, GA",
    coords: { lat: 33.749, lon: -84.388 },
    skills: ["Research", "Teaching", "Mentoring"],
    intro:
      "Leading research initiatives and TA support while pursuing MS in CS.",
    bullets: [
      "Published papers; mentored programming labs",
      "Assisted in curriculum & research tooling",
    ],
  },
];

function Chip({ children }) {
  return (
    <span className="inline-flex items-center h-7 px-3 rounded-full border border-white/12 bg-white/[0.03] text-slate-200 text-sm shadow-[0_1px_0_rgba(255,255,255,.05)_inset]">
      {children}
    </span>
  );
}

function IconPlus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-slate-300"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-white"
    >
      <path
        d="M12 21s-6-5.2-6-10a6 6 0 1112 0c0 4.8-6 10-6 10z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <circle cx="12" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}

// Utility: clamp
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

// Convert lon/lat → pixel on an equirectangular map of size (w,h)
function lonLatToXY(lon, lat, w, h) {
  const x = ((lon + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return { x, y };
}

// World map cropper: shows a 300×100 viewport centered on the job's location
function MapCrop({ src, lat, lon, viewW = 300, viewH = 100 }) {
  const imgRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const onLoad = () => {
      const w = img.naturalWidth || img.width || 0;
      const h = img.naturalHeight || img.height || 0;
      setDims({ w, h });
    };

    if (img.complete) onLoad();
    else img.addEventListener("load", onLoad, { once: true });

    return () => img && img.removeEventListener("load", onLoad);
  }, []);

  let style;
  if (dims.w && dims.h) {
    const { x, y } = lonLatToXY(lon, lat, dims.w, dims.h);
    const left = clamp(x - viewW / 2, 0, Math.max(0, dims.w - viewW));
    const top = clamp(y - viewH / 2, 0, Math.max(0, dims.h - viewH));
    style = {
      position: "absolute",
      left: `-${left}px`,
      top: `-${top}px`,
      width: `${dims.w}px`,
      height: `${dims.h}px`,
    };
  }

  return (
    <div className="relative w-[300px] h-[100px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <img
        ref={imgRef}
        src={src}
        alt="world map"
        className="select-none pointer-events-none"
        style={style}
      />
      {/* center pin */}
      <div className="absolute inset-0 grid place-items-center">
        <IconPin />
      </div>
    </div>
  );
}

function ExperienceSection() {
  const primary = JOBS[0];

  return (
    <section className="mx-auto w-[92%] max-w-[1100px] xl:max-w-[1140px] pt-12 pb-24">
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#12192A] shadow-[0_10px_24px_rgba(0,0,0,.35)]">
        {/* Header bar */}
        <div className="flex items-center justify-between h-12 px-5 border-b border-white/12 bg-white/5">
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded border border-white/25" />
              <span className="inline-block w-4 h-4 rounded border border-white/25" />
            </div>
            <div className="relative">
              <span className="text-[#9EB8FF] text-[15px] font-medium">
                Experience
              </span>
              <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#9EB8FF]" />
            </div>
          </div>
          <div className="text-slate-300">»</div>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-10 p-6">
          {/* Left column */}
          <div>
            <div className="flex items-center gap-3 mb-4 text-slate-300/80">
              <div className="grid gap-2">
                <button className="h-8 w-8 rounded-full border border-white/15 grid place-items-center hover:bg-white/5">
                  ⌃
                </button>
                <button className="h-8 w-8 rounded-full border border-white/15 grid place-items-center hover:bg-white/5">
                  ⌄
                </button>
              </div>
              <div className="flex-1 rounded-2xl border border-white/12 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
                <h3 className="text-white font-semibold text-[18px] mb-3">
                  {primary.title}
                </h3>
                <div className="rounded-2xl border border-white/10 bg-[#101726] p-4">
                  <div className="flex items-start gap-2 text-slate-200">
                    <span className="text-[#8FB2FF]">›</span>
                    <p className="leading-6">{primary.intro}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-w-[520px]">
              <button className="w-full flex items-center justify-between rounded-full bg-white/[0.03] border border-white/10 px-5 py-3 text-slate-200 hover:bg-white/5 transition">
                <span className="inline-flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-white/25">
                    <IconPlus />
                  </span>
                  Software Engineer
                </span>
                <span className="text-slate-400">›</span>
              </button>
              <button className="w-full flex items-center justify-between rounded-full bg-white/[0.03] border border-white/10 px-5 py-3 text-slate-200 hover:bg-white/5 transition">
                <span className="inline-flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-white/25">
                    <IconPlus />
                  </span>
                  Graduate Research Assistant
                </span>
                <span className="text-slate-400">›</span>
              </button>
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="text-white text-xl font-medium mb-4">
              {primary.timeframe}
            </div>

            <div className="flex items-center gap-3 mb-5">
              {/* Prefer local logo to avoid CORS: /assets/logos/tcs.svg */}
              <img
                src={require("../images/tcs.png")}
                alt="TCS"
                className="h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/assets/logos/tcs.png";
                }}
              />
            </div>

            {/* 300×100 cropped world map centered on location */}
            <div className="mb-6">
              <MapCrop
                src={require("../images/world.png")}
                lat={primary.coords.lat}
                lon={primary.coords.lon}
              />
              <div className="mt-2 flex items-center gap-2 text-white">
                <IconPin />
                <span className="text-slate-200">{primary.location}</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="text-white font-semibold mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {primary.skills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <div className="text-white font-semibold mb-2">
                Key Responsibilities
              </div>
              <ul className="space-y-2 text-slate-300">
                {primary.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
export default function Frontend() {
  return (
    <div className="min-h-[100dvh] bg-[#0F1422] text-slate-100">

      <main className="mx-auto w-[92%] max-w-[1100px] xl:max-w-[1150px] pt-28 pb-24">
        <section className="text-center">
          <h1 className="text-[56px] md:text-[64px] lg:text-[72px] font-semibold tracking-[-0.02em] text-[#A5B4FC]">
            Design. Build. Repeat
          </h1>
          <p className="mt-3 text-slate-300/95 text-[16px] sm:text-[18px] leading-7 max-w-3xl xl:max-w-[980px] mx-auto">
            I craft fast, accessible UIs with React, Angular & modern tooling.
          </p>

          <div className="mt-4 flex items-center justify-center">
            <Metric label="Projects" value="10+" divider />
            <Metric label="Lighthouse" value="10+" divider />
            <Metric label="Users" value="1M+" />
          </div>

          <div className="mt-6 max-w-[980px] xl:max-w-[1150px] xl:w-[1150px] mx-auto">
            <ConsoleCard />
          </div>

        </section>
      </main>

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      <ProjectsSection />
    </div>
  );
}
