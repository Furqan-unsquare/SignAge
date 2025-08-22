import React from "react";

// Hero Section
export default function HeroSection() {

  return (
    <>
      {/* HERO SECTION */}
      <div className="h-screen w-full flex flex-col">
        {/* Top section: 30% height */}
         <div className="h-[25vh] w-full text-white text-center md:text-left px-4 md:px-20 py-6 flex flex-col justify-center">
          <p className="text-yellow-400 text-2xl md:text-3xl uppercase font-black">Acrylic Sign Boards & More</p>
          <p className=" md:text-lg text-gray-300 mt-2 max-w-3xl">
            Where design meets durability—discover Acrylic Sign Boards and other Signages that shine with personality
          </p>
        </div>

        {/* Bottom section: 70% height */}
       {/* Desktop View Image */}
        <div
          className="hidden sm:block h-[85vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.neonattack.com/cdn/shop/files/Adaptations-08_1.jpg?v=1749542649&width=2000')",
          }}/>

        {/* Mobile View Image */}
        <div
          className="block sm:hidden h-[65vh] bg-cover bg-center mx-4 rounded-xl"
          style={{
            backgroundImage:
              "url('https://www.neonattack.com/cdn/shop/files/Adaptations-09_87d05341-0036-4ba8-8bcf-a48c0eef6058.jpg?v=1749542649&width=800')",
          }}/>
      </div>
    </>
  );
}
