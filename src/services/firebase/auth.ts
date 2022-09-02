import {
  AuthProvider,
  browserLocalPersistence,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "./config";

export type ProviderName = "Google" | "Github";
export type Device = "Desktop" | "Mobile";

export const firebaseLogin = async (
  providerName: ProviderName,
  device: Device = "Desktop"
) => {
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

  switch (device) {
    case "Mobile":
      await setPersistence(auth, browserLocalPersistence);
      await signInWithRedirect(auth, authProvider as AuthProvider);
      break;

    default:
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, authProvider as AuthProvider);
      break;
  }
};

export const firebaseLogout = async () => {
  await auth.signOut();
};
