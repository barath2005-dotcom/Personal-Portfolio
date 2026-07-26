import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-triggered animations.
 * @param {Object} animationConfig - GSAP animation 'from' values (e.g., { y: 50, opacity: 0 })
 * @param {Object} scrollConfig - ScrollTrigger configuration overrides
 * @returns {React.RefObject} - Ref to attach to the animated element
 */
export function useScrollAnimation(animationConfig = {}, scrollConfig = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    // Skip animations for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        duration: 1,
        ease: 'power3.out',
        ...animationConfig,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...scrollConfig,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return elementRef;
}
