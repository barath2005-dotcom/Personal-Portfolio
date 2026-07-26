import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 text-center text-xs font-body text-gray-500 relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
        <p>© {currentYear} Barath R. All rights reserved.</p>
        <p className="text-gray-500">
          Designed &amp; Built with <span className="text-red-500">❤️</span> and lots of <span className="text-[#E5C158]">☕</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
