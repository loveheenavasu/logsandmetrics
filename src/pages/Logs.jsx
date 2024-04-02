import React, { useEffect, useState } from "react";
import Log from "../component/Log";
import rightArrow from "../assets/arrow-right.svg";
import { MimicLogs } from "../utils/api-mimic";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  console.log("🚀 ~ Logs ~ logs:", logs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liveMode, setLiveMode] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true); // Set loading to true when fetching logs
        // Define the time range and the number of logs you want to fetch
        const endTs = Date.now(); // current timestamp
        const startTs = endTs - 24 * 60 * 60 * 1000; // 24 hours ago
        const limit = 100; // number of logs to fetch

        // Fetch the logs based on the current mode
        let logsData = [];
        if (!liveMode) {
          logsData = await MimicLogs.fetchPreviousLogs({
            startTs,
            endTs,
            limit,
          });
        }

        // Set the fetched logs in state
        setLogs(logsData);
        setLoading(false);

        // Subscribe to live logs if in live mode
        if (liveMode) {
          const unsubscribe = MimicLogs.subscribeToLiveLogs((newLog) => {
            setLogs((prevLogs) => [...prevLogs, newLog]);
          });

          // Clean up the subscription when the component unmounts or when switching away from live mode
          return unsubscribe;
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
        setError(error.message || "Failed to fetch logs");
        setLoading(false);
      }
    };

    // Call the function to fetch logs when the component mounts or when liveMode changes
    fetchLogs();
  }, [liveMode]); // Fetch logs whenever the liveMode state changes

  const toggleLiveMode = () => {
    setLiveMode((prevMode) => !prevMode); // Toggle between live and previous mode
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="h-[80vh] px-5">
      <div className=" mr-auto">
        <div className="flex justify-end w-full py-2 gap-1 font-work-sans text-[12px]">
          <p>Showing logs for </p>

          <p className=" ">09/08/2023 10:10</p>
          <img src={rightArrow} className="h-[17] w-[11px]" alt="rightArrow" />
          <p className=" ">09/08/2023 10:10</p>
        </div>
      </div>

      <div className="bg-[#0E1623] text-[12px] font-fira-code h-full rounded-lg  flex flex-col gap-[11px] p-[20px] px-3 overflow-y-scroll">
        <div className="flex items-center justify-center bg-[#0E1623]">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-200 animate-spin fill-indigo-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <p className={`pl-3  text-[#82A0CE]`}>Loading previous 100 logs</p>
        </div>
        <ul className="">
          {logs && logs.map((log, index) => <Log log={log} key={index} />)}
        </ul>
      </div>
    </div>
  );
};

export default Logs;
