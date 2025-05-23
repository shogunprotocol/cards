'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useChainId } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
// import { USDC_ABI, VAULT_ABI, USDC_ADDRESS, VAULT_ADDRESS } from '../lib/abis';

type DepositDrawerProps = {
  open: boolean;
  onClose: () => void;
  vaultName: string;
};

export default function DepositDrawer({ open, onClose, vaultName }: DepositDrawerProps) {
  const [amount, setAmount] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Check if we're on the correct chain
  const isOnAvalanche = chainId === 43114;

  // Get USDC balance
//   const { data: usdcBalance, isLoading: isLoadingBalance } = useBalance({
//     address,
//     token: USDC_ADDRESS,
//     chainId: 146, // Sonic network chain ID
//   });

//   // Get USDC allowance
//   const { data: allowance } = useReadContract({
//     address: USDC_ADDRESS,
//     abi: USDC_ABI,
//     functionName: 'allowance',
//     args: address ? [address, VAULT_ADDRESS] : undefined,
//   });

//   // Get vault total assets
//   const { data: totalAssets } = useReadContract({
//     address: VAULT_ADDRESS,
//     abi: VAULT_ABI,
//     functionName: 'totalAssets',
//   });

  // Approve USDC
  const { writeContract: approve, data: approveData } = useWriteContract();

  // Wait for approval transaction
  const { isLoading: isApprovingTx } = useWaitForTransactionReceipt({
    hash: approveData || undefined,
  });

  // Deposit to vault
  const { writeContract: deposit, data: depositData } = useWriteContract();

  // Wait for deposit transaction
  const { data: depositReceipt, isLoading: isDepositingTx } = useWaitForTransactionReceipt({
    hash: depositData,
    chainId: 146,
  });

  // Prevent background scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Reset state when drawer closes
  useEffect(() => {
    if (!open) {
      setAmount('');
      setError(null);
      setIsApproving(false);
      setIsDepositing(false);
    }
  }, [open]);

  // Handle successful deposit
  useEffect(() => {
    if (depositReceipt && depositReceipt.status !== 'reverted') {
      // Reset all state
      setAmount('');
      setError(null);
      setIsApproving(false);
      setIsDepositing(false);
      onClose();
      router.push('/hop');
    } else if (depositReceipt?.status === 'reverted') {
      setError('Transaction reverted. The vault might be paused or have restrictions. Please try a different amount or contact support.');
      setIsDepositing(false);
    }
  }, [depositReceipt, onClose, router]);

  if (!open) return null;

  const handleMax = () => {
    // if (usdcBalance) {
    //   setAmount(formatUnits(usdcBalance.value, usdcBalance.decimals));
    // }
  };

  const handleDeposit = async () => {
    try {
      setError(null);
      if (!amount || !address) return;

      // Check if we're on the correct chain
      if (!isOnAvalanche) {
        setError('Please switch to Avalanche to deposit');
        return;
      }

      const amountInWei = parseUnits(amount, 6); // USDC has 6 decimals
      console.log('Deposit amount in wei:', amountInWei.toString());
    //   console.log('Current allowance:', allowance?.toString());
    //   console.log('Vault total assets:', totalAssets?.toString());

      // Check if we need to approve first
    //   if (!allowance || BigInt(allowance) < amountInWei) {
    //     console.log('Approval needed');
    //     setIsApproving(true);
    //     try {
    //       approve({
    //         address: USDC_ADDRESS,
    //         abi: USDC_ABI,
    //         functionName: 'approve',
    //         args: [VAULT_ADDRESS, amountInWei],
    //         chainId: 146, // Explicitly set Sonic network for approval
    //       });
    //       console.log('Approval initiated');
    //     } catch (err) {
    //       console.error('Approval error:', err);
    //       setError('Failed to approve USDC. Please try again.');
    //       setIsApproving(false);
    //       return;
    //     }
    //   }

      // Wait for approval transaction to be mined
      if (isApprovingTx) {
        console.log('Waiting for approval transaction...');
        return;
      }

    //   if (!allowance || BigInt(allowance) < amountInWei) {
    //     setError('Insufficient allowance. Please try approving again.');
    //     return;
    //   }
      
      setIsDepositing(true);
      try {
        console.log('Attempting deposit...');
        // deposit({
        //   address: VAULT_ADDRESS,
        //   abi: VAULT_ABI,
        //   functionName: 'deposit',
        //   args: [amountInWei, address], // ERC4626 deposit takes assets and receiver
        //   chainId: 146, // Explicitly set Sonic network for deposit
        // });
        
        console.log('Deposit transaction initiated');
      } catch (err) {
        console.error('Deposit error:', err);
        if (err instanceof Error) {
          if (err.message.includes('user rejected')) {
            setError('Transaction was rejected');
          } else if (err.message.includes('insufficient funds')) {
            setError('Insufficient funds for gas');
          } else if (err.message.includes('execution reverted')) {
            setError('Transaction reverted. The vault might be paused or have restrictions. Please try a different amount or contact support.');
          } else if (err.message.includes('simulation failed')) {
            setError('Transaction simulation failed. The vault might be paused or have restrictions. Please try a different amount or contact support.');
          } else if (err.message.includes('unknown signature type')) {
            setError('Transaction failed: Unknown signature type. Please try again or contact support.');
          } else {
            setError(`Deposit failed: ${err.message}`);
          }
        } else {
          setError('Failed to deposit. Please try again.');
        }
        setIsDepositing(false);
      }
    } catch (err) {
      console.error('General error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsApproving(false);
      setIsDepositing(false);
    }
  };

  // Example vault info (replace with real data as needed)
  const vaultDescription = "SuperUSDC optimizes USDC returns across blue-chip lending protocols by automatically rebalancing between vaults using predictive onchain data. Audited by yAudit, leading security researchers, and secured by Yearn v3.";
  const yieldSources = [
    { name: 'Aave', icon: '/yieldSources/aave.png' },
    { name: 'Pendle', icon: '/yieldSources/pendleLogo.png' },
    { name: 'Silo', icon: '/yieldSources/siloLogo.png' },
  ];

//   const formattedBalance = usdcBalance ? formatUnits(usdcBalance.value, usdcBalance.decimals) : '0';
//   const isLoading = isLoadingBalance || isApprovingTx || isDepositingTx;
//   const buttonDisabled = !amount || isLoading || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(formattedBalance) || !address;
  const buttonDisabled = !amount || parseFloat(amount) <= 0 || !address;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Blurred Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer with Framer Motion */}
          <motion.div
            className={clsx(
              "fixed left-0 right-0 bottom-0 z-50 w-screen",
              "rounded-t-3xl bg-white border-t border-gray-200 shadow-2xl flex flex-col"
            )}
            style={{ height: 'auto', minHeight: '400px', maxHeight: '90vh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              mass: 0.7
            }}
          >
            {/* Close Button absolute top right */}
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl z-10"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
            {/* Main Content: Responsive flex-row for desktop, flex-col for mobile */}
            <div className="flex-1 overflow-y-auto px-6 pt-8 pb-0 flex flex-col md:flex-row gap-8">
              {/* Left: Deposit Form */}
              <div className="flex-1 flex flex-col items-start">
                <h2 className="text-2xl font-bold text-black mb-2">Deposit</h2>
                <div className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Funding Amount</div>
                {/* Token/Balance and Input side by side on desktop, stacked on mobile */}
                <div className="w-full flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 flex items-center justify-between bg-white rounded-2xl border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image src="/vaults/usdcModerateTest.png" alt="token" width={32} height={32} className="rounded-full" />
                      <div>
                        <div className="text-base font-semibold text-black">USDC</div>
                        <div className="text-xs text-gray-500">Avalanche</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {/* BALANCE <span className="text-black font-mono">{formattedBalance}</span> */}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-black text-2xl font-mono focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <span>${amount ? (parseFloat(amount) * 1).toFixed(2) : '0.00'}</span>
                      <button 
                        onClick={handleMax}
                        className="text-black underline font-medium"
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="w-full text-red-500 text-sm mb-4">
                    {error}
                  </div>
                )}
              </div>
              {/* Right: (removed About this Vault and yield sources) */}
            </div>
            {/* Add chain switch button if not on Avalanche */}
            {!isOnAvalanche && (
              <div className="w-full px-6 pb-4">
                <button
                  onClick={() => switchChain({ chainId: 43114 })}
                  className="w-full py-3 rounded-full text-white font-semibold shadow-lg bg-black hover:bg-gray-900 transition-colors"
                >
                  Switch to Avalanche
                </button>
              </div>
            )}
            {/* Deposit Summary and Button as sticky footer */}
            <div className="w-full px-6 pb-8 pt-4 flex flex-col gap-4 sticky bottom-0 bg-white border-t border-gray-200">
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-mono tracking-widest text-gray-500">Deposit Summary</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-1 font-mono">Slippage % Bridge/DEX 0.5/0.5</span>
                    <button className="text-gray-400 hover:text-black text-lg">⚙️</button>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-gray-500 text-sm font-mono">
                  <div className="flex items-center justify-between">
                    <span>Average APY</span>
                    <span className="text-black">7.40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated Fees</span>
                    <span className="text-black">--</span>
                  </div>
                  <div className="flex items-center justify-between text-lg mt-2">
                    <span>Receiving Today</span>
                    <span className="text-black font-bold text-2xl">${amount ? (parseFloat(amount) * 1).toFixed(2) : '0.00'}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                disabled={buttonDisabled || !isOnAvalanche}
                onClick={handleDeposit}
                className={clsx(
                  "w-full py-3 rounded-xl text-white font-semibold shadow transition-transform text-lg",
                  (buttonDisabled || !isOnAvalanche)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black hover:bg-gray-900"
                )}
              >
                Deposit
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}