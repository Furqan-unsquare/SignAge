import { Zap, Sparkles, Eye, Heart } from 'lucide-react';

const NeonCraftSection = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            100% IN-HOUSE
                            <br />
                            <span className="text-yellow-300">NEON MAGIC</span>
                        </h2>

                        <div className="space-y-4">
                            <p className="text-lg text-yellow-100">
                                From concept to creation, every neon sign is crafted with passion in our Mumbai studio.
                            </p>
                            <p className="text-xsm text-yellow-200">
                                Our master craftsmen bend, shape, and electrify each piece to perfection.
                            </p>
                        </div>

                        {/* Feature highlights */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                            {[
                                { icon: <Eye className="w-5 h-5" />, text: "Hand-Crafted Design" },
                                { icon: <Sparkles className="w-5 h-5" />, text: "Premium Materials" },
                                { icon: <Zap className="w-5 h-5" />, text: "Authentic Neon Glow" },
                                { icon: <Heart className="w-5 h-5" />, text: "Made with Love" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className=" w-10 h-10 md:bg-yellow-400/20 rounded-full flex items-center justify-center md:border border-yellow-300">
                                        {item.icon}
                                    </div>
                                    <span className="text-yellow-100 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <button
                        onClick={() => window.location.href = '/work'} 
                        className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                            See Our Craft
                            <Zap className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Image Side */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-xl overflow-hidden border-2 border-yellow-300 shadow-lg">
                            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <img 
                                    src="https://i.pinimg.com/736x/07/e2/ec/07e2ec074af3cc99c9168ace13d569e9.jpg" 
                                    alt="Neon sign craftsmanship" 
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NeonCraftSection;