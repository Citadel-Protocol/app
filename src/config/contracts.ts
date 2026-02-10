import { Address } from 'viem';
import mainnetAddresses from '../../mainnet-addresses.json';
import type { ContractAddresses } from '@/types/contracts';

export const CONTRACT_ADDRESSES: ContractAddresses = {
  chainlinkPriceFeed: mainnetAddresses.contracts.chainlinkPriceFeed.address as Address,
  collateralWhitelist: mainnetAddresses.contracts.collateralWhitelist.address as Address,
  collateral: mainnetAddresses.contracts.collateral.address as Address,
  compoundModule: mainnetAddresses.contracts.compoundModule.address as Address,
  deployer: mainnetAddresses.contracts.deployer.address as Address,
  factoryVersioning: mainnetAddresses.contracts.factoryVersioning.address as Address,
  finder: mainnetAddresses.contracts.finder.address as Address,
  identifierWhitelist: mainnetAddresses.contracts.identifierWhitelist.address as Address,
  lendingManager: mainnetAddresses.contracts.lendingManager.address as Address,
  lendingStorageManager: mainnetAddresses.contracts.lendingStorageManager.address as Address,
  manager: mainnetAddresses.contracts.manager.address as Address,
  pool: mainnetAddresses.contracts.pool.address as Address,
  poolFactory: mainnetAddresses.contracts.poolFactory.address as Address,
  poolImplementation: mainnetAddresses.contracts.poolImplementation.address as Address,
  poolRegistry: mainnetAddresses.contracts.poolRegistry.address as Address,
  priceFeed: mainnetAddresses.contracts.priceFeed.address as Address,
  tokenFactory: mainnetAddresses.contracts.tokenFactory.address as Address,
  trustedForwarder: mainnetAddresses.contracts.trustedForwarder.address as Address,
  vaultImplementation: mainnetAddresses.contracts.vaultImplementation.address as Address,
  vaultFactory: mainnetAddresses.contracts.vaultFactory.address as Address,
  vaultRegistry: mainnetAddresses.contracts.vaultRegistry.address as Address,
  vault1x: mainnetAddresses.contracts.vault1x.address as Address,
  vault5x: mainnetAddresses.contracts.vault5x.address as Address,
  vault20x: mainnetAddresses.contracts.vault20x.address as Address,
};

export const NETWORK_INFO = {
  network: mainnetAddresses.network,
  chainId: mainnetAddresses.chainId,
  deployedAt: mainnetAddresses.deployedAt,
};