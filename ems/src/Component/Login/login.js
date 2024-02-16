// import React, { useState } from "react";
// import "./login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [errors, setErrors] = useState({ username: "" });

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const errors = {};

//     if (!username) {
//       errors.username = "Username is required";
//     }

//     if (Object.keys(errors).length) {
//       setErrors(errors);
//       return;
//     }

//     // Make an API call or perform other login logic
//   };

//   return (
//     <div className="login-container">
//       <h2>Login to Pursuit Software</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group login-label-input">
//           <label className="login-label" htmlFor="username">
//             Username:
//           </label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Username"
//             name="username"
//             required
//             value={username}
//             onChange={handleUsernameChange}
//           />
//           {errors.username && <span className="error">{errors.username}</span>}
//         </div>

//         <div className="form-group login-label-input">
//           <label className="login-label" htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Type password"
//             name="password"
//             required
//             value="" // Password field value is emptied
//             onChange={() => {}} // Password change handler is disabled
//           />
//           {errors.password && <span className="error">{errors.password}</span>}
//         </div>

//         <button type="submit" className="login-btn">
//           Login
//         </button>
//       </form>
//       <a href="forgot.js" className="forgot-password">
//         Forgot Password?
//       </a>
//       <br />
//     </div>
//   );
// };

// export default Login;
import React, {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import { useAuth } from '../AuthContext';
const Login = ()=> {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[empid,setempId]=useState("")
  const[jobId,setJobId]=useState("");
  const[employeeType,setEmployeeType]=useState("");
  const [errors, setErrors] = useState({});
  const { updateEmpId,updateUsername,updateJobId,updateEmployeeTypeId } = useAuth();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleClickForgetPass = () => {
    navigate("/setPassword/username"); // Navigate to the /addEmployee route
  };

  useEffect(() => {
    if (empid) {
      console.log("empid:", empid);
      console.log("username", username);
      updateEmpId(empid);
      updateUsername(username);
      updateJobId(jobId);
      updateEmployeeTypeId(employeeType);
      navigate('/home', { state: { empId: empid, employeeType: employeeType, jobId: jobId } });
    }
  }, [empid, navigate, username, jobId, employeeType, updateEmpId, updateUsername, updateJobId, updateEmployeeTypeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const errors = {};
  
    if (!username) {
      errors.username = "Username is required";
    }
  
    if (!password) {
      errors.password = "Password is required";
    }
  
    setErrors(errors);
  
    if (Object.keys(errors).length) {
      return;
    }
  
    try {
      // Make an API call to authenticate the user
      const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/findEmployee/${username}/${password}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // No body for GET requests
      });
  
      // Check if the response is successful (status code 2xx)
      const data = await response.json();
      console.log(response);
        if (data === 2) {
          // Admin user
          console.log("Admin user authenticated");
          const emailResponse = await fetch(`https://ems-backend-production-3f3d.up.railway.app/findEmployeeByEmail/${username}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const employeeData = await emailResponse.json();
          console.log("empid",employeeData.empId);
          // Update state with user details
          setempId(employeeData.empId);
          setJobId( employeeData.jobRoleEntity.job_id);
          setEmployeeType( employeeData.employeeType.employeeTypeId);
          // onEmpIdChange(employeeData.empId);
         
          // Perform actions specific to admin
        } else if (data === 3) {
          // Employee

          console.log("Empolyee authenticated");
          const emailResponse = await fetch(`https://ems-backend-production-3f3d.up.railway.app/findEmployeeByEmail/${username}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          // const employeeData = await emailResponse.json();
    
          // Update state with user details
          const employeeData = await emailResponse.json();
          console.log("empid",employeeData.empId);
          // Update state with user details
          setempId(employeeData.empId);
          setJobId( employeeData.jobRoleEntity.job_id);
          setEmployeeType( employeeData.employeeType.employeeTypeId);
          // onEmpIdChange(employeeData.empId);
          // console.log("empid",empid);
          // setUser({
          //   empId: employeeData.empId,
          //   username: username,
          // });
         
          // navigate('/home');
          // navigate('/AdminProfile'); 
          // Perform actions specific to regular user
          // setUser({
          //   empId: data.empId, // Assuming empId is available in the API response
          //   username: username,
          
          // });
        } 
       else {
        // Authentication failed, handle errors
        console.error("Authentication failed");
  
        // Parse the JSON error message from the response, if available
        try {
          const errorData = await response.json();
          console.error("Error message:", errorData.message);
        } catch (error) {
          console.error("Error parsing error message:", error);
        }
  
        // You can set errors here based on your application logic
        setErrors({
          username: "Invalid credentials",
          password: "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      // Handle other errors
    }
  };
  // console.log("user is",user);
     
      
  return (
    <div className="login-container">
      <h2>LOGIN TO PURSUIT SOFTWARE</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group login-label-input">
          <label className="login-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            // name="username"
            // required
            value={username}
            onChange={handleUsernameChange}
          />
          
        </div>
        <div className="error">
          {errors.username && <div >{errors.username}</div>}
        </div>

        <div className="form-group login-label-input">
          <label className="login-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Type password"
            name="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="error">
        {errors.password && <div>{errors.password}</div>}
        </div>
       

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <p className="forgot-password" style={{cursor:"pointer",marginTop:"20px",color:"rgb(10, 102, 222)"}}onClick={handleClickForgetPass}>
        Forgot Password?
      </p>
    </div>
  );
};

export default Login;
