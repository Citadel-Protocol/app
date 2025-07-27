import { useAccount, useBalance, useReadContract } from 'wagmi';
import { Address } from 'viem';
import { ERC20_ABI } from '@/abi/erc20';
import { isNativeToken } from '@/utils/contract-helpers';
import { formatTokenAmount } from '@/utils/formatting';
import type { Token } from '@/types/contracts';

export function useTokenBalance(token: Token) {
  const { address: userAddress } = useAccount();
  
  const isNative = isNativeToken(token.address);
  
  const {
    data: nativeBalance,
    isError: nativeError,
    isLoading: nativeLoading,
  } = useBalance({
    address: userAddress,
    query: {
      enabled: isNative && !!userAddress,
    },
  });

  const {
    data: erc20Balance,
    isError: erc20Error,
    isLoading: erc20Loading,
  } = useReadContract({
    address: token.address,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !isNative && !!userAddress,
    },
  });

  const balance = isNative ? nativeBalance?.value : erc20Balance;
  const isLoading = isNative ? nativeLoading : erc20Loading;
  const isError = isNative ? nativeError : erc20Error;

  const formattedBalance = balance 
    ? formatTokenAmount(balance, token.decimals)
    : '0';

  return {
    balance,
    formattedBalance,
    isLoading,
    isError,
  };
}

export function useTokenBalances(tokens: Token[]) {
  const balanceResults = tokens.map(token => {
    const balance = useTokenBalance(token);
    return {
      token,
      ...balance,
    };
  });

  const isLoading = balanceResults.some(b => b.isLoading);
  const hasError = balanceResults.some(b => b.isError);

  return {
    balances: balanceResults,
    isLoading,
    hasError,
  };
}