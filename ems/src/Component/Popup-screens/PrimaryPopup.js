// EditDetailsPopup.js

// import React from "react";
// import "../Popup-screens/PrimaryPopup.css";
// import LabelComponent from "../LabelComponentRen/LabelComponent";

// const EditDetailsPopup = ({
//   details,
//   isEditing,
//   handleInputChange,
//   handleSave,
// }) => {
//   console.log(details);
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     let day = date.getDate();

//     // Add leading zeros if month or day is less than 10
//     month = month < 10 ? `0${month}` : month;
//     day = day < 10 ? `0${day}` : day;

//     return `${year}-${month}-${day}`;
//   };
//   return (
//     <div className={`edit-popup ${isEditing ? "visible" : ""}`}>
//       <ul>
//         <li>
//           <LabelComponent
//             label="First Name:"
//             inputType="text"
//             value={details.emp_name}
//             onChange={(e) => handleInputChange("fname", e.target.value)}
//           />
//         </li>

//         <li>
//           <LabelComponent
//             label="Middle Name:"
//             inputType="text"
//             value={details.mName}
//             onChange={(e) => handleInputChange("mName", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Last Name:"
//             inputType="text"
//             value={details.lName}
//             onChange={(e) => handleInputChange("lName", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Date of Birth"
//             inputType="date"
//             value={formatDate(details.dob)}
//             onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             // label="Marital Status"
//             inputType="select"
//             value={details.maritalStatus}
//             onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
//             options={[
//               { value: "", label: "Marital Status" },
//               { value: "Married", label: "Married" },
//               { value: "Unmarried", label: "Unmarried" },
//             ]}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             // label="Blood Group"
//             inputType="select"
//             value={details.bloodGroup}
//             onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
//             options={[
//               { value: "", label: "Blood Group" },
//               { value: "A+", label: "A+" },
//               { value: "A-", label: "A-" },
//               { value: "B+", label: "B+" },
//               { value: "B-", label: "B-" },
//               { value: "O+", label: "O+" },
//               { value: "O-", label: "O-" },
//               { value: "AB+", label: "AB+" },
//               { value: "AB-", label: "AB-" },
//             ]}
//           />
//         </li>
//       </ul>
//       {/* Add similar input fields for other primary details */}
//       <button className="popup-search-button" onClick={handleSave}>Update</button>
//     </div>
//   );
// };

// export default EditDetailsPopup;
// import React,{useState,useEffect}from "react";
// import "../Popup-screens/PrimaryPopup.css";


// const EditDetailsPopup = ({
//   details,
//   isEditing,
//   handleInputChange,
//   handleSave,
// }) => {
//   const [editedDetails, setEditedDetails] = useState({});

//   useEffect(() => {
//     setEditedDetails(details);
//   }, [details]);
//   // Ensure details is defined before accessing its properties
//   if (!details) {
//     return null; // or any fallback UI if needed
//   }

//   // Function to format date string
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     let day = date.getDate();

//     // Add leading zeros if month or day is less than 10
//     month = month < 10 ? `0${month}` : month;
//     day = day < 10 ? `0${day}` : day;

//     return `${year}-${month}-${day}`;
//   };
//   const handleSaveChanges = () => {
//     handleSave(editedDetails); // Call handleSave with updated details
//   };
//   return (
//     <div className={`edit-popup ${isEditing ? "visible" : ""}`}>
//       {/* <ul>
//         <li>
//           <LabelComponent
//             label="First Name:"
//             inputType="text"
//             value={details.fname || ""}
//             onChange={(e) => handleInputChange("fname", e.target.value)}
//           />
//         </li>
  
  
//         <li>
//           <LabelComponent
//             label="Middle Name:"
//             inputType="text"
//             value={details.mname || ""}
//             onChange={(e) => handleInputChange("mName", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Last Name:"
//             inputType="text"
//             value={details.lName || ""}
//             onChange={(e) => handleInputChange("lName", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Date of Birth"
//             inputType="date"
//             value={details.dateOfBirth}
//             onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             inputType="select"
//             label="Marital Status"
//             value={details.maritalStatus || ""}
//             onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
//             options={[
//               { value: "", label: "Marital Status" },
//               {value:"Unmarried", label:"Unmarried"},
//               {value:"Married",label:"Married"}
//             ]}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             inputType="select"
//             label="Blood Group"
//             value={details.bloodGroup || ""}
//             onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
//             options={[
//               { value: "", label: "Blood Group" },
//               { value: "A+", label: "A+" },
//               { value: "A-", label: "A-" },
//               { value: "B+", label: "B+" },
//               { value: "B-", label: "B-" },
//               { value: "O+", label: "O+" },
//               { value: "O-", label: "O-" },
//               { value: "AB+", label: "AB+" },
//               { value: "AB-", label: "AB-" },
//             ]}
//           />
//         </li>
//       </ul> */}

// <ul>
//     <li>
//       <label className="popup-label">First Name:</label>
//       <input
//         type="text"
//         value={details.fname || ""}
//         onChange={(e) => handleInputChange("fname", e.target.value)}
//         className="popup-input"
//       />
//     </li>
//     <li>
//       <label className="popup-label">Middle Name:</label>
//       <input
//         type="text"
//         value={details.mname || ""}
//         onChange={(e) => handleInputChange("mName", e.target.value)}
//         className="popup-input"
//       />
//     </li>
//     <li>
//       <label className="popup-label">Last Name:</label>
//       <input
//         type="text"
//         value={details.lName || ""}
//         onChange={(e) => handleInputChange("lName", e.target.value)}
//         className="popup-input"
//       />
//     </li>
//     <li>
//       <label className="popup-label">Date of Birth:</label>
//       <input
//         type="date"
//         value={details.dateOfBirth || ""}
//         onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//       />
//     </li>
//     <li>
//       <label className="popup-label">Marital Status:</label>
//       <select
//         value={details.maritalStatus || ""}
//         onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
//         className="popup-label-select"
//       >
//         <option value="">Marital Status</option>
//         <option value="Unmarried">Unmarried</option>
//         <option value="Married">Married</option>
//       </select>
//     </li>
//     <li>
//       <label className="popup-label">Blood Group:</label>
//       <select
//         value={details.bloodGroup || ""}
//         onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
//         className="popup-label-select"
//       >
//         <option value="">Blood Group</option>
//         <option value="A+">A+</option>
//         <option value="A-">A-</option>
//         <option value="B+">B+</option>
//         <option value="B-">B-</option>
//         <option value="O+">O+</option>
//         <option value="O-">O-</option>
//         <option value="AB+">AB+</option>
//         <option value="AB-">AB-</option>
//       </select>
//     </li>
//   </ul>
//       <button className="popup-search-button" onClick={handleSave}>Update</button>
//     </div>
//   );
// };

// export default EditDetailsPopup;



import React, { useState, useEffect } from "react";
import "../Popup-screens/PrimaryPopup.css";

const EditDetailsPopup = ({
  details,
  isEditing,
  handleInputChange,
  handleSave,
}) => {
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    setEditedDetails(details);
  }, [details]);

  // Ensure details is defined before accessing its properties
  if (!details) {
    return null; // or any fallback UI if needed
  }

  const handleSaveChanges = () => {
    // Concatenate first name, middle name, and last name into emp_name
    const emp_name = [editedDetails.fname, editedDetails.mname, editedDetails.lName].filter(Boolean).join(" ");
    // Clone editedDetails object to avoid modifying the original state directly
    const updatedDetails = { ...editedDetails, emp_name };
    // updatedDetails.maritalStatus = editedDetails.maritalStatus;
    handleSave(updatedDetails);
  };

  return (
    <div className={`edit-popup ${isEditing ? "visible" : ""}`}>
      <ul>
        <li>
          <label className="popup-label">First Name:</label>
          <input
            type="text"
            value={editedDetails.fname || ""}
            onChange={(e) => handleInputChange("fname", e.target.value)}
            className="popup-input"
          />
        </li>
        <li>
          <label className="popup-label">Middle Name:</label>
          <input
            type="text"
            value={editedDetails.mname || ""}
            onChange={(e) => handleInputChange("mname", e.target.value)}
            className="popup-input"
          />
        </li>
        <li>
          <label className="popup-label">Last Name:</label>
          <input
            type="text"
            value={editedDetails.lName || ""}
            onChange={(e) => handleInputChange("lName", e.target.value)}
            className="popup-input"
          />
        </li>
        <li>
          <label className="popup-label">Date of Birth:</label>
          <input
            type="date"
            value={editedDetails.dateOfBirth || ""}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          />
        </li>
        <li>
          <label className="popup-label">Marital Status:</label>
          <select
            value={editedDetails.maritalStatus|| ""}
            onChange={(e) =>
              handleInputChange("maritalStatus", e.target.value)
            }
            className="popup-label-select"
          >
            <option value="">Marital Status</option>
            <option value="Unmarried">Unmarried</option>
            <option value="Married">Married</option>
          </select>
        </li>
        <li>
          <label className="popup-label">Blood Group:</label>
          <select
            value={editedDetails.bloodGroup || ""}
            onChange={(e) =>
              handleInputChange("bloodGroup", e.target.value)
            }
            className="popup-label-select"
          >
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </li>
      </ul>
      <button className="popup-search-button" onClick={handleSaveChanges}>
        Update
      </button>
    </div>
  );
};

export default EditDetailsPopup;

