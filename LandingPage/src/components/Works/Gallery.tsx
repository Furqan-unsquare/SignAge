import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: number;
  title: string;
  image: string;
  category: "exterior" | "interior" | "digital" | "vehicle";
  featured?: boolean;
};

const ProjectGallery = () => {
  // State management
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
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
        damping: 15
      }
    }
  };

  // Filter options
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "exterior", label: "Exterior Signs" },
    { id: "interior", label: "Interior Signs" },
    { id: "digital", label: "Digital Displays" },
    { id: "vehicle", label: "Vehicle Graphics" },
    { id: "featured", label: "Featured Work" },
  ];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/gallery.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects
  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || 
    project.category === activeFilter || 
    (activeFilter === "featured" && project.featured)
  );

  // Load more projects
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 9);
      setIsLoading(false);
    }, 500);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]">
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
          className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setVisibleCount(9);
              }}
              className={`px-5 py-2 rounded-full transition-colors ${
                activeFilter === filter.id
                  ? "bg-[#FDCA07] text-[#EA3C1F] font-bold"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}>
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <AnimatePresence>
            {filteredProjects.slice(0, visibleCount).map(project => (
              <motion.div
                key={project.id}
                variants={item}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(253, 202, 7, 0.3)"
                }}
                className={`rounded-xl overflow-hidden border ${
                  project.featured ? "border-2 border-[#FDCA07]" : "border-white/10"
                }`}
                layout // Enables smooth layout transitions
              >
                <div className="relative aspect-[4/3] bg-gray-800 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
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