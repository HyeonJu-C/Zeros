import React, { useContext } from "react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { FaGithub as GithubIcon } from "react-icons/fa";
import AuthContext from "../../context/Auth";
import styles from "./LoginForm.module.css";
import { ModalState } from "../Modal/Modal";
import { ProviderName } from "../../services/firebase/auth";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
}

function LoginForm({ setModal }: Props) {
  const { login } = useContext(AuthContext);

  const onClickLogin = (providerName: ProviderName) => {
    login(providerName);
    setModal({ isVisible: false });
  };

  return (
    <section className={styles.loginForm}>
      <button
        type="button"
        className={`${styles.google} ${styles.login}`}
        onClick={() => onClickLogin("Google")}
      >
        <GoogleIcon className={styles.icon} size={25} /> With Google
      </button>
      <button
        type="button"
        className={`${styles.github} ${styles.login}`}
        onClick={() => onClickLogin("Github")}
      >
        <GithubIcon className={styles.icon} size={25} color="#242930" /> With
        Github
      </button>
    </section>
  );
}

export default LoginForm;
