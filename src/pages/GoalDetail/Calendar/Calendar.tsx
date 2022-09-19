/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  getDate,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  parseJSON,
} from "date-fns";
import {
  AiOutlineDoubleLeft as DoubleLeftIcon,
  AiOutlineLeft as LeftIcon,
  AiOutlineDoubleRight as DoubleRightIcon,
  AiOutlineRight as RightIcon,
} from "react-icons/ai";
import React from "react";
import styles from "./Calendar.module.css";
import { GoalData } from "../../../types/goals";
import { WEEK } from "../../../constants/constants";
import useCalendar from "../../../hooks/useCalendar";
import MonthInfo from "../MonthInfo/MonthInfo";
import GoalPresenter from "../../../presenter/goal-presenter";
import DateInfo from "../DateInfo/DateInfo";

interface Props {
  data: GoalData;
  goalsPresenter: GoalPresenter;
}

function Calendar({ data, goalsPresenter }: Props) {
  const { currentMoney, goalDate } = data;
  const goalStartDate = goalsPresenter.parseGoalDate(currentMoney![0].date);
  const goalEndDate = goalsPresenter.parseGoalDate(goalDate!);

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

  const isDateValid = (date: Date) => {
    return (
      (isSameDay(date, goalStartDate) || isAfter(date, goalStartDate)) &&
      (isSameDay(date, goalEndDate) || isBefore(date, goalEndDate))
    );
  };

  const getSavedMoneyOnDate = (date: Date) =>
    currentMoney! //
      .find(
        (moneyItem) =>
          isSameDay(parseJSON(moneyItem.date), date) && moneyItem.money > 0
      );

  return (
    <>
      <section className={styles.contentsContainer}>
        <section className={styles.calendar}>
          <time
            className={`${styles.title} ${styles.time}`}
            dateTime={currentMonth}
          >
            {currentMonth}
          </time>
          <section className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClickStartMonth}
              className={`${styles.button} ${styles.doubleLeft}`}
            >
              <span className="sr-only">첫번째 달 달력 보기</span>
              <DoubleLeftIcon />
            </button>
            <button
              type="button"
              onClick={onClicKPrevMonth}
              className={`${styles.button} ${styles.left}`}
            >
              <span className="sr-only">이전 달 달력 보기</span>
              <LeftIcon />
            </button>
            <button
              type="button"
              onClick={onClickNextMonth}
              className={`${styles.button} ${styles.right}`}
            >
              <span className="sr-only">다음 달 달력 보기</span>
              <RightIcon />
            </button>
            <button
              type="button"
              onClick={onClickEndMonth}
              className={`${styles.button} ${styles.doubleRight}`}
            >
              <span className="sr-only">마지막 달 달력 보기</span>
              <DoubleRightIcon />
            </button>
          </section>
          <section className={styles.week}>
            {WEEK.map((weekDay, index) => (
              <time
                key={`weedDay_${weekDay}_${index}`}
                dateTime={weekDay}
                className={styles.time}
              >
                {weekDay}
              </time>
            ))}
          </section>
          <section className={styles.date}>
            {datesOfCurrentMonth.map((date, index) => (
              <time
                key={`date-${index}`}
                dateTime={JSON.stringify(date)}
                onClick={isDateValid(date) ? onClickDate : undefined}
                style={{
                  gridColumnStart: index === 0 ? getDay(date) + 1 : "",
                }}
                className={`${styles.time}  ${
                  isSameDay(goalStartDate, date) ? styles.start : ""
                }  ${isSameDay(goalEndDate, date) ? styles.end : ""} 
            ${isSameDay(currentDate, date) ? styles.active : ""}${
                  isDateValid(date) ? "" : styles.invalid
                } ${isSameDay(new Date(), date) ? styles.today : ""}`}
              >
                <span className={styles.dateContents}>{getDate(date)}</span>
                {getSavedMoneyOnDate(date) && (
                  <strong className={styles.circle}>
                    <span className="sr-only">
                      해당 날짜의 저축 현황이 있습니다.
                    </span>
                  </strong>
                )}
              </time>
            ))}
          </section>
        </section>
        <MonthInfo
          currentMonth={currentMonth}
          goalsPresenter={goalsPresenter}
          data={data}
        />
      </section>
      <DateInfo
        currentMoney={currentMoney!}
        currentDate={currentDate}
        startDate={goalStartDate}
        endDate={goalEndDate}
        goalsPresenter={goalsPresenter}
      />
    </>
  );
}

export default Calendar;
