import React from "react";
import LineAreaChart from "./LineAreaChart";
import LineFilledChart from "./LineFilledChart";

const ChartWithCard = ({ data }) => {
  return (
    <div className="flex gap-5 w-full">
      <div className="rounded-lg w-full bg-white border border-[#CEE0F8] px-4 py-3">
        <p className="text-[#3E5680] font-work-sans text-[14px] font-semibold">
          {data?.name}
        </p>

        <div className="p-4">
          {data?.name === "Disk IOPS"
            ? data && <LineFilledChart data={data} />
            : data && <LineAreaChart data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChartWithCard;
