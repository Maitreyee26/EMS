// import React, { useEffect, useState } from "react";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import "./TableForAttendance.css";
// import { FaLocationDot } from "react-icons/fa6";

// export default function TableForAttendance({
//   currentDateGrossHours,
//   updateGrossHoursForCurrentDate,
// }) {
//   const [attendanceData, setAttendanceData] = useState([]);
//   // const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//   const [tableContainer, setTableContainer] = useState(null);

//   const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

//   const allMonths = Array.from({ length: 12 }, (_, index) => {
//     return new Date(currentYear, index, 1).toLocaleString("en-US", {
//       month: "long",
//     });
//   });

//   const currentMonthIndex = allMonths.indexOf(currentMonth);

//   const months = [
//     ...allMonths.slice(currentMonthIndex),
//     ...allMonths.slice(0, currentMonthIndex),
//   ];

//   const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Set the initial selected month to the current month

//   const selectedMonthIndex = months.indexOf(selectedMonth);

//   const handleMonthChange = (event) => {
//     const selectedMonth = event.target.value;
//     setSelectedMonth(selectedMonth);
//     fetchAttendanceData(selectedMonth, selectedYear);
//   };
//   const handleTableScroll = () => {
//     if (tableContainer) {
//       const tableBody = tableContainer.querySelector("tbody");
//       const rows = tableBody.querySelectorAll("tr");
//       const tableRect = tableContainer.getBoundingClientRect();
//       const headerHeight = 40; // Update this value with your actual header height

//       let visibleMonth = null;

//       rows.forEach((row) => {
//         const rowRect = row.getBoundingClientRect();

//         if (
//           rowRect.top >= tableRect.top + headerHeight &&
//           rowRect.bottom <= tableRect.bottom
//         ) {
//           row.style.opacity = 1;

//           // Extract the month from the first cell in the row
//           const monthMatch = row.querySelector("td").innerText.match(/[a-zA-Z]+/);
//           if (monthMatch) {
//             visibleMonth = monthMatch[0];
//           }
//         } else {
//           row.style.opacity = 0;
//         }
//       });

//       // Update the selected month if a visible month is found
//       if (visibleMonth) {
//         setSelectedMonth(visibleMonth);
//       }
//     }
//   };
//   const fetchAttendanceData = (selectedMonth) => {
//     const currentDate = new Date();
//     const joiningDate = new Date("2023-09-01"); // Replace with the actual joining date

//     const currentMonthIndex = months.indexOf(selectedMonth);

//     const hardcodedResponse = Array.from({ length: months.length }, (_, index) => {
//       const monthIndex = (currentMonthIndex + index) % months.length;
//       const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();

//       return Array.from({ length: daysInMonth }, (_, dayIndex) => {
//         const day = dayIndex + 1;
//         const entryDate = new Date(`${months[monthIndex]} ${day}, ${selectedYear}`);

//         const isFutureDate =
//           selectedYear > currentDate.getFullYear() ||
//           (selectedYear === currentDate.getFullYear() &&
//             (monthIndex > currentMonthIndex ||
//               (monthIndex === currentMonthIndex && day > currentDate.getDate())));

//         const isDateBeforeJoining =
//           entryDate < joiningDate &&
//           (entryDate.getMonth() < joiningDate.getMonth() ||
//             (entryDate.getMonth() === joiningDate.getMonth() && day <= joiningDate.getDate()));

//         return {
//           date: `${months[monthIndex]} ${day}, ${selectedYear}`,
//           attendance: isFutureDate || isDateBeforeJoining ? 0 : Math.floor(Math.random() * 100),
//           location: isFutureDate || isDateBeforeJoining ? "N/A" : "Office",
//           grossHours: isFutureDate || isDateBeforeJoining ? 0 : 8,
//           clock_in: isFutureDate || isDateBeforeJoining ? "N/A" : "09:00 AM",
//           clock_out: isFutureDate || isDateBeforeJoining ? "N/A" : "06:00 PM",
//           log: isFutureDate
//             ? "Details for this month are not visible"
//             : isDateBeforeJoining
//             ? "Details are not available"
//             : "Details for the day",
//           isFutureDate,
//         };
//       });
//     }).flat();

//     setAttendanceData(hardcodedResponse);
//   };

//   useEffect(() => {
//     if (selectedMonth && selectedYear) {
//       fetchAttendanceData(selectedMonth, selectedYear);
//     }
//   }, [selectedMonth, selectedYear]);
//   const handleMonthButtonClick = (month) => {
//     fetchAttendanceData(month, selectedYear); // Fetch data for the selected month and year
//     setSelectedMonth(month); // Update selectedMonth state
//   };
//   useEffect(() => {
//     if (selectedMonth && selectedYear) {
//       fetchAttendanceData(selectedMonth, selectedYear);
//     }
//   }, [selectedMonth, selectedYear]);

//   useEffect(() => {
//     if (tableContainer) {
//       tableContainer.addEventListener("scroll", handleTableScroll);
//     }

//     return () => {
//       if (tableContainer) {
//         tableContainer.removeEventListener("scroll", handleTableScroll);
//       }
//     };
//   }, [tableContainer]);

//   const handleYearChange = (event) => {
//     const selectedYear = parseInt(event.target.value, 10);
//     setSelectedYear(selectedYear);
//     fetchAttendanceData(selectedMonth, selectedYear);
//   };

//   const generateYearOptions = () => {
//     const years = Array.from(
//       { length: currentYear - 2010 + 1 },
//       (_, index) => 2010 + index
//     );

//     return years.map((year) => (
//       <option key={year} value={year}>
//         {year}
//       </option>
//     ));
//   };

//   const renderRowsForSelectedMonth = () => {
//     const currentDate = new Date();

//     return attendanceData.map((entry) => {
//       const entryDate = new Date(entry.date);
//       const isFutureDate = entryDate > currentDate;

//       if (entryDate.getMonth() !== selectedMonthIndex) {
//         // Hide data for other months
//         return null;
//       }

//       if (entryDate.getDate() === currentDate.getDate()) {
//         // Update the gross hours for the current date
//         entry.grossHours = isFutureDate ? 0 : currentDateGrossHours;
//         updateGrossHoursForCurrentDate(0); // Reset the gross hours after updating

//         return (
//           <tr key={entry.date}>
//             <td>{entry.date}</td>
//             {isFutureDate ? (
//               <td colSpan="6">The details for this date are not available</td>
//             ) : (
//               <>
//                 <td>
//                   <ProgressBar animated now={entry.attendance} />
//                 </td>
//                 <td>
//                   {entry.location === "N/A" ? (
//                     "Location not available"
//                   ) : (
//                     <div className="location-details">
//                       <FaLocationDot className="attendance-location-icon" />
//                       {entry.locationDetails}
//                     </div>
//                   )}
//                 </td>
//                 <td>{entry.grossHours}</td>
//                 <td>{entry.clock_in}</td>
//                 <td>{entry.clock_out}</td>
//                 <td>{entry.log}</td>
//               </>
//             )}
//           </tr>
//         );
//       }

//       return (
//         <tr key={entry.date}>
//           <td>{entry.date}</td>
//           {isFutureDate ? (
//             <td colSpan="6">The details for this date are not available</td>
//           ) : (
//             <>
//               <td>
//                 <ProgressBar animated now={entry.attendance} />
//               </td>
//               <td>
//                 {entry.location === "N/A" ? (
//                   "Location not available"
//                 ) : (
//                   <div className="location-details">
//                     <FaLocationDot className="attendance-location-icon" />
//                     {entry.locationDetails}
//                   </div>
//                 )}
//               </td>
//               <td>{entry.grossHours}</td>
//               <td>{entry.clock_in}</td>
//               <td>{entry.clock_out}</td>
//               <td>{entry.log}</td>
//             </>
//           )}
//         </tr>
//       );
//     });
//   };

//   return (
//     <div className="attandance-main-table-month-button">
//       <div className="attendance-controls">
//         <div className="attendance-month-dropdown-container">
//           <label htmlFor="attendance-month-dropdown">Select Month:</label>
//           <select
//             id="attendance-month-dropdown"
//             value={selectedMonth}
//             onChange={handleMonthChange}
//           >
//             {months.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="year-dropdown-container">
//           <label htmlFor="attendance-year-dropdown">Select Year:</label>
//           <select
//             id="attendance-year-dropdown"
//             value={selectedYear}
//             onChange={handleYearChange}
//           >
//             {generateYearOptions()}
//           </select>
//         </div>
//       </div>
//       <div ref={(ref) => setTableContainer(ref)}
//         className="attendance-table-container"
//         style={{ maxHeight: "400px", overflowY: "auto"}}>
//         <table className="attendance-custom-table">
//           <thead>
//             <tr>
//               <th className="attendance-tableheader">Date</th>
//               <th className="attendance-tableheader">Attendance Visual</th>
//               <th className="attendance-tableheader">Clock In Location</th>
//               <th className="attendance-tableheader">Gross Hours</th>
//               <th className="attendance-tableheader">Clock In Time</th>
//               <th className="attendance-tableheader">Clock Out Time</th>
//               <th className="attendance-tableheader">Log</th>
//             </tr>
//           </thead>
//           <tbody>{renderRowsForSelectedMonth()}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



//2nd 

// import React from "react";
// import { FaLocationDot } from "react-icons/fa6";
// import "./TableForAttendance.css";

// const TableForAttendance = ({ attendanceData }) => {
  
//   return (
//     <div
//       className="attendance-table-container"
//       style={{ maxHeight: "400px", overflowY: "auto" }}
//     >
//       <table className="attendance-custom-table">
//         <thead>
//           <tr>
//             <th className="attendance-tableheader">Date</th>
//             <th className="attendance-tableheader">Mode of Work</th>
//             <th className="attendance-tableheader">Clock In Location</th>
//             <th className="attendance-tableheader">Clock In Time</th>
//             <th className="attendance-tableheader">Clock Out Time</th>
//             <th className="attendance-tableheader">Gross Hours</th>
//             <th className="attendance-tableheader">Log</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map((entry) => (
//             <tr key={entry.date}>
//               <td>{entry.date}</td>
//               {entry.isFutureDate ? (
//                 <td colSpan="6">The details for this date are not available</td>
//               ) : (
//                 <>
//                   <td>{entry.workFromEntity.workFrom}</td>
//                   <td>
//                     {entry.location === "N/A" ? (
//                       "Location not available"
//                     ) : (
//                       <div className="location-details">
//                         <FaLocationDot className="attendance-location-icon" />
//                         {entry.location}
//                       </div>
//                     )}
//                   </td>
//                   {/* <td>{entry.grossHours}</td> */}
//                   <td>{entry.loginDateAndTime}</td>
//                   <td>{entry.logout_date_and_time}</td>
//                   {/* <td>{entry.log}</td> */}
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableForAttendance;


//3rd

// Import necessary dependencies
// import React from "react";

// // Create TableForAttendance component
// const TableForAttendance = ({ attendanceData }) => {
//   return (
//     <table className="attendance-table">
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Logout Time</th>
//           <th>Login Time</th>
//           <th>Current Location</th>
//           <th>Mode of Work</th>
//           <th>Gross Hours</th>
//         </tr>
//       </thead>
//       <tbody>
//         {attendanceData.map((attendance) => (

//           <tr key={attendance.date}>
//             <td>{attendance.date}</td>
//             <td>{attendance.logout_date_and_time}</td>
//             <td>{attendance.loginDateAndTime}</td>
//             <td>{attendance.location}</td>
//             <td>{attendance.workFromEntity.workFrom}</td>
//             <td>{attendance.grossHours}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TableForAttendance;




//4th 

// import React from "react";
// import { FaLocationDot } from "react-icons/fa6";
// import "./TableForAttendance.css";

// const TableForAttendance = ({ attendanceData }) => {
  
//   // Function to calculate gross hours
//   const calculateGrossHours = (logoutTime, loginTime) => {
//     const logoutDateTime = new Date(logoutTime);
//     const loginDateTime = new Date(loginTime);

//     const timeDifference = logoutDateTime - loginDateTime;
//     const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

//     return `${hours}:${String(minutes).padStart(2, '0')}`;
//   };

//   return (
//     <div
//       className="attendance-table-container"
//       style={{ maxHeight: "400px", overflowY: "auto" }}
//     >
//       <table className="attendance-custom-table">
//         <thead>
//           <tr>
//             <th className="attendance-tableheader">Date</th>
//             <th className="attendance-tableheader">Mode of Work</th>
//             <th className="attendance-tableheader">Clock In Location</th>
//             <th className="attendance-tableheader">Clock In Time</th>
//             <th className="attendance-tableheader">Clock Out Time</th>
//             <th className="attendance-tableheader">Gross Hours</th>
//             <th className="attendance-tableheader">Log</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map((entry) => (
//             <tr key={entry.date}>
//               <td>{new Date(entry.loginDateAndTime).toLocaleDateString()}</td>
//               {entry.isFutureDate ? (
//                 <td colSpan="6">The details for this date are not available</td>
//               ) : (
//                 <>
//                   <td>{entry.workFromEntity.workFrom}</td>
//                   <td>
//                     {entry.location === "N/A" ? (
//                       "Location not available"
//                     ) : (
//                       <div className="location-details">
//                         <FaLocationDot className="attendance-location-icon" />
//                         {entry.location}
//                       </div>
//                     )}
//                   </td>
//                   <td>{new Date(entry.loginDateAndTime).toLocaleTimeString([], { timeStyle: 'short' })}</td>
                 
//                   <td>
//                     {entry.logout_date_and_time ? (
//                       new Date(entry.logout_date_and_time).toLocaleTimeString([], { timeStyle: 'short' })
//                     ) : (
//                       "---"
//                     )}
//                   </td>
//                   <td>
//                     {entry.loginDateAndTime && entry.logout_date_and_time ? (
//                       calculateGrossHours(entry.logout_date_and_time, entry.loginDateAndTime)
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                   <td>{entry.log}</td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableForAttendance;


//5th 


import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./TableForAttendance.css";

const TableForAttendance = ({ attendanceData }) => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredData, setFilteredData] = useState([]);
  const [detailsSynced, setDetailsSynced] = useState(true);

  // Function to calculate gross hours
  const calculateGrossHours = (logoutTime, loginTime) => {
    const logoutDateTime = new Date(logoutTime);
    const loginDateTime = new Date(loginTime);

    const timeDifference = logoutDateTime - loginDateTime;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}:${String(minutes).padStart(2, '0')}`;
  };

  useEffect(() => {
    // Filter the attendanceData based on selectedMonth and selectedYear
    const filtered = attendanceData.filter((entry) => {
      const entryDate = new Date(entry.loginDateAndTime);
      const entryMonth = entryDate.toLocaleString("en-US", { month: "long" });
      const entryYear = entryDate.getFullYear();
      return entryMonth === selectedMonth && entryYear === selectedYear;
    });

    setFilteredData(filtered);
    setDetailsSynced(filtered.length > 0); // Set detailsSynced based on the filtered data
  }, [selectedMonth, selectedYear, attendanceData]);

  return (
    <>
    <div className="dropdowns-container">
        <label htmlFor="monthDropdown">Select Month:</label>
        <select
          id="attendance-month-dropdown"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label htmlFor="yearDropdown">Select Year:</label>
        <select
          id="attendance-year-dropdown"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <option key={index} value={new Date().getFullYear() - index}>
              {new Date().getFullYear() - index}
            </option>
          ))}
        </select>
      </div>
    <div className="attendance-table-container" style={{ maxHeight: "400px", overflowY: "auto"}}>
      

      <table className="attendance-custom-table" >
        <thead>
          <tr>
            <th className="attendance-tableheader" style={{textAlign:"center"}}>Date</th>
            <th className="attendance-tableheader" style={{textAlign:"center"}}>Mode of Work</th>
            <th className="attendance-tableheader" style={{textAlign:"center"}}>Clock In Location</th>
            <th className="attendance-tableheader" style={{textAlign:"center"}}>Clock In Time</th>
            <th className="attendance-tableheader" style={{textAlign:"center"}}>Clock Out Time</th>
            <th className="attendance-tableheader" style={{textAlign:"center"}}>Gross Hours</th>
            <th className="attendance-tableheader" style={{textAlign:"center"}}>Log</th>
          </tr>
        </thead>
        <tbody style={{textAlign:"center"}}>
          {detailsSynced ? (
            filteredData.map((entry) => (
              <tr key={entry.date}>
                <td>{new Date(entry.loginDateAndTime).toLocaleDateString()}</td>
                {entry.isFutureDate ? (
                  <td colSpan="6">The details for this date are not available</td>
                ) : (
                  <>
                    <td>{entry.workFromEntity.workFrom}</td>
                    <td>
                      {entry.location === "N/A" ? (
                        "Location not available"
                      ) : (
                        <div className="location-details">
                          
                          <FaLocationDot className="attendance-location-icon" />
                          <p>{entry.location}</p>
                         
                        </div>
                      )}
                    </td>
                    <td>{new Date(entry.loginDateAndTime).toLocaleTimeString([], { timeStyle: 'short' })}</td>
                    <td>
                      {entry.logout_date_and_time ? (
                        new Date(entry.logout_date_and_time).toLocaleTimeString([], { timeStyle: 'short' })
                      ) : (
                        "---"
                      )}
                    </td>
                    <td>
                      {entry.loginDateAndTime && entry.logout_date_and_time ? (
                        calculateGrossHours(entry.logout_date_and_time, entry.loginDateAndTime)
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{entry.log}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Your details are not synced yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  
    </>
  );
};

export default TableForAttendance;



