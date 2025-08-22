import { Zap, Sparkles, Eye, Heart } from "lucide-react";

const NeonCraftSection = () => {
  return (
    <section className="py-16 md:py-20 backdrop-blur-sm bg-[#1a1a1a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <div className="px-4 lgw-1/2 space-y-6 text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              100% IN-HOUSE
              <br />
              <span className="text-yellow-300">NEON MAGIC</span>
            </h2>

            <p className="text-base md:text-lg text-yellow-100 leading-relaxed">
              From concept to creation, every neon sign is crafted with passion in our Mumbai studio.
            </p>
            <p className="text-sm text-yellow-200 leading-relaxed">
              Our master craftsmen bend, shape, and electrify each piece to perfection.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              {[
                { icon: <Eye className="w-5 h-5 text-yellow-300" />, text: "Hand-Crafted Design" },
                { icon: <Sparkles className="w-5 h-5 text-yellow-300" />, text: "Premium Materials" },
                { icon: <Zap className="w-5 h-5 text-yellow-300" />, text: "Authentic Neon Glow" },
                { icon: <Heart className="w-5 h-5 text-yellow-300" />, text: "Made with Love" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-300 rounded-full flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <span className="text-yellow-100 font-medium text-sm md:text-base">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => window.location.href = '/custom'}
              className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
              Customize Your Neon
              <Zap className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2 w-full">
          <div className="rounded-xl overflow-hidden border-2 border-yellow-300 shadow-xl">
            <div className="aspect-video bg-gray-900 relative">
              {/* The image */}
              <img
                src="/assets/9.jpg"
                alt="Neon sign craftsmanship"
                className="w-full h-full object-cover"
              />
              {/* Watermark overlay */}
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 20,
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 'bold',
                  fontSize: 24,
                  textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
                  pointerEvents: 'none', // Make text not interactable
                }}
              >
                Sample
              </span>
            </div>
          </div>
          </div>  
        </div>
      </div>
    </section>
  );
};

export default NeonCraftSection;
