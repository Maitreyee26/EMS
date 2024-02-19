

import React, { useState, useEffect } from "react";
import "./LeavePopup.css";
import LabelComponent from "../LabelComponentRen/LabelComponent";
import { useAuth } from "../AuthContext";
const LeavePopup = ({
  startDate,
  endDate,
  leaveType,
  notes,
  halfDayStartDate,
  halfDayEndDate,
  handleStartDateChange,
  handleEndDateChange,
  handleLeaveTypeChange,
  handleRequestLeave,
  handleCancel,
  handlenotes,
  handleHalfDayStartDateChange,
  handleHalfDayEndDateChange,
  notify,
  handleNotifyChange,
  options,
}) => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [firstOrSecondHalfOptions, setFirstOrSecondHalfOptions] = useState([]);
  const [endInOptions, setEndInOptions] = useState([]);
  const [fetchedLeaveTypeId, setFetchedLeaveTypeId] = useState(null);
  const [halfDayOptions, setHalfDayOptions] = useState([]);
  const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState(null);
  const [halffull, setHalffull] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [firstOrSecondHalstart, setFirstOrSecondHalstart] = useState("");
  const [firstOrSecondHalend, setFirstOrSecondHalend] = useState("");
  const [notifyId, setNotifyId] = useState(null);
  const [notifyOptions, setNotifyOptions] = useState([]);
  const [halfFullDay, setHalfFullDay] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [currUser, setCurrUser] = useState("");
  const [isLeavePopupVisible, setIsLeavePopupVisible] = useState(false);
  const [secondApiResponse, setSecondApiResponse] = useState(null);

  console.log("leave id ",leaveTypeId);

  const [leaveDetails, setLeaveDetails] = useState({
    startDate: startDate || "", // Use provided startDate or default to an empty string
    endDate: endDate || "", // Use provided endDate or default to an empty string
    leaveType: leaveType || "", // Use provided leaveType or default to an empty string
    notes: notes || "", // Use provided notes or default to an empty string
    halfDayStartDate: halfDayStartDate || "", // Use provided halfDayStartDate or default to an empty string
    halfDayEndDate: halfDayEndDate || "", // Use provided halfDayEndDate or default to an empty string
    notify: notify || "", // Use provided notify or default to an empty string
    halfFullDay: halfFullDay || "",
  });
  const isSameDate = leaveDetails.startDate === leaveDetails.endDate;
  const { empId } = useAuth();
  const handleInputChange = (field, selectedOption) => {
    if (field === "startDate" || field === "endDate" || field === "notes" || field === "notify"){
  setLeaveDetails({
      ...leaveDetails,
      [field]: selectedOption,
    });
    }
    else {
      setLeaveDetails({
        ...leaveDetails,
        [field]: selectedOption.value,
      });
    
      if (field === "halfDayStartDate") {
        setFirstOrSecondHalstart(selectedOption.value);
      }
      if (field === "halfDayEndDate") {
        setFirstOrSecondHalend(selectedOption.value);
      }
      if (field === "halfFullDay") {
        setHalffull(selectedOption.value);
      }
      if (field === "leaveType") {
        setLeaveTypeId(selectedOption.id);
      }
      if (field === "notify") {
        
      }
    }
    // if (field === "notify") {
    //   setLeaveDetails({
    //     ...leaveDetails,
    //     [field]: selectedOption.value,
    //   });

    //   setNotifyId(id); // Store the selected employee's ID
    // }
   
  };
  
  
  const isEndDateValid = () => {
    return new Date(leaveDetails.endDate) >= new Date(leaveDetails.startDate);
  };

  // const handleRequest = () => {
  //   if (isEndDateValid()) {
  //     handleRequestLeave();
  //   } else {
  //     alert("End date should not be greater than or equal to the start date");
  //   }
  // };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/findEmployeeById/${empId}`
        );
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (!contentType || !contentType.includes("application/json")) {
          const responseData = await response.text();
          throw new Error(
            `Invalid content type. Expected JSON. Received: ${responseData}`
          );
        }

        const employeeData = await response.json();
          
        setEmail(employeeData.email);
        setMaritalStatus(employeeData.materialStatus);
        setGender(employeeData.gender);
        setCurrUser(employeeData.empId)
        // Assuming your API response structure includes properties like 'maritalStatus' and 'gender'
        // const maritalStatus = employeeData.materialStatus;
        // const gender = employeeData.gender;

        // Now you can use these values as needed in your component state or UI

        // Example: setMaritalStatus(maritalStatus);
        // Example: setGender(gender);
      } catch (error) {
        console.error("Error fetching employee details:", error.message);
      }
    };

    // Call the function to fetch employee details
    fetchEmployeeDetails(empId);

   
  }, []); // Make sure to include empId in the dependency array if it's not a constant

  // console.log(maritalStatus, gender);
  let mm = [];
  if (maritalStatus === "Married" && gender === "Male") {
    mm = [
      { value: "", label: "Leave Type" },
      { value: "Sick Leave", label: "Sick Leave", id: 1 },
      { value: "Floater Leave", label: "Floater Leave", id: 2 },
      { value: "Casual Leave", label: "Casual Leave", id: 3 },
      { value: "Unpaid Leave", label: "Unpaid Leave", id: 4 },
      // { value: "Earned Leave", label: "Earned Leave", id: 5 },
      { value: "Paternity Leave", label: "Paternity Leave", id: 5 },
    ];
  } else if (maritalStatus === "Married" && gender === "Female") {
    mm = [
      { value: "", label: "Leave Type" },
      { value: "Sick Leave", label: "Sick Leave", id: 1},
      { value: "Floater Leave", label: "Floater Leave", id: 2 },
      { value: "Casual Leave", label: "Casual Leave", id: 3 },
      { value: "Unpaid Leave", label: "Unpaid Leave", id: 4 },
      // { value: "Earned Leave", label: "Earned Leave", id: 5 },
      { value: "Maternity Leave", label: "Maternity Leave", id: 5 },
    ];
  } else if (maritalStatus === "Unmarried" && gender === "Male") {
    mm = [
      { value: "", label: "Leave Type" },
      { value: "Sick Leave", label: "Sick Leave", id: 1 },
      { value: "Floater Leave", label: "Floater Leave", id: 2 },
      { value: "Casual Leave", label: "Casual Leave", id: 3 },
      { value: "Unpaid Leave", label: "Unpaid Leave", id: 4},
      // { value: "Earned Leave", label: "Earned Leave", id: 5 },
    ];
  } else if (maritalStatus === "Unmarried" && gender === "Female") {
    mm = [
      { value: "", label: "Leave Type" },
      { value: "Sick Leave", label: "Sick Leave", id: 1 },
      { value: "Floater Leave", label: "Floater Leave", id: 2 },
      { value: "Casual Leave", label: "Casual Leave", id: 3 },
      { value: "Unpaid Leave", label: "Unpaid Leave", id: 4 },
      // { value: "Earned Leave", label: "Earned Leave", id: 5 },
    ];
  }

  console.log(halffull,leaveTypeId,firstOrSecondHalstart,firstOrSecondHalend);
  const handleRequest = async () => {
    try {
      if (isEndDateValid()) {
        const payload = {
          startDate: leaveDetails.startDate,
          endDate: leaveDetails.endDate,
          reason: leaveDetails.notes,
          employeeEntity: {
            empId: empId, // You may need to get the employee ID dynamically
          },
          leaveTypeEntity: {
            leaveTypeId: leaveTypeId,
          },
          sameDay: halffull,
          diffDayStartIn: firstOrSecondHalstart,
          diffDayEndIn: firstOrSecondHalend,
        };
        console.log("new details",leaveDetails.notify.value);
        const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/requestLeave/${leaveDetails.notify.value}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.text();
        console.log(responseData);

        // Check the response and handle it accordingly
        if (responseData === "Leave request sent for approval") {
          // Success case, you may want to close the popup or show a success message
         
  
          alert("Leave request sent for approval");

         
        } else {
          // Handle other cases based on your backend response
          console.log("Unhandled response:", responseData);
        }
      } else {
        alert("End date should not be greater than or equal to the start date");
      }
      handleCancel()
    } catch (error) {
      console.error("Error submitting leave request:", error.message);
    }
  };

  const [leavehistoryData, setLeavehistoryData] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/findLeaveByEmpId/${empId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const leaveData = await response.json();
        setLeavehistoryData(leaveData);
      } catch (error) {
        console.error('Error fetching leave data:', error.message);
      }
    };

    fetchLeaveData();
  }, []); // Empty dependency array to run the effect only once on component mount
 
  console.log("hello ",leavehistoryData);
  const getMinDate = () => {
    const today = new Date();
    today.setMonth(today.getMonth() - 2);
    return today.toISOString().split('T')[0];
  };
  
  const getMaxDate = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 2);
    return today.toISOString().split('T')[0];
  };


  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await fetch("https://ems-backend-production-3f3d.up.railway.app/getAllEmployees");
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const employeeData = await response.json();
  
        // Convert the object into an array of objects with 'label' and 'value' properties
        const notifyOptions = employeeData.map(employee => ({
          label: employee.emp_name, // Assuming your employee object has a 'name' property
          value: employee.email, // Assuming your employee object has an 'email' property
        }));
  
        setNotifyOptions(notifyOptions);
      } catch (error) {
        console.error("Error fetching employee names:", error.message);
      }
    };
  
    // Call the function to fetch employee names
    fetchEmployeeNames();
  }, []); // Empty dependency array to run the effect only once on component mount
  
    
  return (
    <div className="leave-popup">
      <div
        className="dates-leavepopup"
        style={{ display: "flex", gap: "20px" }}
      >
        <LabelComponent
          label="Start Date:"
          inputType="date"
          value={leaveDetails.startDate}
          onChange={(value) => handleInputChange("startDate", value)}
          className="attendance-label-input attendance-startdate"
          min={getMinDate()}
          max={getMaxDate()}
        />
        <LabelComponent
          label="End Date:"
          inputType="date"
          value={leaveDetails.endDate}
          onChange={(value) => handleInputChange("endDate", value)}
          className="attendance-label-input attendance-enddate"
          min={getMinDate()}
          // max={getMaxDate()}
        />
      </div>

      <div
        className="type-note-leave"
        style={{ display: "flex", gap: "20px", marginTop: "30px" }}
      >
        <LabelComponent
          inputType="select"
          options={mm}
          value={leaveDetails.leaveType}
          // onChange={(value) => handleInputChange("leaveType", value)}
          onChange={(value, id) => handleInputChange("leaveType", value, id)}
          className="attendance-label-input attendance-type"
        />

        <LabelComponent
          label="Notes"
          inputType="text"
          value={leaveDetails.notes}
          onChange={(value) => handleInputChange("notes", value)}
          className="attendance-label-input attendance-notes"
        />
      </div>

      {isSameDate ? (
        <div
          className="half-full-day-dropdowns"
          style={{ display: "flex", gap: "20px", marginTop: "20px" }}
        >
          <LabelComponent
            inputType="select"
            style={{ marginTop: "100px" }}
            value={leaveDetails.halfFullDay}
            onChange={(value) => handleInputChange("halfFullDay", value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Custom Day" },
              { value: "First Half", label: "First Half", id: 1 },
              { value: "Second Half", label: "Second Half", id: 2 },
              { value: "Full Day", label: "Full Day", id: 3 },
            ]}
          />
          <LabelComponent
            
            inputType="select"
            value={leaveDetails.notify}
            onChange={(value) => handleInputChange("notify", value)}
            className="attendance-label-input attendance-notify"
            options={[ { label: "Notify", value: "" }, ...notifyOptions]}
           
          />
        </div>
      ) : (
        <div
          className="half-full-day-dropdowns"
          style={{ display: "flex", gap: "20px", marginTop: "20px" }}
        >
          <LabelComponent
            inputType="select"
            value={leaveDetails.halfDayStartDate}
            onChange={(value) => handleInputChange("halfDayStartDate", value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Start In" },
              { value: "First Half", label: "First Half", id: 1 },
              { value: "Second Half", label: "Second Half", id: 2 },
            ]}
          />
          <LabelComponent
            inputType="select"
            value={leaveDetails.halfDayEndDate}
            onChange={(value) => handleInputChange("halfDayEndDate", value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "End In" },
              { value: "First Half", label: "First Half", id: 1 },
              { value: "Second Half", label: "Second Half", id: 2 },
            ]}
          />
          <span
            style={{ marginTop: "70px", marginLeft: "-320px", width: "200px" }}
          >
            <LabelComponent
              
              inputType="select"
              value={leaveDetails.notify}
              onChange={(value) => handleInputChange("notify", value)}
              className="attendance-label-input attendance-notify"
              options={[ { label: "Notify", value: "" }, ...notifyOptions]}
             
            />
          </span>
        </div>
      )}

      <div className="button-container">
        <button className="leave-request-cancel-button" onClick={() => handleRequest(leaveDetails.notify)}>
          Request Leave
        </button>

        <button className="leave-request-cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LeavePopup;

//actual code ends

//className="leave-request-cancel-button"
{
  /* <LabelComponent
            label="Start Date:"
            inputType="select"
            value={halfDayStartDate}
            onChange={(e) => handleHalfDayStartDateChange(e.target.value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Select" },
              { value: "First Half", label: "First Half" },
              { value: "Second Half", label: "Second Half" },
            ]}
          />
          <LabelComponent
            label="End Date:"
            inputType="select"
            value={halfDayEndDate}
            onChange={(e) => handleHalfDayEndDateChange(e.target.value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Select" },
              { value: "First Half", label: "First Half" },
              { value: "Second Half", label: "Second Half" },
            ]}
          /> */
  // useEffect(() => {
  //   const fetchLeaveTypes = async () => {
  //     try {
  //       const response = await fetch("https://ems-backend-production-3f3d.up.railway.app/findAllLeaveType");
  //       const contentType = response.headers.get("content-type");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       if (!contentType || !contentType.includes("application/json")) {
  //         const responseData = await response.text();
  //         throw new Error(
  //           `Invalid content type. Expected JSON. Received: ${responseData}`
  //         );
  //       }
  //       const data = await response.json();
  //       setLeaveTypes(data);
  //       // console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching leave types:", error.message);
  //     }
  //   };
  //   fetchLeaveTypes();
  // }, []);
  // useEffect(() => {
  //   const fetchLeaveTypeOptions = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://ems-backend-production-3f3d.up.railway.app/findHalfDayOrFullDay"
  //       );
  //       const contentType = response.headers.get("content-type");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       if (!contentType || !contentType.includes("application/json")) {
  //         const responseData = await response.text();
  //         throw new Error(
  //           `Invalid content type. Expected JSON. Received: ${responseData}`
  //         );
  //       }
  //       const data = await response.json();
  //       console.log("half day full day data", data);
  //       setLeaveTypeOptions([
  //         { value: "", label: "Select" },
  //         ...data.map((item) => ({
  //           value: item.id,
  //           label: item.halfday_fullday,
  //         })),
  //       ]);
  //     } catch (error) {
  //       console.error("Error fetching leave type options:", error.message);
  //     }
  //   };
  //   fetchLeaveTypeOptions();
  // }, []);
  // const halfdayfulldayid = leaveTypeOptions.id;
  // console.log("half day full day data", halfdayfulldayid);
  // useEffect(() => {
  //   const fetchHalfDayOptions = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://ems-backend-production-3f3d.up.railway.app/getFirstOrSecondHalf"
  //       );
  //       const contentType = response.headers.get("content-type");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       if (!contentType || !contentType.includes("application/json")) {
  //         const responseData = await response.text();
  //         throw new Error(
  //           `Invalid content type. Expected JSON. Received: ${responseData}`
  //         );
  //       }
  //       const data = await response.json();
  //       setHalfDayOptions([
  //         { value: "", label: "Select Half" },
  //         ...data.map((item) => ({
  //           value: item.id,
  //           label: item.firstSecondHalf,
  //         })),
  //       ]);
  //     } catch (error) {
  //       console.error("Error fetching half day options:", error.message);
  //     }
  //   };
  //   fetchHalfDayOptions();
  // }, []);
  // console.log(halfDayOptions);
  // if (isSameDate) {
  //   payload.sameDay = leaveDetails.halfFullDay;
  //   payload.diffDayStartIn = "";
  //   payload.diffDayEndIn = ""; // Adjust as needed based on your backend requirements
  // } else {
  //   payload.sameDay = ""; // Adjust as needed based on your backend requirements
  //   payload.diffDayStartIn = leaveDetails.halfDayStartDate;
  //   payload.diffDayEndIn = leaveDetails.halfDayEndDate;
  // }
}

// useEffect(() => {
//   const fetchNotifyOptions = async () => {
//     try {
//       const response = await fetch(
//         `https://ems-backend-production-3f3d.up.railway.app/findReportingManager/1`
//       );
//       const contentType = response.headers.get("content-type");

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       if (!contentType || !contentType.includes("application/json")) {
//         const responseData = await response.text();
//         throw new Error(
//           `Invalid content type. Expected JSON. Received: ${responseData}`
//         );
//       }

//       const data = await response.json();

//       // Check if data is an array, if not, convert it to an array
//       const dataArray = Array.isArray(data) ? data : [data];

//       setNotifyOptions([
//         { value: "", label: "Notify" },
//         ...dataArray.map((item) => ({
//           value: item.empId, // Adjust based on the actual property
//           label: item.emp_name, // Adjust based on the actual property
//         })),
//       ]);
//     } catch (error) {
//       console.error("Error fetching notify options:", error.message);
//     }
//   };

//   fetchNotifyOptions();
// }, []); // Empty dependency array to ensure the effect runs only once



  // const handleInputChange = (field, value,id) => {
  //   setLeaveDetails({
  //     ...leaveDetails,
  //     [field]: value,
  //   });

  
  //   if (field === "halfDayStartDate") {
  //     setFirstOrSecondHalstart(value);
  //   }
  //   if (field === "halfDayEndDate") {
  //     setFirstOrSecondHalend(value);
  //   }
  //   if (field === "halfFullDay") {
  //     setHalffull(value);
  //   }
  //   if (field === "leaveType") {
  //     setLeaveTypeId(id);
  //   }
  // };


  //   useEffect(() => {
//     const fetchEmployeeNames = async () => {
//         try {
//             const response = await fetch(
//                 "https://ems-backend-production-3f3d.up.railway.app/findAllEmployeeIdAndName"
//             );
//             const contentType = response.headers.get("content-type");

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             if (!contentType || !contentType.includes("application/json")) {
//                 const responseData = await response.text();
//                 throw new Error(
//                     `Invalid content type. Expected JSON. Received: ${responseData}`
//                 );
//             }

//             const employeeData = await response.json();

//             // Convert the object into an array of objects with 'label' and 'value' properties
//             const notifyOptions = Object.entries(employeeData).map(([label, value]) => ({ label, value })) ;
           
             
//             setNotifyOptions(notifyOptions);
//         } catch (error) {
//             console.error("Error fetching employee names:", error.message);
//         }
//     };

//     // Call the function to fetch employee names
//     fetchEmployeeNames();
// }, []); // Empty dependency array to run the effect only once on component mount

  // console.log(
  //   leaveDetails.halfFullDay,
  //   leaveDetails.leaveType,
  //   leaveDetails.halfDayStartDate,
  //   leaveDetails.halfDayEndDate
  // );
