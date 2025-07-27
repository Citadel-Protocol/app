import { Address } from 'viem';

export interface Token {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}

export interface LPInfo {
  actualCollateralAmount: number;
  tokensCollateralized: number;
  overCollateralization: number;
  capacity: number;
  utilization: number;
  coverage: number;
  mintShares: number;
  redeemShares: number;
  interestShares: number;
  isOvercollateralized: boolean;
}

export interface PoolVault {
  id: string;
  name: string;
  baseToken: string;
  synthToken: string;
  baseIcon: string;
  synthIcon: string;
  tvl: number;
  apy: number;
  address: string;
  userPosition?: {
    amount: number;
    value: number;
    lpInfo: LPInfo;
  };
  lpInfo: LPInfo;
  riskLevel: "Low" | "Medium" | "High";
  description: string;
}

export interface CitadelPool {
  address: Address;
  collateralToken: Address;
  syntheticToken: Address;
  name: string;
  symbol: string;
  collateralSymbol: string;
}

export interface ContractAddresses {
  chainlinkPriceFeed: Address;
  collateralWhitelist: Address;
  collateral: Address;
  compoundModule: Address;
  deployer: Address;
  factoryVersioning: Address;
  finder: Address;
  identifierWhitelist: Address;
  lendingManager: Address;
  lendingStorageManager: Address;
  manager: Address;
  pool: Address;
  poolFactory: Address;
  poolImplementation: Address;
  poolRegistry: Address;
  priceFeed: Address;
  pythAggregator: Address;
  tokenFactory: Address;
  trustedForwarder: Address;
  faucetLimiter: Address;
}