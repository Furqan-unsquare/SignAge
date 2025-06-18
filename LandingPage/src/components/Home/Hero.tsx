import React, { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact-us' }
];

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] overflow-hidden">
      {/* CSS for marquee animations */}
      <style>{`
        @keyframes marquee-right {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(30%); }
        }
        
        @keyframes marquee-left {
          0% { transform: translateX(30%); }
          100% { transform: translateX(-30%); }
        }
        
        .animate-marquee-right {
          animation: marquee-right 20s ease-in-out infinite alternate;
        }
        
        .animate-marquee-left {
          animation: marquee-left 20s ease-in-out infinite alternate;
        }
        
        .marquee-container {
          width: 90%;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
        }
        
        .marquee-container::before,
        .marquee-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        
        .marquee-container::before {
          left: 0;
          background: linear-gradient(to right, rgba(234, 60, 31, 0.8), transparent);
        }
        
        .marquee-container::after {
          right: 0;
          background: linear-gradient(to left, rgba(234, 60, 31, 0.8), transparent);
        }
      `}</style>

      {/* Hero Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center pt-24">
        {/* Scrolling Marquee Text */}
        <div className="absolute inset-0 flex flex-col justify-center gap-1 pointer-events-none"> {/* Reduced gap */}

          <div className="marquee-container">
            <div className="animate-marquee-right whitespace-nowrap text-center">
              <span className="text-6xl md:text-8xl font-black text-yellow-300 uppercase tracking-wider opacity-25">
                PREMIUM SIGNAGE • CUSTOM DESIGNS • LED DISPLAYS
              </span>
            </div>
          </div>

          <div className="marquee-container">
            <div className="animate-marquee-left whitespace-nowrap text-center">
              <span className="text-6xl md:text-8xl font-black text-yellow-300 uppercase tracking-wider opacity-25">
                DIGITAL BOARDS • NEON SIGNS • OUTDOOR ADVERTISING
              </span>
            </div>
          </div>

          <div className="marquee-container">
            <div className="animate-marquee-right whitespace-nowrap text-center">
              <span className="text-6xl md:text-8xl font-black text-yellow-300 uppercase tracking-wider opacity-25">
                BRIGHT DISPLAYS • LOGO SIGNS • STOREFRONT SIGNAGE
              </span>
            </div>
          </div>

          <div className="marquee-container">
            <div className="animate-marquee-left whitespace-nowrap text-center">
              <span className="text-6xl md:text-8xl font-black text-yellow-300 uppercase tracking-wider opacity-25">
                ILLUMINATED SIGNS • CREATIVE SOLUTIONS • BRAND VISIBILITY
              </span>
            </div>
          </div>
          <div className="marquee-container">
            <div className="animate-marquee-right whitespace-nowrap text-center">
              <span className="text-6xl md:text-8xl font-black text-yellow-300 uppercase tracking-wider opacity-25">
                BRIGHT DISPLAYS • LOGO SIGNS • STOREFRONT SIGNAGE
              </span>
            </div>
          </div>

        </ div>

        {/* Central Signage */}
        <div className="relative z-10 group -mt-16">
          <div className="bg-[#fdca07] border-4 border-white rounded-2xl p-12 md:p-16 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_#ffffff] hover:border-yellow-100">
            <div className="text-center text-white">  
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider mb-4 drop-shadow-2xl">
                ILLUMINATE
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider mb-6 drop-shadow-2xl">
                YOUR BRAND
              </h2>
              <p className="text-xl md:text-2xl font-bold uppercase tracking-wide drop-shadow-lg">
                Premium Signage Solutions
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-white rounded-full group-hover:w-32 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;