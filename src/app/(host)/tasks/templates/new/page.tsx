'use client';

import { Button, Card, Group, NumberInput, Select, Stack, Switch, Text, Textarea, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCreateTaskTemplate } from '@/features/task-templates/hooks/useCreateTaskTemplate';
import { useAuth } from '@/hooks/useAuth';

const frequencyOptions = [
  { value: 'per_stay', label: 'Per stay' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom' }
];

export default function TaskTemplateCreatePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const createTaskTemplate = useCreateTaskTemplate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<string | null>('per_stay');
  const [dueOffsetHours, setDueOffsetHours] = useState<number | ''>('');
  const [isActive, setIsActive] = useState(true);

  const canSubmit =
    !loading &&
    !!user &&
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    !!frequency &&
    typeof dueOffsetHours === 'number' &&
    dueOffsetHours >= 0;

  const handleSubmit = async () => {
    if (!canSubmit || !frequency || typeof dueOffsetHours !== 'number') {
      return;
    }

    createTaskTemplate.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        frequency: frequency as 'per_stay' | 'daily' | 'weekly' | 'monthly' | 'custom',
        due_offset_hours: dueOffsetHours,
        is_active: isActive
      },
      {
        onSuccess: () => router.replace('/tasks/templates')
      }
    );
  };

  return (
    <main style={{ padding: '2rem' }}>
      <Card withBorder radius='md' padding='lg' style={{ maxWidth: 720, margin: '0 auto' }}>
        <Stack gap='md'>
          <Text fw={700} size='lg'>
            Create Task Template
          </Text>

          {loading && <Text c='dimmed'>Checking login status...</Text>}
          {!loading && !user && <Text c='red'>Please log in to create task templates.</Text>}

          <TextInput label='Title' value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
          <Textarea
            label='Description'
            minRows={3}
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <Select label='Frequency' data={frequencyOptions} value={frequency} onChange={setFrequency} />
          <NumberInput label='Due offset (hours)' min={0} value={dueOffsetHours} onChange={setDueOffsetHours} />
          <Switch label='Active' checked={isActive} onChange={(event) => setIsActive(event.currentTarget.checked)} />

          <Group justify='flex-end'>
            <Button variant='default' onClick={() => router.push('/tasks/templates')}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!canSubmit} loading={createTaskTemplate.isPending}>
              Create
            </Button>
          </Group>
        </Stack>
      </Card>
    </main>
  );
}
