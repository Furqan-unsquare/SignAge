import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectGallery = () => {
  // State management
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
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "exterior", label: "Exterior Signs" },
    { id: "interior", label: "Interior Signs" },
    { id: "digital", label: "Digital Displays" },
    { id: "vehicle", label: "Vehicle Graphics" },
    { id: "featured", label: "Featured Work" },
  ];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://192.168.1.7:5000/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const { data } = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects
  const filteredProjects = projects.filter(
    (project) =>
      activeFilter === "all" ||
      project.category === activeFilter ||
      (activeFilter === "featured" && project.featured)
  );

  // Load more projects
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 9);
      setIsLoading(false);
    }, 500);
  };

  return (
    <section className="pb-16 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]" id="project">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#FDCA07] mb-4">
            Our Project Portfolio
          </h2>
          <p className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto">
            Showcasing exceptional signage solutions
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                const isMobile = window.innerWidth < 768;
                setVisibleCount(isMobile ? 3 : 9);
              }}
              className={`px-5 py-2 rounded-full transition-colors ${
                activeFilter === filter.id
                  ? "bg-[#FDCA07] text-[#EA3C1F] font-bold"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Gallery */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 mb-12"
        >
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