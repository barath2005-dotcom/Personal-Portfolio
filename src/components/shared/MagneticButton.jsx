import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, href, onClick, variant = 'outline', className = '', icon: Icon, disabled = false }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (disabled || prefersReducedMotion || !buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    
    // Calculate distance from center of button
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Apply dampening factor
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const handleMouseLeave = () => {
    // Reset to center
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;
  
  // Base styling for the button
  const baseClasses = "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-full transition-colors font-body";
  
  // Variant styling
  const variantClasses = variant === 'primary' 
    ? "bg-[#00E5FF] text-[#050505] hover:bg-[#00E5FF]/90 primary" 
    : "border border-white/20 text-white hover:border-[#00E5FF]/50 hover:text-[#00E5FF] bg-transparent backdrop-blur-sm";
  
  // Disabled styling
  const disabledClasses = disabled ? "opacity-50 pointer-events-none" : "";

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={`magnetic-btn ${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      data-magnetic // Used by CustomCursor to detect hover
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </Component>
  );
};

export default MagneticButton;
