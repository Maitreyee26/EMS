import React, { useState } from "react";
import "./SubHeaderOrg.css";

import OrganizationalTree from "../OrgTree/OrgTree";
import AddEmployee from "../EmployeeRegistration/EmployeeRegistrationForm";
import AddDepartment from "../AddDepartment/AddDepartmentForm"
import EditEmployee from "../EditEmployee/Employeeform"
export default function SubHeaderforOrg() {
  const [activeButton, setActiveButton] = useState("OrganizationalTree");

  const handleButtonClick = (buttonName) => {
    console.log("Button Clicked:", buttonName);
    setActiveButton(buttonName);
  };

  const renderComponent = () => {
    console.log("Rendering Component:", activeButton);
    switch (activeButton) {
      case "OrganizationalTree":
        return <OrganizationalTree />;
      case "AddEmployee":
        return <AddEmployee />;
      case "AddDepartment":
            return <AddDepartment/>;
      case"EditEmployee":
        return <EditEmployee/>
      default:
        return null;
    }
  };

  console.log("Rendered Component:", activeButton);

  return (
    <div>
      <nav className="navbar subheaderorg-header-sub">
        <div className="subheaderorg-container">
          <div className="subheaderorg-subheader-content">
            <button
              className={
                activeButton === "OrganizationalTree"
                  ? "subheaderorg-each-content active"
                  : "subheaderorg-each-content"
              }
              onClick={() => handleButtonClick("OrganizationalTree")}
            >
              Organizational Tree
            </button>
            <button
              className={
                activeButton === "AddDepartment"
                  ? "subheaderorg-each-content active"
                  : "subheaderorg-each-content"
              }
              onClick={() => handleButtonClick("AddDepartment")}
            >
              Add Department
            </button>
            <button
              className={
                activeButton === "AddEmployee"
                  ? "subheaderorg-each-content active"
                  : "subheaderorg-each-content"
              }
              onClick={() => handleButtonClick("AddEmployee")}
            >
              Add Employee
            </button>
            <button
              className={
                activeButton === "EditEmployee"
                  ? "subheaderorg-each-content active"
                  : "subheaderorg-each-content"
              }
              onClick={() => handleButtonClick("EditEmployee")}
            >
              Edit Employee
            </button>
          </div>
        </div>
      </nav>
      <div className="subheaderorg-component-container">{renderComponent()}</div>
    </div>
  );
}
