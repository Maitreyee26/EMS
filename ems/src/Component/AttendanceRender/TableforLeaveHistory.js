import React, { useState, useEffect } from "react";
import "./TableforLeaveHistory.css";

export default function TableForLeave() {
  const [leaveData, setLeaveData] = useState([]);
  // Add additional state variables if needed

  // Function to fetch leave data (you can replace it with your API call or data source)
  const fetchLeaveData = () => {
    // Replace this with your data fetching logic
    const dummyLeaveData = [
      {
        date: "2024-01-10",
        type: "Sick Leave",
        status: "Approved",
        requestedBy: "John Doe",
        actionTaken: "2024-01-10",
        leaveNote: "Medical leave",
      },
      // Add more leave entries as needed
    ];
    setLeaveData(dummyLeaveData);
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const renderLeaveRows = () => {
    return leaveData.map((leave) => (
      <tr key={leave.date}>
        <td>{leave.date}</td>
        <td>{leave.type}</td>
        <td>{leave.status}</td>
        <td>{leave.requestedBy}</td>
        <td>{leave.actionTaken}</td>
        <td>{leave.leaveNote}</td>
        {/* Add more columns as needed */}
      </tr>
    ));
  };

  return (
    <div className="leave-table-container">
      <table className="leave-custom-table">
        <thead>
          <tr>
            <th className="leave-table-header">Leave Date</th>
            <th className="leave-table-header">Leave Type</th>
            <th className="leave-table-header">Status</th>
            <th className="leave-table-header">Approved By</th>
            <th className="leave-table-header">Action Taken On</th>
            <th className="leave-table-header">Leave Note</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>{renderLeaveRows()}</tbody>
      </table>
    </div>
  );
}
