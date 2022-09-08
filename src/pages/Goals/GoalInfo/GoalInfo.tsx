import React from "react";
import { GiMoneyStack as MoneyIcon } from "react-icons/gi";
import { GoalData } from "../../../types/goals";
import {
  formatGoalMoney,
  formatGoalDate,
  formatGoalTitle,
  parseGoalDate,
} from "../../../utils/format-goal-data";
import { PatchedGoalData } from "../GoalCard/GoalCard";
import styles from "./GoalInfo.module.css";

interface Props {
  data: GoalData;
  patchedData: PatchedGoalData;
  setPatchedData: React.Dispatch<React.SetStateAction<PatchedGoalData>>;
}

function GoalInfo({ data, patchedData, setPatchedData }: Props) {
  const { goalDate, goalMoney, goalTitle } = data;

  const parsedGoalDate = parseGoalDate(goalDate as string);
  const formattedGoalTitle = formatGoalTitle(goalTitle as string);

  const formattedGoalDate = patchedData?.goalDate
    ? formatGoalDate(parseGoalDate(patchedData?.goalDate))
    : formatGoalDate(parsedGoalDate);

  const formattedGoalMoney = patchedData?.goalMoney
    ? formatGoalMoney(patchedData.goalMoney)
    : formatGoalMoney(goalMoney as number);

  return (
    <section className={styles.goalContainer}>
      <div className={styles.iconContainer}>
        <MoneyIcon color="#64c2a8" size="85%" />
      </div>
      <div className={styles.goal}>
        <h2>{formattedGoalTitle}</h2>
        <p>{`목표금액은 ${formattedGoalMoney} 입니다.`}</p>
        <p>{`목표 기한은 ${formattedGoalDate} 입니다.`}</p>
      </div>
    </section>
  );
}

export default GoalInfo;
