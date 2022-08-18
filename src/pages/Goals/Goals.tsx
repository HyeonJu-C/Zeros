import React from "react";
import { NavLink } from "react-router-dom";
import GoalCard from "./GoalCard/GoalCard";
import styles from "./Goals.module.css";

function Goals() {
  return (
    <section className={styles.goals}>
      <NavLink to="/goals/new" className={styles.newGoalLink}>
        Create your goal, and share it!
      </NavLink>
      <section className={styles.cardContainer}>
        <GoalCard />
        <GoalCard />
        <GoalCard />
        <GoalCard />
        <GoalCard />
      </section>
    </section>
  );
}

export default Goals;
