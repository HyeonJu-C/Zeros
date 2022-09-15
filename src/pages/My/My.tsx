import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth";
import GoalsService from "../../services/firebase/goals-database";

interface Props {
  goalsService: GoalsService;
}

function My({ goalsService }: Props) {
  const { uid } = useContext(AuthContext);
  useEffect(() => {
    const getData = async () => {
      const data = await goalsService.getGoalsByUserId(uid as string);
      console.log(data);
    };

    getData();
  }, [goalsService, uid]);

  return <section className="page-layout">{uid}</section>;
}

export default My;
