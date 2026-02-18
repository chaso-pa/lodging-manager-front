'use client';

import { NumberInput, Stack, Text, Textarea } from '@mantine/core';
import { DatePickerInput, type DatesRangeValue } from '@mantine/dates';
import { useMemo, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { createFriendPreReservation } from '@/lib/api/preReservations';
import { FormShell } from '@/components/ui/form/FormShell';
import { FormField } from '@/components/ui/form/FormField';
import { SubmitBar } from '@/components/ui/form/SubmitBar';
import { FormErrorAlert } from '@/components/ui/form/FormErrorAlert';

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
  const [range, setRange] = useState<DatesRangeValue>([null, null]);
  const [guestsCount, setGuestsCount] = useState<string | number>('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    return !!range[0] && !!range[1] && typeof guestsCount === 'number' && guestsCount > 0 && !!user && !loading;
  }, [guestsCount, loading, range, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <FormShell title='Create Pre-Reservation' description='宿泊日と人数を入力してください。'>
      <form onSubmit={handleSubmit}>
        <Stack gap='md'>
          <FormErrorAlert message={error ?? undefined} />

          <FormField label='Stay dates' required>
            <DatePickerInput
              type='range'
              placeholder='Pick check-in and check-out dates'
              value={range}
              onChange={setRange}
              clearable
            />
          </FormField>

          <FormField label='Guests count' required>
            <NumberInput
              placeholder='Number of guests'
              min={1}
              value={guestsCount}
              onChange={setGuestsCount}
              required
            />
          </FormField>

          <FormField label='Memo'>
            <Textarea
              placeholder='Optional note'
              minRows={3}
              value={note}
              onChange={(event) => setNote(event.currentTarget.value)}
            />
          </FormField>

          {loading && <Text c='dimmed'>Checking login status...</Text>}
          {!loading && !user && <Text c='red'>Please log in to create a pre-reservation.</Text>}

          {success && (
            <Text c='teal' fw={600}>
              承認待ち
            </Text>
          )}

          <SubmitBar submitLabel='Submit' isSubmitting={submitting} disabled={!canSubmit} />
        </Stack>
      </form>
    </FormShell>
  );
}
