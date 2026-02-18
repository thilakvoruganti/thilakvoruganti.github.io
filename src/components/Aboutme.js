import React, { useEffect, useState } from 'react'

import CERT_GIF from "../images/gifs/certifications.gif";
import LEETCODE_GIF from "../images/gifs/leetcode.gif";
import IMPACT_GIF from "../images/gifs/impact.gif";
import { EXTERNAL_LINKS } from "../constants";
import { trackEvent } from "../lib/firebaseAnalytics";

const cards = [
  {
    title: "Certifications",
    caption: "Always Learning",
    src: CERT_GIF,
    alt: "Certification badges animation",
    body: "Industry-recognized certifications validating strong engineering fundamentals.",
  },
  {
    title: "Leet Code",
    caption: "Continuous Practice",
    src: LEETCODE_GIF,
    alt: "LeetCode profile animation",
    body: "Regular problem solving to strengthen algorithms and data structures.",
    href: EXTERNAL_LINKS.leetcode,
    cta: "View LeetCode profile",
    eventName: "about_leetcode_click",
  },
  {
    title: "Impact",
    caption: "Real World Impact",
    src: IMPACT_GIF,
    alt: "Impact metrics animation",
    body: "Production systems serving millions of users, backed by academic and industry experience.",
  },
];


export default function Aboutme() {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const gifHeight = (() => {
    if (vw >= 1440) return '180px';
    if (vw >= 960) return '12.5vw';
    if (vw >= 767) return '20.83vw';
    if (vw >= 559) return '41.725vw';
    return '45.615vw';
  })();

  const cardColumns = (() => {
    if (vw >= 960) return 3;
    if (vw >= 767) return 2;
    return 1;
  })();

  const columnGap = vw >= 1440 ? '50px' : 'calc(var(--f-col-width) * 2)';

  return (
    <section id="about" className="w-full bg-white pt-0 pb-16 text-neutral-900 md:pb-24">
      <div className="f-container flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="about-headline font-semibold">
            About me
          </h2>
          <p className="about-intro max-w-4xl text-[#86868B]">
            I’m a <span className="about-highlight">full-stack software engineer</span> based in <span className="about-highlight">Atlanta</span>, focused on building reliable, scalable applications with real-world impact. My work spans backend systems, data-driven platforms, and user-centric interfaces, shaped by both industry and academic experience. I care about clean architecture, performance at scale, and delivering systems that actually get used.
          </p>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${cardColumns}, minmax(0, 1fr))`, columnGap, rowGap: '50px' }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-start gap-4"
              style={{ width: '100%' }}
            >
              <div
                className="flex rounded-2xl bg-[#282828] px-6 pt-6 pb-4 shadow-lg"
                style={{ width: '100%', aspectRatio: '1 / 1' }}
              >
                <div className="flex w-full flex-col items-start gap-4">
                  <p className="text-[26px] leading-[31px] font-normal text-white">{card.title}</p>
                  <div className="flex w-full flex-1 items-center justify-center">
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="object-contain"
                      style={{ height: gifHeight, width: 'auto', maxWidth: '100%' }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              <p className="text-left text-[32px] leading-[39px] font-normal text-neutral-900" style={{ width: '100%' }}>
                {card.caption}
              </p>
              <p
                className="text-left text-[#86868B]"
                style={{ width: '100%' }}
              >
                {card.body}
              </p>
              {card.href && card.cta ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-base font-medium text-neutral-900 underline underline-offset-4"
                  onClick={() => {
                    if (card.eventName) {
                      trackEvent(card.eventName, { label: card.title, target: card.href });
                    }
                  }}
                >
                  {card.cta}
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="f-container">
        <Testimonial />
      </div> */}

    </section>
  );
}
