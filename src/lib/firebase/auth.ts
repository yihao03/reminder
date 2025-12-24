import { goto } from "$app/navigation";
import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import Firebase from "./init";
import { session } from "./session";


export async function loginWithMail(email: string, password: string) {
  await signInWithEmailAndPassword(Firebase.getAuth(), email, password)
    .then((result) => {
      const { user }: UserCredential = result;
      session.set({
        loggedIn: true,
        user: {
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          uid: user?.uid,
        },
      });
      goto("/");
    })
    .catch((error) => {
      return error;
    });
}
