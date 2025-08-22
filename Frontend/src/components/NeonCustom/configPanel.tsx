"use client"
import React, { useEffect, useState } from "react"
import { Star, Info, Phone } from "lucide-react"
import { WhatsAppButton } from "./WhatsAppButton"

interface ConfigurationPanelProps {
  text: string;
  setText: (text: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  totalPrice: number;
  fonts: Array<{
    name: string;
    fontFamily: string;
    price: number;
  }>;
  colors: Array<{
    name: string;
    value: string;
    price: number;
  }>;
  sizes: Array<{
    name: string;
    width: string;
    height: string;
    price: number;
  }>;
}

export const ConfigurationPanel = ({
  text,
  setText,
  selectedFont,
  setSelectedFont,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  totalPrice,
  fonts, 
  colors,
  sizes
}: ConfigurationPanelProps) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const token = localStorage.getItem('token');
const [defaultsApplied, setDefaultsApplied] = useState(false);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };
  useEffect(() => {
  if (text.length === 1) {
    if (fonts.length > 0) setSelectedFont(fonts[0].name);
    if (colors.length > 0) setSelectedColor(colors[0].value);
    if (sizes.length > 0) setSelectedSize(sizes[0].name);
  }
}, [text, fonts, colors, sizes]);


  return (
    <div className="w-full bg-black text-white flex flex-col">
      {/* Header with Total Price */}
      <div className="flex justify-between items-start px-4 pt-4">
        <div>
          <h1 className="text-xl font-bold mb-2">Customise Neon Sign</h1>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs text-gray-400">363 reviews</span>
          </div>
        </div>
        <div className="bg-purple-600 text-right px-3 py-1 rounded-lg min-w-20">
          <div className="text-xs">Total</div>
          <div className="text-lg font-bold">₹{totalPrice}</div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-semibold mb-2">Type Your Text</label>
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            placeholder="Enter your text"
            required
          />
        </div>

        {/* Font Selection */}
        <div>
          <label className="block text-sm font-semibold mb-1">Pick Your Font</label>
          <div className="grid grid-cols-2 gap-2">
            {fonts.map((font) => (
              <button
                key={font.name}
                onClick={() => setSelectedFont(font.name)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  selectedFont === font.name
                    ? "border-purple-500 bg-purple-600"
                    : "border-gray-600 bg-gray-800 hover:border-gray-500"
                }`}
              >
                <div className="text-xs" style={{ fontFamily: font.name  }}>
                  {font.name}
                </div>
              </button>
            ))}
            
          </div>
        </div>

        {/* Color Selection */}
       <div>
        <label className="block text-sm font-semibold mb-1">Select Your Colour</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.value)}
              className={`
                w-8 h-8 rounded-full border transition-all 
                ${selectedColor === color.value
                  ? "border-white scale-110"
                  : "border-gray-400 hover:border-white"}
              `}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

        {/* Size Selection */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="text-sm font-semibold">Select Size</label>
            <Info className="w-3 h-3 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setSelectedSize(size.name)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  selectedSize === size.name
                    ? "border-purple-500 bg-purple-600"
                    : "border-gray-600 bg-gray-800 hover:border-gray-500"
                }`}>
                <div className="text-xs font-semibold">{size.name}</div>
                <div className="text-xs text-gray-300">Width: {size.width}</div>
                <div className="text-xs text-gray-300">Height: {size.height}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Number Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              value={mobileNumber}
              onChange={handleMobileChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-8 py-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter 10-digit mobile number"
              minLength={10}
              maxLength={12}
              required
            />
          </div>
        </div>
      </div>

      {/* Fixed WhatsApp Button at bottom */}
      <div className="px-4 pb-4">
        <WhatsAppButton 
          text={text}
          selectedFont={selectedFont}
          selectedColor={colors.find(c => c.value === selectedColor)?.name || selectedColor}
          selectedSize={selectedSize}
          phoneNumber={mobileNumber}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  )
}