
import React from 'react';

const CustomProducts = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-20 px-4 md:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Creative Dark Room Scene */}
          <div className="relative">
            <div className="bg-black rounded-3xl p-8 min-h-[500px] relative overflow-hidden">
              
              {/* Room Interior */}
              <div className="absolute inset-0">
                {/* Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent"></div>
                
                {/* Wall */}
                <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-gray-800 to-gray-900"></div>
                
                {/* Corner Shadow */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/50 to-transparent"></div>
              </div>

              {/* Neon Sign */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  {/* Neon Glow Effect */}
                  <div className="absolute inset-0 blur-md">
                    <div className="text-6xl md:text-7xl font-black text-[#fdca07] opacity-80">
                      CUSTOM
                    </div>
                  </div>
                  
                  {/* Main Neon Text */}
                  <div className="relative text-6xl md:text-7xl font-black text-[#fdca07] text-center animate-pulse">
                    CUSTOM
                  </div>
                  
                  {/* Sub Neon Text */}
                  <div className="relative mt-2">
                    <div className="absolute inset-0 blur-sm">
                      <div className="text-2xl md:text-3xl font-bold text-yellow-300 text-center opacity-70">
                        PRODUCTS
                      </div>
                    </div>
                    <div className="relative text-2xl md:text-3xl font-bold text-yellow-300 text-center">
                      PRODUCTS
                    </div>
                  </div>
                </div>
              </div>

              {/* Ambient Light Rays */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-96 h-96 bg-gradient-radial from-[#fdca07]/20 via-[#fdca07]/10 to-transparent rounded-full animate-pulse"></div>
              </div>

              {/* Electrical Effects */}
              <div className="absolute top-20 right-20 w-2 h-2 bg-[#fdca07] rounded-full animate-ping"></div>
              <div className="absolute bottom-32 left-16 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-500"></div>
              <div className="absolute top-32 left-32 w-1.5 h-1.5 bg-[#fdca07] rounded-full animate-ping delay-1000"></div>

              {/* Power Cable */}
              <div className="absolute bottom-8 right-8 w-px h-16 bg-gray-600"></div>
              <div className="absolute bottom-8 right-6 w-6 h-2 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-white space-y-6">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wider">
                Talk to us to
              </h2>
              <h3 className="text-5xl md:text-6xl font-black uppercase tracking-wider text-[#fdca07]">
                place your order
              </h3>
            </div>

            <div className="space-y-8 mt-12">
              {/* Step 1 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#fdca07] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-black text-white">01</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#fdca07] mb-2">Tell Us What You Want</h4>
                  <p className="text-lg text-gray-200">Tell us your requirement on WhatsApp</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#fdca07] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-black text-white">02</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#fdca07] mb-2">We Take Extra Step</h4>
                  <p className="text-lg text-gray-200">Get a mock up. See how exactly this looks and get a price quote</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#fdca07] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-black text-white">03</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#fdca07] mb-2">Design Finalize and Shipped!</h4>
                  <p className="text-lg text-gray-200">Finalize design. You confirm if this looks good. Production starts. Get your product</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-12">
              <button className="group bg-[#fdca07] hover:bg-yellow-400 text-black font-bold text-xl px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#fdca07] flex items-center space-x-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.485"/>
                </svg>
                <span>WhatsApp Us</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default CustomProducts;
