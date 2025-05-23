'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowTrendingUpIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import { VaultState } from '../types'

interface VaultManagerProps {
  vaultState: VaultState
  onDeposit: (amount: number) => void
}

export default function VaultManager({ vaultState, onDeposit }: VaultManagerProps) {
  const [amount, setAmount] = useState('')

  const handleDeposit = () => {
    if (!amount) return
    onDeposit(parseFloat(amount))
    setAmount('')
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Vault Balance</h2>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"/>
          <span className="text-sm text-gray-500">AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">Total Deposited</p>
          <p className="text-2xl font-bold text-black">${vaultState.totalDeposited.toFixed(2)}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">Current Yield</p>
          <p className="text-2xl font-bold text-green-500">
            {vaultState.currentYield.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Strategy</p>
            <p className="font-medium">{vaultState.strategy}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Projected APY</p>
            <p className="font-medium text-green-500">{vaultState.projectedApy}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-gray-500">Deposit Amount (USDC)</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDeposit}
            disabled={!amount}
            className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Deposit
          </motion.button>
        </div>
      </div>

      <p className="text-sm text-gray-500 italic">
        An AI manages your funds and automatically keeps your cards topped up when needed.
      </p>
    </div>
  )
} 