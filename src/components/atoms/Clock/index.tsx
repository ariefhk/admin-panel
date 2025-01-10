/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useState } from "react";

const addZeroPrefix = (nums: number) => (nums < 10 ? `0${nums}` : nums);

function getCurrentIndonesiaTime(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta", // Default to WIB
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en", options);
  const formattedDate = formatter.format(date);

  // Determine the time zone alias
  const currentHour = date.getHours();
  const timeZoneAlias = currentHour >= 23 ? "WIT" : currentHour >= 22 ? "WITA" : "WIB";

  return {
    timeZoneAlias,
    formattedDate,
  };
}

export type ClockType = {
  initialDate?: Date;
};

const Clock = ({ initialDate }: ClockType) => {
  const [time, setTime] = useState<Date | null>(null); // Null initially for server match
  const serverDate = initialDate || new Date();
  const { timeZoneAlias, formattedDate } = useMemo(() => getCurrentIndonesiaTime(time || serverDate), [time, serverDate]);

  const formattedTime = useMemo(() => {
    const current = time || serverDate;
    return `${addZeroPrefix(current.getHours())}:${addZeroPrefix(current.getMinutes())}:${addZeroPrefix(current.getSeconds())}`;
  }, [time, serverDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-max flex flex-col items-end">
      <div className="flex w-[98px] text-[16px] font-bold justify-between">
        <p>{formattedTime}</p>
        <p>{timeZoneAlias}</p>
      </div>
      <p className="text-sm font-medium">{formattedDate}</p>
    </div>
  );
};

export default Clock;
