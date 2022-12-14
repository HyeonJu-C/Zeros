import React, { Suspense, useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import AuthContext from "../context/Auth";
import AppLayout from "../components/AppLayout/AppLayout";
import GoalsService from "../services/firebase/goals-database";
import GoalPresenter from "../presenter/goal-presenter";

const Goals = React.lazy(() => import("../pages/Goals/Goals"));
const GoalDetail = React.lazy(() => import("../pages/GoalDetail/GoalDetail"));
const NewGoals = React.lazy(() => import("../pages/NewGoals/NewGoals"));
const My = React.lazy(() => import("../pages/My/My"));

const goalsService = new GoalsService();
const goalsPresenter = new GoalPresenter();

function Routing() {
  const { isLoggedin, uid } = useContext(AuthContext);

  return (
    <Suspense fallback={<AppLayout />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="" element={<Landing />} />
          {isLoggedin && (
            <Route
              path={uid as string}
              element={
                <My
                  goalsService={goalsService}
                  goalsPresenter={goalsPresenter}
                />
              }
            />
          )}
          <Route path="/goals" element={<Outlet />}>
            <Route
              path=""
              element={
                <Goals
                  goalsService={goalsService}
                  goalsPresenter={goalsPresenter}
                />
              }
            />
            <Route
              path=":goalId"
              element={
                <GoalDetail
                  goalsService={goalsService}
                  goalsPresenter={goalsPresenter}
                />
              }
            />
            {isLoggedin && (
              <Route
                path="new"
                element={
                  <NewGoals
                    goalsService={goalsService}
                    goalsPresenter={goalsPresenter}
                  />
                }
              />
            )}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Routing;
