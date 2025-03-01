import { WidgetTerminal } from 'jupiverse-kit'
import { notifications } from '@mantine/notifications'

export function SolanaJupiverseTerminal() {
  return (
    <div style={{ position: 'relative', zIndex: 101 }}>
      <WidgetTerminal
        rpcUrl="https://solana-rpc.publicnode.com"
        widgetPosition="bottom-right"
        widgetSize="default"
        formProps={{
          fixedOutputMint: true,
          initialInputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          initialOutputMint: 'Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a',
        }}
        onSuccess={({ txid }) => {
          notifications.show({
            title: 'Swap successful',
            message: txid,
            color: 'blue',
          })
        }}
        onSwapError={({ error }) => {
          notifications.show({
            title: 'Swap failed',
            message: error?.toString(),
            color: 'red',
          })
        }}
      />
    </div>
  )
}
