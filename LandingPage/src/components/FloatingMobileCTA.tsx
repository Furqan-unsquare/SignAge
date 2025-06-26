import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, Phone, MapPin, MessageCircle, Instagram } from 'lucide-react';
import gsap from 'gsap';

const PremiumFloatingButton = () => {
  const buttonRef = useRef(null);
  const arrowRef = useRef(null);
  const svgRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Smooth SVG rotation for text
    gsap.to(svgRef.current, {
      rotation: 360,
      duration: 12,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    });

    // Arrow floating animation
    gsap.to(arrowRef.current, {
      y: -2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      gsap.killTweensOf(svgRef.current);
      gsap.killTweensOf(arrowRef.current);
    };
  }, []);

  const toggleMenu = () => {
    const socialBtns = gsap.utils.toArray('.social-option');

    setIsOpen((prev) => {
      if (!prev) {
        gsap.to(arrowRef.current, { rotation: 180, ease: 'power3.out' });
        gsap.fromTo(
          socialBtns,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: 'power3.out', duration: 0.3 }
        );
      } else {
        gsap.to(arrowRef.current, { rotation: 0, ease: 'power3.out' });
        gsap.to(socialBtns, {
          y: 10,
          opacity: 0,
          stagger: 0.05,
          ease: 'power3.inOut',
          duration: 0.3,
        });
      }

      return !prev;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Buttons */}
      <div className="absolute bottom-full right-0 mb-3 pr-2 space-y-2">
        {[
          {
            icon: <MessageCircle className="w-5 h-5" />,
            color: "bg-[#25D366] hover:bg-[#128C7E]",
            tooltip: "WhatsApp Chat",
            href: "https://wa.me/91xxxxxxxxxx",
          },
          {
            icon: <Instagram className="w-5 h-5" />,
            color: "bg-gradient-to-tr from-[#833AB4] via-[#C13584] to-[#E1306C]",
            tooltip: "Instagram DM",
            href: "https://instagram.com/yourhandle",
          },
          {
            icon: <Phone className="w-5 h-5" />,
            color: "bg-[#4285F4]",
            tooltip: "Call Us",
            href: "tel:+919999999999",
          },
          {
            icon: <MapPin className="w-5 h-5" />,
            color: "bg-[#EA4335]",
            tooltip: "Location",
            href: "https://maps.google.com/?q=Your+Location",
          },
        ].map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={`social-option w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white shadow-lg transition-all will-change-transform ${
              !isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label={item.tooltip}
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* Main FAB */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="relative w-16 h-16 rounded-full transition-all duration-200 focus:outline-none backdrop-blur-md shadow-xl"
        aria-expanded={isOpen}>
        {/* Rotating Text SVG */}

         {/* Glossy Layer */}
  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-20" />
  </div>
  
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <path
              id="circlePath"
              d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
            />

          </defs>
          <text
            fontSize="10"
            fill="white"
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            letterSpacing="0.5"
          >
            <textPath href="#circlePath" startOffset="0%">
              • Contact • Connect • Support • Contact • Connect • Support •
            </textPath>
          </text>
        </svg>

        {/* Arrow */}
        <div
          ref={arrowRef}
          className="absolute inset-0 flex items-center justify-center">
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </button>
    </div>
  );
};

export default PremiumFloatingButton;
