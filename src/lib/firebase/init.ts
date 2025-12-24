import { initializeApp, type FirebaseApp } from 'firebase/app';
import { PUBLIC_API_KEY, PUBLIC_APP_ID, PUBLIC_AUTH_DOMAIN, PUBLIC_MEASUREMENT_ID, PUBLIC_MESSAGING_SENDER_ID, PUBLIC_PROJECT_ID, PUBLIC_STORAGE_BUCKET } from '$env/static/public';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: PUBLIC_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID,
  measurementId: PUBLIC_MEASUREMENT_ID
};

class Firebase {
  static #instance: FirebaseApp;

  private constructor() { }

  public static getInstance(): FirebaseApp {
    if (!Firebase.#instance) {
      const app = initializeApp(firebaseConfig);
      Firebase.#instance = app;
    }

    return Firebase.#instance;
  }

  public static getAuth() {
    return getAuth(Firebase.getInstance());
  }
}

export default Firebase;
