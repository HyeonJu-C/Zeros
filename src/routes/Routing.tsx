import React, { Suspense, useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import AuthContext from "../context/Auth";
import AppLayout from "../components/AppLayout/AppLayout";
import GoalsService from "../services/firebase/goals-database";

const Goals = React.lazy(() => import("../pages/Goals/Goals"));
const GoalDetail = React.lazy(() => import("../pages/GoalDetail/GoalDetail"));
const NewGoals = React.lazy(() => import("../pages/NewGoals/NewGoals"));
const My = React.lazy(() => import("../pages/My/My"));

interface Props {
  goalsService: GoalsService;
}

function Routing({ goalsService }: Props) {
  const { isLoggedin } = useContext(AuthContext);

  return (
    <Suspense fallback={<AppLayout />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="" element={<Landing />} />
          {isLoggedin && (
            <Route
              path=":userId"
              element={<My goalsService={goalsService} />}
            />
          )}
          <Route path="/goals" element={<Outlet />}>
            <Route path="" element={<Goals goalsService={goalsService} />} />
            <Route
              path=":goalId"
              element={<GoalDetail goalsService={goalsService} />}
            />
            {isLoggedin && (
              <Route
                path="new"
                element={<NewGoals goalsService={goalsService} />}
              />
            )}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Routing;
