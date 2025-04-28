import { HTMLAttributes, ReactNode, Suspense } from 'react'
import { NavLink as Link } from 'react-router-dom'
import { ActionIcon, Anchor, AppShell, Flex, Group, Image, Loader, Text } from '@mantine/core'

export interface AppLayoutLink {
  label: string
  to: string
}

export function AppLayout({ children, profile }: { children: ReactNode; profile: ReactNode }) {
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      styles={{
        header: {
          backgroundColor: 'rgb(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)', // For Safari
          borderBottom: 0,
        },
        footer: {
          backgroundColor: 'rgb(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)', // For Safari
          borderTop: 0,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" h="100%" px="md">
          <Anchor component={Link} to="/" underline="never">
            <Group align="center" gap="xs">
              <Image
                src="/isldao.png"
                alt="Logo"
                h={40}
                w="auto"
                fit="contain"
                radius={50}
                style={{ border: '3px solid black' }}
              />
              <Text c="accent" fw="bold" size="xl">
                IslandDAO
              </Text>
            </Group>
          </Anchor>
          <Group justify="center" align="center">
            {profile}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main className="background">
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AppShell.Main>

      <AppShell.Footer>
        <Flex
          justify="center"
          align="center"
          h="100%"
          px="md"
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 0, sm: 'lg' }}
          py={{ base: 'md', sm: 0 }}
        >
          <Group justify="center" align="center">
            <Text size="sm" c="gray">
              © 2025 IslandDAO. All rights reserved.
            </Text>
          </Group>
          <Group justify="center" align="center" gap="sm" wrap="nowrap">
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://twitter.com/islanddao"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconTwitter height={18} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://discord.gg/dvHrj9SXQS"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconDiscord height={18} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://github.com/dean-s-list"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGithub height={18} />
            </ActionIcon>
          </Group>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  )
}

function IconGithub(props: HTMLAttributes<SVGElement> & { height: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  )
}

function IconDiscord(props: HTMLAttributes<SVGElement> & { height: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0 13 13 0 0 0-.617-1.25.08.08 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.1.1 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10 10 0 0 0 .372-.292.07.07 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03M8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418"
      />
    </svg>
  )
}

function IconTwitter(props: HTMLAttributes<SVGElement> & { height: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  )
}
