import { BACKEND_URL } from '$env/static/private';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';
import { getAuth } from 'firebase-admin/auth';

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event);
}

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
  if (request.url.startsWith(BACKEND_URL)) {

    const token = event.cookies.get('session');

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    request.headers.set('X-Client-Side', 'SvelteKit');
  }

  return fetch(request);
};
