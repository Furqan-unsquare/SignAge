import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const SignageServices = () => {
const services = [
  {
    id: 1,
    title: "Acrylic Letter / Signboard",
    img: "/assets/1.jpg",
    category: "acrylic",
  },
  {
    id: 2,
    title: "Aluminium Channel Letter",
    img: "/assets/2.jpg",
    category: "aluminium",
  },
  {
    id: 3,
    title: "3D Steel Signage",
    img: "/assets/3.jpg",
    category: "3d-steel",
  },
  {
    id: 4,
    title: "Printed Name Plate",
    img: "/assets/8.jpg",
    category: "office-name",
  },
  {
    id: 5,
    title: "Glow Signs",
    img: "/assets/5.jpg",
    category: "glow-sign",
  },
  {
    id: 6,
    title: "LED Scrolling Signs",
    img: "/assets/9.jpg",
    category: "led-scrolling",
  },
];



  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Signage Services
          </h2>
          <p className="md:text-xl text-white/90 max-w-3xl mx-auto">
            Premium signage solutions to elevate your brand visibility
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 bg-white/50 rounded-full" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black py-10">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => window.location.href = `/work#project?category=${service.category}`}
              className="group relative rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
            >
              {/* Image */}
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute bottom-0 p-6 z-10 text-white w-full">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
               <button className="flex items-center text-white font-medium hover:text-yellow-300 transition-colors">
                  View examples
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>


        {/* CTA */}
        <div className=" text-center pb-10">
          <div className='md:space-x-4'>
          <button onClick={() => window.location.href = `/custom`} 
          className="bg-white text-[#EA3C1F] px-4 md:px-8 py-2 md:py-4 mb-2 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Create Your Custom Neon Signage
          </button>

          <button onClick={() => window.open('https://www.canva.com/create/signs/', '_blank', 'noopener,noreferrer')}
            className="bg-white text-[#EA3C1F] px-4 md:px-8 py-2 md:py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Design Custom Signage on Canva
          </button>
          </div>
        
          <p className="md:text-xl text-white/80 mt-4">
            Contact us for a free consultation and quote
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignageServices;