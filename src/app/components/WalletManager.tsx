'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAccount, useWriteContract, useTransaction } from 'wagmi'
import { parseUnits } from 'viem'

interface WalletManagerProps {
  onTopUp: (amount: number) => void
}

export default function WalletManager({ onTopUp }: WalletManagerProps) {
  const { address } = useAccount()
  const [amount, setAmount] = useState('')
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>()

  const { writeContract } = useWriteContract()
  const { data: txData } = useTransaction({ hash: txHash })

  const handleTopUp = async () => {
    if (!address || !amount) return

    try {
      const numAmount = parseFloat(amount)
      if (isNaN(numAmount)) return

      const result = await writeContract({
        address: '0xUSDC_CONTRACT_ADDRESS',
        abi: [], // Add your contract ABI here
        functionName: 'transfer',
        args: [address, parseUnits(amount, 6)],
      })
      
      // @ts-ignore
      setTxHash(result)
      onTopUp(numAmount)
    } catch (error) {
      console.error('Top up failed:', error)
    }
  }

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Up Wallet</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Amount (USDC)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <button
          onClick={handleTopUp}
          disabled={!address || !amount}
          className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Top Up
        </button>

        {txData && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Last Transaction</p>
            <p className="text-sm font-mono text-gray-700 truncate">
              {txData.hash}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}