// import React,{useEffect,useState} from "react";
// import "../Popup-screens/ContactPopup.css";
// import LabelComponent from "../LabelComponentRen/LabelComponent";


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

//   if (!details) {
//     return null;
//   }

//   const handleSaveChanges = () => {
//     const updatedDetails = { ...editedDetails };
//     handleSave(updatedDetails);
//   };
//   return (
//     <div className={`contact-edit-popup ${isEditing ? "visible" : ""}`}>
//       <ul>
//         <li>
//           <LabelComponent
//             label="Work Email Id:"
//             inputType="text"
//             value={details.workEmail}
//             onChange={(e) => handleInputChange("workEmail", e.target.value)}
//           />
//         </li>

//         <li>
//           <LabelComponent
//             label="Personal Email Id:"
//             inputType="text"
//             value={details.personalEmail}
//             onChange={(e) => handleInputChange("personalEmail", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Mobile Number:"
//             inputType="text"
//             value={details.mobileNumber}
//             onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Work Number:"
//             inputType="text"
//             value={details.worknumber}
//             onChange={(e) => handleInputChange("worknumber", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Emergency Contact Name:"
//             inputType="text"
//             value={details.emgcontactName}
//             onChange={(e) =>
//               handleInputChange("emgcontactName", e.target.value)
//             }
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Emergency Contact Number:"
//             inputType="text"
//             value={details.emgcontactNumber}
//             onChange={(e) =>
//               handleInputChange("emgcontactNumber", e.target.value)
//             }
//           />
//         </li>
//       </ul>
//       {/* Add similar input fields for other primary details */}
//       <button className="popup-search-button" onClick={handleSave}>
//         Update
//       </button>
//     </div>
//   );
// };

// export default EditDetailsPopup;
import React, { useEffect, useState } from "react";
import "../Popup-screens/ContactPopup.css";

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

  if (!details) {
    return null;
  }
console.log(editedDetails)
  const handleSaveChanges = () => {
    const updatedDetails = { ...editedDetails };
    handleSave(updatedDetails);
  };

  return (
    <div className={`contact-edit-popup ${isEditing ? "visible" : ""}`}>
      <ul>
        <li>
          <label className="contactpopup-label">Work Email Id:</label>
          <input
            type="text"
            value={editedDetails.workEmail}
            onChange={(e) =>
              handleInputChange("workEmail", e.target.value)
            }
            readOnly // Set the readOnly attribute
          />
        </li>

        <li>
          <label  className="contactpopup-label">Personal Email Id:</label>
          <input
            type="text"
            value={editedDetails.personalEmail}
            onChange={(e) =>
              handleInputChange("personalEmail", e.target.value)
            }
          />
        </li>
        <li>
          <label  className="contactpopup-label">Mobile Number:</label>
          <input
            type="text"
            value={editedDetails.mobileNumber}
            onChange={(e) =>
              handleInputChange("mobileNumber", e.target.value)
            }
          />
        </li>
        <li>
          <label  className="contactpopup-label">Work Number:</label>
          <input
            type="text"
            value={editedDetails.worknumber}
            onChange={(e) =>
              handleInputChange("worknumber", e.target.value)
            }
          />
        </li>
        <li>
          <label  className="contactpopup-label">Emergency Contact Name:</label>
          <input
            type="text"
            value={editedDetails.emgcontactName}
            onChange={(e) =>
              handleInputChange("emgcontactName", e.target.value)
            }
          />
        </li>
        <li>
          <label  className="contactpopup-label">Emergency Contact Number:</label>
          <input
            type="text"
            value={editedDetails.emgcontactNumber}
            onChange={(e) =>
              handleInputChange("emgcontactNumber", e.target.value)
            }
          />
        </li>
      </ul>
      <button className="popup-search-button" onClick={handleSaveChanges}>
        Update
      </button>
    </div>
  );
};

export default EditDetailsPopup;
