import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-400 to-teal-500 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-1 bg-[rgb(253,202,7)]"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-x-10">

          {/* Left Section - Contact Us */}
          <div className="max-w-xs text-center">
            <h2 className="text-4xl font-black text-yellow-400 uppercase tracking-wider mb-2">
              CONTACT US
            </h2>
            <div className="flex flex-col md:flex-row gap-2 text-sm text-white font-semibold justify-center">
              <a href="#" className="hover:text-yellow-300 transition-colors">
                PRIVACY POLICY |
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                TERMS OF SERVICE
              </a>
            </div>
          </div>

          {/* Center Section - Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            {/* <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(253,202,7,0.8)] border-4 border-[rgb(253,202,7)]"> */}
              <img
                src="/assets/logo5.png"
                alt="Logo"
                className="w-20 h-20 drop-shadow-[0_0_20px_rgba(253,202,7,0.8)]"
              />
            {/* </div> */}
          </div>

          {/* Right Section - Contact Info */}
          <div className="max-w-xs text-center md:text-right">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-end gap-2 text-white font-bold text-sm md:text-lg">
                <span>@SIGNCRAFT_</span>
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-cyan-500 text-sm">📷</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-end gap-2 text-white font-bold text-sm md:text-lg">
                <span>INFO@SIGNCRAFT.COM</span>
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <Mail className="w-4 h-4 text-cyan-500" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-black/10"></div>
    </footer>
  );
};

export default Footer;
