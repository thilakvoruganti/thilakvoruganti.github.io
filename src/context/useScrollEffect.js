// hooks/useScrollEffect.js
import { useRef, useState, useEffect } from 'react';

const useScrollEffect = (setlimit = 79, initialTransform = 30) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: initialTransform,
    opacity: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = ref.current;
      if (section) {
        const { top } = section.getBoundingClientRect();
        const varylimit = (top / window.innerHeight) * 100;

        if (varylimit < setlimit) {
          setStyle({ transform: 0, opacity: 1 });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run immediately
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setlimit]);

  return { ref, style };
};

export default useScrollEffect;
