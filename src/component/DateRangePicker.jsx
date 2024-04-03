import React, { useEffect } from "react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useSearchParams } from "react-router-dom";

function convertToTimestamp(isoTimestamp) {
  if (!isoTimestamp) return null;
  const date = new Date(isoTimestamp);
  return date.getTime();
}

function convertTimestamp(originalTimestamp) {
  const timestamp1 = convertToISODate(originalTimestamp);

  return timestamp1;
}

function convertToISODate(timestamp) {
  if (!timestamp) return null;
  const date = new Date(parseInt(timestamp));
  return date.toISOString();
}

function DateRangePicker({ datePicker, setDatePicker }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function convertToRealDates(timestamps) {
    return timestamps.map((timestamp) => {
      const date = new Date(parseInt(timestamp));
      return date.toLocaleString(); // Convert to local date and time string
    });
  }

  const timestamps = [
    "1712089187036",
    "1712109010494",
    "1712022610494",
    "1712110810653",
  ];

  const realDates = convertToRealDates(timestamps);
  console.log(realDates);
  useEffect(() => {
    const from = searchParams.get("from");
    const toValue = searchParams.get("to");
    const to = toValue === "now" ? Date.now() : convertTimestamp(toValue);

    const startDT = convertTimestamp(from);
    const endDT = to;
    const time = [startDT, endDT];
    setDatePicker(time);
  }, [searchParams, setDatePicker]);

  const handleChange = (newValue) => {
    console.log("🚀 ~ handleChange ~ newValue:", newValue);
    const from = newValue[0];
    const to = newValue[1];
    const params = {
      from: convertToTimestamp(from),
      to: convertToTimestamp(to),
    };
    setSearchParams(params);

    setDatePicker(newValue);
  };

  return (
    <div>
      <DateTimeRangePicker
        onChange={handleChange}
        value={datePicker}
        className="custom-date-time-range-picker"
      />
    </div>
  );
}

export default DateRangePicker;
