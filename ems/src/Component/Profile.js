// src/components/Profile.js

import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownSelect = (eventKey) => {
    // Handle different dropdown options here
    console.log(`Selected option: ${eventKey}`);
    setShowDropdown(false); // Close the dropdown after selection
  };

  return (
    <div className="profile-container">
      <img
        src="path-to-your-profile-picture.jpg"
        alt="Profile"
        className="profile-picture"
        onClick={handleDropdownToggle}
      />
   
      {/* <Dropdown show={showDropdown} onSelect={handleDropdownSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic"> */}
          {/* Menu */}
          {/* </Dropdown.Toggle> */}
          <Dropdown show={showDropdown} onSelect={handleDropdownSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        <Dropdown.Menu  >
          <Dropdown.Item eventKey="option1">My Profile</Dropdown.Item>
          <Dropdown.Item eventKey="option2">Change Password</Dropdown.Item>
          <Dropdown.Item eventKey="option2">Logout</Dropdown.Item>
          {/* Add more dropdown items as needed */}
        </Dropdown.Menu>
        </Dropdown.Toggle>
       
      </Dropdown>
    </div>
  );
};

export default Profile;
