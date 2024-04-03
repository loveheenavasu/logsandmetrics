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
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const LineFilledChart = ({ data }) => {
  const colors = ["#2563EB", "#DC2626", "#059669"];
  // Parse the API data into datasets for Chart.js

  const datasets = data?.graphLines?.map((line, index) => {
    const gradient = document
      .createElement("canvas")
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, `${colors[index % colors.length]}20`);
    gradient.addColorStop(1, `${colors[index % colors.length]}00`);

    return {
      label: line.name,
      data: line.values.map((value) => ({
        x: new Date(value.timestamp),
        y: value.value,
      })),
      backgroundColor: gradient,
      borderColor: colors[index % colors.length],
      pointBackgroundColor: colors[index % colors.length],
      tension: 0.2,
      pointStyle: false,
      pointRadius: 0,

      borderWidth: 2,
      pointRadius: 0,
      fill: "start", // Gradient fill starting from bottom
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

export default LineFilledChart;
