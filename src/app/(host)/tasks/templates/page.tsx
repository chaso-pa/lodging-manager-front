'use client';

import { Button, Card, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useRef, useState } from 'react';

import { TaskTemplatesTable } from '@/features/task-templates/components/TaskTemplatesTable';
import { useTaskTemplates } from '@/features/task-templates/hooks/useTaskTemplates';
import { useToggleTaskTemplateActive } from '@/features/task-templates/hooks/useToggleTaskTemplateActive';
import { useAuth } from '@/hooks/useAuth';
import type { TaskTemplate } from '@/lib/api/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

export default function TaskTemplatesPage() {
  const { user, loading } = useAuth();
  const { data = [], isLoading, error } = useTaskTemplates();
  const toggleActive = useToggleTaskTemplateActive();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const lastErrorRef = useRef<string | null>(null);

  useEffect(() => {
    if (!error) {
      lastErrorRef.current = null;
      return;
    }
    const message = error instanceof Error ? error.message : 'Failed to load task templates.';
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

  if (loading) {
    return <LoadingState text='Checking login status...' />;
  }

  if (!user) {
    return <ErrorState title='ログインが必要です' description='タスクテンプレを表示するにはログインしてください。' />;
  }

  if (isLoading) {
    return <LoadingState text='Loading task templates...' />;
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Failed to load task templates.';
    return <ErrorState description={message} />;
  }

  const handleToggle = (task: TaskTemplate) => {
    if (!task.id) {
      return;
    }
    const nextActive = !task.is_active;
    setUpdatingId(task.id);
    toggleActive.mutate(
      { id: task.id, isActive: nextActive },
      {
        onSettled: () => setUpdatingId(null)
      }
    );
  };

  return (
    <>
      <PageHeader
        title='Task Templates'
        description='タスク定義の有効/無効を切り替えられます。'
        right={
          <Button component='a' size='sm' href='/tasks/templates/new'>
            New
          </Button>
        }
      />
      <Card withBorder>
        <Stack gap='md'>
          {data.length === 0 && (
            <EmptyState title='タスクテンプレがありません' description='テンプレを作成してください。' />
          )}

          {data.length > 0 && <TaskTemplatesTable items={data} updatingId={updatingId} onToggle={handleToggle} />}
        </Stack>
      </Card>
    </>
  );
}
