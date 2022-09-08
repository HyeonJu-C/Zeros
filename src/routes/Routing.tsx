import React, { Suspense, useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import AuthContext from "../context/Auth";
import AppLayout from "../components/AppLayout/AppLayout";

const Goals = React.lazy(() => import("../pages/Goals/Goals"));
const GoalDetail = React.lazy(() => import("../pages/GoalDetail/GoalDetail"));
const NewGoals = React.lazy(() => import("../pages/NewGoals/NewGoals"));
const My = React.lazy(() => import("../pages/My/My"));

function Routing() {
  const { isLoggedin } = useContext(AuthContext);

  return (
    <Suspense fallback={<AppLayout />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="" element={<Landing />} />
          {isLoggedin && <Route path=":userId" element={<My />} />}
          <Route path="/goals" element={<Outlet />}>
            <Route path="" element={<Goals />} />
            <Route path=":goalId" element={<GoalDetail />} />
            {isLoggedin && <Route path="new" element={<NewGoals />} />}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Routing;
