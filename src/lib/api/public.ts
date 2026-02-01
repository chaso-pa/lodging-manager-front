import { apiFetch } from './client';
import type { PublicInfo } from './types';

export const fetchPublicInfo = async () => apiFetch<PublicInfo>('/public/info');
