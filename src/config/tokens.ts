import { CONTRACT_ADDRESSES } from './contracts';
import { CITADEL_EUR_ADDRESS } from '@/constants/addresses';
import type { Token } from '@/types/contracts';

// FDUSD token only
export const BSC_TOKENS: Token[] = [
  {
    address: CONTRACT_ADDRESSES.collateral,
    name: 'First Digital USD',
    symbol: 'FDUSD',
    decimals: 18,
  },
];

// cEUR token only
export const CITADEL_SYNTHETIC_TOKENS: Token[] = [
  {
    address: CITADEL_EUR_ADDRESS,
    name: 'Citadel EUR',
    symbol: 'cEUR',
    decimals: 18,
  },
];

export const ALL_TOKENS = [...BSC_TOKENS, ...CITADEL_SYNTHETIC_TOKENS];