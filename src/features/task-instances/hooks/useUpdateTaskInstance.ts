'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTaskInstance } from '@/features/task-instances/api/updateTaskInstance';
import { useAuth } from '@/hooks/useAuth';
import type { TaskInstance, TaskUpdateRequest } from '@/lib/api/types';
import { notifyError, notifySuccess } from '@/lib/feedback/notify';
import { normalizeError } from '@/lib/api/normalizeError';

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
      const normalized = normalizeError(_error);
      notifyError('更新に失敗しました', normalized.message);
    },
    onSuccess: (_data, variables) => {
      const statusLabel = variables.payload.status === 'done' ? '完了' : 'スキップ';
      notifySuccess('更新しました', `ステータスを${statusLabel}に更新しました。`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['task-instances'] });
    }
  });
};
