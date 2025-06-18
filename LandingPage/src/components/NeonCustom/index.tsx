// components/NeonConfigurator/index.tsx
"use client"
import { useState, useEffect } from "react"
import { PreviewPane } from "./Preview"
import { ConfigurationPanel } from "./configPanel"
import { HowToInstall } from "./install"
import { WhatsInTheBox } from "./WhatsInTheBox"
import { Testimonials } from "./testimonials"
import { FAQs } from "./FAQs"

export interface FontOption {
    name: string
    fontFamily: string
    price: number
}

export interface ColorOption {
    name: string
    value: string
    price: number
}

export interface SizeOption {
    name: string
    width: string
    height: string
    price: number
}

export interface AddOn {
    name: string
    description: string
    price: number
}

export const NeonConfigurator = () => {
    const [text, setText] = useState("ag")
    const [selectedFont, setSelectedFont] = useState("Pacifico")
    const [selectedColor, setSelectedColor] = useState("#ffffff")
    const [selectedSize, setSelectedSize] = useState("Regular")
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
    const [totalPrice, setTotalPrice] = useState(4200)

    const fonts: FontOption[] = [
        { name: "Pacifico", fontFamily: "'Pacifico', cursive", price: 0 },
        { name: "Boxy", fontFamily: "'Arial Black', sans-serif", price: 200 },
        { name: "Play", fontFamily: "'Play', sans-serif", price: 150 },
        { name: "General", fontFamily: "Arial, sans-serif", price: 0 },
        { name: "Classic", fontFamily: "'Times New Roman', serif", price: 100 },
        { name: "Go", fontFamily: "'Roboto', sans-serif", price: 150 },
        { name: "Funky", fontFamily: "'Dancing Script', cursive", price: 300 },
        { name: "Alo", fontFamily: "'Alata', sans-serif", price: 250 },
        { name: "Delight", fontFamily: "'Delius', cursive", price: 200 },
        { name: "Crazy", fontFamily: "'Creepster', cursive", price: 400 },
        { name: "Denim", fontFamily: "'Denk One', cursive", price: 180 },
        { name: "ROBO", fontFamily: "'Orbitron', sans-serif", price: 350 },
        { name: "Gomes", fontFamily: "'Gochi Hand', cursive", price: 220 },
        { name: "Curly", fontFamily: "'Kaushan Script', cursive", price: 280 },
        { name: "Stylus", fontFamily: "'Stylish', sans-serif", price: 320 },
    ]

    const colors: ColorOption[] = [
        { name: "White", value: "#ffffff", price: 0 },
        { name: "Pink", value: "#ff1493", price: 100 },
        { name: "Blue", value: "#00bfff", price: 100 },
        { name: "Purple", value: "#8a2be2", price: 150 },
        { name: "Orange", value: "#ff4500", price: 100 },
        { name: "Red", value: "#ff0000", price: 100 },
        { name: "Cyan", value: "#00ffff", price: 120 },
        { name: "Green", value: "#00ff00", price: 100 },
        { name: "Yellow", value: "#ffff00", price: 80 },
    ]

    const sizes: SizeOption[] = [
        { name: "Regular", width: '6"', height: '10"', price: 0 },
        { name: "Medium", width: '8"', height: '13"', price: 800 },
        { name: "Large", width: '10"', height: '16"', price: 1500 },
    ]

    const addOns: AddOn[] = [
        { name: "Waterproof IP67 Rated", description: "Weather resistant for outdoor use", price: 3000 },
        { name: "Smart Wireless Controller", description: "Control via smartphone app", price: 2000 },
    ]

    const calculatePrice = () => {
        const basePrice = 2000
        const textPrice = text.length * 100
        const fontPrice = fonts.find((f) => f.name === selectedFont)?.price || 0
        const colorPrice = colors.find((c) => c.value === selectedColor)?.price || 0
        const sizePrice = sizes.find((s) => s.name === selectedSize)?.price || 0
        const addOnsPrice = selectedAddOns.reduce((total, addOnName) => {
            const addOn = addOns.find((a) => a.name === addOnName)
            return total + (addOn?.price || 0)
        }, 0)

        return basePrice + textPrice + fontPrice + colorPrice + sizePrice + addOnsPrice
    }

    useEffect(() => {
        setTotalPrice(calculatePrice())
    }, [text, selectedFont, selectedColor, selectedSize, selectedAddOns])

    const handleAddOnToggle = (addOnName: string) => {
        setSelectedAddOns((prev) =>
            prev.includes(addOnName) ? prev.filter((name) => name !== addOnName) : [...prev, addOnName],
        )
    }

    return (
        <div className="bg-black text-white pt-20">
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-screen lg:h-[calc(100vh-4rem)]">
                        <PreviewPane
                            text={text}
                            selectedFont={selectedFont}
                            selectedColor={selectedColor}
                            fonts={fonts}
                        />

                        <ConfigurationPanel
                            text={text}
                            setText={setText}
                            selectedFont={selectedFont}
                            setSelectedFont={setSelectedFont}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                            selectedAddOns={selectedAddOns}
                            handleAddOnToggle={handleAddOnToggle}
                            totalPrice={totalPrice}
                            fonts={fonts}
                            colors={colors}
                            sizes={sizes}
                            addOns={addOns}
                        />
                    </div>
                </div>
            </div>

            {/* Additional Sections */}
            <HowToInstall />
            <WhatsInTheBox />
            <Testimonials />
            <FAQs />
        </div>
    )
}