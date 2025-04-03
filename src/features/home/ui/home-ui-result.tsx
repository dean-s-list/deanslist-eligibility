import { LucideCircleCheck, LucideCircleDashed, LucideCircleHelp } from 'lucide-react'
import { Alert, Card, Group, Popover, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export function HomeUiResult({
  snapshots,
  hasWalletData,
}: {
  snapshots: { id: string; description: string; name: string }[]
  hasWalletData: boolean
}) {
  return (
    <Card radius="lg" shadow="sm" p="md">
      <Stack>
        <Title order={2} ta="center">
          Eligibility Criteria
        </Title>
        {snapshots
          .sort((a, b) => a.id.localeCompare(b.id))
          .map((snapshot) => (
            <HomeUiSnapshotItem key={snapshot.id} snapshot={snapshot} hasWalletData={hasWalletData} />
          ))}
      </Stack>
    </Card>
  )
}

export function HomeUiSnapshotItem({
  snapshot,
  hasWalletData,
}: {
  snapshot: {
    id: string
    description: string
    name: string
    allocations?: { address: string; amount: number; allocation: number }[]
  }
  hasWalletData: boolean
}) {
  const [opened, { close, open }] = useDisclosure(false)
  const hasAllocation = (snapshot.allocations ?? [])?.length > 0
  const allocationCount = snapshot.allocations?.length ?? 0

  return (
    <Alert
      styles={{
        label: { width: '100%' },
        body: { gap: 0 },
        icon: { marginTop: 10 },
      }}
      radius="md"
      color={allocationColor(hasWalletData, hasAllocation)}
      key={snapshot.id}
      title={
        <Group
          justify="space-between"
          w="100%"
          style={{
            width: '100%',
          }}
        >
          <Text fw="bold">{snapshot.name}</Text>
          <Popover position="bottom" withArrow shadow="md" opened={opened} onClose={close}>
            <Popover.Target>
              <Text fw="bold" c="dimmed" onMouseEnter={open} onMouseLeave={close}>
                {allocationCount} wallets
              </Text>
            </Popover.Target>
            <Popover.Dropdown>
              <Text>You are eligible for {allocationCount} wallets</Text>
              {snapshot.allocations?.map((allocation) => (
                <Text c="dimmed" key={allocation.address}>
                  {allocation.address}
                </Text>
              ))}
            </Popover.Dropdown>
          </Popover>
        </Group>
      }
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
