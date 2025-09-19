"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { X, TrendingUp, Shield, AlertCircle, Info, Plus, Minus } from "lucide-react"
import type { PoolVault } from "./pools-module"
import { FeeBreakdown } from "./fee-breakdown"
import { useLendingManager } from "@/hooks/useLendingManager"
import { useVaultDeposit, useVaultWithdraw, useCollateralApproval, useVaultBalances } from "@/hooks/useVaultOperations"
import { AmountInput } from "@/components/ui/amount-input"
import { formatUnits } from "viem"
import testnetAddresses from "../../testnet-addresses.json"

interface PoolDetailsModalProps {
  pool: PoolVault
  onClose: () => void
}

export function PoolDetailsModal({ pool, onClose }: PoolDetailsModalProps) {
  const { address } = useAccount()
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit")

  const lpInfo = pool.userPosition?.lpInfo || pool.lpInfo
  const lendingData = useLendingManager(testnetAddresses.contracts.pool.address)
  const poolInterest = lendingData.data ? Number(formatUnits(lendingData.data[0], 18)) : 0

  const { deposit, isPending: isDepositPending, isConfirmed: isDepositConfirmed } = useVaultDeposit(pool.address as `0x${string}`)
  const { withdraw, isPending: isWithdrawPending, isConfirmed: isWithdrawConfirmed } = useVaultWithdraw(pool.address as `0x${string}`)
  const { approve, needsApproval, isPending: isApprovePending, isConfirmed: isApproveConfirmed } = useCollateralApproval(
    pool.address as `0x${string}`,
    address as `0x${string}`
  )
  const { collateralBalance, lpTokenBalance } = useVaultBalances(
    pool.address as `0x${string}`,
    address as `0x${string}`
  )

  const handleDeposit = async () => {
    if (!address || !depositAmount) return

    if (needsApproval && needsApproval(depositAmount)) {
      approve(depositAmount)
    } else {
      deposit(depositAmount, address)
    }
  }

  const handleWithdraw = () => {
    if (!address || !withdrawAmount) return
    withdraw(withdrawAmount, address)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span className="text-3xl">{pool.baseIcon}</span>
              <span className="text-3xl -ml-2">{pool.synthIcon}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{pool.name}</h2>
              <p className="text-white/60 hidden sm:block">{pool.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-6 h-6 text-white/60" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Pool Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-white/60 mb-2">Total Value Locked</div>
              <div className="text-2xl font-bold text-white">${(pool.tvl / 1000000).toFixed(1)}M</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-white/60 mb-2">APY</div>
              <div className="text-2xl font-bold text-green-400">{pool.apy.toFixed(4)}%</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-white/60 mb-2">Risk Level</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-white">{pool.riskLevel}</div>
                {pool.riskLevel === "Low" && <Shield className="w-5 h-5 text-green-400" />}
                {pool.riskLevel === "Medium" && <TrendingUp className="w-5 h-5 text-yellow-400" />}
                {pool.riskLevel === "High" && <AlertCircle className="w-5 h-5 text-red-400" />}
              </div>
            </div>
          </div>

          {/* LP Info Details */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Liquidity Provider Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Collateral Information */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Actual Collateral</div>
                <div className="text-xl font-bold text-white mb-1">
                  ${lpInfo.actualCollateralAmount.toLocaleString()}
                </div>
                <div className="text-sm text-white/60">{lpInfo.tokensCollateralized.toLocaleString()} tokens</div>
              </div>

              {/* Overcollateralization */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Overcollateralization</div>
                <div className="text-xl font-bold text-white mb-1">{lpInfo.overCollateralization}%</div>
                <div className={`text-sm ${lpInfo.isOvercollateralized ? "text-green-400" : "text-red-400"}`}>
                  {lpInfo.isOvercollateralized ? "Healthy" : "At Risk"}
                </div>
              </div>

              {/* Capacity */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">LP Capacity</div>
                <div className="text-xl font-bold text-white">${lpInfo.capacity.toLocaleString()}</div>
              </div>

              {/* Utilization */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Utilization Ratio</div>
                <div className="text-xl font-bold text-white mb-2">{lpInfo.utilization.toFixed(2)}%</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${lpInfo.utilization}%` }}
                  />
                </div>
              </div>

              {/* Coverage */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Collateral Coverage</div>
                <div className="text-xl font-bold text-white mb-2">{lpInfo.coverage.toFixed(2)}%</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min(lpInfo.coverage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Fee Breakdown */}
              <FeeBreakdown 
                lpInfo={lpInfo} 
                poolInterest={poolInterest}
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* User Position (if exists) */}
          {pool.userPosition && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Your Position</h3>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-blue-300 mb-2">Position Value</div>
                    <div className="text-3xl font-bold text-white">${pool.userPosition.value.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-300 mb-2">Token Amount</div>
                    <div className="text-3xl font-bold text-white">
                      {pool.userPosition.amount} {pool.baseToken}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Liquidity Management */}
          {address ? (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Liquidity Management</h3>

              {/* Tab Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("deposit")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "deposit"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add Liquidity
                </button>
                <button
                  onClick={() => setActiveTab("withdraw")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "withdraw"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Minus className="w-4 h-4" />
                  Remove Liquidity
                </button>
              </div>

              {/* Input Section */}
              {activeTab === "deposit" ? (
                <div className="space-y-4">
                  <AmountInput
                    value={depositAmount}
                    onChange={setDepositAmount}
                    maxBalance={collateralBalance}
                    symbol="FDUSD"
                    label="Amount to deposit"
                    variant="deposit"
                    disabled={isDepositPending || isApprovePending}
                  />
                  <button
                    onClick={handleDeposit}
                    disabled={!depositAmount || isDepositPending || isApprovePending}
                    className="w-full bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border border-green-500/30 text-green-400 font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApprovePending
                      ? "Approving..."
                      : isDepositPending
                      ? "Depositing..."
                      : needsApproval && needsApproval(depositAmount)
                      ? "Approve FDUSD"
                      : "Provide Liquidity"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AmountInput
                    value={withdrawAmount}
                    onChange={setWithdrawAmount}
                    maxBalance={lpTokenBalance}
                    symbol="LP"
                    label="LP tokens to withdraw"
                    variant="withdraw"
                    disabled={isWithdrawPending}
                  />
                  <button
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || isWithdrawPending}
                    className="w-full bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 text-red-400 font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isWithdrawPending ? "Withdrawing..." : "Remove Liquidity"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-white mb-4">Liquidity Management</h3>
              <p className="text-white/60 mb-4">Connect your wallet to manage liquidity positions</p>
              <ConnectButton.Custom>
                {({openConnectModal}) => 
              <button onClick={openConnectModal} className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                Connect Wallet
              </button>
                }
              </ConnectButton.Custom>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
