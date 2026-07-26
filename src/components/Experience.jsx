import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { experience } from '../data/experience';
import { personal } from '../data/personal';

const Experience = () => {
  return (
    <section id="experience" className="py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h2 className="font-heading text-3xl font-bold gradient-gold-text text-center mb-16">
          EXPERIENCE
        </h2>
        
        <div className="relative">
          <div className="absolute left-[20px] lg:left-1/2 lg:-translate-x-px top-0 w-0.5 h-full bg-gradient-to-b from-[#E8C48E]/60 via-[#E8C48E]/30 to-transparent" />
          
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className="absolute left-[14px] lg:left-1/2 lg:-translate-x-1/2 w-3 h-3 rounded-full bg-[#E8C48E] shadow-[0_0_12px_rgba(232,196,142,0.5)]" />
              
              <div className={`ml-12 lg:ml-0 lg:w-[45%] glass-card p-6 ${i % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>

                <h3 className="font-heading text-lg font-semibold text-white mt-3">
                  {exp.role}
                </h3>
                <p className="text-sm text-[#E8C48E]/60 mt-1">{exp.company}</p>
                <p className="text-sm text-white/40 mt-2">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <a
          href={personal.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glass px-6 py-3 flex items-center gap-2 mt-12 mx-auto w-fit text-[#E8C48E] border border-[#E8C48E]/20 bg-white/[0.04] rounded-xl hover:bg-white/[0.08] transition"
        >
          <FiDownload /> VIEW FULL RESUME
        </a>
      </div>
    </section>
  );
};

export default Experience;
