import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'viem/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set in environment variables');
}

export const config = getDefaultConfig({
  appName: 'Citadel Protocol',
  projectId,
  chains: [bsc],
  ssr: true,
});