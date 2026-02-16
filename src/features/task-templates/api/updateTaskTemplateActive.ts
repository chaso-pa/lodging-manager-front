import { apiFetch } from '@/lib/api/client';
import type { TaskTemplate } from '@/lib/api/types';

export const updateTaskTemplateActive = async (id: string, isActive: boolean, token: string) =>
  apiFetch<TaskTemplate>(
    `/admin/maintenance-tasks/${id}/active`,
    { method: 'PATCH', body: JSON.stringify({ is_active: isActive }) },
    token
  );
