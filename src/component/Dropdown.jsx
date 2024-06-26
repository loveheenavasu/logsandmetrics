import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const options = [
  { name: "Last 5 minutes", value: "value1" },
  { name: "Last 15 minutes", value: "value2" },
  { name: "Last 30 minutes", value: "value3" },
  { name: "Last 1 hour", value: "value4" },
  { name: "Last 3 hours", value: "value5" },
  { name: "Last 6 hours", value: "value6" },
];

const Dropdown = ({ selectedValue, setSelectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramName = "value";

  const paramValue = searchParams.get(paramName);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Update selectedValue based on query params
    const initialValue = options.find(
      (option) => option.value === searchParams.get(paramName)
    );
    setSelectedValue(initialValue || "");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchParams, setSelectedValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);

    const now = new Date(); // Get current date and time
    let from; // Variable to store 'from' value

    // Calculate 'from' value based on selected option
    switch (option.value) {
      case "value1":
        from = Date.now() - 5 * 60 * 1000;
        break;
      case "value2":
        from = Date.now() - 15 * 60 * 1000;
        break;
      case "value3":
        from = Date.now() - 30 * 60 * 1000;
        break;
      case "value4":
        from = Date.now() - 60 * 60 * 1000;
        break;
      case "value5":
        from = Date.now() - 3 * 60 * 60 * 1000;
        break;
      case "value6":
        from = Date.now() - 6 * 60 * 60 * 1000;
        break;
      default:
        from = null;
    }

    const params = {
      value: option.value,
      from: from,
      to: "now",
    };

    setSearchParams(params);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left w-[180px]"
    >
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-[#BBD2F1] bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {selectedValue ? selectedValue.name : "Select an option"}

          <svg
            className="-mr-1 ml-2 mt-1 h-3 w-3"
            width="9"
            height="5"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 5C4.35938 5 4.23438 4.95312 4.14062 4.85938L1.14062 1.85938C0.9375 1.67188 0.9375 1.34375 1.14062 1.15625C1.32812 0.953125 1.65625 0.953125 1.84375 1.15625L4.5 3.79688L7.14062 1.15625C7.32812 0.953125 7.65625 0.953125 7.84375 1.15625C8.04688 1.34375 8.04688 1.67188 7.84375 1.85938L4.84375 4.85938C4.75 4.95312 4.625 5 4.5 5Z"
              fill="#82A0CE"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 rounded-md bg-white shadow-lg w-[145px]">
          <div
            className="text-[14px] divide-y divide-[#E0ECFD] px-2 py-3"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`
                   py-2 text-sm text-gray-700 w-full flex gap-1`}
                role="menuitem"
                tabIndex="0"
              >
                {option.name}
                {option === selectedValue && (
                  <svg
                    className="float-right mr-2  my-auto h-full"
                    width="8"
                    height="7"
                    viewBox="0 0 8 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.74896 0.750975C7.90966 0.911723 7.99994 1.12971 7.99994 1.35701C7.99994 1.58431 7.90966 1.8023 7.74896 1.96305L3.46299 6.24902C3.30224 6.40972 3.08425 6.5 2.85695 6.5C2.62965 6.5 2.41166 6.40972 2.25091 6.24902L0.536523 4.53463C0.380378 4.37297 0.293978 4.15644 0.295931 3.93168C0.297884 3.70693 0.388034 3.49193 0.546965 3.333C0.705896 3.17407 0.920891 3.08392 1.14564 3.08197C1.3704 3.08001 1.58693 3.16642 1.7486 3.32256L2.85695 4.43091L6.53689 0.750975C6.69764 0.590276 6.91563 0.5 7.14293 0.5C7.37022 0.5 7.58822 0.590276 7.74896 0.750975Z"
                      fill="#2300F7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
