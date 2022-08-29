import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Goals from "../pages/Goals/Goals";
import AuthContext from "../context/Auth";
import AppLayout from "../components/AppLayout/AppLayout";
import NewGoals from "../pages/NewGoals/NewGoals";
import GoalDetail from "../pages/GoalDetail/GoalDetail";

function Routing() {
  const { isLoggedin } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="" element={<Landing />} />
        <Route path="/goals" element={<Outlet />}>
          <Route path="" element={<Goals />} />
          <Route path=":goalId" element={<GoalDetail />} />
          {isLoggedin && <Route path="new" element={<NewGoals />} />}
        </Route>
      </Route>
    </Routes>
  );
}

export default Routing;
