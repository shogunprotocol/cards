export type Chain = 'Ethereum' | 'Polygon' | 'Arbitrum' | 'Optimism' | 'avalanche'
export type CardType = 'moonwell' | 'default' | 'polar' | 'ing' | 'avalanche'

export interface Card {
  id: string
  name: string
  address: string
  chain: Chain
  balance: number
  type: CardType
  lastActivity?: {
    type: 'top-up' | 'spend' | 'deposit'
    amount: number
    timestamp: Date
  }
}

export interface VaultState {
  totalDeposited: number
  currentYield: number
  projectedApy: number
  strategy: string
} 