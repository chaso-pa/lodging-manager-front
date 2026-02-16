import { apiFetch } from '@/lib/api/client';
import type { TaskTemplate } from '@/lib/api/types';

export type TaskTemplateCreateRequest = {
  title: string;
  description: string;
  frequency: 'per_stay' | 'daily' | 'weekly' | 'monthly' | 'custom';
  due_offset_hours: number;
  is_active?: boolean;
};

export const createTaskTemplate = async (payload: TaskTemplateCreateRequest, token: string) =>
  apiFetch<TaskTemplate>('/admin/maintenance-tasks', { method: 'POST', body: JSON.stringify(payload) }, token);
