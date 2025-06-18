// components/NeonConfigurator/PreviewPane.tsx
"use client"
import React from "react"

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
  const getPreviewStyle = (): React.CSSProperties => {
    const selectedFontObj = fonts.find((f) => f.name === selectedFont)
    
    return {
      fontFamily: selectedFontObj?.fontFamily || "Arial, sans-serif",
      color: "transparent",
      WebkitTextStroke: `2px ${selectedColor}`,
      textShadow: `
        0 0 5px ${selectedColor},
        0 0 10px ${selectedColor},
        0 0 20px ${selectedColor},
        0 0 30px ${selectedColor},
        0 0 40px ${selectedColor},
        0 0 50px ${selectedColor}
      `,
      fontWeight: 900,
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translateX(-50%)",
      textAlign: "center",
      width: "100%",
    }
  }

  return (
    <div className="relative bg-gray-900 rounded-2xl p-8 flex items-start justify-center overflow-hidden w-full min-h-[300px] h-full">
      <div 
        className="absolute inset-0 bg-[url('/assets/image.jpeg')] bg-cover bg-center opacity-70"
        style={{ backgroundPosition: "center 70%" }}></div>

      <div className="text-center relative z-10 w-full h-full">
        <div
          className="text-6xl md:text-7xl font-bold transition-all duration-300 break-words"
          style={getPreviewStyle()}>
          {text || "Preview"}
        </div>
      </div>
    </div>
  )
}