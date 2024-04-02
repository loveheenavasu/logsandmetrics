import React, { useEffect, useState } from "react";
import rightArrow from "../assets/arrow-right.svg";
import { MimicMetrics } from "../utils/api-mimic";
import LineAreaChart from "../component/LineAreaChart";

const Metrics = () => {
  const [metricsData, setMetricsData] = useState([]);
  console.log("🚀 ~ Metrics ~ metricsData:", metricsData[0]);

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
            <div className="gap-1 flex pl-2">
              <p className=" font-work-sans">09/08/2023 10:10</p>
              <img
                src={rightArrow}
                className="h-[17] w-[11px]"
                alt="rightArrow"
              />

              <p className=" font-work-sans">09/08/2023 10:10</p>
            </div>
          </div>

          <div className="py-4 px-[19px] bg-[#F0F7FF] bg-opacity-50 ">
            {/* Card 1 */}
            <div className="flex gap-5 w-full">
              <div className="rounded-lg w-full bg-white border border-[#CEE0F8] px-4 py-3">
                <p className="text-[#3E5680] font-work-sans text-[14px] font-semibold">
                  CPU Usage
                </p>

                <div className="p-4">
                  {/* Chart */}
                  {metricsData?.[0] && <LineAreaChart data={metricsData[0]} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Metrics;
