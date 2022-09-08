import { format, parseJSON } from "date-fns";
import { SavedMoney } from "../types/goals";

export const formatGoalMoney = (goalMoney: string) => {
  let isGoalInteger;
  let formattedGoal;

  switch (true) {
    case +goalMoney >= 10000 && +goalMoney < 100000000:
      isGoalInteger = Number.isInteger(+goalMoney / 10000);
      formattedGoal = isGoalInteger
        ? `${(+goalMoney / 10000).toLocaleString()}만 원`
        : `${Math.floor(+goalMoney / 10000).toLocaleString()}만 ${Math.round(
            +goalMoney.slice(-4, goalMoney.length)
          ).toLocaleString()}원`;
      break;

    case +goalMoney >= 100000000:
      isGoalInteger = Number.isInteger(+goalMoney / 100000000);
      formattedGoal = isGoalInteger
        ? `${(+goalMoney / 100000000).toLocaleString()}억 원`
        : `${Math.floor(
            +goalMoney / 100000000
          ).toLocaleString()}억 ${Math.round(
            +goalMoney.slice(-8, goalMoney.length) / 10000
          ).toLocaleString()}만 원`;
      break;

    default:
      formattedGoal = `${(+goalMoney).toLocaleString()} 원`;
      break;
  }

  return formattedGoal;
};

export const parseGoalDate = (goalDate: string) => {
  return parseJSON(goalDate);
};

export const formatGoalDate = (goalDate: Date) => {
  return format(goalDate, "yyyy년 MM월 dd일");
};

export const calculateAcheiveRate = (
  currentMoney: SavedMoney[],
  goalMoney: string | number
) => {
  const totalSavedMoney = currentMoney //
    ?.map(({ money }) => money)
    .reduce((prev, current) => prev + current, 0);

  const acheiveRate = (totalSavedMoney / +goalMoney) * 100;

  return acheiveRate;
};

export const formatAcheiveRate = (acheiveRate: number) => {
  const isRateInteger = Number.isInteger(acheiveRate);

  const formattedAcheiveRate = isRateInteger
    ? acheiveRate
    : acheiveRate.toFixed(1);

  return formattedAcheiveRate;
};

export const formatGoalTitle = (goalTitle: string) => {
  const isLong = goalTitle.length >= 15;

  const formattedGoalTitle = !isLong
    ? goalTitle
    : goalTitle.slice(0, 14).concat("...");

  return formattedGoalTitle;
};
