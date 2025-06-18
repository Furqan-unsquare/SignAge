"use client"
import React, { useMemo } from "react"

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

export const PreviewPane = ({ text, selectedFont, selectedColor, fonts }: PreviewPaneProps) => {
  const previewStyle = useMemo(() => {
    const selectedFontObj = fonts.find((f) => f.name === selectedFont);

    // Create a more controlled glow effect
    const glowEffect = `
      0 0 4px #fff,
      0 0 6px ${selectedColor},
      0 0 10px ${selectedColor},
      0 0 15px rgba(${hexToRgb(selectedColor)}, 0.7)
    `;

    return {
      fontFamily: selectedFontObj?.fontFamily || "'Inter', sans-serif",
      color: "transparent",
      WebkitTextStroke: `1.5px ${selectedColor}`,
      textShadow: glowEffect,
      fontWeight: 900,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      width: "90%",
      maxWidth: "800px",
      lineHeight: 1.1,
    } as React.CSSProperties;
  }, [selectedFont, selectedColor, fonts]);

  // Helper function to convert hex to RGB
  function hexToRgb(hex: string): string {
    // Remove # if present
    hex = hex.replace('#', '');

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
  }
  return (
    <div className="relative bg-gray-900 rounded-2xl p-4 md:p-8 flex items-center justify-center overflow-hidden w-full min-h-[280px] h-full">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>

      {/* Grid pattern for visual texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${selectedColor} 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }}
      ></div>

      {/* Preview text container */}
      <div className="text-center relative z-10 w-full h-full flex items-center justify-center">
        <div
          className="text-5xl md:text-6xl lg:text-7xl font-bold transition-all duration-300 break-words"
          style={previewStyle}>
          {text || "Preview"}
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-purple-500"></div>
      <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-purple-500"></div>
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-purple-500"></div>
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-purple-500"></div>
    </div>
  )
}