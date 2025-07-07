import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const CustomProducts = () => {
  return (
    <section className="bg-[#1a1a1a]/60 backdrop-blur-sm py-16 px-8 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20">
          
          {/* Left - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_4px_60px_rgba(253,202,7,0.2)] border border-yellow-200/10">
              <img 
                src="https://i.pinimg.com/736x/d4/fd/20/d4fd20210e840cf6484ba246ad1288de.jpg" 
                alt="Custom neon sign" 
                className="w-full object-cover rounded-3xl max-h-[420px]"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-1/2 text-white space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Talk to us to <span className="text-yellow-400">place your order</span>
            </h2>
 
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Tell Us What You Want",
                  desc: "Share your requirements via WhatsApp"
                },
                {
                  step: "2",
                  title: "Create a Mockup",
                  desc: "Preview your design and receive a quote"
                },
                {
                  step: "3",
                  title: "Design & Delivery",
                  desc: "Finalize, produce, and receive your product"
                },
              ].map(({ step, title, desc }, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-11 h-11 flex items-center justify-center bg-white/20 backdrop-blur-sm text-yellow-300 font-bold rounded-full shadow-inner border border-white/20 text-lg">
                    {step}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-yellow-400">{title}</h3>
                    <p className="text-sm md:text-base text-gray-100">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div>
              <a 
                href="https://wa.me/919594274068" // <-- Replace with your phone number
                target="_blank"
                rel="noopener noreferrer">
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
               <FaWhatsapp className='h-5'/>
                WhatsApp Us
              </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomProducts;
