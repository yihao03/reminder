import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Auth } from '$lib/types/auth';
import { login } from '$lib/server/api/auth';

export const actions = {
  default: async ({ cookies, request, fetch }) => {
    const data = await request.formData();
    const authData = data.get('authData');

    if (!authData) {
      return fail(400, { error: 'Missing authentication data' });
    }

    try {
      const authUser: Auth = JSON.parse(authData as string);
      await login(fetch, authUser);

      cookies.set('session', authUser.idToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 5 // 5 days
      });
    } catch (error: any) {
      console.error('Server login error:', error);
      return fail(401, { error: 'Authentication failed' });
    }
    redirect(303, '/');
  }
} satisfies Actions;
