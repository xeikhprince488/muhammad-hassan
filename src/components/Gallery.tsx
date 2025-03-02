"use client"

import { useState, useEffect, useRef } from "react"
import { Camera, ChevronLeft, ChevronRight } from "lucide-react"

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const babyImages = [
    {
      url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Hussain's first day home",
    },
    {
      url: "https://images.unsplash.com/photo-1544126592-807ade215a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Peaceful dreams",
    },
    {
      url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Hussain's tiny fingers",
    },
    {
      url: "https://images.unsplash.com/photo-1610122748280-d0ae76b10750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Hussain's first smile",
    },
    {
      url: "https://images.unsplash.com/photo-1537673156864-5d2c72de7824?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Bath time fun",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Auto-rotate images
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % babyImages.length)
    }, 5000)

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      clearInterval(interval)
    }
  }, []) // Removed unnecessary dependency: babyImages.length

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % babyImages.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + babyImages.length) % babyImages.length)
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={`py-10 sm:py-16 md:py-20 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block bg-blue-100 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
            <Camera className="text-blue-500 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">Hussain's Precious Moments</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto">
            Capturing the beautiful journey of our little Hussain, one smile at a time.
          </p>
        </div>

        <div className="relative max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
          {/* Main carousel */}
          <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl">
            {babyImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === activeIndex
                    ? "opacity-100 transform-none"
                    : index < activeIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback image if the original one fails to load
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 md:p-6">
                  <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons - larger touch targets on mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          {/* Indicators - more touch-friendly on mobile */}
          <div className="flex justify-center mt-3 sm:mt-4 space-x-1.5 sm:space-x-2">
            {babyImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 sm:h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-blue-500 w-4 sm:w-6" : "bg-gray-300 w-2 sm:w-3"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails for larger screens */}
        <div className="hidden md:flex justify-center mt-6 space-x-2 max-w-4xl mx-auto overflow-x-auto pb-2">
          {babyImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-md overflow-hidden transition-all ${
                index === activeIndex ? "ring-2 ring-blue-500 scale-105" : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery

