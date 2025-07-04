// components/NeonConfigurator/FAQs.tsx
import React, { useState } from "react";

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Orders typically ship within 3-5 business days. Delivery takes 7-10 days domestically."
    },
    {
      question: "What is the power consumption?",
      answer: "Our neon signs consume only 15-20W depending on size, making them energy efficient."
    },
    {
      question: "Can I customize the sign after ordering?",
      answer: "Changes can be made within 24 hours of ordering. Contact us immediately for modifications."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide. International delivery takes 10-15 business days."
    }
  ];

  return (
    <div className="py-12 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700 pb-4">
              <button
                className="w-full flex justify-between items-center py-4 text-left"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p className="text-gray-400 pb-4">{faq.answer}</p>
              )}
            </div>
          ))}
          {/* <div className="text-center mt-8">
            <a 
              href="/faqs" 
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              View All FAQs
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};