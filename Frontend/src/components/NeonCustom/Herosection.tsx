
"use client"
import { useState, useEffect } from "react"
import { PreviewPane } from "./Preview"
import { ConfigurationPanel } from "./configPanel"
import { HowToInstall } from "./HowToInstall"
import { WhatsInTheBox } from "./WhatsInTheBox"
import { Testimonials } from "./Testimonials"
import { FAQs } from "./FAQs"
// import { Sidebar } from "./Sidebar"

export interface FontOption {
    name: string
    fontFamily: string
    rate: number
}

export interface ColorOption {
    name: string
    value: string
    rate: number
}

export interface SizeOption {
    name: string
    width: string
    height: string
    rate: number
}

export const NeonConfigurator = () => {
    
    const [phoneNumber, setPhoneNumber] = useState("")
    const [text, setText] = useState("")
    const [selectedFont, setSelectedFont] = useState("Pacifico")
    const [selectedColor, setSelectedColor] = useState("#ffffff00")
    const [selectedSize, setSelectedSize] = useState("Regular")
    const [totalPrice, setTotalPrice] = useState(0)
    const [fonts, setFonts] = useState<FontOption[]>([])
    const [colors, setColors] = useState<ColorOption[]>([])
    const [sizes, setSizes] = useState<SizeOption[]>([])
    const [letterCharge, setLetterCharge] = useState(0)

    // Fetch data from APIs
useEffect(() => {
    const fetchData = async () => {
        try {
            const [letterRes, colorRes, sizeRes, fontRes] = await Promise.all([
                fetch('http://localhost:5000/api/letter-charges'),
                fetch('http://localhost:5000/api/colors'),
                fetch('http://localhost:5000/api/sizes'),
                fetch('http://localhost:5000/api/fonts')
            ])

            if (!letterRes.ok || !colorRes.ok || !sizeRes.ok || !fontRes.ok)
                throw new Error('Failed to fetch data')

            const [letterData, colorData, sizeData, fontData] = await Promise.all([
                letterRes.json(),
                colorRes.json(),
                sizeRes.json(),
                fontRes.json()
            ])

            setLetterCharge(letterData[0]?.charge || 0)
            setColors(colorData)
            setSizes(sizeData)

            // Load Google fonts
            fontData.forEach((font) => {
                const formatted = font.name.replace(/ /g, '+');
                const fontUrl = `https://fonts.googleapis.com/css2?family=${formatted}&display=swap`;
                if (!document.querySelector(`link[href="${fontUrl}"]`)) {
                    const link = document.createElement('link');
                    link.href = fontUrl;
                    link.rel = 'stylesheet';
                    document.head.appendChild(link);
                }
            })

            setFonts(
                fontData.map((font) => ({
                    name: font.name,
                    fontFamily: `'${font.name}', cursive`,
                    rate: font.rate
                }))
            )
        } catch (err) {
            console.error('Error fetching configuration data:', err)
        }
    }

    fetchData()
}, [])


    const calculatePrice = () => {
        const basePrice = 0
        const textPrice = text.length * letterCharge // e.g., 10 letters × 100 Rs = 1000 Rs
        const fontPrice = fonts.find((f) => f.name === selectedFont)?.rate || 0
        const colorPrice = colors.find((c) => c.name === selectedColor)?.rate || 0
        const sizePrice = sizes.find((s) => s.name === selectedSize)?.rate || 0

        return basePrice + textPrice + fontPrice + colorPrice + sizePrice 
    }

    useEffect(() => {
        setTotalPrice(calculatePrice())
    }, [text, selectedFont, selectedColor, selectedSize, letterCharge, fonts, colors, sizes, phoneNumber])

    return (
        <div className="bg-black text-white pt-20">
            {/* <Sidebar /> */}
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto px-4 pb-4 md:pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">

                        <PreviewPane
                            text={text}
                            selectedFont={selectedFont}
                            selectedColor={selectedColor}
                            fonts={fonts}
                        />

                        <ConfigurationPanel
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            text={text}
                            setText={setText}
                            selectedFont={selectedFont}
                            setSelectedFont={setSelectedFont}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                            totalPrice={totalPrice}
                            fonts={fonts}
                            colors={colors}
                            sizes={sizes}
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