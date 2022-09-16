import React, { useContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/Auth";
import useModal from "../../hooks/useModal";
import LoginForm from "../LoginForm/LoginForm";
import Modal from "../Modal/Modal";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { logout, isLoggedin, uid } = useContext(AuthContext);
  const {
    modal: loginModal,
    setModal: setLoginModal,
    onClickCancel: onClickLoginCancel,
    onClickBackground: onClickLoginBackground,
  } = useModal();

  const {
    modal: logoutModal,
    setModal: setLogoutModal,
    onClickCancel: onClickLogoutCancel,
    onClickBackground: onClickLogoutBackground,
  } = useModal();

  const onClickLogin = () => {
    setLoginModal({
      isVisible: true,
      title: "Login",
      message: <LoginForm setModal={setLoginModal} />,
    });
  };

  const onClickLogout = () => {
    setLogoutModal({
      isVisible: true,
      title: "Logout",
      message: "로그아웃 하시겠습니까?",
    });
  };

  const onConfirmLogout = () => {
    setLogoutModal({ isVisible: false });
    logout();
  };

  return (
    <>
      <Modal
        hideButtons
        modal={loginModal}
        onCancelClick={onClickLoginCancel}
        onClickBackground={onClickLoginBackground}
      />
      <Modal
        modal={logoutModal}
        onConfirmClick={onConfirmLogout}
        onCancelClick={onClickLogoutCancel}
        onClickBackground={onClickLogoutBackground}
      />
      <nav className={styles.nav}>
        <div className={styles.ulContainer}>
          <Link to="/" className={styles.logo}>
            Zeros
          </Link>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to="/goals"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Goals
              </NavLink>
            </li>
            {isLoggedin && (
              <li className={styles.li}>
                <NavLink
                  to={`${uid}`}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ""
                  }
                >
                  My
                </NavLink>
              </li>
            )}
            {isLoggedin && (
              <li className={styles.li}>
                <button
                  type="button"
                  className={styles.logout}
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            )}
            {!isLoggedin && (
              <li className={styles.li}>
                <button
                  type="button"
                  className={styles.login}
                  onClick={onClickLogin}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default AppLayout;
