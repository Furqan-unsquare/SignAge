import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const location = useLocation();

  const isNeonPage = location.pathname.toLowerCase() === "/neoncustom";

  const navItems = [
    // { name: "Work", href: "/work" },
    { name: "Custom", href: "/custom" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/#contact" },
  ];

  const productTypes = [
    { name: "Neon Photos", id: "Neon", },
    { name: "Acrylic Sign Boards", id: "acrylic" },
    { name: "Aluminium Channel Letter", id: "aluminium" },
    { name: "3D Steel Letters", id: "3d-steel" },
    { name: "CNC Laser & Router Cutting (2D/3D)", id: "laser-router" },
    { name: "Glow Signboard Fabrix & Flex", id: "glow-sign" },
    { name: "ACP Signboard", id: "acp" },
    { name: "Mandir Design / Jali Cutting", id: "photos" },
    { name: "Office Name Plate", id: "office-name" },
    { name: "Custom LED Screen / Scrolling Board", id: "led-scrolling" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
      <header
      className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
        isNeonPage ? "bg-black" : ""
      }`} >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24 relative">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                },
              }}>
              <a href="/" className="flex items-center"> 
              <div className="leading-tight">
                <h3 className="text-3xl md:text-4xl drop-shadow-lg font-bold text-[#FDCA07]">Ansh Enterprises</h3>
              </div>
              </a>
            </motion.div>    

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10"> {/* Products Dropdown - Desktop Only */}
          <motion.div
  className="hidden md:block relative"
>
  <button
    className="flex items-center text-white font-anton text-lg hover:text-red-300 transition-colors duration-300"
    onClick={() => setIsProductsOpen(!isProductsOpen)} // toggle dropdown on click
  >
    Products
    <ChevronDown
      className={`ml-1 h-5 w-5 transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
    />
  </button>

  {/* Dropdown Menu */}
  <AnimatePresence>
    {isProductsOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute left-0 mt-2 w-56 bg-white/20 backdrop-blur-xl border border-white/20 rounded-md shadow-xl z-50"
      >
        <div className="py-1">
          {productTypes.map((product) => (
            <a
              key={product.name}
              href={`/work#project?category=${product.id}`}
              className="block px-4 py-2 text-gray-100  hover:text-gray-300"
              onClick={() => setIsProductsOpen(false)} // close dropdown on click
            >
              {product.name}
            </a>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>

            {navItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  },
                }}>
                <a
                  href={item.href}
                  className="relative text-white font-anton text-lg hover:text-red-200 transition-colors duration-300">
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FDCA07]"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}/>
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Toggle - Right Side */}
          <motion.button
            className="md:hidden text-white p-2 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu - Swipeable */}
        <AnimatePresence>
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 top-0 h-screen bg-red-600 border border-white/20 shadow-lg pt-24 z-40 overflow-y-auto">
              <div className="h-full overflow-y-auto flex flex-col justify-between pb-6">
                {/* Nav Links */}
                <nav className="flex flex-col px-6 space-y-4">
                  {/* Dropdown: Products */}
                  <div className="border-b border-gray-700 pb-4">
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className="flex justify-between w-full text-white text-lg font-semibold">
                      Products
                      <ChevronDown
                        className={`transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 mt-2 space-y-2">
                          {productTypes.map((item) => (
                        <a
                          key={item.name}
                          href={`/work#project?category=${item.id}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full text-left text-white text-sm px-4 py-2 rounded-md hover:bg-yellow-500/20 transition">
                          {item.name}
                        </a>
                      ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Other Links with divider */}
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      className="py-4 border-b border-gray-700 text-white text-lg font-semibold">
                      <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                        {item.name}
                      </a>
                    </div>
                  ))}
                </nav>

                {/* Need Help Box */}
                <div className="bg-red-700 mb-16 backdrop-blur-md text-white mx-4 p-4 rounded-xl">
                  <h3 className="text-center text-lg font-bold mb-4">Need Help?</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold mb-1">Text us on WhatsApp</p>
                      <p className="flex items-center gap-2">
                        <a
                          href="https://wa.me/919381001808"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:underline">
                          📱 +91 93810 01808
                        </a>
                      </p>
                    </div>
                    <div>
                     <p className="font-semibold mb-1">Email Id</p>
                     <p className="flex items-center gap-2 break-words max-w-full sm:max-w-none">
                      <span>✉️</span>
                      <a
                        href="mailto:info@neonattack.com"
                        className="underline break-all max-w-[15ch] sm:max-w-none">
                        info@neonattack.com
                      </a>
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;