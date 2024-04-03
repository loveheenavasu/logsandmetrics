import React, { useEffect, useState } from "react";
import rightArrow from "../assets/arrow-right.svg";
import { MimicMetrics } from "../utils/api-mimic";

import ChartWithCard from "../component/ChartWithCard";
import DateRangePicker from "../component/DateRangePicker";

const Metrics = () => {
  const [metricsData, setMetricsData] = useState([]);
  console.log("🚀 ~ Metrics ~ metricsData:", metricsData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MimicMetrics.fetchMetrics({
          startTs: Date.now() - 3600 * 1000, // Example start timestamp
          endTs: Date.now(), // Example end timestamp
        });
        setMetricsData(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {/* Main Card */}
      <div className="bg-[#FAFCFF]  px-5 py-4 mt-[2px]">
        <div className="rounded-lg border-[1px] border-[#CEE0F8]  bg-white ">
          <div className="flex items-center  border-b-[1px] border-[#CEE0F8] px-5 py-4 ">
            <p className="text-[24px] font-bold">Metrics</p>

            <div className="flex  pl-2">
              <DateRangePicker />
            </div>
          </div>

          <div class="grid grid-cols-2 grid-rows-2 h-full py-4 px-[19px] bg-[#F0F7FF] bg-opacity-50 gap-5">
            <div class=" col-span-1 row-span-1">
              <ChartWithCard data={metricsData[0]} />
            </div>

            <div class=" col-span-1 row-span-1">
              <ChartWithCard data={metricsData[1]} />
            </div>

            <div class=" col-span-1 row-span-1">
              <ChartWithCard data={metricsData[2]} />
            </div>

            <div class="col-span-1 row-span-1">
              <ChartWithCard data={metricsData[3]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Metrics;
