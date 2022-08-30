import { parseJSON } from "date-fns";
import React from "react";
import { useLocation } from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import { GoalData, SavedMoney } from "../../services/firebase/goals-database";
import { PatchedGoalData } from "../Goals/GoalCard/GoalCard";
import styles from "./GoalDetail.module.css";
import useCalendar from "../../hooks/useCalendar";
import MoneyInfo from "./MoneyInfo/MoneyInfo";

function GoalDetail() {
  const location = useLocation();
  const data = location.state as GoalData;
  const patchedData = data.patchedData as PatchedGoalData;
  const { userName, goalTitle, goalDate, goalMoney, currentMoney } = data;

  const startDate = parseJSON((currentMoney as SavedMoney[])[0].date);
  const endDate = parseJSON((patchedData.goalDate || goalDate) as string);

  const {
    currentDate,
    currentMonth,
    datesOfCurrentMonth,
    onClickDate,
    onClicKPrevMonth,
    onClickNextMonth,
    onClickStartMonth,
    onClickEndMonth,
  } = useCalendar(startDate, endDate);

  return (
    <section className={`${styles.goalDetail} page-layout`}>
      <Calendar
        startDate={startDate}
        endDate={endDate}
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
      <MoneyInfo
        currentMoney={
          (patchedData.currentMoney || currentMoney) as SavedMoney[]
        }
        currentDate={currentDate}
        startDate={startDate}
        endDate={endDate}
      />
    </section>
  );
}

export default GoalDetail;
