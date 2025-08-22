"use client";
import React, { useMemo, useRef, useEffect } from "react";
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

  const activeColor = selectedColor || "white";

  // Convert hex to RGB
  const hexToRgb = (hex: string): string => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };

  // Calculate font size for SVG
  const getFontSize = (text: string) => {
    const base = 90;
    if (!text) return base;
    const lines = text.split("\n");
    const maxLineLength = Math.max(...lines.map((line) => line.length));
    return Math.max(40, base - maxLineLength * 2.5);
  };

  // Enhanced glow effect for better screenshot capture
  const getTextShadow = () => {
    const rgb = hexToRgb(activeColor);
    return `0 0 10px rgba(${rgb}, 0.8), 
            0 0 20px rgba(${rgb}, 0.8),
            0 0 30px rgba(${rgb}, 0.6),
            0 0 40px rgba(${rgb}, 0.4)`;
  };

  // Load fonts dynamically
  useEffect(() => {
    fonts.forEach((font) => {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const fontUrl = `${API_BASE_URL}/fonts/${font.fontFamily}`;

      const fontName = font.name;

      if (document.getElementById(`font-${fontName}`)) return;

      const style = document.createElement("style");
      style.id = `font-${fontName}`;
      const fontFormat = font.fontFamily.endsWith(".otf") ? "opentype" : "truetype";
      style.innerHTML = `
        @font-face {
          font-family: "${fontName}";
          src: url("${fontUrl}") format("${fontFormat}");
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    });
  }, [fonts]);

  const handleDownload = async () => {
    if (!previewRef.current || !selectedFontObj?.name) return;

    try {
      // Create a clone for screenshot with enhanced styles
      const clone = previewRef.current.cloneNode(true) as HTMLDivElement;
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.width = previewRef.current.offsetWidth + 'px';
      clone.style.height = previewRef.current.offsetHeight + 'px';
      document.body.appendChild(clone);

      // Enhance text visibility in the clone
      const textElement = clone.querySelector('.text-container') as HTMLDivElement;
      if (textElement) {
        // Apply enhanced glow effect
        textElement.style.textShadow = getTextShadow();
        // Ensure text is on top
        textElement.style.zIndex = '50';
      }

      // Make background darker for better text contrast
      const bgImage = clone.querySelector('img') as HTMLImageElement;
      if (bgImage) {
        bgImage.style.opacity = '0.3';
      }

      await document.fonts.ready;
      await document.fonts.load(`16px "${selectedFontObj.name}"`);

      const canvas = await html2canvas(clone, {
        useCORS: true,
        scale: 4,
        backgroundColor: "#111",
      });

      document.body.removeChild(clone);

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "preview.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden mt-2 md:mt-0 w-full h-[280px] md:h-[550px]">
      {/* Screenshot area */}
      <div
        ref={previewRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl"
      >
        <img
          src="/preview.jpg"
          className="absolute inset-0 w-full h-full object-cover z-10"
          style={{ opacity: 0.6 }}
          alt="Background"
        />

        <div
          className="text-container z-20 px-2"
          style={{
            fontFamily: selectedFontObj?.name,
            color: "#fff",
            textShadow: `0 0 5px ${activeColor}, 0 0 10px ${activeColor}, 0 0 15px ${activeColor}`,
            fontSize: `${getFontSize(text)}px`,
            textAlign: "center",
            whiteSpace: "pre-line",
            position: "relative",
          }}
        >
          {(text || "Preview")
            .split("\n")
            .map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="absolute z-30 top-4 right-4 bg-gray-300 text-gray-900 font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-500 transition-all"
      >
        <Download className="w-5 h-5" />
        <span className="hidden md:block">Download</span>
      </button>
    </div>
  );
};