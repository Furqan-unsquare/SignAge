import { Map, MapIcon, MapPinCheck, Phone, Zap } from 'lucide-react';
import { Button } from '@/components/UI/button';

const ContactCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-yellow-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Signage-style header */}
        <div className="relative inline-block mb-12">
          <div className="absolute inset-0 bg-yellow-400 rounded-lg transform rotate-2 blur-md opacity-70"></div>
          <div className="relative bg-white border-4 border-yellow-400 px-10 py-6 rounded-lg shadow-2xl">
            <h2 className="text-2xl md:text-5xl font-black text-gray-800 mb-2">
              READY TO <span className="text-[#EA3C1F]">ELECTRIFY</span>
            </h2>
            <h3 className="text-2xl md:text-4xl font-black text-gray-800">
              YOUR BRAND?
            </h3>
          </div>
        </div>

        <p className="md:text-xl text-yellow-100 mb-10 max-w-2xl mx-auto">
          Join hundreds of satisfied customers who chose us to make their brand shine bright.
        </p>

        {/* Signage-style buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  {/* Call Button */}
  <div className="relative group">
    <div className="absolute -top-4 left-1/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>
    <div className="absolute -top-4 left-3/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>

    <a
      href="tel:+919594274068"
      className="relative z-10 bg-yellow-400 border-4 border-white text-gray-900 font-bold px-10 py-2 text-xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-yellow-400/50 group rounded-lg flex items-center"
    >
      Call on: +91 9594274068
      <Phone className="w-5 h-5 ml-2 group-hover:animate-pulse" />
    </a>
  </div>

      {/* Brand Button */}
      <div className="relative group">
        <div className="absolute -top-4 left-1/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>
        <div className="absolute -top-4 left-3/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>
        <a
        href="https://maps.app.goo.gl/UGTpFgRmeMELYazY7"  // Replace this with your exact location link
        target="_blank"
        rel="noopener noreferrer"
        className="relative group">
          <div className="relative z-10 bg-gray-100 border-4 border-yellow-400 text-gray-800 font-bold px-10 py-2 text-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-yellow-400/30 group rounded-lg flex items-center">
            Ansh Enterprises
            <MapPinCheck className="w-5 h-5 ml-2 text-gray-800 group-hover:animate-bounce" />
          </div>
        </a>
      </div>
    </div>
      </div>     
    </section>
  );
};

export default ContactCTA;