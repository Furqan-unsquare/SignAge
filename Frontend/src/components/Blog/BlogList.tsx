import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
  _id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${BASE_URL}/api/blogs`);

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await response.json();
        setBlogs(data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.5,
        velocity: 0,
      },
    },
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
        mass: 0.5,
      },
    },
  };

  const visibleBlogs = useMemo(() => blogs.slice(0, visibleCount), [blogs, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, blogs.length));
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <motion.div
      variants={item}
      className="bg-[#F9F5EF] rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="relative h-48 bg-gray-200" />
      <div className="p-4 sm:p-6">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          id="blog-list"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="mb-12 text-left lg:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-[#FDCA07]">Blogs</span>
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Discover insightful content and stay updated with our latest posts
          </p>
          <motion.div
            className="mt-8 w-20 h-1 bg-[#FDCA07]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.3,
            }}
          />
        </motion.div>

        {/* Blogs Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ willChange: "transform, opacity" }}
        >
          {loading && (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))}
            </>
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
              {visibleBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  variants={item}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  className="bg-[#F9F5EF] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ willChange: "transform, opacity" }}
                >
                  <Link
                    to={`/blog/${blog._id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="block h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ willChange: "transform, opacity" }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Image+Not+Found';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3 gap-2">
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 leading-tight">
                        {blog.title}
                      </h2>

                      <p className="text-gray-600 mb-4 text-sm sm:text-base">
                        {blog.description.length > 100
                          ? `${blog.description.slice(0, 100)}...`
                          : blog.description}
                      </p>

                      <motion.button
                        className="text-[#FDCA07] hover:text-[#FFD700] font-medium transition-colors flex items-center"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read more
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {!loading && !error && visibleBlogs.length === 0 && (
            <motion.p
              className="text-white text-center col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No blogs available.
            </motion.p>
          )}
        </motion.div>

        {/* Load More Button */}
        {!loading && !error && visibleCount < blogs.length && (
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