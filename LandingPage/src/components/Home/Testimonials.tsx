import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);

  const testimonials = [
    {
      name: "Rajeev Yadav",
      text: "Got a neon logo made for my café – now everyone stops and stares! The detailing is amazing.",
      rating: 5,
      image: "https://i.pinimg.com/736x/19/0a/fc/190afc31e3dd8e7804652d509272edbc.jpg"
    },
    {
      name: "Priya Rathi",
      text: "Got my daughter's name customised in a unicorn design. It turned out super cute and premium looking.",
      rating: 5,
      image: "https://i.pinimg.com/736x/3e/ad/0d/3ead0d3bde1ba10424c8b9a82eea8498.jpg"
    },
    {
      name: "Shayli Agarwal",
      text: "Used it for my wedding décor – guests couldn't stop taking selfies with the neon sign",
      rating: 5,
      image: "https://i.pinimg.com/736x/bc/bf/e0/bcbfe0633c354a1ad9afceb67461e36b.jpg"
    },
    {
      name: "Biswatin",
      text: "Unboxing the FloRo felt like opening a new gadget. Looks so cool on my bedroom wall!",
      rating: 5,
      image: "https://i.pinimg.com/736x/00/a8/4a/00a84a5014daaeb67e991fd2525a306b.jpg"
    }
  ];

  // Show only 1 review on small screen if showAll is false
  const visibleTestimonials = showAll || window.innerWidth >= 768
    ? testimonials
    : testimonials.slice(0, 1);

  return (
    <div className="bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Customer Stories</h2>
          <p className="text-yellow-100 max-w-2xl mx-auto">What our clients say about our neon creations</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              {/* Customer Image */}
              <div className="h-72 overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="px-6 py-4">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4 line-clamp-3">"{testimonial.text}"</p>
                <p className="font-medium text-gray-800">— {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center block md:hidden">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-8 py-3 rounded-full transition-colors"
          >
            {showAll ? "Show Less" : "View More Reviews"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
