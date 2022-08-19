/* eslint-disable prettier/prettier */
import { addMonths, addYears } from "date-fns";

const calculateTargetDate = (selectedDate: string) => {
    let calculatedTargetDate: Date;

    const isTargetMonth = (selectedDate as string).includes("개월");
    const isTargetYear = (selectedDate as string).includes("년");

    const now = new Date();
    const targetDate = +(selectedDate as string)[0]; // "1 개월" => 1

    if (isTargetMonth) {
        calculatedTargetDate = addMonths(now, targetDate);
        return calculatedTargetDate;
    }
    if (isTargetYear) {
        calculatedTargetDate = addYears(now, targetDate);
        return calculatedTargetDate;
    }
    return null;
}

export default calculateTargetDate