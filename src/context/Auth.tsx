/* eslint-disable @typescript-eslint/no-empty-function */
import { addDays, isAfter } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceCheck from "../hooks/useDeviceCheck";
import {
  firebaseLogin,
  firebaseLogout,
  ProviderName,
} from "../services/firebase/auth";
import { auth } from "../services/firebase/config";
import { calculateRemainigTime, getExpiresinTime } from "./utils/logout-timer";

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
interface Props {
  children: React.ReactNode;
}

let autoLogoutTimer: ReturnType<typeof setTimeout>;

export function AuthContextProvider({ children }: Props) {
  const [uid, setUid] = useState<null | string>(null);
  const isLoggedin = !!auth.currentUser && auth.currentUser.uid === uid;
  const { isDesktop } = useDeviceCheck();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    await firebaseLogout();

    localStorage.removeItem("expiresIn");
    clearTimeout(autoLogoutTimer);

    setUid(null);
    navigate("/");
  }, [navigate]);

  const login = useCallback(
    async (providerName: ProviderName) => {
      isDesktop && (await firebaseLogin(providerName));
      !isDesktop && (await firebaseLogin(providerName, "Mobile"));
      if (!auth.currentUser) return;

      const now = new Date();
      const expiresIn = addDays(now, 1);
      const remainingTime = calculateRemainigTime(expiresIn, now);
      localStorage.setItem("expiresIn", JSON.stringify(expiresIn));
      autoLogoutTimer = setTimeout(logout, remainingTime);

      setUid(auth.currentUser.uid);
      navigate("/goals");
    },
    [logout, navigate, isDesktop]
  );

  useEffect(() => {
    auth //
      .onAuthStateChanged((user) => setUid(user?.uid || null));

    const now = new Date();
    const expiresIn = getExpiresinTime();
    if (!expiresIn) return;
    const remainingTime = calculateRemainigTime(expiresIn, now);

    if (isAfter(now, expiresIn)) {
      logout();
      return;
    }

    autoLogoutTimer = setTimeout(logout, remainingTime);
  }, [logout, isDesktop]);

  const value = useMemo(
    () => ({ isLoggedin, uid, login, logout }),
    [isLoggedin, uid, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
