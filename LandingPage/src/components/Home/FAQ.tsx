import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/UI/card';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does it take to create a custom sign?",
      answer: "Most custom signs take 2-4 weeks from design approval to installation. Rush orders can be accommodated for an additional fee, with some projects completed in as little as 1 week."
    },
    {
      question: "Do you provide installation services?",
      answer: "Yes! We provide complete installation services by our certified technicians. We handle all permits, electrical work, and ensure your sign is properly mounted and functioning perfectly."
    },
    {
      question: "What types of materials do you use for signs?",
      answer: "We use premium materials including LED modules, aluminum, acrylic, stainless steel, and weather-resistant vinyl. All materials are chosen for durability and visual impact."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#fdca07] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-[#fdca07] p-4 rounded-2xl border-4 border-white shadow-[0_0_30px_rgba(253,202,7,0.5)]">
              <HelpCircle className="w-16 h-16 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-7xl font-black mb-6 uppercase tracking-wider">
            <span className="text-[#fdca07] drop-shadow-2xl">FREQUENTLY </span>
            <span className="text-white drop-shadow-2xl">ASKED</span>
            <br />
            <span className="text-white drop-shadow-2xl">QUESTIONS</span>
          </h2>
          <p className="text-ms md:text-2xl text-yellow-100 max-w-3xl mx-auto font-bold uppercase tracking-wide drop-shadow-lg">
            Everything you need to know about premium signage solutions
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-[#fdca07] rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-5xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-sm hover:border-[#fdca07] transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,202,7,0.3)] hover:scale-[1.02] rounded-2xl overflow-hidden"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-[#fdca07]/10 transition-all duration-300 group"
                >
                  <h3 className="text-md md:text-2xl font-black text-[#EA3C1F] pr-4 uppercase tracking-wide group-hover:text-[#EB3C20] transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="bg-[#EA3C1F] p-2 rounded-full transition-all duration-300 flex-shrink-0">
                    {openFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-white" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>

                {openFAQ === index && (
                  <div className="px-8 py-6 border-t-4 border-[#fdca07]/20 bg-gradient-to-r from-[#fdca07]/5 to-transparent">
                    <p className="text-[#EA3C1F] leading-relaxed  font-semibold md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section
        <div className="text-center mt-20">
          <div className="bg-[#fdca07] border-4 border-white rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-[0_0_50px_rgba(253,202,7,0.3)] hover:shadow-[0_0_70px_rgba(253,202,7,0.5)] transition-all duration-300 hover:scale-105">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-2xl">
              Still have questions?
            </h3>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-bold uppercase tracking-wide drop-shadow-lg">
              Our signage experts are ready to illuminate your vision
            </p>
            <button className="bg-white text-[#EA3C1F] font-black px-12 py-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-lg text-xl uppercase tracking-wide border-4 border-transparent hover:border-[#EA3C1F] hover:bg-[#EA3C1F] hover:text-white">
              Contact Us Today
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;