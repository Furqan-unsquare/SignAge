"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedNeonSignProps {
  text?: string
  className?: string
}

const AnimatedNeonSign = ({ text = "CUSTOM", className = "" }: AnimatedNeonSignProps) => {
  const signRef = useRef<HTMLDivElement>(null)
  const chainRef = useRef<HTMLDivElement>(null)
  const [isGlowing, setIsGlowing] = useState(false)

  useEffect(() => {
    // Import GSAP dynamically
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      if (signRef.current && chainRef.current) {
        // Set initial positions
        gsap.set(signRef.current, { y: -400, opacity: 0, rotation: -15 })
        gsap.set(chainRef.current, { height: 0, opacity: 0 })

        // Create timeline
        const tl = gsap.timeline()

        // Chain appears first
        tl.to(chainRef.current, {
          height: 400,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        })

        // Sign falls down with realistic bounce
        tl.to(
          signRef.current,
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 2,
            ease: "bounce.out",
          },
          "-=0.3"
        )

        // Subtle swinging motion
        tl.to(signRef.current, {
          rotation: 3,
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        })

        // Start glowing after 3 seconds
        setTimeout(() => {
          setIsGlowing(true)
        }, 3000)
      }
    }

    loadGSAP()
  }, [])

  return (
    <div className={`relative ${className}`} style={{ perspective: "1000px" }}>
      {/* Chain */}
      <div
        ref={chainRef}
        className="absolute left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full"
        style={{
          top: "-400px",
          transformOrigin: "top center",
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3)",
        }}
      />

      {/* Chain Links */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-[370px] space-y-2">
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-6 border-2 border-gray-400 rounded-full bg-gray-300"
            style={{
              boxShadow: "inset 0 0 3px rgba(0,0,0,0.3)",
            }}
          />
        ))}
      </div>

      {/* Sign Board */}
      <div
        ref={signRef}
        className="relative bg-black border-4 rounded-xl px-6 py-4 shadow-2xl"
        style={{
          borderColor: isGlowing ? "#fdca07" : "#444",
          boxShadow: isGlowing
            ? "0 0 15px rgba(253,202,7,0.8), 0 0 30px rgba(253,202,7,0.6), 0 0 45px rgba(253,202,7,0.4), 0 10px 20px rgba(0,0,0,0.5)"
            : "0 10px 20px rgba(0,0,0,0.5)",
          transition: "all 2s ease-in-out",
          transformOrigin: "top center",
        }}
      >
        <div
          className={`text-2xl md:text-3xl font-black uppercase tracking-widest transition-all duration-2000 ${
            isGlowing ? "text-[#fdca07]" : "text-gray-500"
          }`}
          style={{
            textShadow: isGlowing
              ? "0 0 5px rgba(253,202,7,1), 0 0 10px rgba(253,202,7,0.8), 0 0 15px rgba(253,202,7,0.6), 0 0 20px rgba(253,202,7,0.4)"
              : "none",
            transition: "all 2s ease-in-out",
          }}
        >
          {text}
        </div>

        {/* Corner screws */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-gray-600 rounded-full shadow-inner" />
        <div className="absolute top-2 right-2 w-2 h-2 bg-gray-600 rounded-full shadow-inner" />
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-600 rounded-full shadow-inner" />
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-600 rounded-full shadow-inner" />
      </div>
    </div>
  )
}

export default AnimatedNeonSign
