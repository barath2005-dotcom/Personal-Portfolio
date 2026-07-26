import React from 'react';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useCountUp } from '../hooks/useCountUp';
import { personal } from '../data/personal';

function StatItem({ value, label }) {
  const { ref, count } = useCountUp(value);
  const suffix = String(value).includes('+') ? '+' : '';
  return (
    <div ref={ref} className="glass-card p-6 text-center bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl border border-[rgba(232,196,142,0.08)] rounded-3xl">
      <div className="text-3xl font-heading font-bold text-[#E8C48E]">{count}{suffix}</div>
      <div className="text-xs text-white/40 uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
}

export default function About() {
  const { ref, isVisible } = useScrollReveal();
  const parallaxProps = useMouseParallax(0.3);

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          {...parallaxProps}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-10 lg:p-14 bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl border border-[rgba(232,196,142,0.12)] rounded-3xl shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8C48E]/10 border border-[#E8C48E]/20 flex items-center justify-center text-[#E8C48E]">
              <FiUser />
            </div>
            <h2 className="font-heading text-2xl font-bold gradient-gold-text text-transparent bg-clip-text bg-gradient-to-r from-[#E8C48E] to-[#C5A059]">ABOUT ME</h2>
          </div>

          <p className="text-white/50 text-base leading-relaxed mt-6 max-w-4xl whitespace-pre-line">
            {personal.bio}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {personal.stats?.map((stat, index) => (
              <StatItem key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
