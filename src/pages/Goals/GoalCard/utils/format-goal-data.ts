import { format, parseJSON } from "date-fns";
import { SavedMoney } from "../../../../services/firebase/database";

export const formatGoalMoney = (goalMoney: string) => {
  const isGoalMoneyInteger = Number.isInteger(+goalMoney / 10000);
  const formattedGoalMoney = isGoalMoneyInteger
    ? (+(goalMoney as string) / 10000).toLocaleString()
    : (+(goalMoney as string) / 10000).toFixed(1).toLocaleString();

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

  const acheiveRate =
    ((totalSavedMoney as number) / +(goalMoney as string)) * 100;

  return acheiveRate;
};
