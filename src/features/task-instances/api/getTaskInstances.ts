import { apiFetch } from '@/lib/api/client';
import type { TaskInstance } from '@/lib/api/types';

export const getTaskInstances = async (date: string, token: string) => {
  const searchParams = new URLSearchParams({ date });
  return apiFetch<TaskInstance[]>(`/admin/tasks?${searchParams.toString()}`, {}, token);
};
