import React from "react";

const Log = ({ log, index }) => {
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const milliseconds = ("00" + date.getMilliseconds()).slice(-3);
    return `${getMonthName(date)} ${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  function getMonthName(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  }

  return (
    <li className=" flex gap-[9px] py-[11px]" key={index}>
      <div className="bg-[#60A5FA] rounded w-[2px] fira-code h-[17px]" />
      <p className="text-[#5E7BAA] flex" style={{ whiteSpace: "nowrap" }}>
        {log.timestamp && formatDate(log.timestamp)}
      </p>
      <p className="text-[#A8C3E8] h-full w-full ">
        {log.message && log.message}
      </p>
    </li>
  );
};

export default Log;
