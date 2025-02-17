import { useMemo } from 'react';
import { Stack } from '@mantine/core';
import { useGetSnapshots } from './data-access/use-get-snapshots';
import { useGetSnapshotsForWallet } from './data-access/use-get-snapshots-wallet';
import { HomeUiAllocation } from './ui/home-ui-allocation';
import { HomeUiResult } from './ui/home-ui-result';
import { HomeUiWelcome } from './ui/home-ui-welcome';
import { UiContainer } from '@/ui/ui-container';

const endpoint = 'https://allocation.deanslist.services';

export default function HomeFeature() {
  // TODO: Add a loading state for the wallet data (timer or something)
  const mutationSnapshots = useGetSnapshots(endpoint);
  const mutationWallet = useGetSnapshotsForWallet(endpoint);

  const snapshots: { id: string; description: string; name: string }[] =
    mutationSnapshots.data ?? [];

  const assets: Record<string, number> = useMemo(() => {
    if (!mutationWallet.data) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(mutationWallet.data.snapshots).map(([id, wallet]) => [id, wallet.allocation])
    );
  }, [mutationWallet.data]);
  return (
    <Stack gap="lg" mb="xl" pb="xl">
      <HomeUiWelcome />
      <UiContainer styles={{ root: { textAlign: 'center' } }}>
        <HomeUiAllocation
          loading={mutationWallet.isPending}
          search={async (value) => mutationWallet.mutateAsync(value)}
        />

        <div>
          {mutationWallet.error ? (
            <div>An error occurred: {mutationWallet?.error?.message}</div>
          ) : null}
        </div>
      </UiContainer>
      <UiContainer bg="rgba(0, 0, 0, 0.3)" p="md" styles={{ root: { borderRadius: '16px' } }}>
        <HomeUiResult snapshots={snapshots} assets={assets} hasWalletData={!!mutationWallet.data} />
      </UiContainer>
      {/* <pre>{JSON.stringify(mutationSnapshots, null, 2)}</pre> */}
    </Stack>
  );
}
