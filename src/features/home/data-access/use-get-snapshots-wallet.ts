import { walletNameToAddressAndProfilePicture } from '@portal-payments/solana-wallet-names';
import { useConnection } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

export function useGetSnapshotsForWallet(endpoint: string) {
  const { connection } = useConnection();
  return useMutation({
    mutationFn: async (value: string) => {
      const address = await getWalletAddress(connection, value);
      if(!address) {
        throw new Error("Invalid wallet address");
      }
      return await fetch(`${endpoint}/wallet/${address}`)
        .then((res) => res.json())
        .then(
          (res) => res as { snapshots: Record<string, { amount: number; allocation: number }> }
        );
    },
  });
}

function isValidSolanaPublicKey(value: string) {
  try {
    new PublicKey(value);
    return true;
  } catch {
    return false;
  }
}

async function getWalletAddress(connection: Connection, value: string) {
  if (isValidSolanaPublicKey(value)) {
    await new Promise ((resolve) => setTimeout(resolve, 500));
    return value;
  }
  if (value.includes('.')) {
    const walletAddressAndProfilePicture = await walletNameToAddressAndProfilePicture(
      // A Solana connection
      connection,
      // One of: .abc .backpack .bonk .glow .poor .sol or @twitter
      value
    );

    return walletAddressAndProfilePicture.walletAddress;
  }
  console.warn('Invalid wallet address');
  return false;
}
