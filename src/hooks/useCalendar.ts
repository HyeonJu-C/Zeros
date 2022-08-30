import React, { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  parseJSON,
  subMonths,
  parse,
} from "date-fns";

function useCalendar(startDate: Date, endDate: Date) {
  const startMonth = format(startDate, "yyyy MMM");
  const endMonth = format(endDate, "yyyy MMM");

  const [currentDate, setCurrentDate] = useState(startDate);
  const [currentMonth, setCurrentMonth] = useState(
    format(startDate, "yyyy MMM")
  );
  const firstDateOfCurrentMonth = parse(currentMonth, "yyyy MMM", new Date());

  const datesOfCurrentMonth = eachDayOfInterval({
    start: firstDateOfCurrentMonth,
    end: endOfMonth(firstDateOfCurrentMonth),
  });

  const onClickDate: React.MouseEventHandler<HTMLTimeElement> = (event) => {
    const parsedDate = parseJSON(event.currentTarget.dateTime);
    setCurrentDate(parsedDate);
  };

  const onClickStartMonth: React.MouseEventHandler = () => {
    if (currentMonth === startMonth) return;
    setCurrentMonth(format(startDate, "yyyy MMM"));
  };

  const onClickEndMonth: React.MouseEventHandler = () => {
    if (currentMonth === endMonth) return;
    setCurrentMonth(format(endDate, "yyyy MMM"));
  };

  const onClicKPrevMonth: React.MouseEventHandler = () => {
    if (currentMonth === startMonth) return;
    const newMonth = subMonths(firstDateOfCurrentMonth, 1);
    setCurrentMonth(format(newMonth, "yyyy MMM"));
  };

  const onClickNextMonth: React.MouseEventHandler = () => {
    if (currentMonth === endMonth) return;
    const newMonth = addMonths(firstDateOfCurrentMonth, 1);
    setCurrentMonth(format(newMonth, "yyyy MMM"));
  };

  return {
    currentDate,
    currentMonth,
    firstDateOfCurrentMonth,
    datesOfCurrentMonth,
    onClickDate,
    onClicKPrevMonth,
    onClickNextMonth,
    onClickStartMonth,
    onClickEndMonth,
  };
}

export default useCalendar;
