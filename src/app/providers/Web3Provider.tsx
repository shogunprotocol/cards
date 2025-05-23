'use client'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { mainnet, polygon } from 'viem/chains'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

const { wallets } = getDefaultWallets({
  appName: 'Moongate',
  projectId: '1c9ce74c92999495e3b57a25b9cc3bf1', // Get this from WalletConnect
})

const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
})

// Create a client
const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
} 