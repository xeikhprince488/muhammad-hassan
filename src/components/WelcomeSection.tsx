"use client"

import { useEffect, useState } from "react"
import { Heart, Star } from "lucide-react"

const WelcomeSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; size: number }[]>([])

  useEffect(() => {
    setIsVisible(true)

    // Create floating hearts animation
    const interval = setInterval(() => {
      setFloatingHearts((prev) => {
        // Remove hearts that have been around for a while
        const filtered = prev.filter((heart) => heart.id > Date.now() - 5000)

        // Add a new heart
        return [
          ...filtered,
          {
            id: Date.now(),
            x: Math.random() * 100, // Random horizontal position
            size: Math.random() * 20 + 10, // Random size between 10-30px
          },
        ]
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Handle navigation to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="welcome"
      className="min-h-[90vh] flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 relative overflow-hidden px-4 sm:px-6"
    >
      {/* Floating hearts animation - reduced number on mobile */}
      {floatingHearts.slice(0, window.innerWidth < 640 ? 5 : floatingHearts.length).map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float opacity-70"
          style={{
            left: `${heart.x}%`,
            bottom: "0",
            fontSize: `${heart.size}px`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <Heart className="text-pink-400" />
        </div>
      ))}

      <div
        className={`text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="inline-block bg-pink-100 p-2 sm:p-3 rounded-full mb-4 sm:mb-6 animate-bounce">
          <Star className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 leading-tight">
          Welcome Hussain to the World!
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed">
          With hearts full of joy, we celebrate the arrival of our precious little Hussain. A new journey begins, filled
          with love, laughter, and countless beautiful moments.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            className="btn-primary transform transition-transform hover:scale-105 hover:-rotate-2 py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base rounded-lg sm:rounded-xl"
            onClick={() => scrollToSection("gallery")}
          >
            View Gallery
          </button>
          <button
            className="btn-secondary transform transition-transform hover:scale-105 hover:rotate-2 py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base rounded-lg sm:rounded-xl"
            onClick={() => scrollToSection("guestbook")}
          >
            Sign Guestbook
          </button>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection

