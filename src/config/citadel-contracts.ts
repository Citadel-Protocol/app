import { Address } from 'viem';
import { CONTRACT_ADDRESSES } from './contracts';
import { CITADEL_EUR_ADDRESS } from '@/constants/addresses';
import { CITADEL_MULTI_LP_POOL_ABI } from '@/abi/citadel-pool';
import { ERC20_ABI } from '@/abi/erc20';
import type { CitadelPool } from '@/types/contracts';

// Re-export ABIs for backwards compatibility
export { CITADEL_MULTI_LP_POOL_ABI, ERC20_ABI };

// Citadel pools - only FDUSD/cEUR pool
export const CITADEL_POOLS: CitadelPool[] = [
  {
    address: CONTRACT_ADDRESSES.pool,
    collateralToken: CONTRACT_ADDRESSES.collateral, // FDUSD testnet
    syntheticToken: CITADEL_EUR_ADDRESS, // Citadel EUR token
    name: 'Citadel EUR Pool',
    symbol: 'cEUR',
    collateralSymbol: 'FDUSD',
  },
];

// Re-export helper functions from utils for backwards compatibility
export { 
  findCitadelPoolByTokens,
  isMintOperation,
  isRedeemOperation 
} from '@/utils/contract-helpers';