import { Zap, Sparkles, Eye, Heart } from 'lucide-react';

const NeonCraftSection = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                
                {/* Electric lines */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-pulse"></div>
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-pulse delay-500"></div>
                    <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent animate-pulse delay-1500"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Content Side */}
                    <div className="space-y-8">
                        {/* Neon-style title */}
                        <div className="relative">
                            <div className="absolute inset-0 blur-sm">
                                <h2 className="text-5xl md:text-6xl font-black text-yellow-400 leading-tight">
                                    100% IN-HOUSE
                                    <br />
                                    <span className="text-white">NEON MAGIC</span>
                                </h2>
                            </div>
                            <h2 className="relative text-5xl md:text-6xl font-black text-yellow-400 leading-tight drop-shadow-2xl">
                                100% IN-HOUSE
                                <br />
                                <span className="text-white">NEON MAGIC</span>
                            </h2>
                        </div>

                        {/* Glowing description */}
                        <div className="space-y-4">
                            <p className="text-xl text-yellow-100 leading-relaxed">
                                From concept to creation, every neon sign is crafted with passion in our Mumbai studio.
                            </p>
                            <p className="text-lg text-yellow-200/80">
                                Our master craftsmen bend, shape, and electrify each piece to perfection - 
                                <span className="text-yellow-300 font-bold"> bringing your vision to life with authentic neon glow</span>.
                            </p>
                        </div>

                        {/* Feature highlights with neon styling */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white group-hover:animate-pulse">
                                    <Eye className="w-5 h-5 text-gray-800" />
                                </div>
                                <span className="text-yellow-100 font-semibold">Hand-Crafted Design</span>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white group-hover:animate-pulse">
                                    <Zap className="w-5 h-5 text-gray-800" />
                                </div>
                                <span className="text-yellow-100 font-semibold">Authentic Neon Glow</span>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white group-hover:animate-pulse">
                                    <Sparkles className="w-5 h-5 text-gray-800" />
                                </div>
                                <span className="text-yellow-100 font-semibold">Premium Materials</span>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white group-hover:animate-pulse">
                                    <Heart className="w-5 h-5 text-gray-800" />
                                </div>
                                <span className="text-yellow-100 font-semibold">Made with Love</span>
                            </div>
                        </div>

                        {/* CTA Button with neon effect */}
                        {/* <div className="relative inline-block">
                            <div className="absolute inset-0 bg-yellow-400 rounded-lg blur-md opacity-60 animate-pulse"></div>
                            <button className="relative bg-yellow-400 border-4 border-white text-gray-800 font-black px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 flex items-center space-x-2">
                                <span>SEE OUR CRAFT IN ACTION</span>
                                <Zap className="w-5 h-5 animate-bounce" />
                            </button>
                        </div> */}
                    </div>

                    {/* Image Side - Neon Frame */}
                    <div className="relative">
                        {/* Neon border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-2xl blur-sm opacity-60 animate-pulse"></div>
                        <div className="absolute inset-2 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 rounded-xl blur-xs opacity-40"></div>
                        
                        {/* Main image container */}
                        <div className="relative bg-gray-800 rounded-2xl border-4 border-yellow-400 overflow-hidden shadow-2xl">
                            {/* Corner bolts */}
                            <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white z-10"></div>
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white z-10"></div>
                            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white z-10"></div>
                            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white z-10"></div>
                            
                            {/* Placeholder for image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                        <Sparkles className="w-10 h-10 text-gray-800" />
                                    </div>
                                    <p className="text-yellow-300 font-bold text-lg">Your Amazing Craft Image Here</p>
                                    <p className="text-yellow-400/60 text-sm">Replace with actual workshop photo</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements around the frame */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-300 opacity-80"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-300 rounded-full animate-bounce delay-700 opacity-70"></div>
                        <div className="absolute top-1/2 -left-6 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes glow {
                    0%, 100% { 
                        text-shadow: 0 0 20px rgba(254, 240, 138, 0.8),
                                     0 0 30px rgba(254, 240, 138, 0.6),
                                     0 0 40px rgba(254, 240, 138, 0.4);
                    }
                    50% { 
                        text-shadow: 0 0 10px rgba(254, 240, 138, 0.6),
                                     0 0 20px rgba(254, 240, 138, 0.4),
                                     0 0 30px rgba(254, 240, 138, 0.2);
                    }
                }
            `}</style>
        </section>
    );
};

export default NeonCraftSection;