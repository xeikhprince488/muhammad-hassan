"use client"

import { useState, useEffect } from "react"
import { Heart, Menu, X } from "lucide-react"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle smooth scrolling for navigation
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { id: "welcome", label: "Welcome" },
    { id: "gallery", label: "Gallery" },
    { id: "countdown", label: "Milestones" },
    { id: "guestbook", label: "Guestbook" },
    { id: "namesuggestions", label: "Name" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="text-pink-500 animate-pulse" size={24} />
          <h1 className={`font-bold transition-all duration-500 ${isScrolled ? "text-xl" : "text-2xl"}`}>
            Hussain's Joy
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                  className="flex items-center hover:text-pink-500 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-pink-500 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="container mx-auto px-4">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                  className="block py-2 hover:text-pink-500 transition-colors text-lg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

