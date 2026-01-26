import React, { createContext, useContext, useRef, useState } from 'react'
import { useEffect } from 'react'

const PortContent = createContext()


const PortProvider = (props) => {


  const [logoc, setLogoc] = useState({ color1: '#000000', color2: '#000000' })
  const [bcpts, setBcpts] = useState({ bc: '', tc: '' })
  const [effect, setEffect] = useState(false)
  const [di, setDI] = useState(false)

  const[viewportW, setviewportW] = useState(window.innerWidth)

  



  



  const [scrolled, setScrolled] = useState(false); // Tracks if the user has scrolled past the threshold

  const [footerbg, setFooterbg] = useState(false)

  const [scrolling, setScrolling] = useState(false); // Tracks if the user is currently scrolling

  useEffect(() => {
    let scrollTimeout; // To prevent excessive updates when scrolling

    const handleScroll = () => {
      // Set scrolling state to true when user starts scrolling
      if (!scrolling) {
        setScrolling(true);
      }

      // Get the current scroll position
      const scrollPosition = window.scrollY;

      // Get the font size in pixels (assuming it's a standard unit for 'em')
      const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

      // Check if the scroll position has passed 100vh - 3em
      if (scrollPosition > window.innerHeight - 4 * fontSize) {
        setScrolled(true);
      }
       else {
        setScrolled(false);
      }

      if(scrollPosition > window.innerHeight + 4 * fontSize ){
        setFooterbg(true)
      }
      else{
        setFooterbg(false)
      }


      // Clear the timeout when the user stops scrolling
      clearTimeout(scrollTimeout);

      // Set a timeout to update the scrolling state back to false after 100ms of inactivity
      scrollTimeout = setTimeout(() => {
        setScrolling(false);
      }, 100);
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout); // Cleanup timeout as well
    };
  }, [scrolling]);


  useEffect(()=>{
    setTimeout(() => {
      setEffect(true);
    }, 2000);
  },)

  useEffect(() => {
    const handleScroll = () => {
        const sections = document.querySelectorAll('.tvsection');
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 20 && rect.bottom >= window.innerHeight / 20) {
                const bgColor = getComputedStyle(section).backgroundColor;
                setLogoc({
                    ...logoc,
                    color1: getContrastColor(bgColor, section),
                    color2: bgColor
                });
            }
        });

    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, [logoc]);


const getContrastColor = (bgColor, section) => {

  // If background is fully transparent, assume it is white

  if (bgColor === "rgba(0, 0, 0, 0)") {
    bgColor = "rgb(255, 255, 255)"; // Default to white
  }

  const rgb = bgColor.match(/\d+/g).map(Number);
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const isAtBottom = window.innerHeight + window.scrollY  >= document.documentElement.scrollHeight - 4 * fontSize;
  if(isAtBottom){
    return "#FFFFFF"
  }
  else if(section.getAttribute('aria-label') === 'footer'){
    return "#000000"
  } 
  return brightness > 128 ? "#000000" : "#FFFFFF";
};

/// Learning

const learningsectionRef = useRef(null)



/// Connect
  const connectRef = useRef(null)


/// Typing Animation

const [typingStarted, setTypingStarted] = useState(false);



  return (
    <PortContent.Provider value={{ typingStarted, setTypingStarted, learningsectionRef, connectRef, viewportW, logoc, setLogoc, bcpts, setBcpts, effect, setEffect, di,setDI, scrolled, setScrolled , footerbg, }}>
      {props.children}
    </PortContent.Provider>
  )
}

const usePort = () => useContext(PortContent)

export { usePort, PortProvider }