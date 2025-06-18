"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const collectionsData = [
    {
        id: 1,
        title: "Gaming",
        image: "/assets/photo2.jpeg",
        description: "LED Gaming Signs",
    },
    {
        id: 2,
        title: "Cafe & Restaurant",
        image: "/assets/photo2.jpeg",
        description: "Food & Beverage Signage",
    },
    {
        id: 3,
        title: "Neon Wings",
        image: "/assets/photo2.jpeg",
        description: "Decorative Wing Designs",
    },
    {
        id: 4,
        title: "Under ₹4000",
        image: "/assets/photo2.jpeg",
        description: "Budget-Friendly Options",
    },
    {
        id: 5,
        title: "Kids",
        image: "/assets/photo2.jpeg",
        description: "Children's Room Decor",
    },
    {
        id: 6,
        title: "Sports",
        image: "/assets/photo2.jpeg",
        description: "Sports Theme Signs",
    },
    {
        id: 7,
        title: "Music",
        image: "/assets/photo2.jpeg",
        description: "Musical Instruments",
    },
    {
        id: 8,
        title: "Love",
        image: "/assets/photo2.jpeg",
        description: "Romantic Designs",
    },
]

const Collections = () => {
    const [startIndex, setStartIndex] = useState(0)
    const itemsToShow = 5

    // Get the visible items based on current start index
    const getVisibleItems = () => {
        const items = []
        for (let i = 0; i < itemsToShow; i++) {
            const index = (startIndex + i) % collectionsData.length
            items.push(collectionsData[index])
        }
        return items
    }

    const nextSlide = () => {
        setStartIndex((prev) => (prev + 1) % collectionsData.length)
    }

    const prevSlide = () => {
        setStartIndex((prev) => (prev - 1 + collectionsData.length) % collectionsData.length)
    }

    const visibleItems = getVisibleItems()

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-[#EA3C1F] via-[#F26742] to-[#EB3C20] py-16 px-4">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider">
                            Explore Our Collections
                        </h2>
                        <div className="hidden md:block w-32 h-1 bg-[#fdca07] rounded-full"></div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-3">
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

            {/* Collections Horizontal Scroll */}
            <div className="max-w-7xl mx-auto">
                <div className="overflow-hidden">
                    <div className="flex gap-6 transition-transform duration-500 ease-in-out">
                        {visibleItems.map((collection, index) => (
                            <div
                                key={`${collection.id}-${startIndex}-${index}`}
                                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 flex-shrink-0 w-full max-w-xs"
                                style={{ minWidth: 'calc(20% - 1.2rem)' }}
                            >
                                {/* Collection Card */}
                                <div className="relative bg-black rounded-2xl overflow-hidden border-4 border-transparent hover:border-[#fdca07] transition-all duration-300">
                                    {/* Image Container */}
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={collection.image || "/placeholder.svg"}
                                            alt={collection.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-[#fdca07]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide mb-1">
                                                    {collection.title}
                                                </h3>
                                                <p className="text-sm text-gray-300 font-medium">{collection.description}</p>
                                            </div>

                                            {/* Arrow Indicator */}
                                            <div className="w-8 h-8 rounded-full bg-[#fdca07] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                                <ArrowRight className="w-4 h-4 text-black font-bold" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glow Effect on Hover */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_#fdca07] pointer-events-none"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Indicators */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2">
                    {collectionsData.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index >= startIndex && index < startIndex + itemsToShow
                                    ? "bg-[#fdca07] scale-125"
                                    : "bg-white/50"
                                }`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Current Item Counter */}
            <div className="absolute top-32 right-8 bg-black/50 rounded-lg px-4 py-2">
                <span className="text-white font-bold">
                    {startIndex + 1}-{Math.min(startIndex + itemsToShow, collectionsData.length)} of {collectionsData.length}
                </span>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 text-6xl font-black text-white transform rotate-12">NEON</div>
                <div className="absolute bottom-32 right-16 text-4xl font-black text-white transform -rotate-12">SIGNS</div>
                <div className="absolute top-1/2 left-1/4 text-8xl font-black text-white transform rotate-45 opacity-30">★</div>
            </div>
        </div>
    )
}

export default Collections