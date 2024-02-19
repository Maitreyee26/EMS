import React, { useState, useEffect } from "react";
import "./ProfilePicture.css";
import { useAuth } from "./AuthContext";

export default function ProfilePicture() {
  const { username, empId } = useAuth();
  const [empname, setEmpname] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          ` https://ems-backend-production-3f3d.up.railway.app/findEmployeeByEmail/${username}`
        );
        const data = await response.json();
        setEmpname(data.emp_name || "");
        console.log("userdetails:", data);
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
          ` https://ems-backend-production-3f3d.up.railway.app/viewProfilePicture/${empId}`
        );
        if (response.ok) {
          const blob = await response.blob();
          setProfilePicture(URL.createObjectURL(blob));
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
  let middleName = "";

  if (splitName.length === 2) {
    lastName = splitName[1];
  } else if (splitName.length === 3) {
    middleName = splitName[1];
    lastName = splitName[2];
  }

  const getInitials = (firstName, lastName) => {
    // Get the first character of each name
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    // const middleInitial = middleName ? middleName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };
  const initials = getInitials(firstName, lastName);

  return (
    <div className="profile-picture">
      {profilePicture ? (
        <img src={profilePicture} alt="Profile" className="profile-image" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
