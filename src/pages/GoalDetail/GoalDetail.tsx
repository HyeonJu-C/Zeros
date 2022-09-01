import { format, parseJSON } from "date-fns";
import { BsShareFill as ShareIcon } from "react-icons/bs";
import React, { MouseEventHandler, useState } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import { GoalData, SavedMoney } from "../../services/firebase/goals-database";
import { PatchedGoalData } from "../Goals/GoalCard/GoalCard";
import styles from "./GoalDetail.module.css";
import useCalendar from "../../hooks/useCalendar";
import DateInfo from "./DateInfo/DateInfo";
import MonthInfo from "./MonthInfo/MonthInfo";
import ToastMessage, {
  ToastMessageState,
} from "../../components/ToastMessage/ToastMessage";

function GoalDetail() {
  const location = useLocation();
  const data = location.state as GoalData;
  const patchedData = (data.patchedData as PatchedGoalData) || [];
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });

  const { userName, goalMoney, goalTitle, goalDate, currentMoney } = data;

  const goalStartDate = parseJSON((currentMoney as SavedMoney[])[0].date);
  const goalEndDate = parseJSON((patchedData.goalDate || goalDate) as string);

  const formattedGoalStart = format(goalStartDate, "yyyy.M.d");
  const formattedGoalEnd = format(goalEndDate, "yyyy.M.d");

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

  const onClickShare: MouseEventHandler = async () => {
    try {
      await navigator.share({
        title: "Zeros",
        text: `${userName}님의 저축 목표`,
        url: window.location.href,
      });
    } catch (error) {
      setToastMessage({
        isVisible: true,
        title: "Fail",
        message: "공유하기 실패",
      });
    }
  };

  return (
    <>
      <section className={`${styles.goalDetail} page-layout`}>
        <h2 className={styles.title}>{`${userName} 님의 ${goalTitle}`}</h2>
        <p
          className={styles.date}
        >{`${formattedGoalStart} ~ ${formattedGoalEnd}`}</p>
        <section className={styles.contentsContainer}>
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
        </section>
        <DateInfo
          currentMoney={
            (patchedData.currentMoney || currentMoney) as SavedMoney[]
          }
          currentDate={currentDate}
          startDate={goalStartDate}
          endDate={goalEndDate}
        />
        <button type="button" className={styles.share} onClick={onClickShare}>
          <span className="sr-only">페이지 링크 공유하기</span>
          <ShareIcon />
        </button>
      </section>
      <ToastMessage
        setToastMessage={setToastMessage}
        isMessageVisible={toastMessage.isVisible}
        title={toastMessage.title as string}
        message={toastMessage.message as string}
      />
    </>
  );
}

export default GoalDetail;
