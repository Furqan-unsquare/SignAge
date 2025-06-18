import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

type Article = {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  tags: string[];
};

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data.json');
        }
        const data = await response.json();
        const foundArticle = data.find((a: Article) => a.id === parseInt(id || ''));
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Share functionality
const shareArticle = (platform: string) => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Check out this amazing article I just read! 🔥");

  let shareUrl = '';

  switch (platform) {
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
      break;
    case 'instagram':
      // Instagram doesn't support direct web shares — you can redirect to your Instagram page
      shareUrl = `https://www.instagram.com/yourProfileName`;
      break;
    default:
      break;
  }

  if (shareUrl) window.open(shareUrl, '_blank');
};

const socialPlatforms = ['whatsapp', 'instagram'];

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
      <div className="min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#FDCA07] border-t-transparent rounded-full mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
          className="text-white text-lg"
        >
          Loading article...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block mb-6"
        >
          <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
      className="min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto mt-8 md:mt-12">
        

        <motion.div variants={itemVariants} className="mb-10">
          <motion.span
            variants={itemVariants}
            className="inline-block bg-[#FDCA07] text-[#EA3C1F] text-sm font-medium px-4 py-1 rounded-full mb-6 shadow-sm"
          >
            {article.category}
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight"
          >
            {article.title}
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center text-sm text-white/80 mb-8 gap-2"
          >
            <span className="inline-flex items-center mr-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {article.date}
            </span>
            <span className="inline-flex items-center mr-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </span>
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              By {article.author}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-12 rounded-xl overflow-hidden shadow-lg border border-gray-200"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="prose max-w-none prose-lg text-white"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags && article.tags.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#FDCA07]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Tags
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              {article.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="inline-block bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Floating share buttons */}
      < motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed bottom-8 right-4 md:left-8 z-20 flex flex-col space-y-3"
      >
        {socialPlatforms.map((social) => (
          <motion.button
            key={social}
            variants={itemVariants}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#FDCA07] rounded-full shadow-lg flex items-center justify-center text-[#EA3C1F] hover:bg-[#FFD700] transition-colors"
            onClick={() => shareArticle(social)}>
            {social === 'instagram' && <FaInstagram className="w-6 h-6 text-gray-700" />}
            {social === 'whatsapp' && <FaWhatsapp className="w-6 h-6 text-gray-700" />}
          </motion.button>
        ))}
      </motion.div>
      </div>
    </motion.div>
  );
};

export default ArticleDetail;