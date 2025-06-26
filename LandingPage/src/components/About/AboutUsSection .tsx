import React, { useRef, useEffect, useState } from "react";

interface Product {
  title: string;
  image: string[];
}

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data.json");
        }
        const data: Product[] = await response.json();
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollCarousel = (direction: "left" | "right"): void => {
    const carousel = document.getElementById("product-carousel");
    if (carousel) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Who We Are
          </h2>
          <div className="w-24 h-1 bg-[#FDCA07] mx-auto"></div>
        </div>

        {/* About Us Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Story 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl md:text-4xl font-bold text-[#FDCA07] mb-6">
              Our Story Begins
            </h3>
            <p className="text-white/90 md:text-lg mb-6 leading-relaxed">
              Founded in 2015, we started as a small team passionate about transforming spaces 
              through innovative signage solutions. Our journey began with a vision to make brands 
              shine brighter.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-[#FDCA07] text-2xl">🏆</div>
                <div>
                  <h4 className="font-bold text-white">Award Winning</h4>
                  <p className="text-white/80">Recognized for design excellence</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-[#FDCA07] text-2xl">🌎</div>
                <div>
                  <h4 className="font-bold text-white">Global Reach</h4>
                  <p className="text-white/80">Projects in 12+ countries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl md:text-4xl font-bold text-[#FDCA07] mb-6">
              Growing the Legacy
            </h3>
            <p className="text-white/90 md:text-lg mb-6 leading-relaxed">
              Over the years, we've grown into industry leaders, creating visually stunning brand 
              experiences. Our commitment to quality and innovation drives us forward.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FDCA07]/10 p-4 rounded-lg border border-[#FDCA07]/30">
                <div className="text-[#FDCA07] text-xl mb-2">100+</div>
                <div className="text-white/90 text-sm">Happy Clients</div>
              </div>
              <div className="bg-[#FDCA07]/10 p-4 rounded-lg border border-[#FDCA07]/30">
                <div className="text-[#FDCA07] text-xl mb-2">500+</div>
                <div className="text-white/90 text-sm">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Our Signature Products
            </h3>
            
            {/* Navigation Buttons - Top Right */}
            {!loading && !error && products.length > 0 && (
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="bg-[#FDCA07] text-[#EA3C1F] p-2 rounded-full shadow-lg hover:bg-[#FFD700] transition-colors"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="bg-[#FDCA07] text-[#EA3C1F] p-2 rounded-full shadow-lg hover:bg-[#FFD700] transition-colors"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Loading and Error States */}
          {loading && <p className="text-white text-center py-8">Loading products...</p>}
          {error && <p className="text-red-300 text-center py-8">{error}</p>}

          {/* Carousel */}
          <div
            id="product-carousel"
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4"
          >
            {products.length > 0 &&
              products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#FDCA07]/50 transition-all duration-300 flex-shrink-0 w-full max-w-sm snap-center"
                >
                  {/* Product Image */}
                  <div className="h-48 w-full">
                    {product.image && product.image.length > 0 ? (
                      <img
                        src={product.image[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700/50 text-white">
                        No Image Available
                      </div>
                    )}
                  </div>
                  
                  {/* Product Text Below Image */}
                  <div className="p-6">
                    <h4 className="text-lg md:text-xl font-bold text-white">
                      {product.title || "Untitled"}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Inline styles for scrollbar hiding */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default AboutUsSection;