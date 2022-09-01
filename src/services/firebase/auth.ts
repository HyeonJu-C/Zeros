import {
  AuthProvider,
  browserLocalPersistence,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";

export type ProviderName = "Google" | "Github";

export const firebaseLogin = async (providerName: ProviderName) => {
  let authProvider;

  switch (providerName) {
    case "Google":
      authProvider = new GoogleAuthProvider();
      break;
    case "Github":
      authProvider = new GithubAuthProvider();
      break;
    default:
      break;
  }

  await setPersistence(auth, browserLocalPersistence);
  await signInWithPopup(auth, authProvider as AuthProvider);
};

export const firebaseLogout = async () => {
  await auth.signOut();
};
