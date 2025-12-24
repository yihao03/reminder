export type User = {
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  uid?: string | null;
};

export type SessionState = {
  user: User | null;
  loading?: boolean;
  loggedIn?: boolean;
};
