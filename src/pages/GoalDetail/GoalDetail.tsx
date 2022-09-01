import { format, parseJSON } from "date-fns";
import { BsShareFill as ShareIcon } from "react-icons/bs";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import {
  getGoal,
  GoalData,
  SavedMoney,
} from "../../services/firebase/goals-database";
import styles from "./GoalDetail.module.css";
import useCalendar from "../../hooks/useCalendar";
import DateInfo from "./DateInfo/DateInfo";
import MonthInfo from "./MonthInfo/MonthInfo";
import ToastMessage, {
  ToastMessageState,
} from "../../components/ToastMessage/ToastMessage";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function GoalDetail() {
  const params = useParams();
  const { goalId } = params;
  const [data, setData] = useState<GoalData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });

  const fallbackDate = new Date();

  const goalStartDate = data
    ? parseJSON((data[0].currentMoney as SavedMoney[])?.[0].date)
    : fallbackDate;
  const goalEndDate = data
    ? parseJSON(data[0].goalDate as string)
    : fallbackDate;

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
        text: `${
          data ? data[0].userName : ""
        } 님이 공유한 저축 목표를 확인해 보세요!`,
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

  useEffect(() => {
    const getData = async () => {
      const goalData = await getGoal(goalId as string);
      setData([goalData]);
    };
    getData() //
      .then(() => setIsLoading(false));
  }, [goalId]);

  return (
    <>
      {isLoading && (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      )}
      {data?.map(
        ({ userName, goalTitle, currentMoney, goalMoney }: GoalData) => (
          <section
            key="goal-detail"
            className={`${styles.goalDetail} page-layout`}
          >
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
                currentMoney={currentMoney as SavedMoney[]}
              />
              <MonthInfo
                currentMoney={currentMoney as SavedMoney[]}
                currentMonth={currentMonth}
                goalMoney={+(goalMoney as string)}
              />
            </section>
            <DateInfo
              currentMoney={currentMoney as SavedMoney[]}
              currentDate={currentDate}
              startDate={goalStartDate}
              endDate={goalEndDate}
            />
            <button
              type="button"
              className={styles.share}
              onClick={onClickShare}
            >
              <span className="sr-only">페이지 링크 공유하기</span>
              <ShareIcon />
            </button>
          </section>
        )
      )}
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
