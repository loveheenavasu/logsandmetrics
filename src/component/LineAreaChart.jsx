import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { convertToTimestamp } from "./DateRangePicker";
import { Link } from "react-router-dom";
import { fill } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);
const colors = ["#DC2626", "#2563EB", "#059669"];

const LineAreaChart = ({ data }) => {
  const [selectedPoints, setSelectedPoints] = useState({});
  // Parse the API data into datasets for Chart.js
  const reversedGraphLines = data.graphLines.slice().reverse();

  const getTimeStamps = () => {
    let start;
    let end;
    Object.entries(selectedPoints).forEach(([key, value]) => {
      if (value.length === 2) {
        const dataset = datasets[key];
        const min = Math.min(...value);
        const max = Math.max(...value);

        start = dataset.data[min]?.x;

        end = dataset.data[max]?.y;
      }
    });

    start = convertToTimestamp(start);
    end = convertToTimestamp(start);

    return start & end ? { start, end } : undefined;
  };

  const datasets = reversedGraphLines.map((line, index) => {
    const array = Array.from({ length: line.values.length });

    return {
      label: line.name,
      data: line.values.map((value) => ({
        x: new Date(value.timestamp),
        y: value.value,
      })),
      fill: true,
      backgroundColor: function (context) {
        const points = selectedPoints[index];
        if (points?.length === 2) {
          const start = Math.min(...points);
          const end = Math.max(...points);

          if (context.dataIndex >= start && context.dataIndex <= end) {
            return "red";
          }
        }
        return "transparent";
      },
      borderColor: colors[index % colors.length],
      pointBackgroundColor: colors[index % colors.length],
      tension: 0.02,
      pointStyle: array.map((a, i) => {
        if (selectedPoints[index]?.[i]) {
          return "circle";
        }
        return false;
      }),
      borderWidth: 2,
      pointRadius: array.map((a, i) => {
        if (selectedPoints[index]?.includes?.(i)) {
          return 2;
        }
        return 0;
      }),
    };
  });

  const options = {
    responsive: true,
    onClick: function (evt, element) {
      if (element.length > 0) {
        const points = {};
        const index = element[0].index;
        const dataSetIndex = element[0].datasetIndex;
        points[dataSetIndex] = new Set(selectedPoints[dataSetIndex] || []);
        if (points[dataSetIndex].size === 2) {
          points[dataSetIndex] = new Set();
        }
        points[dataSetIndex].add(index);
        points[dataSetIndex] = Array.from(points[dataSetIndex]);
        setSelectedPoints(points);
        getTimeStamps();
      }
    },
    scales: {
      x: {
        type: "time",
        adapters: {
          date: {
            locale: enUS,
          },
        },
        time: {
          unit: "minute",
          displayFormats: {
            minute: "HH:mm",
          },
          tooltipFormat: "MMM dd, yyyy HH:mm",
        },
        ticks: {
          color: "#6F8EBD",
          font: {
            size: 12,
          },
        },
      },
      y: {
        position: "right",
        grace: "20%",
        ticks: {
          color: "#6F8EBD",
          maxTicksLimit: 8,
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const timeStamps = getTimeStamps();
  console.log("🚀 ~ LineAreaChart ~ timeStamps:", timeStamps);

  return (
    <>
      <div className="relative">
        <Line data={{ datasets }} options={options} />
        {timeStamps && (
          <Link
            className="absolute bottom-[4px] right-[20px]"
            to={`/logs?from=${timeStamps?.start}&to=${timeStamps?.end}`}
          >
            <div className="bg-[#010202] w-[90px] text-white flex justify-center rounded-md">
              {" "}
              View Logs
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default LineAreaChart;
