import React, { useState, useEffect } from "react";
import "../Popup-screens/AddressPopup.css";
// import LabelComponent from "../LabelComponentRen/LabelComponent";

// const AddressPopup = ({
//   details,
//   isEditing,
//   handleInputChange,
//   handleSave,
// }) => {
//   return (
//     <div className={`edit-address-popup ${isEditing ? "visible" : ""}`}>
//       <p className="addpop-form-check">
//         <input type="checkbox" id="sameAddressCheckbox" />
//         <label>Same as Permanent Address</label>
//       </p>
//       <ul>
//         <li>Permanent Address:</li>
//         <li>Correspondence Address:</li>
//         <li>
//           <LabelComponent
//             label="Address Line 1:"
//             inputType="text"
//             value={details.p_address_line_1}
//             onChange={(e) =>
//               handleInputChange("p_address_line_1", e.target.value)
//             }
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Address Line 1:"
//             inputType="text"
//             value={details.c_address_line_1}
//             onChange={(e) =>
//               handleInputChange("c_address_line_1", e.target.value)
//             }
//           />
//         </li>

//         <li>
//           <LabelComponent
//             label="Address Line 2"
//             inputType="text"
//             value={details.p_address_line_2}
//             onChange={(e) =>
//               handleInputChange("p_address_line_2", e.target.value)
//             }
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Address Line 2"
//             inputType="text"
//             value={details.c_address_line_2}
//             onChange={(e) =>
//               handleInputChange("c_address_line_2", e.target.value)
//             }
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Country:"
//             inputType="text"
//             value={details.p_country}
//             onChange={(e) => handleInputChange("p_country", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Country:"
//             inputType="text"
//             value={details.c_country}
//             onChange={(e) => handleInputChange("c_country", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="City:"
//             inputType="text"
//             value={details.p_city}
//             onChange={(e) => handleInputChange("p_city", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="City:"
//             inputType="text"
//             value={details.c_city}
//             onChange={(e) => handleInputChange("c_city", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="State:"
//             inputType="text"
//             value={details.p_state}
//             onChange={(e) => handleInputChange("p_state", e.target.value)}
//           />
//         </li>

//         <li>
//           <LabelComponent
//             label="State:"
//             inputType="text"
//             value={details.c_state}
//             onChange={(e) => handleInputChange("c_state", e.target.value)}
//           />
//         </li>

//         <li>
//           <LabelComponent
//             label="Postal:"
//             inputType="text"
//             value={details.p_postal}
//             onChange={(e) => handleInputChange("p_postal", e.target.value)}
//           />
//         </li>
//         <li>
//           <LabelComponent
//             label="Postal:"
//             inputType="text"
//             value={details.c_postal}
//             onChange={(e) => handleInputChange("c_postal", e.target.value)}
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

// export default AddressPopup;


const AddressPopup = ({
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
    const primaryAddress = [
      editedDetails.p_address_line_1,
      editedDetails.p_address_line_2,
      editedDetails.p_country,
      editedDetails.p_state,
      editedDetails.p_city,
      editedDetails.p_postal
    ].filter(Boolean).join(" ");

    const correspondingAddress = [
      editedDetails.c_address_line_1,
      editedDetails.c_address_line_2,
      editedDetails.c_country,
      editedDetails.c_state,
      editedDetails.c_city,
      editedDetails.c_postal
    ].filter(Boolean).join(" ");

    const updatedDetails = {
      permanent_address:primaryAddress,
      correspondence_address:correspondingAddress
    };

    handleSave(updatedDetails);
  };
  
  return (
    <div className={`edit-address-popup ${isEditing ? "visible" : ""}`}>
      <p className="addpop-form-check">
        <input type="checkbox" id="sameAddressCheckbox" />
        <label htmlFor="sameAddressCheckbox">Same as Permanent Address</label>
      </p>
      <ul>
        <li>Permanent Address:</li>
        <li>Correspondence Address:</li>
        <li className="addresspopup-li">
          <label htmlFor="p_address_line_1">Address Line 1:</label>
          <input
            type="text"
            id="p_address_line_1"
            value={details.p_address_line_1}
            onChange={(e) =>
              handleInputChange("p_address_line_1", e.target.value)
            }
          />
        </li>
        <li className="addresspopup-li">
          <label htmlFor="c_address_line_1">Address Line 1:</label>
          <input
            type="text"
            id="c_address_line_1"
            value={details.c_address_line_1}
            onChange={(e) =>
              handleInputChange("c_address_line_1", e.target.value)
            }
          />
        </li>

        <li className="addresspopup-li">
          <label htmlFor="p_address_line_2">Address Line 2:</label>
          <input
            type="text"
            id="p_address_line_2"
            value={details.p_address_line_2}
            onChange={(e) =>
              handleInputChange("p_address_line_2", e.target.value)
            }
          />
        </li>
        <li className="addresspopup-li">
          <label htmlFor="c_address_line_2">Address Line 2:</label>
          <input
            type="text"
            id="c_address_line_2"
            value={details.c_address_line_2}
            onChange={(e) =>
              handleInputChange("c_address_line_2", e.target.value)
            }
          />
        </li>
        <li className="addresspopup-li">
          <label htmlFor="p_country">Country:</label>
          <input
            type="text"
            id="p_country"
            value={details.p_country}
            onChange={(e) => handleInputChange("p_country", e.target.value)}
          />
        </li>
        <li className="addresspopup-li">
          <label htmlFor="c_country">Country:</label>
          <input
            type="text"
            id="c_country"
            value={details.c_country}
            onChange={(e) => handleInputChange("c_country", e.target.value)}
          />
        </li>
        <li className="addresspopup-li">
          <label htmlFor="p_state">State:</label>
          <input
            type="text"
            id="p_state"
            value={details.p_state}
            onChange={(e) => handleInputChange("p_state", e.target.value)}
          />
        </li>

        <li className="addresspopup-li">
          <label htmlFor="c_state">State:</label>
          <input
            type="text"
            id="c_state"
            value={details.c_state}
            onChange={(e) => handleInputChange("c_state", e.target.value)}
          />
        </li>

        <li className="addresspopup-li">
          <label htmlFor="p_city">City:</label>
          <input
            type="text"
            id="p_city"
            value={details.p_city}
            onChange={(e) => handleInputChange("p_city", e.target.value)}
          />
        </li>
        <li className="addresspopup-li">
          <label htmlFor="c_city">City:</label>
          <input
            type="text"
            id="c_city"
            value={details.c_city}
            onChange={(e) => handleInputChange("c_city", e.target.value)}
          />
        </li>
        
        <li className="addresspopup-li">
          <label htmlFor="p_postal">Postal:</label>
          <input
            type="text"
            id="p_postal"
            value={details.p_postal}
            onChange={(e) => handleInputChange("p_postal", e.target.value)}
          />
        </li>
        <li className="addresspopup-li">
          <label htmlFor="c_postal">Postal:</label>
          <input
            type="text"
            id="c_postal"
            value={details.c_postal}
            onChange={(e) => handleInputChange("c_postal", e.target.value)}
          />
        </li>
      </ul>

      <button className="popup-search-button"onClick={handleSaveChanges}>
        Update
      </button>
    </div>
  );
};

export default AddressPopup;
