import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const MouseContext = createContext({
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
});

export function MouseProvider({ children }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const rafRef = useRef(null);
  const latestEvent = useRef(null);

  const updateMouse = useCallback(() => {
    const e = latestEvent.current;
    if (e) {
      setMouse({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: -(e.clientY / window.innerHeight) * 2 + 1,
      });
      latestEvent.current = null;
    }
    rafRef.current = requestAnimationFrame(updateMouse);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      latestEvent.current = e;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updateMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateMouse]);

  return (
    <MouseContext.Provider value={mouse}>
      {children}
    </MouseContext.Provider>
  );
}

export const useMouse = () => useContext(MouseContext);
export default MouseContext;
