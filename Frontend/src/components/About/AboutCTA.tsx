import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ContentHub = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(2);

  useEffect(() => {
    // Replace with your actual endpoint
    axios.get("http://localhost:5000/api/blogs") // Filter success case studies if needed
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching blogs", err);
      });
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#FDCA07] mb-2">
            Success Stories
          </h2>
          <p className="text-white/90 md:text-lg max-w-xl mx-auto">
            Real impact. Real businesses. See how our solutions transformed brands.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {Array.isArray(blogs) && blogs.slice(0, 2).map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="cursor-pointer bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-[#FDCA07] transition-all duration-300 shadow-lg">
              <div className="h-60 w-full overflow-hidden relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#fdaf07] rounded-2xl p-10 md:p-14 text-center shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#EA3C1F] rounded-full opacity-10"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#EA3C1F] rounded-full opacity-10"></div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold text-[#EA3C1F] mb-4">
              Ready to start your success story?
            </h3>
            <p className="text-[#EA3C1F]/90 text-base md:text-lg mb-6">
              Let’s build something amazing for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/custom#customize")}
                className="px-6 py-3 bg-[#EA3C1F] text-white font-bold rounded-lg hover:bg-[#c4321a] transition">
                Start Designing Your Neon Sign 
              </button>
               <button
                onClick={() => window.open('https://www.canva.com/create/signs/', '_blank', 'noopener,noreferrer')}
                className="px-6 py-3 bg-[#EA3C1F] text-white font-bold rounded-lg hover:bg-[#c4321a] transition">
                Start Designing with Canva
              </button>
              <a
                href="/blog#blog-list"
                className="px-6 py-3 bg-white text-[#EA3C1F] font-bold rounded-lg hover:bg-gray-100 transition">
                View Case Studies
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHub;
