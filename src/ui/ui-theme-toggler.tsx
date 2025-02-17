import { LucideMoon, LucideSun } from 'lucide-react'
import { ActionIcon, ActionIconProps, useMantineColorScheme } from '@mantine/core'

export function UiThemeToggler(props: ActionIconProps) {
  const { setColorScheme, colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <ActionIcon onClick={() => setColorScheme(isDark ? 'light' : 'dark')} variant="light" {...props}>
      {isDark ? <LucideSun size={20} /> : <LucideMoon size={20} />}
    </ActionIcon>
  )
}
