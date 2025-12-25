import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import Firebase from '$lib/firebase/init';
import { dev } from '$app/environment';

const cookieOpts = {
  path: '/',
  httpOnly: true,
  secure: !dev, // Only secure in production
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7
}


export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required' });
    }

    try {
      const result = await signInWithEmailAndPassword(Firebase.getAuth(), email, password);
      const { user }: UserCredential = result;

      const sessionUser = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      }
      cookies.set('user', JSON.stringify(sessionUser), cookieOpts);

      const token = await result.user.getIdToken();
      cookies.set('session_token', token, cookieOpts);

    } catch (error: any) {
      console.error('Login error:', error, { email });
      return fail(401, { error: 'Invalid email or password' });
    }
    redirect(303, '/');
  }
} satisfies Actions;
