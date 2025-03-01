import React, { useState, useEffect } from 'react';
import { Heart, Gift, Calendar, MessageSquare, BookOpen, Share2, Mail, Camera, Star, Sparkles } from 'lucide-react';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import Gallery from './components/Gallery';
import CountdownTimer from './components/CountdownTimer';
import Guestbook from './components/Guestbook';
import NameSuggestions from './components/NameSuggestions';
import Footer from './components/Footer';
import Confetti from './components/Confetti';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Show confetti after a short delay when the page loads
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 1000);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 text-gray-800 overflow-x-hidden">
      {showConfetti && <Confetti />}
      <Header />
      <main className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <Gallery />
        <CountdownTimer />
        <Guestbook />
        <NameSuggestions />
      </main>
      <Footer />
    </div>
  );
}

export default App;