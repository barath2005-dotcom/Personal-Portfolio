import React, { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { MouseProvider } from './context/MouseContext';
import { ScrollProvider } from './context/ScrollContext';
import { ErrorBoundary } from './ErrorBoundary';

import IntroLoader from './components/IntroLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import SocialDock from './components/SocialDock';
import Footer from './components/Footer';
import CinematicEffects from './components/CinematicEffects';

// Lazy load heavy 3D scene
const Scene3D = lazy(() => import('./three/Scene3D'));

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.6,
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
    <ErrorBoundary>
      <MouseProvider>
        <ScrollProvider>
          <AnimatePresence mode="wait">
            {showIntro && <IntroLoader key="intro" onComplete={() => setShowIntro(false)} />}
          </AnimatePresence>

          <div className="relative min-h-screen bg-[#050608] text-white selection:bg-[#E8C48E]/30 selection:text-white font-body overflow-x-hidden">

            {/* Full-page 3D Background Scene */}
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>

            {/* Cinematic Scroll & Overlay Effects */}
            <CinematicEffects />

            {/* Floating Navigation */}
            <Navbar />

            {/* Social Dock */}
            <SocialDock />

            {/* Main Content */}
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </ScrollProvider>
      </MouseProvider>
    </ErrorBoundary>
  );
}

export default App;
