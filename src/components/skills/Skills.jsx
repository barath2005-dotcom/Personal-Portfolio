import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu } from 'react-icons/fi';
import { 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiMongodb, 
  SiMysql, 
  SiThreedotjs 
} from 'react-icons/si';

const techSkills = [
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Java', icon: null, textIcon: '☕' },
  { name: 'Python', icon: SiPython },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Three.js', icon: SiThreedotjs },
  { name: 'OpenAI', icon: FiCpu },
];

const Skills = () => {
  return (
    <motion.div
      animate={{
        y: [0, -16, 0],
        rotateX: [0, -2, 2, 0],
        rotateY: [0, 2.5, -2.5, 0],
      }}
      transition={{
        duration: 5.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3,
      }}
      className="transform-gpu"
    >
      <div id="skills" className="glass-card p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <FiCode className="w-4 h-4 text-[#C5A059]" />
          <h2 className="text-xs font-heading font-bold tracking-widest text-white uppercase">TECHNICAL SKILLS</h2>
          <div className="w-8 h-px bg-white/20" />
        </div>

        {/* 8 Square Glass Icon Cards Row */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {techSkills.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 2.8 + (index % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }}
                whileHover={{ y: -10, scale: 1.1 }}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#C5A059]/60 hover:bg-[#C5A059]/5 transition-all duration-300 flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center text-gray-300 group-hover:text-[#E5C158] transition-colors">
                  {Icon ? <Icon className="w-6 h-6" /> : <span className="text-lg">{tech.textIcon}</span>}
                </div>
                <span className="text-[10px] font-heading font-medium tracking-wider text-gray-400 group-hover:text-white transition-colors truncate">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
