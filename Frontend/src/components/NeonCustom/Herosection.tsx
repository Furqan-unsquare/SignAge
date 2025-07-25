"use client"
import { useState, useEffect } from "react";
import { PreviewPane } from "./Preview";
import { ConfigurationPanel } from "./configPanel";
import { HowToInstall } from "./HowToInstall";
import { WhatsInTheBox } from "./WhatsInTheBox";
import { Testimonials } from "./Testimonials";
import { FAQs } from "./FAQs";
import { useToast } from "@/hooks/use-toast";

export interface FontOption {
  name: string;
  fontFamily: string;
  rate: number;
}

export interface ColorOption {
  name: string;
  value: string;
  rate: number;
}

export interface SizeOption {
  name: string;
  width: string;
  height: string;
  rate: number;
}

export const NeonConfigurator = () => {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [selectedFont, setSelectedFont] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [fonts, setFonts] = useState<FontOption[]>([]);
  const [colors, setColors] = useState<ColorOption[]>([]);
  const [sizes, setSizes] = useState<SizeOption[]>([]);
  const [letterCharge, setLetterCharge] = useState({ initialCharge: 1000, subsequentCharge: 500 });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from APIs (removed dependencies to prevent re-fetching)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const [letterRes, colorRes, sizeRes, fontRes] = await Promise.all([
          fetch(`${BASE_URL}/api/letter-charges`),
          fetch(`${BASE_URL}/api/colors`),
          fetch(`${BASE_URL}/api/sizes`),
          fetch(`${BASE_URL}/api/font-files/files`),
        ]);

        if (!letterRes.ok || !colorRes.ok || !sizeRes.ok || !fontRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [letterData, colorData, sizeData, fontData] = await Promise.all([
          letterRes.json(),
          colorRes.json(),
          sizeRes.json(),
          fontRes.json(),
        ]);

        if (!Array.isArray(letterData) || letterData.length === 0) {
          toast({
            title: "No Letter Charges",
            description: "Using default charges (₹1000/₹500).",
            variant: "destructive",
          });
          setLetterCharge({ initialCharge: 1000, subsequentCharge: 500 });
        } else {
          setLetterCharge({
            initialCharge: letterData[0].initialCharge,
            subsequentCharge: letterData[0].subsequentCharge,
          });
        }

        setColors(colorData.map((c: any) => ({ name: c.name, value: c.value, rate: c.rate })));
        setSizes(sizeData.map((s: any) => ({ name: s.name, width: s.width, height: s.height, rate: s.rate })));

        const mappedFonts = fontData.map((font: any) => ({
          name: font.name,
          fontFamily: `${font.filename}`,
          rate: font.rate,
        }));
        setFonts(mappedFonts);

        // NO DEFAULT SELECTIONS - let price stay at 0

      } catch (err) {
        console.error("Error fetching configuration data:", err);
        toast({
          title: "Error",
          description: "Failed to load configuration data. Using defaults.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Only run once on mount

  const calculatePrice = () => {
    // Only calculate text price if there's text
    const textPrice =
      text.length > 0
        ? letterCharge.initialCharge + letterCharge.subsequentCharge * (text.length - 1)
        : 0;

    // Only add rates if selections are made
    const fontPrice = selectedFont ? (fonts.find((f) => f.name === selectedFont)?.rate || 0) : 0;
    const colorPrice = selectedColor ? (colors.find((c) => c.value === selectedColor)?.rate || 0) : 0;
    const sizePrice = selectedSize ? (sizes.find((s) => s.name === selectedSize)?.rate || 0) : 0;

    return textPrice + fontPrice + colorPrice + sizePrice;
  };

  // Only recalculate price when relevant values change
  useEffect(() => {
    if (!isLoading) {
      const newPrice = calculatePrice();
      setTotalPrice(newPrice);
      
      console.log('Price calculation:', {
        text: text.length,
        textPrice: text.length > 0 ? letterCharge.initialCharge + letterCharge.subsequentCharge * (text.length - 1) : 0,
        fontPrice: selectedFont ? (fonts.find((f) => f.name === selectedFont)?.rate || 0) : 0,
        colorPrice: selectedColor ? (colors.find((c) => c.value === selectedColor)?.rate || 0) : 0,
        sizePrice: selectedSize ? (sizes.find((s) => s.name === selectedSize)?.rate || 0) : 0,
        total: newPrice
      });
    }
  }, [text, selectedFont, selectedColor, selectedSize, letterCharge, fonts, colors, sizes, isLoading]);

  return (
    <div className="bg-black text-white">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 pb-4 md:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
            <div className="md:sticky top-24 self-start h-full md:min-h-[400px]">
              {isLoading ? (
                <div className="h-full md:min-h-[350px]">
                  <img
                    src="https://i.pinimg.com/736x/b4/af/50/b4af50b4f704232609d89952e5124187.jpg"
                    alt="Loading"
                    className="h-full md:max-h-[550px] rounded-xl object-cover w-full"
                  />
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

            {isLoading ? (
              <div className="flex flex-col justify-center items-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-white text-sm opacity-70">Loading configurator...</p>
              </div>
            ) : (
              <ConfigurationPanel
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
  );
};

export default NeonConfigurator;
