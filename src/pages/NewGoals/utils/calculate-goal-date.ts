import { addMonths, addYears } from "date-fns";

const calculateGoalDate = (selectedDate: string) => {
  let calculatedGoalDate: Date;

  const isGoalMonth = (selectedDate as string).includes("개월");
  const isGoalYear = (selectedDate as string).includes("년");

  const now = new Date();
  const goalDate = +(selectedDate as string)[0]; // "1 개월" => 1

  if (isGoalMonth) {
    calculatedGoalDate = addMonths(now, goalDate);
    return calculatedGoalDate;
  }
  if (isGoalYear) {
    calculatedGoalDate = addYears(now, goalDate);
    return calculatedGoalDate;
  }
  return null;
};

export default calculateGoalDate;
