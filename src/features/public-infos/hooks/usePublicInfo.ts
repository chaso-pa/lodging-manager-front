'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublicInfo } from '../api/getPublicInfo';

export const usePublicInfo = () => {
  return useQuery({
    queryKey: ['public-info'],
    queryFn: async () => {
      return getPublicInfo();
    }
  });
};
