import { motion } from "framer-motion";

const CoverSection = () => {

  return (
    <div>
      {/* Hero Section with Full Background */}
      <div className=" h-[600px] md:h-screen overflow-hidden">
        {/* Full Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/c4/16/3f/c4163f377cb61cb6e53ca6d568900d72.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 py-40 px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}>
                About Us
            </motion.h1>
            <motion.p 
              className="text-white/90 text-lg sm:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}>
              More Than Just Signs: Our Journey of Innovation and Visual Impact
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="bg-[#E63025]  text-white pt-20 rounded-t-[4rem] -mt-60 relative z-10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {/* First Section - Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <div>
              <h3 className="text-white/80 text-sm uppercase tracking-wider mb-4 -mt-4 md:mt-0">Our Foundation</h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-6">
                Crafting Visual Identities
              </h2>
              <p className="text-white/90 line-clamp-4 md:line-clamp-6 md:text-lg leading-relaxed">
               Founded in 2015, we began as a passionate team dedicated to transforming spaces through innovative signage solutions. Our journey began with a singular vision: to make brands not just seen, but remembered. We understood that in a crowded marketplace, powerful visual communication is key. From our humble beginnings, we focused on precision, quality materials, and a deep understanding of what makes a brand shine brighter through exceptional visual communication.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <motion.img
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full  max-w-xl rounded-2xl shadow-2xl"
                src="/assets/1.jpg" 
                alt="Signage manufacturing process" 
              />
            </div>
          </div>

          {/* Second Section - Image Left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-last lg:order-first">
              <motion.img
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-xl rounded-2xl shadow-2xl"
                src="/assets/8.jpg" 
                alt="Modern signage installation" 
              />
            </div>
            
            <div>
              <h3 className="text-white/80 text-sm uppercase tracking-wider mb-4">Our Evolution</h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-6">
                Industry Leading Innovation
              </h2>
              <p className="text-white/90 line-clamp-4 md:line-clamp-6 md:text-lg leading-relaxed">
                Over the years, we've evolved beyond traditional signage, growing into industry leaders by continually pushing the boundaries of visual communication. Our commitment extends to embracing sustainable practices, utilizing eco-friendly materials whenever possible, and adopting energy-efficient lighting solutions. We invest in cutting-edge technology and ongoing training to ensure our team is equipped to deliver visually stunning brand experiences that are not only impactful but also environmentally responsible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverSection;