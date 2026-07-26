import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiDownload } from 'react-icons/fi';
import { personal } from '../data/personal';
import portraitImage from '../assets/images/portrait-bw.jpg';

export default function Hero() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <motion.div variants={fadeUp} className="flex items-center mb-4">
              <span className="w-8 h-px bg-[#E8C48E]/50 inline-block mr-3"></span>
              <span className="text-[#E8C48E]/80 text-sm font-mono tracking-wider uppercase">Hello, I'm</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-8xl font-heading font-bold gradient-gold-text mb-4 mt-8 md:mt-0">
              BARATH R
            </motion.h1>
            
            <motion.div variants={fadeUp} className="flex flex-col items-start gap-2 mb-6 w-full">
              <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl tracking-[0.2em] md:tracking-[0.3em] font-medium text-[#E8C48E] uppercase drop-shadow-[0_0_15px_rgba(232,196,142,0.3)]">CO-FOUNDER & COO @ JUNO ROBOTICS</h2>
              <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base tracking-[0.3em] md:tracking-[0.4em] text-white/80 font-light uppercase mt-1">SOFTWARE ENGINEER</h3>
              <h4 className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-[#E8C48E]/50 font-light uppercase">AI & DATA SCIENCE STUDENT</h4>
            </motion.div>
            
            <motion.p variants={fadeUp} className="text-white/50 text-sm md:text-base max-w-md leading-relaxed mt-4 md:mt-6">
              {personal.heroDescription}
            </motion.p>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 100, delay: 0.6 } }
              }}
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
            >
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto justify-center btn-gold px-7 py-3.5 flex items-center gap-2 bg-[#E8C48E] text-[#050608] font-medium rounded-full hover:bg-white transition-colors cursor-pointer"
              >
                View Projects
                <FiArrowUpRight />
              </button>
              <a 
                href="/barath-resume.pdf" 
                download="Barath_R_Resume.pdf"
                className="w-full sm:w-auto justify-center btn-glass px-7 py-3.5 flex items-center gap-2 border border-[#E8C48E]/30 text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                Download Resume
                <FiDownload />
              </a>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div variants={fadeUp} className="relative hidden lg:block">
            <div className="w-80 h-96 mx-auto rounded-3xl border border-[#E8C48E]/10 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden animate-float-slow">
              {/* Subtle gold gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E8C48E]/5 to-transparent pointer-events-none z-10" />
              
              {/* Decorative Rings */}
              <div className="absolute top-[-10%] right-[-20%] w-64 h-64 rounded-full border border-[#E8C48E]/10" />
              <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 rounded-full border border-[#E8C48E]/10" />
              
              {/* Image */}
              <img src={portraitImage} alt="Portrait" className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}
