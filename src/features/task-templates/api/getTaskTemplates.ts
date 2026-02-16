import { apiFetch } from '@/lib/api/client';
import type { TaskTemplate } from '@/lib/api/types';

export const getTaskTemplates = async (token: string) => apiFetch<TaskTemplate[]>('/admin/maintenance-tasks', {}, token);
