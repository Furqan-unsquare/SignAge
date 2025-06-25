import HeroSection from "../components/Works/HeroSection";
import Gallery from "../components/Works/Gallery";
import CTA from "../components/Works/CTA";
import { Helmet } from 'react-helmet';

const Work = () => {
  return (
    <>
     <Helmet>
        <title>Explore Custom Products | T-Shirts, Trousers, Diaries, Pens</title>
        <meta name="description" content="Welcome to YourBrand. Discover custom t-shirts, bags, caps, and more." />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>
      
       <div className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <Gallery />
      <CTA />
    </div>
      </>
   
  );
};

export default Work;
