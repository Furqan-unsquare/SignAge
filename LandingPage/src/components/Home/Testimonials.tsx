import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajeev Yadav",
      text: "Got a neon logo made for my café – now everyone stops and stares! The detailing is amazing.",
      rating: 5
    },
    {
      name: "Priya Rathi",
      text: "Got my daughter's name customised in a unicorn design. It turned out super cute and premium looking.",
      rating: 5
    },
    {
      name: "Shayli Agarwal",
      text: "Used it for my wedding décor – guests couldn't stop taking selfies with the neon sign",
      rating: 5
    },
    {
      name: "Biswatin",
      text: "Unboxing the FloRo felt like opening a new gadget. Looks so cool on my bedroom wall!",
      rating: 5
    }
  ];

  return (
    // Single parent wrapper
    <div className="relative min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-16 px-4 overflow-hidden">

      {/* Glowing Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#fdca07] rounded-full opacity-20 animate-pulse blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-[#fdca07] rounded-full opacity-20 animate-bounce blur-xl"></div>

      {/* Background Pattern (very faint) */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            // SVG pattern as background via data URI
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center md:mb-16">
          <div className="inline-block md:bg-[#fdca07] text-left md:border-4 md:border-white px-3 md:px-8 py-4 rounded-2xl mb-8 transform hover:scale-105 transition-all duration-300 md:shadow-lg hover:shadow-xl">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider drop-shadow-md">
              Real Customers, Real Reviews
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(253,202,7,0.4)] transform hover:scale-[1.03] transition-all duration-300 group border-4 border-white"
            >
              {/* Initial Badge */}
              <div className="relative h-48 bg-gradient-to-br from-[#fdca07] via-[#f9b34e] to-[#fdca07] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-[#fdca07]">
                  <span className="text-5xl font-black text-[#EA3C1F]">
                    {testimonial.name.split(' ')[0][0]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900 text-md">
                    ~ {testimonial.name}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#fdca07] fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-10 h-10 text-[#fdca07] fill-current drop-shadow-lg" />
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white mb-8">
            <span className="text-xl md:text-3xl md:font-black drop-shadow-md">
              4.9 Star Rating by 100+ Customers on
            </span>
            <div className="hidden md:flex items-center bg-white px-6 py-3 rounded-xl shadow-lg">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.867 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span className="text-blue-600 font-bold text-xl">Google</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <a href="/blog">
            <button className="bg-[#fdca07] hover:bg-[#f0c000] md:border-4 md:border-white text-black font-black text-lg px-10 py-3 md:py-5 rounded-full uppercase tracking-wider transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(253,202,7,0.6)]">
              View More Testimonials
            </button>
            </a>
          </div>
        </div>
      </div>

      {/* Neon Glow Effects (top & bottom bars) */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#fdca07] opacity-70 shadow-[0_0_15px_#fdca07]"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#fdca07] opacity-70 shadow-[0_0_15px_#fdca07]"></div>
    </div>
  );
};

export default Testimonials;
