import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'reveal' | 'exit'

  useEffect(() => {
    let start = null;
    const duration = 2000; // 2 seconds to load

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsedTime = timestamp - start;
      const progressRatio = Math.min(elapsedTime / duration, 1);
      
      // Easing out quintic for smooth slowing down at the end
      const easeOutQuint = 1 - Math.pow(1 - progressRatio, 5);
      
      setProgress(Math.floor(easeOutQuint * 100));

      if (progressRatio < 1) {
        requestAnimationFrame(step);
      } else {
        setPhase('reveal');
        setTimeout(() => setPhase('exit'), 1500);
        setTimeout(() => onComplete(), 2500);
      }
    };

    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100vh', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050608] overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#E8C48E]/10 blur-[120px] rounded-full pointer-events-none" />

          {phase === 'loading' && (
            <motion.div 
              key="counter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50, filter: 'blur(10px)', transition: { duration: 0.5 } }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="text-[12rem] leading-none font-heading font-light text-white tracking-tighter mix-blend-difference">
                {progress.toString().padStart(3, '0')}
              </div>
              <div className="text-[#E8C48E]/60 text-sm tracking-[0.4em] font-mono uppercase mt-4">
                Loading Experience
              </div>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="name"
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  className="text-6xl md:text-[8rem] font-heading font-bold gradient-gold-text tracking-tighter leading-none px-4"
                >
                  BARATH R
                </motion.h1>
              </div>
            </motion.div>
          )}

          {/* Golden Progress Line */}
          {phase === 'loading' && (
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-[#E8C48E]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
