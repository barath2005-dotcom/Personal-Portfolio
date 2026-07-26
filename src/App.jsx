import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/shared/Navbar';

import CosmicBackground from './components/shared/CosmicBackground';

import Landing from './components/landing/Landing';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Experience from './components/experience/Experience';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08080a] text-white selection:bg-[#C5A059]/40 selection:text-white font-body overflow-x-hidden">

      {/* Global 3D Dark Gold Background */}
      <CosmicBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Landing />

      {/* Main Dashboard Section matching mockup image structure */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-20 space-y-6 pb-16">
        
        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1 (Left: About Me) */}
          <div className="lg:col-span-4 flex flex-col">
            <About />
          </div>

          {/* Column 2 (Center: Technical Skills & Featured Projects) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Skills />
            <Projects />
          </div>

          {/* Column 3 (Right: Experience Timeline) */}
          <div className="lg:col-span-3 flex flex-col">
            <Experience />
          </div>

        </div>

        {/* Bottom CTA Bar (Contact) */}
        <Contact />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
