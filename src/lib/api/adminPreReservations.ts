import { apiFetch } from './client';
import type { Reservation } from './types';

type PreReservationAction = 'approve' | 'reject';

export const fetchAdminPreReservations = async (token: string) =>
  apiFetch<Reservation[]>('/admin/pre-reservations', {}, token);

export const updateAdminPreReservation = async (id: string, action: PreReservationAction, token: string) =>
  apiFetch<Reservation>(
    `/admin/pre-reservations/${id}`,
    { method: 'PATCH', body: JSON.stringify({ action }) },
    token
  );
