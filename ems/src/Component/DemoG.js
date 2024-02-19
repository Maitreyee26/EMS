// import React, { useState } from "react";
// import "./Demo.css";

// export default function Demo() {
//   const [isEditingPrimaryDetails, setIsEditingPrimaryDetails] = useState(false);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [isEditingContactDetails, setIsEditingContactDetails] = useState(false);
//   const [isEditingEduDetails, setIsEditingEduDetails] = useState(false);
//   const [isEditingExpDetails, setIsEditingExpDetails] = useState(false);
//   const [isEditingIdDetails, setIsEditingIdDetails] = useState(false);


//   const [details, setDetails] = useState({
//     primary: {
//       fname: "",
//       mname: "",
//       lName: "",
//       dateOfBirth: "",
//       maritalStatus: "",
//       bloodGroup: "",
//     },
//     contact: {
//       personalEmail: "",
//       workEmail: "",
//       contactNumber: "",
//     },
//     address: {
//       correspondence: "",
//       permanent: "",
//     },
//     education: {},
//     experience: {},
//     identity: {
//       aadharCard: "",
//       panCard: "",
//       voterIdCard: "",
//     },
//   });

//   const handleInputChange = (section, field, value) => {
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [section]: {
//         ...prevDetails[section],
//         [field]: value,
//       },
//     }));
//   };
//   const handleEditPrimaryDetails = () => {
//     // Handle edit logic here
//     setIsEditingPrimaryDetails(!isEditingPrimaryDetails);
//     console.log("Editing details");
//   };
//   const handleEditAddress = () => {
//     // Handle edit logic here
//     setIsEditingAddress(!isEditingAddress);
//     console.log("Editing details");
//   };
//   const handleEditContactDetails = () => {
//     // Handle edit logic here
//     setIsEditingContactDetails(!isEditingContactDetails);
//     console.log("Editing details");
//   };
//   const handleEditEduDetails = () => {
//     // Handle edit logic here
//     setIsEditingEduDetails(!isEditingEduDetails);
//     console.log("Editing details");
//   };
//   const handleEditExpDetails = () => {
//     // Handle edit logic here
//     setIsEditingExpDetails(!isEditingExpDetails);
//     console.log("Editing details");
//   };
//   const handleEditIdDetails = () => {
//     // Handle edit logic here
//     setIsEditingIdDetails(!isEditingIdDetails);
//     console.log("Editing details");
//   };

//   return ( 
//     <div className="details-main-div">
//       <div className="details-grid-container">
//         <div className="details-grid-item">
//           <button className="mydetails-search-button" onClick={handleEditPrimaryDetails}>
           
//             {isEditingPrimaryDetails ? (
//                 <span>Save</span>
//               ) : (
//                 <span>Edit</span>
//               )}
//           </button>
//           <p>Primary Details</p>
//           <ul>
//             <li>
//               <label>First Name:</label>
//               {isEditingPrimaryDetails ? (
//                 <input
//                   type="text"
//                   value={details.primary.fname}
//                   onChange={(e) =>
//                     handleInputChange("primary", "fname", e.target.value)
//                   }
//                 />
//               ) : (
//                 <span> {details.primary.fname} </span>
//               )}
//             </li>

//             <li>
             
//               <label>Middle Name:</label>
//               {isEditingPrimaryDetails ? (
//               <input
//                 type="text"
//                 value={details.primary.mName}
//                 onChange={(e) =>
//                   handleInputChange("primary", "mName", e.target.value)
//                 }
//               />
//               ) : (
//                 <span>{details.primary.mName}</span>
//               )}
//             </li>
//             <li>
//             <label>Last Name:</label>
//               {isEditingPrimaryDetails ? (
//               <input
//                 type="text"
//                 value={details.primary.lName}
//                 onChange={(e) =>
//                   handleInputChange("primary", "lName", e.target.value)
//                 }
//               />
//               ) : (
//                 <span>{details.primary.lName}</span>
//               )}
//             </li>
//             <li>
             
//               <label>Date of Birth:</label>
//               {isEditingPrimaryDetails ? (
//               <input
//               type="date"
//               value={details.primary.dateOfBirth}
//               onChange={(e) =>
//                 handleInputChange("primary", "dateOfBirth", e.target.value)
//               }
//             />
//              ) : (
//                 <span>{details.primary.dateOfBirth}</span>
//               )}
//             </li>
//             <li>
//               <label>Marital Status:</label>
//               {isEditingPrimaryDetails ? (
//               <select
//               value={details.primary.maritalStatus}
//               onChange={(e) =>
//                 handleInputChange("primary", "maritalStatus", e.target.value)
//               }
//             >
//               <option value="">Select</option>
//               <option value="Married">Married</option>
//               <option value="Unmarried">Unmarried</option>
//             </select>
//             ) : (
//                 <span>{details.primary.maritalStatus}</span>
//               )}
//             </li>
//             <li>
//               <label>Blood Group:</label>
//               {isEditingPrimaryDetails ? (
//               <select
//               value={details.primary.bloodGroup}
//               onChange={(e) =>
//                 handleInputChange("primary", "bloodGroup", e.target.value)
//               }
//             >
//               <option value="">Select</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//             </select>
//             ) : (
//                 <span>{details.primary.bloodGroup}</span>
//               )}
//             </li>
//           </ul>
//         </div>
//         <div className="details-grid-item">
//           <button className="mydetails-search-button" onClick={handleEditAddress}>
//           {isEditingAddress ? (
//                 <span>Save</span>
//               ) : (
//                 <span>Edit</span>
//               )}
//           </button>
//         </div>
//         {/* contactno is showing */}
//         <div className="details-grid-item">
//           <button className="mydetails-search-button" onClick={handleEditContactDetails}>
//           {/* {isEditing ? (
//                 <span>Save</span>
//               ) : (
//                 <span>Edit</span>
//               )} */}
//           </button>
//         </div>
//         <div className="details-grid-item">
//           <button className="mydetails-search-button" onClick={handleEditEduDetails}>
//           {/* {isEditing ? (
//                 <span>Save</span>
//               ) : (
//                 <span>Edit</span>
//               )} */}
//           </button>
//         </div>
//         <div className="details-grid-item">
//           <button className="mydetails-search-button" onClick={handleEditExpDetails}>
//           {/* {isEditing ? (
//                 <span>Save</span>
//               ) : (
//                 <span>Edit</span>
//               )} */}
//           </button>
//         </div>
//         <div className="details-grid-item">
//           <button className="mydetails-search-button" onClick={handleEditIdDetails}>
//           {/* {isEditing ? (
//                 <span>Save</span>
//               ) : (
//                 <span>Edit</span>
//               )} */}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from 'react'

export default function DemoG() {
  return (
    <div>DemoG</div>
  )
}
