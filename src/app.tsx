import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { SolanaProvider } from '@/features/solana/solana-provider'
import { AppRoutes } from './app-routes'
import { theme } from './theme'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications />
        <SolanaProvider>
          <AppRoutes />
        </SolanaProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
