import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const heroImages = [
    {
      src: "https://i.pinimg.com/736x/13/e8/cf/13e8cf80d8bd6c39ea13fb86f3e08b1b.jpg",
      rotate: -10,
      x: -200,
      y: 0,
      scale: 0.95,
      zIndex: 20,
    },
    {
      src: "https://i.pinimg.com/736x/1e/10/c6/1e10c6bcd9ed0b498ae4394bb868322f.jpg",
      rotate: -5,
      x: -100,
      y: 0,
      scale: 0.97,
      zIndex: 25,
    },
    {
      src: "https://i.pinimg.com/736x/b5/75/74/b57574bf086ccb4efdd914d1d6efc6db.jpg",
      rotate: 0,
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 30,
    },
    {
      src: "https://i.pinimg.com/736x/70/09/cc/7009cc189789c28c50ed0cae7ff1898c.jpg",
      rotate: 5,
      x: 100,
      y: 0,
      scale: 0.97,
      zIndex: 25,
    },
    {
      src: "https://i.pinimg.com/736x/16/0b/ec/160beceffcdcf9c9812e61efb76ec952.jpg",
      rotate: 10,
      x: 200,
      y: 0,
      scale: 0.95,
      zIndex: 20,
    },
  ];

  const scrollToGallery = () => {
    const element = document.getElementById("gallery");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-full mx-auto w-full flex flex-col gap-28 md:pt-40 items-center">
        {/* Stacked Images */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative  w-full flex items-center justify-center mb-12 overflow-visible">
          {heroImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity: 1,
                scale: img.scale,
                x: img.x,
                y: img.y,
                rotate: img.rotate,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                damping: 10,
              }}
              className="absolute w-32 h-40 sm:w-40 sm:h-52 md:w-48 md:h-64 rounded-xl overflow-hidden shadow-2xl cursor-pointer"
              style={{ 
                zIndex: img.zIndex,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
            >
              <img
                src={`${img.src}?w=400&h=500&fit=crop`}
                alt={`Featured project ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Text Content - Below Images */}
        <div className="w-full text-center space-y-3">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-3xl md:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#FDCA07] to-[#FFD700] bg-clip-text uppercase text-transparent">
              Exceptional Signage Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm sm:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Transforming spaces with innovative signage that captures attention and elevates brands.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col-2 gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToGallery}
              className="group relative bg-gradient-to-r from-[#FDCA07] to-[#FFD700] text-[#EA3C1F] px-6 py-4 sm:px-8 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 overflow-hidden shadow-lg"
            >
              <span className="relative z-10 flex items-center">
                View Our Work </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#FDCA07" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold transition-all"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;