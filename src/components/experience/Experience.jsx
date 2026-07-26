import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiDownload } from 'react-icons/fi';

const timelineEntries = [
  {
    period: '2024 - Present',
    role: 'AI & Data Science Student',
    company: 'Dr. Mahalingam College of Eng & Tech',
    description: 'Pursuing B.E. in AI & Data Science with focus on Machine Learning and Data Engineering.',
  },
  {
    period: '2023',
    role: 'Data Science Intern',
    company: 'Training Tains, Erode',
    description: 'Worked on real-world predictive models, machine learning algorithms, and data visualization.',
  },
  {
    period: '2023',
    role: 'Web Developer Project',
    company: 'Academic & Personal',
    description: 'Developed responsive web applications and full-stack project implementations.',
  },
];

const Experience = () => {
  return (
    <motion.div
      animate={{
        y: [0, -14, 0],
        rotateX: [0, -2, 2, 0],
        rotateY: [0, 2.5, -2.5, 0],
      }}
      transition={{
        duration: 5.0,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
      className="h-full transform-gpu"
    >
      <div id="experience" className="glass-card p-6 md:p-8 flex flex-col justify-between h-full">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <FiBriefcase className="w-4 h-4 text-[#C5A059]" />
            <h2 className="text-xs font-heading font-bold tracking-widest text-white uppercase">EXPERIENCE</h2>
            <div className="w-8 h-px bg-white/20" />
          </div>

          {/* Timeline Entries */}
          <div className="relative pl-6 space-y-6 border-l border-white/10">
            {timelineEntries.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Gold Dot */}
                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#E5C158] shadow-[0_0_8px_#E5C158]" />

                <span className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                  {item.period}
                </span>
                <h3 className="text-sm font-heading font-bold text-white mb-0.5">
                  {item.role}
                </h3>
                <p className="text-xs font-heading font-medium text-[#C5A059] mb-2">
                  {item.company}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <a 
          href={personal.resume}
          download="Barath_Resume.pdf"
          className="w-full py-4 mt-2 btn-outline-dark text-xs font-heading font-bold tracking-widest uppercase flex items-center justify-center gap-2 group"
        >
          <span>VIEW FULL RESUME</span>
          <FiDownload className="w-4 h-4 text-[#E5C158]" />
        </a>
      </div>
    </motion.div>
  );
};

export default Experience;
