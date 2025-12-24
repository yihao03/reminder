import { browser } from "$app/environment";
import Firebase from "$lib/firebase/init.js";
import type { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function load({ url }) {
  let firebaseApp: FirebaseApp;

  if (browser) {
    try {
      firebaseApp = Firebase.getInstance();
    } catch (ex) {
      console.error(ex);
    }
  }

  function getAuthUser() {
    return new Promise((resolve) => {
      onAuthStateChanged(getAuth(firebaseApp), (user) => resolve(user ? user : false));
    });
  }

  return {
    getAuthUser: getAuthUser,
    url: url.pathname
  };
}
