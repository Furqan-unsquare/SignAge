import { Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactMethods = () => {
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
        <div className="bg-gradient-to-br from-[#EA3C1F] via-[#F26742] to-[#EB3C20] p-8 rounded-2xl">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
            </div>

            <div className="relative">
                {/* Signage-style header */}
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-yellow-400 rounded-lg transform rotate-1 blur-sm opacity-60"></div>
                    <div className="relative bg-white border-4 border-yellow-400 px-6 py-3 rounded-lg shadow-xl">
                        <h2 className="text-2xl md:text-3xl font-black text-gray-800">
                            Multiple Ways to <span className="text-[#EA3C1F]">CONNECT</span>
                        </h2>
                    </div>
                </div>

                <div className="space-y-6 mb-12">
                    {contactMethods.map((method, index) => (
                        <Card key={method.title} className="group hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 border-4 border-yellow-400 bg-white/95 backdrop-blur-sm hover:scale-105">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${method.color} border-2 border-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                        <method.icon className="w-6 h-6 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 mb-1 text-lg">{method.title}</h3>
                                        <p className="text-gray-700 font-bold mb-1 text-lg">{method.value}</p>
                                        <p className="text-sm text-gray-600 font-medium">{method.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Why Choose Us - Signage style */}
                <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 rounded-2xl transform rotate-1 blur-sm opacity-40"></div>
                    <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-4 border-yellow-400 shadow-2xl">
                        {/* Decorative bolts */}
                        <div className="absolute -top-2 left-8 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                        <div className="absolute -top-2 right-8 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>

                        <h3 className="text-2xl font-black text-gray-800 mb-6 text-center">
                            WHY WORK WITH <span className="text-[#EA3C1F]">US?</span>
                        </h3>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-center space-x-4">
                                <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-[#EA3C1F] flex-shrink-0"></div>
                                <span className="font-bold">Expert craftsmanship with 10+ years experience</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-[#EA3C1F] flex-shrink-0"></div>
                                <span className="font-bold">Custom designs tailored to your brand</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-[#EA3C1F] flex-shrink-0"></div>
                                <span className="font-bold">Fast turnaround without compromising quality</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-[#EA3C1F] flex-shrink-0"></div>
                                <span className="font-bold">Full support from concept to installation</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMethods;