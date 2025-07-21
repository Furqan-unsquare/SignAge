import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PremiumFloatingButton = () => {
  const arrowRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    gsap.to(svgRef.current, {
      rotation: 360,
      duration: 12,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    });

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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Buttons (Always Visible) */}
      <div className="absolute bottom-full right-0 space-y-2">
        {[
          {
            icon: <img src="https://imagepng.org/wp-content/uploads/2017/08/WhatsApp-icone.png" alt="WhatsApp" className="w-6 h-6" />,
            color: "bg-[#25D366] hover:bg-[#128C7E]",
            tooltip: "WhatsApp Chat",
            href: "https://wa.me/+917738205322",
          },
          {
            icon: <img src="https://static.vecteezy.com/system/resources/previews/024/170/870/original/instagram-icon-logo-symbol-free-png.png" alt="Instagram" className="w-6 h-6" />,
            color: "bg-gradient-to-tr from-[#833AB4] via-[#C13584] to-[#E1306C]",
            tooltip: "Instagram DM",
            href: "https://www.instagram.com/acrylic_signboard",
          },
          {
            icon: <img src="https://static.vecteezy.com/system/resources/previews/014/392/004/non_2x/phone-call-auricular-icon-on-transparent-background-free-png.png" alt="Phone" className="w-8 h-5" />,
            color: "bg-[#4285F4]",
            tooltip: "Call Us",
            href: "tel:+919594274068",
          },
          {
            icon: <img src="https://cdn-icons-png.flaticon.com/512/2991/2991231.png" alt="Map" className="w-5 h-5" />,
            color: "bg-[#E9E5E6]",
            tooltip: "Location",
            href: "https://maps.app.goo.gl/UGTpFgRmeMELYazY7",
          },
        ].map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white shadow-lg transition-all`}
            aria-label={item.tooltip}
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* Main FAB */}
      {/* <button
        className="relative w-16 h-16 rounded-full backdrop-blur-md shadow-xl focus:outline-none"
        aria-expanded="true"
      >
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-20" />
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
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
              • Contact • Support • Contact • Support • Contact
            </textPath>
          </text>
        </svg>

        <div ref={arrowRef} className="absolute inset-0 flex items-center justify-center">
          <ChevronUp className="w-6 h-6 text-white" />
        </div>
      </button> */}
    </div>
  );
};

export default PremiumFloatingButton;
