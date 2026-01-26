import React, { useMemo } from 'react';
import useScrollEffect from '../context/useScrollEffect';

import LOGO_GSU from '../images/companies/gsu.png';
import LOGO_ICUBE from '../images/companies/icube.png';
import LOGO_TCS from '../images/companies/tcs.png';

const ExperienceCard = ({ edata }) => {
  const anim = useScrollEffect();

  const copy = useMemo(() => {
    const map = {
      icube0323: {
        title: 'Software Engineer — iCube Solutions',
        dates: '03/2022 – 12/2023',
        body:
          'Built and owned full-stack product features across React, APIs, and cloud-deployed microservices, delivering scalable, secure workflows used by thousands of users in production.',
        logo: LOGO_ICUBE,
      },
      tcs0222: {
        title: 'System Engineer — Tata Consultancy Services',
        dates: '02/2021 – 02/2022',
        body:
          'Developed and optimized enterprise-scale React dashboards within the TCS DIGI framework, strengthening performance, reliability, and delivery discipline in a large, distributed engineering team.',
        logo: LOGO_TCS,
      },
      gsu0124: {
        title: 'Graduate Assistant — Georgia State University',
        dates: '01/2024 – Present',
        body:
          'Delivered full-stack data platforms and dashboards integrating Python backends, SQL pipelines, and React frontends, enabling data-driven decision-making across multi-campus academic programs.',
        logo: LOGO_GSU,
      },
    };
    return map[edata?.uid] || {
      title: `${edata?.title ?? ''} — ${edata?.name ?? ''}`.trim(),
      dates: edata?.startdate && edata?.enddate ? `${edata.startdate} – ${edata.enddate}` : '',
      body: edata?.points?.[0] || '',
      logo: null,
    };
  }, [edata]);

  return (
    <div
      data-js-controller={edata?.uid}
      className="expc r-transition"
      ref={anim.ref}
      style={{
        transform: `matrix(1, 0, 0, 1, 0, ${anim.style.transform})`,
        opacity: anim.style.opacity,
      }}
    >
      <div className="exp-card">
        <div className="t-con flex items-center justify-between gap-3 w-full mb-4">
          <div className="timeline text-[24px] leading-[29px]">{copy.dates}</div>
          {copy.logo && (
            <div className="logo-wrap w-[166px] h-[75px]">
              <img
                src={copy.logo}
                alt={`${edata?.name || 'company'} logo`}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
        <p className="b-con text-[20px] leading-[24px]">
          {copy.body}
        </p>
      </div>
    </div>
  );
};

export default ExperienceCard;
