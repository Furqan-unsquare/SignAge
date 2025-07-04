"use client"
import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from 'react-router-dom'
import {
  Zap, Frame, Image, Type, Box, Menu, X
} from "lucide-react"

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const handleTouchStart = () => setIsDragging(true)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0].clientX > 50 && !isOpen) {
      setIsOpen(true)
      setIsDragging(false)
    }
  }
  const handleTouchEnd = () => setIsDragging(false)

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        ref={toggleRef}
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`fixed z-50 left-4 top-96 md:top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 border-2 border-gray-700 shadow-lg transition-all hover:bg-gray-700 ${
          isOpen ? "rotate-90" : ""
        }`}
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Manually Placed Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-96 md:top-1/2 left-4 transform -translate-y-1/2 z-40 bg-gray-900 rounded-xl px-3 py-4 shadow-xl transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}`}>
        <ul className="space-y-2">
          <li>
            <Link
              to="/neonCustom"
              className={`flex items-center gap-3 px-4 py-2 text-sm rounded-full transition-all ${
                location.pathname === "/neonCustom"
                  ? "bg-yellow-400 text-black font-semibold"
                  : "hover:bg-gray-800 text-white"
              } active:scale-95 active:ring-2 active:ring-yellow-500`}
              onClick={() => setIsOpen(false)}
            >
              <Zap className="w-5 h-5" />
              <span>Neon Custom</span>
            </Link>
          </li>
          <li>
            <Link
              to="/framerCustom"
              className={`flex items-center gap-3 px-4 ml-2 py-2 text-sm rounded-full transition-all ${
                location.pathname === "/framerCustom"
                  ? "bg-yellow-400 text-black font-semibold"
                  : "hover:bg-gray-800 text-white"
              } active:scale-95 active:ring-2 active:ring-yellow-500`}
              onClick={() => setIsOpen(false)}
            >
              <Frame className="w-5 h-5" />
              <span>Framer Custom</span>
            </Link>
          </li>
          <li>
            <Link
              to="/bannerCustom"
              className={`flex items-center gap-3 px-4 ml-5 py-2 text-sm rounded-full transition-all ${
                location.pathname === "/bannerCustom"
                  ? "bg-yellow-400 text-black font-semibold"
                  : "hover:bg-gray-800 text-white"
              } active:scale-95 active:ring-2 active:ring-yellow-500`}
              onClick={() => setIsOpen(false)}
            >
              <Image className="w-5 h-5" />
              <span>Banner Custom</span>
            </Link>
          </li>
          <li>
            <Link
              to="/signage"
              className={`flex items-center gap-3 px-4 ml-2 py-2 text-sm rounded-full transition-all ${
                location.pathname === "/signage"
                  ? "bg-yellow-400 text-black font-semibold"
                  : "hover:bg-gray-800 text-white"
              } active:scale-95 active:ring-2 active:ring-yellow-500`}
              onClick={() => setIsOpen(false)}
            >
              <Type className="w-5 h-5" />
              <span>Signage</span>
            </Link>
          </li>
          <li>
            <Link
              to="/packages"
              className={`flex items-center gap-3 px-4 py-2 text-sm rounded-full transition-all ${
                location.pathname === "/packages"
                  ? "bg-yellow-400 text-black font-semibold"
                  : "hover:bg-gray-800 text-white"
              } active:scale-95 active:ring-2 active:ring-yellow-500`}
              onClick={() => setIsOpen(false)}
            >
              <Box className="w-5 h-5" />
              <span>Packages</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
