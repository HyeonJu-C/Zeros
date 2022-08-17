import React, { useContext } from "react";
import AuthContext from "../../context/Auth";

function LoginForm() {
  const { login, logout, isLoggedin } = useContext(AuthContext);
  return (
    <section>
      {isLoggedin && (
        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      )}
      {!isLoggedin && (
        <>
          <button type="button" onClick={() => login("Google")}>
            Google
          </button>
          <button type="button" onClick={() => login("Github")}>
            Github
          </button>
        </>
      )}
    </section>
  );
}

export default LoginForm;
