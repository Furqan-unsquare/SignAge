"use client";
import React, { useMemo, useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

interface PreviewPaneProps {
  text: string;
  selectedFont: string;
  selectedColor: string;
  fonts: Array<{
    name: string;
    fontFamily: string;
    price: number;
  }>;
}

export const PreviewPane = ({
  text,
  selectedFont,
  selectedColor,
  fonts,
}: PreviewPaneProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  // Get font object
  const selectedFontObj = useMemo(
    () => fonts.find((f) => f.name === selectedFont),
    [fonts, selectedFont]
  );

  const activeColor = selectedColor || "#ffff00";
const length = text.length;

  // Convert hex to RGB
  const hexToRgb = (hex: string): string => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };

  // Calculate font size for SVG (adjust this logic as needed)
const getFontSize = (text: string) => {
  const base = 90;
  if (!text) return base;
  const lines = text.split("\n");
  const maxLineLength = Math.max(...lines.map((line) => line.length));
  return Math.max(40, base - maxLineLength * 2.5);
};


  const handleDownload = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "preview.png";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden w-full min-h-[280px] h-full">
      {/* Screenshot area */}
      <div
        ref={previewRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
        {/* Background */}
        <div className="absolute inset-0 opacity-80">
          <img
            src="/preview.jpg"
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>

        {/* Text Layer */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 300"
          className="absolute top-0 left-0 z-10">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={getFontSize(text)}
            fontFamily={selectedFontObj?.fontFamily || "sans-serif"}
            fill="#ffffff"
            stroke={activeColor}
            strokeWidth="0"
            style={{
              filter: `drop-shadow(0 0 0px ${activeColor})
                       drop-shadow(0 0 5px ${activeColor})
                       drop-shadow(0 0 10px ${activeColor})`,
              whiteSpace: "pre-line",
            }}
          >
          {(text || "Preview")
            .split("\n")
            .map((line, idx) => (
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

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="absolute z-20 top-4 right-4 bg-[#FDCA07] text-gray-600 font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition-all"
      >
        <Download className="w-5 h-5" />
        Download
      </button>
    </div>
  );
};
