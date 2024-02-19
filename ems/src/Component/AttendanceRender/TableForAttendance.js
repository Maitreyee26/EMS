// //5th

// import React, { useState, useEffect } from "react";
// import { FaLocationDot } from "react-icons/fa6";
// import "./TableForAttendance.css";

// const TableForAttendance = ({ attendanceData, employeeData }) => {
//   const [selectedMonth, setSelectedMonth] = useState("January");
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [filteredData, setFilteredData] = useState([]);
//   const [detailsSynced, setDetailsSynced] = useState(true);

//   // Function to calculate gross hours
//   const calculateGrossHours = (logoutTime, loginTime) => {
//     const logoutDateTime = new Date(logoutTime);
//     const loginDateTime = new Date(loginTime);

//     const timeDifference = logoutDateTime - loginDateTime;
//     const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//     const minutes = Math.floor(
//       (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
//     );

//     return `${hours}:${String(minutes).padStart(2, "0")}`;
//   };
//   console.log("valo ", attendanceData);
//   useEffect(() => {
//     // Filter the attendanceData based on selectedMonth and selectedYear
//     const filtered = attendanceData.filter((entry) => {
//       const entryDate = new Date(entry.loginDateAndTime);
//       const entryMonth = entryDate.toLocaleString("en-US", { month: "long" });
//       const entryYear = entryDate.getFullYear();
//       return entryMonth === selectedMonth && entryYear === selectedYear;
//     });

//     setFilteredData(filtered);
//     setDetailsSynced(filtered.length > 0); // Set detailsSynced based on the filtered data
//   }, [selectedMonth, selectedYear, attendanceData]);

//   return (
//     <>
//       <div className="TableAttendanceHistory-Leave-dropdowns-container">
//         <label htmlFor="monthDropdown">Select Month:</label>
//         <select
//           id="attendance-month-dropdown"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//         >
//           {[
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ].map((month) => (
//             <option key={month} value={month}>
//               {month}
//             </option>
//           ))}
//         </select>

//         <label htmlFor="yearDropdown">Select Year:</label>
//         <select
//           id="attendance-year-dropdown"
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
//         >
//           {Array.from({ length: 15 }, (_, index) => (
//             <option key={index} value={new Date().getFullYear() - index}>
//               {new Date().getFullYear() - index}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div
//         className="TableAttendanceHistory-attendance-table-container"
//         style={{ maxHeight: "400px", overflowY: "auto" }}
//       >
//         <table className="TableAttendanceHistory-attendance-custom-table">
//           <thead>
//             <tr>
//               <th
//                 className="TableAttendanceHistory-attendance-tableheader"
//                 style={{ textAlign: "center" }}
//               >
//                 Date
//               </th>
//               <th
//                 className="TableAttendanceHistory-attendance-tableheader"
//                 style={{ textAlign: "center" }}
//               >
//                 Mode of Work
//               </th>
//               <th
//                 className="TableAttendanceHistory-attendance-tableheader"
//                 style={{ textAlign: "center" }}
//               >
//                 Clock In Location
//               </th>
//               <th
//                 className="TableAttendanceHistory-attendance-tableheader"
//                 style={{ textAlign: "center" }}
//               >
//                 Clock In Time
//               </th>
//               <th
//                 className="TableAttendanceHistory-attendance-tableheader"
//                 style={{ textAlign: "center" }}
//               >
//                 Clock Out Time
//               </th>
//               <th
//                 className="TableAttendanceHistory-attendance-tableheader"
//                 style={{ textAlign: "center" }}
//               >
//                 Gross Hours
//               </th>
//               <th
//                 className="TableAttendanceHistory-attendance-tableheader"
//                 style={{ textAlign: "center" }}
//               >
//                 Log
//               </th>
//               {/* <th
//                 className="TableAttendanceHistory-attendance-tableheader"
//                 style={{ textAlign: "center" }}
//               >
//                 Leave date
//               </th> */}
//             </tr>
//           </thead>
//           <tbody style={{ textAlign: "center" }}>
//             {detailsSynced ? (
//               filteredData.map((entry, index) => (
//                 <tr key={entry.date || index}>
//                   <td>{new Date(entry.loginDateAndTime).toLocaleDateString()}</td>

//                   {entry.isFutureDate ? (
//                     <td colSpan="6">
//                       The details for this date are not available
//                     </td>
//                   ) : (
//                     <>
//                       <td>{entry.workFromEntity.workFrom}</td>
//                       <td>
//                         {entry.location === "N/A" ? (
//                           "Location not available"
//                         ) : (
//                           <div className="TableAttendanceHistory-location-details">
//                             <FaLocationDot className="TableAttendanceHistory-attendance-location-icon" />
//                             <p>{entry.location}</p>
//                           </div>
//                         )}
//                       </td>
//                       <td>
//                         {new Date(entry.loginDateAndTime).toLocaleTimeString(
//                           [],
//                           { timeStyle: "short" }
//                         )}
//                       </td>
//                       <td>
//                         {entry.logout_date_and_time
//                           ? new Date(
//                               entry.logout_date_and_time
//                             ).toLocaleTimeString([], { timeStyle: "short" })
//                           : "---"}
//                       </td>
//                       <td>
//                         {entry.loginDateAndTime && entry.logout_date_and_time
//                           ? // calculateGrossHours(entry.logout_date_and_time, entry.loginDateAndTime)
//                             entry.grossHour
//                           : "---"}
//                       </td>

//                       {/* <td>{employeeData.shift}</td>*/}

//                       <td>{entry.log}</td>
//                       {/* <td>
//                         {entry.leaveDate}
//                       </td> */}
//                     </>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">Your details are not synced yet.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default TableForAttendance;

// actual code

import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./TableForAttendance.css";
import MonthlyAttendancePieChart from "./MonthlyAttendancePieChart";
import YearlyPieCharts from "./YearlyPieCharts";

const TableForAttendance = ({ attendanceData, employeeData }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthNumber, setMonthNumber] = useState(1);
  const [yearNumber, setYearNumber] = useState(new Date().getFullYear());
  const [filteredData, setFilteredData] = useState([]);
  const [detailsSynced, setDetailsSynced] = useState(true);

  const calculateGrossHours = (logoutTime, loginTime) => {
    const logoutDateTime = new Date(logoutTime);
    const loginDateTime = new Date(loginTime);

    const timeDifference = logoutDateTime - loginDateTime;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours}:${String(minutes).padStart(2, "0")}`;
  };

  const getMonthNumber = (monthName) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthNumber = months.indexOf(monthName) + 1;
    return monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
  };

  useEffect(() => {
    setMonthNumber(getMonthNumber(selectedMonth));

    const filtered = attendanceData.filter((entry) => {
      const entryDate = new Date(entry.loginDateAndTime);
      const entryMonth = entryDate.toLocaleString("en-US", { month: "long" });
      const entryYear = entryDate.getFullYear();
      return entryMonth === selectedMonth && entryYear === selectedYear;
    });

    setFilteredData(filtered);
    setDetailsSynced(filtered.length > 0);
  }, [selectedMonth, selectedYear, attendanceData]);

  useEffect(() => {
    setYearNumber(selectedYear);
  }, [selectedYear]);

  return (
    <>
      <div className="TableAttendanceHistory-dropdowns-container">
        <label htmlFor="monthDropdown">Select Month:</label>
        <select
          id="attendance-month-dropdown"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
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
      <div
        className="TableAttendanceHistory-attendance-table-container"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <table className="TableAttendanceHistory-attendance-custom-table">
          <thead>
            <tr>
              <th className="TableAttendanceHistory-attendance-tableheader">Date</th>
              <th className="TableAttendanceHistory-attendance-tableheader">Mode of Work</th>
              <th className="TableAttendanceHistory-attendance-tableheader">Clock In Location</th>
              <th className="TableAttendanceHistory-attendance-tableheader">Clock In Time</th>
              <th className="TableAttendanceHistory-attendance-tableheader">Clock Out Time</th>
              <th className="TableAttendanceHistory-attendance-tableheader">Gross Hours</th>
              <th className="TableAttendanceHistory-attendance-tableheader">Log</th>
            
            </tr>
          </thead>
          <tbody>
            {detailsSynced ? (
              filteredData.map((entry) => (
                <tr key={entry.slno}>
                  <td>
                    {new Date().getUTCDate() +
                      "/" +
                      new Date().getMonth() +
                      "/" +
                      new Date().getFullYear()}
                  </td>
                  {entry.isFutureDate ? (
                    <td colSpan="6">
                      The details for this date are not available
                    </td>
                  ) : (
                    <>
                      <td>
                        {entry.workFromEntity?.workFrom === "Leave"
                          ? "-"
                          : entry.workFromEntity?.workFrom || "N/A"}
                      </td>
                      <td>
                        {entry.location === null ? (
                          "Location not available"
                        ) : (
                          <div className="TableAttendanceHistory-location-details">
                            <FaLocationDot className="TableAttendanceHistory-attendance-location-icon" />
                            <p>{entry.location}</p>
                          </div>
                        )}
                      </td>
                      <td>
                        {entry.workFromEntity?.workFrom === "Leave"
                          ? "-"
                          : entry.loginDateAndTime
                          ? new Date(entry.loginDateAndTime).toLocaleTimeString(
                              [],
                              {
                                timeStyle: "short",
                              }
                            )
                          : "--"}
                      </td>
                      <td>
                        {entry.workFromEntity?.workFrom === "Leave"
                          ? "-"
                          : entry.logout_date_and_time
                          ? new Date(
                              entry.logout_date_and_time
                            ).toLocaleTimeString([], { timeStyle: "short" })
                          : "--"}
                      </td>
                      <td>
                        {entry.workFromEntity?.workFrom === "Leave"
                          ? "-"
                          : entry.grossHour || "--"}
                      </td>
                      <td>{entry.log || "N/A"}</td>
                     
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
      {console.log("month number year number ", monthNumber, yearNumber)}
      <div style={{ display: "none" }}>
        <MonthlyAttendancePieChart monthNumber={monthNumber} />
        <YearlyPieCharts yearNumber={yearNumber} />
      </div>
    </>
  );
};

export default TableForAttendance;
