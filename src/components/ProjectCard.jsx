import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTiltEffect } from '../hooks/useTiltEffect';

const ProjectCard = ({ project }) => {
  const { ref, style, handlers } = useTiltEffect(6);

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-card overflow-hidden"
    >
      <div 
        className="h-48 w-full bg-[#0a0b0e] rounded-t-3xl relative flex items-center justify-center overflow-hidden border-b border-[rgba(232,196,142,0.05)]"
        style={project.image ? {
          backgroundImage: `url(${project.image})`,
          backgroundSize: '320% auto',
          backgroundPosition: project.imagePosition || '0% 0%',
          backgroundRepeat: 'no-repeat'
        } : {}}
      >
        {!project.image && (
          <div className="bg-[linear-gradient(rgba(232,196,142,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,196,142,0.05)_1px,transparent_1px)] bg-[size:20px_20px] w-full h-full" />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-white">
          {project.title}
        </h3>
        <p className="text-sm text-white/40 mt-2 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech && project.tech.map((t, index) => (
            <span
              key={index}
              className="glass-chip bg-white/[0.04] border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs text-white/50"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 glass-button text-sm px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/60 hover:text-white transition"
            >
              <FiGithub /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-[#E8C48E]/10 border border-[#E8C48E]/20 text-[#E8C48E] hover:bg-[#E8C48E]/20 transition"
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
