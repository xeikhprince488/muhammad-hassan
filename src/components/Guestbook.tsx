"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, User } from "lucide-react"
import emailjs from "emailjs-com"

interface Message {
  id: number
  name: string
  message: string
  date: string
}

const Guestbook = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Uncle Ajmal and Khala Parveen",
      message: "We are so blessed to welcome little Hassan into our family. Can't wait to spoil you with love!",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Ahmad and Mehroz",
      message:
        "Congratulations on your new bundle of joy! Hassan is such a beautiful name. Wishing you all the happiness in the world.",
      date: "1 days ago",
    },
    {
      id: 3,
      name: "Anaya Fatima",
      message:
        "Hassan is such a precious little miracle! Looking forward to watching you grow and creating beautiful memories together.",
      date: "1 days ago",
    },
  ])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (name.trim() && message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        name,
        message,
        date: "Just now",
      }

      setMessages((prev) => [newMessage, ...prev])
      setName("")
      setMessage("")

      // Send email
      emailjs
        .send(
          "service_f29qzcs",
          "template_o84j8aa",
          {
            name,
            message,
          },
          "wEwrCShqLZuAxP23f",
        )
        .then(
          (response) => {
            console.log("Email sent successfully!", response.status, response.text)
          },
          (err) => {
            console.error("Failed to send email. Error:", err)
          },
        )
    }
  }

  return (
    <section
      id="guestbook"
      ref={sectionRef}
      className={`py-10 md:py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-green-100 p-2 md:p-3 rounded-full mb-3 md:mb-4">
            <MessageSquare className="text-green-500" size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">Hassan's Guestbook</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Leave a message for little Hassan to read in the future!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Message form */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 md:mb-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">Share Your Wishes for Hassan</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-1 md:mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-1 md:mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all h-24 md:h-32"
                  placeholder="Write your message for Hassan here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-[1.02]"
              >
                <Send size={16} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Messages display */}
          <div className="space-y-4 md:space-y-6">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`bg-white rounded-lg shadow-md p-4 sm:p-6 transition-all duration-500 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
                    <User className="text-gray-500" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <h4 className="font-bold text-base sm:text-lg truncate">{msg.name}</h4>
                      <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">{msg.date}</span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 break-words">{msg.message}</p>
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

export default Guestbook

