import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const collectionsData = [
  {
    id: 1,
    title: "Acrylic Letter",
    image: "/assets/1.jpg",
    category: "acrylic",
    description: "Vibrant, glossy acrylic letters perfect for indoor and outdoor branding.",
  },
  {
    id: 2,
    title: "Aluminium Channel",
    image: "/assets/2.jpg",
    category: "aluminium",
    description: "Durable, professional signage ideal for corporate and commercial spaces.",
  },
  {
    id: 3,
    title: "3D Steel Signage",
    image: "/assets/3.jpg",
    category: "3d-steel",
    description: "Premium stainless steel letters that offer bold depth and luxury appeal.",
  },
  {
    id: 4,
    title: "Printed Name Plate",
    image: "/assets/8.jpg",
    category: "office-name",
    description: "Custom printed plates for desks, doors, and offices with a clean finish.",
  },
  {
    id: 5,
    title: "Glow Signs",
    image: "/assets/5.jpg",
    category: "glow-sign",
    description: "Illuminated boards that shine brightly at night for high visibility.",
  },
  {
    id: 6,
    title: "LED Scrolling Signs",
    image: "/assets/9.jpg",
    category: "led-scrolling",
    description: "Dynamic LED boards for scrolling text—ideal for announcements and ads.",
  },
];

const Collections = () => {
    const navigate = useNavigate(); // Changed from useHistory to useNavigate
    const [startIndex, setStartIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);
    const itemsToShow = 5;

    // Handle touch/mouse events for mobile scrolling
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Auto-scroll on mobile
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollPosition = container.scrollLeft;
            const itemWidth = container.scrollWidth / collectionsData.length;
            const newIndex = Math.round(scrollPosition / itemWidth);
            setStartIndex(newIndex);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation functions for desktop
    const nextSlide = () => {
        setStartIndex((prev) => (prev + 1) % collectionsData.length);
    };

    const prevSlide = () => {
        setStartIndex((prev) => (prev - 1 + collectionsData.length) % collectionsData.length);
    };

    // Navigate to blogs
    const navigateToBlogs = (category) => {
  window.location.href = `/work#project?category=${category}`;
};

    // Get visible items for desktop
    const getVisibleItems = () => {
        const items = [];
        for (let i = 0; i < itemsToShow; i++) {
            const index = (startIndex + i) % collectionsData.length;
            items.push(collectionsData[index]);
        }
        return items;
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="relative min-h-full py-8 md:py-14 md:pl-4">
            {/* Header Section */}
            <div className="px-4 md:px-10 mx-auto md:mb-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center md:gap-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider">
                            Explore Our Collections
                        </h2>
                    </div>

                    {/* Navigation Arrows - Desktop Only */}
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border-2 border-white bg-transparent hover:bg-white hover:text-[#EA3C1F] text-white transition-all duration-300 flex items-center justify-center group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border-2 border-white bg-transparent hover:bg-white hover:text-[#EA3C1F] text-white transition-all duration-300 flex items-center justify-center group"
                        >
                            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Collections Container */}
            <div className="md:pl-10 pb-5 mx-auto">
                {/* Mobile Scroll Container */}
                <div 
                    ref={containerRef}
                    className="md:hidden flex gap-4 overflow-x-auto scroll-snap-x-mandatory scrollbar-hide py-4 px-2"
                    style={{ scrollSnapType: 'x mandatory' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => handleMouseDown(e.touches[0])}
                    onTouchMove={(e) => handleMouseMove(e.touches[0])}
                    onTouchEnd={handleMouseUp}
                >
                    {collectionsData.map((collection) => (
                        <div
                            key={collection.id}
                            className="flex-shrink-0 w-4/5 scroll-snap-align-start"
    onClick={() => navigateToBlogs(collection.category)}
                        >
                            <div className="group cursor-pointer transform transition-all duration-500 ">
                                <div className="relative bg-black rounded-2xl overflow-hidden border-4 border-transparent hover:border-[#fdca07] transition-all duration-300">
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={collection.image || "/placeholder.svg"}
                                            alt={collection.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute inset-0 bg-[#fdca07]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex items-center justify-between ">
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide mb-1">
                                                    {collection.title}
                                                </h3>
                                                <p className="text-sm text-gray-300 font-medium max-w-40 line-clamp-2">{collection.description}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-[#fdca07] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                                <ArrowRight className="w-4 h-4 text-black font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_#fdca07] pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Collections */}
                <div className="hidden md:block overflow-hidden">
                    <div className="flex gap-6 transition-transform duration-500 ease-in-out">
                        {visibleItems.map((collection) => (
                            <div
                                key={collection.id}
                                className="group cursor-pointer transform transition-all duration-500 hover:scale-5 flex-shrink-0 w-full max-w-xs"
                                style={{ minWidth: 'calc(20% - 1.2rem)' }}
                                onClick={() => navigateToBlogs(collection.category)}>
                                <div className="relative bg-black rounded-2xl overflow-hidden border-4 border-transparent hover:border-[#fdca07] transition-all duration-300">
                                    <div className="relative h-80  overflow-hidden">
                                        <img
                                            src={collection.image || "/placeholder.svg"}
                                            alt={collection.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute inset-0 bg-[#fdca07]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                       <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide mb-1">
                                            {collection.title}
                                            </h3>
                                            <p className="text-sm text-gray-300 font-medium line-clamp-1">
                                            {collection.description}
                                            </p>
                                        </div>

                                        {/* Arrow Icon Button */}
                                        <div className="min-w-[40px] min-h-[40px] rounded-full bg-[#fdca07] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                            <ArrowRight className="w-5 h-5 text-black" />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_#fdca07] pointer-events-none"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collections;