import Hero from '@/components/Home/Hero';
import Services from '@/components/Home/Services';
import NeonCraftSection from '@/components/Home/Features';
import Testimonials from '@/components/Home/Testimonials';
import FAQ from '@/components/Home/FAQ';
import Collections from '@/components/Home/Collections';
import CustomProducts from '@/components/Home/Connect';
import Marquee from '@/components/Home/Marquee';
import ContactMethods from '@/components/Home/ContactMethods';
import ContactCTA from '@/components/Home/ContactCTA';

const Index = () => {
  
  return (
    <div className="min-h-screen bg-[#E63025] text-gray-800">
      <Hero />
      <Marquee />
      <Services />
      <NeonCraftSection />
      <Collections />
      <CustomProducts />
      <Testimonials />
      <ContactMethods />
      <FAQ />
      <ContactCTA />
    </div>
  );
};

export default Index;
