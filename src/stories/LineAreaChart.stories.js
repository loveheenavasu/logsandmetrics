import React from "react";
import LineAreaChart from "../component/LineAreaChart";
import "../main.css";
const mockData = {
  graphLines: [
    {
      name: "Line 1",
      values: [
        { timestamp: 1619523600000, value: 10 },
        { timestamp: 1619527200000, value: 20 },
        { timestamp: 1619530800000, value: 15 },
        { timestamp: 1619534400000, value: 25 },
        { timestamp: 1619538000000, value: 18 },
        { timestamp: 1619541600000, value: 22 },
        { timestamp: 1619545200000, value: 17 },
        // Add more data as needed...
      ],
    },
    {
      name: "Line 2",
      values: [
        { timestamp: 1619523600000, value: 15 },
        { timestamp: 1619527200000, value: 25 },
        { timestamp: 1619530800000, value: 18 },
        { timestamp: 1619534400000, value: 30 },
        { timestamp: 1619538000000, value: 22 },
        { timestamp: 1619541600000, value: 27 },
        { timestamp: 1619545200000, value: 21 },
      ],
    },
    {
      name: "Line 3",
      values: [
        { timestamp: 1619523600000, value: 18 }, // Different value
        { timestamp: 1619527200000, value: 22 }, // Different value
        { timestamp: 1619530800000, value: 25 }, // Different value
        { timestamp: 1619534400000, value: 20 }, // Different value
        { timestamp: 1619538000000, value: 28 }, // Different value
        { timestamp: 1619541600000, value: 19 }, // Different value
        { timestamp: 1619545200000, value: 23 }, // Different value
        // Add more data as needed...
      ],
    },
    // Add more graph lines as needed...
  ],
};
export default {
  title: "LineAreaChart",
  component: <LineAreaChart data={mockData} />,
};

// Default story
export const Default = () => {
  return (
    <div className=" w-[800px]">
      <LineAreaChart data={mockData} />
    </div>
  );
};

export const Large = () => {
  return (
    <div className=" w-full">
      <LineAreaChart data={mockData} />
    </div>
  );
};

export const Small = () => {
  return (
    <div className=" w-[500px]">
      <LineAreaChart data={mockData} />
    </div>
  );
};
