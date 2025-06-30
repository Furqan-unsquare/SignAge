import React from "react";
import {
  Hand,
  Wrench,
  PackageCheck,
  BadgeCheck,
  Users,
  Medal,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: <Hand className="w-6 h-6 text-purple-400 glow-icon" />, label: "Value for Money" },
  { icon: <Wrench className="w-6 h-6 text-cyan-300 glow-icon" />, label: "2 Mins Installation" },
  { icon: <PackageCheck className="w-6 h-6 text-blue-400 glow-icon" />, label: "100% Timely Delivery" },
  { icon: <BadgeCheck className="w-6 h-6 text-green-400 glow-icon" />, label: "2 Year Warranty" },
  { icon: <Users className="w-6 h-6 text-yellow-400 glow-icon" />, label: "4.8 ✦ by 20K+ Customers" },
  { icon: <Medal className="w-6 h-6 text-sky-400 glow-icon" />, label: "Top-Notch Quality" },
];

const MarqueeIcons = () => {
  return (
    <div className="overflow-hidden w-full py-3 border-t border-white/10">
      <div className="flex items-center space-x-10 animate-marquee min-w-full">
        {[...features, ...features].map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-2 text-white  sm:text-base font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {feature.icon}
            <span className="whitespace-nowrap">{feature.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeIcons;
