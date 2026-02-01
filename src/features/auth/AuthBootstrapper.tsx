'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { bootstrapAuth, fetchMe } from '@/lib/api/auth';

export const AuthBootstrapper = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const lastUidRef = useRef<string | null>(null);
  const bootstrappedRef = useRef(false);
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      lastUidRef.current = null;
      bootstrappedRef.current = false;
      inFlightRef.current = false;
      return;
    }

    if (inFlightRef.current) {
      return;
    }

    if (bootstrappedRef.current && lastUidRef.current === user.uid) {
      return;
    }

    inFlightRef.current = true;
    lastUidRef.current = user.uid;

    const runBootstrap = async () => {
      try {
        const token = await user.getIdToken();
        await bootstrapAuth(token);
        const me = await fetchMe(token);

        bootstrappedRef.current = true;

        if (me.role === 'friend') {
          router.replace('/availability');
          return;
        }

        if (me.role === 'host') {
          router.replace('/pre-reservations');
          return;
        }

        throw new Error(`Unknown role: ${me.role ?? 'missing'}`);
      } catch (error) {
        bootstrappedRef.current = false;
        await logout();
      } finally {
        inFlightRef.current = false;
      }
    };

    void runBootstrap();
  }, [loading, logout, router, user]);

  return null;
};
