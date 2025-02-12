import '@mantine/core/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { ClusterProvider } from '@/features/cluster/data-access/cluster-provider';
import { SolanaProvider } from '@/features/solana/solana-provider';
import { AppRoutes } from './app-routes';
import { theme } from './theme';


const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider theme={theme} defaultColorScheme='dark'>
        {/* <Notifications /> */}
        <ClusterProvider>
          <SolanaProvider>
            <AppRoutes />
          </SolanaProvider>
        </ClusterProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
