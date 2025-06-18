
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    },
    {
      question: "Can you design signs for any business type?",
      answer: "Absolutely! We've created signage for restaurants, retail stores, offices, medical facilities, automotive shops, and more. Each design is customized to match your brand and industry requirements."
    },
    {
      question: "Do you offer warranty on your signs?",
      answer: "Yes, we provide a comprehensive 5-year warranty on LED components and a 2-year warranty on electrical components. We also offer ongoing maintenance services."
    },
    {
      question: "Can I see my design before production starts?",
      answer: "Of course! We provide detailed mockups and 3D renderings of your sign before production begins. We'll work with you through multiple revisions until you're completely satisfied."
    },
    {
      question: "What's the cost range for custom signage?",
      answer: "Costs vary based on size, complexity, and materials. Basic signs start around $500, while large custom LED displays can range from $5,000-$20,000+. We provide detailed quotes after consultation."
    },
    {
      question: "Do you handle permits and regulations?",
      answer: "Yes, we're familiar with local signage regulations and can handle permit applications on your behalf. We ensure all signs comply with zoning laws and building codes."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-yellow-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-16 h-16 text-orange-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">FREQUENTLY </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">ASKED QUESTIONS</span>
          </h2>
          <p className="text-xl text-orange-700 max-w-3xl mx-auto font-semibold">
            Everything you need to know about our signage services and process
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-orange-50/50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-bold text-purple-700 pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 pb-6 border-t border-orange-100">
                    <p className="text-blue-700 leading-relaxed pt-4 font-medium">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-orange-100 mb-6">
              Our signage experts are here to help you bring your vision to life
            </p>
            <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
