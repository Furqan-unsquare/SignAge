"use client"

import { ArrowRight, Palette, Zap, Star, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import AnimatedNeonSign from "./neon"
import GoodVibesNeon from "./goodvibe"

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const customTexts = ["YOUR BRAND NAME", "CUSTOM QUOTES", "BUSINESS LOGOS", "PERSONAL MESSAGES", "CREATIVE DESIGNS"]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % customTexts.length)
        setIsVisible(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pb-24 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#fdca07] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#fdca07] rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-32 left-1/4 w-8 h-8 text-[#fdca07] opacity-30 animate-bounce" />
        <Star className="absolute top-48 right-1/3 w-6 h-6 text-white opacity-40 animate-pulse" />
        <Zap className="absolute bottom-32 left-1/5 w-10 h-10 text-[#fdca07] opacity-25 animate-bounce delay-300" />
        <Palette className="absolute top-40 right-1/5 w-7 h-7 text-white opacity-35 animate-pulse delay-500" />
      </div>

      
      {/* Animated Falling Sign - Positioned on Left Side */}
      <div className="absolute hidden md:block top-96 left-8 md:left-16 lg:left-24 z-10">
        <AnimatedNeonSign text="NEON STUDIO" />
      </div>

      {/* Good Vibes Neon */}
      <div className="absolute top-40 right-10 md:right-20 rotate-12 z-10 hidden md:block">
        <GoodVibesNeon />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10 space-y-12 md:mt-6">
        {/* Main Heading */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm border-2 border-white/30 rounded-full px-6 py-3">
            <Palette className="w-5 h-5 text-[#fdca07]" />
            <span className="text-white font-bold uppercase tracking-wide">Design Studio</span>
            <div className="w-2 h-2 bg-[#fdca07] rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-3xl lg:text-7xl font-black text-white uppercase tracking-wider leading-tight">
            CUSTOMIZE 
            <span className="text-[#fdca07]"> YOUR <br /> OWN </span>
            SIGNAGE
          </h1>

          <p className="text-sm line-clamp-2 md:text-lg text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Bring your vision to life with our premium LED neon signs. From concept to creation, design the perfect
            signage that represents your unique style and brand.
          </p>
        </div>

        {/* Mobile Good Vibes (only visible on mobile) */}
        <div className="md:hidden rotate-4 mx-auto w-64">
          <GoodVibesNeon />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="/neonCustom">
          <button className="group relative bg-[#fdca07] hover:bg-yellow-400 text-black font-bold text-xl md:text-2xl uppercase px-4 md:px-10 py-4 rounded-2xl  transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#fdca07]">
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6" />
              <span>START DESIGNING</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
          </a>

          <a href="/work" className="hidden md:block">
          <button className="group bg-transparent  text-white hover:text-white/80 font-black text-xl uppercase tracking-wider px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <span>VIEW GALLERY</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </a>
        </div>
        

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "10,000+", label: "Custom Signs Created" },
            { number: "500+", label: "Happy Businesses" },
            { number: "24hrs", label: "Design Turnaround" },
            { number: "100%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#fdca07] mb-2">{stat.number}</div>
              <div className="text-white/80 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 fill-black">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div> */}
    </section>
  )
}

export default HeroSection
