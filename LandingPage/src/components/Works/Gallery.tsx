import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';

const ProjectGallery = () => {
  // State management
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Parse category from URL query
useEffect(() => {
  if (location.hash) {
    const [hash, queryString] = location.hash.split("?");
    const params = new URLSearchParams(queryString);
    const category = params.get("category");

    if (category) {
      setActiveFilter(category);
      const isMobile = window.innerWidth < 768;
      setVisibleCount(isMobile ? 3 : 9);
    }

    // Scroll to section smoothly
    const section = document.getElementById(hash.replace("#", ""));
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }
}, [location]);



  // Detect screen size and adjust initial visibleCount
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setVisibleCount(isMobile ? 3 : 9);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter options
const productLinks = [
  { id: "all", label: "All Projects" },
  { id: "acrylic", label: "Acrylic Letter/Signboard" },
  { id: "aluminium", label: "Aluminium Ch. Letter" },
  { id: "3d-steel", label: "3D Steel Letters" },
  { id: "laser-router", label: "Laser Router Cutting" },
  { id: "glow-sign", label: "Glow Signboard Flex" },
  { id: "acp", label: "ACP Signboard" },
  { id: "photos", label: "Signboard Photos" },
  { id: "office-name", label: "Office Name Plate" },
  { id: "led-scrolling", label: "LED Scrolling Board" },
  { id: "featured", label: "Featured Projects" },
];


productLinks.map((item) => (
  <a href={`/#project?category=${item.id}`} className="...">{item.label}</a>
));


  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    const data = await response.json(); // Don't destructure here
    console.log("Fetched projects:", data);
    setProjects(data); // should be an array
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};


    fetchProjects();
  }, []);

  // Filter projects
const filteredProjects = projects.filter((project) => {
  if (activeFilter === "all") return true;
  if (activeFilter === "featured") return project.featured === true;
  return project.category === activeFilter;
});


  // Load more projects
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 9);
      setIsLoading(false);
    }, 500);
  };

  return (
    <section className="pb-0 md:pb-10 bg-[#E63025] pt-16 px-6 sm:px-8 lg:px-12 rounded-t-[3rem] -mt-40 relative " id="project">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-4">
            Our Project Portfolio
          </h2>
          <p className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto">
            Showcasing exceptional signage solutions
          </p>
        </motion.div>

      {/* Filter Section */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="mb-12 px-4 sm:px-0"
>
  {/* Mobile Dropdown */}
  <div className="sm:hidden mb-4">
    <select
      value={activeFilter}
      onChange={(e) => {
        setActiveFilter(e.target.value);
        const isMobile = window.innerWidth < 768;
        setVisibleCount(isMobile ? 3 : 9);
      }}
      className="w-full p-2 rounded-lg bg-gray-200 text-[#EA3C1F] font-semibold focus:ring-2 focus:ring-[#FDCA07]"
    >
      {productLinks.map((link) => (
        <option key={link.id} value={link.id}>
          {link.label}
        </option>
      ))}
    </select>
  </div>

  {/* Desktop Button Grid */}
  <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
    {productLinks.map((link) => (
      <button
        key={link.id}
        onClick={() => {
          setActiveFilter(link.id);
          const isMobile = window.innerWidth < 768;
          setVisibleCount(isMobile ? 3 : 9);
        }}
        className={`px-4 py-2 rounded-2xl text-sm text-center transition-colors ${
          activeFilter === link.id
            ? "bg-[#FDCA07] text-[#EA3C1F] font-bold"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {link.label}
      </button>
    ))}
  </div>
</motion.div>


        {/* Masonry Gallery */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 mb-10">
          <AnimatePresence>
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <motion.div
                key={project._id}
                variants={item}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(253, 202, 7, 0.3)",
                }}
                className={`rounded-xl overflow-hidden border break-inside-avoid mb-6 ${
                  project.featured ? "border-2 border-[#FDCA07]" : "border-white/10"
                }`}
                layout
              >
                <div className="relative bg-gray-800 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-[#FDCA07] text-[#EA3C1F] px-3 py-1 rounded-full font-bold text-sm">
                      Featured
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="px-8 py-3 bg-[#FDCA07] text-[#EA3C1F] font-bold rounded-lg hover:bg-[#f8d84d] transition-colors"
            >
              {isLoading ? "Loading..." : "Load More Projects"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;