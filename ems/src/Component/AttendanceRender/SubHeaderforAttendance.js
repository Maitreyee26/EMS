import React, { useState } from "react";

import "./SubHeaderforAttendance.css";
import Attendance from "./Attendance";
import Leave from "./Leave";

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
      <nav className="navbar header-sub">
        <div className="container">
          <div className="subheader-content">
            <button
              className={
                activeButton === "Attendance"
                  ? "each-content active"
                  : "each-content"
              }
              onClick={() => handleButtonClick("Attendance")}
            >
              Attendance
            </button>
            <button
              className={
                activeButton === "Leave"
                  ? "each-content active"
                  : "each-content"
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
  );
}
