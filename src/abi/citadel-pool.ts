export const CITADEL_MULTI_LP_POOL_ABI = [
  // View functions for getting trade info
  {
    inputs: [{ name: '_collateralAmount', type: 'uint256' }],
    name: 'getMintTradeInfo',
    outputs: [
      { name: 'synthTokensReceived', type: 'uint256' },
      { name: 'feePaid', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_syntTokensAmount', type: 'uint256' }],
    name: 'getRedeemTradeInfo',
    outputs: [
      { name: 'collateralAmountReceived', type: 'uint256' },
      { name: 'feePaid', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
  },
  // Core trading functions
  {
    inputs: [
      {
        components: [
          { name: 'minNumTokens', type: 'uint256' },
          { name: 'collateralAmount', type: 'uint256' },
          { name: 'expiration', type: 'uint256' },
          { name: 'recipient', type: 'address' }
        ],
        name: 'mintParams',
        type: 'tuple'
      }
    ],
    name: 'mint',
    outputs: [
      { name: 'syntheticTokensMinted', type: 'uint256' },
      { name: 'feePaid', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { name: 'numTokens', type: 'uint256' },
          { name: 'minCollateral', type: 'uint256' },
          { name: 'expiration', type: 'uint256' },
          { name: 'recipient', type: 'address' }
        ],
        name: 'redeemParams',
        type: 'tuple'
      }
    ],
    name: 'redeem',
    outputs: [
      { name: 'collateralRedeemed', type: 'uint256' },
      { name: 'feePaid', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // Pool info functions
  {
    inputs: [],
    name: 'feePercentage',
    outputs: [{ name: 'fee', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'collateralAsset',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'syntheticAsset',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSyntheticTokens',
    outputs: [{ name: 'totalTokens', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalCollateralAmount',
    outputs: [
      { name: 'usersCollateral', type: 'uint256' },
      { name: 'lpsCollateral', type: 'uint256' },
      { name: 'totalCollateral', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;