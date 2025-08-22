// components/NeonConfigurator/HowToInstall.tsx
import React from "react";

export const HowToInstall = () => (
  <div className="pb-10 md:py-12 bg-black text-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        How to Install Your Neon Sign
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            step: 1,
            title: "Prepare the Surface",
            description: "Clean the wall surface thoroughly and ensure it's dry before installation."
          },
          {
            step: 2,
            title: "Position the Sign",
            description: "Use the included template to mark drill points on the wall."
          },
          {
            step: 3,
            title: "Secure Mounting",
            description: "Screw in the mounting brackets and hang your neon sign securely."
          }
        ].map((item) => (
          <div key={item.step} className="bg-gray-900 p-6 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold mb-4">
              {item.step}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);