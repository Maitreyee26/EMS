import React, { useState, useEffect } from "react";
import "./MyDetailsDesc.css";
import PrimaryPopup from "../Popup-screens/PrimaryPopup.js";
import AddressPopup from "../Popup-screens/AddressPopup.js";
import ContactPopup from "../Popup-screens/ContactPopup.js";
import { useAuth } from "../AuthContext";
import { FaTrashAlt } from 'react-icons/fa';
import { FaClock, FaCheck } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';

export default function MyDetailsDesc() {
  const [status, setStatus] = useState("");
  const [isEditingPrimaryDetails, setIsEditingPrimaryDetails] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContactDetails, setIsEditingContactDetails] = useState(false);
  const [isEditingEduDetails, setIsEditingEduDetails] = useState(false);
  const [isEditingExpDetails, setIsEditingExpDetails] = useState(false);
  const [isEditingIdDetails, setIsEditingIdDetails] = useState(false);
  const [primaryDetailsStatus, setprimaryDetailsStatus] = useState("Pending");
  const [userDetails, setUserDetails] = useState({});
  const [eduFiles, setEduFiles] = useState([]);
  const [idFiles, setIdFiles] = useState([]);
  const[expFiles,setExpFiles]=useState([])
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(false);
  const { username, empId } = useAuth();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/findEmployeeByEmail/${username}`
        );
        const data = await response.json();
        setUserDetails(data);
        setPendingStatus(data.
approvalStatus);
        console.log("userdetails:", data); // Log 'data' instead of 'userDetails'
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };
    if (username) {
      fetchUserDetails();
    }
  }, [username]);
  const [details, setDetails] = useState({
    primary: {
      fname: "",
      mname: "",
      lName: "",
      dateOfBirth: "",
      maritalStatus: "",
      bloodGroup: "",
    },

    address: {
      p_address_line_1: "",
      p_address_line_2: "",
      p_country: "",
      p_state: "",
      p_city: "",
      p_postal: "",
      c_address_line_1: "",
      c_address_line_2: "",
      c_country: "",
      c_state: "",
      c_city: "",
      c_postal: "",
    },
    contact: {
      personalEmail: "",
      workEmail: "",
      mobileNumber: "",
      worknumber: "",
      emgcontactName: "",
      emgcontactNumber: "",
    },
    education: {},
    experience: {},
    identity: {
      aadharCard: "",
      panCard: "",
      voterIdCard: "",
    },
  });

 
  useEffect(() => {
    if (userDetails && userDetails.emp_name) {
      const nameParts = userDetails.emp_name.split(" ");
      let fname = "";
      let mname = "";
      let lName = "";

      if (nameParts.length === 1) {
        fname = nameParts[0];
      } else if (nameParts.length === 2) {
        fname = nameParts[0];
        lName = nameParts[1];
      } else if (nameParts.length > 2) {
        fname = nameParts[0];
        mname = nameParts.slice(1, -1).join(" ");
        lName = nameParts[nameParts.length - 1];
      }

      
      const addressParts = userDetails.permanent_address.split(" ");
      const p_numSpaces = addressParts.length;
      let p_address_line_1 = "";
      let p_address_line_2 = "";
      let p_country = "";
      let p_state = "";
      let p_city = "";
      let p_postal = "";

      // Determine the address fields based on the number of spaces
      if (p_numSpaces === 5) {
        p_address_line_1 = addressParts[0];
        p_country = addressParts[1];
        p_state = addressParts[2];
        p_city = addressParts[3];
        p_postal = addressParts[4];
      } else if (p_numSpaces === 6) {
        p_address_line_1 = addressParts[0];
        p_address_line_2 = addressParts[1];
        p_country = addressParts[2];
        p_state = addressParts[3];
        p_city = addressParts[4];
        p_postal = addressParts[5];
      }

      const c_addressParts = userDetails.correspondence_address.split(" ");
      const c_numSpaces = c_addressParts.length;

      let c_address_line_1 = "";
      let c_address_line_2 = "";
      let c_country = "";
      let c_state = "";
      let c_city = "";
      let c_postal = "";

      // Determine the address fields based on the number of spaces
      if (c_numSpaces === 5) {
        c_address_line_1 = c_addressParts[0];
        c_country = c_addressParts[1];
        c_state = c_addressParts[2];
        c_city = c_addressParts[3];
        c_postal = c_addressParts[4];
      } else if (c_numSpaces === 6) {
        c_address_line_1 = c_addressParts[0];
        c_address_line_2 = c_addressParts[1];
        c_country = c_addressParts[2];
        c_state = c_addressParts[3];
        c_city = c_addressParts[4];
        c_postal = c_addressParts[5];
      }
      console.log("hi", userDetails.permanent_address.split(" "));
      console.log("hi correspondence_address", userDetails.correspondence_address.split(" "));
      setDetails({
        primary: {
          fname: fname || "",
          mname: mname || "",
          lName: lName || "",
          dateOfBirth: userDetails.dob ? userDetails.dob.split(" ")[0] : "",
          maritalStatus: userDetails.maritalStatus || "",
          bloodGroup: userDetails.bloodGroup || "",
        },
   
        address: {
          p_address_line_1: p_address_line_1 || "",
          p_address_line_2: p_address_line_2 || "", //1
          p_country: p_country || "",
          p_state: p_state || "",
          p_city: p_city || "",
          p_postal: p_postal || "",
          c_address_line_1: c_address_line_1 || "", //0
          c_address_line_2: c_address_line_2 || "", //1
          c_country: c_country || "",
          c_state: c_state || "",
          c_city: c_city || "",
          c_postal: c_postal || "",
        },
        contact: {
          personalEmail: userDetails.personalEmail || "",
          workEmail: userDetails.email || "",
          mobileNumber: userDetails.contact_no || "",
          worknumber: "", // Add work number logic here if available
          emgcontactName: userDetails.alternate_contact_no||"", // Add emergency contact name logic here if available
          emgcontactNumber: userDetails.alternate_contact_name||"", // Add emergency contact number logic here if available
        },
        // Add education, experience, and identity fields based on your backend data
      });
      console.log("After setting details:", details);
    }
  }, [userDetails]);
  const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  const updateUserDetails = async (updatedDetails) => {
    try {
      const response = await fetch(
        `http://localhost:8080/editEmployee/${empId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      console.log("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };
 

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/viewFile/${empId}/1`);
        const data = await response.json();
        // Filter files for education and identity
        const eduFileNames = ["10th Certificate", "12th Certificate", "Graduation Certificate","Post Gradution Certificate"];
        const idFileNames = ["Pan Card", "Aadhar Card","Voter Id Card"];
        const expFileNames=["Experience Letter"]
        const eduFiltered = Object.entries(data).filter(([fileId, fileName]) => eduFileNames.includes(fileName));
        const idFiltered = Object.entries(data).filter(([fileId, fileName]) => idFileNames.includes(fileName));
        const expFiltered = Object.entries(data).filter(([fileId, fileName]) => expFileNames.includes(fileName))
       
        const fileStatuses = {}; // Object to store fileId and their corresponding statuses
        
        const fetchStatus = async (fileId) => {
          try {
            const response = await fetch(`http://localhost:8080/findStatusById/${fileId}`);
            const statusData = await response.text();
            return statusData;
          } catch (error) {
            console.error('Error fetching status:', error.message);
            return 'Unknown'; // Return a default status if fetching fails
          }
        };
        
        // Iterate over each fileId and fetch its status
        for (const fileId of Object.keys(data)) {
          const status = await fetchStatus(fileId);
          fileStatuses[fileId] = status;
        }
     console.log(fileStatuses)
        // Now you have an object 'fileStatuses' where each key is fileId and value is its status
        console.log('File Statuses:', fileStatuses);
    
        // Fetch status for education files
        const eduFilesWithStatus = await Promise.all(eduFiltered.map(async ([fileId, fileName]) => {
          const status = await fetchStatus(fileId);
          return [fileId, fileName, status];
        }));
    
        // Fetch status for experience files
        const expFilesWithStatus = await Promise.all(expFiltered.map(async ([fileId, fileName]) => {
          const status = await fetchStatus(fileId);
          return [fileId, fileName, status];
        }));
    
        // Fetch status for ID card files
        const idFilesWithStatus = await Promise.all(idFiltered.map(async ([fileId, fileName]) => {
          const status = await fetchStatus(fileId);
          return [fileId, fileName, status];
        }));
    
   
        setEduFiles(eduFilesWithStatus);
        setIdFiles(idFilesWithStatus);
        setExpFiles(expFilesWithStatus);
        console.log(data);
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };
 
    fetchFileData();
  }, [empId]);
  const handleEditAddress = () => {
    // Handle edit logic here
    setIsEditingAddress(!isEditingAddress);
    // setprimaryDetailsStatus("Pending");
    console.log("Editing details");
  };
  const handleEditContactDetails = () => {
    // Handle edit logic here
    setIsEditingContactDetails(!isEditingContactDetails);
    console.log("Editing details");
  };
  const handleEditEduDetails = () => {
    // Handle edit logic here
    setIsEditingEduDetails(!isEditingEduDetails);
    console.log("Editing details");
  };
  const handleEditExpDetails = () => {
    // Handle edit logic here
    setIsEditingExpDetails(!isEditingExpDetails);
    console.log("Editing details");
  };
  const handleEditIdDetails = () => {
    // Handle edit logic here
    setIsEditingIdDetails(!isEditingIdDetails);
    console.log("Editing details");
  };
  const handleInputChange = (section, field, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [section]: {
        ...prevDetails[section],
        [field]: value,
      },
    }));
  };
  const handleDeleteFile = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteFile/${fileId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted file from the eduFiles state
        setEduFiles((prevFiles) => prevFiles.filter(([id, name]) => id !== fileId));
        console.log('File deleted successfully');
      } else {
        console.error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error.message);
    }
  };

  const handleEditPrimaryDetails = () => {
    setIsEditingPrimaryDetails(!isEditingPrimaryDetails);
  };

  const handleSavePrimaryDetails = () => {
    setIsEditingPrimaryDetails(false);
    // Additional save logic goes here
    console.log("Saving primary details");
  };
  const handleSaveAddress = () => {
    setIsEditingAddress(false);
    // Additional save logic goes here
    console.log("Saving Address details");
  };

  const handleSaveContactDetails = () => {
    setIsEditingContactDetails(false);
    // Additional save logic goes here
    console.log("Saving Contact details");
  };
  console.log(details.primary);
  console.log(details.address);
  return (
    <div className="details-main-div">
      {/* <div className="details-verified">   
         {pendingStatus === false? <span className="aboutmydetails-pending"> Pending</span>:<span className="aboutmydetails-verified"> Verified</span>}
         <span className='icon-container'>
  <FaInfoCircle
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={{ cursor: 'pointer' }}
  />
  {isHovered && (
    <span className="hover-text">
      primary details or contact details or address details may be changed
    </span>
  )}
</span>
      {console.log("pendingStatus",pendingStatus)}
      </div> */}
      <div className="details-grid-container">
        <div className="details-grid-item">
          <button
            className="mydetails-search-button"
            onClick={handleEditPrimaryDetails}
          >
            {/* {isEditingPrimaryDetails ? <span>Save</span> : <span>Edit</span>} */}
            Edit
          </button>
          <p className="headings">Primary Details</p>
         
          {isEditingPrimaryDetails ? (
            <PrimaryPopup
              details={details.primary}
              isEditing={isEditingPrimaryDetails}
              handleInputChange={(field, value) =>
                handleInputChange("primary", field, value)
              }
              // handleSave={handleSavePrimaryDetails}
              handleSave={(updatedDetails) => {
                updateUserDetails(updatedDetails);
                handleSavePrimaryDetails();
              }}
            />
          ) : (
            <ul className="mydetails-ul">
              <li className="mydetails-li">
                <label className="mydetailsdesc-label">First Name:</label>
                <p className="mydetailsdesc-details">{details.primary.fname}</p>
              </li>
              <li className="mydetails-li">
                <label className="mydetailsdesc-label">Middle Name:</label>
                <p className="mydetailsdesc-details">{details.primary.mname}</p>
              </li>
              <li className="mydetails-li">
                <label className="mydetailsdesc-label">Last Name:</label>
                <p className="mydetailsdesc-details">{details.primary.lName}</p>
              </li>
              <li className="mydetails-li">
                <label className="mydetailsdesc-label" >Date of Birth:</label>
                <p className="mydetailsdesc-details">{details.primary.dateOfBirth}</p>
              </li>
              <li className="mydetails-li">
                <label className="mydetailsdesc-label">Marital Status:</label>
                <p className="mydetailsdesc-details">{details.primary.maritalStatus}</p>
              </li>
              <li className="mydetails-li">
                <label className="mydetailsdesc-label">Blood Group:</label>
                <p className="mydetailsdesc-details">{details.primary.bloodGroup}</p>
              </li>
            </ul>
          )}
        </div>
        <div className="details-grid-item">
          <button
            className="mydetails-search-button"
            onClick={handleEditAddress}
          >
            Edit
          </button>
          <p className="headings">Address Details</p>
          {isEditingAddress ? (
            <AddressPopup
              details={details.address}
              isEditing={isEditingAddress}
              handleInputChange={(field, value) =>
                handleInputChange("address", field, value)
              }
              handleSave={(updatedDetails) => {
                updateUserDetails(updatedDetails);
                handleSaveAddress();
              }}
            />
          ) : (
            <ul>
              <li>
                <label className="mydetailsdesc-label">Parmanent Address:</label>
                <p className="my-details-permanent-add">
                  {details.address.p_address_line_1}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.p_address_line_2}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.p_country}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.p_state}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.p_city}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.p_postal}
                </p>
              </li>
              <li>
                <label className="mydetailsdesc-label">Correspondence Address:</label>
                <p className="my-details-permanent-add">
                  {details.address.c_address_line_1}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.c_address_line_2}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.c_country}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.c_state}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.c_city}
                </p>
                <p className="my-details-permanent-add">
                  {details.address.c_postal}
                </p>
              </li>
            </ul>
          )}
        </div>
        {/* contactno is showing */}
        <div className="details-grid-item">
          <button
            className="mydetails-search-button"
            onClick={handleEditContactDetails}
          >
            Edit
          </button>
          <p className="headings">Contact Details</p>
          {isEditingContactDetails ? (
            <ContactPopup
              details={details.contact}
              isEditing={isEditingContactDetails}
              handleInputChange={(field, value) =>
                handleInputChange("contact", field, value)
              }
              // handleSave={handleSaveContactDetails}
              handleSave={(updatedDetails) => {
                updateUserDetails(updatedDetails);
                handleSaveContactDetails();
              }}
            />
          ) : (
            <ul className="mydetailsdesc-ul">
              <li className="mydetailsdesc-ll">
                <label className="mydetailsdesc-label">Work Email Id: </label>
                <p className="mydetailsdesc-details">{details.contact.workEmail}</p>
              </li>
              <li className="mydetailsdesc-ll">
                <label className="mydetailsdesc-label">Personal Email Id: </label>

                <p className="mydetailsdesc-details">{details.contact.personalEmail}</p>
              </li>
              <li className="mydetailsdesc-ll">
                <label className="mydetailsdesc-label">Mobile Number: </label>

                <p className="mydetailsdesc-details">{details.contact.mobileNumber}</p>
              </li>
              <li className="mydetailsdesc-ll">
                <label className="mydetailsdesc-label">Work Number: </label>
                <p className="mydetailsdesc-details">{details.contact.worknumber}</p>
              </li>
              <li className="mydetailsdesc-ll">
                <label className="mydetailsdesc-label">Emergency Contact Name: </label>
                <p className="mydetailsdesc-details">{details.contact.emgcontactName}</p>
              </li>
              <li className="mydetailsdesc-ll">
                <label className="mydetailsdesc-label">Emergency Contact Number: </label>
                <p className="mydetailsdesc-details">{details.contact.emgcontactNumber}</p>
              </li>
            </ul>
          )}
        </div>
        <div className="details-grid-item">
          <button
            className="mydetails-search-button"
            onClick={handleEditEduDetails}
          >
            {isEditingEduDetails ? 'Save' : 'Edit'}
          </button>
          <p className="headings">Education Details</p>
         
          <ul>
          
       {eduFiles.map(([fileId, fileName, status], index) => (
  <li key={index}>
    <div className="file-container">
      <div className="file-details">
        <p className="mydetailsdesc-label">{fileName} 
         {status === 'pending' && <FaClock className="pending-icon" />}
         {status === 'approved' && <FaCheck className="approved-icon" />}</p>
        <a
          href={`http://localhost:8080/viewFileById/${fileId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {userDetails.emp_name}_ {fileName}
        </a>
      </div>
      <div className="file-status">
       
      </div>
      {isEditingEduDetails && (
        <button className="mydetails-delete-button" onClick={() => handleDeleteFile(fileId)}>
          <FaTrashAlt />
        </button>
      )}
    </div>
  </li>
))}
          </ul>
        </div>
        <div className="details-grid-item">
          <button
            className="mydetails-search-button"
            onClick={handleEditExpDetails}
          >
             {isEditingExpDetails ? 'Save' : 'Edit'}
          </button>
          <p className="headings">Experience Details</p>
          <ul>
          {expFiles.map(([fileId, fileName, status], index) => (
  <li key={index}>
    <div className="file-container">
      <div className="file-details">
        <p className="mydetailsdesc-label">{fileName}  {status === 'pending' && <FaClock className="pending-icon" />}
  {status === 'approved' && <FaCheck className="approved-icon" />}</p>
        <a
          href={`http://localhost:8080/viewFileById/${fileId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {userDetails.emp_name}_ {fileName}
        </a>
      </div>
      <div className="file-status">
       
      </div>
      {isEditingExpDetails && (
        <button className="mydetails-delete-button" onClick={() => handleDeleteFile(fileId)}>
          <FaTrashAlt />
        </button>
      )}
    </div>
  </li>
))}
         </ul>
        </div>
        <div className="details-grid-item">
        <button
  className="mydetails-search-button"
  onClick={ handleEditIdDetails}
>
  {isEditingIdDetails ? 'Save' : 'Edit'}
</button>
          <p className="headings">Id Card Details</p>
          <ul>
           
          {idFiles.map(([fileId, fileName, status], index) => (
  <li key={index}>
    <div className="file-container">
      <div className="file-details">
        <p className="mydetailsdesc-label">{fileName} 
        {status === 'pending' && <FaClock className="pending-icon" />}
  {status === 'approved' && <FaCheck className="approved-icon" />}
  </p>
        <a
          href={`http://localhost:8080/viewFileById/${fileId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {userDetails.emp_name}_ {fileName}
        </a>
      </div>
      <div className="file-status">
        
      </div>
      {isEditingIdDetails && (
        <button className="mydetails-delete-button" onClick={() => handleDeleteFile(fileId)}>
          <FaTrashAlt />
        </button>
      )}
    </div>
  </li>
))}
          </ul>
        </div>
      </div>
    </div>
  );
}
