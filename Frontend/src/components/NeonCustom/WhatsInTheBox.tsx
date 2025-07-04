// components/NeonConfigurator/WhatsInTheBox.tsx
import React from "react";

export const WhatsInTheBox = () => (
  <div className="py-12 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        What's in the Box
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: "LED Neon Sign", icon: "✨" },
          { name: "Mounting Kit", icon: "🔩" },
          { name: "Power Adapter", icon: "🔌" },
          { name: "Remote Control", icon: "📱" }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);