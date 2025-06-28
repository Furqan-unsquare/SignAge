import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const BlogList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Fetch data from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data.json");
        }
        const data: Article[] = await response.json();
        setArticles(data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load articles. Please try again later.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 40,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100
      } 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.5,
        velocity: 0
      } 
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        mass: 0.5
      }
    }
  };

  const visibleArticles = useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, articles.length));
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="my-12 text-left lg:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-[#FDCA07]">Articles</span>
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Discover insightful content and stay updated with our latest publications
          </p>
          <motion.div 
            className="mt-8 w-20 h-1 bg-[#FDCA07]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.3
            }}
          />
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ willChange: 'transform, opacity' }} // Optimize for GPU
        >
          {loading && (
            <motion.p 
              className="text-white text-center col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Loading articles...
            </motion.p>
          )}
          
          {error && (
            <motion.p 
              className="text-red-400 text-center col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}
          
          {!loading && !error && (
            <AnimatePresence>
              {visibleArticles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={item}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  whileHover={{ 
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="bg-[#F9F5EF] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Link to={`/blog/${article.id}`} className="block h-full">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        style={{ willChange: 'transform, opacity' }} // Optimize for GPU
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3 gap-2">
                        <span className="inline-flex items-center font-medium text-[#FDCA07]">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          {article.category}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{article.date}</span>
                        <span className="mx-1">•</span>
                        <span className="inline-flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {article.readTime}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 leading-tight">
                        {article.title}
                      </h2>

                      <p className="text-gray-600 mb-4 text-sm sm:text-base">
                        {article.excerpt}
                      </p>

                      <motion.button 
                        className="text-[#FDCA07] hover:text-[#FFD700] font-medium transition-colors flex items-center"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read more
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {!loading && !error && visibleArticles.length === 0 && (
            <motion.p 
              className="text-white text-center col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No articles available.
            </motion.p>
          )}
        </motion.div>

        {/* Load More Button */}
        {!loading && !error && visibleCount < articles.length && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FDCA07] text-[#EA3C1F] font-medium py-3 px-6 rounded-full hover:bg-[#FFD700] transition-colors"
            >
              Load More
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogList;