"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, Users, ThumbsUp } from "lucide-react"

const HassanGreeting = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const familyMembers = [
    {
      name: "Mom",
      relation: "Mother",
      message: "Thank you for carrying me for 9 months and bringing me into this world.",
    },
    { name: "Dad", relation: "Father", message: "Thank you for your love and support during my first days of life." },
    {
      name: "Siblings",
      relation: "Brothers & Sisters",
      message: "I can't wait to play with you when I grow a little bigger!",
    },
    {
      name: "Grandparents",
      relation: "Grandparents",
      message: "I'm excited to hear all your stories and wisdom as I grow.",
    },
    {
      name: "All Relatives",
      relation: "Relatives",
      message: "Thank you for all the warm wishes and gifts welcoming me to the family.",
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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      id="namesuggestions"
      ref={sectionRef}
      className={`py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-50 to-indigo-50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-indigo-100 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
            <Heart className="text-indigo-500 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Hello from Baby Hassan!</h2>
          <div
            className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="mb-3 sm:mb-4 px-2">
              Assalamu Alaikum and hello to everyone! I'm Muhammad Hassan, and I'm just 2 days old in this beautiful
              world!
            </p>
            <p className="px-2">
              I may not know many words yet, but my heart is full of love for my amazing parents who brought me into
              this world.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Special thanks to parents */}
          <div
            className={`bg-white rounded-lg shadow-lg p-5 sm:p-6 md:p-8 mb-8 sm:mb-10 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 mb-5 md:mb-0 flex justify-center">
                <div className="bg-indigo-100 p-4 sm:p-5 md:p-6 rounded-full">
                  <ThumbsUp className="text-indigo-600 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                </div>
              </div>
              <div className="w-full md:w-2/3 md:pl-6 lg:pl-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center md:text-left">
                  Special Thanks to My Parents
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  To my wonderful mother, I may not be able to speak yet, but I want you to know how much I love you.
                  Thank you for nurturing me before I was born and for all the cuddles and feedings these past two days.
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  To my amazing father, thank you for your gentle hands that hold me and your soothing voice that calms
                  me. I feel so safe and loved when you're near. I can't wait to grow and make you proud!
                </p>
              </div>
            </div>
          </div>

          {/* Greetings to family members */}
          <h3
            className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            Greetings to My New Family
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {familyMembers.map((member, index) => (
              <div
                key={member.name}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 transform ${
                  isVisible ? "translate-y-0 opacity-100 rotate-0" : "translate-y-10 opacity-0 rotate-2"
                }`}
                style={{ transitionDelay: `${index * 100 + 800}ms` }}
              >
                <div className="h-2 bg-indigo-500" />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{member.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">{member.relation}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{member.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message to the world */}
          <div
            className={`mt-8 sm:mt-10 md:mt-12 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "1400ms" }}
          >
            <div className="inline-block bg-indigo-100 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
              <Users className="text-indigo-500 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Hello to My New World</h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              I've only been here for 48 hours, but I already feel so much love! Everything is new and exciting to me. I
              spend most of my time sleeping, eating, and cuddling, but I'm looking forward to discovering this
              beautiful world with all of you by my side!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HassanGreeting

