import firebase from "firebase/app";
import { auth } from "../firebase";

export const login = (): Promise<firebase.User> => {
  let unsubscribe: (() => void) | undefined = undefined;
  return new Promise((resolve, reject) => {
    auth.signInAnonymously().catch(reject);
    unsubscribe = auth.onAuthStateChanged(
      (user) => {
        // unsubscribe?.();
        if (user) {
          resolve(user);
        } else {
          // reject();
        }
      },
      () => {
        // unsubscribe?.();
        // reject();
      }
    );
  });
};
