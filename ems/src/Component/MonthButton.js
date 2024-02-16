

import React from "react";

const MonthButton = ({ month, onClick, isSelected }) => {
  // Trim the month name to the first three letters
  const trimmedMonth = month?.slice(0, 3) || ""; // Use optional chaining to handle null or undefined

  // Add a class conditionally based on whether the button is selected
  const buttonClass = `month-button ${isSelected ? "active" : ""}`;

  const handleButtonClick = () => {
    // Check if month is available before splitting
    if (month) {
      console.log("Clicked month:", month);
      const fullMonthName = month.split(" "); // Replace ' ' with the correct separator
      onClick(fullMonthName);
    } else {
      console.error("Month is null or undefined.");
    }
  };

  return (
    <div className={buttonClass} onClick={handleButtonClick}>
      {trimmedMonth}
    </div>
  );
};

export default MonthButton;
