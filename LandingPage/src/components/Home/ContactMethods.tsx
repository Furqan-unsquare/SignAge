import React, { useState, useEffect } from 'react';
import MarqueeIcons from './Marquee';
import { Briefcase, Clock, Users, Star } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // ⬅️ Ensure this is imported at the top

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus(null), 5000); // ✅ Toast disappears after 5s
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000); // ✅ Toast disappears after 5s

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden" id='contact'>
      {/* Marquee Top - Smoother Animation */}
      <MarqueeIcons />

      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100vh-200px)] px-4 md:px-8 py-8 gap-6 max-w-7xl mx-auto">
        {/* Contact Details Section */}
        <div className="bg-gradient-to-br from-[#EA3C1F] to-[#F26742] text-white rounded-xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Let's Start a Conversation</h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 opacity-90">Get In Touch</h3>
            <p className="text-white/90 mb-8 leading-relaxed line-clamp-2">
              Ready to bring your vision to life? Whether it's a stunning neon sign or a complete branding solution, we're here to help you shine.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-yellow-300" />
                <div>
                  <div className="text-xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Projects</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-300" />
                <div>
                  <div className="text-xl font-bold">48h</div>
                  <div className="text-sm text-white/80">Response</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-yellow-300" />
                <div>
                  <div className="text-xl font-bold">15+</div>
                  <div className="text-sm text-white/80">Experts</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-300" />
                <div>
                  <div className="text-xl font-bold">99%</div>
                  <div className="text-sm text-white/80">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-xl overflow-hidden h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256018003!2d-73.9878449241643!3d40.7484409713899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="opacity-90"
          />
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">GET IN TOUCH</h2>
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className={`fixed top-6 right-1 md:right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-semibold ${
                  submitStatus === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {submitStatus === 'success'
                  ? 'Thank you! Your message has been sent successfully.'
                  : 'Something went wrong. Please try again later.'}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-[#EA3C1F] to-[#F26742] text-white py-3 rounded-lg font-medium hover:shadow-md transition-all ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>

      {/* Enhanced Marquee Animation */}
      <style jsx>{`
        .marquee {
          animation: scroll 40s linear infinite;
          display: inline-block;
          will-change: transform;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ContactSection;