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
    <section className="relative pb-20 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] overflow-hidden">
     <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-wider">
            <span className="text-[#fdca07] drop-shadow-2xl">FREQUENTLY </span>
            <span className="text-white drop-shadow-2xl">ASKED</span>
            <br />
            <span className="text-white drop-shadow-2xl">QUESTIONS</span>
          </h2>
          <p className="text-ms  md:text-lg text-yellow-100 max-w-3xl mx-auto font-bold uppercase tracking-wide drop-shadow-lg">
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
              className="bg-white/95 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 px-4 md:px-10 text-left flex items-center justify-between transition-all duration-300 group">
                  <h3 className="text-md md:text-xl font-bold text-[#EA3C1F] pr-4 uppercase tracking-wide  transition-colors duration-300">
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
                  <div className="px-8 py-6 border-t">
                    <p className="text-[#EA3C1F] leading-relaxed  font-semibold md:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;