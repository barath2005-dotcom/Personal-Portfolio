import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "INITIALIZING KERNEL...",
  "LOADING ASSETS...",
  "RENDERING 3D ENVIRONMENT...",
  "COMPILING SHADERS...",
  "SYSTEM READY."
];

// Pre-computed drip data for realistic blood drips
const DRIPS = [
  { left: '8%', w: 5, h: 70, delay: 1.8, dur: 3.0 },
  { left: '16%', w: 7, h: 95, delay: 2.1, dur: 3.5 },
  { left: '24%', w: 4, h: 50, delay: 2.6, dur: 2.8 },
  { left: '33%', w: 6, h: 85, delay: 1.9, dur: 3.3 },
  { left: '42%', w: 8, h: 120, delay: 2.3, dur: 4.0 },
  { left: '50%', w: 5, h: 60, delay: 2.8, dur: 2.7 },
  { left: '58%', w: 7, h: 100, delay: 2.0, dur: 3.6 },
  { left: '66%', w: 4, h: 45, delay: 3.0, dur: 2.5 },
  { left: '74%', w: 6, h: 80, delay: 2.2, dur: 3.2 },
  { left: '82%', w: 5, h: 65, delay: 2.5, dur: 2.9 },
  { left: '91%', w: 4, h: 55, delay: 2.7, dur: 3.1 },
];

// Pre-computed splatter positions
const SPLATTERS = [
  { left: '12%', top: '76%', size: 8, delay: 3.2 },
  { left: '25%', top: '82%', size: 5, delay: 3.5 },
  { left: '40%', top: '79%', size: 10, delay: 3.0 },
  { left: '53%', top: '84%', size: 6, delay: 3.8 },
  { left: '68%', top: '74%', size: 9, delay: 3.1 },
  { left: '77%', top: '80%', size: 7, delay: 3.6 },
  { left: '88%', top: '77%', size: 8, delay: 3.3 },
  { left: '20%', top: '88%', size: 4, delay: 3.9 },
  { left: '60%', top: '86%', size: 5, delay: 4.0 },
];

const BloodDrip = ({ left, w, h, delay, dur, index }) => (
  <motion.div
    className="absolute overflow-visible"
    style={{ left, top: '80%', width: w + 6 }}
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: h, opacity: 1 }}
    transition={{ duration: dur, delay, ease: [0.45, 0.05, 0.55, 0.95] }}
  >
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${w + 6} ${h}`} 
      preserveAspectRatio="none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`bgrad${index}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a0000" />
          <stop offset="20%" stopColor="#8B0000" />
          <stop offset="50%" stopColor="#AA0000" />
          <stop offset="80%" stopColor="#CC1111" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
        <filter id={`bglow${index}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Main drip body with bulbous tip */}
      <path 
        d={`M${(w+6)/2 - w/2} 0 
            L${(w+6)/2 + w/2} 0 
            Q${(w+6)/2 + w/2 + 1} ${h*0.5} ${(w+6)/2 + w/2 - 1} ${h*0.75}
            Q${(w+6)/2 + w/2 + 2} ${h*0.9} ${(w+6)/2} ${h + w}
            Q${(w+6)/2 - w/2 - 2} ${h*0.9} ${(w+6)/2 - w/2 + 1} ${h*0.75}
            Q${(w+6)/2 - w/2 - 1} ${h*0.5} ${(w+6)/2 - w/2} 0 Z`}
        fill={`url(#bgrad${index})`}
        filter={`url(#bglow${index})`}
      />
      {/* Wet highlight reflection */}
      <ellipse
        cx={(w+6)/2}
        cy={h * 0.4}
        rx={w * 0.2}
        ry={h * 0.08}
        fill="rgba(255,100,100,0.15)"
      />
    </svg>
  </motion.div>
);

const BloodSplatter = ({ left, top, size, delay }) => (
  <motion.div
    className="absolute"
    style={{ left, top }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0.7] }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  >
    <div 
      style={{
        width: size, 
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #CC1111 0%, #8B0000 60%, #4a0000 100%)',
        boxShadow: '0 0 8px rgba(139,0,0,0.8), 0 0 20px rgba(139,0,0,0.3)',
      }}
    />
    {/* Tiny satellite splatters */}
    <div style={{
      position: 'absolute', left: size * 1.2, top: -size * 0.3,
      width: size * 0.3, height: size * 0.3, borderRadius: '50%',
      background: '#8B0000',
    }} />
    <div style={{
      position: 'absolute', left: -size * 0.5, top: size * 0.8,
      width: size * 0.25, height: size * 0.25, borderRadius: '50%',
      background: '#6B0000',
    }} />
  </motion.div>
);

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
        setTimeout(() => setPhase('exit'), 5000);
        setTimeout(() => onComplete(), 6500);
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
              {/* Dark blood-red ambient glow */}
              <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, delay: 0.5 }}
                style={{ background: 'radial-gradient(ellipse at center, rgba(80,0,0,0.35) 0%, rgba(30,0,0,0.15) 50%, transparent 80%)' }}
              />

              {/* Screen flash on blood impact */}
              <motion.div 
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle, rgba(139,0,0,0.5) 0%, rgba(60,0,0,0.3) 100%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 0.6, 0, 0.3, 0.1] }}
                transition={{ duration: 2.5, delay: 0.8, times: [0, 0.3, 0.35, 0.5, 0.55, 1] }}
              />

              <div className="relative text-center">
                {/* Name - appears white first */}
                <motion.div
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <h1 className="text-5xl md:text-[8rem] font-heading font-black tracking-tighter leading-none px-4 text-white/90">
                    BARATH R
                  </h1>

                  {/* Blood covering layer 1 - irregular wavy edge, slow motion */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ clipPath: 'polygon(0% 0%, 8% 0%, 16% 0%, 24% 0%, 32% 0%, 40% 0%, 48% 0%, 56% 0%, 64% 0%, 72% 0%, 80% 0%, 88% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
                    animate={{ clipPath: 'polygon(0% 0%, 8% 0%, 16% 0%, 24% 0%, 32% 0%, 40% 0%, 48% 0%, 56% 0%, 64% 0%, 72% 0%, 80% 0%, 88% 0%, 100% 0%, 100% 115%, 0% 108%)' }}
                    transition={{ duration: 3.5, delay: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <h1 
                      className="text-5xl md:text-[8rem] font-heading font-black tracking-tighter leading-none px-4"
                      style={{
                        background: 'linear-gradient(180deg, #2a0000 0%, #5a0000 10%, #8B0000 25%, #AA0000 40%, #CC1111 55%, #AA0000 65%, #8B0000 75%, #5a0000 90%, #2a0000 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 2px 6px rgba(139,0,0,0.9)) drop-shadow(0 0 35px rgba(180,0,0,0.6)) drop-shadow(0 8px 20px rgba(100,0,0,0.8))',
                      }}
                    >
                      BARATH R
                    </h1>
                  </motion.div>

                  {/* Blood covering layer 2 - deeper shade, slightly different timing for viscous depth */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ mixBlendMode: 'multiply', opacity: 0.5 }}
                    initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 75% 0%, 50% 0%, 25% 0%, 0% 0%)' }}
                    animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 110%, 75% 102%, 50% 112%, 25% 105%, 0% 108%)' }}
                    transition={{ duration: 4.0, delay: 1.3, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <h1 
                      className="text-5xl md:text-[8rem] font-heading font-black tracking-tighter leading-none px-4"
                      style={{
                        background: 'linear-gradient(175deg, #4a0000 0%, #8B0000 30%, #DC143C 50%, #AA0000 70%, #660000 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      BARATH R
                    </h1>
                  </motion.div>

                  {/* Wet sheen layer - subtle highlight */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ mixBlendMode: 'screen', opacity: 0 }}
                    animate={{ opacity: [0, 0, 0.12, 0.08] }}
                    transition={{ duration: 3, delay: 2.5 }}
                  >
                    <h1 
                      className="text-5xl md:text-[8rem] font-heading font-black tracking-tighter leading-none px-4"
                      style={{
                        background: 'linear-gradient(135deg, transparent 30%, rgba(255,150,150,0.4) 50%, transparent 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      BARATH R
                    </h1>
                  </motion.div>

                  {/* SVG Blood drips with bulbous tips */}
                  {DRIPS.map((drip, i) => (
                    <BloodDrip key={`drip-${i}`} {...drip} index={i} />
                  ))}

                  {/* Blood splatter dots with satellites */}
                  {SPLATTERS.map((s, i) => (
                    <BloodSplatter key={`splat-${i}`} {...s} />
                  ))}
                </motion.div>

                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 1.2, ease: 'easeOut' }}
                  className="text-xs md:text-sm tracking-[0.5em] font-mono mt-10 uppercase"
                  style={{ 
                    color: '#8B0000',
                    textShadow: '0 0 20px rgba(139,0,0,0.5), 0 0 40px rgba(139,0,0,0.2)'
                  }}
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
