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
