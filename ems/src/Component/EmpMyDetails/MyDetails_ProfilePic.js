

import React, { useState, useRef, useEffect } from "react";
import "./MyDetails_ProfilePic.css";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../AuthContext";

export default function MyDetails_ProfilePic() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const { empId, updateProfilePicture } = useAuth();
  const { username } = useAuth();
  const [empname, setEmpname] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          // `https://ems-backend-production-3f3d.up.railway.app/findEmployeeByEmail/${username}`
          `https://ems-backend-production-3f3d.up.railway.app/findEmployeeByEmail/${username}`
        );
        const data = await response.json();
        setEmpname(data.emp_name);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };
    if (username) {
      fetchUserDetails();
    }
  }, [username]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/viewProfilePicture/${empId}`
        );
        if (response.ok) {
          const blob = await response.blob();
          setProfilePicture(URL.createObjectURL(blob));
        } else if (response.status === 404) {
          // Profile picture not found, do nothing
          setProfilePicture(null); // Clear the profile picture if not found
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, [empId]);

  let splitName = empname.split(" ");
  let firstName = splitName[0];
  let lastName = "";

  if (splitName.length > 1) {
    lastName = splitName[splitName.length - 1];
  }

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const initials = getInitials(firstName, lastName);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB");
        return;
      }

      if (!file.type.includes("jpeg")) {
        setError("Please select a JPEG file");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/addProfilePicture/${empId}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (!response.ok) {
          setError("Error uploading the file");
          console.error("Upload failed:", response.statusText);
          return;
        }

        console.log("Upload successful");
        setError(null);

        // Fetch the updated profile picture after successful upload
        const updatedResponse = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/viewProfilePicture/${empId}`
        );
        if (updatedResponse.ok) {
          const blob = await updatedResponse.blob();
          const newProfilePicture = URL.createObjectURL(blob);
          setProfilePicture(newProfilePicture);

          // Update the profile picture in the Auth context
          updateProfilePicture(newProfilePicture);
        } else if (updatedResponse.status === 404) {
          // Profile picture not found, do nothing
          setProfilePicture(null);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Error uploading the file");
      }
    } else {
      setProfilePicture(null);
    }
  };

  return (
    <div className="upload-profilepic file-upload-container">
      <div className="profilepic">
        {selectedFile || profilePicture ? (
          <img
            className="passport-photo"
            src={
              selectedFile ? URL.createObjectURL(selectedFile) : profilePicture
            }
            alt="Profile"
          />
        ) : (
          <div className="initials-profile-picture">{initials}</div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <div className="camera-icon">
        <button onClick={openFileDialog} className="icon-button">
          <FaCamera />
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="employee-name">
        <strong>{empname}</strong>
      </div>
    </div>
  );
}
