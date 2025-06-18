import HeroSection from "../components/Custom/hero"
import ProductsSection from "../components/Custom/products"
import AboutSection from "../components/Custom/about"

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
