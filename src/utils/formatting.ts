import { formatUnits } from 'viem';

export function formatTokenAmount(amount: bigint, decimals: number, precision: number = 4): string {
  const formatted = formatUnits(amount, decimals);
  const number = Number(formatted);
  
  if (number === 0) return '0';
  if (number < 0.0001) return '<0.0001';
  
  return number.toLocaleString(undefined, { 
    minimumFractionDigits: 0,
    maximumFractionDigits: precision 
  });
}

export function formatCurrency(amount: number, precision: number = 2): string {
  if (amount === 0) return '$0';
  if (amount < 0.01) return '<$0.01';
  
  return amount.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: precision
  });
}

export function formatPercentage(value: number, precision: number = 1): string {
  return `${value.toFixed(precision)}%`;
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}