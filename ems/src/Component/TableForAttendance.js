

import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./TableForAttendance.css";
 
export default function TableForAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  // const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [tableContainer, setTableContainer] = useState(null);
 
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
 
  const allMonths = Array.from({ length: 12 }, (_, index) => {
    return new Date(currentYear, index, 1).toLocaleString("en-US", {
      month: "long",
    });
  });
 
  const currentMonthIndex = allMonths.indexOf(currentMonth);
 
  const months = [
    ...allMonths.slice(currentMonthIndex),
    ...allMonths.slice(0, currentMonthIndex),
  ];
 
  const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Set the initial selected month to the current month
 
  const selectedMonthIndex = months.indexOf(selectedMonth);
 
  
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    fetchAttendanceData(selectedMonth, selectedYear);
  };
  const handleTableScroll = () => {
    if (tableContainer) {
      const tableBody = tableContainer.querySelector("tbody");
      const rows = tableBody.querySelectorAll("tr");
      const tableRect = tableContainer.getBoundingClientRect();
      const headerHeight = 40; // Update this value with your actual header height
 
      let visibleMonth = null;
 
      rows.forEach((row) => {
        const rowRect = row.getBoundingClientRect();
 
        if (
          rowRect.top >= tableRect.top + headerHeight &&
          rowRect.bottom <= tableRect.bottom
        ) {
          row.style.opacity = 1;
 
          // Extract the month from the first cell in the row
          const monthMatch = row.querySelector("td").innerText.match(/[a-zA-Z]+/);
          if (monthMatch) {
            visibleMonth = monthMatch[0];
          }
        } else {
          row.style.opacity = 0;
        }
      });
 
      // Update the selected month if a visible month is found
      if (visibleMonth) {
        setSelectedMonth(visibleMonth);
      }
    }
  };
  const fetchAttendanceData = (selectedMonth) => {
    const currentDate = new Date();
    const joiningDate = new Date("2023-09-01"); // Replace with the actual joining date
 
    const currentMonthIndex = months.indexOf(selectedMonth);
 
    const hardcodedResponse = Array.from({ length: months.length }, (_, index) => {
      const monthIndex = (currentMonthIndex + index) % months.length;
      const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
 
      return Array.from({ length: daysInMonth }, (_, dayIndex) => {
        const day = dayIndex + 1;
        const entryDate = new Date(`${months[monthIndex]} ${day}, ${selectedYear}`);
 
        const isFutureDate =
          selectedYear > currentDate.getFullYear() ||
          (selectedYear === currentDate.getFullYear() &&
            (monthIndex > currentMonthIndex ||
              (monthIndex === currentMonthIndex && day > currentDate.getDate())));
 
        const isDateBeforeJoining =
          entryDate < joiningDate &&
          (entryDate.getMonth() < joiningDate.getMonth() ||
            (entryDate.getMonth() === joiningDate.getMonth() && day <= joiningDate.getDate()));
 
        return {
          date: `${months[monthIndex]} ${day}, ${selectedYear}`,
          attendance: isFutureDate || isDateBeforeJoining ? 0 : Math.floor(Math.random() * 100),
          location: isFutureDate || isDateBeforeJoining ? "N/A" : "Office",
          effectiveHours: isFutureDate || isDateBeforeJoining ? 0 : 8,
          grossHours: isFutureDate || isDateBeforeJoining ? 0 : 8,
          arrival: isFutureDate || isDateBeforeJoining ? "N/A" : "09:00 AM",
          log: isFutureDate
            ? "Details for this month are not visible"
            : isDateBeforeJoining
            ? "Details are not available"
            : "Details for the day",
          isFutureDate,
        };
      });
    }).flat();
 
    setAttendanceData(hardcodedResponse);
  };
 
 
 
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchAttendanceData(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);
  const handleMonthButtonClick = (month) => {
    fetchAttendanceData(month, selectedYear); // Fetch data for the selected month and year
    setSelectedMonth(month); // Update selectedMonth state
  };
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchAttendanceData(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);
 
  useEffect(() => {
    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleTableScroll);
    }
 
    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleTableScroll);
      }
    };
  }, [tableContainer]);
 
  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    setSelectedYear(selectedYear);
    fetchAttendanceData(selectedMonth, selectedYear);
  };
 
  const generateYearOptions = () => {
    const years = Array.from(
      { length: currentYear - 2010 + 1 },
      (_, index) => 2010 + index
    );
 
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };
 
 
  const renderRowsForSelectedMonth = () => {
    const currentDate = new Date();
 
    return attendanceData.map((entry) => {
      const entryDate = new Date(entry.date);
      const isFutureDate =
        entryDate > currentDate ||
        (entryDate.getDate() === currentDate.getDate() &&
          entryDate.getMonth() === currentDate.getMonth() &&
          entryDate.getFullYear() === currentDate.getFullYear());
 
      if (entryDate.getMonth() !== selectedMonthIndex) {
        // Hide data for other months
        return null;
      }
 
      return (
        <tr key={entry.date}>
          <td>{entry.date}</td>
          {isFutureDate ? (
            <td colSpan="6">The details for this date are not available</td>
          ) : (
            <>
              <td>
                <ProgressBar animated now={entry.attendance} />
              </td>
              <td>{entry.location}</td>
              <td>{entry.effectiveHours}</td>
              <td>{entry.grossHours}</td>
              <td>{entry.arrival}</td>
              <td>{entry.log}</td>
            </>
          )}
        </tr>
      );
    });
  };

  return (
    <div className="attandance-main-table-month-button">
      <div className="attendance-controls">
        <div className="attendance-month-dropdown-container">
          <label htmlFor="attendance-month-dropdown">Select Month:</label>
          <select
            id="attendance-month-dropdown"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="year-dropdown-container">
          <label htmlFor="attendance-year-dropdown">Select Year:</label>
          <select
            id="attendance-year-dropdown"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {generateYearOptions()}
          </select>
        </div>
      </div>
      <div ref={(ref) => setTableContainer(ref)}
        className="attendance-table-container"
        style={{ maxHeight: "400px", overflowY: "auto"}}>
        <table className="attendance-custom-table">
          <thead>
            <tr>
              <th className="attendance-tableheader">Date</th>
              <th className="attendance-tableheader">Attendance Visual</th>
              <th className="attendance-tableheader">Location</th>
              <th className="attendance-tableheader">Gross Hours</th>
              <th className="attendance-tableheader">Clock In Time</th>
              <th className="attendance-tableheader">Clock Out Time</th>
              <th className="attendance-tableheader">Log</th>
            </tr>
          </thead>
          <tbody>{renderRowsForSelectedMonth()}</tbody>
        </table>
      </div>
    </div>
  );
}