'use client';

import { Card, Text } from '@mantine/core';
import { DatePicker, type DatesRangeValue } from '@mantine/dates';
import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { fetchAvailability } from '@/lib/api/availability';
import type { AvailabilityResponse } from '@/lib/api/types';

const formatDateTime = (value: Date | string) => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'string') {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString();
    }
  }

  throw new Error('Invalid date value');
};

export default function AvailabilityPage() {
  const { user, loading } = useAuth();
  const [range, setRange] = useState<DatesRangeValue>([null, null]);
  const [status, setStatus] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const isReady = useMemo(() => !!range[0] && !!range[1], [range]);

  useEffect(() => {
    if (!isReady) {
      setStatus(null);
      setError(null);
      return;
    }

    if (!user || loading) {
      return;
    }

    const runCheck = async () => {
      const [checkin, checkout] = range;
      if (!checkin || !checkout) {
        return;
      }

      setChecking(true);
      setError(null);

      try {
        const token = await user.getIdToken();
        const result = await fetchAvailability(
          {
            checkin_at: formatDateTime(checkin),
            checkout_at: formatDateTime(checkout)
          },
          token
        );
        setStatus(result);
      } catch (err) {
        setStatus(null);
        setError(err instanceof Error ? err.message : 'Failed to check availability.');
      } finally {
        setChecking(false);
      }
    };

    void runCheck();
  }, [isReady, loading, range, user]);

  return (
    <main style={{ padding: '2rem' }}>
      <Card withBorder radius='md' padding='lg' style={{ maxWidth: 640, margin: '0 auto' }}>
        <Text fw={700} size='lg' mb='sm'>
          Availability Check
        </Text>

        <Text fw={600} mb='xs'>
          Select date range
        </Text>
        <DatePicker type='range' value={range} onChange={setRange} numberOfColumns={2} mb='md' />

        {loading && <Text c='dimmed'>Checking login status...</Text>}
        {!loading && !user && <Text c='red'>Please log in to check availability.</Text>}

        {checking && <Text c='dimmed'>Checking availability...</Text>}

        {!checking && status && (
          <Text c={status.available ? 'teal' : 'red'} fw={600}>
            {status.available ? 'Available' : 'Unavailable'}
            {status.reason ? ` - ${status.reason}` : ''}
          </Text>
        )}

        {!checking && !status && !error && isReady && user && <Text c='dimmed'>No availability data yet.</Text>}

        {error && (
          <Text c='red' size='sm'>
            {error}
          </Text>
        )}
      </Card>
    </main>
  );
}
