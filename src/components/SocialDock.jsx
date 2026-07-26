import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { personal } from '../data/personal';

const SocialDock = () => {
  const icons = [
    { icon: FiGithub, href: personal.github, label: 'GitHub' },
    { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
    { icon: FiTwitter, href: personal.twitter, label: 'Twitter' },
    { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col backdrop-blur-xl bg-white/[0.03] border border-[rgba(232,196,142,0.1)] rounded-2xl p-2 gap-1">
      {icons.map((item, i) => (
        <motion.a
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.label}
          whileHover={{ scale: 1.15 }}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-white/40 hover:text-[#E8C48E] hover:bg-[#E8C48E]/10 transition-all duration-300"
        >
          <item.icon className="text-lg" />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialDock;
