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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
