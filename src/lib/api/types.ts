export type User = {
  id?: string;
  firebase_uid?: string;
  role?: 'friend' | 'host' | string;
  name?: string;
  email?: string;
};
