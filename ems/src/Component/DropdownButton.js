import React, { useState } from "react";
import './DropdownButton.css'
function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
       Action
      </button>{" "}
      {isOpen && (
        <ul className="dropdown-menu">
          {" "}
          <li>
            {" "}
            <a href="/">Resign</a>{" "}
          </li>{" "}
        </ul>
      )}{" "}
    </div>
  );
}

export default DropdownButton;
