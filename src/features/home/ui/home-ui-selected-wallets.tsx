import { Button, Card, Group, Stack, Text } from '@mantine/core'
import { UiContainer } from '@/ui/ui-container'

export function HomeUiSelectedWallets({
  address,
  setAddress,
  eligible,
}: {
  address: { name: string; address: string }[]
  setAddress: (addresses: { name: string; address: string }[]) => void
  eligible: Record<string, boolean>
}) {
  return (
    <UiContainer>
      <Card radius="lg" shadow="sm" p="md">
        <Card.Section p="md">
          <Text fw="bold" size="lg">
            You are checking for the following addresses:
          </Text>
        </Card.Section>
        <Stack>
          {address.map((item) => {
            const isEligible = eligible[item.address]
            return (
              <Group justify="space-between" key={item.address}>
                <Stack gap={0}>
                  <Text span c={isEligible ? 'green' : 'gray'} fw={isEligible ? 'bold' : 'normal'}>
                    {item.name}
                    {isEligible ? ' (ELIGIBLE)' : ''}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {item.address}
                  </Text>
                </Stack>
                <Button
                  variant={isEligible ? 'light' : 'outline'}
                  onClick={() => {
                    setAddress(address.filter((address) => address.address !== item.address))
                  }}
                >
                  Remove
                </Button>
              </Group>
            )
          })}
        </Stack>
      </Card>
    </UiContainer>
  )
}
