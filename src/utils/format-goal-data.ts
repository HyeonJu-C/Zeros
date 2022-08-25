import { format, parseJSON } from "date-fns";
import { SavedMoney } from "../services/firebase/goals-database";

export const formatGoalMoney = (goalMoney: string) => {
  const isGoalMoneyInteger = Number.isInteger(+goalMoney / 10000);
  const formattedGoalMoney = isGoalMoneyInteger
    ? (+goalMoney / 10000).toLocaleString()
    : (+goalMoney / 10000).toFixed(1).toLocaleString();

  return formattedGoalMoney;
};

export const parseGoalDate = (goalDate: string) => {
  return parseJSON(goalDate);
};

export const formatGoalDate = (goalDate: Date) => {
  return format(goalDate, "yyyy년 MM월 dd일");
};

export const calculateAcheiveRate = (
  currentMoney: SavedMoney[],
  goalMoney: string
) => {
  const totalSavedMoney = currentMoney //
    ?.map(({ money }) => money)
    .reduce((prev, current) => prev + current);

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
