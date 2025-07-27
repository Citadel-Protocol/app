import { Address } from 'viem';
import { ZERO_ADDRESS } from '@/constants/addresses';
import type { CitadelPool } from '@/types/contracts';

export function isNativeToken(address: Address): boolean {
  return address === ZERO_ADDRESS;
}

export function findCitadelPoolByTokens(
  pools: CitadelPool[],
  tokenA: Address, 
  tokenB: Address
): CitadelPool | undefined {
  return pools.find(pool => 
    (pool.collateralToken === tokenA && pool.syntheticToken === tokenB) ||
    (pool.collateralToken === tokenB && pool.syntheticToken === tokenA)
  );
}

export function isMintOperation(fromToken: Address, toToken: Address, pool: CitadelPool): boolean {
  return fromToken === pool.collateralToken && toToken === pool.syntheticToken;
}

export function isRedeemOperation(fromToken: Address, toToken: Address, pool: CitadelPool): boolean {
  return fromToken === pool.syntheticToken && toToken === pool.collateralToken;
}

export function getTokenQueryEnabled(tokenAddress: Address | undefined, userAddress: Address | undefined): boolean {
  return !!tokenAddress && !!userAddress && !isNativeToken(tokenAddress);
}