import { ReactNode } from 'react'
import { Container, ContainerProps, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export interface UiContainerProps extends ContainerProps {
  children: ReactNode
}

export function UiContainer({ children, ...props }: UiContainerProps) {
  const { isSm } = useUiBreakpoints()
  return (
    <Container
      w={isSm ? 400 : 800}
      fluid={isSm}
      size="xl"
      px={isSm ? 'xs' : undefined}
      py={isSm ? 'xs' : 'md'}
      {...props}
    >
      {children}
    </Container>
  )
}

export function useUiBreakpoints() {
  const { breakpoints } = useMantineTheme()
  const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const isMd = useMediaQuery(`(max-width: ${breakpoints.md})`)

  return {
    isSm: isSm ?? false,
    isMd: isMd ?? false,
  }
}
