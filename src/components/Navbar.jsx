import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl backdrop-blur-[40px] bg-white/[0.03] border border-[rgba(232,196,142,0.12)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="w-9 h-9 border border-[#E8C48E]/40 rounded-full flex items-center justify-center font-heading font-bold text-[#E8C48E] cursor-pointer" onClick={() => scrollToSection('home')}>
          BR
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-4 py-2 text-sm transition-all duration-300 hover:text-[#E8C48E] hover:drop-shadow-[0_0_8px_rgba(232,196,142,0.5)] ${
                activeSection === link.id ? 'text-[#E8C48E]' : 'text-white/60'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1 h-1 rounded-full bg-[#E8C48E] absolute bottom-0 left-1/2 -translate-x-1/2"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Button */}
        <div className="hidden md:block">
          <button onClick={() => scrollToSection('contact')} className="px-5 py-2 text-sm text-[#E8C48E] border border-[#E8C48E]/50 rounded-full hover:bg-[#E8C48E]/10 transition-colors">
            Let's Connect
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white/80" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-[rgba(232,196,142,0.12)] bg-white/[0.02]"
        >
          <div className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left text-sm ${activeSection === link.id ? 'text-[#E8C48E]' : 'text-white/60'}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
