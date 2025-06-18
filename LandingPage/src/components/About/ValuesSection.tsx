import React, { useEffect, useRef } from "react";

const TestimonialsSection: React.FC = () => {
// Utility component to reuse
const MarqueeLine: React.FC = () => (
  <div className="overflow-hidden whitespace-nowrap w-full">
    <div className="animate-marquee inline-block whitespace-nowrap text-[#FDCA07] text-2xl sm:text-4xl md:text-6xl font-bold px-2">
      <span className="mx-4 uppercase">shine with Sign ✦ shine with Sign ✦ shine with Sign ✦ shine with Sign ✦ shine with Sign ✦</span>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Floating 3D Graphics with Realistic Shadow */}
      {[{ id: 1, size: "w-16 h-24 md:w-56 md:h-56", position: "top-3/6 mt-14 left-1/2 -translate-x-1/2 -translate-y-1/2", rotation: "rotate-3" }

      ].map((graphic) => (
        <div
          key={graphic.id}
          className={`absolute ${graphic.size} ${graphic.position} z-50 transform ${graphic.rotation} drop-shadow-2xl`}
        >
          <img
            src="/3D_graphics-1.png"
            alt="Decorative 3D graphic"
            className="w-full h-full mt-3 object-contain"
          />
        </div>
      ))}

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Marquee Title (Two Lines) */}
      <div className="mb-10 space-y-2 sm:space-y-4">
        <MarqueeLine />
        <MarqueeLine />
      </div>


        {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {[
    {
      name: "Mark T, Retail Owner",
      quote:
        "Their digital signage transformed our store’s appeal. It’s been a game-changer for customer engagement.",
    },
    {
      name: "Linda K, Marketing Director",
      quote:
        "The eco-friendly signage solutions helped us align with our sustainability goals while boosting brand visibility.",
    },
    {
      name: "David R, Event Organizer",
      quote:
        "Their signage made our event stand out. The quality and creativity were unmatched.",
    },
    {
      name: "Sarah M, Restaurant Manager",
      quote:
        "The illuminated signs increased our foot traffic significantly. We couldn’t be happier with the results!",
    },
  ].map((testimonial, index) => (
    <div key={index} className="p-8 relative overflow-hidden">
      <h3 className="text-2xl font-bold text-[#FDCA07] mb-4">
        {testimonial.name}
      </h3>
      <p className="text-white text-lg">“{testimonial.quote}”</p>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default TestimonialsSection;