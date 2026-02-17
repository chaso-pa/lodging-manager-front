import { apiFetch } from '@/lib/api/client';
import type { PublicInfo } from '@/lib/api/types';

export const getPublicInfo = async () => apiFetch<PublicInfo>('/public/info', {});
