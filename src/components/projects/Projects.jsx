import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../../data/projects';

const Projects = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotateX: [0, 2, -2, 0],
        rotateY: [0, -3, 3, 0],
      }}
      transition={{
        duration: 5.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
      className="transform-gpu"
    >
      <div id="projects" className="glass-card p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FiBriefcase className="w-4 h-4 text-[#C5A059]" />
            <h2 className="text-xs font-heading font-bold tracking-widest text-white uppercase">FEATURED PROJECTS</h2>
          </div>

          <button 
            onClick={scrollToContact}
            className="text-xs font-heading font-semibold text-gray-400 hover:text-[#E5C158] flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL PROJECTS</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Project Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.slice(0, 3).map((project, idx) => (
            <motion.div
              key={project.id}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3.6 + idx * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.2,
              }}
              whileHover={{ y: -16, scale: 1.03 }}
              className="group rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#C5A059]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg"
            >
              {/* Project Preview Image / Code Mockup Container */}
              <div className="relative w-full h-40 bg-[#0a0a0e] border-b border-white/10 overflow-hidden flex items-center justify-center p-3">
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/10 via-transparent to-[#C5A059]/10 border border-white/10 flex flex-col p-3 justify-between group-hover:scale-105 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#E5C158] uppercase font-bold">{project.category}</span>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/60" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                      <span className="w-2 h-2 rounded-full bg-green-500/60" />
                    </div>
                  </div>
                  <div className="text-xs font-heading font-bold text-white tracking-wide">
                    {project.title}
                  </div>
                </div>
              </div>

              {/* Content & Footer */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm font-heading font-bold text-white mb-1.5 group-hover:text-[#E5C158] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags & Arrow */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[9px] font-mono text-gray-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.github || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-[#E5C158] group-hover:border-[#C5A059] transition-all"
                    aria-label="View Project"
                  >
                    <FiArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
