import type { SessionState } from '$lib/types/auth';
import { writable, type Writable } from 'svelte/store';

export const session = <Writable<SessionState>>writable({
  user: null,
  loading: false,
  loggedIn: false
});
