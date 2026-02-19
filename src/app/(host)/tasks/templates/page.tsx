'use client';

import { Button, Card } from '@mantine/core';
import { normalizeError } from '@/lib/api/normalizeError';
import { notifyError } from '@/lib/feedback/notify';
import { useEffect, useRef, useState } from 'react';

import { TableShell } from '@/components/ui/table/TableShell';
import { TableState } from '@/components/ui/table/TableState';
import { TaskTemplatesTable } from '@/features/task-templates/components/TaskTemplatesTable';
import { useTaskTemplates } from '@/features/task-templates/hooks/useTaskTemplates';
import { useToggleTaskTemplateActive } from '@/features/task-templates/hooks/useToggleTaskTemplateActive';
import { useAuth } from '@/hooks/useAuth';
import type { TaskTemplate } from '@/lib/api/types';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';

export default function TaskTemplatesPage() {
  const { user, loading } = useAuth();
  const { data = [], isLoading, error, refetch } = useTaskTemplates();
  const toggleActive = useToggleTaskTemplateActive();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const lastErrorRef = useRef<string | null>(null);

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

  if (loading) {
    return <LoadingState text='Checking login status...' />;
  }

  if (!user) {
    return <ErrorState title='ログインが必要です' description='タスクテンプレを表示するにはログインしてください。' />;
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
    <TableShell
      title='Task Templates'
      description='タスク定義の有効/無効を切り替えられます。'
      right={
        <Button component='a' size='sm' href='/tasks/templates/new'>
          New
        </Button>
      }
    >
      <Card withBorder>
        <TableState
          isLoading={isLoading}
          error={error}
          isEmpty={data.length === 0}
          emptyTitle='タスクテンプレがありません'
          emptyDescription='テンプレを作成してください。'
          onRetry={() => void refetch()}
        >
          <TaskTemplatesTable items={data} updatingId={updatingId} onToggle={handleToggle} />
        </TableState>
      </Card>
    </TableShell>
  );
}
