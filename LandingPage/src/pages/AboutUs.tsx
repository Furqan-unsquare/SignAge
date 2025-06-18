
import AboutHeroSection from "../components/About/AboutHeroSection";
import ValuesSection from "../components/About/ValuesSection";
import AboutCTA from "../components/About/AboutCTA";
import AboutUsSection from "@/components/About/AboutUsSection ";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <AboutHeroSection />
      <AboutUsSection />
      <ValuesSection />
      <AboutCTA />
    </div>
  );
};

export default AboutUs;