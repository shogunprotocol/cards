'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon, SparklesIcon, WalletIcon, CreditCardIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const slides = [
  {
    id: 'hero',
    content: (
      <div className="text-center space-y-8">
        <h1 className="text-3xl font-bold text-black">
          ShogunCard
          <span className="block text-xl mt-2 text-gray-500 font-normal">
            AI-Powered Treasury for Your Crypto Cards
          </span>
        </h1>
        <p className="text-gray-600">
          Earn yield. Stay liquid. Spend instantly.
        </p>
      </div>
    )
  },
  {
    id: 'problem',
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-black text-center">
          Managing crypto card liquidity sucks.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <CreditCardIcon className="h-6 w-6 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-center text-sm">Manual fund transfers</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <WalletIcon className="h-6 w-6 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-center text-sm">Idle funds don't earn</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <ChartBarIcon className="h-6 w-6 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-center text-sm">Poor user experience</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'solution',
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-black text-center">Enter ShogunCard</h2>
        <div className="aspect-[1.586/1] max-w-lg mx-auto flex flex-col justify-between p-6 rounded-2xl shadow-xl relative overflow-hidden bg-[#1E3A8A]">
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full -top-24 -right-24" />
            <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full -bottom-24 -left-24" />
          </div>
          <div className="relative">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-2xl font-light text-white">Moonwell × CYPHER</span>
                <span className="text-xs mt-1 text-blue-200">Smart Treasury Card</span>
              </div>
              <img src="/visa02.png" alt="Visa" className="h-6 brightness-200" />
            </div>
          </div>
          <div className="relative">
            <p className="font-mono text-lg text-white/80">•••• 5678</p>
            <div className="mt-2">
              <p className="text-xs text-blue-200">Balance</p>
              <p className="text-xl font-bold text-white">$1234.56</p>
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
        <h2 className="text-3xl font-bold text-black text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <p className="text-2xl font-bold text-gray-900 mb-4">01</p>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Add Your Cards</h3>
            <p className="text-gray-500 text-sm">Connect any crypto card with its wallet address</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <p className="text-2xl font-bold text-gray-900 mb-4">02</p>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Deposit Crypto</h3>
            <p className="text-gray-500 text-sm">Fund your vault once and earn yield</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <p className="text-2xl font-bold text-gray-900 mb-4">03</p>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Let AI Handle It</h3>
            <p className="text-gray-500 text-sm">Smart treasury manages your liquidity</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ai-treasury',
    content: (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-black text-center">
          An AI That Understands You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Engine</h3>
            <p className="text-gray-500 text-sm">
              Analyzes spending patterns to predict liquidity needs
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Yield Optimizer</h3>
            <p className="text-gray-500 text-sm">
              Maximizes returns on idle funds while maintaining liquidity
            </p>
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