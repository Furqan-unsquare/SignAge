import HeroSection from "../components/Works/HeroSection";
import Gallery from "../components/Works/Gallery";
import CTA from "../components/Works/CTA";

const Work = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <Gallery />
      <CTA />
    </div>
  );
};

export default Work;
