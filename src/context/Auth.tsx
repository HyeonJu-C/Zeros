/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  firebaseLogin,
  firebaseLogout,
  ProviderName,
} from "../services/firebase/auth";

interface AuthContextValue {
  isLoggedin: null | boolean;
  login: (providerName: ProviderName) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue>({
  isLoggedin: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

interface Props {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [isLoggedin, setIsLoggedin] = useState<null | boolean>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (!storedUid) return;
    setIsLoggedin(true);
  }, []);

  const logout = async () => {
    await firebaseLogout();
    localStorage.removeItem("uid");
    setIsLoggedin(false);
  };
  const login = async (providerName: ProviderName) => {
    await firebaseLogin(providerName);
    setIsLoggedin(true);
    navigate("/goals");
  };

  const value = useMemo(() => ({ isLoggedin, login, logout }), [isLoggedin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
