import { apiFetch } from './client';
import type { User } from './types';

export const bootstrapAuth = async (token: string): Promise<User> => {
  return apiFetch<User>('/auth/bootstrap', { method: 'POST', mode: 'cors' }, token);
};

export const fetchMe = async (token: string): Promise<User> => {
  return apiFetch<User>('/me', { method: 'GET', mode: 'cors' }, token);
};
