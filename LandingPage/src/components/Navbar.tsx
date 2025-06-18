import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Custom', href: '/custom' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact-us' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24 relative">
          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center justify-between w-full">
            {/* Left Side Nav */}
            <div className="flex space-x-8 lg:space-x-12 pl-12">
              {navItems.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -40 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: idx * 0.1,
                      type: 'spring',
                      stiffness: 300,
                      damping: 15
                    }
                  }}>
                  <a
                    href={item.href}
                    className="relative text-white text-lg font-anton hover:text-[#FDCA07] transition-colors duration-300"
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FDCA07]"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Centered Logo */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -200 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 300,
                  damping: 15
                }
              }}
            >
              {/* Center Section - Logo */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(253,202,7,0.8)] border-4 border-[rgb(253,202,7)]">
                  <img
                    src="/assets/logo5.png"
                    alt="Logo"
                    className="w-20 h-20 drop-shadow-[0_0_20px_rgba(253,202,7,0.8)]"
                  />
                </div>
              </div>
            </motion.div>



            {/* Right Side Nav */}
            <div className="flex space-x-8 lg:space-x-12 pr-12">
              {navItems.slice(3).map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -40 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: (idx + 2) * 0.1,
                      type: 'spring',
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                >
                  <a
                    href={item.href}
                    className="relative text-white font-anton text-lg hover:text-[#FDCA07] transition-colors duration-300"
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FDCA07]"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </motion.div>
              ))}
            </div>
          </nav>


          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-white p-2 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="w-6 h-6 fixed" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu - Unchanged */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top- bg-[#EA3C1F]/90 backdrop-blur-md"
            >
              <nav className="h-full flex flex-col items-center justify-center space-y-8">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: idx * 0.1,
                        type: 'spring',
                        stiffness: 200,
                        damping: 15
                      }
                    }}
                  >
                    <a
                      href={item.href}
                      className="block text-2xl text-white py-4 hover:text-[#FDCA07] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;