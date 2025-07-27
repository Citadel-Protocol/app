import { useReadContract } from 'wagmi';
import { Address } from 'viem';
import { ERC20_ABI } from '@/abi/erc20';
import { getTokenQueryEnabled } from '@/utils/contract-helpers';

export function useTokenMetadata(tokenAddress: Address | undefined) {
  const queryEnabled = getTokenQueryEnabled(tokenAddress, undefined);
  
  const {
    data: name,
    isLoading: nameLoading,
    isError: nameError,
  } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'name',
    query: {
      enabled: queryEnabled,
    },
  });

  const {
    data: symbol,
    isLoading: symbolLoading,
    isError: symbolError,
  } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: {
      enabled: queryEnabled,
    },
  });

  const {
    data: decimals,
    isLoading: decimalsLoading,
    isError: decimalsError,
  } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: queryEnabled,
    },
  });

  const isLoading = nameLoading || symbolLoading || decimalsLoading;
  const isError = nameError || symbolError || decimalsError;

  return {
    name: name as string || '',
    symbol: symbol as string || '',
    decimals: decimals as number || 18,
    isLoading,
    isError,
  };
}

// Hook to get multiple token metadata
export function useTokensMetadata(tokenAddresses: Address[]) {
  const metadataResults = tokenAddresses.map(address => useTokenMetadata(address));
  
  const isLoading = metadataResults.some(result => result.isLoading);
  const hasError = metadataResults.some(result => result.isError);
  
  const tokens = metadataResults.map((result, index) => ({
    address: tokenAddresses[index],
    name: result.name,
    symbol: result.symbol,
    decimals: result.decimals,
    isLoading: result.isLoading,
    isError: result.isError,
  }));
  
  return {
    tokens,
    isLoading,
    hasError,
  };
}