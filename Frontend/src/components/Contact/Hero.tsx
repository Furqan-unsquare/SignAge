import { Star, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/UI/button';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-100">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.8s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full text-white font-medium mb-8 shadow-lg">
                        <Star className="w-4 h-4 mr-2" />
                        #1 Signage Solutions Provider
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            ELECTRIFY
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">YOUR BRAND</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-purple-700 mb-8 max-w-3xl mx-auto leading-relaxed font-bold">
                        From neon masterpieces to digital displays, we create
                        <span className="text-orange-600 font-black"> eye-catching signage </span>
                        that makes your business impossible to ignore.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link to="/contact">
                            <Button size="lg" className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 text-white font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-teal-500/50 group">
                                Start Your Project
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 px-8 py-4 rounded-full font-bold">
                            View Portfolio
                        </Button>
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        {['Custom Neon Signs', 'LED Displays', 'Business Signs', 'Restaurant Signage', 'Event Banners'].map((tag, index) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-purple-700 font-bold border border-orange-200 hover:border-orange-400 transition-colors duration-300"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Floating Signage Elements */}
                <div className="absolute top-1/4 left-8 hidden lg:block">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center animate-pulse shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div className="absolute bottom-1/4 right-8 hidden lg:block">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg" style={{ animationDelay: '1.5s' }}>
                        <Star className="w-10 h-10 text-white" />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
            </div>
        </section>
    );
};

export default Hero;
