
"use client"
import React, { useState } from "react"
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
  selectedAddOns: string[];
  handleAddOnToggle: (addOnName: string) => void;
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
  selectedAddOns,
  handleAddOnToggle,
  totalPrice,
  fonts,
  colors,
  sizes
}: ConfigurationPanelProps) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const token = localStorage.getItem('token');

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  return (
    <div className="overflow-y-auto max-h-full pr-2 space-y-5 scrollbar-hidden ">
      {/* Header with Total Price */}
      <div className="flex justify-between sticky top-0 bg-black z-40 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Customise Neon Sign</h1>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-400">363 reviews</span>
          </div>
        </div>
        <div className="bg-purple-600 text-right px-4 py-2 rounded-lg min-w-24">
          <div className="text-sm ">Total</div>
          <div className="text-xl font-bold">₹{totalPrice}</div>
        </div>
      </div>

      {/* Text Input */}
      <div>
        <label className="block text-lg font-semibold mb-3">Type Your Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          placeholder="Enter your text"
          required
          // maxLength={20}
        />
      </div>

      {/* Font Selection */}
      <div>
        <label className="block text-lg font-semibold mb-3">Pick Your Font</label>
        <div className="grid grid-cols-3 gap-2">
          {fonts.map((font) => (
            <button
              key={font.name}
              onClick={() => setSelectedFont(font.name)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedFont === font.name
                  ? "border-purple-500 bg-purple-600"
                  : "border-gray-600 bg-gray-800 hover:border-gray-500"
              }`}
            >
              <div className="text-sm" style={{ fontFamily: font.fontFamily }}>
                {font.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-lg font-semibold mb-3">Select Your Colour</label>
        <div className="flex flex-wrap gap-3 pl-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.value)}
              className={`w-10 h-10 rounded-full border-4 transition-all ${
                selectedColor === color.value 
                  ? "border-white scale-110" 
                  : "border-gray-600 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <label className="text-lg font-semibold">Select Size</label>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size.name}
              onClick={() => setSelectedSize(size.name)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedSize === size.name
                  ? "border-purple-500 bg-purple-600"
                  : "border-gray-600 bg-gray-800 hover:border-gray-500"
              }`}>
              <div className="font-semibold">{size.name}</div>
              <div className="text-sm text-gray-300">Width: {size.width}</div>
              <div className="text-sm text-gray-300">Height: {size.height}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Number Input */}
      <div>
        <label className="block text-lg font-semibold mb-3">Mobile Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={mobileNumber}
            onChange={handleMobileChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-10 py-3 text-white focus:outline-none focus:border-purple-500"
            placeholder="Enter 10-digit mobile number"
            minLength={10}
            maxLength={12}
            required
          />
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton 
        text={text}
        selectedFont={selectedFont}
        selectedColor={colors.find(c => c.value === selectedColor)?.name || selectedColor}
        selectedSize={selectedSize}
        phoneNumber={mobileNumber}
        totalPrice={totalPrice}
      />
    </div>
  )
}