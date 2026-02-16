'use client';

import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTaskInstance } from '@/features/task-instances/api/updateTaskInstance';
import { useAuth } from '@/hooks/useAuth';
import type { TaskInstance, TaskUpdateRequest } from '@/lib/api/types';

type UpdatePayload = {
  id: string;
  payload: TaskUpdateRequest;
};

export const useUpdateTaskInstance = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: UpdatePayload) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const token = await user.getIdToken();
      return updateTaskInstance(id, payload, token);
    },
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ['task-instances'] });
      const previous = queryClient.getQueriesData<TaskInstance[]>({ queryKey: ['task-instances'] });

      previous.forEach(([key, items]) => {
        if (!items) {
          return;
        }
        queryClient.setQueryData<TaskInstance[]>(
          key,
          items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: payload.status,
                  memo: payload.memo ?? item.memo
                }
              : item
          )
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['task-instances'] });
    }
  });
};
