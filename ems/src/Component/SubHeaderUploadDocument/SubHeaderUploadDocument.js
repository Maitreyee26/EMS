import React, { useState } from "react";
// import "./SubHeader.css";
import "./SubHeaderforUploadDocu.css";
import PersonalDocument from"../UploadDocument/Documents";
import AchievementDocument from "../UploadDocument/AchievementDocument";

export default function Header() {
  const [activeButton, setActiveButton] = useState("PersonalDocument");

  const handleButtonClick = (buttonName) => {
    console.log("Button Clicked:", buttonName);
    setActiveButton(buttonName);
  };

  const renderComponent = () => {
    console.log("Rendering Component:", activeButton);
    switch (activeButton) {
      case "PersonalDocument":
        return <PersonalDocument />;
      case "AchievementDocument":
        return <AchievementDocument />;
      default:
        return null;
    }
  };

  console.log("Rendered Component:", activeButton);

  return (
    <div>
      <nav className="navbar upload-document-header-sub">
        <div className="container">
          <div className="upload-document-subheader-content">
            <button
              className={
                activeButton === "PersonalDocument"
                  ? "upload-document-each-content active"
                  : "upload-document-each-content"
              }
              onClick={() => handleButtonClick("PersonalDocument")}
            >
          Personal Document
            </button>
            <button
              className={
                activeButton === "AchievementDocument"
                  ? "upload-document-each-content active"
                  : "upload-document-each-content"
              }
              onClick={() => handleButtonClick("AchievementDocument")}
            >
              Achievement Document
            </button>
          </div>
        </div>
      </nav>
      <div className="component-container">{renderComponent()}</div>
    </div>
  );
}
