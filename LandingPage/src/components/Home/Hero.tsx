import React from "react";
import { Shuffle, Star, Recycle } from "lucide-react";

export default function MechaHero() {
  return (
    <div className="h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] relative overflow-hidden">
      {/* Mobile View (shows on small screens) */}
      <div className="lg:hidden h-full flex flex-col p-6 bg-[url('https://i.pinimg.com/736x/3c/3c/2e/3c3c2eb34498dab75f994be9fad3539b.jpg')] bg-cover bg-center">
        <div className="flex-1 flex flex-col  justify-center items-center text-center">
          <h1 className="text-5xl font-black text-white leading-none mb-6">FRAME YOUR VISION</h1>
          <p className="text-gray-200 text-sm leading-relaxed mb-6 max-w-xs">
            Elevate your signage with our premium frames. Durable, stylish, and easy to install,{" "}
            <span className="font-bold text-white">our frames are designed to make your message stand out.</span>
          </p>
          <button 
          onClick={() => window.location.href = '/work'}
          className="bg-gradient-to-r from-green-500 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-sm  hover:shadow-lg transition-all">
            BROWSE FRAMES
          </button>
        </div>
        
        <div className="mt-auto">
              <h2 className="text-5xl font-black text-white tracking-tighter">FRAME HUB</h2>
              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-300 text-sm">
                 Explore our new interactive <br /> frame selector.
                </p>
                {/* Removed ArrowUpRight */}
              </div>
            </div>
      </div>

      {/* Desktop View (hidden on mobile) */}
      <div className="hidden lg:grid grid-cols-3 grid-rows-2  h-full">
        {/* Merged Top Section (2/3 width) */}
        <div className="relative col-span-2 p-20 mt-20 flex flex-col justify-center text-white border-b border-[#334155]">
          <h1 className="text-7xl font-black leading-none">FRAME YOUR VISION</h1>
          <p className="text-gray-300 mt-4 max-w-3xl">
            Discover our stunning collection of frames designed to perfectly showcase your signage.
            From sleek modern to classic designs, find the ideal frame for your business or home.
          </p>

          {/* <div className="mt-20 right-0 absolute">
            <button className="bg-gradient-to-r from-yellow-400 to-green-500 text-white px-10 py-10 rounded-full font-bold text-xl shadow-lg rotate-3 transition-all">
              TRY IT!
            </button>
          </div> */}
        </div>

        {/* Merged Right Section with Background */}
        <div className="row-span-2 relative bg-[url('https://i.pinimg.com/736x/b3/bf/64/b3bf64f04690460818279ea5f7993942.jpg')] bg-cover bg-center border-l border-[#334155]">
          <div className="absolute inset-0 p-8 flex flex-col justify-between bg-black/40">
            {/* Top Message */}
            <div className="px-5 py-20">
              <p className="text-white font-black text-lg leading-tight">
                YOUR SIGNAGE DESERVES THE PERFECT FRAME. 
              </p>
              <p className="text-yellow-300 font-black text-lg leading-tight mt-2">
                TRANSFORM YOUR DISPLAY FROM ORDINARY TO EXTRAORDINARY
              </p>
            </div>

            {/* Section */}
            <div className="mt-auto">
              <h2 className="text-5xl font-black text-white tracking-tighter">FRAME HUB</h2>
              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-300 text-sm">
                 Explore our new interactive <br /> frame selector.
                </p>
                {/* Removed ArrowUpRight */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left - Navigation Pills */}
        <div className="p-8 flex items-center justify-center border-r border-b border-[#334155]">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button    
              onClick={() => window.location.href = '/work'}
              className="px-8 py-4 bg-[#1E293B] text-white rounded-full font-semibold hover:bg-[#334155] transition-colors border border-[#334155]">
                COLLECTIONS
              </button>
              <button className="py-4 px-10 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-colors flex items-center">
                <Shuffle className="w-6 h-6" />
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="px-10 py-4 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-colors flex items-center">
                <Star className="w-6 h-6" />
              </button>
              <button 
              onClick={() => window.location.href = '/about'}
              className="px-14 py-4 uppercase bg-[#1E293B] text-white rounded-full font-semibold hover:bg-[#334155] transition-colors border border-[#334155]">
                About Us
              </button>
            </div>
            <div className="flex space-x-4">
              <button 
              onClick={() => window.location.href = '/custom'}
              className="px-8 py-4 uppercase bg-[#1E293B] text-white rounded-full font-semibold hover:bg-[#334155] transition-colors border border-[#334155]">
                Customize Your
              </button>
              <button className="px-10 py-4 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-colors flex items-center">
                <Recycle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Center - Description */}
        <div className="p-8 flex flex-col justify-center items-center text-center border-b border-[#334155]">
          <p className="text-gray-200 leading-relaxed mb-6 max-w-xs">
            Elevate your signage with our premium frames. Durable, stylish, and easy to install,{" "}
            <span className="font-bold text-white">our frames are designed to make your message stand out.</span>
          </p>
          <button 
          onClick={() => window.location.href = '/work'} 
          className="bg-gradient-to-r from-green-500 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-sm  hover:shadow-lg transition-all">
            BROWSE FRAMES
          </button>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");
        * {
          font-family: "Inter", sans-serif;
        }
      `}</style>
    </div>
  );
}