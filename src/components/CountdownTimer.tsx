"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Calculate the milestone date (Feb 27 of next year)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Calculate the target date (Feb 27 of current or next year)
    const calculateTargetDate = () => {
      const now = new Date()
      const currentYear = now.getFullYear()

      // Set to Feb 27 of current year
      const targetDate = new Date(currentYear, 1, 27) // Month is 0-indexed, so 1 = February

      // If Feb 27 of this year has already passed, set to Feb 27 of next year
      if (now > targetDate) {
        targetDate.setFullYear(currentYear + 1)
      }

      return targetDate
    }

    const targetDate = calculateTargetDate()

    // Set up intersection observer
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

    // Calculate time left function
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If countdown is over, recalculate for next year
        const newTargetDate = calculateTargetDate()
        const newDifference = newTargetDate.getTime() - new Date().getTime()

        setTimeLeft({
          days: Math.floor(newDifference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((newDifference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((newDifference / 1000 / 60) % 60),
          seconds: Math.floor((newDifference / 1000) % 60),
        })
      }
    }

    // Initial calculation
    calculateTimeLeft()

    // Set up interval
    const timer = setInterval(calculateTimeLeft, 1000)

    // Cleanup
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      clearInterval(timer)
    }
  }, []) // No dependencies needed as we're calculating everything inside [^1]

  const milestones = [
    { title: "First Smile", description: "Around 6-8 weeks", icon: "😊" },
    { title: "First Laugh", description: "Around 3-4 months", icon: "😄" },
    { title: "Sitting Up", description: "Around 6 months", icon: "👶" },
    { title: "First Words", description: "Around 12 months", icon: "🗣️" },
  ]

  // Format the target date for display
  const formatTargetDate = () => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const targetDate = new Date(currentYear, 1, 27)

    if (now > targetDate) {
      targetDate.setFullYear(currentYear + 1)
    }

    return targetDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className={`py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-50 to-pink-50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-purple-100 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
            <Calendar className="text-purple-500 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Upcoming Milestones</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Counting down to all the special moments in our baby's journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main countdown timer */}
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 transform transition-transform hover:scale-[1.02]">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-1 sm:mb-2">Next Birthday</h3>
            <p className="text-center text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Counting down to {formatTargetDate()}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-2 sm:p-3 md:p-4 mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums">
                      {value.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-gray-600 capitalize">{unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-4 sm:p-6 transition-all duration-500 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start">
                  <div className="text-2xl sm:text-3xl md:text-4xl mr-3 sm:mr-4">{milestone.icon}</div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{milestone.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountdownTimer
