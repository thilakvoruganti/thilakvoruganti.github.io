import React, { useEffect, useState } from 'react';

import ICON_PROGRAMMING from '../images/skills/icons/programming.png';
import ICON_FRONTEND from '../images/skills/icons/frontend.png';
import ICON_API from '../images/skills/icons/api.png';
import ICON_CLOUD from '../images/skills/icons/cloud.png';
import ICON_DB from '../images/skills/icons/database.png';

import LOGO_PY from '../images/skills/techicons/python.svg';
import LOGO_JAVA from '../images/skills/techicons/java.svg';
import LOGO_JS from '../images/skills/techicons/js.svg';
import LOGO_TS from '../images/skills/techicons/ts.svg';
import LOGO_SQL from '../images/skills/techicons/sql.svg';
import LOGO_CS from '../images/skills/techicons/chash.svg';
import LOGO_REACT from '../images/skills/techicons/react.svg';
import LOGO_ANGULAR from '../images/skills/techicons/angular.svg';
import LOGO_HTML from '../images/skills/techicons/html.svg';
import LOGO_CSS from '../images/skills/techicons/css.svg';
import LOGO_TAILWIND from '../images/skills/techicons/tailwind.svg';
import LOGO_MUI from '../images/skills/techicons/materialui.svg';
import LOGO_NODE from '../images/skills/techicons/nodejs.svg';
import LOGO_SPRING from '../images/skills/techicons/springboot.svg';
import LOGO_DOTNET from '../images/skills/techicons/dotnet.svg';
import LOGO_EXPRESS from '../images/skills/techicons/Express.svg';
import LOGO_FLASK from '../images/skills/techicons/flask.svg';
import LOGO_GRAPHQL from '../images/skills/techicons/graphql.svg';
import LOGO_AWS from '../images/skills/techicons/Aws.svg';
import LOGO_AZURE from '../images/skills/techicons/azure.svg';
import LOGO_DOCKER from '../images/skills/techicons/docker.svg';
import LOGO_K8S from '../images/skills/techicons/kubernates.svg';
import LOGO_GHA from '../images/skills/techicons/githubactions.svg';
import LOGO_MONGO from '../images/skills/techicons/mangodb.svg';
import LOGO_FIREBASE from '../images/skills/techicons/firebase.svg';
import LOGO_SQLSERVER from '../images/skills/techicons/sqlserver.svg';
import LOGO_JEST from '../images/skills/techicons/jest.svg';
import LOGO_CYPRESS from '../images/skills/techicons/cypress.svg';
import LOGO_POSTMAN from '../images/skills/techicons/postman.svg';

const categories = [
  { label: 'Programming Languages', icon: ICON_PROGRAMMING },
  { label: 'Front-end & Mobile', icon: ICON_FRONTEND },
  { label: 'Back-end & APIs', icon: ICON_API },
  { label: 'Cloud & Dev-Ops', icon: ICON_CLOUD },
  { label: 'Databases & Testing', icon: ICON_DB },
];

const techSets = {
  default: [
    { name: 'Python', years: '3+ years', logo: LOGO_PY },
    { name: 'Java', years: '3+ years', logo: LOGO_JAVA },
    { name: 'JavaScript', years: '3+ years', logo: LOGO_JS },
    { name: 'TypeScript', years: '5+ years', logo: LOGO_TS },
    { name: 'MySQL', years: '4+ years', logo: LOGO_SQL },
    { name: 'C#', years: '3+ years', logo: LOGO_CS },
  ],
  'Front-end & Mobile': [
    { name: 'React', years: '5+ years', logo: LOGO_REACT },
    { name: 'Angular', years: '2+ years', logo: LOGO_ANGULAR },
    { name: 'HTML', years: '5 years', logo: LOGO_HTML },
    { name: 'CSS', years: '5 years', logo: LOGO_CSS },
    { name: 'Tailwind', years: '4+ years', logo: LOGO_TAILWIND },
    { name: 'Material UI', years: '2+ years', logo: LOGO_MUI },
  ],
  'Back-end & APIs': [
    { name: 'Spring Boot', years: '3+ years', logo: LOGO_SPRING },
    { name: 'ASP.NET Core', years: '3+ years', logo: LOGO_DOTNET },
    { name: 'Node.js', years: '2+ years', logo: LOGO_NODE },
    { name: 'Express.js', years: '2+ years', logo: LOGO_EXPRESS },
    { name: 'Flask', years: '3 years', logo: LOGO_FLASK },
    { name: 'GraphQL', years: '3 years', logo: LOGO_GRAPHQL },
  ],
  'Cloud & Dev-Ops': [
    { name: 'AWS', years: '5 years', logo: LOGO_AWS },
    { name: 'Azure', years: '2 years', logo: LOGO_AZURE },
    { name: 'Docker', years: '5 years', logo: LOGO_DOCKER },
    { name: 'Kubernetes', years: '2+ years', logo: LOGO_K8S },
    { name: 'Github Actions', years: '5 years', logo: LOGO_GHA },
  ],
  'Databases & Testing': [
    { name: 'SQL Server', years: '2 years', logo: LOGO_SQLSERVER },
    { name: 'Mongodb', years: '2 years', logo: LOGO_MONGO },
    { name: 'Firebase', years: '1 year', logo: LOGO_FIREBASE },
    { name: 'Jest', years: '3 years', logo: LOGO_JEST },
    { name: 'Cypress', years: '3 years', logo: LOGO_CYPRESS },
    { name: 'Postman', years: '5 years', logo: LOGO_POSTMAN },
  ],
};

export default function Skills() {
  const [active, setActive] = useState(categories[0]?.label || '');
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isAccordion = vw <= 960;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="f-container flex w-full flex-col gap-12">
        <h2 className="about-headline font-semibold">Skills</h2>

        {isAccordion ? (
          <div className="flex w-full flex-col">
            {categories.map((item) => {
              const isActive = item.label === active;
              return (
                <div key={item.label} className="border-b border-black">
                  <button
                    type="button"
                    onClick={() => setActive(item.label)}
                    className="relative flex w-full items-center pb-3 text-left"
                    style={{ paddingTop: '20px', paddingBottom: '20px' }}
                  >
                    {isActive && (
                      <img
                        src={item.icon}
                        alt=""
                        className="absolute left-0 top-1/2 h-10 w-10 -translate-y-1/2 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <span
                      className={`text-[32px] leading-[39px] text-neutral-900 font-semibold transition-all ${
                        isActive ? 'pl-12' : 'pl-0'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>

                  {isActive && (
                    <div className="pb-8">
                      <div
                        className="grid w-full gap-x-[30px] gap-y-[30px]"
                        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
                      >
                        {(techSets[item.label] || techSets.default).map((t) => (
                          <div
                            key={t.name}
                            className="flex h-[150px] w-full flex-col justify-center rounded-lg border border-neutral-200 bg-white shadow-sm"
                          >
                            <div className="flex flex-1 flex-col items-start justify-center gap-2 px-4 text-left">
                              <img
                                src={t.logo}
                                alt={`${t.name} logo`}
                                className="h-[50px] w-[50px] object-contain"
                                loading="lazy"
                                decoding="async"
                              />
                              <div className="text-[20px] leading-[24px] font-semibold text-neutral-900">{t.name}</div>
                              <div className="text-[16px] leading-[19px] text-neutral-600">Experience: {t.years}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid w-full gap-10 min-[960px]:grid-cols-[1fr_1.5fr] min-[960px]:items-start min-[960px]:gap-12">
            {/* Left column: categories */}
            <div className="flex flex-col">
              {categories.map((item) => {
                const isActive = item.label === active;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActive(item.label)}
                    className="relative flex items-center border-b border-black pb-3 text-left"
                    style={{ paddingTop: '20px', paddingBottom: '20px' }}
                  >
                    {isActive && (
                      <img
                        src={item.icon}
                        alt=""
                        className="absolute left-0 top-1/2 h-10 w-10 -translate-y-1/2 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <span
                      className={`text-[32px] leading-[39px] text-neutral-900 font-semibold transition-all ${
                        isActive ? 'pl-12' : 'pl-0'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right column: tech cards */}
            <div className="flex w-full justify-start">
              <div
                className="grid w-full gap-x-[30px] gap-y-[30px]"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
              >
                {(techSets[active] || techSets.default).map((t) => (
                  <div
                    key={t.name}
                    className="flex w-full flex-col justify-center rounded-lg border border-neutral-200 bg-white shadow-sm"
                  >
                    <div className="flex flex-col items-start justify-center gap-2 px-4 py-4 text-left">
                      <img
                        src={t.logo}
                        alt={`${t.name} logo`}
                        className="h-[50px] w-[50px] object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="text-[20px] leading-[24px] font-semibold text-neutral-900">{t.name}</div>
                      <div className="text-[16px] leading-[19px] text-neutral-600">Experience: {t.years}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
