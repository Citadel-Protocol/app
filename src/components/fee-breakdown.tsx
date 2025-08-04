import { LPInfo } from '@/types/contracts'

interface FeeBreakdownProps {
  lpInfo: LPInfo
  poolInterest: number
  className?: string
}

export function FeeBreakdown({ lpInfo, poolInterest, className = "" }: FeeBreakdownProps) {
  // Calculate LP's share of different fee types
  const lendingInterest = poolInterest * lpInfo.interestShares
  const estimatedMintFees = lpInfo.actualCollateralAmount * (lpInfo.utilization / 100) * 0.0005 // 0.05% estimate
  const estimatedRedeemFees = lpInfo.actualCollateralAmount * (lpInfo.utilization / 100) * 0.0005 // 0.05% estimate
  
  const totalFees = lendingInterest + estimatedMintFees + estimatedRedeemFees

  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-4 ${className}`}>
      <div className="text-sm text-white/60 mb-3">Fee Breakdown</div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/80">Lending Interest</span>
          <span className="text-sm font-semibold text-green-400">
            ${lendingInterest.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/80">Minting Fees</span>
          <span className="text-sm font-semibold text-blue-400">
            ${estimatedMintFees.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/80">Redeem Fees</span>
          <span className="text-sm font-semibold text-purple-400">
            ${estimatedRedeemFees.toFixed(2)}
          </span>
        </div>
        
        <div className="h-px bg-white/10 my-2" />
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-white">Total Generated</span>
          <span className="text-sm font-bold text-white">
            ${totalFees.toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="text-xs text-white/50 mb-2">Share Distribution</div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-white/60">Interest</div>
            <div className="text-white font-semibold">{(lpInfo.interestShares * 100).toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-white/60">Mint</div>
            <div className="text-white font-semibold">{(lpInfo.mintShares * 100).toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-white/60">Redeem</div>
            <div className="text-white font-semibold">{(lpInfo.redeemShares * 100).toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}