import { useReadContract } from 'wagmi'
import { Address } from 'viem'
import testnetAddresses from '../../testnet-addresses.json'

const LENDING_MANAGER_ADDRESS = testnetAddresses.contracts.lendingManager.address as Address

const LENDING_MANAGER_ABI = [
  {
    name: "getAccumulatedInterest",
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        name: "pool",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "poolInterest",
        type: "uint256"
      },
      {
        name: "commissionInterest", 
        type: "uint256"
      },
      {
        name: "buybackInterest",
        type: "uint256"
      },
      {
        name: "collateralDeposited",
        type: "uint256"
      }
    ]
  }
] as const

export function useLendingManager(poolAddress: Address) {
  return useReadContract({
    address: LENDING_MANAGER_ADDRESS,
    abi: LENDING_MANAGER_ABI,
    functionName: 'getAccumulatedInterest',
    args: [poolAddress],
  })
}