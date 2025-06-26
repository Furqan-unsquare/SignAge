import Hero from '@/components/Home/Hero';
import Services from '@/components/Home/Services';
import NeonCraftSection from '@/components/Home/Features';
import Testimonials from '@/components/Home/Testimonials';
import FAQ from '@/components/Home/FAQ';
import Collections from '@/components/Home/collections';
import CustomProducts from '@/components/Home/Connect';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-800">
      <Hero />
      <Services />
      <NeonCraftSection />
      <Collections />
      <CustomProducts />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Index;
