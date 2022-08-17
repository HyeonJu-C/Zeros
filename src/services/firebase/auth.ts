/* eslint-disable prettier/prettier */
import {
    AuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
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

    try {
        await signInWithPopup(auth, authProvider as AuthProvider);
    } catch (error) {
        console.log(error);
    }
};

export const firebaseLogout = async () => {
    try {
        if (!auth.currentUser) return;
        await auth.signOut();

    } catch (error) {
        console.log(error);
    }
};
