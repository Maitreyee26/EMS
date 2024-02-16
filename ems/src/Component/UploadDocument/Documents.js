
import React, { useState, useRef, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import ApproveReject from "../ApproveReject/ApproveRejectDocument ";
import { Messages } from "primereact/messages";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Documents.css";
import axios from 'axios';

import { useAuth } from "../AuthContext";
const PersonalDocument = () => {
  const [fileId, setFileId] = useState(null); 
  const [documentName, setDocumentName] = useState("");
  const [certificateDescription, setCertificateDescription] = useState("");
  const[certificateFile,setCertificateFile]=useState("");
  const[certificateFilePath,setCertificateFilePath]=useState("");
  const [messages, setMessages] = useState([]);
  const { username,empId } = useAuth();
  const[primaryDetailsStatus,setprimaryDetailsStatus]=useState("")
  const [errors, setErrors] = useState({
    file: "",
    description: "",
    documentName: "",
  });
  const [existingDocumentNames, setExistingDocumentNames] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const messagesRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const fetchExistingDocumentNames = async () => {
      try {
        const response = await fetch(`http://localhost:8080/viewFile/${empId}/1`);
        const data = await response.json();
        const documentNames = Object.values(data);
        setExistingDocumentNames(documentNames);
      } catch (error) {
        console.error("Error fetching existing document names:", error);
      }
    };

    fetchExistingDocumentNames();
  }, [empId]);
  const handleInputChange = () => {
    if (!documentName) {
      setErrors({ ...errors, documentName: "Document Name is required." });
    } else {
      setErrors({ ...errors, certificateFile: "" });
    }
  };
  const openFileDialog = () => {
    fileInputRef.current.click();
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

        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setFileContent(content);
        };
        reader.readAsText(file); // Read file as text
        console.log("Browsed Directory Path:", fileContent);
        if (file.webkitRelativePath) {
          setCertificateFilePath(file.webkitRelativePath);
          console.log("Browsed Directory Path:", file.webkitRelativePath);
          // You can now use certificateFilePath as needed
        } else if (file.path) {
          setCertificateFilePath(file.path);
        } else {
          // Handle cases where neither property is available
          console.warn('File path not accessible through available properties');
          // You might prompt for manual input or implement other strategies
        }
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

    const fileNameSection =
    certificateFile && pdfPreviewSection ? (
      <div className="file-name-section">
        <p>File Name: {certificateFile.name}</p>
      </div>
    ) : null;

    useEffect(() => {
      const fetchExistingDocumentNames = async () => {
        try {
          const response = await fetch(`http://localhost:8080/viewFile/${empId}/1`);
          const data = await response.json();
          const documentNames = Object.values(data);
          setExistingDocumentNames(documentNames);
        } catch (error) {
          console.error("Error fetching existing document names:", error);
        }
      };
  
      fetchExistingDocumentNames();
    }, [empId]);
  
    
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   setSuccessMessage(null);
    
    //   try {
    //     if (!documentName || !certificateFile) {
    //       setErrors({
    //         ...errors,
    //         documentName: "Document Name is required.",
    //         file: "File is required.",
    //       });
    //       return;
    //     }
    
    //     // Construct the URL with parameters
    //     const apiUrl = `http://localhost:8080/uploadFile/${empId}/${encodeURIComponent(documentName)}/1`;
    
    //     // Create FormData object to append file data
    //     // const formData = new FormData();
    //     // formData.append('file', certificateFile);
      
    //     // // Send POST request with Axios
    //     // await axios.post(apiUrl, formData, {
    //     //   headers: {
    //     //     'Content-Type': 'multipart/form-data',
    //     //   },
    //     // });
    //     const formData = new FormData();
    //   formData.append('file', certificateFile);

    //   const response = await axios.post(apiUrl, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   const data = response.data;
    //   setFileId(data.fileId); // Update fileId state with the received fileId
    //  console.log(data);
    //     // Optional: Handle success, show a success message, etc.
    //     console.log('File uploaded successfully');
    //     messagesRef.current.show({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
    //     const statusResponse = await fetch(`http://localhost:8080/findStatusById/${fileId}`);
    // const statusData = await statusResponse.json();
    // setprimaryDetailsStatus(statusData.status); // Assuming primaryDetailsStatus represents the status of the newly added document

    //   } catch (error) {
    //     console.error('Error uploading file:', error.message);
    //     messagesRef.current.show({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
       
    //   }
    // };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        if (!documentName || !certificateFile) {
          setErrors({
            ...errors,
            documentName: "Document Name is required.",
            file: "File is required.",
          });
          return;
        }
    
        const formData = new FormData();
        formData.append('file', certificateFile);
    
        const response = await axios.post(`http://localhost:8080/uploadFile/${empId}/${encodeURIComponent(documentName)}/1`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // const data = response.data;
        // setFileId(data.fileId); // Update fileId state with the received fileId
    
        // Show success message
        messagesRef.current.show({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
    
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
    
      } catch (error) {
        console.error('Error uploading file:', error.message);
        messagesRef.current.show({ severity: 'error', summary: error.message, detail: error.message});
      }
    };

  return (
    <>
    <div className="main-upload-document-div">
      <div className="certificate-form">
        {/* <Message {...successMessage} /> */}
        <div className="document-type-and-error">
    
          <div className="document-type-column">
            <label className="doc-label">Document Name: </label>
            <select
              className="dropdown-achievement"
              value={documentName}
              onChange={(event) => setDocumentName(event.target.value)}
              onBlur={handleInputChange}  
            >
              <option value="" disabled>
                Select Document Name
              </option>
            
                {["Aadhar Card", "Pan Card","Voter Id Card" ,"10th Certificate", "12th Certificate", "Graduation Certificate", "Post Graduation Certificate", "Experience Letter"].map((option) => (
                  !existingDocumentNames.includes(option) && (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
                ))} 
           

            </select>
          </div>
          <div className="error-message-document">{errors.documentName}</div>
        </div>

        <div className="certificate-description-column">
          <label className="doc-label">Documents Description: </label>
          <textarea
            className="documents-name"
            placeholder="Documents Description"
            value={certificateDescription}
            onChange={(event) => setCertificateDescription(event.target.value)}
          />
        </div>
        <div className="error-message-document">
          
        </div>

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
            className="documents-name"
            id="chosenFile"
            placeholder="Upload a file"
            readOnly
          />
          <input
            className="documents-name"
            type="file"
            id="certificateFile"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleCertificateFileChange}
          />
          <div className="error-message-document">
            {errors.file}
          </div>
        </div>
       
       
      </div>
      <div
        className={`preview-section ${pdfPreviewSection ? "" : "with-border"}`}
      >
        {pdfPreviewSection}
        {fileNameSection}
       
      </div>
      
    </div>
 <div className="certificate-submit-button">
 <button className="btn1" type="submit" onClick={handleSubmit}>
   Submit
 </button>
 <Messages ref={messagesRef} className="upload-document-primereact-message" />
</div>
{console.log(fileId)};
<div style={{display:"none"}}>
{fileId  && <ApproveReject fileId={fileId} />}
</div>

</>
  );
};

export default PersonalDocument;
