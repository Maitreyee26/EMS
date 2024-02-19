
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  // const [selectedItem, setSelectedItem] = useState(() => {
  //   return parseInt(localStorage.getItem("selectedItem"), 10) || null;
  // });
  const [selectedItem, setSelectedItem] = useState(() => {
    const initialSelectedItem = parseInt(localStorage.getItem("selectedItem"), 10);
    return initialSelectedItem !== null ? initialSelectedItem : 0; 
    // return initialSelectedItem === 0; 
    // Default to 0 if no value in local storage
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (index, path) => {
    setSelectedItem(index);
    navigate(path);
  };

  // useEffect(() => {
  //   // Update local storage whenever selectedItem changes
  //   localStorage.setItem("selectedItem", selectedItem);
  // }, [selectedItem]);
  // console.log("Initial selected item:", selectedItem);
  // console.log("Initial location pathname:", location.pathname);
useEffect(() => {
  // Log initial values for debugging
  console.log("Initial selected item:", selectedItem);
  console.log("Initial location pathname:", location.pathname);

  // Update local storage whenever selectedItem changes
  localStorage.setItem("selectedItem", selectedItem);
}, [selectedItem, location.pathname]); // Include location.pathname in the dependencies array

  return (
    <div className="navbar-main">
      <ul className="nav-list">
        <li
          className={`Navbar-list ${
            location.pathname === "/home" ? "selected" : ""
          }`}
          onClick={() => handleItemClick(0, "/home")}
        >
           <ion-icon name="home"></ion-icon>
          <p>Home</p>
        </li>
        <li
          className={`Navbar-list ${
            location.pathname === "/emp/uploadDocument" ? "selected" : ""
          }`}
          onClick={() => handleItemClick(1, "/emp/uploadDocument")}
        >
          <ion-icon name="document"></ion-icon>
          <p>Documents</p>
        </li>
        <li   className={`Navbar-list ${selectedItem === 2 ? "selected" : ""}`}
          onClick={() => handleItemClick(2,"/emp/attendance")}>
               <ion-icon name="checkmark-done-circle"></ion-icon>
               <p>Attendance</p>
         </li>
         <li
          className={`Navbar-list ${selectedItem === 3 ? "selected" : ""}`}
          onClick={() => handleItemClick(3,"/performance")}
          // className="Navbar-list"
        >
         
          <ion-icon name="bar-chart"></ion-icon>
          <p>Performance</p>
        </li>
        <li
          className={`Navbar-list ${selectedItem === 4 ? "selected" : ""}`}
          onClick={() => handleItemClick(4,"/emp/taskassign")}
          // className="Navbar-list"
        >
          <ion-icon name="documents"></ion-icon>
          <p>Task Assign</p>
        </li>
        <li
          // className={`Navbar-list ${selectedItem === 5 ? "selected" : ""}`}
          // onClick={() => handleItemClick(5,"/admin/org")}
          className={`Navbar-list ${
            location.pathname === "/admin/org" ? "selected" : ""
          }`}
          onClick={() => handleItemClick(5, "/admin/org")}
        >
          <ion-icon name="people"></ion-icon>
          <p>Org</p>
        </li>

        {/* Add other list items with Link components */}
      </ul>
    </div>
  );
}
// import React, { useState } from "react";
// import "./Navbar.css";
 
// export default function Navbar() {
 
//   const [selectedItem, setSelectedItem] = useState(null);
 
//   const handleItemClick = (index) => {
//     setSelectedItem(index);
//   };
//   return (
//     <div className="navbar-main">
//       <ul className="nav-list">
//         <li className={`Navbar-list ${selectedItem === 0 ? 'selected' : ''}`} onClick={() => handleItemClick(0)}>
         
//         <ion-icon name="home"></ion-icon>
//             <p>Home</p>
         
//         </li>
//         <li className={`Navbar-list ${selectedItem === 1 ? 'selected' : ''}`} onClick={() => handleItemClick(1)}>
         
//          <ion-icon name="document"></ion-icon><p>Documents</p>
//         </li>
//         <li className={`Navbar-list ${selectedItem === 2 ? 'selected' : ''}`} onClick={() => handleItemClick(2)}>
         
//           <ion-icon name="checkmark-done-circle"></ion-icon><p>Attendance</p>
//         </li>
//         <li className={`Navbar-list ${selectedItem === 3 ? 'selected' : ''}`} onClick={() => handleItemClick(3)}>
         
//           <ion-icon name="bar-chart"></ion-icon><p>Performance</p>
//         </li>
//         <li className={`Navbar-list ${selectedItem === 4 ? 'selected' : ''}`} onClick={() => handleItemClick(4)}>
         
//           <ion-icon name="documents"></ion-icon><p>Task Assign</p>
//         </li>
//         <li className={`Navbar-list ${selectedItem === 5 ? 'selected' : ''}`} onClick={() => handleItemClick(5)}>
         
//           <ion-icon name="people"></ion-icon><p>Org</p>
//         </li>
//       </ul>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import './Demo.css';
 
// export default function Navbar() {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
 
//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };
 
//   return (
//     <>
//        <button className="toggle-btn" onClick={toggleSidebar}>
//         Toggle Sidebar
//       </button>
//     <div className={`navbar-main ${isSidebarOpen ? 'open' : ''}`} style={{ left: isSidebarOpen ? '0' : '-240px' }}>
 
//       <ul className="nav-list">
//         <li className="Navbar-list">
//           <ion-icon name="person"></ion-icon>
//           My Details
//         </li>
//         <li className="Navbar-list">
//           <ion-icon name="document"></ion-icon>
//           Upload Documents
//         </li>
//         <li className="Navbar-list">
//           <ion-icon name="checkmark-done-circle"></ion-icon>
//           Attendance
//         </li>
//         <li className="Navbar-list">
//           <ion-icon name="bar-chart"></ion-icon>
//           Performance
//         </li>
//         <li className="Navbar-list">
//           <ion-icon name="documents"></ion-icon>
//           Task Assign
//         </li>
//         <li className="Navbar-list">
//           <ion-icon name="people"></ion-icon>
//           Organizational Tree
//         </li>
//       </ul>
//     </div>
//     </>
//   );
// }
 