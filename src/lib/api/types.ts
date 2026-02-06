export type User = {
  id?: string;
  firebase_uid?: string;
  role?: 'friend' | 'host' | string;
  name?: string;
  email?: string;
};

export type PublicInfo = {
  name?: string;
  description?: string;
  location?: string;
  access?: string;
  house_rules?: string[];
  amenities?: string[];
  checkin_time?: string;
  checkout_time?: string;
  notes?: string;
};

export type AvailabilityResponse = {
  available?: boolean;
  reason?: string;
};

export type Reservation = {
  id?: string;
  source?: string;
  status?: string;
  checkin_at?: string;
  checkout_at?: string;
  guests_count?: number;
  guest_name?: string;
  guest_contact?: string;
  note?: string;
  created_by_user_id?: string;
};
