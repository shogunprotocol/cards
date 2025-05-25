'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon, SparklesIcon, WalletIcon, CreditCardIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const slides = [
  {
    id: 'mess-text',
    content: (
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-16">
        <h1 className="text-6xl text-black text-center leading-tight">
          <span className="font-extrabold">Cards &amp; DeFi</span> are a mess.
        </h1>
      </div>
    )
  },
  {
    id: 'mess-img',
    content: (
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10 min-h-[60vh]">
        <div className="md:w-1/2 w-full flex justify-center md:justify-end">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center md:text-left max-w-xs md:max-w-lg">
            This is what most wallets look like.
          </h2>
        </div>
        <div className="md:w-1/2 w-full flex justify-center md:justify-start">
          <img src="/walletExample.jpeg" alt="Wallet Mess Example" className="max-w-[300px] md:max-w-[360px] rounded-2xl shadow-xl border border-gray-200" />
        </div>
      </div>
    )
  },
  {
    id: 'hero',
    content: (
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-black">
          ShogunCard
          <span className="block text-2xl md:text-3xl mt-4 text-gray-500 font-normal">
            <span className="font-extrabold text-black">AI</span>-Powered Treasury for Your Crypto Cards
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mt-4">
          Earn yield. Stay liquid. Spend instantly.
        </p>
      </div>
    )
  },
  {
    id: 'problem',
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black text-center">
          Managing crypto card liquidity sucks.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <CreditCardIcon className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-center text-lg">
              <span className="font-bold">Manual</span> fund transfers
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <WalletIcon className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-center text-lg">
              <span className="font-bold">Idle funds</span> don't earn
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <ChartBarIcon className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-center text-lg">
              <span className="font-bold">Poor user experience</span>
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'solution',
    content: (
      <div className="space-y-8">
        <h2 className="text-5xl md:text-6xl text-black text-center mb-8">
          Enter <span className="font-extrabold">ShogunCard</span>
        </h2>
        <div className="aspect-[1.586/1] max-w-lg mx-auto flex flex-col justify-between p-6 rounded-2xl shadow-xl relative overflow-hidden bg-[#E84142]">
          {/* Avalanche Card Background Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full flex items-center justify-center" style={{ width: '120px', height: '120px' }}>
              <img src="/avaxLogo.png" alt="Avalanche" className="w-32 h-32" />
            </div>
          </div>
          {/* Card Content */}
          <div className="relative">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-2xl font-light text-white">Visa Avalanche</span>
                <span className="text-xs mt-1 text-red-200">Smart Treasury Card</span>
              </div>
              <img src="/visa02.png" alt="Visa" className="h-6 brightness-200" />
            </div>
          </div>
          <div className="relative">
            <p className="font-mono text-lg text-white/80">•••• def0</p>
            <div className="mt-2">
              <p className="text-xs text-red-200">Balance</p>
              <p className="text-xl font-bold text-white">$2345.67</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="p-6 min-h-[160px] min-w-[220px] md:min-w-[240px] max-w-md flex flex-col justify-center bg-white rounded-2xl border border-gray-100">
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">01</p>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Add Your Cards</h3>
            <p className="text-base md:text-lg text-gray-500 text-center">Connect any crypto card with its wallet address</p>
          </div>
          <div className="p-6 min-h-[160px] min-w-[220px] md:min-w-[240px] max-w-md flex flex-col justify-center bg-white rounded-2xl border border-gray-100">
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">02</p>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Deposit Crypto</h3>
            <p className="text-base md:text-lg text-gray-500 text-center">Fund your vault once and earn yield</p>
          </div>
          <div className="p-6 min-h-[160px] min-w-[220px] md:min-w-[240px] max-w-md flex flex-col justify-center bg-white rounded-2xl border border-gray-100">
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">03</p>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Let AI Handle It</h3>
            <p className="text-base md:text-lg text-gray-500 text-center">Smart treasury manages your liquidity</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ai-treasury',
    content: (
      <div className="space-y-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-black text-center">
          An AI That Understands You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
          <div className="p-10 min-h-[200px] flex flex-col justify-center bg-white rounded-2xl border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Learning Engine</h3>
            <p className="text-lg md:text-xl text-gray-500">
              Analyzes spending patterns to predict liquidity needs
            </p>
          </div>
          <div className="p-10 min-h-[200px] flex flex-col justify-center bg-white rounded-2xl border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Yield Optimizer</h3>
            <p className="text-lg md:text-xl text-gray-500">
              Maximizes returns on idle funds while maintaining liquidity
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'demo',
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black text-center">Demo</h2>
        <div className="flex justify-center">
          <div className="w-64 h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
            <video controls className="max-w-full max-h-full rounded-lg">
              <source src="/demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    )
  }
]

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === 'ArrowLeft') {
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="fixed left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 z-20"
        disabled={currentSlide === 0}
      >
        <ArrowLeftIcon className="h-6 w-6 text-gray-400" />
      </button>

      <button
        onClick={nextSlide}
        className="fixed right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white border border-gray-200 hover:border-gray-300 z-20"
      >
        <ArrowRightIcon className="h-6 w-6 text-gray-400" />
      </button>

      {/* Slide content */}
      <div className="container mx-auto px-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-black' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 