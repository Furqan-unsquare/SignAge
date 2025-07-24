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
            backgroundImage:
              "url('https://i.pinimg.com/736x/c4/cd/5f/c4cd5fba3cd31cef406dd7951ffec07a.jpg')",
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
            className="max-w-xl"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}>
              Our Products
            </motion.h1>
            <motion.p
              className="text-white/90 text-lg sm:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}>
              Explore our projects where we've partnered with businesses to create captivating and effective signage solutions.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Work We've Done Section */}
      {/* <div className="bg-gradient-to-r from-red-600  to-red-600 pt-16 pb-24 px-6 sm:px-8 lg:px-12 rounded-t-[3rem] -mt-40 relative"></div> */}
    </div>
  );
};

export default CoverSection;
