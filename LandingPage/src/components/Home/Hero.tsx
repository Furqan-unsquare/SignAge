import React from "react";

// Hero Section
export default function HeroSection() {

  return (
    <>
      {/* HERO SECTION */}
      <div className="h-screen w-full flex flex-col">
        {/* Top section: 30% height */}
        <div className="h-[35vh] w-full text-white pt-28 px-8 py-6 flex flex-col justify-center">
          <p className="text-yellow-400 text-lg md:text-4xl uppercase font-black">neon lights brand</p>
          <p className="text-sm md:text-lg text-gray-300 mt-2 max-w-3xl">
            Experience world-class craftsmanship with LED Neon Signs that brighten up your space and match your aesthetic.
          </p>
        </div>

        {/* Bottom section: 70% height */}
        <div
          className="h-[65vh] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://www.neonattack.com/cdn/shop/files/Adaptations-08_1.jpg?v=1749542649&width=2000')",
          }}
        />
      </div>
    </>
  );
}
