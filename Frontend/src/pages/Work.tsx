import HeroSection from "../components/Product/HeroSection";
import Gallery from "../components/Product/Gallery";
import CTA from "../components/Product/CTA";
import { Helmet } from 'react-helmet';

const Work = () => {
  return (
    <>
     <Helmet>
        <title>Explore Custom Products | Neon Sign</title>
        <meta name="description" content="Welcome to YourBrand. Discover custom t-shirts, bags, caps, and more." />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>
      
       <div className="min-h-screen bg-[#E63025] overflow-x-hidden">
      <HeroSection />
      <Gallery />
      <CTA />
    </div>
      </>
   
  );
};

export default Work;
