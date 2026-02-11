'use client';

import { Anchor, Group } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { fetchMe } from '@/lib/api/auth';

type Role = 'friend' | 'host' | string;

export const AppHeader = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      setRole(null);
      return;
    }

    const loadRole = async () => {
      try {
        const token = await user.getIdToken();
        const me = await fetchMe(token);
        console.log(me);

        setRole(me.role ?? null);
      } catch {
        setRole(null);
      }
    };

    void loadRole();
  }, [loading, user]);

  return (
    <header style={{ borderBottom: '1px solid #e9ecef', padding: '0.75rem 2rem' }}>
      <Group gap='md'>
        <Anchor component={Link} href='/reservations'>
          予約確認
        </Anchor>
        <Anchor component={Link} href='/reservations/new'>
          宿泊申請
        </Anchor>
        {role === 'host' && (
          <Anchor component={Link} href='/pre-reservations'>
            予約申請一覧
          </Anchor>
        )}
        <Anchor component={Link} href='/login'>
          ログイン
        </Anchor>
      </Group>
    </header>
  );
};
