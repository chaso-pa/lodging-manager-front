'use client';

import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';
import { getTaskTemplates } from '@/features/task-templates/api/getTaskTemplates';

export const useTaskTemplates = () => {
  const { user, loading } = useAuth();

  return useQuery({
    queryKey: ['task-templates', user?.uid ?? 'guest'],
    enabled: !!user && !loading,
    queryFn: async () => {
      if (!user) {
        return [];
      }
      const token = await user.getIdToken();
      return getTaskTemplates(token);
    }
  });
};
