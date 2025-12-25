import { BACKEND_URL } from '$env/static/private';
import { UserSchema } from '$lib/types/auth';
import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const userSession = event.cookies.get('user');
  if (userSession) {
    try {
      const parsed = JSON.parse(userSession);
      const user = UserSchema.parse(parsed);
      event.locals.user = user;
    } catch (error) {
      console.error('Failed to parse user session:', error, userSession);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
}

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
  if (request.url.startsWith(BACKEND_URL)) {

    const token = event.cookies.get('session_token');

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    request.headers.set('X-Client-Side', 'SvelteKit');
  }

  return fetch(request);
};
