"use client"

import { ArrowRight, Zap, Star, Award, Shield, Clock, Users, Palette } from 'lucide-react'

const AboutSection = () => {
  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Free Design Service",
      description: "Our expert designers create unlimited mockups until you're 100% satisfied with your custom sign.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24-Hour Turnaround",
      description: "Get your design concepts within 24 hours. Rush orders available for urgent requirements.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Materials",
      description: "We use only the highest quality LED strips and weather-resistant materials for lasting durability.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "2-Year Warranty",
      description: "Every custom sign comes with comprehensive warranty and lifetime technical support.",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      business: "Kumar Electronics",
      text: "The custom logo sign transformed our storefront. Sales increased by 40% after installation!",
      rating: 5
    },
    {
      name: "Priya Sharma", 
      business: "Café Mocha",
      text: "Beautiful custom quote sign for our café. The design team understood our vision perfectly.",
      rating: 5
    },
    {
      name: "Amit Patel",
      business: "Wedding Planner",
      text: "Created stunning wedding signs for our clients. Quality is exceptional and delivery was on time.",
      rating: 5
    }
  ]

  return (
    <section className="bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] pt-20 pb-4 px-4" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8 px-2">
            <div>
              <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Users className="w-5 h-5 text-[#fdca07]" />
                <span className="text-white font-bold uppercase tracking-wide">Why Choose Us</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider leading-tight mb-6">
                India's #1
                <br />
                <span className="text-[#fdca07]">Custom Neon</span>
                <br />
                Design Studio
              </h2>

              <p className="text-white/90 text-lg leading-relaxed mb-8">
                With over 10,000 custom signs created and 500+ satisfied businesses, we're the trusted choice 
                for premium LED neon signage across India. From concept to installation, we handle everything.
              </p>

              {/* Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#fdca07] rounded-xl flex items-center justify-center text-black">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-[#fdca07] font-black text-lg uppercase tracking-wide mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-[#fdca07] hover:bg-yellow-400 text-black font-black text-lg uppercase tracking-wider px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                <Zap className="w-5 h-5" />
                <span>GET FREE QUOTE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>

              <button className="group bg-transparent text-white hover:text-white/80 font-black text-lg uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                <span>VIEW PORTFOLIO</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative bg-black/20 backdrop-blur-sm rounded-3xl border-2 border-white/30 overflow-hidden">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Custom neon sign design process"
                className="w-full h-96 object-cover"
              />

              {/* Overlay Elements */}
              <div className="absolute top-6 left-6 bg-[#fdca07] text-black font-black text-sm uppercase px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  {/* <Star className="w-4 h-4 fill-current" /> */}
                  <span>Premium Quality</span>
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-black font-bold text-sm px-4 py-2 rounded-lg">
                Made in India 🇮🇳
              </div>

              <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white font-bold text-sm px-4 py-2 rounded-lg">
                24/7 Design Support
              </div>

              <div className="absolute bottom-6 right-6 bg-[#fdca07]/90 backdrop-blur-sm text-black font-bold text-sm px-4 py-2 rounded-lg">
                Free Consultation
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#fdca07] rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Testimonials */}
        {/* <div className="bg-black/20 backdrop-blur-sm rounded-3xl border-2 border-white/20 p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-4">
              What Our <span className="text-[#fdca07]">Customers Say</span>
            </h3>
            <p className="text-white/80 text-lg">Real feedback from businesses who chose our custom signage</p>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#fdca07] fill-current" />
                  ))}
                </div>
                <p className="text-white/90 leading-relaxed mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="text-[#fdca07] font-bold">{testimonial.name}</div>
                  <div className="text-white/70 text-sm">{testimonial.business}</div>
                </div>
              </div>
            ))}
          </div> */}
        {/* </div> */}
      </div>
    </section>
  )
}

export default AboutSection
