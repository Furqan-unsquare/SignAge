import { Star, Zap, Clock, Users, MessageCircle, Phone } from 'lucide-react';

const ContactHero = () => {
    const quickStats = [
        { icon: Star, number: '500+', label: 'Projects' },
        { icon: Clock, number: '48h', label: 'Response' },
        { icon: Users, number: '15+', label: 'Experts' },
        { icon: Zap, number: '99%', label: 'Satisfaction' }
    ];

    return (
        <section className="pt-40 pb-16 relative overflow-hidden">
            {/* Background Elements */} 
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"></div>

                {/* Large Glowing Telephone Background */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                    <div className="animate-[ringGlow_3s_ease-in-out_infinite]">
                        <div className="relative">
                            {/* Glow effect layers */}
                            <div className="absolute inset-0 animate-pulse">
                                <Phone className="w-96 h-96 text-yellow-300 blur-xl" />
                            </div>
                            <div className="absolute inset-0">
                                <Phone className="w-96 h-96 text-yellow-200 blur-lg" />
                            </div>
                            <Phone className="w-96 h-96 text-yellow-400 relative z-10 drop-shadow-2xl" />
                        </div>
                    </div>
                </div>

                {/* Secondary animated phone with electric effect */}
                <div className="absolute top-20 right-20 opacity-25">
                    <div className="animate-[electricRing_2s_ease-in-out_infinite_0.5s]">
                        <div className="relative hidden md:block">
                            <div className="absolute inset-0 animate-ping">
                                <Phone className="w-32 h-32 text-yellow-300 blur-md transform rotate-12" />
                            </div>
                            <Phone className=" w-32 h-32 text-yellow-400 transform rotate-12 drop-shadow-xl relative z-10" />
                        </div>
                    </div>
                </div>

                {/* Electric sparks around phones */}
                <div className="absolute top-1/3 left-1/3 opacity-30">
                    <div className="animate-[spark_1.5s_ease-in-out_infinite]">
                        <Zap className="w-8 h-8 text-yellow-300" />
                    </div>
                </div>
                <div className="absolute bottom-1/3 right-1/3 opacity-25">
                    <div className="animate-[spark_2s_ease-in-out_infinite_0.7s]">
                        <Zap className="w-6 h-6 text-yellow-400 transform rotate-45" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center px-4 py-2 bg-yellow-400 rounded-full text-gray-800 font-bold mb-8 border-2 border-white shadow-lg">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Let's Start a Conversation
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        <span className="text-white drop-shadow-lg">
                            Get In 
                        </span>
                        <span className="text-yellow-300 drop-shadow-lg ml-4">
                            Touch
                        </span>
                    </h1>

                    <p className="text-xl text-yellow-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Ready to bring your vision to life? Whether it's a stunning neon sign or a complete branding solution,
                        <span className="font-bold text-yellow-300"> we're here to help you shine</span>.
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-4 md:grid-cols-4 md:gap-6 mb-16">
                        {quickStats.map((stat, index) => (
                            <div key={stat.label} className="text-center group">
                                <div className="w-12 h-12 mx-auto bg-yellow-400 border-2 border-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-yellow-300 transition-all duration-300 shadow-lg">
                                    <stat.icon className="w-6 h-6 text-gray-800" />
                                </div>
                                <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{stat.number}</div>
                                <div className="text-sm text-yellow-200 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes ringGlow {
                    0%, 100% {
                        transform: rotate(0deg) scale(1);
                        filter: brightness(1) drop-shadow(0 0 20px rgba(254, 240, 138, 0.5));
                    }
                    25% {
                        transform: rotate(8deg) scale(1.02);
                        filter: brightness(1.2) drop-shadow(0 0 30px rgba(254, 240, 138, 0.8));
                    }
                    50% {
                        transform: rotate(0deg) scale(1.05);
                        filter: brightness(1.1) drop-shadow(0 0 25px rgba(254, 240, 138, 0.6));
                    }
                    75% {
                        transform: rotate(-8deg) scale(1.02);
                        filter: brightness(1.2) drop-shadow(0 0 30px rgba(254, 240, 138, 0.8));
                    }
                }
                
                @keyframes electricRing {
                    0%, 100% {
                        transform: rotate(12deg) scale(1);
                        filter: brightness(1);
                    }
                    50% {
                        transform: rotate(22deg) scale(1.1);
                        filter: brightness(1.3) hue-rotate(10deg);
                    }
                }
                
                @keyframes spark {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1) rotate(0deg);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.5) rotate(180deg);
                    }
                }
            `}</style>
        </section>
    );
};

export default ContactHero;