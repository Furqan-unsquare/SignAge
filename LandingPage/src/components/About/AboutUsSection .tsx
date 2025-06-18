import React, { useRef, useEffect, useState } from "react";

interface Product {
  title: string;
  images: string[];
}

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3D graphic elements configuration (defined in component scope)
  const graphicElements: { id: number; src: string; size: string; position: string }[] = [
    { id: 1, src: "/3D_graphics.png", size: "w-16 h-24 md:w-24 md:h-36", position: "top-10 left-36" },
    { id: 2, src: "/3D_graphics-1.png", size: "w-12 h-20 md:w-20 md:h-32", position: "top-20 right-56" },
    { id: 3, src: "/3D_graphics-3.png", size: "w-20 h-32 md:w-32 md:h-48", position: "top-1/3 left-1/4" },
    { id: 4, src: "/3D_graphics-2.png", size: "w-14 h-28 md:w-28 md:h-40", position: "bottom-2/4 right-36" },
  ];

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

  // GSAP Animation ONLY for Graphics
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Create a timeline for smoother and faster animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 0.5, // Reduced for smoother and faster animation
         
        }
      });

      // Animate ONLY graphics with faster, smoother transitions
      graphicElements.forEach((element, index) => {
        const graphic = document.getElementById(`graphic-${element.id}`);
        if (graphic) {
          // Set initial scattered position
          const initialX = element.id % 2 === 0 ? 300 : -300; // Increased for more dramatic effect
          gsap.set(graphic, { x: initialX, scale: 2, opacity: 0, rotation: element.id * 15 });
          
          // Add to timeline for faster, smoother scrubbed animation
          tl.to(graphic, {
            x: 0,
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8, // Faster duration
            ease: "power2.out" // Smoother easing
          }, index * 0.05); // Reduced stagger for faster sequence
        }
      });

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    loadGSAP();
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
      className="relative py-20  bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]  overflow-hidden"
    >
      {/* Floating 3D Graphics */}
      {graphicElements.map((element) => (
        <div
          key={element.id}
          id={`graphic-${element.id}`}
          className={`absolute ${element.size} ${element.position} z-90`}
        >
          <img
            src={element.src}
            alt="Decorative graphic"
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl drop-shadow-xl uppercase text-[#FDCA07] font-bold mb-6">
            Who We Are?
          </h2>
        </div>

        {/* About Us Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Story 1 */}
          <div className="p-8 flex items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-[#FDCA07] mb-6">
                Our Story Begins
              </h3>
              <p className="text-white/90 mb-6">
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
          </div>

          {/* Story 2 */}
          <div className=" p-8 flex items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-[#FDCA07] mb-6">
                Growing the Legacy
              </h3>
              <p className="text-white/90 mb-6">
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
        </div>

        {/* Products Section */}
        <div>
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold text-[#FDCA07]">
              Our Signature Products
            </h3>
            
            {/* Navigation Buttons - Top Right */}
            {!loading && !error && products.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="bg-[#FDCA07] text-[#EA3C1F] p-2 rounded-full shadow-lg hover:bg-[#FFD700] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="bg-[#FDCA07] text-[#EA3C1F] p-2 rounded-full shadow-lg hover:bg-[#FFD700] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Loading and Error States */}
          {loading && <p className="text-white text-center">Loading products...</p>}
          {error && <p className="text-red-400 text-center">{error}</p>}

          {/* Carousel - Full Width Cards */}
          <div
            id="product-carousel"
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 pb-4"
          >
            {products.length > 0 &&
              products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#FDCA07]/50 transition-all duration-300 flex-shrink-0 w-full max-w-sm snap-center"
                >
                  {/* Product Image */}
                  <div className="h-48 w-full">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
                        No Image Available
                      </div>
                    )}
                  </div>
                  
                  {/* Product Text Below Image */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white">{product.title || "Untitled"}</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Inline styles for scrollbar hiding and global font */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Apply global font */
        section, section * {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default AboutUsSection;