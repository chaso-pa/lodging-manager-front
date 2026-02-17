'use client';

import { Button, Card, Group, Modal, Stack, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { TaskInstancesTable } from '@/features/task-instances/components/TaskInstancesTable';
import { useTaskInstances } from '@/features/task-instances/hooks/useTaskInstances';
import { useUpdateTaskInstance } from '@/features/task-instances/hooks/useUpdateTaskInstance';
import { useAuth } from '@/hooks/useAuth';
import type { TaskInstance } from '@/lib/api/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

const formatDate = (value: Date | string): Date => {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string') {
    const parsedDate = new Date(value);
    return parsedDate;
  }

  throw new Error('Invalid date value');
};

export default function TaskInstancesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const initialDate = useMemo(() => {
    if (dateParam) {
      return dayjs(dateParam).toDate();
    }
    return new Date();
  }, [dateParam]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<TaskInstance | null>(null);
  const [memo, setMemo] = useState('');
  const [actingId, setActingId] = useState<string | null>(null);
  const lastErrorRef = useRef<string | null>(null);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const dateString = useMemo(() => dayjs(selectedDate ?? new Date()).format('YYYY-MM-DD'), [selectedDate]);
  const { data = [], isLoading, error } = useTaskInstances(dateString);
  const updateTaskInstance = useUpdateTaskInstance();

  useEffect(() => {
    if (!error) {
      lastErrorRef.current = null;
      return;
    }

    const message = error instanceof Error ? error.message : 'Failed to load tasks.';
    if (lastErrorRef.current === message) {
      return;
    }
    lastErrorRef.current = message;
    notifications.show({
      color: 'red',
      title: '取得に失敗しました',
      message
    });
  }, [error]);

  const handleDateChange = (value: string | null) => {
    if (!value) {
      return;
    }
    const selectedDate = formatDate(value);
    setSelectedDate(selectedDate);
    router.replace(`/tasks/instances?date=${dayjs(selectedDate).format('YYYY-MM-DD')}`);
  };

  const openDoneModal = (task: TaskInstance) => {
    setActiveTask(task);
    setMemo(task.memo ?? '');
    setModalOpen(true);
  };

  const handleDone = async () => {
    if (!activeTask?.id) {
      return;
    }
    setActingId(activeTask.id);
    updateTaskInstance.mutate(
      {
        id: activeTask.id,
        payload: {
          status: 'done',
          memo: memo.trim() || undefined
        }
      },
      {
        onSettled: () => setActingId(null)
      }
    );
    setModalOpen(false);
    setActiveTask(null);
  };

  const handleSkip = (task: TaskInstance) => {
    if (!task.id) {
      return;
    }
    setActingId(task.id);
    updateTaskInstance.mutate(
      {
        id: task.id,
        payload: { status: 'skipped' }
      },
      {
        onSettled: () => setActingId(null)
      }
    );
  };

  if (loading) {
    return <LoadingState text='Checking login status...' />;
  }

  if (!user) {
    return <ErrorState title='ログインが必要です' description='タスク一覧を表示するにはログインしてください。' />;
  }

  if (isLoading) {
    return <LoadingState text='Loading tasks...' />;
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Failed to load tasks.';
    return <ErrorState description={message} />;
  }

  return (
    <>
      <PageHeader title='Task Instances' description='指定日のタスクを確認して完了/スキップできます。' />
      <Card withBorder>
        <Stack gap='md'>
          <DateInput
            label='Date'
            value={selectedDate}
            onChange={handleDateChange}
            valueFormat='YYYY-MM-DD'
            maxDate={dayjs().add(1, 'year').toDate()}
          />

          {data.length === 0 && (
            <EmptyState title='タスクがありません' description='指定日のタスクは見つかりませんでした。' />
          )}

          {data.length > 0 && (
            <TaskInstancesTable items={data} actingId={actingId} onDone={openDoneModal} onSkip={handleSkip} />
          )}
        </Stack>
      </Card>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title='完了メモ'>
        <Textarea
          label='Memo'
          placeholder='Optional memo'
          minRows={3}
          value={memo}
          onChange={(event) => setMemo(event.currentTarget.value)}
        />
        <Group mt='md' justify='flex-end'>
          <Button variant='default' onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDone} loading={actingId === activeTask?.id}>
            Done
          </Button>
        </Group>
      </Modal>
    </>
  );
}
