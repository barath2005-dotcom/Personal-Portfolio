import React, { useEffect, useRef, useState } from 'react';

const StatCounter = ({ value, label, suffix = '', icon: Icon }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  // Parse the value to handle both integer and float
  const targetValue = parseFloat(value);
  const isFloat = value.toString().includes('.');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp = null;
          const duration = 2000; // 2 seconds

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out quad
            const easeOutProgress = progress * (2 - progress);
            const currentCount = easeOutProgress * targetValue;
            
            setCount(isFloat ? currentCount.toFixed(2) : Math.floor(currentCount));
            
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(isFloat ? targetValue.toFixed(2) : targetValue);
            }
          };
          
          const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
          if (mediaQuery.matches) {
            setCount(isFloat ? targetValue.toFixed(2) : targetValue);
          } else {
            requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [targetValue, isFloat]);

  return (
    <div 
      ref={counterRef}
      className="glass-card p-5 rounded-xl flex items-center justify-between bg-[#070b14]/70 backdrop-blur-xl border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-300 relative overflow-hidden group shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon on Left */}
      {Icon && (
        <div className="p-3 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 group-hover:scale-110 group-hover:bg-[#00E5FF]/20 transition-all duration-300">
          <Icon className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      )}

      {/* Number and Label on Right */}
      <div className="flex flex-col items-end text-right z-10">
        <div className="flex items-baseline">
          <span className="text-3xl md:text-4xl font-bold font-heading text-[#00E5FF] tracking-tight drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            {count}
          </span>
          {suffix && (
            <span className="text-2xl font-bold text-[#00E5FF] ml-0.5">{suffix}</span>
          )}
        </div>
        <p className="text-gray-400 text-[10px] md:text-xs mt-1 font-semibold tracking-wider uppercase font-body">{label}</p>
      </div>
    </div>
  );
};

export default StatCounter;
