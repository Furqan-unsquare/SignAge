import { Zap, Monitor, Building, Camera, Star, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/UI/card';
import { useEffect } from 'react';

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: 'NEON SIGNS',
      description: 'Vibrant glowing signs that electrify your storefront with retro-modern appeal',
      color: 'yellow',
      border: 'border-pink-500',
      textColor: 'text-pink-500',
      shape: 'rounded-lg',
      bg: 'bg-yellow-400',
      ropeColor: 'bg-pink-400'
    },
    {
      icon: Monitor,
      title: 'DIGITAL DISPLAYS',
      description: 'Dynamic LED screens that showcase your content with brilliant clarity',
      color: 'blue',
      border: 'border-blue-500',
      textColor: 'text-blue-500',
      shape: 'rounded-t-lg rounded-br-none',
      bg: 'bg-blue-100',
      ropeColor: 'bg-blue-400'
    },
    {
      icon: Building,
      title: 'BUSINESS SIGNAGE',
      description: 'Professional corporate signs that establish your brand presence',
      color: 'purple',
      border: 'border-purple-500',
      textColor: 'text-purple-500',
      shape: 'rounded-full',
      bg: 'bg-purple-100',
      ropeColor: 'bg-purple-400'
    },
    {
      icon: Camera,
      title: 'RESTAURANT SIGNS',
      description: 'Appetizing signage that draws customers like moths to a flame',
      color: 'red',
      border: 'border-red-500',
      textColor: 'text-red-500',
      shape: 'rounded-lg skew-x-3',
      bg: 'bg-red-100',
      ropeColor: 'bg-red-400'
    },
    {
      icon: Star,
      title: 'EVENT SIGNAGE',
      description: 'Eye-catching temporary signs that make your event unforgettable',
      color: 'green',
      border: 'border-green-500',
      textColor: 'text-green-500',
      shape: 'rounded-lg rotate-1',
      bg: 'bg-green-100',
      ropeColor: 'bg-green-400'
    },
    {
      icon: Palette,
      title: 'CUSTOM DESIGN',
      description: 'Bespoke signage solutions tailored to your unique vision',
      color: 'pink',
      border: 'border-yellow-500',
      textColor: 'text-yellow-500',
      shape: 'rounded-lg scale-105',
      bg: 'bg-pink-100',
      ropeColor: 'bg-yellow-400'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
            OUR <span className="text-yellow-300">SERVICES</span>
          </h2>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
            We craft signage that doesn't just inform - it captivates and converts
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={service.title} className="relative group h-full">
              {/* Ropes positioned at 1/4 and 3/4 width */}
              <div className="absolute -top-6 left-1/4 w-1 h-8 transform -translate-x-1/2 z-10">
                <div className={`w-full h-full ${service.ropeColor} rounded-t-full`}></div>
              </div>
              <div className="absolute -top-6 left-3/4 w-1 h-8 transform -translate-x-1/2 z-10">
                <div className={`w-full h-full ${service.ropeColor} rounded-t-full`}></div>
              </div>

              {/* Unique signage for each service */}
              <Card className={`h-full ${service.shape} ${service.bg} border-4 ${service.border} transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-yellow-400/30 overflow-hidden`}>
                <CardContent className="p-6 text-center relative h-full flex flex-col">
                  {/* Icon with creative background */}
                  <div className={`w-20 h-20 mx-auto mb-6 ${service.shape} ${service.border} ${service.bg} flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125`}>
                    <service.icon className={`w-10 h-10 ${service.textColor}`} />
                  </div>

                  {/* Title with creative typography */}
                  <h3 className={`text-3xl font-extrabold mb-4 ${service.textColor} tracking-tight`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-800 mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Decorative element */}
                  <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <div className={`h-full ${service.bg} animate-progress`}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <a href="/custom">
          <div className="inline-flex items-center px-10 py-5 bg-yellow-400 border-4 border-white rounded-full text-gray-900 font-black text-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-yellow-400/50 group">
            LET'S CREATE SOMETHING AMAZING!
            <Zap className="w-6 h-6 ml-3 hidden md:block text-gray-900 group-hover:animate-bounce" />
          </div>
          </a>
        </div>
      </div>

      {/* Scrolling marquee text - bright yellow */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-6  mb-[-20px] bg-yellow-400/10 backdrop-blur-sm ">
        <div className="inline-block whitespace-nowrap animate-marquee pt-20">
          <span className="text-4xl md:text-5xl font-black text-yellow-300 uppercase tracking-wider mx-8">
            ✦ CUSTOM SIGNAGE ✦ NEON LIGHTS ✦ LED DISPLAYS ✦ CHANNEL LETTERS ✦ WAYFINDING ✦ WINDOW GRAPHICS ✦
          </span>
          <span className="text-4xl md:text-5xl font-black text-yellow-300 uppercase tracking-wider mx-8">
            ✦ CUSTOM SIGNAGE ✦ NEON LIGHTS ✦ LED DISPLAYS ✦ CHANNEL LETTERS ✦ WAYFINDING ✦ WINDOW GRAPHICS ✦
          </span>
        </div>
      </div>

      {/* Global styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          display: inline-block;
        }
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Services;