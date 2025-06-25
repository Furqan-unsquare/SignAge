
import AboutHeroSection from "../components/About/AboutHeroSection";
import ValuesSection from "../components/About/ValuesSection";
import AboutCTA from "../components/About/AboutCTA";
import AboutUsSection from "@/components/About/AboutUsSection ";
import { Helmet } from 'react-helmet';

const AboutUs = () => {
  return (
     <>
      <Helmet>
        <title>About Us | Crafting Personalized Apparel & Gifts</title>
        <meta name="description" content="Welcome to YourBrand. Discover custom t-shirts, bags, caps, and more." />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>

    <div className="min-h-screen bg-white overflow-x-hidden">
      <AboutHeroSection />
      <AboutUsSection />
      <ValuesSection />
      <AboutCTA />
    </div>
    </>
  );
};

export default AboutUs;