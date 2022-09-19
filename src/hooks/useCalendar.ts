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

function useCalendar(startDate: Date, endDate: Date, pattern = "yyyy MMM") {
  const startMonth = format(startDate, pattern);
  const endMonth = format(endDate, pattern);

  const [currentDate, setCurrentDate] = useState(startDate);
  const [currentMonth, setCurrentMonth] = useState(format(startDate, pattern));
  const firstDateOfCurrentMonth = parse(currentMonth, pattern, new Date());

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
    setCurrentMonth(format(startDate, pattern));
  };

  const onClickEndMonth: React.MouseEventHandler = () => {
    if (currentMonth === endMonth) return;
    setCurrentMonth(format(endDate, pattern));
  };

  const onClicKPrevMonth: React.MouseEventHandler = () => {
    if (currentMonth === startMonth) return;
    const newMonth = subMonths(firstDateOfCurrentMonth, 1);
    setCurrentMonth(format(newMonth, pattern));
  };

  const onClickNextMonth: React.MouseEventHandler = () => {
    if (currentMonth === endMonth) return;
    const newMonth = addMonths(firstDateOfCurrentMonth, 1);
    setCurrentMonth(format(newMonth, pattern));
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
