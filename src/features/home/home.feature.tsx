import { useMemo, useState } from 'react'
import { Stack } from '@mantine/core'
import { HomeUiSelectedWallets } from '@/features/home/ui/home-ui-selected-wallets'
import { UiContainer } from '@/ui/ui-container'
import { useGetSnapshots } from './data-access/use-get-snapshots'
import { isValidSolanaPublicKey, useResolveDomain } from './data-access/use-get-snapshots-wallet'
import { HomeUiAllocation } from './ui/home-ui-allocation'
import { HomeUiResult } from './ui/home-ui-result'
import { HomeUiWelcome } from './ui/home-ui-welcome'

const endpoint = 'https://allocation.deanslist.services'

export default function HomeFeature() {
  const [address, setAddress] = useState<{ name: string; address: string }[]>([])
  const lookupAddress = useMemo(() => {
    return address.map((item) => item.address)
  }, [address])

  const querySnapshots = useGetSnapshots(endpoint, lookupAddress)
  const mutationResolveDomain = useResolveDomain(endpoint)
  const snapshots: {
    id: string
    description: string
    name: string
    allocations?: { address: string; amount: number; allocation: number }[]
  }[] = querySnapshots.data ?? []

  const eligible = useMemo(
    () =>
      snapshots.reduce(
        (acc, snapshot) => {
          if (snapshot.allocations) {
            snapshot.allocations.forEach((allocation) => (acc[allocation.address] = true))
          }
          return acc
        },
        {} as Record<string, boolean>,
      ),
    [snapshots],
  )

  return (
    <Stack gap="lg" mb="xl" pb="xl">
      <HomeUiWelcome />
      <UiContainer styles={{ root: { textAlign: 'center' } }}>
        <HomeUiAllocation
          error={mutationResolveDomain.error ? mutationResolveDomain?.error?.message : null}
          reset={mutationResolveDomain.reset}
          loading={mutationResolveDomain.isPending}
          search={async (value) => {
            const res = await mutationResolveDomain.mutateAsync(value)
            const found = res.address
            if (!found || address.find((item) => item.address === found)) {
              return
            }

            const name = isValidSolanaPublicKey(value) ? ellipsify(value) : value
            setAddress([...address, { name, address: found }])
          }}
        />
      </UiContainer>
      {address.length ? <HomeUiSelectedWallets address={address} setAddress={setAddress} eligible={eligible} /> : null}
      <UiContainer>
        <HomeUiResult snapshots={snapshots} hasWalletData={lookupAddress.length > 0} />
      </UiContainer>
    </Stack>
  )
}

export function ellipsify(str = '', len = 4, delimiter = '....') {
  const strLen = str.length
  const limit = len * 2 + delimiter.length

  return strLen >= limit ? str.substring(0, len) + delimiter + str.substring(strLen - len, strLen) : str
}
