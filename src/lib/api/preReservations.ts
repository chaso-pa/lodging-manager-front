import { apiFetch } from './client';
import type { Reservation } from './types';

type FriendPreReservationRequest = {
  checkin_at: string;
  checkout_at: string;
  guests_count: number;
  note?: string;
};

export const createFriendPreReservation = async (payload: FriendPreReservationRequest, token: string) =>
  apiFetch<Reservation>('/friend/pre-reservations', { method: 'POST', body: JSON.stringify(payload) }, token);
