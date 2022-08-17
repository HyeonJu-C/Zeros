import React, { useContext } from "react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { FaGithub as GithubIcon } from "react-icons/fa";
import AuthContext from "../../context/Auth";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const { login, isLoggedin } = useContext(AuthContext);
  return (
    <section className={styles.loginForm}>
      {!isLoggedin && (
        <>
          <h1>Sign in</h1>
          <button
            type="button"
            className={`${styles.google} ${styles.login}`}
            onClick={() => login("Google")}
          >
            <GoogleIcon className={styles.icon} size={25} /> With Google
          </button>
          <button
            type="button"
            className={`${styles.github} ${styles.login}`}
            onClick={() => login("Github")}
          >
            <GithubIcon className={styles.icon} size={25} color="#242930" />{" "}
            With Github
          </button>
        </>
      )}
    </section>
  );
}

export default LoginForm;
