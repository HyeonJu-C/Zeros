import React, { useContext, useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/Auth";
import LoginForm from "../LoginForm/LoginForm";
import Modal, { ModalState } from "../Modal/Modal";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { logout, isLoggedin, uid } = useContext(AuthContext);
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
  });

  const onClickLogin = () => {
    setModal({
      isVisible: true,
      title: "Login",
      message: <LoginForm setModal={setModal} />,
    });
  };

  const onClickLogout = () => {
    setModal({
      isVisible: true,
      title: "Logout",
      message: "로그아웃 하시겠습니까?",
    });
  };

  const onConfirmClick = () => {
    setModal({ isVisible: false });

    switch (modal.title) {
      case "Login":
        break;

      case "Logout":
        logout();
        break;

      default:
        break;
    }
  };

  const onCancelClick = () => {
    setModal({ isVisible: false });
  };

  return (
    <>
      {modal.isVisible && (
        <Modal
          title={modal.title}
          message={modal.message}
          modal={modal}
          hideButtons={modal.title === "Login"}
          setModal={setModal}
          onConfirmClick={onConfirmClick}
          onCancelClick={onCancelClick}
        />
      )}
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
