import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
// import "./TableForAttendance.css";
import { FaLocationDot } from "react-icons/fa6";

// Create TableForAttendanceDetails component
// const TableForAttendanceDetails = ({ attendance }) => {
//     return (
//       <>
//         <td>
//         {attendance.workFromEntity.workFrom}
//         </td>
//         <td>
//           {attendance.location === "N/A" ? (
//             "Location not available"
//           ) : (
//             <div className="location-details">
//               <FaLocationDot className="attendance-location-icon" />
//               {attendance.location}
//             </div>
//           )}
//         </td>
//         {/* <td>{attendance.grossHours}</td> */}
//         <td>{attendance.loginDateAndTime}</td>
//         <td>{attendance.logout_date_and_time}</td>
//         {/* <td>{attendance.log}</td> */}
//       </>
//     );
//   };

//   export default TableForAttendanceDetails;



const TableForAttendanceDetails = ({ attendance }) => {
    const formatDateAndTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      return (
        dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString()
      );
    };
  
    return (
      <>
        <td>{attendance.workFromEntity.workFrom}</td>
        <td>
          {attendance.location === "N/A" ? (
            "Location not available"
          ) : (
            <div className="location-details">
              <FaLocationDot className="attendance-location-icon" />
              {attendance.location}
            </div>
          )}
        </td>
        <td>{formatDateAndTime(attendance.loginDateAndTime)}</td>
        <td>{formatDateAndTime(attendance.logout_date_and_time)}</td>
      </>
    );
  };
  
  export default TableForAttendanceDetails;
//   <td>{attendance.date}</td>
  //             <td>{attendance.logout_date_and_time}</td>
  //             <td>{attendance.loginDateAndTime}</td>
  //             <td>{attendance.location}</td>
  //             <td>{attendance.workFromEntity.workFrom}</td>
  //             <td>{attendance.grossHours}</td>