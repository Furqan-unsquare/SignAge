// components/NeonConfigurator/Testimonials.tsx
import React from "react";

export const Testimonials = () => {

  
  const testimonials = [ 
    {
      name: "Vikas Yadav",
      content: "Thank you for the fantastic door nameplate! Your creativity made it a standout piece. We truly appreciate your hard work.",
      rating: 5,
      image: "https://i.pinimg.com/736x/02/bc/a2/02bca2e8bb0479b76924158afef8ccc3.jpg"
    },
    {
      name: "Priya Rathi",
      content: "Got my daughter's name customised in a unicorn design. It turned out super cute and premium looking.",
      rating: 5,
      image: "https://i.pinimg.com/736x/51/60/66/516066f4221f2b7f4bfd0a391fdfddc9.jpg"
    },
    {
      name: "Samantha Agarwal",
      content: "Used it for my wedding décor – guests couldn't stop taking selfies with the neon sign",
      rating: 5,
      image: "https://i.pinimg.com/736x/4f/ca/5b/4fca5b3b48362225165a55ace5f1737d.jpg"
    }
  ];

  return (
    <div className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Happy Customer</h2>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-purple-500 overflow-hidden mr-4">
                  {/* In production, use next/image */}
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};