
import React, { useState } from 'react';
import './SubHeaderEmp.css';
import FeedbackGiven from './FeedbackGiven.js'; 
// Import your Request component
import FeedbackReceive from './FeedbackReceive.jsx';
import NotesComponent from './Notes.jsx'; // Import your Notes component
import Achievement from '../PerformanceByManager/AchievementGivenManager.js'; // Import your Feedback component
 
export default function SubHeader() {
  const [activeButton, setActiveButton] = useState("Request");
 
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // Add logic to handle button clicks as needed
  };
 
  const renderComponent = () => {
    // Based on the activeButton state, render the corresponding component
    switch (activeButton) {
      case "FeedbackGiven":
        return <FeedbackGiven />;
        case "FeedbackReceive":
          return <FeedbackReceive />;
      case "Notes":
        return <NotesComponent />;
      case "Achievement":
        return <Achievement />;
      default:
        return null;
    }
  };
 
  return (
<div>
<nav className="subheaderemp-navbar header-sub">
<div className="subheaderemp-container">
<div className="subheaderemp-subheader-content">
<select className="subheader-emp-select" onChange={(e) => handleButtonClick(e.target.value)}>
              {/* <option value="Feedback" selected={activeButton === "Feedback"} >Feedback</option> */}
              <option value="FeedbackGiven" selected={activeButton === "FeedbackGiven"}>Feedback_Given</option>
              <option value="FeedbackReceive" selected={activeButton === "FeedbackReceive"}>Feedback_Receive</option>
         </select>
<button
              className={activeButton === "Notes" ? "subheaderemp-each-content active" : "subheaderemp-each-content"}
              onClick={() => handleButtonClick("Notes")}
>
              Internal Notes
</button>
<button
              className={activeButton === "Achievement" ? "subheaderemp-each-content active" : "subheaderemp-each-content"}
              onClick={() => handleButtonClick("Achievement")}
>
            Achievement
</button>
</div>
</div>
</nav>
<div className="subheaderemp-component-container">
        {/* Render the component based on the activeButton state */}
        {renderComponent()}
</div>
</div>
  );
}