import { format, parseJSON } from "date-fns";
import { BsShareFill as ShareIcon } from "react-icons/bs";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import styles from "./GoalDetail.module.css";
import useCalendar from "../../hooks/useCalendar";
import DateInfo from "./DateInfo/DateInfo";
import MonthInfo from "./MonthInfo/MonthInfo";
import ToastMessage, {
  ToastMessageState,
} from "../../components/ToastMessage/ToastMessage";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { GoalData, SavedMoney } from "../../types/goals";
import GoalsService from "../../services/firebase/goals-database";

interface Props {
  goalsService: GoalsService;
}

function GoalDetail({ goalsService }: Props) {
  const [data, setData] = useState<GoalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    isVisible: false,
  });
  const params = useParams();
  const { goalId } = params;

  const fallbackDate = new Date();

  const goalStartDate = data
    ? parseJSON((data.currentMoney as SavedMoney[])?.[0].date)
    : fallbackDate;
  const goalEndDate = data ? parseJSON(data.goalDate as string) : fallbackDate;

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
          data ? data.userName : ""
        } 님이 공유한 저축 목표를 확인해 보세요!`,
        url: window.location.href,
      });
    } catch (error) {
      setToastMessage({
        isVisible: true,
        title: "Fail",
        message: "공유하기 취소",
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const goalData = await goalsService.getGoalById(goalId as string);
      if (!goalData) throw new Error();
      setData(goalData as GoalData);
    };

    getData() //
      .catch(() =>
        setToastMessage({
          isVisible: true,
          title: "Fail",
          message: "데이터를 가져오는 데 실패하였습니다",
        })
      )
      .finally(() => setIsLoading(false));
  }, [goalId, goalsService]);

  return (
    <>
      {isLoading && (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      )}
      {data ? (
        <section
          key="goal-detail"
          className={`${styles.goalDetail} page-layout`}
        >
          <h2
            className={styles.title}
          >{`${data.userName} 님의 ${data.goalTitle}`}</h2>
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
              currentMoney={data.currentMoney as SavedMoney[]}
            />
            <MonthInfo
              currentMoney={data.currentMoney as SavedMoney[]}
              currentMonth={currentMonth}
              goalMoney={+(data.goalMoney as number)}
            />
          </section>
          <DateInfo
            currentMoney={data.currentMoney as SavedMoney[]}
            currentDate={currentDate}
            startDate={goalStartDate}
            endDate={goalEndDate}
          />
          <button type="button" className={styles.share} onClick={onClickShare}>
            <span className="sr-only">페이지 링크 공유하기</span>
            <ShareIcon />
          </button>
        </section>
      ) : null}
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
