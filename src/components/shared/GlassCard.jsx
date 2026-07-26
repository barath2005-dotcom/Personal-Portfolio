import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, glow = false, as: Component = 'div', ...rest }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const MotionComponent = motion[Component] || motion.div;
  
  // Base glassmorphism styles matching design tokens
  const baseClasses = 'glass-card rounded-2xl p-6 bg-[#050505]/60 backdrop-blur-xl border border-white/10';
  
  // Optional soft glow border
  const glowClasses = glow ? 'glow-border shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-shadow duration-300' : '';
  
  // Hover animation props
  const hoverProps = hover && !prefersReducedMotion ? {
    whileHover: { y: -5, scale: 1.02 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  } : {};
  
  return (
    <MotionComponent
      className={`${baseClasses} ${glowClasses} ${className}`}
      {...hoverProps}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

export default GlassCard;
