import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTiltEffect } from '../hooks/useTiltEffect';

const ProjectCard = ({ project }) => {
  const { ref, style, handlers } = useTiltEffect(6);

  const handleMouseMove = (e) => {
    handlers.onMouseMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-card overflow-hidden group relative border border-white/[0.05] hover:border-[#E8C48E]/40 transition-colors duration-500 rounded-3xl"
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl z-0"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(232, 196, 142, 0.15), transparent 40%)'
        }}
      />

      <div className="relative z-10 h-56 w-full bg-[#0a0b0e] overflow-hidden border-b border-white/[0.05]">
        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] to-transparent opacity-80 z-10" />
        
        {project.image ? (
          <div 
            className="w-full h-full transform transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: '320% auto',
              backgroundPosition: project.imagePosition || '0% 0%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ) : (
          <div className="w-full h-full bg-grid-pattern opacity-50 transform transition-transform duration-700 group-hover:scale-110" />
        )}
      </div>

      <div className="p-6 relative z-10">
        <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#E8C48E] transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-sm text-white/50 mt-3 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech && project.tech.map((t, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full border border-white/[0.1] bg-white/[0.02] text-[#E8C48E]/80 shadow-[0_0_10px_rgba(232,196,142,0)] group-hover:shadow-[0_0_15px_rgba(232,196,142,0.1)] group-hover:border-[#E8C48E]/30 transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-8">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white/70 hover:bg-white/[0.1] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <FiGithub className="text-lg" /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-[#E8C48E]/10 border border-[#E8C48E]/20 text-[#E8C48E] hover:bg-[#E8C48E]/20 hover:shadow-[0_0_20px_rgba(232,196,142,0.2)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <FiExternalLink className="text-lg" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
