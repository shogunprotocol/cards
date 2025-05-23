'use client'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { avalanche, mainnet, sonic } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import type { ReactNode } from 'react'
import type { Chain } from 'viem'
import { cookieStorage, createStorage } from 'wagmi'

const queryClient = new QueryClient()
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ''
const metadata = {
  name: 'Shogun DeFi',
  description: 'Shogun DeFi Dashboard',
  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}
const networks: [Chain, ...Chain[]] = [mainnet, avalanche, sonic]
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})

// Initialize AppKit
if (typeof window !== 'undefined' && projectId) {
  createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: { analytics: true }
  })
}

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
} 