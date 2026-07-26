import { useMemo } from 'react';
import { useMouse } from '../context/MouseContext';

export function useMouseParallax(depth = 1) {
  const mouse = useMouse();

  const values = useMemo(() => {
    const x = mouse.normalizedX * 20 * depth;
    const y = mouse.normalizedY * 15 * depth;
    const rotateX = mouse.normalizedY * 3 * depth;
    const rotateY = mouse.normalizedX * 3 * depth;

    return {
      x,
      y,
      rotateX,
      rotateY,
      style: {
        transform: `translate3d(${x}px, ${-y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    };
  }, [mouse.normalizedX, mouse.normalizedY, depth]);

  return values;
}
