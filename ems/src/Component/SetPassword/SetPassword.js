
import React, { useState } from "react";
import "./SetPassword.css";
import { FaUser } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import {username} from '../UsernameForPassWord/Usernames'
export default function SetPassword() {

  const { username } = useParams();
  const [pass, setPass] = useState("");
  const [conpass, setConpass] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [context, setContext] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [confirmConditions, setConfirmConditions] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialCharacter: false,
  });

  const navigate = useNavigate();
  // Password validation functions
  const isLengthValid = (password) =>
    password.length >= 8 && password.length <= 10;
  const hasLowercase = (password) => /[a-z]/.test(password);
  const hasUppercase = (password) => /[A-Z]/.test(password);
  const hasDigit = (password) => /\d/.test(password);
  const hasSpecialCharacter = (password) => /[^a-zA-Z0-9]/.test(password);

  const validatePassword = (password) => {
    let errors = [];
    let confirmConditionsCopy = { ...confirmConditions };
  
    if (isLengthValid(password)) {
      confirmConditionsCopy.length = true;
    } else {
      confirmConditionsCopy.length = false;
      errors.push("Password must be between 8 and 10 characters.");
    }
  
    if (hasLowercase(password)) {
      confirmConditionsCopy.lowercase = true;
    } else {
      confirmConditionsCopy.lowercase = false;
      errors.push("Password must contain at least one lowercase letter.");
    }
  
    if (hasUppercase(password)) {
      confirmConditionsCopy.uppercase = true;
    } else {
      confirmConditionsCopy.uppercase = false;
      errors.push("Password must contain at least one uppercase letter.");
    }
  
    if (hasDigit(password)) {
      confirmConditionsCopy.digit = true;
    } else {
      confirmConditionsCopy.digit = false;
      errors.push("Password must contain at least one digit.");
    }
  
    if (hasSpecialCharacter(password)) {
      confirmConditionsCopy.specialCharacter = true;
    } else {
      confirmConditionsCopy.specialCharacter = false;
      errors.push("Password must contain at least one special character.");
    }
  
    setPasswordErrors(errors);
    const isPasswordValid = errors.length === 0;
    setConfirmConditions(confirmConditionsCopy);
  
    return isPasswordValid;
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
  
    if (id === "pass") {
      setPass(value);
      const isPasswordValid = validatePassword(value);
  
      // Check if passwords match and reset the confirm password error
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: pass === conpass ? "" : prevErrors.password,
        // Add other error messages as needed
      }));
  
      if (!isPasswordValid) {
        // Handle specific password validation errors here
        // For example, set a custom error message for invalid passwords
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
          // Add other error messages as needed
        }));
      }
    }
  
    if (id === "conpass") {
      setConpass(value);
  
      // Check if passwords match and reset the confirm password error
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: pass === value ? "" : prevErrors.password,
        // Add other error messages as needed
      }));
    };
  };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    const isPasswordValid = validatePassword(pass);

    const doPasswordsMatch = pass === conpass;

    if (isPasswordValid && doPasswordsMatch) {
      try {
        // Make a PUT API call to set the password
        const response = await fetch(`http://localhost:8080/resetPassword/${username}/${pass}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: pass,
          }),
        });

        if (response.ok) {
          // Password set successfully
          // Show success message
          setErrorMessage('');
          setSuccessMessage(`Password set successfully!${username}`);
          setShowSuccessMessage(true);

          // Navigate to the login page after a delay
          setTimeout(() => {
            navigate(`/`);
          }, 3000);
        } else {
          // Handle server-side errors
          console.error("Failed to set password:", response.statusText);
          setErrors({
            password: "Failed to set password. Please try again.",
          });
        }
      } catch (error) {
        // Handle network or unexpected errors
        console.error("Error:", error.message);
        setErrors({
          password: "An error occurred while processing your request.",
        });
      }
    } else {
      // Password validation failed or passwords do not match
      setErrors({
        password: doPasswordsMatch ? "" : "Passwords do not match.",
      });
    }
  };

  const renderCheckbox = (label, condition) => (
    <div>
      <input type="checkbox" checked={condition} readOnly />
      <label>{label}</label>
    </div>
  );
  // let username = "testuddd65gmail.com";
  return (
    <>
      <div className="container main-div-setpassword">
      <div className="user-icon-container">
          <FaUser className="user-icon" />
        </div>
      <div className="setpass-username-label-input">
       {/* <p><FaUser className="user-icon"/></p> */}
        <label htmlFor="pass" >
          <strong>{username}</strong>
        </label>
      </div>
        <div className="setpass-label-input">
          <label htmlFor="pass" className="setpass-form-label">
            Password :
          </label>
          <input
            type="password"
            value={pass}
            className="form-control setpass-input-css-form"
            id="pass"
            placeholder="Enter Password"
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="setpass-label-input">
          <label htmlFor="conpass" className="setpass-form-label">
            Confirm Password :
          </label>
          <input
            type="password"
            value={conpass}
            className="form-control setpass-input-css-form"
            id="conpass"
            placeholder="Confirm Password"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="pas-not-match">
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <div className="setpass-submit-button-div">
          <button
            className="setpass-submit-button"
            onClick={handleSubmit}
            type="submit"
          >
            <strong>Set Password</strong>
          </button>
        </div>

        <div className="checkboxes">
          {renderCheckbox("Length (8-10 characters)", confirmConditions.length)}
          {renderCheckbox(
            "At least one lowercase letter",
            confirmConditions.lowercase
          )}
          {renderCheckbox(
            "At least one uppercase letter",
            confirmConditions.uppercase
          )}
          {renderCheckbox("At least one digit", confirmConditions.digit)}
          {renderCheckbox(
            "At least one special character",
            confirmConditions.specialCharacter
          )}
        </div>
        <div className="setpass-continue-text">
          {/* {context && <p>Password set succesfully for {username}</p>} */}
          {successMessage && <p>{successMessage}</p>}
        </div>
      </div>
    </>
  );
}
