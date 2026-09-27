import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "INITIALIZING KERNEL...",
  "LOADING ASSETS...",
  "RENDERING 3D ENVIRONMENT...",
  "COMPILING SHADERS...",
  "SYSTEM READY."
];

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading, reveal, exit
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 2500;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsedTime = timestamp - start;
      const progressRatio = Math.min(elapsedTime / duration, 1);
      
      const easeOutQuint = 1 - Math.pow(1 - progressRatio, 5);
      const currProgress = Math.floor(easeOutQuint * 100);
      setProgress(currProgress);

      if (currProgress > 20) setWordIndex(1);
      if (currProgress > 50) setWordIndex(2);
      if (currProgress > 80) setWordIndex(3);
      if (currProgress === 100) setWordIndex(4);

      if (progressRatio < 1) {
        requestAnimationFrame(step);
      } else {
        setPhase('reveal');
        setTimeout(() => setPhase('exit'), 4500);
        setTimeout(() => onComplete(), 6000);
      }
    };

    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="loader-wrapper"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050608] overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-[#E8C48E]/5 blur-[120px] pointer-events-none rounded-full" />

          {phase === 'loading' && (
            <motion.div 
              key="loading-ui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', transition: { duration: 0.8 } }}
              className="relative z-10 w-full max-w-xs md:max-w-sm px-6 flex flex-col items-center"
            >
              {/* Central Glowing Ring */}
              <div className="relative w-48 h-48 flex items-center justify-center mb-12">
                {/* Outer rotating dashed ring */}
                <motion.svg
                  className="absolute inset-0 w-full h-full text-[#E8C48E]/40 drop-shadow-[0_0_10px_rgba(232,196,142,0.5)]"
                  viewBox="0 0 100 100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
                </motion.svg>
                
                {/* Inner rotating solid ring */}
                <motion.svg
                  className="absolute inset-2 w-[92%] h-[92%] text-[#E8C48E]/30"
                  viewBox="0 0 100 100"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="30 10 10 10" />
                </motion.svg>

                {/* Number */}
                <div className="absolute text-5xl font-mono font-light text-white tracking-tighter">
                  {progress}<span className="text-2xl text-[#E8C48E]/70">%</span>
                </div>
              </div>

              {/* Status Text Box */}
              <div className="w-full bg-white/[0.03] border border-[#E8C48E]/20 p-4 rounded-xl backdrop-blur-md relative overflow-hidden">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8C48E]"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-[#E8C48E] font-mono tracking-widest uppercase">System Status</span>
                  <span className="text-[10px] text-white/50 font-mono">v1.0.0</span>
                </div>
                <div className="h-5 relative overflow-hidden text-xs text-white/80 font-mono uppercase tracking-wider">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={wordIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center"
                    >
                      {words[wordIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#D4B878] to-[#E8C48E]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="reveal-name"
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              {/* Slow red ambient pulse */}
              <motion.div 
                className="absolute inset-0"
                initial={{ background: 'radial-gradient(circle, transparent 60%, transparent 100%)' }}
                animate={{ background: [
                  'radial-gradient(circle, rgba(139,0,0,0) 60%, rgba(0,0,0,0) 100%)',
                  'radial-gradient(circle, rgba(139,0,0,0.15) 40%, rgba(0,0,0,0) 100%)',
                  'radial-gradient(circle, rgba(139,0,0,0.25) 30%, rgba(50,0,0,0.1) 100%)'
                ] }}
                transition={{ duration: 3, delay: 0.8, ease: 'easeInOut' }}
              />

              <div className="relative text-center">
                {/* Main name - starts gold, stays visible underneath */}
                <motion.div
                  initial={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <h1 
                    className="text-5xl md:text-[8rem] font-heading font-black tracking-tighter leading-none px-4 gradient-gold-text"
                  >
                    BARATH R
                  </h1>

                  {/* Blood layer - clips from top to bottom slowly */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ duration: 3, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h1 
                      className="text-5xl md:text-[8rem] font-heading font-black tracking-tighter leading-none px-4"
                      style={{
                        background: 'linear-gradient(180deg, #8B0000 0%, #DC143C 30%, #B22222 50%, #8B0000 70%, #4A0000 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 30px rgba(139, 0, 0, 0.8)) drop-shadow(0 0 60px rgba(220, 20, 60, 0.4))'
                      }}
                    >
                      BARATH R
                    </h1>
                  </motion.div>

                  {/* Blood drip elements */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${12 + i * 12}%`,
                        top: '85%',
                        width: `${3 + Math.random() * 4}px`,
                      }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${30 + i * 10}px`, opacity: [0, 0.9, 0.7] }}
                      transition={{ 
                        duration: 2.5 + i * 0.3, 
                        delay: 2.0 + i * 0.25, 
                        ease: [0.45, 0, 0.55, 1] 
                      }}
                    >
                      <div 
                        className="w-full h-full rounded-b-full"
                        style={{
                          background: 'linear-gradient(180deg, #8B0000, #DC143C 40%, #B22222 80%, #8B0000)',
                          boxShadow: '0 4px 15px rgba(139, 0, 0, 0.6)'
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Subtitle with blood theme */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1.2, ease: 'easeOut' }}
                  className="text-xs md:text-sm tracking-[0.5em] font-mono mt-8 uppercase"
                  style={{ color: 'rgba(220, 20, 60, 0.6)' }}
                >
                  Experience Activated
                </motion.p>
              </div>
            </motion.div>
          )}
          
          {/* Top/Bottom Cinematic Bars */}
          {phase !== 'exit' && (
            <>
              <motion.div 
                exit={{ y: "-100%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute top-0 left-0 w-full h-[10vh] bg-[#030405] border-b border-[#E8C48E]/10 z-30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
              />
              <motion.div 
                exit={{ y: "100%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute bottom-0 left-0 w-full h-[10vh] bg-[#030405] border-t border-[#E8C48E]/10 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]" 
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
