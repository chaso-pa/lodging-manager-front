'use client';

import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTaskTemplateActive } from '@/features/task-templates/api/updateTaskTemplateActive';
import { useAuth } from '@/hooks/useAuth';
import type { TaskTemplate } from '@/lib/api/types';

type TogglePayload = {
  id: string;
  isActive: boolean;
};

export const useToggleTaskTemplateActive = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: TogglePayload) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const token = await user.getIdToken();
      return updateTaskTemplateActive(id, isActive, token);
    },
    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({ queryKey: ['task-templates'] });
      const previous = queryClient.getQueriesData<TaskTemplate[]>({ queryKey: ['task-templates'] });

      previous.forEach(([key, items]) => {
        if (!items) {
          return;
        }
        queryClient.setQueryData<TaskTemplate[]>(
          key,
          items.map((item) => (item.id === id ? { ...item, is_active: isActive } : item))
        );
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        context.previous.forEach(([key, items]) => {
          queryClient.setQueryData(key, items);
        });
      }
      notifications.show({
        color: 'red',
        title: '更新に失敗しました',
        message: 'もう一度お試しください。'
      });
    },
    onSuccess: () => {
      notifications.show({
        color: 'teal',
        title: '更新しました',
        message: 'アクティブ状態を更新しました。'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['task-templates'] });
    }
  });
};
