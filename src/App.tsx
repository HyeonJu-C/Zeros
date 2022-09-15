import React from "react";
import "./App.css";
import Routing from "./routes/Routing";
import GoalsService from "./services/firebase/goals-database";

function App() {
  const goalsService = new GoalsService();

  return <Routing goalsService={goalsService} />;
}

export default App;
