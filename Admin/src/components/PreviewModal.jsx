"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { XCircle } from "lucide-react";

const PreviewModal = ({ show, onClose, order }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  // Font definitions (should ideally come from props or shared config)
  const fonts = [
    { name: "Boxy", fontFamily: "Arial, sans-serif", price: 10 },
    { name: "Play", fontFamily: '"Times New Roman", serif', price: 12 },
    { name: "Pacifico", fontFamily: "Helvetica, sans-serif", price: 15 },
  ];

const previewStyle = useMemo(() => {
  const selectedFontObj = fonts.find((f) => f.name === order?.font) || fonts[0];
  const color = order?.color || "#ffffff";

  const glowEffect = `
    0 0 4px #fff,
    0 0 10px ${color},
    0 0 20px ${color},
    0 0 40px ${color},
    0 0 60px ${color},
    0 0 80px ${color},
    0 0 100px ${color}
  `;

  return {
    fontFamily: selectedFontObj.fontFamily,
    color: "#ffffff", // make the inner text look bright white
    textShadow: glowEffect,
    WebkitTextStroke: `1px ${color}`,
    fontWeight: 400,
    fontSize: `${Math.max(2.2, 5 - (order?.inputText?.length || 0) * 0.15)}rem`,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "90%",
    maxWidth: "800px",
    lineHeight: 1.1,
    transition: "font-size 0.3s ease-in-out",
  };
}, [order?.font, order?.color, order?.inputText]);


  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  if (!show || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-gray-900 rounded-2xl p-4 md:p-8 flex items-center justify-center overflow-hidden w-full max-w-3xl min-h-[300px] md:min-h-[400px]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-1 top-2 right-2 text-white bg-red-500 rounded-full p-2 hover:bg-red-600">
          <XCircle className="w-6 h-6" />
        </button>

        {/* Background Image Pattern */}
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://i.pinimg.com/736x/d7/3f/cf/d73fcf6dabfb1886d4a8a224dce522e5.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        {/* Preview Text */}
        <div className="text-center relative z-10 w-full h-full flex items-center justify-center">
          <div
            className="font-bold txet-white break-words"
            style={{
              ...previewStyle,
              fontSize: `${Math.max(2.2, 5 - (order?.inputText?.length || 0) * 0.15)}rem`,
              transition: "font-size 0.3s ease-in-out",
            }}
          >
            {order?.inputText || "Preview"}
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-purple-500"></div>
        <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-purple-500"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-purple-500"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-purple-500"></div>
      </div>
    </div>
  );
};

export default PreviewModal;
