import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Goals from "../pages/Goals";
import AuthContext from "../context/Auth";

function Routing() {
  const { isLoggedin } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="" element={<Landing />} />
      {isLoggedin && <Route path="/goals" element={<Goals />} />}
    </Routes>
  );
}

export default Routing;
