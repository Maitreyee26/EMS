

import React, { useState, useEffect } from "react";
import "./Otp.css";
import LabelComponent from "../LabelComponentRen/LabelComponent";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Otp() {
  const { username } = useParams();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [initialTimer, setInitialTimer] = useState(600); // 10 minutes in seconds
  const [timer, setTimer] = useState(initialTimer);
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0 && !showSuccessMessage) {
          clearInterval(interval);
          navigate(`/setPassword/${username}`);
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, showSuccessMessage, username, initialTimer]);

  useEffect(() => {
    if (showSuccessMessage) {
      const redirectTimer = setTimeout(() => {
        navigate(`/setPassword/${username}`);
      }, 3000); // Adjust the delay time as needed

      return () => clearTimeout(redirectTimer);
    }
  }, [showSuccessMessage, navigate, username]);

  const handleInputChange = (e) => {
    setOtp(e.target.value);
    setIsOtpEntered(true);
  };
  
  const handleButtonClick = async () => {
    if (otp.trim() === "") {
      setErrorMessage("Please enter the OTP.");
      setSuccessMessage("");
      return;
    }

    try {
      // Make a GET API call to verify the OTP
      const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/verifyOtp/${otp}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const otpData = await response.text();

      if (response.ok) {
        if (otpData === "Mail with set/rest password link sent!") {
          // OTP verified successfully
          setErrorMessage("");
          setSuccessMessage(`OTP verified successfully.`);
          setShowSuccessMessage(true);
        } else if (otpData === "Invalid OTP") {
          // Handle the case where the response status is OK, but OTP is invalid
          setSuccessMessage("OTP is incorrect");
          setErrorMessage("OTP is incorrect");
          setShowSuccessMessage(false); // Hide the success message
        }
      } else {
        // Handle the case where the response status is not OK
        setSuccessMessage("");
        setErrorMessage(`Error: ${response.statusText}`);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Error:", error.message);
      setErrorMessage("An error occurred while processing your request.");
      setSuccessMessage("");
    }
  };
  return (
    <div>
      <div className="username-container">
        <label className="otp-label"htmlFor="otp"><strong>OTP</strong></label>
        <input className="otp-input"
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="errors">{errorMessage}</div>
        <button
          className="otp-submit-button"
          type="submit"
          onClick={handleButtonClick}
        >
          <strong>Continue</strong>
        </button>
        <div className="setpass-continue-text">
          {isOtpEntered && showSuccessMessage && <span>{successMessage}</span>}
          {!isOtpEntered && <span>OTP is valid until {formatTime(timer)}</span>}
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

// function formatTime(seconds) {
//   const absSeconds = Math.abs(seconds);
//   const minutes = Math.floor(absSeconds / 60);
//   const remainingSeconds = absSeconds % 60;
//   const sign = seconds < 0 ? '-' : '';

//   return `${sign}${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
// }
