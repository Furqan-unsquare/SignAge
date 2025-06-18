import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#ff8d79] to-[#ff6a50] border-t text-white pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          
          {/* Company Info - Full width on mobile, then first column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4 md:space-y-6">
            <h3 className="text-2xl font-bold text-[#FDCA07]">Electrify Signs</h3>
            <p className="text-white/90 text-sm md:text-base">
              Illuminating brands with custom neon signs and LED displays since 2015.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#FDCA07] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="text-white hover:text-[#FDCA07] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="text-white hover:text-[#FDCA07] transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="text-white hover:text-[#FDCA07] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>

          {/* Links Grid - 2 columns on mobile, then spreads out */}
          <div className="grid md:grid-cols-3 gap-8 sm:gap-6 md:gap-8 sm:col-span-2 lg:col-span-3">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-[#FDCA07] mb-4 md:mb-6">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3">
                <li><a href="/" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Home</a></li>
                <li><a href="/about" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">About Us</a></li>
                <li><a href="/products" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Our Products</a></li>
                <li><a href="/gallery" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Gallery</a></li>
                <li><a href="/blog" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Blog</a></li>
                <li><a href="/contact" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-bold text-[#FDCA07] mb-4 md:mb-6">Our Products</h4>
              <ul className="space-y-2 md:space-y-3">
                <li><a href="/products/neon-signs" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Neon Signs</a></li>
                <li><a href="/products/led-displays" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">LED Displays</a></li>
                <li><a href="/products/channel-letters" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Channel Letters</a></li>
                <li><a href="/products/custom-signs" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Custom Signs</a></li>
                <li><a href="/products/3d-letters" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">3D Letters</a></li>
                <li><a href="/products/light-boxes" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">Light Boxes</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-lg font-bold text-[#FDCA07] mb-4 md:mb-6">Contact Us</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-[#FDCA07] flex-shrink-0" />
                  <div>
                    <p className="text-white/90 text-sm md:text-base">123 Neon Street</p>
                    <p className="text-white/90 text-sm md:text-base">Design City, DC 10001</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#FDCA07] flex-shrink-0" />
                  <a href="tel:+15551234567" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">+1 (555) 123-4567</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#FDCA07] flex-shrink-0" />
                  <a href="mailto:info@electrifysigns.com" className="text-white/90 hover:text-white text-sm md:text-base transition-colors">info@electrifysigns.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6 md:my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Electrify Signs. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="/privacy-policy" className="text-white/80 hover:text-white text-xs md:text-sm transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-white/80 hover:text-white text-xs md:text-sm transition-colors">Terms of Service</a>
            <a href="/faq" className="text-white/80 hover:text-white text-xs md:text-sm transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;