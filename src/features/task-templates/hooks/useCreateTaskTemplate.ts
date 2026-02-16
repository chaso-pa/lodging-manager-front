'use client';

import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTaskTemplate, type TaskTemplateCreateRequest } from '@/features/task-templates/api/createTaskTemplate';
import { useAuth } from '@/hooks/useAuth';

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
      notifications.show({
        color: 'teal',
        title: '作成しました',
        message: 'タスクテンプレを作成しました。'
      });
    },
    onError: () => {
      notifications.show({
        color: 'red',
        title: '作成に失敗しました',
        message: '入力内容をご確認ください。'
      });
    }
  });
};
