import React from "react";
import { Line } from "react-chartjs-2";
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

const LineAreaChart = ({ data }) => {
  const colors = ["#059669", "#2563EB", "#DC2626"];
  // Parse the API data into datasets for Chart.js
  const datasets = data.graphLines.map((line, index) => {
    return {
      label: line.name,
      data: line.values.map((value) => ({
        x: new Date(value.timestamp).toLocaleTimeString(),
        y: value.value,
      })),

      fill: false,
      borderColor: colors[index % colors.length],
      tension: 0.2,
    };
  });
  console.log("🚀 ~ datasets ~ datasets:", datasets);

  // Chart.js configuration
  const options = {
    scales: {
      x: {
        ticks: {
          color: "#6F8EBD",
          font: {
            size: 12,
          },
        },
      },
      y: {
        position: "right",
        min: 0,
        max: 100,
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
  };

  return <Line data={{ datasets }} options={options} />;
};

export default LineAreaChart;
