import { ArrowRight, Zap, Star, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const ctaImages = [
    "https://i.pinimg.com/736x/13/e8/cf/13e8cf80d8bd6c39ea13fb86f3e08b1b.jpg",
    "https://i.pinimg.com/736x/1e/10/c6/1e10c6bcd9ed0b498ae4394bb868322f.jpg",
    "https://i.pinimg.com/736x/b5/75/74/b57574bf086ccb4efdd914d1d6efc6db.jpg",
    "https://i.pinimg.com/736x/70/09/cc/7009cc189789c28c50ed0cae7ff1898c.jpg",
    "https://i.pinimg.com/736x/16/0b/ec/160beceffcdcf9c9812e61efb76ec952.jpg"
  ];

  const imagePositions = [
  { x: -160, y: 0, rotate: -15 },
  { x: -80, y: -10, rotate: -8 },
  { x: 0,   y: -18, rotate: 0 },     // Center image
  { x: 80,  y: -10, rotate: 8 },
  { x: 160,  y: 0, rotate: 15 }
];

const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" }); // triggers only once
const navigate = useNavigate();

  return (
    <section id="cta" ref={ref}
      className="py-10 bg-[#E63025]  md:py-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Stacked Images with Animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative h-96 lg:h-[500px] hidden md:flex items-center justify-center order-2 lg:order-1">
          {ctaImages.map((image, index) => (
           <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              rotate: imagePositions[index].rotate,
              x: imagePositions[index].x,
              y: imagePositions[index].y + 20
            }}
            animate={isInView ? { 
              opacity: 1,
              rotate: imagePositions[index].rotate,
              x: imagePositions[index].x,
              y: imagePositions[index].y
            } : {}}
            transition={{ 
              duration: 0.6,
              delay: index * 0.15,
              type: "spring",
              damping: 10
            }}
            className="absolute w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden shadow-2xl cursor-pointer"
            style={{
              zIndex: index === 2 ? 30 : 30 - Math.abs(index - 2) * 5,
            }}
          >
            <img
              src={`${image}?w=400&h=500&fit=crop`}
              alt={`Featured project ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.div>

          ))}
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8 text-white order-1 lg:order-2"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl drop-shadow-xl font-bold leading-tight">
                Ready to Ignite
                <br />
                <span className="drop-shadow-xl bg-gradient-to-r from-[#FDCA07] to-[#FFD700] bg-clip-text text-transparent">
                  Your Vision?
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="md:text-xl text-white/90 max-w-lg leading-relaxed">
              Let's collaborate to create something extraordinary. Our passionate team delivers results that make an impact.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-[#FDCA07] to-[#FFD700] text-[#EA3C1F] px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 overflow-hidden">
              <span
              onClick={() => navigate("/custom")} 
              className="relative z-10 flex items-center">
                Create Your Sign
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <motion.span
                initial={{ x: -100, opacity: 0 }}
                whileHover={{ x: 0, opacity: 0.2 }}
                className="absolute inset-0 bg-white/20"
              />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:border-[#FDCA07] hover:text-[#FDCA07] transition-all duration-300 relative overflow-hidden"
            >
              <span
              onClick={() => navigate("/contact-us")} 
              className="relative z-10">Contact us</span>
              <motion.span
                initial={{ x: -100, opacity: 0 }}
                whileHover={{ x: 0, opacity: 0.1 }}
                className="absolute inset-0 bg-[#FDCA07]/10"
              />
            </motion.button>
          </motion.div>
          
        
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;