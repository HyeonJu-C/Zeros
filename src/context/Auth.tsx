/* eslint-disable @typescript-eslint/no-empty-function */
import { addSeconds, isAfter, parseJSON } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  firebaseLogin,
  firebaseLogout,
  ProviderName,
} from "../services/firebase/auth";
import { auth } from "../services/firebase/config";

interface AuthContextValue {
  isLoggedin: null | boolean;
  uid?: null | string;
  login: (providerName: ProviderName) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue>({
  isLoggedin: null,
  uid: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

const getStorageItems = () => {
  const uid = localStorage.getItem("uid");
  const expiresIn = localStorage.getItem("expiresIn");
  if (!uid || !expiresIn) return null;
  return { uid, expiresIn };
};

const getRemainigTime = (expireTime: Date, now: Date) => {
  return expireTime.getTime() - now.getTime(); // get millie seconds
};

let autoLogoutTimer: ReturnType<typeof setTimeout>;
interface Props {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [uid, setUid] = useState<null | string>(null);
  const navigate = useNavigate();
  const isLoggedin = !!uid;

  const logout = useCallback(async () => {
    await firebaseLogout();

    localStorage.removeItem("uid");
    localStorage.removeItem("expiresIn");
    setUid(null);
    navigate("/");
    clearTimeout(autoLogoutTimer);
  }, [navigate]);

  const login = useCallback(
    async (providerName: ProviderName) => {
      await firebaseLogin(providerName);
      if (!auth.currentUser) return;

      const now = new Date();
      const expiresIn = addSeconds(now, 3600); // tokens expire after one hour
      const remainingTime = getRemainigTime(expiresIn, now);

      localStorage.setItem("uid", JSON.stringify(auth.currentUser.uid));
      localStorage.setItem("expiresIn", JSON.stringify(expiresIn));
      setUid(auth.currentUser.uid);
      navigate("/goals");

      autoLogoutTimer = setTimeout(logout, remainingTime);
    },
    [logout, navigate]
  );

  useEffect(() => {
    const storageItems = getStorageItems();
    if (!storageItems) return;

    setUid(storageItems.uid);

    const now = new Date();
    const expiresIn = parseJSON(storageItems.expiresIn);
    const remainingTime = getRemainigTime(expiresIn, now);

    if (isAfter(now, expiresIn)) {
      logout();
      return;
    }
    autoLogoutTimer = setTimeout(logout, remainingTime);
  }, [logout]);

  const value = useMemo(
    () => ({ isLoggedin, uid, login, logout }),
    [isLoggedin, uid, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
