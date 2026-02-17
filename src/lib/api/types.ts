export type User = {
  id?: string;
  firebase_uid?: string;
  role?: 'friend' | 'host' | string;
  name?: string;
  email?: string;
};

export type PublicInfo = {
  name: string;
  headline: string;
  subheadline: string;
  location: string;
  highlights: string[];
  experiences: Array<{ title: string; description: string; icon: 'telescope' | 'pizza' | 'gift' }>;
  amenities: string[];
  houseRules: string[];
  checkin: string;
  checkout: string;
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

export type TaskInstance = {
  id?: string;
  maintenance_task_id?: string;
  target_date?: string;
  reservation_id?: string;
  status?: string;
  assigned_to_user_id?: string;
  completed_at?: string;
  memo?: string;
};

export type TaskUpdateRequest = {
  status: 'done' | 'skipped';
  memo?: string;
};

export type TaskTemplate = {
  id?: string;
  title?: string;
  description?: string;
  frequency?: 'per_stay' | 'daily' | 'weekly' | 'monthly' | 'custom' | string;
  due_offset_hours?: number;
  is_active?: boolean;
};
