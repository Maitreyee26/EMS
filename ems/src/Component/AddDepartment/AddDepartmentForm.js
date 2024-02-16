// import React, { useState } from "react";
// import "./AddDepartmentForm.css";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

// const AddDepartmentForm = () => {
//   const [departmentName, setDepartmentName] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("");

//   const [error, setError] = useState({
//     departmentName: "",
//     departmentLocation: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");

//   const locations = [
//     { value: "Kolkata", label: "Kolkata" },
//     { value: "Shillong", label: "Shillong" },
//     { value: "Indore", label: "Indore" },
//   ];
//   const animatedComponents = makeAnimated();

//   const handleLocationChange = (selectedOptions) => {
//     setSelectedLocation(selectedOptions);
//     setError((prevState) => ({ ...prevState, departmentLocation: "" }));
//   };


//   const handleAddDepartment = async () => {
//     const errors = {};
  
//     if (!departmentName) {
//       errors.departmentName = "Please provide a department name.";
//     }
  
//     if (selectedLocation.length === 0) {
//       errors.departmentLocation = "Please select department location.";
//     }
  
//     if (Object.keys(errors).length > 0) {
//       setError(errors);
//       setSuccessMessage("");
//       return;
//     }
  
//     try {
//       const response = await fetch("http://localhost:8080/addDepartment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           dept_name: departmentName.toUpperCase(),
//           location: selectedLocation.value,
//         }),
//       });
  
//       // Check if the response status is OK (status code 2xx)
//       if (response.ok) {
//         // Check the Content-Type header
//         const contentType = response.headers.get("Content-Type");
//         console.log(contentType);
  
//         if (contentType && contentType.includes("application/json")) {
//           // Parse the JSON response
//           const data = await response.json();
//           console.log(data);
//           if (data.message === "Department added!") {
//             setDepartmentName("");
//             setSelectedLocation([]);
//             setError({
//               departmentName: "",
//               departmentLocation: "",
//             });
//             setSuccessMessage("Department added successfully!");
//           } else {
//             setError({
//               departmentName: data.message,
//               departmentLocation: "",
//             });
//           }
//         } else {
//           // Handle plain text response
//           const text = await response.text();
//           console.log("Text response:", text);
//           setError({
//             departmentName: text,
//             departmentLocation: "",
//           });
//         }
//       } else {
//         // Handle non-2xx responses (e.g., display an error message)
//         console.error("Server responded with an error:", response.statusText);
//       }
  
//       // Clear success message after 5 seconds
//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 3000);
//     } catch (error) {
//       console.error("Error adding department:", error);
//       // Handle error, show an error message to the user if needed
//     }
//   };



//   const validatedepartmentname = (value) => {
//     if (!value) {
//       return "Please Provide Name";
//     }
//     return "";
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;

//     if (id === "departmentName") {
//       setDepartmentName(value);
//       const deptnameError = validatedepartmentname(value);
//       setError((prevState) => ({
//         ...prevState,
//         departmentName: deptnameError,
//       }));
//     }
//   };

//   return (
//     <div>
//       <form>
//         <div className="adddept-main-cont">
//           <div className="deptname">
//             <label className="dept-label">Department Name:</label>
//             <input
//               type="text"
//               value={departmentName}
//               onChange={handleInputChange}
//               className="deptloc-search-field"
//               id="departmentName"
//             />
//           </div>
//           <div className="error-message">
//             {" "}
//             {error.departmentName && <div>{error.departmentName}</div>}
//           </div>

//           <div className="deptloc-search">
//             <label className="dept-label">Department Location:</label>
//             <Select
//               closeMenuOnSelect={false}
//               components={animatedComponents}
//               id="departmentLocation"
//               className="deptloc-select-option"
//               value={selectedLocation}
//               onChange={handleLocationChange}
//               // isMulti
//               options={locations}
//             />
//           </div>
//           <div className="error-message">
//             {error.departmentLocation && <div>{error.departmentLocation}</div>}
//           </div>
//           <button
//             type="button"
//             className="adddept-submit-button"
//             onClick={handleAddDepartment}
//           >
//             Add Department
//           </button>
//           <div className="adddept-success-message">
//             {successMessage && <div>{successMessage}</div>}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddDepartmentForm;

import React, { useState, useRef } from "react";
import "./AddDepartmentForm.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Messages } from "primereact/messages";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const AddDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [error, setError] = useState({
    departmentName: "",
    departmentLocation: "",
  });
  const locations = [
    { value: "Kolkata", label: "Kolkata" },
    { value: "Shillong", label: "Shillong" },
    { value: "Indore", label: "Indore" },
  ];
  const animatedComponents = makeAnimated();
  const messagesRef = useRef(null);

  const handleLocationChange = (selectedOptions) => {
    setSelectedLocation(selectedOptions);
    setError((prevState) => ({ ...prevState, departmentLocation: "" }));
  };

  const handleAddDepartment = async () => {
    const errors = {};

    if (!departmentName) {
      errors.departmentName = "Please provide a department name.";
    }

    if (selectedLocation.length === 0) {
      errors.departmentLocation = "Please select department location.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
   
    try {
      const response = await fetch("http://localhost:8080/addDepartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dept_name: departmentName.toUpperCase(),
          location: selectedLocation.value,
        }),
      });
    
      if (response.ok) {
        const responseData = await response.text(); // Read the response body as text
    
        const lowerCaseMessage = responseData.trim().toLowerCase();
    
        console.log("Server Response:", lowerCaseMessage);
    
        if (lowerCaseMessage === "department added!") {
          messagesRef.current.show({
                      sticky: true,
                      severity: 'success',
                      summary: 'Success',
                      detail: "Department added successfully!",
                    });
        } else if (lowerCaseMessage === "department already exists!") {
          messagesRef.current.show({
                      severity: "error",
                      summary: "",
                      detail:"department already exists!" ,
                    });
                 
        } else {
          // Show generic error message for other cases
          console.log("Unhandled Response Message:", lowerCaseMessage);
        }
      } else {
        console.error("Server responded with an error:", response.statusText);
      }
    
      // Clear messages after 5 seconds
      setTimeout(() => {
        messagesRef.current.clear();
      }, 3000);
    } catch (error) {
      console.error("Error adding department:", error);
    
      messagesRef.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error adding department. Please try again.",
      });
    }
    
};
  // const validatedepartmentname = (value) => {
  //   if (!value) {
  //     return "Please Provide Name";
  //   }
  //   return "";
  // };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "departmentName") {
      setDepartmentName(value);
      // const deptnameError = validatedepartmentname(value);
      // setError((prevState) => ({
      //   ...prevState,
      //   departmentName: deptnameError,
      // }));
    }
  };

  return (
    <div>
      <form>
        <div className="adddept-main-cont">
          <div className="add-deptname">
            <label className="add-dept-label">Department Name:</label>
            <input
              type="text"
              value={departmentName}
              onChange={handleInputChange}
              className="add-deptloc-search-field"
              id="departmentName"
            />
          </div>
          <div className="error-message">
            {error.departmentName && <div>{error.departmentName}</div>}
          </div>

          <div className="deptloc-search">
            <label className="add-dept-label">Department Location:</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              id="departmentLocation"
              className="add-deptloc-select-option"
              value={selectedLocation}
              onChange={handleLocationChange}
              options={locations}
            />
          </div>
          <div className="error-message">
            {error.departmentLocation && <div>{error.departmentLocation}</div>}
          </div>
          <button
            type="button"
            className="adddept-submit-button"
            onClick={handleAddDepartment}
          >
            Add Department
          </button>
          <Messages ref={messagesRef} className="adddept-primereact-message" />
        </div>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
