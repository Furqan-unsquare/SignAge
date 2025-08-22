"use client"

import { ArrowRight, Zap, Palette, Award, Shield } from 'lucide-react'

const AboutSection = () => {
  const features = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Free Design Service",
      description: "Unlimited mockups until you're 100% satisfied with your custom sign.",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Premium Materials",
      description: "Highest quality LED strips and weather-resistant materials.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "2-Year Warranty",
      description: "Comprehensive coverage with lifetime technical support.",
    },
  ]

  return (
    <section className="pt-16 px-6 md:px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Thane's Premier <span className="text-yellow-400">Custom Neon</span> Design Studio
              </h2>
              
              <p className="text-white/90 md:text-lg">
                With 10,000+ custom signs created, we're the trusted choice for premium LED neon signage across Thane.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center text-yellow-400">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-yellow-400 font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/80 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 py-4 items-center">
              <button
              onClick={() => window.location.href = '/contact-us'} 
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 max-w-sm rounded-lg transition-colors flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Get Free Quote
              </button>
              <button 
              onClick={() => window.location.href = '/work'} 
              className="hidden md:flex border-2 border-white/30 hover:border-white/50 text-white font-medium px-6 py-3 rounded-lg transition-colors items-center gap-2">
                View Portfolio
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black/10 border border-white/10">
              <img
                src="https://i.pinimg.com/736x/47/76/3a/47763a8f9f5e19fa083897c1ab744a25.jpg" // Replace with your actual image
                alt="Custom neon sign examples"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Quality Badge */}
              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                Premium Quality
              </div>
              
              {/* Made in India Badge */}
              <div className="absolute top-4 right-4 bg-white/90 text-black text-xs font-medium px-3 py-1 rounded-full">
                Made in Thane
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection