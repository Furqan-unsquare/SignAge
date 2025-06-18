import HeroSection from "../components/custom/hero"
import ProductsSection from "../components/custom/products"
import AboutSection from "../components/custom/about"

export default function HomePage() {
    return (
        <div className="min-h-screen">
            
            <main>
                <HeroSection />
                <ProductsSection />
                <AboutSection />
            </main>
           
        </div>
    )
}
