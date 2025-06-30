import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/UI/card';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does it take to create a custom sign?",
      answer: "Most custom signs take 2–4 weeks from design approval to installation. Rush orders can be completed in as little as 1 week."
    },
    {
      question: "Do you provide installation services?",
      answer: "Yes! Our certified technicians handle permits, electrical work, and install your sign professionally and safely."
    },
    {
      question: "What types of materials do you use for signs?",
      answer: "We use LED modules, aluminum, acrylic, stainless steel, and weather-resistant vinyl — all chosen for durability and impact."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="relative pt-14 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-wider drop-shadow">
            <span className="text-yellow-300">Frequently </span>
            <span className="text-yellow-100">Asked</span>
            <br />
            <span className="text-yellow-100">Questions</span>
          </h2>
          <p className="text-sm md:text-lg text-yellow-100 max-w-3xl mx-auto font-medium uppercase tracking-wide">
            Everything you need to know about premium signage solutions
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-1 bg-yellow-300 rounded-full shadow-md"></div>
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="max-w-5xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-black/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] rounded-2xl overflow-hidden shadow-md border border-yellow-300/20"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 px-6 md:px-10 text-left flex items-center justify-between group"
                >
                  <h3 className="text-sm md:text-lg font-semibold text-yellow-300 pr-4 uppercase tracking-wide">
                    {faq.question}
                  </h3>
                  <div className="bg-yellow-400 p-2 rounded-full shadow-sm">
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-black" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-black" />
                    )}
                  </div>
                </button>

                {openFAQ === index && (
                  <div className="px-6 md:px-10 py-5 border-t border-yellow-300/20">
                    <p className="text-yellow-100 text-sm md:text-base leading-relaxed font-medium">
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
