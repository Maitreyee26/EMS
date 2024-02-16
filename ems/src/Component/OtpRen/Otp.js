// import React, { useState, useEffect } from "react";
// import "./Otp.css";
// import LabelComponent from "../LabelComponentRen/LabelComponent";
// import { useNavigate } from "react-router-dom";

// export default function Otp() {
//   const [otp, setOtp] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [timer, setTimer] = useState(6);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(interval);
//           navigate('/setPassword/:id');
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleButtonClick = async () => {
//     if (otp.trim() === "") {
//       setErrorMessage("Please enter the OTP.");
//       setSuccessMessage("");
//       return;
//     }

//     try {
//       // Make a GET API call to verify the OTP
//       const response = await fetch(`http://localhost:8080/verifyOtp/${otp}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const data = await response.text();

//         if (data.message === "Mail with set/rest password link sent!") {
//           setErrorMessage("");
//           setSuccessMessage(data.message);
//           setShowSuccessMessage(true);

//           // Redirect to the setPassword page
//           // Assuming the response also contains the user id (data.id)
//           navigate(`/setPassword/${data.id}`);
//         } else {
//           // Handle other success cases or error messages from the backend
//           setErrorMessage(`Error: ${data.message}`);
//           setSuccessMessage("");
//         }
//       } else {
//         // Handle the case where the response status is not OK
//         setErrorMessage(`Error: ${response.statusText}`);
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       // Handle network or unexpected errors
//       console.error("Error:", error.message);
//       setErrorMessage("An error occurred while processing your request.");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div>
//       <div className="username-container">
//         <LabelComponent
//           label="OTP"
//           inputType="text"
//           value={otp}
//           onChange={handleInputChange}
//         />
//         <div className="errors">{errorMessage}</div>
//         <button
//           className="adddept-submit-button"
//           type="submit"
//           onClick={handleButtonClick}
//         >
//           <strong>Continue</strong>
//         </button>
//         <div className="setpass-continue-text">
//           {/* {successMessage} */}
//           {showSuccessMessage && <span>{successMessage}</span>}
//           <span>{formatTime(timer)}</span>
//         </div>
//       </div>
//     </div>
//   );
// }
// function formatTime(seconds) {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${String(minutes).padStart(2, "0")}:${String(
//     remainingSeconds
//   ).padStart(2, "0")}`;
// }

import React, { useState, useEffect } from "react";
import "./Otp.css";
import LabelComponent from "../LabelComponentRen/LabelComponent";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Function to get initial timer value from localStorage
// const getInitialTimer = () => {
//   const storedTimer = localStorage.getItem('timer');
//   return storedTimer ? parseInt(storedTimer, 10) : 600; // Default to 10 minutes if not available
// };

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

  // const [timer, setTimer] = useState(getInitialTimer);
  // const [resendLinkVisible, setResendLinkVisible] = useState(false);

  // const resendOtp = () => {
  //   // Implement logic to resend the OTP (make an API call, etc.)
  //   // This is a placeholder, replace it with your actual resend logic
  //   console.log('Resending OTP...');
  //   // Optionally, you can reset the timer to the initial value after resending
  //   setTimer(getInitialTimer());
  //   setResendLinkVisible(false); // Hide the resend link after clicking it
  // };
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
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       if (prevTimer <= 0 && !showSuccessMessage) {
  //         clearInterval(interval);
  //         navigate(`/setPassword/${username}`);
  //         return 0; // Reset the timer to 0
  //       }
  //       return prevTimer - 1;
  //     });
  //   }, 1000);

  //   // Save the timer value to localStorage on every update
  //   localStorage.setItem('timer', timer.toString());

  //   return () => clearInterval(interval);
  // }, [navigate, showSuccessMessage, username]);

  // const handleButtonClick = async () => {
  //   if (otp.trim() === "") {
  //     setErrorMessage("Please enter the OTP.");
  //     setSuccessMessage("");
  //     return;
  //   }

  //   try {
  //     // Make a GET API call to verify the OTP
  //     const response = await fetch(`http://localhost:8080/verifyOtp/${otp}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const otpData = await response.text();

  //     if (response.ok) {
  //       if (otpData === 'Mail with set/rest password link sent!') {
  //         // OTP verified successfully
  //         setErrorMessage("");
  //         setSuccessMessage(`OTP verified successfully.`);
  //         setShowSuccessMessage(true);
  //       } else if (otpData === 'Invalid OTP') {
  //         // Handle the case where the response status is OK, but OTP is invalid
  //         setSuccessMessage("OTP is incorrect");
  //         setErrorMessage("OTP is incorrect");
  //         setShowSuccessMessage(false); // Assuming you want to hide the success message
  //       }
  //     } else {
  //       // Handle the case where the response status is not OK
  //       setSuccessMessage("");
  //       setErrorMessage(`Error: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     // Handle network or unexpected errors
  //     console.error("Error:", error.message);
  //     setErrorMessage("An error occurred while processing your request.");
  //     setSuccessMessage("");
  //   }
  // };
  const handleButtonClick = async () => {
    if (otp.trim() === "") {
      setErrorMessage("Please enter the OTP.");
      setSuccessMessage("");
      return;
    }

    try {
      // Make a GET API call to verify the OTP
      const response = await fetch(`http://localhost:8080/verifyOtp/${otp}`, {
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
