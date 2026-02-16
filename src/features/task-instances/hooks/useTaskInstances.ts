'use client';

import { useQuery } from '@tanstack/react-query';
import { getTaskInstances } from '@/features/task-instances/api/getTaskInstances';
import { useAuth } from '@/hooks/useAuth';

export const useTaskInstances = (date: string) => {
  const { user, loading } = useAuth();

  return useQuery({
    queryKey: ['task-instances', date, user?.uid ?? 'guest'],
    enabled: !!user && !loading,
    queryFn: async () => {
      if (!user) {
        return [];
      }
      const token = await user.getIdToken();
      return getTaskInstances(date, token);
    }
  });
};
