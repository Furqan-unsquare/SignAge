// components/NeonConfigurator/Testimonials.tsx
import React from "react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Cafe Owner",
      content: "The custom neon sign completely transformed my coffee shop's ambiance. Customers love taking photos with it!",
      image: "https://i.pinimg.com/736x/e8/b1/f5/e8b1f506358e0a4c56e27eb50b2196c6.jpg"
    },
    {
      name: "Michael T.",
      role: "Home Decor Enthusiast",
      content: "The quality exceeded my expectations. Installation was a breeze and it looks stunning in our living room.",
      image: "https://i.pinimg.com/736x/47/91/f0/4791f027dcad85f85883359daf191c5d.jpg"
    },
    {
      name: "Priya R.",
      role: "Event Planner",
      content: "Used these for a wedding reception. They were the highlight of the decor and so many guests asked about them.",
      image: "https://i.pinimg.com/736x/d3/62/fb/d362fb782bfc64b7b3e36e4b90e1e9f0.jpg"
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
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
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