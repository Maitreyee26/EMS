// AchievementDocument.js
import React, { useState, useRef,useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import "./AchievementDocument.css";
import { useAuth } from "../AuthContext";
import { Messages } from "primereact/messages";
import "primereact/resources/themes/nova/theme.css";
import ApproveReject from "../ApproveReject/ApproveRejectDocument ";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
const AchievementDocument = () => {
  const [certificateName, setCertificateName] = useState("");
  const [fileId, setFileId] = useState(null); 
  const [certificateDescription, setCertificateDescription] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false); // State to trigger component reload
  const [errors, setErrors] = useState({
    name: "",

    file: "",
  });
  const { username, empId } = useAuth();
  const [successMessage, setSuccessMessage] = useState(null);
  const messagesRef = useRef(null);

  const fileInputRef = React.createRef();

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  // const handleCertificateNameChange = (e) => {
  //   setCertificateName(e.target.value);
  // };

  const handleCertificateDescriptionChange = (e) => {
    setCertificateDescription(e.target.value);
  };
  const handleCertificateNameChange = (e) => {
    const name = e.target.value;
    setCertificateName(name);

    // Validate document name
    if (!name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Document Name is required.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }
  };

  const handleCertificateFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.toLowerCase().includes("pdf")) {
        setErrors({ ...errors, file: "File must be in PDF format." });
        setCertificateFile(null); // Clear the invalid file
      } else {
        setErrors({ ...errors, file: "" });
        setCertificateFile(file);
      }
    }
  };
  const pdfPreviewSection =
    certificateFile && certificateFile.type.toLowerCase().includes("pdf") ? (
      <div className="pdf-preview-section">
        <iframe
          title="PDF Preview"
          className="pdf-preview-section-iframe"
          src={URL.createObjectURL(certificateFile)}
        ></iframe>
      </div>
    ) : null;

  const fileNameSection = certificateFile ? (
    <div className="file-name-section">
      <p>File Name: {certificateFile.name}</p>
    </div>
  ) : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage(null);

    try {
      if (!certificateName.trim() || !certificateFile) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: !certificateName.trim() ? "Document Name is required." : "",
          file: !certificateFile ? "File is required." : "",
        }));
        return;
      }

      const apiUrl = `http://localhost:8080/uploadFile/${empId}/${encodeURIComponent(
        certificateName
      )}/2`;
      const formData = new FormData();
      formData.append("file", certificateFile);

      // Send POST request with Axios
      await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('File uploaded successfully');
      // Show success message if messagesRef is not null
      messagesRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: "File uploaded successfully",
      });
       // Fetch file ID again from viewFile endpoint
       const viewFileResponse = await fetch(`http://localhost:8080/viewFile/${empId}/1`);
       const viewFileData = await viewFileResponse.json();
       const keys = Object.keys(viewFileData);
       console.log(viewFileResponse )
       const latestFileId = keys[keys.length - 1]; // Get the last key, which should be the latest fileId
       setFileId(latestFileId);
   
       // Fetch status using the latest fileId
       const statusResponse = await fetch(`http://localhost:8080/findStatusById/${latestFileId}`);
       const statusData = await statusResponse.text();
     console.log(statusData)// Assuming primaryDetailsStatus represents the status of the newly added document
   
      setTimeout(() => {
        // Trigger component reload
        setReloadComponent(prevState => !prevState);
      }, 3000);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      // Show error message if messagesRef is not null
      messagesRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to upload file",
      });
    }
  };
  useEffect(() => {
    
  }, [reloadComponent]);
  return (
    <>
      <div className="main-achievement-upload-document-div">
        <div className="achievement-certificate-form">
          <div className="document-type-and-error">
            <div className="achievement-document-type-column">
              <label className="achievement-doc-label">Document Name: </label>
              <input
                className="achievement-documents-name"
                type="text"
                placeholder="Document Name"
                value={certificateName}
                onChange={handleCertificateNameChange}
              />
            </div>
            <div className="achievement-error-message-document">
              {errors.certificateFile}
            </div>
          </div>

          <div className="achievement-certificate-description-column">
            <label className="achievement-doc-label">
              Documents Description:{" "}
            </label>
            <textarea
              className="achievement-documents-name"
              placeholder="Documents Description"
              value={certificateDescription}
              onChange={handleCertificateDescriptionChange}
            />
          </div>
          <div className="achievement-error-message-document">
            {/* <p>{errors.description}</p> */}
          </div>

          <div className="achievement-certificate-file-button">
            <label
              className="achievement-doc-label"
              htmlFor="certificateFile"
              style={{ pointerEvents: "none" }}
            >
              Browse:
            </label>
            <button
              onClick={openFileDialog}
              className="achievement-upload-icon-button"
            >
              <MdCloudUpload />
            </button>

            <input
              type="text"
              className="achievement-documents-name"
              id="chosenFile"
              placeholder="Upload a file"
              readOnly
            />

            <input
              className="achievement-documents-name"
              type="file"
              id="certificateFile"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleCertificateFileChange}
            />
          </div>
          <div className="achievement-error-message-document">
            {errors.file}
          </div>
        </div>
        <div
          className={`achievement-preview-section ${
            pdfPreviewSection ? "" : "with-border"
          }`}
        >
          {pdfPreviewSection}
          {fileNameSection}
        </div>
      </div>
      <div className="achievement-certificate-submit-button">
        <button
          className="achievement-btn1"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <Messages ref={messagesRef} className="upload-document-achievement-primereact-message" />
      </div>
      <div style={{display:"none"}}>
{fileId  && <ApproveReject fileId={fileId} />}
</div>
    </>
  );
};

export default AchievementDocument;
