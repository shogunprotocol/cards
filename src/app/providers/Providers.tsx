'use client'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { mainnet, polygon } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'

const { wallets } = getDefaultWallets({
  appName: 'Moongate',
  projectId: '1c9ce74c92999495e3b57a25b9cc3bf1', // Your WalletConnect Project ID
})

const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
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