'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  Container,
  Group,
  Loader,
  NavLink,
  Text,
  useMantineColorScheme
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { hostNavItems } from '@/components/layout/hostNav';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAuth } from '@/hooks/useAuth';
import { fetchMe } from '@/lib/api/auth';
import { Notifications } from '@mantine/notifications';

type HostShellProps = {
  children: React.ReactNode;
};

export const HostShell = ({ children }: HostShellProps) => {
  const pathname = usePathname();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { user, loading, logout } = useAuth();
  const [opened, { toggle: toggleNavbar }] = useDisclosure(false);
  const [role, setRole] = useState<string | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      setRole(null);
      setCheckingRole(false);
      return;
    }

    const loadRole = async () => {
      try {
        const token = await user.getIdToken();
        const me = await fetchMe(token);
        setRole(me.role ?? null);
      } catch {
        setRole(null);
      } finally {
        setCheckingRole(false);
      }
    };

    void loadRole();
  }, [loading, user]);

  if (loading || checkingRole) {
    return (
      <Box p='xl' style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader size='sm' />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box p='xl'>
        <ErrorState title='ログインが必要です' description='ログインして再度お試しください。' backHref='/login' />
      </Box>
    );
  }

  if (role !== 'host') {
    return (
      <Box p='xl'>
        <ErrorState title='403' description='アクセス権限がありません。' backHref='/' />
      </Box>
    );
  }

  return (
    <AppShell
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      header={{ height: 60 }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md' justify='space-between'>
          <Group gap='sm'>
            <Burger opened={opened} onClick={toggleNavbar} hiddenFrom='sm' aria-label='Toggle navigation' />
            <Text component='a' href='/' fw={700}>
              Lodging Manager
            </Text>
          </Group>
          <Group gap='sm'>
            <ActionIcon
              variant='light'
              radius='md'
              onClick={() => toggleColorScheme()}
              aria-label='toggle color scheme'
            >
              {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
            </ActionIcon>
            <Button variant='light' onClick={() => void logout()}>
              ログアウト
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md'>
        {hostNavItems.map((item) => (
          <NavLink
            key={item.href}
            component={Link}
            href={item.href}
            label={item.label}
            active={pathname === item.href}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size='lg' px='md'>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
