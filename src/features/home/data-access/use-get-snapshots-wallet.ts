import { PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'

export function useResolveDomain(endpoint: string) {
  return useMutation({
    mutationFn: async (addressOrDomain: string) => {
      const trimmed = addressOrDomain.trim()
      if (isValidSolanaPublicKey(trimmed)) {
        return { address: trimmed }
      }

      if (!isValidDomain(trimmed)) {
        throw new Error('Please enter a valid Solana address or domain.')
      }

      return await fetch(`${endpoint}/resolve/${trimmed}`).then((res) => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 400) {
          throw new Error('Invalid wallet address or domain')
        }
        throw new Error('An error occurred fetching the domain')
      })
    },
  })
}

export function isValidSolanaPublicKey(value: string) {
  try {
    new PublicKey(value)
    return true
  } catch {
    return false
  }
}

function isValidDomain(value: string) {
  const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
  return domainPattern.test(value)
}
