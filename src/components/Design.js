import React from 'react';

import IMG_FIGMA from '../images/design/figma.png';
import IMG_DRIBBBLE from '../images/design/dribble.png';
import { trackEvent } from '../lib/firebaseAnalytics';

const cards = [
  {
    label: 'Figma',
    image: IMG_FIGMA,
    heading: 'Interaction-first design work',
    description: 'Product flows, wireframes, and interaction design.',
    cta: 'Explore Figma',
    href: 'https://www.figma.com/design/FvlYxLL3CynFheKNWQ8hNR/Untitled?node-id=0-1&m=dev&t=SIT8urLuVuzR5ksK-1',
  },
  {
    label: 'Dribbble',
    image: IMG_DRIBBBLE,
    heading: 'Visual UI explorations',
    description: 'Interface concepts, layout studies, and visual direction work.',
    cta: 'Explore Dribbble',
    href: 'https://dribbble.com/thilakvoruganti',
  },
];

export default function Design() {
  return (
    <section id="design" className="relative z-[3] w-full bg-black py-16 md:py-24">
      <div className='f-container'>
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-12 px-4 md:px-0">
          <h2 className="about-headline font-semibold text-white">Design</h2>

        <div className="grid grid-cols-1 gap-8 min-[760px]:grid-cols-2">
          {cards.map((card) => (
            <div key={card.label} className="w-full">
              <div className="flex w-full flex-col rounded-2xl bg-[#1E1E1E] px-6 pb-0 pt-6 md:px-8 md:pt-8">
                <div className="text-white text-[32px] leading-[39px] font-semibold mb-6">{card.label}</div>
                <div className="mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl bg-black/40 aspect-[630/691]">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              <div className="mt-6 flex flex-col gap-2">
                <div className="text-white text-[32px] leading-[39px] font-semibold">
                  {card.heading}
                </div>
                <p className="text-white/80 text-[20px] leading-[24px]">{card.description}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      const name = card.label === "Figma" ? "design_figma_click" : "design_dribbble_click";
                      trackEvent(name, {
                        label: card.label,
                        title: card.cta,
                        target: card.href,
                      });
                    }}
                    className="group inline-flex w-fit items-center text-[15px] leading-[22px] font-medium text-white underline decoration-[1.25px] underline-offset-[6px] tracking-tight transition-colors duration-200 hover:text-white focus-visible:text-white"
                  >
                    <span className="inline-flex items-center">
                      <span
                        aria-hidden="true"
                        className="inline-block max-w-0 overflow-hidden text-[17px] opacity-0 transition-all duration-200 group-hover:max-w-[18px] group-hover:opacity-100 group-focus-visible:max-w-[18px] group-focus-visible:opacity-100"
                      >
                        →
                      </span>
                      <span className="ml-0 transition-all duration-200 group-hover:ml-1 group-focus-visible:ml-1">
                        {card.cta}
                      </span>
                    </span>
                  </a>
                ) : null}
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
