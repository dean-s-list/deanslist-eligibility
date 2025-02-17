import { ReactNode, useCallback } from 'react'
import { WalletModalProvider, WalletMultiButton, WalletMultiIcon } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletError } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'

export const WalletButton = WalletMultiButton
export const WalletIcon = WalletMultiIcon

export function SolanaProvider({ children }: { children: ReactNode }) {
  const endpoint = 'http://api.devnet.solana.com'
  const onError = useCallback((error: WalletError) => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
