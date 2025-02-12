import { ReactNode, Suspense } from 'react';
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import { NavLink as Link } from 'react-router-dom';
import { ActionIcon, AppShell, Burger, Container, Group, Loader, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
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
      // navbar={{
      // width: 300,
      // breakpoint: 'sm',
      // collapsed: { mobile: !opened },
      // }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="space-between" align="center" h="100%" px="md">
          <Group justify="center" align="center">
            <Link to="/">
              <img
                src="/src/assets/icon.png"
                alt="Logo"
                style={{ height: 40, marginLeft: 20, marginTop: 8 }}
              />
            </Link>
          </Group>
          <Group justify="center" align="center">
            {profile}
          </Group>
        </Group>
      </AppShell.Header>

      {/* <AppShell.Navbar p="md">
      {links.map((link) => (
        <NavLink key={link.to} component={Link} to={link.to} label={link.label} />
      ))}
      </AppShell.Navbar> */}

      <AppShell.Main className="gradient-purple">
        <Suspense fallback={<Loader />}>
          <ClusterUiChecker>
            <div />
          </ClusterUiChecker>
          {children}
        </Suspense>
      </AppShell.Main>

      <AppShell.Footer>
        <Container>
          <Group justify="space-between" align="center" h="100%" px="md">
            <Group justify="center" align="center">
              <Link to="/">
                <img
                  src="/src/assets/logo.png"
                  alt="Logo"
                  style={{ height: 40, marginTop: 5 }}
                />
              </Link>
            </Group>
            <Group justify="center" align="center">
              <Text size="sm" c="gray" >
                © 2025 DeansListDAO. All rights reserved.
              </Text>
            </Group>
            <Group justify="center" align="center" gap="sm">
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
          </Group>
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}
