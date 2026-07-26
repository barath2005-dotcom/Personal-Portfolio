import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { certificates } from '../../data/certificates';
import SectionWrapper from '../shared/SectionWrapper';
import GlassCard from '../shared/GlassCard';

/**
 * Certificates Section Component
 * Displays certificates in a responsive grid layout
 */
const Certificates = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }
    },
  };

  return (
    <SectionWrapper id="certificates" title="Certificates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {certificates.map((cert, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <GlassCard 
                className="h-full flex flex-col p-6 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(108,99,255,0.2)] transition-all duration-300 hover:border-[#6C63FF]/40 cursor-default"
              >
                {/* Certificate Icon / Badge */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#00E5FF] group-hover:text-[#6C63FF] transition-colors duration-300">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path d="M13.25 14.5 15 21l-3-2-3 2 1.75-6.5"/>
                    <path d="M10 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/>
                    <path d="M14 2v6h6"/>
                  </svg>
                </div>

                <div className="flex-1 flex flex-col">
                  {/* Certificate Details */}
                  <h3 className="font-heading text-lg font-bold text-white mb-2 line-clamp-2">
                    {cert.name}
                  </h3>
                  
                  <h4 className="text-sm font-semibold bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] bg-clip-text text-transparent mb-4">
                    {cert.issuer}
                  </h4>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Footer (Date & Link if available) */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs font-mono text-gray-500">
                      {cert.date}
                    </span>
                    
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#00E5FF] hover:text-[#6C63FF] transition-colors duration-200"
                        aria-label={`View certificate for ${cert.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Certificates;
