import { Phone, Zap } from 'lucide-react';
import { Button } from '@/components/UI/button';

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-2">
              READY TO <span className="text-[#EA3C1F]">ELECTRIFY</span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-gray-800">
              YOUR BRAND?
            </h3>
          </div>
        </div>

        <p className="text-xl text-yellow-100 mb-10 max-w-2xl mx-auto">
          Join hundreds of satisfied customers who chose us to make their brand shine bright.
        </p>

        {/* Signage-style buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="relative group">
            <div className="absolute -top-4 left-1/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>
            <div className="absolute -top-4 left-3/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>

            <Button
              size="lg"
              className="relative bg-yellow-400 border-4 border-white text-gray-900 font-bold px-10 py-5 text-xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-yellow-400/50 group"
            >
              CALL NOW: +1 (555) 123-SIGN
              <Phone className="w-5 h-5 ml-2 group-hover:animate-pulse" />
            </Button>
          </div>

          <div className="relative group">
            <div className="absolute -top-4 left-1/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>
            <div className="absolute -top-4 left-3/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>

            <Button
              variant="outline"
              size="lg"
              className="relative bg-white/90 border-4 border-yellow-400 text-gray-800 font-bold px-10 py-5 text-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-yellow-400/30 group"
            >
              SCHEDULE CONSULTATION
              <Zap className="w-5 h-5 ml-2 text-yellow-500 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling marquee text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-2 ">
        <div className="inline-block whitespace-nowrap animate-marquee">
          <span className="text-3xl font-black text-yellow-300 uppercase tracking-wider mx-8">
            ✦ FREE QUOTES ✦ 24/7 SUPPORT ✦ 5-YEAR WARRANTY ✦ INSTALLATION INCLUDED ✦
          </span>
          <span className="text-3xl font-black text-yellow-300 uppercase tracking-wider mx-8">
            ✦ FREE QUOTES ✦ 24/7 SUPPORT ✦ 5-YEAR WARRANTY ✦ INSTALLATION INCLUDED ✦
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
      `}</style>
    </section>
  );
};

export default ContactCTA;