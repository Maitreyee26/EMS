// import React, { useState, useEffect } from "react";
// import "./TableforLeaveHistory.css";

// export default function TableForLeave({leavehistoryData}) {
 
//   // Add additional state variables if needed

//   // Function to fetch leave data (you can replace it with your API call or data source)
//   const { leaveData } = leavehistoryData;

//   const renderLeaveRows = () => {
//     return leaveData.map((leave) => (
//       <tr key={leave.date}>
//         <td>{leave.date}</td>
//         <td>{leave.type}</td>
//         <td>{leave.status}</td>
//         <td>{leave.requestedBy}</td>
//         <td>{leave.actionTaken}</td>
//         <td>{leave.leaveNote}</td>
//         {/* Add more columns as needed */}
//       </tr>
//     ));
//   };

//   return (
//     <div className="TableLeaveHistory-leave-table-container">
//       <table className="TableLeaveHistory-leave-custom-table">
//         <thead>
//           <tr>
//             <th className="TableLeaveHistory-leave-table-header">Leave Date</th>
//             <th className="TableLeaveHistory-leave-table-header">Leave Type</th>
//             <th className="TableLeaveHistory-leave-table-header">Status</th>
//             <th className="TableLeaveHistory-leave-table-header">Approved By</th>
//             <th className="TableLeaveHistory-leave-table-header">Action Taken On</th>
//             <th className="TableLeaveHistory-leave-table-header">Leave Note</th>
//             {/* Add more headers as needed */}
//           </tr>
//         </thead>
//         <tbody>{renderLeaveRows()}</tbody>
//       </table>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./TableforLeaveHistory.css";
import { useAuth } from "../AuthContext";
const TableForLeave = ({ leavehistoryData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [newfilteredData, setnewFilteredData] = useState([]);
  const [detailsSynced, setDetailsSynced] = useState(true);

  const [managerData, setManagerData] = useState(null);
  const { empId } = useAuth();

  useEffect(() => {
    const fetchReportingManager = async () => {
      try {
        const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/findReportingManager/${empId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const manager = await response.json();

        // Assuming the API returns JSON data, update the state with the fetched data
        setManagerData(manager);
      } catch (error) {
        console.error("Error fetching reporting manager:", error.message);
        // Handle errors, e.g., show an error message to the user
      }
    };

    // Call the function to fetch reporting manager when the component mounts or when empId changes
    fetchReportingManager();
  }, []); // Add empId to the dependency array if you want to update the data when empId changes
  // console.log("manager details ",managerData.emp_name);
  useEffect(() => {
    if (Array.isArray(leavehistoryData)) {
      setFilteredData(leavehistoryData);
      setDetailsSynced(leavehistoryData.length > 0);
    } else {
      setFilteredData(leavehistoryData);
      setDetailsSynced(false);
    }
    setnewFilteredData(managerData)
  }, [leavehistoryData]);
  // {managerData ? managerData.emp_name : "Unknown"}
  const renderLeaveRows = () => {
    return detailsSynced ? (
      filteredData.map((leave, index) => (
        <tr key={leave.date || index}>
          <td>{leave.startDate}</td>
          <td>{leave.endDate}</td>
          <td>{leave.leaveTypeEntity.leaveType}</td>
          <td>{leave.status}</td>
          <td>{managerData.emp_name}</td>
          <td>{new Date(leave.appliedOn).toLocaleDateString()}</td>
          <td>{leave.reason}</td>
          {/* Add more columns as needed */}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7">Leave details are not available.</td>
      </tr>
    );
  };

  return (
    <div className="TableLeaveHistory-leave-table-container">
      <table className="TableLeaveHistory-leave-custom-table">
        <thead>
          <tr>
            <th className="TableLeaveHistory-leave-table-header">Start Date</th>
            <th className="TableLeaveHistory-leave-table-header">End Date</th>
            <th className="TableLeaveHistory-leave-table-header">Leave Type</th>
            <th className="TableLeaveHistory-leave-table-header">Status</th>
            <th className="TableLeaveHistory-leave-table-header">Approved/Rejected By</th>
            <th className="TableLeaveHistory-leave-table-header">Action Taken On</th>
            <th className="TableLeaveHistory-leave-table-header">Leave Note</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>{renderLeaveRows()}</tbody>
      </table>
    </div>
  );
};

export default TableForLeave;
