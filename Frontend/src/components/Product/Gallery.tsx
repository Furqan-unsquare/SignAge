import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';

const ProjectGallery = () => {
  // State management
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 2,
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
    { id: "Neon", label: "Neon Photos" },
    { id: "acrylic", label: "Acrylic Letter/Signboard" },
    { id: "aluminium", label: "Aluminium Channel Letter" },
    { id: "3d-steel", label: "3D Steel Letters" },
    { id: "laser-router", label: "CNC Laser & Router Cutting (2D/3D)" },
    { id: "glow-sign", label: "Glow Signboard Fabrix & Flex" },
    { id: "acp", label: "ACP Signboard" },
    { id: "photos", label: "Mandir Design / Jali Cutting" },
    { id: "office-name", label: "Office Name Plate" },
    { id: "led-scrolling", label: "Custom LED Screen / Scrolling Board" },
    { id: "featured", label: "Featured Projects" },
  ];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${BASE_URL}/api/projects`);
        if (!response.ok) throw new Error(`Failed to fetch projects: ${response.status}`);
        const data = await response.json();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setIsLoading(false);
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
      setVisibleCount((prev) => prev + (window.innerWidth < 768 ? 3 : 9));
      setIsLoading(false);
    }, 500);
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <motion.div
      variants={item}
      className="rounded-xl overflow-hidden border border-white/10 break-inside-avoid mb-4 animate-pulse"
    >
      <div className="relative bg-gray-200 h-64 sm:h-80 md:h-96 w-full" />
    </motion.div>
  );

  return (
    <section className="pb-0 md:pb-10 bg-[#E63025] pt-16 px-4 sm:px-6 lg:px-12 rounded-t-[3rem] -mt-60 relative" id="project">
      <div className="max-w-7xl mx-auto">
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
          className="px-4 sm:px-0 mb-8">
          {/* Mobile Dropdown */}
          <div className="sm:hidden mb-4">
            <select
              value={activeFilter}
              onChange={(e) => {
                setActiveFilter(e.target.value);
                setVisibleCount(window.innerWidth < 768 ? 3 : 9);
              }}
              className="w-full p-3 rounded-lg bg-gray-200 text-[#EA3C1F] font-semibold focus:ring-2 focus:ring-[#FDCA07] border-none">
              {productLinks.map((link) => (
                <option key={link.id} value={link.id}>
                  {link.label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Button Grid */}
          <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {productLinks.map((link) => (
              <a
                key={link.id}
                href={`/#project?category=${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveFilter(link.id);
                  setVisibleCount(window.innerWidth < 768 ? 3 : 9);
                }}
                className={`px-4 py-2 rounded-2xl text-sm text-center transition-colors ${
                  activeFilter === link.id
                    ? "bg-[#FDCA07] text-[#EA3C1F] font-bold"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}>
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Masonry Gallery */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 md:mb-10 md:pt-4"
        >
          {isLoading && (
            <>
              {Array.from({ length: window.innerWidth < 768 ? 3 : 9 }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))}
            </>
          )}

          {error && (
            <motion.p
              className="text-red-200 text-center col-span-full break-inside-avoid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          {!isLoading && !error && (
            <AnimatePresence>
              {filteredProjects.slice(0, visibleCount).map((project) => (
                <motion.div
                  key={project._id}
                  variants={item}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(253, 202, 7, 0.3)",
                  }}
                  className={`rounded-xl overflow-hidden border break-inside-avoid mb-4 ${
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
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Image+Not+Found';
                      }}
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
          )}
 
          {!isLoading && !error && filteredProjects.length === 0 && (
            <motion.p
              className="text-white  text-center col-span-full break-inside-avoid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No projects available for this category.
            </motion.p>
          )}
        </motion.div>

        {/* Load More Button */}
        {!isLoading && !error && visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="px-8 py-3 bg-[#FDCA07] text-[#EA3C1F] font-bold rounded-lg hover:bg-[#f8d84d] transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Load More Projects"
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;