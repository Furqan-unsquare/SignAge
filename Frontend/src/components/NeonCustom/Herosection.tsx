
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
    const [isConfigLoading, setIsConfigLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true); // replaces isConfigLoading



    // Fetch data from APIs
useEffect(() => {
  const fetchData = async () => {
    try {
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      console.log("API URL:", import.meta.env.VITE_API_URL);
      const [letterRes, colorRes, sizeRes, fontRes] = await Promise.all([
        fetch(`${BASE_URL}/api/letter-charges`),
        fetch(`${BASE_URL}/api/colors`),
        fetch(`${BASE_URL}/api/sizes`),
        fetch(`${BASE_URL}/api/font-files/files`)
      ]);

      if (!letterRes.ok || !colorRes.ok || !sizeRes.ok || !fontRes.ok)
        throw new Error('Failed to fetch data');

      const [letterData, colorData, sizeData, fontData] = await Promise.all([
        letterRes.json(),
        colorRes.json(),
        sizeRes.json(),
        fontRes.json()
      ]);

      setLetterCharge(letterData[0]?.charge || 0);
      setColors(colorData);
      setSizes(sizeData);

      const mappedFonts = fontData.map((font) => ({
        name: font.name,
        fontFamily: `${font.filename}`,
        rate: font.rate
      }));

      setFonts(mappedFonts);

      if (mappedFonts.length > 0) {
        setSelectedFont(mappedFonts[0].name);
      }
      if (colorData.length > 0) {
        setSelectedColor(colorData[0].value);
      }
    
        setIsConfigLoading(false);
         setIsLoading(false); // Show both after 2 seconds


    } catch (err) {
      console.error('Error fetching configuration data:', err);
    }
  };

  fetchData();
}, []);

const calculatePrice = () => {
  const textPrice = text.length * letterCharge;

  // Only include extra rates when text length is exactly 1
  const fontPrice = text.length > 0
    ? fonts.find((f) => f.name === selectedFont)?.rate || 0
    : 0;

  const colorPrice = text.length > 0
    ? colors.find((c) => c.value === selectedColor)?.rate || 0
    : 0;

  const sizePrice = text.length > 0
    ? sizes.find((s) => s.name === selectedSize)?.rate || 0
    : 0;

  return textPrice + fontPrice + colorPrice + sizePrice;
};



    useEffect(() => {
        setTotalPrice(calculatePrice())
    }, [text, selectedFont, selectedColor, selectedSize, letterCharge, fonts, colors, sizes, phoneNumber])

    return (
        <div className="bg-black text-white pt-20">
            {/* <Sidebar /> */}
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto px-4 pb-4 md:pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">

                        <div className="md:sticky top-24 self-start h-full md:min-h-[400px]">
                          {isLoading ? (
                            <div className=" h-full md:min-h-[350px]">
                              <img src="https://i.pinimg.com/736x/b4/af/50/b4af50b4f704232609d89952e5124187.jpg" alt="" className="h-full md:max-h-[550px] rounded-xl"/>
                            </div>
                          ) : (
                            <PreviewPane
                              text={text}
                              selectedFont={selectedFont}
                              selectedColor={selectedColor}
                              fonts={fonts}
                            />
                          )}
                        </div>

                        {isConfigLoading ? (
                          <div className="flex flex-col justify-center items-center min-h-[400px]">
                            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-white text-sm opacity-70">Loading configurator...</p>
                          </div>
                        ) : (
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
                        )}
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