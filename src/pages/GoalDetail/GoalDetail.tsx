import { parseJSON } from "date-fns";
import React from "react";
import { useLocation } from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import { GoalData, SavedMoney } from "../../services/firebase/goals-database";
import { PatchedGoalData } from "../Goals/GoalCard/GoalCard";
import styles from "./GoalDetail.module.css";
import useCalendar from "../../hooks/useCalendar";
import DateInfo from "./DateInfo/DateInfo";
import MonthInfo from "./MonthInfo/MonthInfo";

function GoalDetail() {
  const location = useLocation();
  const data = location.state as GoalData;
  const patchedData = data.patchedData as PatchedGoalData;

  const { userName, goalMoney, goalTitle, goalDate, currentMoney } = data;

  const goalStartDate = parseJSON((currentMoney as SavedMoney[])[0].date);
  const goalEndDate = parseJSON((patchedData.goalDate || goalDate) as string);

  const {
    currentDate,
    currentMonth,
    datesOfCurrentMonth,
    onClickDate,
    onClicKPrevMonth,
    onClickNextMonth,
    onClickStartMonth,
    onClickEndMonth,
  } = useCalendar(goalStartDate, goalEndDate);

  return (
    <section className={`${styles.goalDetail} page-layout`}>
      <h2>{`${userName} 님의 ${goalTitle}`}</h2>
      <div className={styles.contentsContainer}>
        <Calendar
          startDate={goalStartDate}
          endDate={goalEndDate}
          currentDate={currentDate}
          currentMonth={currentMonth}
          datesOfCurrentMonth={datesOfCurrentMonth}
          onClickDate={onClickDate}
          onClicKPrevMonth={onClicKPrevMonth}
          onClickNextMonth={onClickNextMonth}
          onClickStartMonth={onClickStartMonth}
          onClickEndMonth={onClickEndMonth}
          currentMoney={
            (patchedData.currentMoney || currentMoney) as SavedMoney[]
          }
        />
        <MonthInfo
          currentMoney={
            (patchedData.currentMoney || currentMoney) as SavedMoney[]
          }
          currentMonth={currentMonth}
          goalMoney={+((patchedData.goalMoney || goalMoney) as string)}
        />
      </div>
      <DateInfo
        currentMoney={
          (patchedData.currentMoney || currentMoney) as SavedMoney[]
        }
        currentDate={currentDate}
        startDate={goalStartDate}
        endDate={goalEndDate}
      />
    </section>
  );
}

export default GoalDetail;
