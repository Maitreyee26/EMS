import React, { useState } from "react";

import "./SubHeaderforAttendance.css";
import Attendance from "../AttendanceRender/Attendance";
import Leave from "../Leave/Leave";

export default function Header() {
  const [activeButton, setActiveButton] = useState("Attendance");

  const handleButtonClick = (buttonName) => {
    console.log("Button Clicked:", buttonName);
    setActiveButton(buttonName);
  };

  const renderComponent = () => {
    console.log("Rendering Component:", activeButton);
    switch (activeButton) {
      case "Attendance":
        return <Attendance />;
      case "Leave":
        return <Leave />;
      default:
        return null;
    }
  };

  console.log("Rendered Component:", activeButton);

  return (
    <div>
    <div>
      <nav className="navbar SubAttendance-header-sub">
        <div className="container">
          <div className="SubAttendance-subheader-content">
            <button
              className={
                activeButton === "Attendance"
                  ? "SubAttendance-each-content SubAttendance-active"
                  : "SubAttendance-each-content"
              }
              onClick={() => handleButtonClick("Attendance")}
            >
              Attendance
            </button>
            <button
              className={
                activeButton === "Leave"
                  ? "SubAttendance-each-content SubAttendance-active"
                  : "SubAttendance-each-content"
              }
              onClick={() => handleButtonClick("Leave")}
            >
              Leave
            </button>
          </div>
        </div>
      </nav>
      <div className="component-container">{renderComponent()}</div>
    </div>
    </div>
  );
}
