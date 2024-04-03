import React, { useEffect, useRef, useState } from "react";
import Log from "../component/Log";
import rightArrow from "../assets/arrow-right.svg";
import { MimicLogs } from "../utils/api-mimic";
import InfiniteScroll from "react-infinite-scroll-component";
import DateRangePicker, {
  convertToTimestamp,
} from "../component/DateRangePicker";
import { useSearchParams } from "react-router-dom";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liveMode, setLiveMode] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const [atTop, setAtTop] = useState();
  const [isfetch, setFetch] = useState(false);
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  useEffect(() => {
    if (from) {
      setLiveMode(!liveMode);
    }
  }, [from]);

  const [datePicker, setDatePicker] = useState([
    new Date(),
    new Date(Date.now() - 2 * 60 * 1000),
  ]);

  const [newMessageCount, setNewMessageCount] = useState(0);
  const logsContainerRef = useRef(null);
  const element = logsContainerRef.current;

  const handleScrollDiv = () => {
    // setIsScroll(false);
    objDiv.scrollTop = element.scrollTop;
    if (element.scrollTop + element.offsetHeight >= element.scrollHeight - 10) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
    if (objDiv) {
      objDiv.scrollTop = element.scrollTop;
      if (element.scrollTop === 0) {
        // If scrolled to the top
        setAtTop(true);
        setFetch(true);
      } else {
        setAtTop(false);
      }
    }
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const endTs = convertToTimestamp(datePicker?.[1]);

        const startTs = convertToTimestamp(datePicker?.[0]);
        const limit = 100;

        if (atTop || !liveMode) {
          // setFetch(true);
          const res = await MimicLogs.fetchPreviousLogs({
            startTs,
            endTs,
            limit,
          });
          setFetch(false);
          setAtTop(false);
          setLogs((prevLogs) => [...res, ...prevLogs]);
          if (objDiv) logsContainerRef.current.scrollTop = 800;
        }
        setLoading(false);

        if (liveMode) {
          const unsubscribe = MimicLogs.subscribeToLiveLogs((newLog) => {
            setLogs((prevLogs) => [...prevLogs, newLog]);
            setNewMessageCount((prev) => prev + 1);
          });

          return unsubscribe;
        }
      } catch (error) {
        setLoading(false);
        setFetch(false);
        setError(error.message || "Failed to fetch logs");
      }
    };
    fetchLogs();
  }, [liveMode, atTop]);

  const handleScroll = () => {
    logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
  };

  const objDiv = document.getElementById("scrollableDiv");
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
          <DateRangePicker
            datePicker={datePicker}
            setDatePicker={setDatePicker}
          />
        </div>
      </div>

      <div className="bg-[#0E1623] text-[12px] font-fira-code h-full rounded-lg  flex flex-col gap-[11px] p-[20px] px-3 overflow-y-scroll">
        {isfetch ? (
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
        ) : (
          ""
        )}
        {!atBottom && liveMode && (
          <button
            type="button"
            onClick={handleScroll}
            className="flex self-end justify-center items-center fixed bottom-1 mb-14 text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-Indigo-700 dark:hover:bg-Indigo-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {newMessageCount}
            <p className="mr-2 ml-2">New Logs</p>
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
          id="scrollableDiv"
          ref={logsContainerRef}
          onScroll={handleScrollDiv}
          style={{
            height: 520,
            overflow: "auto",
            display: "flex",
            flexDirection: liveMode ? "column" : "column",
            scrollbarWidth: "none",
            WebkitScrollbar: {
              display: "none",
            },
          }}
        >
          {logs && logs.map((log, index) => <Log log={log} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default Logs;
