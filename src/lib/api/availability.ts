import { apiFetch } from './client';
import type { AvailabilityResponse } from './types';

type AvailabilityParams = {
  checkin_at: string;
  checkout_at: string;
};

export const fetchAvailability = async (params: AvailabilityParams, token: string) => {
  const searchParams = new URLSearchParams(params);
  return apiFetch<AvailabilityResponse>(`/availability?${searchParams.toString()}`, {}, token);
};
