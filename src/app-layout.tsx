import { ReactNode, Suspense } from 'react';
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import { NavLink as Link } from 'react-router-dom';
import { ActionIcon, AppShell, Group, Loader, Text, Image, Flex } from '@mantine/core';
import { ClusterUiChecker } from '@/features/cluster/ui';

export interface AppLayoutLink {
  label: string;
  to: string;
}

export function AppLayout({
  children,
  // links,
  profile,
}: {
  children: ReactNode;
  links: AppLayoutLink[];
  profile: ReactNode;
}) {
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      styles={{
        header: {
          backgroundColor: 'rgb(0,0,0,0.2)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)', // For Safari
          borderBottom: 0,
        },
        footer: {
          backgroundColor: 'rgb(0,0,0,0.2)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)', // For Safari
          borderTop: 0,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" h="100%" px="md">
          <Group justify="center" align="center">
            <Link to="/">
              <Image
                src="/logo.png"
                alt="Logo"
                h={40}
                w="auto"
                fit="contain"
              />
            </Link>
          </Group>
          <Group justify="center" align="center">
            {profile}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main className="gradient-purple">
        <Suspense fallback={<Loader />}>
          <ClusterUiChecker>
            <div />
          </ClusterUiChecker>
          {children}
        </Suspense>
      </AppShell.Main>

      <AppShell.Footer>
          <Flex justify="center" align="center" h="100%" px="md" direction={{ base: 'column', sm: 'row' }} gap={{ base: 0, sm: 'lg' }} py={{ base: 'md', sm: 0 }}>
            <Group justify="center" align="center">
              <Text size="sm" c="gray" >
                © 2025 DeansListDAO. All rights reserved.
              </Text>
            </Group>
            <Group justify="center" align="center" gap="sm" wrap='nowrap'>
              <ActionIcon
                size="lg"
                color="gray"
                variant="subtle"
                component="a"
                href="https://twitter.com/deanslistDAO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandTwitter size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                color="gray"
                variant="subtle"
                component="a"
                href="https://discord.gg/deanslist"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandDiscord size={18} stroke={1.5} />
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
                <IconBrandGithub size={18} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
