import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);

  const testimonials = [ 
    {
      name: "Vikas Yadav",
      text: "Thank you for the fantastic door nameplate! Your creativity and attention to detail made it a standout piece. We truly appreciate your hard work and professionalism.",
      rating: 5,
      image: "https://i.pinimg.com/736x/02/bc/a2/02bca2e8bb0479b76924158afef8ccc3.jpg"
    },
    {
      name: "Priya Rathi",
      text: "Got my daughter's name customised in a unicorn design. It turned out super cute and premium looking.",
      rating: 5,
      image: "https://i.pinimg.com/736x/51/60/66/516066f4221f2b7f4bfd0a391fdfddc9.jpg"
    },
    {
      name: "Samantha Agarwal",
      text: "Used it for my wedding décor – guests couldn't stop taking selfies with the neon sign",
      rating: 5,
      image: "https://i.pinimg.com/736x/4f/ca/5b/4fca5b3b48362225165a55ace5f1737d.jpg"
    },
    {
      name: "Biswatin",
      text: "Unboxing the FloRo felt like opening a new gadget. Looks so cool on my bedroom wall!",
      rating: 5,
      image: "https://i.pinimg.com/736x/e6/ef/94/e6ef9442732a9cf6b30597e990137684.jpg"
    }
  ];

  // Show only 1 review on small screen if showAll is false
  const visibleTestimonials = showAll || window.innerWidth >= 768
    ? testimonials
    : testimonials.slice(0, 1);

  return (
    <div className="py-16 px-4">
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
