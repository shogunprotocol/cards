# ShogunCard - AI-Powered Crypto Card Management

ShogunCard is a modern web application that provides intelligent management of crypto-enabled cards, featuring AI-powered treasury management and seamless fund transfers. Built with Next.js and Tailwind CSS, it offers a clean, user-friendly interface for managing your crypto assets.

## Project Overview

ShogunCard is part of a larger ecosystem focused on decentralized finance (DeFi) card management and on-chain liquidity. The main components are:

### Core Components

1. **ShogunCard** (This Repository)
   - Modern React + Next.js dashboard
   - Real-time balance tracking
   - Card management interface
   - AI-powered fund allocation
   - [View Live Demo](https://cards-kappa-ebon-94.vercel.app/)

2. **Shogun Card Liquidity Contracts** ([contracts-avalanche](https://github.com/shogunprotocol/contracts-avalanche))
   - Smart contracts for card liquidity and yield farming on Avalanche
   - See details below

## Features

- **Card Management**
  - Add and manage multiple crypto cards
  - Real-time balance tracking
  - Transaction history
  - Card stacking visualization

- **AI Treasury**
  - Automated fund allocation
  - Yield optimization
  - Risk management
  - Smart rebalancing

- **Wallet Integration**
  - Web3 wallet connection
  - USDC top-up functionality
  - Transaction monitoring
  - Cross-chain support

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/shogun-card.git
cd shogun-card
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Web3**: wagmi, viem
- **Wallet**: RainbowKit
- **State Management**: React Query

## Smart Contracts: Shogun Card Liquidity ([contracts-avalanche](https://github.com/shogunprotocol/contracts-avalanche))

### Overview

This project implements a system to maintain liquidity for a Card address on Avalanche while earning yield through two strategies:

1. **Suzaku LRT Vault**: A liquid restaking token vault that provides yield through restaking
2. **Benqi USDC Pool**: A lending pool that provides yield through interest

### Deployed Contracts

- `CardVault`: ERC-4626 wrapper that earns yield and mints cCARD-USDC tokens
  - Address: [0xda08b2C66f6c0CEBD79286bC5b069221ec4e9741](https://snowtrace.io/address/0xda08b2C66f6c0CEBD79286bC5b069221ec4e9741)

- `BufferManager`: Chainlink Automation upkeep that maintains a USDC buffer for the Card address
  - Address: [0xedED33b4fb51584aac960a816b8ed4E3200b4A1C](https://snowtrace.io/address/0xedED33b4fb51584aac960a816b8ed4E3200b4A1C)

- `StrategyRouter`: Router for managing multiple strategy modules
  - Address: [0xE82Ea8B95D9F2076A462De5021531F3129a852c4](https://snowtrace.io/address/0xE82Ea8B95D9F2076A462De5021531F3129a852c4)

- `StrategySuzakuBTCWrapper`: Router for managing multiple strategy modules
  - Address: [0xE7a24D0080D69007Dd4dA7287D2F4324f0e51Fcb](https://snowtrace.io/address/0xE7a24D0080D69007Dd4dA7287D2F4324f0e51Fcb)

### Quick Start

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test
```

### Development

#### Prerequisites

- Node.js v18+
- Hardhat

#### Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in the required environment variables:
   - Network RPC URLs
   - API keys
   - Contract addresses
   - Private keys

#### Deployment

Deploy contracts to a network:

```bash
# Deploy to Fuji testnet
npx hardhat run script/deploy.ts --network fuji

# Deploy to Avalanche mainnet
npx hardhat run script/deploy.ts --network avalanche
```

### Architecture

#### CardVault

- ERC-4626 compliant vault that wraps USDC
- Mints cCARD-USDC tokens representing shares
- Manages strategy allocations and yield generation

#### BufferManager

- Chainlink Automation compatible contract
- Maintains a USDC buffer for the Card address
- Automatically tops up when buffer falls below minimum

#### StrategyRouter

- Routes funds to different strategy modules
- Manages strategy execution and harvesting
- Implements IStrategy interface for vault compatibility

#### Strategies

- `StrategySuzaku`: Adapter to Suzaku LRT vault
- `StrategyBenqi`: Adapter to Benqi USDC pool
- Both strategies implement a common interface

### Security

- Access control through OpenZeppelin's AccessControl
- Reentrancy protection
- Comprehensive test coverage

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Related Repositories

- [Shogun Card Liquidity Contracts (contracts-avalanche)](https://github.com/shogunprotocol/contracts-avalanche)
