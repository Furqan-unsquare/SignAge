import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]">

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-8 py-8 pt-24 md:pt-36">
        <div className="grid gap-12 lg:gap-16 items-center ">
          
          {/* Left Content */}
          <div className="text-center space-y-6 md:space-y-8">
            <div className="space-y-4 ">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#FDCA07] font-bold">
                Discover Who We Are
                and Why
              </h1>
              
              <div className='flex justify-center gap-4'>
                <h2 className="font-script text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed">
                We Illuminate Your Brand
                </h2>
                
                  <div className="relative flex items-center">
                    <img
                      src="https://i.pinimg.com/736x/90/7a/09/907a09bfde335952a16b6424a9197dad.jpg"
                      alt="testimonial-3"
                      className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-full shadow-md z-10 left-0"
                    />
                    <img
                      src="https://i.pinimg.com/736x/7c/83/da/7c83da8eaf0af177ef6096a0a9628d60.jpg"
                      alt="testimonial-1"
                      className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-full shadow-md z-30 left-12 md:left-16"
                    />
                    <img
                      src="https://i.pinimg.com/736x/16/0b/ec/160beceffcdcf9c9812e61efb76ec952.jpg"
                      alt="testimonial-2"
                      className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-full shadow-md z-20 absolute left-6 md:left-8"
                    />
                  </div>
              </div>
            </div>

            <p className="text-white text-base md:text-lg leading-relaxed max-w-5xl mx-auto line-clamp-2">
              We're a team of visionaries, and innovators building the future of visual communication. Our goal is to help every business create bold, 
              impactful signage. We transform spaces and elevate brands, making your message seen and remembered.
            </p>

            <a href="#who-we-are">
            <button className="bg-gradient-to-r from-yellow-600 to-green-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-medium text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Know Us
            </button></a>
          </div>

          {/* Right Content - Video */}
          <div className="relative">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-100">
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
                muted
                loop
                autoPlay
                >
                {/* Placeholder for video source */}
                <source src="/about.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-white rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Styling for Fonts */}
      <style jsx>{`
        .font-script {
          font-family: 'Brush Script MT', cursive;
        }
        .font-serif {
          font-family: 'Georgia', serif;
        }
      `}</style>
    </div>
  );
}