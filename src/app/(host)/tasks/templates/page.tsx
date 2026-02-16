'use client';

import { Card, Skeleton, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useRef, useState } from 'react';

import { TaskTemplatesTable } from '@/features/task-templates/components/TaskTemplatesTable';
import { useTaskTemplates } from '@/features/task-templates/hooks/useTaskTemplates';
import { useToggleTaskTemplateActive } from '@/features/task-templates/hooks/useToggleTaskTemplateActive';
import { useAuth } from '@/hooks/useAuth';
import type { TaskTemplate } from '@/lib/api/types';

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
    <main style={{ padding: '2rem' }}>
      <Card withBorder radius='md' padding='lg' style={{ maxWidth: 960, margin: '0 auto' }}>
        <Stack gap='md'>
          <Text fw={700} size='lg'>
            Task Templates
          </Text>

          {loading && <Text c='dimmed'>Checking login status...</Text>}
          {!loading && !user && <Text c='red'>Please log in to view task templates.</Text>}

          {isLoading && (
            <Stack gap='sm'>
              <Skeleton height={24} />
              <Skeleton height={24} />
              <Skeleton height={24} />
            </Stack>
          )}

          {!isLoading && user && data.length === 0 && <Text c='dimmed'>No task templates found.</Text>}

          {!isLoading && data.length > 0 && (
            <TaskTemplatesTable items={data} updatingId={updatingId} onToggle={handleToggle} />
          )}
        </Stack>
      </Card>
    </main>
  );
}
