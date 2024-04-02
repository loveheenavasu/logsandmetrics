import React, { useEffect, useRef, useState } from "react";
import Log from "../component/Log";
import rightArrow from "../assets/arrow-right.svg";
import { MimicLogs } from "../utils/api-mimic";
import InfiniteScroll from "react-infinite-scroll-component";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  console.log("🚀 ~ Logs ~ logs:", logs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liveMode, setLiveMode] = useState(true);
  const [atBottom, setAtBottom] = useState(true);

  const [newMessageCount, setNewMessageCount] = useState(0);
  const logsContainerRef = useRef(null);
  const element = logsContainerRef.current;
  const handleRefresh = () => {
    alert("0848484844848");
  };
  const handleScrollDiv = () => {
    // setIsScroll(false);
    objDiv.scrollTop = element.scrollTop;
    if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  };
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);

        const endTs = Date.now();
        const startTs = endTs - 24 * 60 * 60 * 1000;
        const limit = 10;
        let logsData = [];
        if (!liveMode) {
          logsData = await MimicLogs.fetchPreviousLogs({
            startTs,
            endTs,
            limit,
          });
          setLiveMode(false);
        }

        setLogs(logsData);
        setLoading(false);

        if (liveMode) {
          const unsubscribe = MimicLogs.subscribeToLiveLogs((newLog) => {
            setLogs((prevLogs) => [...prevLogs, newLog]);

            setNewMessageCount((prev) => prev + 1);
          });

          return unsubscribe;
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
        setError(error.message || "Failed to fetch logs");
        setLoading(false);
      }
    };
    fetchLogs();
  }, [liveMode]);

  const handleScroll = () => {
    console.log(
      logsContainerRef.current.scrollTop,
      logsContainerRef.current.scrollHeight,
      "9340394304934"
    );
    logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
  };
  const objDiv = document.getElementById("terminal");

  useEffect(() => {
    if (objDiv && liveMode && atBottom) {
      objDiv.scrollTop = objDiv.scrollHeight;
      setNewMessageCount(0);
    }
  }, [logs]);

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
        {!atBottom && liveMode && (
          <button
            type="button"
            onClick={handleScroll}
            className="flex self-end justify-center items-center fixed bottom-1 mb-20 text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-Indigo-700 dark:hover:bg-Indigo-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {newMessageCount} New Logs
            <svg
              width="9"
              height="13"
              viewBox="0 0 9 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.6875 8.35156C0.78125 8.23438 0.921875 8.1875 1.0625 8.1875C1.22656 8.1875 1.36719 8.23438 1.46094 8.35156L3.6875 10.5781L3.6875 1.0625C3.6875 0.734375 3.94531 0.5 4.25 0.5C4.57813 0.5 4.8125 0.734375 4.8125 1.0625L4.8125 10.5781L7.0625 8.35156C7.27344 8.14062 7.625 8.14062 7.83594 8.35156C8.07031 8.58594 8.07031 8.9375 7.83594 9.14844L4.64844 12.3359C4.4375 12.5703 4.08594 12.5703 3.875 12.3359L0.6875 9.14844C0.453125 8.91406 0.453125 8.5625 0.6875 8.35156Z"
                fill="#E0ECFD"
              />
            </svg>
          </button>
        )}

        <div
          id="terminal"
          ref={logsContainerRef}
          onScroll={handleScrollDiv}
          className="bg-[#0E1623] text-[12px] font-fira-code  rounded-lg flex flex-col gap-[11px] p-[20px] px-3 overflow-y-scroll "
          style={{
            height: "78vh",
            scrollbarWidth: "none" /* Hide scrollbar in Firefox */,
            WebkitScrollbar: {
              display: "none",
            } /* Hide scrollbar in Webkit browsers */,
          }}
        >
          <ul>
            {logs && logs.map((log, index) => <Log log={log} key={index} />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Logs;
