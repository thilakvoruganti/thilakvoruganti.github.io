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
  { key: "EF", title: "Ecoflights", img: EFImg, href: "https://github.com/thilakvoruganti/FlightBooking" },
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

  // Use a middle copy to allow seamless looping both directions
  const items = useMemo(() => [...PROJECTS, ...PROJECTS, ...PROJECTS], []);
  const initialIndex = total; // start on the middle copy
  const [index, setIndex] = useState(initialIndex);
  const [enableTransition, setEnableTransition] = useState(true);
  const [page, setPage] = useState(1);

  const next = useCallback(() => {
    setIndex((s) => s + 1);
    setPage((p) => (p >= total ? 1 : p + 1));
  }, [total]);

  const prev = useCallback(() => {
    setIndex((s) => s - 1);
    setPage((p) => (p <= 1 ? total : p - 1));
  }, [total]);

  const handleTransitionEnd = useCallback(
    (e) => {
      // Ignore bubbled transition events from children
      if (e.target !== e.currentTarget) return;

      setIndex((current) => {
        if (current >= total * 2) {
          setEnableTransition(false);
          const next = current - total;
          requestAnimationFrame(() => setEnableTransition(true));
          return next;
        }
        if (current < total) {
          setEnableTransition(false);
          const next = current + total;
          requestAnimationFrame(() => setEnableTransition(true));
          return next;
        }
        return current;
      });
    },
    [total]
  );

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

          <div ref={viewportRef} className="relative w-full overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${index * layout.step}px)`,
                transition: enableTransition ? "transform 0.45s ease" : "none",
                width: `${layout.step * items.length}px`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
            {items.map((project, idx) => (
              <a
                key={`${project.key}-${idx}`}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} link`}
                onClick={() =>
                  trackEvent("project_click", {
                    project: project.key,
                    title: project.title,
                    target: project.href,
                  })
                }
                className="flex flex-col justify-between rounded-2xl text-black shadow-lg"
                style={{
                  backgroundColor: CARD_COLORS[project.key],
                  flex: `0 0 ${layout.cardW}px`,
                  width: `${layout.cardW}px`,
                  height: `${layout.cardH}px`,
                  marginRight: `${idx === items.length - 1 ? 0 : GAP}px`,
                }}
              >
                <div className="px-4 pt-4 text-[26px] leading-[32px] font-semibold">{project.title}</div>
                <div className="flex flex-1 items-end justify-center pb-4">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-auto object-contain"
                    style={{ height: `${layout.imgH}px` }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
