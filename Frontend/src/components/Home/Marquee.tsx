import { Clock, Star, Layers, Zap, Wrench, Shield, Truck, PenTool, Activity, Award,} from "lucide-react";

const features = [
  { icon: <Zap className="w-5 h-5" />, label: "Premium Quality" },
  { icon: <Clock className="w-5 h-5" />, label: "Quick Setup" },
  { icon: <Shield className="w-5 h-5" />, label: "2-Year Warranty" },
  { icon: <Star className="w-5 h-5" />, label: "4.8★ Rated" },
  { icon: <Award className="w-5 h-5" />, label: "Best Value" },
  { icon: <PenTool className="w-5 h-5" />, label: "Free Design Mockup" },
  { icon: <Layers className="w-5 h-5" />, label: "Durable Acrylic Backing" },
  { icon: <Wrench className="w-5 h-5" />, label: "Easy Installation" },
  { icon: <Truck className="w-5 h-5" />, label: "Secure & Fast Shipping" },
  { icon: <Activity className="w-5 h-5" />, label: "Simple Animation Effects" },
];


const MarqueeIcons = () => {
  return (
    <div 
      className="overflow-hidden w-full md:pt-6 relative"
      style={{ backgroundColor: '#E63025' }}>
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-red-600 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-red-600 to-transparent z-10"></div>
      
      <div className="flex items-center animate-marquee">
        {[...features, ...features, ...features].map((feature, index) => (
          <div
            key={index}
            className="flex items-center md:space-x-3 mx-2 md:mx-4 bg-white/10 rounded-3xl px-4 py-2 text-white/80 hover:text-white transition-all duration-300 group">
            <div className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
              {feature.icon}
            </div>
            <span className="text-sm font-medium whitespace-nowrap tracking-wide">
              {feature.label}
            </span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
  __html: `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-33.333%); }
    }
    .animate-marquee {
      animation: marquee 25s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }

    /* Faster marquee on mobile */
    @media (max-width: 768px) {
      .animate-marquee {
        animation: marquee 10s linear infinite;
      }
    }
  `
}} />

    </div>
  );
};

export default MarqueeIcons;