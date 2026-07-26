import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = ({ children, id, className = '', title, subtitle }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (title && headingRef.current && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        gsap.from(headingRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%'
          }
        });
      });
      return () => ctx.revert(); // Cleanup GSAP context
    }
  }, [title]);

  return (
    <section id={id} className={`section-wrapper py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
      {title && (
        <div ref={headingRef} className="mb-16">
          {/* Small gradient accent bar */}
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] mb-6" />
          
          {/* Section Heading */}
          <h2 className="section-heading text-4xl md:text-5xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {title}
          </h2>
          
          {/* Optional Subtitle */}
          {subtitle && (
            <p className="text-gray-400 mt-4 text-lg md:text-xl font-body">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {/* Section Content */}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
