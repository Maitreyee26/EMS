// import React,{useState,useEffect} from 'react'
// import './Usernames.css'
// import LabelComponent from '../LabelComponentRen/LabelComponent'
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';
// export default function Username() {
//   const [username, setUsername] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const navigate = useNavigate();
 
  
//   useEffect(() => {
//     let timer;
//     if (showSuccessMessage) {
//       timer = setTimeout(() => {
//         navigate(`/otp/${username}`);
//       }, 3000); // Adjust the delay time as needed
//     }
  
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [showSuccessMessage, navigate, username]);

//   const handleInputChange = (e) => {
//     setUsername(username);
//   };

  
// const handleButtonClick = async () => {
//   if (username.trim() === '') {
//     setErrorMessage('Please enter a username.');
//     setSuccessMessage('');
//     setShowSuccessMessage(false);
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:8080/checkEmailExists/${username}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       const exists = await response.text(); // Handle response as text

//       if (exists === 'true') {
//         // Username exists, proceed to send OTP
//         const otpResponse = await fetch(`http://localhost:8080/sendEmail/${username}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         const otpData = await otpResponse.text();

//         if (otpResponse.ok) {
//           if (otpData === 'Email sent successfully!') {
//             setErrorMessage('');
//             setSuccessMessage(`OTP has been sent to ${username}`);
//             setShowSuccessMessage(true);
//             console.log('hi!!');
//             // Redirect or navigate to the OTP page here
//           }
//         } else {
//           console.error('Error:', otpResponse.status, otpData);
//           setErrorMessage('An error occurred while processing your request.');
//           setSuccessMessage('');
//         }
//       } else {
//         // Username does not exist
//         setErrorMessage('Username not found.');
//         setSuccessMessage('');
//         setShowSuccessMessage(false);
//       }
//     } else {
//       console.error('Error:', response.status);
//       setErrorMessage('An error occurred while processing your request.');
//       setSuccessMessage('');
//     }
//   } catch (error) {
//     console.error('Error:', error.message);
//     setErrorMessage('An error occurred while processing your request.');
//     setSuccessMessage('');
//     setShowSuccessMessage(false);
//   }
// };

//   return (
//     <div>
//       <div className="username-container">
//           <LabelComponent  
//             label="Username"
//             inputType="text"
//             value={username}
//             onChange={handleInputChange}
//             />
//             <div className="errors">{errorMessage}</div>
//            <button className="username-submit-button" type="submit" onClick={handleButtonClick}><strong>Request OTP</strong></button>
//           <div className='setpass-continue-text'>
//            {/* {context && <span>Email has been sent succesfully to </span>} */}
//            {/* {successMessage} */}
//            {showSuccessMessage && <span>{successMessage}</span>}
//           </div>
//     </div>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import './Usernames.css';
import LabelComponent from '../LabelComponentRen/LabelComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Username() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        navigate(`/otp/${username}`);
      }, 3000); // Adjust the delay time as needed
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessMessage, navigate, username]);

  const handleInputChange = (e) => {
    setUsername(e.target.value); // Set the username state to the value entered in the input field
  };
  console.log('Username state:', username);
  const handleButtonClick = async () => {
    if (username.trim() === '') {
      setErrorMessage('Please enter a username.');
      setSuccessMessage('');
      setShowSuccessMessage(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/checkEmailExists/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const exists = await response.text(); // Handle response as text

        if (exists === 'true') {
          // Username exists, proceed to send OTP
          const otpResponse = await fetch(`http://localhost:8080/sendEmail/${username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const otpData = await otpResponse.text();

          if (otpResponse.ok) {
            if (otpData === 'Email sent successfully!') {
              setErrorMessage('');
              setSuccessMessage(`OTP has been sent to ${username}`);
              setShowSuccessMessage(true);
              console.log('hi!!');
              // Redirect or navigate to the OTP page here
            }
          } else {
            console.error('Error:', otpResponse.status, otpData);
            setErrorMessage('An error occurred while processing your request.');
            setSuccessMessage('');
          }
        } else {
          // Username does not exist
          setErrorMessage('Username not found.');
          setSuccessMessage('');
          setShowSuccessMessage(false);
        }
      } else {
        console.error('Error:', response.status);
        setErrorMessage('An error occurred while processing your request.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('An error occurred while processing your request.');
      setSuccessMessage('');
      setShowSuccessMessage(false);
    }
  };

  return (
    <div>
      <div className="username-container">
      {/* <LabelComponent
          label="Username"
          inputType="text"
          value={username}  // Ensure that the value prop is correctly passed
          onChange={handleInputChange}
          options={[]} // Provide an empty array for text inputs
        /> */}
   
   <label className="username-label" htmlFor="username"><strong>Username</strong></label>
        <input
        className='username-input'
          type="text"
          id="username"
          value={username}
          onChange={handleInputChange}
        />
       
        <div className="errors">{errorMessage}</div>
        <button className="username-submit-button" type="submit" onClick={handleButtonClick}>
          <strong>Request OTP</strong>
        </button>
        <div className='setpass-continue-text'>
          {showSuccessMessage && <span>{successMessage}</span>}
        </div>
      </div>
    </div>
  );
}

