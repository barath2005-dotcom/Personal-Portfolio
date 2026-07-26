import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for tracking mouse position.
 * Returns normalized values (-1 to 1) relative to window center.
 * Throttled to ~60fps. Returns center on touch devices.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = null;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      currentX = e.clientX;
      currentY = e.clientY;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        setPosition({
          x: currentX,
          y: currentY,
          normalizedX: (currentX / innerWidth) * 2 - 1,
          normalizedY: -(currentY / innerHeight) * 2 + 1,
        });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
}
