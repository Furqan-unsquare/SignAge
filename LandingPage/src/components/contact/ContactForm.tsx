import { Send, Zap, Phone, Mail, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        project: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    return (
        <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-xl"></div>

            <Card className="shadow-2xl border-4 border-yellow-300 bg-white/90 backdrop-blur-sm relative overflow-hidden">
                {/* Ropes for the sign */}
                <div className="absolute -top-6 left-1/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>
                <div className="absolute -top-6 left-3/4 w-1 h-8 bg-yellow-300 transform -translate-x-1/2 z-10"></div>
                
                <CardContent className="p-8 md:p-10">
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-black text-gray-800 mb-3">
                            <span className="text-[#EA3C1F]">SIGN</span> UP FOR YOUR PROJECT
                        </h3>
                        <p className="text-lg text-gray-600">Complete the form below and we'll light up your vision</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-gray-800 font-bold flex items-center">
                                    <PenTool className="w-4 h-4 mr-2 text-yellow-500" />
                                    YOUR NAME
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200/50 bg-white/80 text-gray-800 font-medium h-12"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-gray-800 font-bold flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-yellow-500" />
                                    EMAIL ADDRESS
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200/50 bg-white/80 text-gray-800 font-medium h-12"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-gray-800 font-bold flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-yellow-500" />
                                    PHONE NUMBER
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200/50 bg-white/80 text-gray-800 font-medium h-12"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="project" className="text-gray-800 font-bold flex items-center">
                                    <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                                    PROJECT TYPE
                                </Label>
                                <Input
                                    id="project"
                                    name="project"
                                    value={formData.project}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200/50 bg-white/80 text-gray-800 font-medium h-12"
                                    placeholder="Neon sign, LED display..."
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="message" className="text-gray-800 font-bold flex items-center">
                                <PenTool className="w-4 h-4 mr-2 text-yellow-500" />
                                PROJECT DETAILS
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="border-2 border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200/50 bg-white/80 text-gray-800 font-medium min-h-40"
                                placeholder="Tell us about your project requirements, timeline, and any specific ideas..."
                                required
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] hover:from-[#EA3C1F] hover:via-[#F26742] hover:to-[#EB3C20] hover:scale-[1.02] transition-all duration-300 text-white font-bold py-6 shadow-lg hover:shadow-xl group border-2 border-white"
                            >
                                ILLUMINATE MY PROJECT
                                <Send className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Scrolling marquee text */}
            <div className="mt-10 overflow-hidden">
                <div className="inline-block whitespace-nowrap animate-marquee">
                    <span className="text-xl font-black text-yellow-400 uppercase tracking-wider mx-8">
                        ✦ FREE CONSULTATION ✦ 24/7 SUPPORT ✦ 5-YEAR WARRANTY ✦ INSTALLATION INCLUDED ✦
                    </span>
                    <span className="text-xl font-black text-yellow-400 uppercase tracking-wider mx-8">
                        ✦ FREE CONSULTATION ✦ 24/7 SUPPORT ✦ 5-YEAR WARRANTY ✦ INSTALLATION INCLUDED ✦
                    </span>
                </div>
            </div>

            {/* CSS animation styles */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                    display: inline-block;
                }
            `}</style>
        </div>
    );
};

export default ContactForm;