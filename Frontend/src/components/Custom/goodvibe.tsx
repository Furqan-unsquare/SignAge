"use client"

import { useEffect, useState, useRef } from "react"

interface GoodVibesNeonProps {
    className?: string
}

const GoodVibesNeon = ({ className = "" }: GoodVibesNeonProps) => {
    const [isGlowing, setIsGlowing] = useState(false)
    const [blinkState, setBlinkState] = useState(0)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Import GSAP dynamically
        const loadGSAP = async () => {
            const { gsap } = await import("gsap")

            if (textRef.current) {
                // Initial state
                gsap.set(textRef.current, { opacity: 0, scale: 0.8, y: 20 })

                // Animate in
                gsap.to(textRef.current, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "back.out(1.7)",
                    delay: 0.1,
                })
            }
        }

        loadGSAP()

        // Start the glow effect after a delay
        const glowTimer = setTimeout(() => {
            setIsGlowing(true)
        }, 2000)

        // Set up blinking interval
        const blinkInterval = setInterval(() => {
            setBlinkState((prev) => (prev + 1) % 5) // Cycle through 5 states for more variety
        }, 1500)

        return () => {
            clearTimeout(glowTimer)
            clearInterval(blinkInterval)
        }
    }, [])

    return (
        
        <div className={`relative ${className}`}>
            <div
                ref={textRef}
                className={`transition-all duration-1000 ${isGlowing ? "opacity-100" : "opacity-0"}`}
                style={{
                    fontFamily: "'Great Vibes', cursive",
                    transition: "all 1.5s ease-in-out",
                }}
            >
                {/* Outer Glow Layer */}
                <div
                    className="absolute inset-0 blur-lg"
                    style={{
                        color: "#ff1493",
                        opacity: blinkState === 4 ? 0.2 : 0.6,
                        transition: "opacity 0.4s ease-in-out",
                        transform: "scale(1.1)",
                    }}
                >
                    Good Vibes
                </div>

                {/* Middle Glow Layer */}
                <div
                    className="absolute inset-0 blur-md"
                    style={{
                        fontFamily: "'Monoton', cursive", // or 'Neon Tubes', 'Pacifico'
                        letterSpacing: "0.05em",
                        color: "#ff69b4",
                        opacity: blinkState === 3 ? 0.4 : 0.8,
                        transition: "opacity 0.3s ease-in-out",
                        transform: "scale(1.05)",
                    }}
                >
                    Good Vibes
                </div>

                {/* Inner Glow Layer */}
                <div
                    className="absolute inset-0 blur-sm"
                    style={{
                        fontFamily: "'Monoton', cursive", // or 'Neon Tubes', 'Pacifico'
                        letterSpacing: "0.05em",
                        color: "#ffb6c1",
                        opacity: blinkState === 2 ? 0.6 : 1,
                        transition: "opacity 0.2s ease-in-out",
                    }}
                >
                    Good Vibes
                </div>

                {/* Main Text Layer */}
                <div
                    className={`relative text-5xl md:text-7xl lg:text-8xl font-normal ${blinkState === 1 ? "animate-quick-flicker" : ""
                        } ${blinkState === 0 ? "animate-subtle-pulse" : ""}`}
                    style={{
                        color: "#fff",
                        textShadow: `
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 15px #fff,
              0 0 20px #ff1493,
              0 0 35px #ff1493,
              0 0 40px #ff1493,
              0 0 50px #ff1493,
              0 0 75px #ff1493,
              0 2px 0 #ff69b4,
              0 4px 0 #ff1493,
              0 6px 10px rgba(0,0,0,0.3)
            `,
                        filter: blinkState === 1 ? "brightness(1.3)" : "brightness(1)",
                        transition: "filter 0.1s ease-in-out",
                    }}
                >
                    Good Vibes
                </div>

                {/* Sparkle Effects */}
                <div className="absolute -top-4 -right-4 w-3 h-3 bg-white rounded-full opacity-80 animate-ping" />
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#ff69b4] rounded-full opacity-60 animate-pulse" />
                <div className="absolute top-1/2 -right-6 w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-bounce" />
            </div>
        </div>
    )
}

export default GoodVibesNeon
