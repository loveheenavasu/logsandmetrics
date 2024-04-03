import React, { useState, useEffect, useRef } from "react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useSearchParams } from "react-router-dom";
import rightArrow from "../assets/arrow-right.svg";

export function convertToTimestamp(isoTimestamp) {
  if (!isoTimestamp) return null;
  const date = new Date(isoTimestamp);
  return date.getTime();
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    day: "2-digit",
    month: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${formattedDate} ${formattedTime}`;
};

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
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const from = searchParams.get("from");
    const toValue = searchParams.get("to");
    const to = toValue === "now" ? Date.now() : convertTimestamp(toValue);
    const startDT = convertTimestamp(from);
    const endDT = to;
    const time = [startDT, endDT];
    if (from) {
      setDatePicker(time);
    }
  }, [searchParams, setDatePicker]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (newValue) => {
    const from = newValue[0];
    const to = newValue[1];
    const params = {
      from: convertToTimestamp(from),
      to: convertToTimestamp(to),
    };
    setSearchParams(params);
    setDatePicker(newValue);
    // setShowPicker(false);
  };

  const handleDataClick = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div>
      <div style={{ display: showPicker ? "none" : "block" }}>
        {/* Display the data when picker is hidden */}
        <div
          onClick={handleDataClick}
          style={{ cursor: "pointer" }}
          className="flex gap-1 text-[14px] font-work-sans"
        >
          <span>{formatDate(datePicker[0])}</span>
          <img src={rightArrow} alt="rightArrow" />
          <span>{formatDate(datePicker[1])}</span>
        </div>
      </div>
      <div ref={pickerRef} style={{ display: showPicker ? "block" : "none" }}>
        {/* Show the picker when toggled */}
        <DateTimeRangePicker
          onChange={handleChange}
          defaultValue={[new Date() - 2 * 60 * 1000, new Date()]}
          value={datePicker}
          className="custom-date-time-range-picker"
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
