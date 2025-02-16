import { LucideCircleCheck, LucideCircleDashed, LucideCircleHelp } from 'lucide-react'
import { Alert, Stack, Text, Title } from '@mantine/core'

export function HomeUiResult({
  snapshots,
  assets,
  hasWalletData,
}: {
  snapshots: { id: string; description: string; name: string }[]
  assets: Record<string, number>
  hasWalletData: boolean
}) {
  return (
    <Stack>
      <Title order={2} ta="center">
        Eligibility Criteria
      </Title>
      {snapshots
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((snapshot) => (
          <HomeUiSnapshotItem key={snapshot.id} snapshot={snapshot} assets={assets} hasWalletData={hasWalletData} />
        ))}
    </Stack>
  )
}

export function HomeUiSnapshotItem({
  snapshot,
  assets,
  hasWalletData,
}: {
  snapshot: { id: string; description: string; name: string }
  assets: Record<string, number>
  hasWalletData: boolean
}) {
  const hasAllocation = assets[snapshot.id] > 0
  return (
    <Alert
      styles={{ body: { gap: 0 }, icon: { marginTop: 10 } }}
      radius="xl"
      color={allocationColor(hasWalletData, hasAllocation)}
      key={snapshot.id}
      title={<Text fw="bold">{snapshot.name}</Text>}
      icon={allocationIcon(hasWalletData, hasAllocation)}
    >
      <Text c="dimmed" size="xs">
        {snapshot.description}
      </Text>
    </Alert>
  )
}

function allocationColor(hasWalletData: boolean, hasAllocation: boolean) {
  if (!hasWalletData) {
    return 'gray'
  }
  return hasAllocation ? 'green' : 'red'
}

function allocationIcon(hasWalletData: boolean, hasAllocation: boolean) {
  if (!hasWalletData) {
    return <LucideCircleHelp />
  }
  return hasAllocation ? <LucideCircleCheck /> : <LucideCircleDashed />
}
