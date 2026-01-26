import React, { useEffect, useState, useRef } from 'react';
import { usePort } from '../context';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const Connect = () => {
  const connectsectionRef = useRef(null);
  const { learningsectionRef } = usePort();

  const [headingOpacity, setHeadingOpacity] = useState(0);
  const [paraOpacity, setParaOpacity] = useState(0);
  const [buttonOpacity, setButtonOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(150);
  const [scrimOpacity, setScrimOpacity] = useState(1);

  const connectHeadingRef = useRef(null);
  const connectParaRef = useRef(null);
  const connectButtonRef = useRef(null);
  const previousY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !connectHeadingRef.current ||
        !connectParaRef.current ||
        !connectButtonRef.current ||
        !learningsectionRef.current
      ) return;

      const h1 = connectHeadingRef.current.getBoundingClientRect();
      const p = connectParaRef.current.getBoundingClientRect();
      const btn = connectButtonRef.current.getBoundingClientRect();
      const learning = learningsectionRef.current.getBoundingClientRect();

      const lb = learning.bottom;

      // === Opacity logic ===
      const h1Progress = (lb - h1.top) / (h1.top - h1.bottom);
      const pProgress = (lb - p.top) / (p.top - p.bottom);
      const btnProgress = (lb - btn.top) / (btn.top - btn.bottom);

      setHeadingOpacity(clamp(h1Progress, 0, 1));
      setParaOpacity(clamp(pProgress, 0, 1));
      setButtonOpacity(clamp(btnProgress, 0, 1));

      // === TranslateY logic ===
      if (learning.bottom < h1.top && learning.bottom > 0) {
        const rawProgress = learning.bottom / h1.top;
        const progress = clamp(rawProgress, 0, 1);
        setScrimOpacity(progress);
        const newY = 150 * progress;

        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > previousY.current;
        previousY.current = currentScrollY;

        setTranslateY(prev =>
          isScrollingDown ? Math.min(prev, newY) : Math.max(prev, newY)
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='connect' ref={connectsectionRef}>
      <div className='rc-c'>
        <div className='rc'>
          <div
            className='c-mc'
            style={{
              transform: `translateY(${translateY}px)`,
              // transition: 'transform 0.15s ease-out',
            }}
          >
            <div className='section-content'>
              <h1
                ref={connectHeadingRef}
                style={{
                  opacity: headingOpacity,
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                Let's Connect
              </h1>
              <p
                ref={connectParaRef}
                style={{
                  opacity: paraOpacity,
                  transition: 'opacity 0.3s ease-out 0.1s',
                }}
              >
                I’m always open to discussing new opportunities, exciting projects, or just chatting about tech and
                innovation. Whether you’ve got a question or just want to say hi — drop me a message!
              </p>
              <button
                className='cnbtn'
                ref={connectButtonRef}
                style={{
                  opacity: buttonOpacity,
                  transition: 'opacity 0.3s ease-out 0.2s',
                }}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
        <div
          className='scrim'
          style={{
            opacity: scrimOpacity,
            backgroundImage:
              'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Connect;
