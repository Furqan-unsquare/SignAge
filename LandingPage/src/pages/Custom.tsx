import HeroSection from "../components/Custom/hero"
import ProductsSection from "../components/Custom/products"
import AboutSection from "../components/Custom/about"
import { Helmet } from 'react-helmet';

export default function HomePage() {
    return (
        <>
         <Helmet>
        <title>Online Product Designer | Customize T-Shirts, Bags & More</title>
        <meta name="description" content="Welcome to YourBrand. Discover custom t-shirts, bags, caps, and more." />
        <link rel="canonical" href="https://yourdomain.com/" />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-r from-red-600 via-red-500 to-red-600">            
            <main>
                <HeroSection />
                <ProductsSection />
                <AboutSection />
            </main>           
        </div>
        
        </>
    )
}
