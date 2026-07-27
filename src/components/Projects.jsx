import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const featuredProjects = projects.filter((project) => project.featured === true);

  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <h2 className="font-heading text-3xl font-bold gradient-gold-text">
            FEATURED PROJECTS
          </h2>
          <a
            href="#all-projects"
            className="text-sm text-[#E8C48E]/60 hover:text-[#E8C48E] transition cursor-pointer"
          >
            VIEW ALL PROJECTS &rarr;
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14"
        >
          {featuredProjects.map((project) => (
            <motion.div 
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
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
