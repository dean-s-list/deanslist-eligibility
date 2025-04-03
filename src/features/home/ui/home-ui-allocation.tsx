import { ReactNode, useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { LucideSearch } from 'lucide-react'
import { ActionIcon, TextInput } from '@mantine/core'
import { WalletIcon } from '@/features/solana/solana-provider'

export function HomeUiAllocation({
  error,
  reset,
  search,
  loading,
}: {
  error?: ReactNode
  reset: () => void
  search: (value: string) => Promise<void>
  loading: boolean
}) {
  const wallet = useWallet()
  const [focused, setFocused] = useState(false) // State to track if the input is focused
  const [value, setValue] = useState('') // State to track the input value
  const floating = value.trim().length !== 0 || focused || undefined // Determine if the label should float

  // Effect to set the input value to the wallet's public key if connected
  useEffect(() => {
    if (wallet.connected && value !== wallet.publicKey?.toBase58()) {
      setValue(wallet.publicKey?.toBase58() || '')
      return
    }
    setValue('')
  }, [wallet.connected])

  return (
    // Form to handle the search functionality
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        if (value.trim().length === 0) {
          return
        }
        // Call the search function with the input value
        await search(value).catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
      }}
    >
      <TextInput
        label="Wallet Address"
        placeholder="Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a, DL.sol, Gen2.ser, etc."
        required
        value={value}
        onChange={(event) => {
          if (error && event.currentTarget.value.trim().length === 0) {
            reset()
          }
          setValue(event.currentTarget.value)
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mt="md"
        autoComplete="nope"
        data-floating={floating}
        labelProps={{ 'data-floating': floating }}
        radius="xl"
        size="lg"
        leftSection={<WalletIcon color="accent" variant="light" radius="xl" size="lg" loading={loading} />}
        readOnly={loading}
        error={error}
        withErrorStyles={false}
        rightSection={
          <ActionIcon
            type="submit"
            variant="light"
            radius="xl"
            size="lg"
            loading={loading}
            disabled={!value.trim().length}
          >
            <LucideSearch size={20} />{' '}
          </ActionIcon>
        }
        minLength={3}
        maxLength={255}
      />
    </form>
  )
}
