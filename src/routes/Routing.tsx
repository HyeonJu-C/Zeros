import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Goals from "../pages/Goals/Goals";
import AuthContext from "../context/Auth";
import AppLayout from "../components/AppLayout/AppLayout";
import NewGoals from "../pages/NewGoals";

function Routing() {
  const { isLoggedin } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="" element={<Landing />} />
        {isLoggedin && (
          <Route path="/goals" element={<Outlet />}>
            <Route path="" element={<Goals />} />
            <Route path="new" element={<NewGoals />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
}

export default Routing;
