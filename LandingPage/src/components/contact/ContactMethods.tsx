import { Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/UI/card';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-SIGN',
      description: 'Mon-Fri, 9AM-6PM EST',
      color: 'from-yellow-400 to-yellow-300'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@electrifybrands.com',
      description: 'We respond within 24 hours',
      color: 'from-yellow-500 to-yellow-400'
    },
    {
      icon: MapPin,
      title: 'Studio',
      value: '123 Neon Street, Design City',
      description: 'Visit our showroom',
      color: 'from-yellow-400 to-amber-400'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Marquee Top */}
      <div className="py-3 overflow-hidden">
        <div className="marquee whitespace-nowrap text-yellow-300 text-2xl font-bold">
          <span className="mx-8">✧ SIGN MAKERS ✧</span>
          <span className="mx-8">✧ BRANDING EXPERTS ✧</span>
          <span className="mx-8">✧ CUSTOM DESIGNS ✧</span>
          <span className="mx-8">✧ FAST TURNAROUND ✧</span>
          <span className="mx-8">✧ PREMIUM MATERIALS ✧</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full px-4">
        {/* Map Section */}
        <div className="relative ">
          <div className="absolute inset-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256018003!2d-73.9878449241643!3d40.7484409713899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="opacity-90 rounded-l-xl"/>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 md:py-10  flex flex-col justify-center rounded-r-xl">
          <div className="max-w-xl mx-auto w-full">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-yellow-400 rounded-lg transform rotate-1 blur-sm opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#EA3C1F] via-[#F26742] to-[#EB3C20] px-6 py-3 rounded-lg shadow-xl">
                <h2 className="text-2xl md:text-3xl font-black text-white text-center">
                  GET IN TOUCH
                </h2>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#EA3C1F] to-[#F26742] text-white py-3 px-6 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Styles for marquee animation */}
      <style jsx>{`
        .marquee {
          animation: scroll 20s linear infinite;
          display: inline-block;
        }
        .marquee-reverse {
          animation: scrollReverse 20s linear infinite;
          display: inline-block;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ContactSection;