import { apiFetch } from '@/lib/api/client';
import type { TaskInstance, TaskUpdateRequest } from '@/lib/api/types';

export const updateTaskInstance = async (id: string, payload: TaskUpdateRequest, token: string) =>
  apiFetch<TaskInstance>(`/admin/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }, token);
