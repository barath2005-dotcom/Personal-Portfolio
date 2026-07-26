import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CosmicBackground = () => {
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const flare1Y = useTransform(smoothScroll, [0, 1], [0, 180]);
  const flare2Y = useTransform(smoothScroll, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#08080a] text-white">
      
      {/* ===== LUXURY GOLD AMBIENT GLOW FLARES ===== */}
      <motion.div 
        style={{ y: flare1Y }}
        className="absolute top-[10%] left-[20%] w-[550px] h-[550px] bg-[#C5A059]/10 rounded-full blur-[160px]" 
      />
      <motion.div 
        style={{ y: flare2Y }}
        className="absolute top-[45%] right-[15%] w-[600px] h-[600px] bg-[#E5C158]/8 rounded-full blur-[170px]" 
      />
      <div className="absolute top-[75%] left-[25%] w-[500px] h-[500px] bg-[#9A7B38]/10 rounded-full blur-[150px]" />

      {/* Subtle Dust Star Grid */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:40px_40px]" />

    </div>
  );
};

export default CosmicBackground;
