import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import metricsGray from "../assets/metrics-gray.svg";
import metricsBlue from "../assets/metrics-blue.svg";
import logsGray from "../assets/logs-gray.svg";
import logsBlue from "../assets/logs-blue.svg";

import logo from "../assets/Logo.svg";
import Dropdown from "./Dropdown";

const Navbar = ({ selectedValue, setSelectedValue }) => {
  const location = useLocation();

  const navLinks = [
    {
      to: "/metrics",
      text: "Metrics",
      icon: metricsGray,
      activeIcon: metricsBlue,
    },
    { to: "/logs", text: "Logs", icon: logsGray, activeIcon: logsBlue },
  ];
  return (
    <nav className="bg-white border-gray-200 h-[72px] shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.05)] flex items-center">
      <div className=" flex w-full  px-[40px]">
        <Link to="/" className="flex items-center mr-[40px]">
          <img src={logo} alt="logo" />
        </Link>

        <div className="flex w-full justify-between items-center">
          <ul className="font-medium text-[16px] flex  p-4 gap-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.to}
                  className={
                    "py-2 px-3 text-gray-900 rounded gap-2 hover:bg-gray-100 md:hover:bg-transparent md:border-0 "
                  }
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      {link.icon && (
                        <img
                          src={
                            link.to === location.pathname
                              ? link.activeIcon
                              : link.icon
                          }
                          alt={"link"}
                          className="h-4 w-4"
                        />
                      )}
                      {link.text}
                    </div>
                    {link.to === location.pathname && (
                      <div className="w-full bg-[#5501E1] rounded-md mt-2 h-[3px]"></div>
                    )}
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
          <Dropdown
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
