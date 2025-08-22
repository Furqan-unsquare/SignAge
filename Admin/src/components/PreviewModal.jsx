"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { XCircle } from "lucide-react";

const PreviewModal = ({ show, onClose, order }) => {
  const modalRef = useRef(null);
  const [fonts, setFonts] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch fonts when modal opens
useEffect(() => {
  const fetchFonts = async () => {
    setIsLoading(true); // Start loading

    try {
      const res = await fetch(`${API_BASE_URL}/api/font-files/files`);
      const fontData = await res.json();

      setFonts(
        fontData.map((font) => ({
          name: font.name,
          fontFamily: font.filename,
          rate: font.rate,
        }))
      );

      fontData.forEach((font) => {
        const fontId = `font-${font.name}`;
        if (document.getElementById(fontId)) return;

        const style = document.createElement("style");
        style.id = fontId;

        const format = font.filename.endsWith(".otf") ? "opentype" : "truetype";
        const url = `${API_BASE_URL}/fonts/${font.filename}`;

        style.innerHTML = `
          @font-face {
            font-family: "${font.name}";
            src: url("${url}") format("${format}");
            font-display: swap;
          }
        `;
        document.head.appendChild(style);
      });
    } catch (err) {
      console.error("Error loading fonts:", err);
    } finally {
      setIsLoading(false); // Finish loading
    }
  };

  if (show) fetchFonts();
}, [show]);


  const selectedFontObj = useMemo(() => {
    return fonts.find((f) => f.name === order?.font) || fonts[0];
  }, [fonts, order?.font]);

  const color = order?.color || "white";
  const text = order?.inputText || "Preview";

  const getFontSize = (text) => {
    const lines = text.split("\n");
    const maxLineLength = Math.max(...lines.map((line) => line.length));
    const base = 120;
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

        {/* SVG Text */}
        {isLoading ? (
  <div className="flex justify-center items-center w-full h-full z-20">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
  </div>
) : (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 300"
          className="absolute bottom-4 left-0 z-10"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={fontSize}
            fontFamily={selectedFontObj?.name || "sans-serif"}
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
        )}
      </div>
    </div>
  );
};

export default PreviewModal;
