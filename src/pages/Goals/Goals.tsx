import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getGoals, GoalData } from "../../services/firebase/goals-database";
import GoalCard from "./GoalCard/GoalCard";
import styles from "./Goals.module.css";

function Goals() {
  const [goalsList, setGoalsList] = useState<GoalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data: GoalData[] = await getGoals();
      setGoalsList(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <section className={styles.goals}>
      <NavLink to="/goals/new" className={styles.newGoalLink}>
        당신의 저축 목표를 만들어 사람들과 공유하세요!
      </NavLink>
      {isLoading && <LoadingSpinner />}
      <section className={styles.cardContainer}>
        {goalsList &&
          goalsList.map((goalItem) => (
            <GoalCard key={goalItem.id} data={goalItem} />
          ))}
      </section>
    </section>
  );
}

export default Goals;
