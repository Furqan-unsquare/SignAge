
import AboutHeroSection from "../components/About/AboutHeroSection";
import AboutCTA from "../components/About/AboutCTA";
import { Helmet } from 'react-helmet';

const AboutUs = () => {
  return (
     <>
      <Helmet>
        <title>About Us | Crafting Personalized Apparel & Gifts</title>
        <meta name="description" content="Welcome to YourBrand. Discover custom t-shirts, bags, caps, and more." />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>

    <div className="min-h-screen bg-gradient-to-r from-red-600 via-red-500 to-red-600 overflow-x-hidden">
      <AboutHeroSection />
      <AboutCTA />
    </div>
    </>
  );
};

export default AboutUs;