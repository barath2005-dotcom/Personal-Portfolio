import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch devices
    const touchMediaQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(touchMediaQuery.matches);

    const handleTouchChange = (e) => setIsTouchDevice(e.matches);
    touchMediaQuery.addEventListener('change', handleTouchChange);

    // Check for reduced motion
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionMediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionMediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      touchMediaQuery.removeEventListener('change', handleTouchChange);
      motionMediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over links, buttons, or custom magnetic elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-magnetic]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Inner Dot Cursor */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: isHovering ? '#00E5FF' : 'white',
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          transition: 'background-color 0.15s ease'
        }}
      />
      {/* Outer Ring Cursor */}
      <div
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9998]"
        style={{
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.15s ease-out',
          backgroundColor: isHovering ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(255,255,255,0.5)'
        }}
      />
    </>
  );
};

export default CustomCursor;
