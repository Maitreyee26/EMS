import React, { useState, useRef } from "react";
import "./Documents.css";
import { MdCloudUpload } from "react-icons/md";

// New SideNav component
const SideNav = ({ documentType, handleSideNavOptionClick }) => {
  const personalDocumentOptions = ["Aadhar Card", "Pan Card", /* Add other options as needed */];

  return (
    <div className="sidenav">
      <h2>Personal Document Options</h2>
      <ul>
        {personalDocumentOptions.map((option, index) => (
          <li key={index} onClick={() => handleSideNavOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Demo= () => {
  const [certificateName, setCertificateName] = useState("");
  const [certificateDescription, setCertificateDescription] = useState("");
  const [certificateFile, setCertificateFile] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [subDocumentType, setSubDocumentType] = useState("");
  const [errors, setErrors] = useState({});
  const [showSubDropdown, setShowSubDropdown] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);

  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleCertificateNameChange = (event) => {
    setCertificateName(event.target.value);
    setErrors({ ...errors, name: "" });
  };

  const handleCertificateDescriptionChange = (event) => {
    setCertificateDescription(event.target.value);
    setErrors({ ...errors, description: "" });
  };

  const handleDocumentTypeChange = (event) => {
    const selectedDocumentType = event.target.value;
    setDocumentType(selectedDocumentType);
    setShowSubDropdown(selectedDocumentType === "Personal Document");
    setSubDocumentType("");
    setErrors({ ...errors, documentType: "" });
    setShowSideNav(selectedDocumentType === "Personal Document");
  };

  const handleSubDocumentTypeChange = (event) => {
    setSubDocumentType(event.target.value);
    setErrors({ ...errors, subDocumentType: "" });
  };

  const handleSideNavOptionClick = (option) => {
    setSubDocumentType(option);
    setShowSideNav(false);
  };

  const handleCertificateFileChange = (event) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const certificateFile = event.target.files[0];
  
    if (certificateFile && allowedFileTypes.includes(certificateFile.type)) {
      setCertificateFile(certificateFile);
      const inputField = document.getElementById("chosenFile");
  
      if (inputField) {
        inputField.value = certificateFile.name;
      }
      setErrors({ ...errors, file: null });
    } else {
      setCertificateFile("");
      setErrors({ ...errors, file: "Please choose a valid file (PNG, JPEG, DOC, Word)." });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!certificateName.trim()) {
      setErrors({ ...errors, name: "Please enter the document name." });
      return;
    }

    if (!certificateDescription.trim()) {
      setErrors({ ...errors, description: "Please enter the document description." });
      return;
    }

    if (!documentType) {
      setErrors({ ...errors, documentType: "Please select the document type." });
      return;
    }

    if (documentType === "Personal Document" && !subDocumentType) {
      setErrors({ ...errors, subDocumentType: "Please select the sub-document type." });
      return;
    }

    const clickedButton = event.target;

    if (clickedButton.className === "btn1") {
      alert("Your document submitted successfully!");
    } else {
      // Handle other button click if needed
    }
  };

  return (
    <div>
      <div className="document-type-dropdown">
        <label className="doc-label">Document Type: </label>
        <select
          className="dropdown-achievement"
          value={documentType}
          onChange={handleDocumentTypeChange}
        >
          <option value="" disabled>
            Select Type of Document
          </option>
          <option
            className="document-select-option"
            value="Personal Document"
          >
            Personal Document
          </option>
          <option
            className="document-select-option"
            value="Achievement Document"
          >
            Achievement Document
          </option>
        </select>
        <p className="error-message">{errors.documentType}</p>
      </div>

      {showSideNav && (
        <SideNav
          documentType={documentType}
          handleSideNavOptionClick={handleSideNavOptionClick}
        />
      )}

      <div className="certificate-form">
        <div className="certificate-container">
    
        <div className="certificate-name-column">
          <label className="doc-label">Documents Name: </label>
          <input
            className="DocumentsName"
            type="text"
            placeholder="Documents Name"
            value={certificateName}
            onChange={handleCertificateNameChange}
          />
          <p className="error-message">{errors.name}</p>
        </div>

        <div className="certificate-description-column">
          <label className="doc-label">Documents Description: </label>
          <textarea
            className="DocumentsName"
            placeholder="Documents Description"
            value={certificateDescription}
            onChange={handleCertificateDescriptionChange}
          />
          <p className="error-message">{errors.description}</p>
        </div>

        {showSubDropdown && (
          <div className="sub-document-type-column">
            <label className="doc-label">Sub Document Type: </label>
            <select
              className="dropdown-achievement"
              value={subDocumentType}
              onChange={handleSubDocumentTypeChange}
            >
              <option value="" disabled>
                Select Sub Document Type
              </option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Pan Card">Pan Card</option>
              {/* Add other sub-document types as needed */}
            </select>
            <p className="error-message">{errors.subDocumentType}</p>
          </div>
        )}

        <div className="certificate-file-button">
          <label
            className="doc-label"
            htmlFor="certificateFile"
            style={{ pointerEvents: "none" }}
          >
            Browse:
          </label>
          <button onClick={openFileDialog} className="upload-icon-button">
            <MdCloudUpload />
          </button>

          <input
            type="text"
            className="DocumentsName"
            id="chosenFile"
            placeholder="Upload a file"
            readOnly
          />

          <input
            className="DocumentsName"
            type="file"
            id="certificateFile"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleCertificateFileChange}
          />
          <p className="error-message">{errors.file}</p>
        </div>

        <div className="certificate-submit-button">
          <button className="btn1" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
       
      </div>
    </div>
  );
};

export default Demo;
