import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import Firebase from '$lib/firebase/init';

export const load: PageLoad = async () => {
  if (browser) {
    Firebase.getInstance();
    const auth = Firebase.getAuth();

    await new Promise<void>((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        unsubscribe();
        resolve();
      });
    });

    if (auth.currentUser) {
      throw redirect(303, '/');
    }
  }
};
