import React from "react";
import "./App.css";
import Routing from "./routes/Routing";
import GoalsService from "./services/firebase/goals-database";
import GoalPresenter from "./utils/goal-presenter";

function App() {
  const goalsService = new GoalsService();
  const goalsPresenter = new GoalPresenter();

  return (
    <Routing goalsService={goalsService} goalsPresenter={goalsPresenter} />
  );
}

export default App;
