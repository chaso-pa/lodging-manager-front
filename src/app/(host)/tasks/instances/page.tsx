'use client';

import { Card, Modal, Stack, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { normalizeError } from '@/lib/api/normalizeError';
import { notifyError } from '@/lib/feedback/notify';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { TaskInstancesTable } from '@/features/task-instances/components/TaskInstancesTable';
import { useTaskInstances } from '@/features/task-instances/hooks/useTaskInstances';
import { useUpdateTaskInstance } from '@/features/task-instances/hooks/useUpdateTaskInstance';
import { useAuth } from '@/hooks/useAuth';
import type { TaskInstance } from '@/lib/api/types';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { FilterBar } from '@/components/ui/table/FilterBar';
import { TableShell } from '@/components/ui/table/TableShell';
import { TableState } from '@/components/ui/table/TableState';
import { FormField } from '@/components/ui/form/FormField';
import { SubmitBar } from '@/components/ui/form/SubmitBar';

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
  const { data = [], isLoading, error, refetch } = useTaskInstances(dateString);
  const updateTaskInstance = useUpdateTaskInstance();

  useEffect(() => {
    if (!error) {
      lastErrorRef.current = null;
      return;
    }

    const normalized = normalizeError(error);
    const message = normalized.message;
    if (lastErrorRef.current === message) {
      return;
    }
    lastErrorRef.current = message;
    notifyError('取得に失敗しました', message);
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

  return (
    <TableShell
      title='Task Instances'
      description='指定日のタスクを確認して完了/スキップできます。'
      filters={
        <FilterBar
          left={
            <DateInput
              label='Date'
              value={selectedDate}
              onChange={handleDateChange}
              valueFormat='YYYY-MM-DD'
              maxDate={dayjs().add(1, 'year').toDate()}
              w='100%'
            />
          }
        />
      }
    >
      <Card withBorder>
        <TableState
          isLoading={isLoading}
          error={error}
          isEmpty={data.length === 0}
          emptyTitle='タスクがありません'
          emptyDescription='指定日のタスクは見つかりませんでした。'
          onRetry={() => void refetch()}
        >
          <TaskInstancesTable items={data} actingId={actingId} onDone={openDoneModal} onSkip={handleSkip} />
        </TableState>
      </Card>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title='完了メモ'>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleDone();
          }}
        >
          <Stack gap='md'>
            <FormField label='Memo'>
              <Textarea
                placeholder='Optional memo'
                minRows={3}
                value={memo}
                onChange={(event) => setMemo(event.currentTarget.value)}
              />
            </FormField>
            <SubmitBar
              submitLabel='Done'
              cancelLabel='Cancel'
              onCancel={() => setModalOpen(false)}
              isSubmitting={actingId === activeTask?.id}
            />
          </Stack>
        </form>
      </Modal>
    </TableShell>
  );
}
