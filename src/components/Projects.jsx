import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const featuredProjects = projects.filter((project) => project.featured === true);

  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold gradient-gold-text mb-4">
              FEATURED PROJECTS
            </h2>
            <p className="text-white/50 max-w-xl text-lg">
              A selection of my recent work in web development, 3D experiences, and AI applications.
            </p>
          </div>
          <a
            href="#all-projects"
            className="group flex items-center gap-3 text-[#E8C48E] hover:text-white transition-colors pb-1 border-b border-[#E8C48E]/30 hover:border-white"
          >
            <span className="text-sm font-semibold tracking-widest uppercase">View Archive</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
          </a>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project) => (
            <motion.div 
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
