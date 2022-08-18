import React, { useContext, useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../context/Auth";
import Modal from "../Modal/Modal";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { logout, isLoggedin } = useContext(AuthContext);
  const { pathname: currentLocation } = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);

  const isLandingPage = currentLocation === "/";
  const isGoalsPage = currentLocation.includes("goals");

  const onClickLogout = () => {
    setModalVisible(true);
  };

  const onConfirmClick = () => {
    setModalVisible(false);
    logout();
  };

  const onCancelClick = () => {
    setModalVisible(false);
  };

  return (
    <>
      {isModalVisible && (
        <Modal
          title="Logout"
          message="로그아웃 하시겠습니까?"
          setModalVisible={setModalVisible}
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
            {isLoggedin && (
              <>
                <li className={styles.li}>
                  <NavLink
                    to="/"
                    className={isLandingPage ? styles.activeLink : ""}
                  >
                    Home
                  </NavLink>
                </li>
                <li className={styles.li}>
                  <NavLink
                    to="/goals"
                    className={isGoalsPage ? styles.activeLink : ""}
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
