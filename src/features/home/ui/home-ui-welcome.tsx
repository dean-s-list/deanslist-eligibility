import { Container, Indicator, Text, Title, Popover, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './home-ui-welcome.module.css';
import { IconInfoCircle } from '@tabler/icons-react';

export function HomeUiWelcome() {
  return (
    <Container styles={{ root: { textAlign: 'center' } }}>
      <Title className={classes.title} mt={20}>
        Welcome to the {' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          // gradient={{ from: 'rgba(28, 8, 43, 1)', to: 'rgba(210, 195, 253, 1)', deg: 360 }}
          gradient={{ from: 'rgb(203, 136, 242)', to: 'rgb(245, 111, 111)', deg: 180 }}
        >
          DL Gen2 Mint!
        </Text>
      </Title>
      <Indicator inline processing color="green" size={8}>
        <Text size="lg" maw={580} mx="auto" c="dimmed">
         <Info /> Check if you are eligible to mint a Gen2 NFT.
        </Text>
      </Indicator>
    </Container>
  );
}

function Info() {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={350} position="left" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button onMouseEnter={open} onMouseLeave={close} color='grey' size="xs" variant="subtle" style={{ backgroundColor: 'transparent', padding: 0, marginBottom: '2px' }}>
          <IconInfoCircle size={20} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }}>
        <Text size="md">Snapshots for the eligibility criteria are taken <b>every 24 hours</b>. So if you've recently met one of the criteria, come back in <b>24 hours</b> and check that are whitelisted!</Text>
      </Popover.Dropdown>
    </Popover>
  );
}