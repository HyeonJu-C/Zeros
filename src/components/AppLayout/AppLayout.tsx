import React, { useContext, useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/Auth";
import Modal, { ModalState } from "../Modal/Modal";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { logout, isLoggedin } = useContext(AuthContext);
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
  });
  const { isVisible: isModalVisible } = modal;

  const onClickLogout = () => {
    setModal({ isVisible: true });
  };

  const onConfirmLogout = () => {
    setModal({ isVisible: false });
    logout();
  };

  const onCancelLogout = () => {
    setModal({ isVisible: false });
  };

  return (
    <>
      {isModalVisible && (
        <Modal
          title="Logout"
          message="로그아웃 하시겠습니까?"
          setModal={setModal}
          onConfirmClick={onConfirmLogout}
          onCancelClick={onCancelLogout}
        />
      )}
      <nav className={styles.nav}>
        <div className={styles.ulContainer}>
          <Link to="/" className={styles.logo}>
            Zeros
          </Link>
          <ul className={styles.ul}>
            {isLoggedin && (
              <>
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
                <li className={styles.li}>
                  <button
                    type="button"
                    className={styles.logout}
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default AppLayout;
