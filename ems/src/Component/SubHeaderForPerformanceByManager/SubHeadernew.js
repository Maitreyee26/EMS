
import React, { useState } from 'react';
import './SubHeader.css';
import FeedbackGiven from '../PerformanceByManager/FeedbackpageGivenManager.js'; 
import FeedbackReceive from '../PerformanceByManager/FeedbackpageReceiveManager'; // Import your Request component
import NotesComponent from '../PerformanceByManager/Notes.jsx'; // Import your Notes component
import AchievementGiven from '../PerformanceByManager/AchievementGivenManager.js';
import AchievementReceive from '../PerformanceByManager/AchievementReceiveManager.js' // Import your Feedback component
 
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
      case "AchievementGiven":
        return <AchievementGiven />;
        case "AchievementReceive":
        return <AchievementReceive />;
      default:
        return null;
    }
  };
 
  return (
<div>
<nav className="subheader-manager-navbar header-sub">
<div className="subheader-manager-container">
<div className="subheader-manager-subheader-content">
{/* <button
              className={activeButton === "Feedback" ? "each-content active" : "each-content"}
              onClick={() => handleButtonClick("Feedback")}
>
               Feedback
</button> */}
<select onChange={(e) => handleButtonClick(e.target.value)}>
              {/* <option value="Feedback" selected={activeButton === "Feedback"} >Feedback</option> */}
              <option value="FeedbackGiven" selected={activeButton === "FeedbackGiven"}>Feedback_Given</option>
              <option value="FeedbackReceive" selected={activeButton === "FeedbackReceive"}>Feedback_Receive</option>
         </select>

<button
              className={activeButton === "Notes" ? "subheader-manager-each-content active" : "subheader-manager-each-content"}
              onClick={() => handleButtonClick("Notes")}
>
              Internal Notes
</button>
{/* <button
              className={activeButton === "Achievement" ? "each-content active" : "each-content"}
              onClick={() => handleButtonClick("Achievement")}
>
            Achievement
</button> */}
<select onChange={(e) => handleButtonClick(e.target.value)}>
              {/* <option value="Feedback" selected={activeButton === "Feedback"} >Feedback</option> */}
              <option value="AchievementGiven" selected={activeButton === "AchievementGiven"}>Achievement_Given</option>
              <option value="AchievementReceive" selected={activeButton === "AchievementReceive"}>Achievement_Receive</option>
         </select>


</div>
</div>
</nav>
<div className="subheader-manager-component-container">
        {/* Render the component based on the activeButton state */}
        {renderComponent()}
</div>
</div>
  );
}