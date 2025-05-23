'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { WalletIcon, ChartBarIcon, Cog6ToothIcon, PlusIcon, CreditCardIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import WalletManager from './components/WalletManager'
import VaultManager from './components/VaultManager'
import AddCardModal from './components/AddCardModal'
import { Card, VaultState } from './types'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const [showAddCard, setShowAddCard] = useState(false)
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      name: 'Moonwell × CYPHER',
      address: '0x1234...5678',
      chain: 'Ethereum',
      balance: 1234.56,
      type: 'moonwell',
      lastActivity: {
        type: 'top-up',
        amount: 500,
        timestamp: new Date()
      }
    },
    {
      id: '2',
      name: 'Offramp',
      address: '0x8765...4321',
      chain: 'Polygon',
      balance: 856.32,
      type: 'default',
      lastActivity: {
        type: 'spend',
        amount: 50,
        timestamp: new Date()
      }
    }
  ])
  
  const [vaultState, setVaultState] = useState<VaultState>({
    totalDeposited: 5000,
    currentYield: 4.2,
    projectedApy: 16.67,
    strategy: 'Aave USDC Pool'
  })

  const handleAddCard = (cardData: Omit<Card, 'id' | 'balance' | 'lastActivity'>) => {
    const newCard: Card = {
      ...cardData,
      id: uuidv4(),
      balance: 0,
    }
    setCards(prev => [...prev, newCard])
  }

  const handleDeposit = (amount: number) => {
    setVaultState(prev => ({
      ...prev,
      totalDeposited: prev.totalDeposited + amount
    }))
  }

  const handleTopUp = (cardId: string, amount: number) => {
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        return {
          ...card,
          balance: card.balance + amount,
          lastActivity: {
            type: 'top-up',
            amount,
            timestamp: new Date()
          }
        }
      }
      return card
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      {/* <nav className="fixed w-full bg-black/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <WalletIcon className="h-8 w-8 text-white" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                    Networks
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                    Use
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                    Support
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                    Business
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                    Blog
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <GlobeAltIcon className="h-5 w-5 text-gray-300" />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-gray-300 hover:text-white"
              >
                <span>lautaro.suarez.dev@gmail.com</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="pt-24 p-8 md:p-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold text-black">
              Your Cards
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Side - Vault and Stats */}
            <div className="lg:w-1/3 space-y-8">
              {/* Vault Manager */}
              <VaultManager 
                vaultState={vaultState}
                onDeposit={handleDeposit}
              />

              {/* Stats Grid - Reorganized as vertical stack */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-2xl border border-gray-100"
                >
                  <h3 className="text-gray-500 text-sm">Monthly Yield</h3>
                  <p className="text-2xl font-bold text-green-500 mt-2">+16.67%</p>
                  <p className="text-sm text-gray-500 mt-1">From USDC deposits</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-2xl border border-gray-100"
                >
                  <h3 className="text-gray-500 text-sm">Active Strategy</h3>
                  <p className="text-2xl font-bold text-black mt-2">Aave Pool</p>
                  <p className="text-sm text-gray-500 mt-1">4.2% APY</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-2xl border border-gray-100"
                >
                  <h3 className="text-gray-500 text-sm">Next Top-up</h3>
                  <p className="text-2xl font-bold text-black mt-2">2d 14h</p>
                  <p className="text-sm text-gray-500 mt-1">When balance $100</p>
                </motion.div>
              </div>
            </div>

            {/* Right Side - Cards */}
            <div className="lg:w-2/3">
              <div className="relative h-[600px]">
                {cards.map((card, index) => (
                  <motion.div 
                    key={card.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: index * -40,
                      opacity: 1,
                      scale: 1 - (index * 0.02)
                    }}
                    whileHover={{ 
                      y: index * -60,
                      scale: 1,
                      zIndex: 20
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut"
                    }}
                    className="absolute w-full cursor-pointer top-[40px]"
                    style={{ 
                      zIndex: cards.length - index,
                    }}
                  >
                    <div className="rounded-3xl p-4">
                      <div className={`aspect-[1.586/1] max-w-lg mx-auto flex flex-col justify-between p-6 rounded-2xl shadow-xl relative overflow-hidden
                        ${card.type === 'moonwell' 
                          ? 'bg-[#1E3A8A]' 
                          : 'bg-gradient-to-br from-white to-gray-100'}`}
                      >
                        {/* Background Circles - Only for Moonwell card */}
                        {card.type === 'moonwell' && (
                          <div className="absolute inset-0">
                            <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full -top-24 -right-24" />
                            <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full -bottom-24 -left-24" />
                          </div>
                        )}
                        
                        {/* Card Content */}
                        <div className="relative">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                              <span className={`text-2xl font-light ${card.type === 'moonwell' ? 'text-white' : 'text-gray-900'}`}>
                                {card.name}
                              </span>
                              <span className={`text-xs mt-1 ${card.type === 'moonwell' ? 'text-blue-200' : 'text-gray-500'}`}>
                                {card.name}
                              </span>
                            </div>
                            <img 
                              src="/visa02.png" 
                              alt="Visa" 
                              className={`h-6 ${card.type === 'moonwell' ? 'brightness-200' : 'brightness-100'}`} 
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <p className={`font-mono text-lg ${card.type === 'moonwell' ? 'text-white/80' : 'text-gray-600'}`}>
                            •••• {card.address.slice(-4)}
                          </p>
                          <div className="mt-2">
                            <p className={`text-xs ${card.type === 'moonwell' ? 'text-blue-200' : 'text-gray-500'}`}>
                              Balance
                            </p>
                            <p className={`text-xl font-bold ${card.type === 'moonwell' ? 'text-white' : 'text-gray-900'}`}>
                              ${card.balance.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add New Card Button */}
                <motion.button
                  onClick={() => setShowAddCard(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute w-full p-6 bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-black transition-colors group"
                  style={{ 
                    zIndex: 0,
                    top: 'calc(100% - 180px)'
                  }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 rounded-full bg-gray-50 group-hover:bg-black transition-colors">
                      <PlusIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
                    </div>
                    <p className="font-medium text-gray-900">Add New Card</p>
                    <p className="text-sm text-gray-500">Connect your crypto-enabled card</p>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showAddCard && (
        <AddCardModal
          onAdd={handleAddCard}
          onClose={() => setShowAddCard(false)}
        />
      )}
    </div>
  )
}
