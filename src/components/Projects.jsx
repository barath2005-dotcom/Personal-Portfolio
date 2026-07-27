import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const featuredProjects = projects.filter((project) => project.featured === true);
  const targetRef = useRef(null);
  
  // Track the scroll progress of the entire target section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform scroll progress into horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-85%"]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[300vh] bg-[#030405]">
      
      {/* Sticky container that holds the horizontal scroll */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Cinematic Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <h1 className="text-[20vw] font-heading font-black whitespace-nowrap">
            SELECTED WORKS
          </h1>
        </div>

        {/* Header Section (Fades out as you scroll) */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute top-24 left-6 lg:left-12 z-20"
        >
          <h2 className="font-heading text-4xl lg:text-6xl font-bold gradient-gold-text mb-4">
            FEATURED PROJECTS
          </h2>
          <p className="text-white/50 max-w-md text-lg">
            A cinematic journey through my best work. Keep scrolling to explore the gallery.
          </p>
        </motion.div>

        {/* Horizontal Scrolling Track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-16 px-[10vw] pt-20 items-center w-max"
        >
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0"
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
          
          {/* View All Projects "Card" */}
          <div className="w-[40vw] md:w-[25vw] flex-shrink-0 flex items-center justify-center h-full">
            <a
              href="#all-projects"
              className="group flex flex-col items-center justify-center gap-4 text-[#E8C48E]/60 hover:text-[#E8C48E] transition-colors p-12 rounded-[3rem] border border-dashed border-[#E8C48E]/20 hover:border-[#E8C48E]/50 hover:bg-[#E8C48E]/5"
            >
              <span className="text-4xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">&rarr;</span>
              <span className="text-xl font-heading tracking-widest uppercase">View Archive</span>
            </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Projects;
