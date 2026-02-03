'use client';

import { Button, Card, NumberInput, Text, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useMemo, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { createFriendPreReservation } from '@/lib/api/preReservations';

type RangeValue = [Date | null, Date | null];

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

export default function FriendPreReservationPage() {
  const { user, loading } = useAuth();
  const [range, setRange] = useState<RangeValue>([null, null]);
  const [guestsCount, setGuestsCount] = useState<number | ''>('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    return !!range[0] && !!range[1] && typeof guestsCount === 'number' && guestsCount > 0 && !!user && !loading;
  }, [guestsCount, loading, range, user]);

  const handleSubmit = async () => {
    if (!user || loading) {
      setError('Please log in to create a pre-reservation.');
      return;
    }

    const [checkin, checkout] = range;
    if (!checkin || !checkout || typeof guestsCount !== 'number' || guestsCount <= 0) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      await createFriendPreReservation(
        {
          checkin_at: formatDateTime(checkin),
          checkout_at: formatDateTime(checkout),
          guests_count: guestsCount,
          note: note.trim() || undefined
        },
        token
      );
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create pre-reservation.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <Card withBorder radius='md' padding='lg' style={{ maxWidth: 640, margin: '0 auto' }}>
        <Text fw={700} size='lg' mb='sm'>
          Create Pre-Reservation
        </Text>

        <DatePickerInput
          type='range'
          label='Stay dates'
          placeholder='Pick check-in and check-out dates'
          value={range}
          onChange={setRange}
          clearable
          mb='md'
        />

        <NumberInput
          label='Guests count'
          placeholder='Number of guests'
          min={1}
          value={guestsCount}
          onChange={setGuestsCount}
          mb='md'
        />

        <Textarea
          label='Memo'
          placeholder='Optional note'
          minRows={3}
          value={note}
          onChange={(event) => setNote(event.currentTarget.value)}
          mb='md'
        />

        {loading && <Text c='dimmed'>Checking login status...</Text>}
        {!loading && !user && <Text c='red'>Please log in to create a pre-reservation.</Text>}

        {error && (
          <Text c='red' size='sm' mb='sm'>
            {error}
          </Text>
        )}

        {success && (
          <Text c='teal' fw={600} mb='sm'>
            承認待ち
          </Text>
        )}

        <Button onClick={handleSubmit} disabled={!canSubmit || submitting} loading={submitting}>
          Submit
        </Button>
      </Card>
    </main>
  );
}
