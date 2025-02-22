import { PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'

export function useResolveDomain(endpoint: string) {
  return useMutation({
    mutationFn: async (addressOrDomain: string) => {
      if (isValidSolanaPublicKey(addressOrDomain) || !addressOrDomain.includes('.')) {
        return addressOrDomain
      }

      return await fetch(`${endpoint}/resolve/${addressOrDomain}`)
        .then((res) => {
          // TODO catch 500 error and return a more user-friendly message
          if (!res.ok) {
            throw new Error('Invalid wallet address or domain')
          }
          return res
        })
        .then((res) => res.json())
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
