import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiMessageSquare, FiArrowUpRight } from 'react-icons/fi';
import { personal } from '../../data/personal';

const Contact = () => {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
        rotateX: [0, 1.5, -1.5, 0],
      }}
      transition={{
        duration: 5.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
      className="transform-gpu mt-6"
    >
      <div id="contact" className="glass-card p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Tagline */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xs font-heading font-bold tracking-widest text-white uppercase">LET'S WORK TOGETHER</h2>
              <div className="w-8 h-px bg-white/20" />
            </div>
            <p className="text-gray-400 text-xs font-body leading-relaxed">
              I'm always open to discussing new opportunities, collaborations, or interesting projects.
            </p>
          </div>

          {/* Middle Column: 3 Contact Glass Pills */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Email */}
            <a 
              href={`mailto:${personal.email}`}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#C5A059]/50 hover:bg-[#C5A059]/5 transition-all flex flex-col justify-between group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-[#E5C158] mb-2">
                <FiMail className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-400 block uppercase">Email</span>
                <span className="text-xs font-heading font-semibold text-white group-hover:text-[#E5C158] truncate block">
                  {personal.email}
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E5C158] mb-2">
                <FiMapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-400 block uppercase">Location</span>
                <span className="text-xs font-heading font-semibold text-white truncate block">
                  Tamil Nadu, India
                </span>
              </div>
            </div>

            {/* Get In Touch */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E5C158] mb-2">
                <FiMessageSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-400 block uppercase">Get In Touch</span>
                <span className="text-xs font-heading font-semibold text-white truncate block">
                  I'll reply ASAP!
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Circular Gold Badge Button */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <a
              href={`mailto:${personal.email}`}
              className="group relative w-28 h-28 rounded-full border border-[#C5A059]/40 bg-gradient-to-br from-[#121218] to-[#08080a] flex items-center justify-center p-2 shadow-[0_0_25px_rgba(197,160,89,0.2)] hover:shadow-[0_0_40px_rgba(229,193,88,0.5)] hover:border-[#E5C158] transition-all duration-500"
            >
              {/* Spinning Outer Text Ring */}
              <div className="absolute inset-0 flex items-center justify-center text-[7px] font-mono font-bold tracking-widest text-gray-400 uppercase animate-[spin_20s_linear_infinite] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="textPath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="fill-gray-400 text-[8.5px] font-bold uppercase tracking-widest">
                    <textPath href="#textPath">LET'S BUILD SOMETHING AMAZING TOGETHER • </textPath>
                  </text>
                </svg>
              </div>

              {/* Inner Gold Arrow Circle */}
              <div className="w-12 h-12 rounded-full btn-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FiArrowUpRight className="w-5 h-5 text-[#08080a]" />
              </div>
            </a>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
