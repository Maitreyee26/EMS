// import React,{useState,useRef} from 'react'
// import './MyDetails_ProfilePic.css';
// import { FaCamera } from "react-icons/fa"; // Replace with the desired icon


// export default function MyDetails_ProfilePic() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const fileInputRef = useRef(null);
//     let employee_name = "Mona Roy";
    
//     const openFileDialog = () => {
//         fileInputRef.current.click();
//     };
//     const handleUpload = () => {
//         if (selectedFile) {
//           const formData = new FormData();
//           formData.append('profilePhoto', selectedFile);
//         }
//       };
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     handleUpload();
//   };
 
  
//   return (
//     <>
//         <div className="upload-profilepic file-upload-container">
//         <div className="profilepic">
//         {selectedFile && (
//         <div >
//           <img
//             className="passport-photo"
//             src={URL.createObjectURL(selectedFile)}
//             alt="Preview"
//             style={{ maxWidth: '250px', maxHeight: '200px' }}
//           />
//         </div>
//       )}
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
      
//         </div>
//         <div className='camera-icon'>
//         <button onClick={openFileDialog} className="icon-button">
//         <FaCamera />
//         </button>
//         </div>
//         <div className="employee-name">
//           <strong>{employee_name}</strong>
//         </div>
//       </div>
//     </>
//   )
// }
// import React, { useState, useRef,useEffect} from 'react';
// import './MyDetails_ProfilePic.css';
// import { FaCamera } from 'react-icons/fa';
// import  { useAuth } from '../AuthContext'

// export default function MyDetails_ProfilePic() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);
//   const [error, setError] = useState(null);
//   const [profilePicture, setProfilePicture] = useState(null);
//   // let employee_name = 'Mona Roy';
//   const{empId}=useAuth();
//   const { username } = useAuth();
//   console.log(username);
//   const[empname,setEmpname]=useState("")
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/findEmployeeByEmail/${username}`
//         );
//         const data = await response.json();
//         setEmpname(data.emp_name);
//         console.log("userdetails:", data); // Log 'data' instead of 'userDetails'
//       } catch (error) {
//         console.error("Error fetching user details:", error.message);
//       }
//     };
//     if (username) {
//       fetchUserDetails();
//     }
//   }, [username]);
//   console.log(empname);
//   useEffect(() => {
//     const fetchProfilePicture = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/viewProfilePicture/${empId}`);
//         if (response.ok) {
//           const blob = await response.blob();
//           setProfilePicture(URL.createObjectURL(blob));
//         }
//       } catch (error) {
//         console.error('Error fetching profile picture:', error);
//       }
//     };

//     fetchProfilePicture();
//   }, [empId]);
//   let splitName = empname.split(" ");
//   let firstName = splitName[0];
//   let lastName = '';
//   let middleName = '';
  
//   if (splitName.length === 2) {
//       lastName = splitName[1];
//   } else if (splitName.length === 3) {
//       middleName = splitName[1];
//       lastName = splitName[2];
//   }
  
// const getInitials = (firstName,lastName) => {
//   // Get the first character of each name
//   const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
//   // const middleInitial = middleName ? middleName.charAt(0).toUpperCase() : '';
//   const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
//   return `${firstInitial}${lastInitial}`;
// };
// const initials = getInitials(firstName,lastName);
//   const openFileDialog = () => {
//     fileInputRef.current.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError('Please select a file');
//       return;
//     }

//     if (selectedFile.size > 5 * 1024 * 1024) {
//       setError('File size exceeds 5MB');
//       return;
//     }

//     if (!selectedFile.type.includes('jpeg')) {
//       setError('Please select a JPEG file');
//       return;
//     }

//     console.log('Uploading file:', selectedFile.name);
//     const formData = new FormData();
//     formData.append('file', selectedFile); // Matching the backend parameter name

//     try {
//       const response = await fetch(`http://localhost:8080/addProfilePicture/${empId}`, {
//         method: 'PUT', // Change method to PUT
//         body: formData,
//         // You may need to add headers like Authorization if required by your backend
//       });


//       if (!response.ok) {
//         setError('Error uploading the file');
//         console.error('Upload failed:', response.statusText);
//         return;
//       }

//       console.log('Upload successful');
//       // Clear the selected file and any errors after successful upload
//       setSelectedFile(null);
//       setError(null);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setError('Error uploading the file');
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     console.log('File selected:', file.name);
//     setSelectedFile(file);
//   };

//   return (
//     <>
//       <div className="upload-profilepic file-upload-container">
//         <div className="profilepic">
//           {/* {selectedFile && (
//             <div>
//               <img
//                 className="passport-photo"
//                 src={URL.createObjectURL(selectedFile)}
//                 alt="Preview"
//                 style={{ maxWidth: '250px', maxHeight: '200px' }}
//               />
//             </div>
//           )}
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             onChange={handleFileChange}
//           />
//         </div>
//         <div className="camera-icon">
//           <button onClick={openFileDialog} className="icon-button">
//             <FaCamera />
//           </button> */}
//             {profilePicture ? (
//             <img
//               className="passport-photo"
//               src={profilePicture}
//               alt="Profile"
//               style={{ maxWidth: '250px', maxHeight: '200px' }}
//             />
//           ) : (
//             <div className="initials-profile-picture">{initials}</div>
//           )}
//         </div>
//         <div className="camera-icon">
//           <button onClick={openFileDialog} className="icon-button">
//             <FaCamera />
//           </button>
//         </div>
//         {error && <div className="error">{error}</div>}
//         <div className="employee-name">
//           <strong>{empname}</strong>
//         </div>
//         <button onClick={handleUpload}>Upload</button>
//       </div>
//     </>
//   );
// }



//chat
// import React, { useState, useRef, useEffect } from 'react';
// import './MyDetails_ProfilePic.css';
// import { FaCamera } from 'react-icons/fa';
// import { useAuth } from '../AuthContext';

// export default function MyDetails_ProfilePic() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);
//   const [error, setError] = useState(null);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const { empId } = useAuth();
//   const { username } = useAuth();
//   const [empname, setEmpname] = useState("");
//   const [imageLoaded, setImageLoaded] = useState(false); // 
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/findEmployeeByEmail/${username}`
//         );
//         const data = await response.json();
//         setEmpname(data.emp_name);
//       } catch (error) {
//         console.error("Error fetching user details:", error.message);
//       }
//     };
//     if (username) {
//       fetchUserDetails();
//     }
//   }, [username]);

//   useEffect(() => {
//     const fetchProfilePicture = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/viewProfilePicture/${empId}`);
//         if (response.ok) {
//           const blob = await response.blob();
//           setProfilePicture(URL.createObjectURL(blob));
//         } else if (response.status === 404) {
//           // Profile picture not found, do nothing
//           setProfilePicture(null); // Clear the profile picture if not found
//         }
//       } catch (error) {
//         console.error('Error fetching profile picture:', error);
//       }
//     };

//     fetchProfilePicture();
//   }, [empId, selectedFile]); // Add selectedFile as a dependency to trigger the effect when it changes

//   let splitName = empname.split(" ");
//   let firstName = splitName[0];
//   let lastName = '';
  
//   if (splitName.length > 1) {
//     lastName = splitName[splitName.length - 1];
//   }

//   const getInitials = (firstName, lastName) => {
//     const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
//     const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
//     return `${firstInitial}${lastInitial}`;
//   };

//   const initials = getInitials(firstName, lastName);

//   const openFileDialog = () => {
//     fileInputRef.current.click();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError('Please select a file');
//       return;
//     }
  
//     if (selectedFile.size > 5 * 1024 * 1024) {
//       setError('File size exceeds 5MB');
//       return;
//     }
  
//     if (!selectedFile.type.includes('jpeg')) {
//       setError('Please select a JPEG file');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('file', selectedFile);
  
//     try {
//       const response = await fetch(`http://localhost:8080/addProfilePicture/${empId}`, {
//         method: 'PUT',
//         body: formData,
//       });
  
//     //   if (!response.ok) {
//     //     setError('Error uploading the file');
//     //     console.error('Upload failed:', response.statusText);
//     //     return;
//     //   }
  
//     //   console.log('Upload successful');
//     //   setSelectedFile(null);
//     //   setProfilePicture(null); // Clear the profile picture when upload is successful
//     //   setError(null);
//     // } catch (error) {
//     //   console.error('Error uploading file:', error);
//     //   setError('Error uploading the file');
//     // }
//     if (!response.ok) {
//       setError('Error uploading the file');
//       console.error('Upload failed:', response.statusText);
//       return;
//     }

//     console.log('Upload successful');
//     setSelectedFile(null);
    
//     // Update profile picture state with the newly uploaded picture
//     const blob = await response.blob();
//     setProfilePicture(URL.createObjectURL(blob));

//     setError(null);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     setError('Error uploading the file');
//   }
// };
// useEffect(() => {
//   // If profilePicture changes, set imageLoaded to false
//   setImageLoaded(false);
// }, [profilePicture]);

//   // const handleFileChange = (event) => {
//   //   const file = event.target.files[0];
//   //   setSelectedFile(file);
  
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onload = () => {
//   //       console.log(reader.result);  // Add this line
//   //       setProfilePicture(reader.result);
//   //     }
//   //     reader.readAsDataURL(file);
//   //   } else {
//   //     setProfilePicture(null);
//   //   }
//   // };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
  
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfilePicture(reader.result);
//       };
//       reader.readAsDataURL(file);
//       // Reset imageLoaded state when file changes
//       setImageLoaded(false);
//     } else {
//       setProfilePicture(null);
//     }
//   };

//   const handleImageLoaded = () => {
//     // Set imageLoaded to true when the image has finished loading
//     setImageLoaded(true);
//   };
  
//   return (
//     <div className="upload-profilepic file-upload-container">
//       <div className="profilepic">
//         {profilePicture ? (
//           <img
//             className="passport-photo"
//             src={profilePicture}
//             alt="Profile"
//           />
//         ) : (
//           <div className="initials-profile-picture">{initials}</div>
//         )}
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//       </div>
//       <div className="camera-icon">
//         <button onClick={openFileDialog} className="icon-button">
//           <FaCamera />
//         </button>
//       </div>
//       {error && <div className="error">{error}</div>}
//       <div className="employee-name">
//         <strong>{empname}</strong>
//       </div>
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }




import React, { useState, useRef, useEffect } from 'react';
import './MyDetails_ProfilePic.css';
import { FaCamera } from 'react-icons/fa';
import { useAuth } from '../AuthContext';

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
          // `http://localhost:8080/findEmployeeByEmail/${username}`
          `https://ems-backend-production-3f3d.up.railway.app/${username}`
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
        const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/${empId}`);
        if (response.ok) {
          const blob = await response.blob();
          setProfilePicture(URL.createObjectURL(blob));
        } else if (response.status === 404) {
          // Profile picture not found, do nothing
          setProfilePicture(null); // Clear the profile picture if not found
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, [empId]);

  let splitName = empname.split(" ");
  let firstName = splitName[0];
  let lastName = '';
  
  if (splitName.length > 1) {
    lastName = splitName[splitName.length - 1];
  }

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
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
        setError('File size exceeds 5MB');
        return;
      }
    
      if (!file.type.includes('jpeg')) {
        setError('Please select a JPEG file');
        return;
      }
    
      const formData = new FormData();
      formData.append('file', file);
    
      try {
        const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/${empId}`, {
          method: 'PUT',
          body: formData,
        });
    
        if (!response.ok) {
          setError('Error uploading the file');
          console.error('Upload failed:', response.statusText);
          return;
        }
    
        console.log('Upload successful');
        setError(null);
    
        // Fetch the updated profile picture after successful upload
        const updatedResponse = await fetch(`https://ems-backend-production-3f3d.up.railway.app/${empId}`);
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
        console.error('Error uploading file:', error);
        setError('Error uploading the file');
      }
    } else {
      setProfilePicture(null);
    }
  };

  return (
    <div className="upload-profilepic file-upload-container">
      <div className="profilepic">
        {(selectedFile || profilePicture) ? (
          <img
            className="passport-photo"
            src={selectedFile ? URL.createObjectURL(selectedFile) : profilePicture}
            alt="Profile"
          />
        ) : (
          <div className="initials-profile-picture">{initials}</div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
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
