import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const SignageServices = () => {
  const services = [
    {
      id: 1,
      title: "Neon Signs",
      description: "Vibrant illuminated signage that makes your business stand out at night",
      img: "https://i.pinimg.com/736x/07/e2/ec/07e2ec074af3cc99c9168ace13d569e9.jpg",
      features: ["Custom shapes", "Multiple colors", "Energy efficient"]
    },
    {
      id: 2,
      title: "Channel Letters",
      description: "3D dimensional signs for maximum visibility and brand recognition",
      img: "https://www.halolitsigns.com/wp-content/uploads/2022/10/halo-lit-channel-letters.jpg",
      features: ["Indoor/outdoor", "Various materials", "LED illuminated"]
    },
    {
      id: 3,
      title: "Digital Signage",
      description: "Dynamic digital displays for engaging customer experiences",
      img: "https://i.pinimg.com/736x/20/3b/e2/203be2faf3c934dbc62aa7b5142262a9.jpg",
      features: ["Content management", "Touch screen", "Real-time updates"]
    },
    {
      id: 4,
      title: "Vinyl Banners",
      description: "Cost-effective temporary signage for promotions and events",
      img: "https://i.pinimg.com/736x/d7/f6/da/d7f6da3fcb83f9cd341be22395d8b2a9.jpg",
      features: ["Weather resistant", "Quick turnaround", "Various sizes"]
    },
    {
      id: 5,
      title: "Monument Signs",
      description: "Permanent ground signs that establish your business presence",
      img: "https://i.pinimg.com/736x/db/6a/f4/db6af4d66c19dcdc52a7d8f33afdad35.jpg",
      features: ["Durable materials", "Custom designs", "LED lighting"]
    },
    {
      id: 6,
      title: "Window Graphics",
      description: "Transform your windows into powerful advertising space",
      img: "https://i.pinimg.com/736x/5c/c2/29/5cc229522d3358bf57af4f572cdf35d4.jpg",
      features: ["Frosted designs", "Full-color prints", "Removable options"]
    }
  ];

  return (
    <div className="bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Signage Services
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
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
                {/* Optional: Short description */}
                {/* <p className="text-sm mb-4">{service.description}</p> */}
                {/* add a navigate onclick below button */}
                <button onClick={() => window.location.href = `/work`} 
                className="flex items-center text-white font-medium hover:text-yellow-300 transition-colors">
                  View examples
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>


        {/* CTA */}
        <div className=" text-center">
          <button onClick={() => window.location.href = `/custom`} 
          className="bg-white text-[#EA3C1F] px-4 md:px-8 py-2 md:py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Get Your Custom Signage
          </button>
          <p className="text-white/80 mt-4">
            Contact us for a free consultation and quote
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignageServices;