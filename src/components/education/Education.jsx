import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { education } from '../../data/education';
import SectionWrapper from '../shared/SectionWrapper';
import GlassCard from '../shared/GlassCard';

/**
 * Education Section Component
 * Displays educational history in stacked glass cards
 */
const Education = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }
    },
  };

  return (
    <SectionWrapper id="education" title="Education">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-6 md:space-y-8 relative"
        >
          {/* Subtle timeline track behind cards */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/10 -z-10 hidden md:block" />

          {education.map((edu, index) => {
            const isInProgress = edu.status?.toLowerCase() === 'in progress' || edu.status?.toLowerCase() === 'current';
            const statusColor = isInProgress ? 'text-[#00E5FF] border-[#00E5FF]/30' : 'text-[#6C63FF] border-[#6C63FF]/30';
            const glowClass = isInProgress ? 'shadow-[0_0_20px_rgba(0,229,255,0.15)] border-[#00E5FF]/40' : 'border-white/10';

            return (
              <motion.div key={index} variants={itemVariants} className="relative">
                {/* Node indicator for timeline */}
                <div className="absolute left-[-1.6rem] top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white/20 hidden md:block" />

                <GlassCard className={`p-6 md:p-8 transition-all duration-300 ${glowClass}`}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    
                    {/* Main Info */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-1">
                        <span className="text-white">{edu.degree}</span>
                        {edu.field && (
                          <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] bg-clip-text text-transparent ml-2">
                            in {edu.field}
                          </span>
                        )}
                      </h3>
                      
                      <div className="mt-2 space-y-1">
                        <p className="text-white font-medium text-lg">
                          {edu.institution}
                        </p>
                        {edu.university && (
                          <p className="text-gray-400 text-sm">
                            {edu.university}
                          </p>
                        )}
                        <p className="text-gray-500 text-sm flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {edu.location}
                        </p>
                      </div>
                    </div>

                    {/* Metadata (Period, Grade, Status) */}
                    <div className="flex flex-col md:items-end gap-2 shrink-0 border-t border-white/10 md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0">
                      <div className="text-gray-400 font-mono text-sm bg-white/5 px-3 py-1 rounded-md inline-block w-fit">
                        {edu.period}
                      </div>
                      
                      {edu.grade && (
                        <div className="text-[#00E5FF] font-bold text-lg">
                          {edu.grade}
                        </div>
                      )}
                      
                      {edu.status && (
                        <div className={`text-xs font-semibold px-2.5 py-1 rounded-full border bg-white/5 uppercase tracking-wider inline-block mt-2 ${statusColor}`}>
                          {edu.status}
                        </div>
                      )}
                    </div>

                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Education;
