'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTaskTemplate, type TaskTemplateCreateRequest } from '@/features/task-templates/api/createTaskTemplate';
import { useAuth } from '@/hooks/useAuth';
import { notifyError, notifySuccess } from '@/lib/feedback/notify';
import { normalizeError } from '@/lib/api/normalizeError';

export const useCreateTaskTemplate = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TaskTemplateCreateRequest) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const token = await user.getIdToken();
      return createTaskTemplate(payload, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-templates'] });
      notifySuccess('作成しました', 'タスクテンプレを作成しました。');
    },
    onError: (error) => {
      const normalized = normalizeError(error);
      notifyError('作成に失敗しました', normalized.message);
    }
  });
};
