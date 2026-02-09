'use client';

import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { fetchAdminPreReservations, updateAdminPreReservation } from '@/lib/api/adminPreReservations';
import type { Reservation } from '@/lib/api/types';

const formatDateRange = (reservation: Reservation) => {
  const checkin = reservation.checkin_at ?? 'N/A';
  const checkout = reservation.checkout_at ?? 'N/A';
  return `${checkin} - ${checkout}`;
};

export default function HostPreReservationsPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Reservation[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actingId, setActingId] = useState<string | null>(null);

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    const load = async () => {
      setFetching(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const data = await fetchAdminPreReservations(token);

        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pre-reservations.');
      } finally {
        setFetching(false);
      }
    };

    void load();
  }, [loading, user]);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    if (!user) {
      setError('Please log in to update pre-reservations.');
      return;
    }

    setActingId(id);
    setError(null);
    try {
      const token = await user.getIdToken();
      await updateAdminPreReservation(id, action, token);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update pre-reservation.');
    } finally {
      setActingId(null);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <Card withBorder radius='md' padding='lg' style={{ maxWidth: 720, margin: '0 auto' }}>
        <Text fw={700} size='lg' mb='sm'>
          Pending Pre-Reservations
        </Text>

        {loading && <Text c='dimmed'>Checking login status...</Text>}
        {!loading && !user && <Text c='red'>Please log in to view pre-reservations.</Text>}
        {fetching && <Text c='dimmed'>Loading...</Text>}
        {error && (
          <Text c='red' size='sm' mb='sm'>
            {error}
          </Text>
        )}

        {!fetching && items.length === 0 && user && <Text c='dimmed'>No pending pre-reservations.</Text>}

        <Stack gap='md' mt='md'>
          {items.map((item, index) => (
            <Card
              key={item.id ?? `${item.checkin_at ?? 'unknown'}-${item.checkout_at ?? 'unknown'}-${index}`}
              withBorder
              radius='sm'
              padding='md'
            >
              <Text fw={600}>{item.guest_name ?? 'Guest'}</Text>
              <Text size='sm' c='dimmed'>
                {formatDateRange(item)}
              </Text>
              <Text size='sm'>Guests: {item.guests_count ?? 'N/A'}</Text>
              {item.note && (
                <Text size='sm' c='dimmed'>
                  Note: {item.note}
                </Text>
              )}
              <Group mt='sm'>
                <Button
                  size='xs'
                  onClick={() => item.id && handleAction(item.id, 'approve')}
                  loading={actingId === item.id}
                  disabled={!item.id}
                >
                  Approve
                </Button>
                <Button
                  size='xs'
                  color='red'
                  onClick={() => item.id && handleAction(item.id, 'reject')}
                  loading={actingId === item.id}
                  disabled={!item.id}
                >
                  Reject
                </Button>
              </Group>
            </Card>
          ))}
        </Stack>
      </Card>
    </main>
  );
}
