import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AboutHeroSection: React.FC = () => {
// Utility component to reuse
const MarqueeLine: React.FC = () => (
  <div className="overflow-hidden whitespace-nowrap w-full">
    <div className="animate-marquee inline-block whitespace-nowrap tracking-tight leading-none scale-x-[0.7] scale-y-[2.8] transform  text-[#FDCA07] text-6xl sm:text-4xl md:text-6xl font-extrabold px-2">
      <span className="mx-4">ABOUT US ✦ ABOUT US ✦ ABOUT US ✦ ABOUT US ✦ ABOUT US ✦ ABOUT US ✦ ABOUT US ✦</span>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-10 px-2 sm:px-6 lg:px-8 overflow-hidden relative flex items-center justify-center">
      {/* Centered 3D Graphic with Realistic Shadow (Static) */}
      {[{ id: 1, size: "w-56 h-56 -mt-4  md:w-56 md:h-56", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", rotation: "rotate-3" }].map((graphic) => (
        <div
          key={graphic.id}
          className={`absolute ${graphic.size} ${graphic.position} z-40 transform ${graphic.rotation} drop-shadow-2xl`}>
          <img
            src="/3D_graphics.png"
            alt="Decorative 3D graphic"
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      {/* Floating 3D Graphics with Realistic Shadow (Animated) */}
      {[
        {
          id: 2,
          image: "/3D_graphics-1.png",
          size: "w-34 h-28 sm:w-12 sm:h-20 md:w-20 md:h-32",
          position: "top-24 left-4 md:top-10 md:left-16",
          rotation: "-rotate-2",
          animation: { y: [0, -10, 0], rotate: [0, 2, -2, 0] },
        },
        {
          id: 3,
          image: "/3D_graphics-2.png",
          size: "w-24 h-29 sm:w-14 sm:h-22 md:w-24 md:h-36",
          position: "top-48 right-4 md:bottom-10 md:right-5",
          rotation: "rotate-1",
          animation: { y: [0, 10, 0], rotate: [0, -2, 2, 0] },
        },
        {
          id: 4,
          image: "/3D_graphics-3.png",
          size: "w-24 h-24 sm:w-10 sm:h-16 md:w-16 md:h-24",
          position: "bottom-32 left-16 md:bottom-1 md:left-36",
          rotation: "rotate-90",
          animation: { y: [0, -8, 0], rotate: [0, 6, -6, 0] },
        },
      ].map((graphic) => (
        <motion.div
          key={graphic.id}
          className={`absolute ${graphic.size} ${graphic.position} z-40 transform ${graphic.rotation} drop-shadow-2xl`}
          animate={graphic.animation}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          <img
            src={graphic.image}
            alt={`Floating object ${graphic.id}`}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}

      <div className="max-w-7xl w-full mx-auto relative z-20">
        {/* Marquee Title (Three Lines) */}
        <div className="mb-10 space-y-2 sm:space-y-4">
          <MarqueeLine />
          <MarqueeLine />
          <MarqueeLine />
          
      </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;