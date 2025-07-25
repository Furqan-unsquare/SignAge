// components/NeonConfigurator/FAQs.tsx
import React, { useState } from "react";

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of custom signs do you offer?",
      answer: "Orders typically ship within 3-5 business days. Delivery takes 7-10 days domestically."
    },
    {
      question: "What is the power consumption?",
      answer: "We create custom neon signs, acrylic boards, LED signs, nameplates, 3D letters, and more. You can personalize colors, sizes, fonts, and styles."
    },
    {
      question: "Do you offer installation services?",
      answer: "Yes, we provide installation for local orders and offer easy-to-follow instructions for remote deliveries."
    },
    {
      question: "What is the return or refund policy for custom designs?",
      answer: "Since custom products are made to order, they are non-refundable. However, we will replace or fix any defects or damage caused during shipping."
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