import { BACKEND_URL } from '$env/static/private';
import adminAuth from '$lib/server/firebaseadmin/init';
import { type Handle, type HandleFetch } from '@sveltejs/kit';
import 'dotenv/config';

import { redirect } from '@sveltejs/kit';

const PUBLIC_ROUTES = ['/api/admin/auth', '/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get('session');
  let isAuthenticated = false;

  if (sessionCookie) {
    isAuthenticated = await adminAuth
      .verifyIdToken(sessionCookie)
      .then(() => true)
      .catch((err) => {
        console.log("Invalid or expired session cookie.", err.message || err);
        console.log(`URL: ${event.url.pathname} Referrer: ${event.request.referrer}`);
        return false;
      });
  }
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    event.url.pathname.startsWith(route)
  );

  if (!isAuthenticated && !isPublicRoute) {
    console.log('Redirecting to login from', event.url.pathname);
    redirect(303, '/login');
  }

  if (isAuthenticated && event.url.pathname === '/login') {
    redirect(303, '/');
  }

  return resolve(event);
};

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
  console.info(`\x1b[33m[FETCH]\x1b[0m \x1b[32m${request.method} ${request.url}\x1b[0m`);
  if (request.url.startsWith(BACKEND_URL)) {
    const token = event.cookies.get('session');

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    request.headers.set('X-Client-Side', 'SvelteKit');
  }

  const res = await fetch(request);

  if (res.status === 401) {
    event.cookies.delete('session', { path: '/' });
  }

  return res;
};
