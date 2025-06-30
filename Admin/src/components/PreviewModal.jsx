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

  const fonts = [
     { name: "Pacifico", fontFamily: "'Pacifico', cursive", rate: 0 },
     { name: "Boxy", fontFamily: "'Arial Black', sans-serif", rate: 200 },
     { name: "Play", fontFamily: "'Play', sans-serif", rate: 150 }
    
  ];

  const selectedFontObj = fonts.find((f) => f.name === order?.font) || fonts[0];
  const color = order?.color || "#ffff00";
  const text = order?.inputText || "Preview";

  const getFontSize = (text) => {
    const lines = text.split("\n");
    const maxLineLength = Math.max(...lines.map((line) => line.length));
    const base = 90;
    return Math.max(40, base - maxLineLength * 2.5);
  };

  const fontSize = getFontSize(text);

  if (!show || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5 md:px-0">
      <div
        ref={modalRef}
        className="relative bg-gray-900 rounded-2xl p-4 md:p-8 flex items-center justify-center overflow-hidden w-full max-w-3xl min-h-[300px] md:min-h-[400px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-12 top-2 right-2 text-white bg-red-500 rounded-full p-2 hover:bg-red-600">
          <XCircle className="w-6 h-6" />
        </button>

        {/* Background */}
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://i.pinimg.com/736x/d7/3f/cf/d73fcf6dabfb1886d4a8a224dce522e5.jpg"
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>

        {/* SVG Text with glow effect */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 300"
          className="absolute top-0 left-0 z-10"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={fontSize}
            fontFamily={selectedFontObj?.fontFamily || "sans-serif"}
            fill="#fff"
            style={{
              filter: `drop-shadow(0 0 0px ${color})
                       drop-shadow(0 0 5px ${color})
                       drop-shadow(0 0 10px ${color})`,
              whiteSpace: "pre-line",
            }}
          >
            {text.split("\n").map((line, idx) => (
              <tspan
                key={idx}
                x="50%"
                dy={idx === 0 ? 0 : "1.2em"}
                dominantBaseline="middle"
              >
                {line}
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default PreviewModal;
