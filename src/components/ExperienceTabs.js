import React, { useRef, useState } from 'react';

const ExperienceTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRefs = useRef([]);

  const roles = ['Thilak', 'Karthik'];

  const handleClick = (index) => {
    overlayRefs.current.forEach((ref, i) => {
      if (ref) ref.classList.remove('erased');
    });

    // Erase overlay of clicked item
    const overlay = overlayRefs.current[index];
    if (overlay) overlay.classList.add('erased'); 

    setActiveIndex(index);
  };

  return (
    <div className="exptabs">
      <div className="highlight" style={{ transform: `translateY(${activeIndex * 6}rem)` }}></div>

      {roles.map((name, idx) => (
        <div key={name} onClick={() => handleClick(idx)}>
          <span className="role-container">
            <span className="role-text base">{name}</span>
            <span
              className="role-text overlay"
              ref={(el) => (overlayRefs.current[idx] = el)}
            >
              {name}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTabs;
