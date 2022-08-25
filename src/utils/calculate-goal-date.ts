import { addDays, addMonths, addYears } from "date-fns";

const calculateGoalDate = (selectedDate: string) => {
  let calculatedGoalDate: Date;

  const isGoalWithDay = selectedDate.includes("일");
  const isGoalWithMonth = selectedDate.includes("개월");
  const isGoalWithYear = selectedDate.includes("년");

  const now = new Date();
  const goalDate = +(selectedDate as string)[0]; // "1 개월" => 1

  if (isGoalWithDay) {
    calculatedGoalDate = addDays(now, goalDate);
    return calculatedGoalDate;
  }
  if (isGoalWithMonth) {
    calculatedGoalDate = addMonths(now, goalDate);
    return calculatedGoalDate;
  }
  if (isGoalWithYear) {
    calculatedGoalDate = addYears(now, goalDate);
    return calculatedGoalDate;
  }
  return null;
};

export default calculateGoalDate;
