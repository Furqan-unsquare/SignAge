import { Zap, Mail, Phone, MapPin, Star } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Services': [
      'Neon Signs',
      'Digital Displays',
      'Business Signage',
      'Restaurant Signs',
      'Event Signage'
    ],
    'Company': [
      'About Us',
      'Portfolio',
      'Testimonials',
      'Careers',
      'Contact'
    ],
    'Support': [
      'Help Center',
      'Installation Guide',
      'Maintenance',
      'Warranty',
      'FAQ'
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-orange-100 to-yellow-100 border-t border-orange-200 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FDCA07] to-[#F26742]"></div>
      
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 col-span-3">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FDCA07] rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#EA3C1F] animate-pulse" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-[#FDCA07]">
                SignCraft
              </span>
            </div>
            
            <p className="text-[#2f2f2f] mb-4 sm:mb-6 leading-relaxed max-w-md font-semibold text-sm sm:text-base">
              Illuminating businesses across the nation with cutting-edge signage solutions that drive results and create lasting impressions.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3 text-[#2f2f2f] font-semibold text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e5e5e]" />
                <span>(555) 123-SIGN</span>
              </div>
              <div className="flex items-center space-x-3 text-[#2f2f2f] font-semibold text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e5e5e]" />
                <span>hello@signcraft.com</span>
              </div>
              <div className="flex items-center space-x-3 text-[#2f2f2f] font-semibold text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e5e5e]" />
                <span>123 Neon Street, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[#5e5e5e] font-black mb-3 sm:mb-4 text-base sm:text-lg">{category}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-[#2f2f2f] hover:text-[#F26742] font-semibold transition-colors duration-300 relative group text-sm sm:text-base"
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F26742] transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#F26742] mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#5e5e5e] text-center md:text-left font-semibold text-sm sm:text-base">
              © {currentYear} SignCraft. All rights reserved. Illuminating your success.
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 text-[#FDCA07]">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[#FDCA07] font-bold text-sm sm:text-base">4.9/5</span>
              <span className="text-[#5e5e5e] font-semibold text-sm sm:text-base">from 500+ reviews</span>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-6 sm:mt-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#FDCA07] hover:bg-gradient-to-r hover:from-[#EA3C1F] hover:to-[#F26742] text-[#5e5e5e] hover:text-[#FDCA07] font-bold rounded-full transition-all duration-300 hover:scale-105 group"
          >
            <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;