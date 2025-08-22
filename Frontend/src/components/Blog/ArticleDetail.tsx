import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

interface Blog {
  _id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${BASE_URL}/api/blogs/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data: Blog = await response.json();
        if (data) {
          setBlog(data);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Share functionality
  const shareArticle = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this blog: ${blog?.title}!`);

    let shareUrl = "";
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      default:
        break;
    }

    if (shareUrl) window.open(shareUrl, "_blank");
  };

  const socialPlatforms = ["whatsapp"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E63025] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#FDCA07] border-t-transparent rounded-full mb-4"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#E63025] pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block mb-6">
          <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FDCA07] text-[#EA3C1F] font-medium py-2 px-6 rounded-full hover:bg-[#FFD700] transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }
 
  return (
   <motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="min-h-screen bg-[#E63025] pb-12 px-4 sm:px-6 lg:px-8"
>
  <div className="max-w-7xl mx-auto mt-10 md:mt-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      
      {/* Left - Blog Image */}
      <motion.div
        variants={itemVariants}
        className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        <img
          src={blog?.image}
          alt={blog?.title}
          className="w-full h-auto object-contain md:h-full md:object-cover md:aspect-auto rounded-2xl"
        />
      </motion.div>

      {/* Right - Blog Content */}
      <motion.div
        variants={itemVariants}
        className="text-white space-y-6"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {blog?.title}
        </h1>

      <div className="text-sm text-white/80 flex items-center gap-4 flex-wrap justify-between">
        {/* Calendar Icon + Date */}
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{new Date(blog?.createdAt || "").toLocaleDateString()}</span>
        </div>

        {/* Share Buttons beside the date */}
        <div className="flex items-center gap-3">
          {socialPlatforms.map((social) => (
            <motion.button
              key={social}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 bg-[#FDCA07] rounded-full shadow-md flex items-center justify-center text-[#EA3C1F] hover:bg-[#FFD700] transition-colors"
              onClick={() => shareArticle(social)}>
              {social === "whatsapp" && <FaWhatsapp className="w-4 h-4 text-gray-700" />}
            </motion.button>
          ))}
        </div>
      </div>

       <motion.div
          variants={itemVariants}
          className="prose max-w-none prose-lg text-white space-y-6">
          {blog?.description
            .split(/\n{2,}/g) // split into paragraphs on two or more line breaks
            .map((para, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {para.trim()}
              </p>
            ))}
        </motion.div>

      </motion.div>
    </div>
  </div>
</motion.div>

  );
};

export default ArticleDetail;