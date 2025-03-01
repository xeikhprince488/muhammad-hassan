import { Heart, Mail, Facebook, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Share Hassan's Joy</h3>
            <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 px-2">
              Help us celebrate this special moment by sharing with friends and family.
            </p>

            <div className="flex justify-center space-x-3 sm:space-x-4">
              <button className="bg-white text-pink-500 p-2 sm:p-3 rounded-full transform transition-transform hover:scale-110 hover:rotate-6">
                <Facebook size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button className="bg-white text-pink-500 p-2 sm:p-3 rounded-full transform transition-transform hover:scale-110 hover:rotate-6">
                <Twitter size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button className="bg-white text-pink-500 p-2 sm:p-3 rounded-full transform transition-transform hover:scale-110 hover:rotate-6">
                <Instagram size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button className="bg-white text-pink-500 p-2 sm:p-3 rounded-full transform transition-transform hover:scale-110 hover:rotate-6">
                <Mail size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 sm:pt-8 text-center">
            <div className="flex justify-center items-center mb-3 sm:mb-4">
              <Heart className="text-white mr-2" size={16} fill="currentColor" />
              <p className="text-base sm:text-lg font-medium">Hassan's Joy</p>
            </div>
            <p className="text-xs sm:text-sm opacity-75 px-2">
              Created with love for our precious little Hassan © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

