import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.05] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Barath R. All rights reserved.
        </p>
        <p className="text-sm text-white/20">
          Designed & Built with ❤️ and lots of ☕
        </p>
        
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-rotate-slow animate-spin">
            <path id="textCircle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            <text fontSize="8.5" fill="rgba(232,196,142,0.5)" letterSpacing="2">
              <textPath href="#textCircle">LET'S BUILD SOMETHING AMAZING TOGETHER • </textPath>
            </text>
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#E8C48E]/30 flex items-center justify-center">
            <FiArrowUpRight className="text-[#E8C48E] text-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
