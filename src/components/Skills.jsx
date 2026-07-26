import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold gradient-gold-text text-transparent bg-clip-text bg-gradient-to-r from-[#E8C48E] to-[#C5A059]">
            TECHNICAL SKILLS
          </h2>
          <p className="text-white/40 text-center mt-3">
            Technologies I work with
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group p-6 flex flex-col items-center justify-center gap-3 bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl border border-[rgba(232,196,142,0.08)] rounded-3xl hover:border-[#E8C48E]/30 hover:shadow-[0_0_20px_rgba(232,196,142,0.1)] transition-all duration-300"
            >
              <skill.icon className="text-3xl text-white/60 group-hover:text-[#E8C48E] transition-colors duration-300" />
              <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
