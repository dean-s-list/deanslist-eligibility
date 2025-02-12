import { useMemo } from 'react';
import { Container, Stack } from '@mantine/core';
import { useGetSnapshots } from './data-access/use-get-snapshots';
import { useGetSnapshotsForWallet } from './data-access/use-get-snapshots-wallet';
import { HomeUiAllocation } from './ui/home-ui-allocation';
import { HomeUiResult } from './ui/home-ui-result';
import { HomeUiWelcome } from './ui/home-ui-welcome';

const endpoint = 'https://collection-allocation.samui.build';

export function HomeFeature() {
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
      <Container w={800} styles={{ root: { textAlign: 'center' } }}>
        <HomeUiAllocation
          loading={mutationWallet.isPending}
          search={async (value) => mutationWallet.mutateAsync(value)}
        />

        <div>
          {mutationWallet.error ? (
            <div>An error occurred: {mutationWallet.error.message}</div>
          ) : null}
        </div>

        {/* {mutationWallet.data ? ( "Hello"
        ) : (
          '^ Connect your wallet to check your allocation ^'
        )} */}
      </Container>
      <Container bg="rgba(0, 0, 0, 0.3)" p="md" w={800} styles={{ root: { borderRadius: '16px' } }}>
        <HomeUiResult snapshots={snapshots} assets={assets} hasWalletData={!!mutationWallet.data} />
      </Container>
      {/* <pre>{JSON.stringify(mutationSnapshots, null, 2)}</pre> */}
    </Stack>
  );
}
