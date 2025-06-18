import { Check, Zap, Clock, Star, Shield } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Zap,
            title: 'Lightning Fast Turnaround',
            description: 'From concept to installation in record time without compromising quality.',
            stat: '48hrs',
            label: 'Average delivery'
        },
        {
            icon: Star,
            title: 'Premium Quality Materials',
            description: 'Only the finest materials and cutting-edge technology for lasting brilliance.',
            stat: '10+',
            label: 'Year warranty'
        },
        {
            icon: Shield,
            title: 'Weather Resistant',
            description: 'Built to withstand any weather condition while maintaining vibrant colors.',
            stat: '100%',
            label: 'Weatherproof'
        },
        {
            icon: Clock,
            title: '24/7 Support',
            description: 'Round-the-clock technical support and maintenance services.',
            stat: '24/7',
            label: 'Support available'
        }
    ];

    const benefits = [
        'Custom design consultation',
        'Professional installation',
        'Energy-efficient LED technology',
        'Remote control capabilities',
        'Mobile app integration',
        'Maintenance & repair services'
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Features */}
                    <div>
                        <h2 className="text-5xl md:text-6xl font-black mb-8">
                            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">WHY CHOOSE </span>
                            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">US?</span>
                        </h2>

                        <p className="text-xl text-purple-700 mb-12 leading-relaxed font-bold">
                            We don't just make signs—we create experiences that captivate, engage, and convert your audience into customers.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Stat */}
                                    <div className="text-center mb-4">
                                        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-xl hover:shadow-teal-500/50">
                                            <feature.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">{feature.stat}</div>
                                        <div className="text-sm text-orange-600 font-bold">{feature.label}</div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold text-purple-700 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-purple-600 text-sm font-medium">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Benefits */}
                    <div className="lg:pl-8">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-orange-200 hover:border-orange-400 transition-colors duration-300 shadow-xl hover:shadow-orange-500/20">
                            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                                What You Get
                            </h3>

                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={benefit}
                                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-yellow-50/80 transition-colors duration-300"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-purple-700 font-bold">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-8 text-center">
                                <button className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-teal-500/50">
                                    Get Started Today
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;