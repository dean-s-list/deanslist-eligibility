import { PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'

export function useGetSnapshotsForWallet(endpoint: string) {
  return useMutation({
    mutationFn: async (value: string) => {
      const address = getWalletAddress(value)
      if (!address) {
        throw new Error('Invalid wallet address')
      }
      return await fetch(`${endpoint}/wallet/${address}`)
        .then((res) => {
          // TODO catch 500 error and return a more user-friendly message
          if (!res.ok) {
            throw new Error('Invalid wallet address or domain')
          }
          return res
        })
        .then((res) => res.json())
        .then((res) => res as { snapshots: Record<string, { amount: number; allocation: number }> })
    },
  })
}

function isValidSolanaPublicKey(value: string) {
  try {
    new PublicKey(value)
    return true
  } catch {
    return false
  }
}

function getWalletAddress(value: string) {
  if (isValidSolanaPublicKey(value) || value.includes('.')) {
    return value
  }
  return false
}
