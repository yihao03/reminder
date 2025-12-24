import type { HandleFetch } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
  if (request.url.startsWith(PUBLIC_BACKEND_URL)) {

    const token = event.cookies.get('session_token');

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    request.headers.set('X-Client-Side', 'SvelteKit');
  }

  return fetch(request);
};
