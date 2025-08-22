import {  Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';  

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#E63025]  to-red-500 border-t border-white/20 text-white pt-12 pb-8 md:pt-16 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 md:mb-12">
          
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold text-[#FDCA07]">Ansh Enterprises</h3>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Illuminating brands with custom neon signs and LED displays since 2015.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/AnshEnterprises1" target='_blank' className="text-white hover:text-[#FDCA07] transition-colors duration-200" aria-label="Facebook">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/acrylic_signboard" target="_blank" rel="noopener noreferrer"
               className="text-white hover:text-[#FDCA07] transition-colors duration-200" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@anshenterprisesacrylicsign7671" target='_blank' className="text-white hover:text-[#FDCA07] transition-colors duration-200" aria-label="Twitter">
                <FaYoutube  className='w-5 h-5'/>
              </a>
            </div>  
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#FDCA07] mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-3">
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Home</Link></li>
              <li><Link to="/about" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">About Us</Link></li>
              <li><Link to="/work" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Our Products</Link></li>
              </ul>
            <ul className="space-y-3">
              <li><Link to="/NeonCustom" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Customizer</Link></li>
              <li><Link to="/blog" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Blog</Link></li>
              <li><Link to="/#contact" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Contact</Link></li>
            </ul>
          </div>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="text-lg font-semibold text-[#FDCA07] mb-4">Our Products</h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-3">
              <ul className="space-y-3">
                <li><a href="/work#project?category=neon" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Neon Signage</a></li>
                <li><a href="/work#project?category=acrylic" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Acrylic Sign Boards</a></li>
                <li><a href="/work#project?category=aluminium" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Aluminium Channel Letter</a></li>
                <li><a href="/work#project?category=3d-steel" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">3D Steel Letters</a></li>
                <li><a href="/work#project?category=laser-router" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">CNC Laser & Router Cutting (2D/3D)</a></li>
              </ul>

              <ul className="space-y-3">
                <li><a href="/work#project?category=glow-sign" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Glow Signboard Fabrix & Flex</a></li>
                <li><a href="/work#project?category=acp" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">ACP Signboard</a></li>
                <li><a href="/work#project?category=photos" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Signboard</a></li>
                <li><a href="/work#project?category=office-name" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Office Name Plate</a></li>
                <li><a href="/work#project?category=led-scrolling" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200 block">Custom LED Screen / Scrolling Board</a></li>
              </ul>

            </div>
          </div>

          {/* Contact Info */}
          <div className='md:ml-16'>
            <h4 className="text-lg font-semibold text-[#FDCA07] mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#FDCA07] flex-shrink-0" />
               <a href="https://maps.app.goo.gl/UGTpFgRmeMELYazY7"
                  target="_blank"
                  rel="noopener noreferrer">
                  <div className="cursor-pointer">
                    <p className="text-white/90 text-sm md:text-base">
                      Road no.16/z, Opp. Konar Business Park, Jai Bhavani Nagar
                    </p>
                    <p className="text-white/90 text-sm md:text-base">
                      Wagle Industrial Estate, Thane (W) - 400604
                    </p>
                  </div>
                </a>

              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FDCA07] flex-shrink-0" />
                <a href="tel:+919594274068" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200">+91 9594274068 </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FDCA07] flex-shrink-0" />
                <a href="mailto:shivkumar.signage@gmail.com" className="text-white/90 hover:text-white text-sm md:text-base transition-colors duration-200">shivkumar.signage@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6 md:my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} <a href='https://www.unsquare.in/' target='_blank' className='underline'>Unsquare Labs</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;