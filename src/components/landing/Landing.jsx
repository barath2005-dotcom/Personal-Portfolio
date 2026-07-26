import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import { useMousePosition } from '../../hooks/useMousePosition';
import { personal } from '../../data/personal';

const HeroScene = lazy(() => import('../../three/HeroScene'));

const Landing = () => {
  const mousePosition = useMousePosition();

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full min-h-screen pt-28 pb-16 px-6 md:px-12 lg:px-16 flex items-center justify-center overflow-hidden">
      
      {/* 3D WebGL Canvas Layer (Three.js 3D Glass Photo Frame, Pedestal, Cube, Torus, Stage Floor) */}
      <Suspense fallback={null}>
        <HeroScene mousePosition={mousePosition} />
      </Suspense>

      {/* Far Right Vertical Social Sidebar */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6 p-4 rounded-full bg-[#0e0e12]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E5C158] transition-colors p-1" aria-label="GitHub">
          <FiGithub className="w-5 h-5" />
        </a>
        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E5C158] transition-colors p-1" aria-label="LinkedIn">
          <FiLinkedin className="w-5 h-5" />
        </a>

        <a href={`mailto:${personal.email}`} className="text-gray-400 hover:text-[#E5C158] transition-colors p-1" aria-label="Email">
          <FiMail className="w-5 h-5" />
        </a>
        
        <div className="w-px h-8 bg-white/10 my-1" />
        
        <div className="writing-vertical text-[10px] font-heading font-semibold tracking-widest text-gray-500 uppercase flex items-center gap-2">
          <span>SCROLL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158] shadow-[0_0_8px_#E5C158]" />
        </div>
      </div>

      {/* Main Hero Content Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 pointer-events-none">
        
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-center pointer-events-auto">
          
          {/* Hello Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="text-xs font-heading font-medium tracking-widest text-gray-400 uppercase">
              Hello, I'm
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-[#C5A059] to-transparent" />
          </motion.div>

          {/* Huge Main Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold font-heading text-white tracking-tight uppercase leading-none mb-4"
          >
            BARATH R
          </motion.h1>

          {/* Subtitles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base font-heading font-semibold tracking-widest text-[#C5A059] uppercase mb-6"
          >
            <span>SOFTWARE ENGINEER</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span>AI &amp; DATA SCIENCE STUDENT</span>
          </motion.div>

          {/* Bio Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed font-body mb-8"
          >
            Building intelligent software, beautiful digital experiences, and AI-powered solutions that solve real-world problems.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button 
              onClick={handleScrollToProjects}
              className="px-7 py-3.5 btn-gold text-xs font-heading font-bold tracking-widest uppercase flex items-center gap-2"
            >
              <span>VIEW PROJECTS</span>
              <FiArrowUpRight className="w-4 h-4" />
            </button>

            <a 
              href={personal.resume} 
              download="Barath_Resume.pdf"
              className="px-7 py-3.5 btn-outline-dark text-xs font-heading font-bold tracking-widest uppercase flex items-center gap-2"
            >
              <span>DOWNLOAD RESUME</span>
              <FiDownload className="w-4 h-4 text-[#E5C158]" />
            </a>
          </motion.div>

        </div>

        {/* Right Column: Transparent viewport area so 3D Three.js Glass Photo Frame & Pedestal show through 100% */}
        <div className="lg:col-span-6 h-[420px] pointer-events-none" />

      </div>
    </section>
  );
};

export default Landing;
