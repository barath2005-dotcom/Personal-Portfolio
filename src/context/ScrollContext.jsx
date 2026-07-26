import React, { createContext, useContext, useState, useEffect } from 'react';

const ScrollContext = createContext({
  scrollY: 0,
  scrollProgress: 0,
  direction: 'down',
});

export function ScrollProvider({ children }) {
  const [scroll, setScroll] = useState({
    scrollY: 0,
    scrollProgress: 0,
    direction: 'down',
  });

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;
          const direction = currentScrollY > lastScrollY ? 'down' : 'up';
          lastScrollY = currentScrollY;

          setScroll({
            scrollY: currentScrollY,
            scrollProgress: progress,
            direction,
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={scroll}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScroll = () => useContext(ScrollContext);
export default ScrollContext;
