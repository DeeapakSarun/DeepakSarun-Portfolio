import '../styles/Navbar.css';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

function Navbar() {
  const boxRef = useRef(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  let prevScrollpos = window.scrollY || window.pageYOffset; // Track previous scroll position
  let debounceTimeout;

  useEffect(() => {
    // GSAP Fade-in animation
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay:2, ease: "power4.inOut", onComplete: enableScrollEffect }
      );
    }

    // Function to enable scroll effect after fade-in
    function enableScrollEffect() {
      const handleScroll = () => {
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
          let currentScrollPos = window.scrollY || window.pageYOffset;
          const scrollThreshold = 0; // Minimum scroll distance (adjust as needed)

          // Only hide or show the navbar if the scroll exceeds the threshold
          if (Math.abs(prevScrollpos - currentScrollPos) > scrollThreshold) {
            if (prevScrollpos > currentScrollPos) {
              setIsNavbarVisible(true); // Show navbar on scroll up
            } else {
              setIsNavbarVisible(false); // Hide navbar on scroll down
            }
          }

          prevScrollpos = currentScrollPos; // Update scroll position
        }, 1); // Delay of 50ms for debouncing scroll event
      };

      // Attach the scroll event listener
      window.addEventListener("scroll", handleScroll);

      // Cleanup scroll listener when component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (debounceTimeout) clearTimeout(debounceTimeout); // Cleanup timeout on unmount
      };
    }
  }, []);

  return (
    <div ref={boxRef} className={`navcontainer ${isNavbarVisible ? "visible" : "hidden"}`}>
      <div className="linksection">
        <p className='navlink'>Home</p>
        <p className='navlink'>About</p>
      </div>
      <div className="navlogocontainer">
        <img className="navlogo" src="/deepak.svg" alt="deepakLogo" />
      </div>
      <div className="linksection">
        <p className='navlink'>Projects</p>
        <p className='navlink'>Contact</p>
      </div>
    </div>
  );
}

export default Navbar;