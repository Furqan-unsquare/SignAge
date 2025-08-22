"use client"

import { useState } from "react"
import { Palette, Type, Building, Heart, Zap, Star } from 'lucide-react'

interface CustomOption {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  popular?: boolean
}

const customOptions: CustomOption[] = [
  {
  id: 1,
  title: "Neon Custom Design",
  description: "Design your own neon sign with personalized text, font styles, vibrant colors, and custom sizes – perfect for homes, events, or business branding.",
  icon: <Type className="w-6 h-6" />,
  features: [
    "Personalized Text & Symbols",
    "50+ Font Styles",
    "20+ Neon Colors",
    "Custom Size Options",
    "Preview Before Purchase"
  ],
}
]

const ProductsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="bg-black py-24 px-4" id="customize">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gray-800 rounded-full px-6 py-3 mb-6">
            <Palette className="w-5 h-5 text-[#fdca07]" />
            <span className="text-white font-bold uppercase tracking-wide">Customization Options</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider mb-6">
            What Would You Like To
            <br />
            <span className="text-[#fdca07]">Create Today?</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed line-clamp-2">
            Choose from our popular customization categories or tell us about your unique vision. 
            Our design team will bring any concept to life with premium LED neon technology.
          </p>
        </div>

        {/* Customization Options Grid */}
        <div className="grid grid-cols-1  gap-8 mb-16">
          {customOptions.map((option) => (
        <div
  key={option.id}
  className="group cursor-pointer flex flex-col lg:flex-row bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300"
  onMouseEnter={() => setHoveredCard(option.id)}
  onMouseLeave={() => setHoveredCard(null)}
>
  {/* Left Content */}
  <div className="flex flex-1 flex-col justify-between p-6 lg:p-8 space-y-4">
    {/* Icon */}
    <div className="w-12 h-12 bg-[#fdca07] rounded-xl flex items-center justify-center text-black">
      {option.icon}
    </div>

    {/* Title + Description */}
    <div>
      <h3 className="text-2xl font-black text-white uppercase tracking-wide mb-2">
        {option.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {option.description}
      </p>
    </div>

    {/* Features */}
    <div className="space-y-2">
      {option.features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
          <div className="w-1.5 h-1.5 bg-[#fdca07] rounded-full"></div>
          <span>{feature}</span>
        </div>
      ))}
    </div>

        {/* CTA Button */}
        <a href="/neonCustom">
          <button className="w-full mt-4 bg-gradient-to-r from-[#EA3C1F] to-[#EB3C20] hover:from-[#EA3C1F] hover:to-red-400 text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-lg transition-all duration-300 transform">
            Customize Now
          </button>
        </a>
      </div>

      {/* Right Image */}
      <div className="relative lg:w-1/2 h-64 lg:h-auto">
        <img
          src="https://i.pinimg.com/736x/2d/cd/1e/2dcd1eeb4f31bab402110771445d9d7a.jpg"
          alt={option.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>
    </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-4">
              How It <span className="text-[#fdca07]">Works</span>
            </h3>
            <p className="text-gray-400 text-lg">Simple 4-step process to get your custom neon sign</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Share Your Idea", desc: "Tell us your concept, upload images, or describe your vision" },
              { step: "02", title: "Free Design Tool", desc: "Our designers create a mockup within 24 hours at no cost" },
              { step: "03", title: "Approve & Order", desc: "Review, request, and place your order when satisfied" },
              { step: "04", title: "Receive & Install", desc: "Get your custom sign delivered with installation guide" }
            ].map((process, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#fdca07] rounded-full flex items-center justify-center text-black font-black text-xl mx-auto">
                  {process.step}
                </div>
                <h4 className="text-white text-sm md:text-lg uppercase tracking-wide">{process.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
