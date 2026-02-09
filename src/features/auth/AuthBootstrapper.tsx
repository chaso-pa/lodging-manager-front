'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { bootstrapAuth, fetchMe } from '@/lib/api/auth';

export const AuthBootstrapper = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const lastUidRef = useRef<string | null>(null);
  const bootstrappedRef = useRef(false);
  const inFlightRef = useRef(false);
  const authStateRef = useRef<{ initialized: boolean; previousUid: string | null }>({
    initialized: false,
    previousUid: null
  });

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!authStateRef.current.initialized) {
      authStateRef.current.initialized = true;
      authStateRef.current.previousUid = user?.uid ?? null;
    }

    if (!user) {
      lastUidRef.current = null;
      bootstrappedRef.current = false;
      inFlightRef.current = false;
      authStateRef.current.previousUid = null;
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
    const justLoggedIn = authStateRef.current.previousUid === null && authStateRef.current.initialized;
    authStateRef.current.previousUid = user.uid;

    const runBootstrap = async () => {
      try {
        const token = await user.getIdToken();
        await bootstrapAuth(token);
        const me = await fetchMe(token);

        bootstrappedRef.current = true;

        if (me.role === 'friend') {
          if (justLoggedIn) {
            const isFriendRoute = pathname === '/availability' || pathname.startsWith('/reservations');
            if (!isFriendRoute) {
              router.replace('/availability');
            }
          }
          return;
        }

        if (me.role === 'host') {
          if (justLoggedIn) {
            const isHostRoute = pathname === '/pre-reservations';
            if (!isHostRoute) {
              router.replace('/pre-reservations');
            }
          }
          return;
        }

        throw new Error(`Unknown role: ${me.role ?? 'missing'}`);
      } catch (_error) {
        bootstrappedRef.current = false;
        await logout();
      } finally {
        inFlightRef.current = false;
      }
    };

    void runBootstrap();
  }, [loading, logout, router, user, pathname]);

  return null;
};
