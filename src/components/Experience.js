import React, { useRef, useEffect, useState } from 'react';
import ExperienceCard from './ExperienceCard';

const Experience = () => {
  const data = require('../json/about.json');
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRefs = useRef([]);

  const [highheight, setHighheight] = useState(4.5)


  useEffect(() => {
    const handleScroll = () => {
      const width = window.innerWidth;
      if (width < 560) {
        setHighheight(3.25);
      } else if (width < 768) {
        setHighheight(3.5);
      } else if (width < 960) {
        setHighheight(3.75);
      } else if (width < 1440) {
        setHighheight(4);
      } else {
        setHighheight(4.5);
      }

      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only run scroll logic if section is in view
      if (top < viewportHeight && top + height > 0) {
        const progress = Math.min(Math.max(-top / viewportHeight, 0), data.experience.length - 1);
        const index = Math.floor(progress);
        setActiveIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [data.experience.length]);


  // const handleClick = (index) => {
  //   overlayRefs.current.forEach((ref, i) => {
  //     if (ref) ref.classList.remove('erased');
  //   });

  //   // Erase overlay of clicked item
  //   const overlay = overlayRefs.current[index];
  //   if (overlay) overlay.classList.add('erased');

  //   setActiveIndex(index);
  // };

  return (
    <div className="tvsection exps" ref={sectionRef}>
      <div className="exp-transform">
        <div className="exp-tab-center">
          <div className="f-container">
            <h2 className="about-headline font-semibold">
              Experience
            </h2>
          </div>
          <div className="exp-tabs-content-center">
            <div className="exp-tabs-content-transform">
              <div className="f-container exp-tabs-content">
                {/* LEFT SIDE - TABS */}
                <div className="exp-title-tabs">
                  <div className="highlight" style={{ transform: `translateY(${activeIndex * highheight}rem)` }}></div>
                  {/* {data.experience.map((edata, idx) => (
                    <div className="role-container" key={idx}>
                      <span className={`role-text ${activeIndex === idx ? 'active' : ''}`}>
                        {edata.title}
                      </span>
                    </div>
                  ))} */}
                  {data.experience.map((exp, idx) => (
                    <div className="role-container-center" key={exp.uid}>
                      <span className="role-container">
                        <span className="role-text base">{exp.title}</span>
                        <span
                          className={`role-text overlay ${idx === activeIndex ? 'erased' : ''}`}
                          ref={(el) => (overlayRefs.current[idx] = el)}
                        >
                          {exp.title}
                        </span>
                      </span>
                    </div>
                  ))}

                </div>

                {/* RIGHT SIDE - ACTIVE EXPERIENCE CARD */}
                <div className="exp-card-tabs">
                  {data.experience.map((edata, idx) => (
                    idx === activeIndex && (
                      <ExperienceCard key={idx} edata={edata} />
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
