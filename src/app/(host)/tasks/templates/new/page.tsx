'use client';

import { NumberInput, Select, Stack, Switch, Textarea, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCreateTaskTemplate } from '@/features/task-templates/hooks/useCreateTaskTemplate';
import { useAuth } from '@/hooks/useAuth';
import { FormShell } from '@/components/ui/form/FormShell';
import { FormField } from '@/components/ui/form/FormField';
import { SubmitBar } from '@/components/ui/form/SubmitBar';
import { FormErrorAlert } from '@/components/ui/form/FormErrorAlert';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';

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
  const [dueOffsetHours, setDueOffsetHours] = useState<number | string>(0);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    !loading &&
    !!user &&
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    !!frequency &&
    typeof dueOffsetHours === 'number' &&
    dueOffsetHours >= 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || !frequency || typeof dueOffsetHours !== 'number') {
      setError('必須項目を入力してください。');
      return;
    }

    setError(null);
    createTaskTemplate.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        frequency: frequency as 'per_stay' | 'daily' | 'weekly' | 'monthly' | 'custom',
        due_offset_hours: dueOffsetHours,
        is_active: isActive
      },
      {
        onSuccess: () => router.replace('/tasks/templates'),
        onError: () => setError('作成に失敗しました。内容をご確認ください。')
      }
    );
  };

  if (loading) {
    return <LoadingState text='Checking login status...' />;
  }

  if (!user) {
    return <ErrorState title='ログインが必要です' description='タスクテンプレを作成するにはログインしてください。' />;
  }

  return (
    <FormShell title='Create Task Template' description='タスク定義の基本情報を入力してください。'>
      <form onSubmit={handleSubmit}>
        <Stack gap='md'>
          <FormErrorAlert message={error ?? undefined} />
          <FormField label='Title' required>
            <TextInput value={title} onChange={(event) => setTitle(event.currentTarget.value)} required />
          </FormField>
          <FormField label='Description' required>
            <Textarea
              minRows={3}
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              required
            />
          </FormField>
          <FormField label='Frequency' required>
            <Select data={frequencyOptions} value={frequency} onChange={setFrequency} required />
          </FormField>
          <FormField label='Due offset (hours)' required>
            <NumberInput min={0} value={dueOffsetHours} onChange={setDueOffsetHours} required />
          </FormField>
          <FormField label='Active'>
            <Switch checked={isActive} onChange={(event) => setIsActive(event.currentTarget.checked)} />
          </FormField>
          <SubmitBar
            submitLabel='Create'
            cancelLabel='Cancel'
            onCancel={() => router.push('/tasks/templates')}
            isSubmitting={createTaskTemplate.isPending}
            disabled={!canSubmit}
          />
        </Stack>
      </form>
    </FormShell>
  );
}
