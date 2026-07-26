import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'HOME', id: 'home' },
  { name: 'ABOUT', id: 'about' },
  { name: 'SKILLS', id: 'skills' },
  { name: 'PROJECTS', id: 'projects' },
  { name: 'EXPERIENCE', id: 'experience' },
  { name: 'CONTACT', id: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section active detection
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navLinks[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#08080a]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* Logo: Monogram BR in Gold Circle */}
          <button 
            onClick={() => scrollToSection('home')}
            className="group flex items-center justify-center w-11 h-11 rounded-full border border-[#C5A059]/40 bg-[#0e0e12]/80 backdrop-blur-md shadow-[0_0_15px_rgba(197,160,89,0.2)] hover:border-[#E5C158] hover:shadow-[0_0_25px_rgba(229,193,88,0.5)] transition-all duration-300"
          >
            <span className="font-heading font-bold text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#E5C158]">
              BR
            </span>
          </button>

          {/* Center Pill Nav Bar */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#121218]/80 backdrop-blur-xl border border-white/10 shadow-xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 text-xs font-heading font-medium tracking-widest transition-all duration-300 ${
                    isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E5C158] shadow-[0_0_8px_#E5C158]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Connect Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 rounded-full border border-[#C5A059]/40 bg-[#0e0e12]/60 hover:bg-[#C5A059]/10 text-xs font-heading font-semibold tracking-widest text-white hover:text-[#E5C158] hover:border-[#E5C158] transition-all duration-300 shadow-[0_0_15px_rgba(197,160,89,0.15)] hover:shadow-[0_0_25px_rgba(229,193,88,0.4)] flex items-center gap-2"
            >
              <span>LET'S CONNECT</span>
              <span className="text-[#E5C158] font-bold">✦</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#08080a]/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-heading tracking-widest text-gray-300 hover:text-[#E5C158] transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-4 px-8 py-3 rounded-full btn-gold text-sm tracking-widest"
            >
              LET'S CONNECT ✦
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
