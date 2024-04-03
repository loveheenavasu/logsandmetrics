import React from "react";
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
  const colors = ["#DC2626", "#2563EB", "#059669"];
  // Parse the API data into datasets for Chart.js
  const reversedGraphLines = data.graphLines.slice().reverse();

  const datasets = reversedGraphLines.map((line, index) => {
    return {
      label: line.name,
      data: line.values.map((value) => ({
        x: new Date(value.timestamp),
        y: value.value,
      })),

      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      tension: 0.1,
      pointStyle: false,
      pointRadius: 0,
      borderWidth: 2,
    };
  });

  const options = {
    responsive: true,

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

  return (
    <>
      <Line data={{ datasets }} options={options} />
    </>
  );
};

export default LineAreaChart;
