import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiArrowUpRight } from 'react-icons/fi';
import { personal } from '../../data/personal';

const About = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      animate={{
        y: [0, -14, 0],
        rotateX: [0, 2, -2, 0],
        rotateY: [0, -2.5, 2.5, 0],
      }}
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="h-full transform-gpu"
    >
      <div id="about" className="glass-card p-6 md:p-8 flex flex-col justify-between h-full">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FiUser className="w-4 h-4 text-[#C5A059]" />
            <h2 className="text-xs font-heading font-bold tracking-widest text-white uppercase">ABOUT ME</h2>
            <div className="w-8 h-px bg-white/20" />
          </div>

          <p className="text-gray-300 text-sm leading-relaxed font-body mb-6">
            {personal.bio}
          </p>

          <button 
            onClick={scrollToContact}
            className="px-5 py-2.5 btn-outline-dark text-[11px] font-heading font-bold tracking-widest uppercase flex items-center gap-2 mb-8"
          >
            <span>MORE ABOUT ME</span>
            <FiArrowUpRight className="w-3.5 h-3.5 text-[#E5C158]" />
          </button>
        </div>

        {/* 2x2 Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-heading text-white">7+</span>
            <span className="text-[10px] font-heading font-medium tracking-wider text-gray-400 mt-1 uppercase">PROJECTS</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-heading text-white">7.33</span>
            <span className="text-[10px] font-heading font-medium tracking-wider text-gray-400 mt-1 uppercase">CGPA</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-heading text-white">1+</span>
            <span className="text-[10px] font-heading font-medium tracking-wider text-gray-400 mt-1 uppercase">INTERNSHIP</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-heading text-white">3+</span>
            <span className="text-[10px] font-heading font-medium tracking-wider text-gray-400 mt-1 uppercase">CERTIFICATIONS</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
