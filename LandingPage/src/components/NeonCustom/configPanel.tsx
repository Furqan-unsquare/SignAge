// components/NeonConfigurator/ConfigurationPanel.tsx
"use client"
import React from "react"
import { Star, Info, Copy } from "lucide-react"
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
  addOns: Array<{
    name: string;
    description: string;
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
  sizes,
  addOns
}: ConfigurationPanelProps) => {
  return (
    <div className="overflow-y-auto max-h-full pr-2 space-y-6 scrollbar-hidden ">
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
        <div className="bg-purple-600 px-4 py-2 rounded-lg">
          <div className="text-sm">Total</div>
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
          maxLength={20}
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
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedSize === size.name
                  ? "border-purple-500 bg-purple-600"
                  : "border-gray-600 bg-gray-800 hover:border-gray-500"
              }`}
            >
              <div className="font-semibold">{size.name}</div>
              <div className="text-sm text-gray-300">Width: {size.width}</div>
              <div className="text-sm text-gray-300">Height: {size.height}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Add Ons */}
      <div>
        <label className="block text-lg font-semibold mb-3">Add Ons</label>
        <div className="space-y-3">
          {addOns.map((addOn) => (
            <div
              key={addOn.name}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(addOn.name)}
                  onChange={() => handleAddOnToggle(addOn.name)}
                  className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <div>
                  <div className="font-medium">{addOn.name}</div>
                  <div className="text-sm text-gray-400">{addOn.description}</div>
                </div>
              </div>
              <div className="text-purple-400">+₹{addOn.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton 
        text={text}
        selectedFont={selectedFont}
        selectedColor={colors.find(c => c.value === selectedColor)?.name || selectedColor}
        selectedSize={selectedSize}
        selectedAddOns={selectedAddOns}
        totalPrice={totalPrice}
      />

      {/* Available Offers */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Available Offers</h3>
          <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">2</span>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Get it for ₹ 2,940</div>
                <div className="text-sm text-gray-400">Buy 2 or More and get 30% discount at Checkout</div>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">REDEEM</button>
                <button className="border border-gray-500 text-gray-300 px-3 py-1 rounded text-sm">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-3">
            <div className="font-medium">Get Free Mystery Neon Sign Worth Upto 12K</div>
            <div className="text-sm text-gray-400">Free Neon Sign Worth Upto 12k on Orders Above 5K</div>
          </div>
        </div>
      </div>
    </div>
  )
}