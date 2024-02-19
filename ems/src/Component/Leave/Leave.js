

// Leave.js
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import LeavePopup from "../Popup-screens/LeavePopup.js";
import "./Leave.css";
import TableforLeaveHistory from "./TableforLeaveHistory";
// import ApproveReject from "./ApproveReject.js";
import { HiInformationCircle } from "react-icons/hi";
import { useAuth } from "../AuthContext";
const Leave = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const { empId } = useAuth();
 
  const fetchEmployeeData = (empId) => {
    fetch(
      `https://ems-backend-production-3f3d.up.railway.app/findEmployeeById/${empId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json(); // Assuming the response is JSON
      })
      .then((data) => {
        console.log("Employee Data:", data);
        setEmployeeData(data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error.message);
      });
  };
  useEffect(() => {
    fetchEmployeeData(empId);
 
    // ... (other useEffect logic)
  }, []);
 
  const options = [
    { value: "", label: "Leave Type" },
    { value: "Sick Leave", label: "Sick Leave" },
    { value: "Floater Leave", label: "Floater Leave" },
    { value: "Casual Leave", label: "Casual Leave" },
  ];
 
  const [isRequestingLeave, setIsRequestingLeave] = useState(false);
 
  const [leaveDetails, setLeaveDetails] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    notes: "",
    halfDayStartDate: "",
    halfDayEndDate: "",
    notify: "", // Assuming you have a notify field
  });
 
  const handleLeaveInputChange = (field, value) => {
    setLeaveDetails({
      ...leaveDetails,
      [field]: value,
    });
  };
 
  // Add a state variable to control the visibility of the LeavePopup
  const [isLeavePopupVisible, setIsLeavePopupVisible] = useState(false);
 
  const [leavehistoryData, setLeavehistoryData] = useState([]);
  const [error, setError] = useState(null);
  const [remLeaves, setRemLeaves] = useState("");
 
  // ...
 
  useEffect(() => {
    const fetchLeaveBalances = async () => {
      try {
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/findAllBalances/${empId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "text/plain", // Set content type to text/plain
            },
          }
        );
 
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
 
        const data = await response.text();
        const leaveLines = data.split("\n");
        const leaveData = {};
 
        leaveLines.forEach((line) => {
          const [leaveType, leaveValue] = line.split(" : ");
          leaveData[leaveType.trim()] = parseFloat(leaveValue.trim());
        });
 
        setRemLeaves(leaveData);
      } catch (error) {
        setError(`Error fetching leave balances: ${error.message}`);
      }
    };
 
    fetchLeaveBalances();
  }, []);
 
  // ...
 
  console.log("rem leave ", remLeaves);
 
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/findLeaveByEmpId/${empId}`
        ); //emp id
 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
 
        const leaveData = await response.json();
        setLeavehistoryData(leaveData);
      } catch (error) {
        console.error("Error fetching leave data:", error.message);
      }
    };
 
    fetchLeaveData();
  }, []);
 
  // console.log(leavehistoryData);
  const handleRequestLeave = () => {
    // ... (existing code)
 
    // Close the LeavePopup after handling the leave request
    setIsLeavePopupVisible(true);
  };
 
  const [lastSlNo, setLastSlNo] = useState(null);
 
  // useEffect(() => {
  //   const fetchLeaveData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://ems-backend-production-3f3d.up.railway.app/findLeaveByEmpId/1"
  //       );
  //       const data = await response.json();
 
  //       if (data && data.length > 0) {
  //         // Assuming the data is sorted by 'slno' in descending order
  //         const pendingData = data.filter((item) => item.status === "Pending");
 
  //         if (pendingData.length > 0) {
  //           const latestPendingItem = pendingData[pendingData.length - 1].slno;
  //           setLastSlNo(latestPendingItem);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching leave data:", error);
  //     }
  //   };
 
  //   fetchLeaveData();
  // }, []);
 
  //total
 
  const [totalLeaves, setTotalLeaves] = useState(null);
  // const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchTotalLeaves = async () => {
      try {
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/getTotalLeavesOfAnEmp/${empId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // You might need additional headers depending on your backend requirements
            },
          }
        );
 
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
 
        const data = await response.json();
        setTotalLeaves(data);
      } catch (error) {
        setError(`Error fetching total leaves: ${error.message}`);
      }
    };
 
    fetchTotalLeaves();
  }, []); // Empty dependency array means this effect will only run once when the component mounts
 
  // console.log("total leaves ",totalLeaves);
 
  //consumed
 
  const remainingLeaves = {
    floaterLeave:
      (totalLeaves?.floaterLeave || 0) - (remLeaves?.["Floater Leave"] || 0),
    maternityLeave:
      (totalLeaves?.maternityLeave || 0) -
      (remLeaves?.["Maternity Leave"] || 0),
    paternityLeave:
      (totalLeaves?.paternityLeave || 0) -
      (remLeaves?.["Paternity Leave"] || 0),
    sickLeave: (totalLeaves?.sickLeave || 0) - (remLeaves?.["Sick Leave"] || 0),
    unpaidLeave:
      (totalLeaves?.unpaidLeave || 0) - (remLeaves?.["Unpaid Leave"] || 0),
    casualLeave:
      (totalLeaves?.casualLeave || 0) - (remLeaves?.["Casual Leave"] || 0),
  };
 
  console.log("consumed ", remainingLeaves);
 
  let leaveLabel = [];
  let total = [];
  let rems = [];
  let cons = [];
 
  if (
    employeeData.materialStatus === "Married" &&
    employeeData.gender === "Male"
  ) {
    leaveLabel = [" Floater", "Paternity", "Sick     ", "Casual   "];
    total = [
      totalLeaves?.floaterLeave || 0,
      totalLeaves?.paternityLeave || 0,
      totalLeaves?.sickLeave || 0,
      // totalLeaves?.unpaidLeave || 0,
      totalLeaves?.casualLeave || 0,
    ];
    rems = [
      remLeaves?.["Floater Leave"] || 0,
      remLeaves?.["Paternity Leave"] || 0,
      remLeaves?.["Sick Leave"] || 0,
      // remLeaves?.["Unpaid Leave"] || 0,
      remLeaves?.["Casual Leave"] || 0,
    ];
    cons = [
      remainingLeaves.floaterLeave,
      remainingLeaves.paternityLeave,
      remainingLeaves.sickLeave,
      remainingLeaves.unpaidLeave,
      remainingLeaves.casualLeave,
    ];
  } else if (
    employeeData.materialStatus === "Married" &&
    employeeData.gender === "Female"
  ) {
    leaveLabel = [" Floater", "Paternity", "Sick     ", "Casual   "];
    total = [
      totalLeaves?.floaterLeave || 0,
      totalLeaves?.maternityLeave || 0,
      totalLeaves?.sickLeave || 0,
      // totalLeaves?.unpaidLeave || 0,
      totalLeaves?.casualLeave || 0,
    ];
    rems = [
      remLeaves?.["Floater Leave"] || 0,
      remLeaves?.["Maternity Leave"] || 0,
      remLeaves?.["Sick Leave"] || 0,
      // remLeaves?.["Unpaid Leave"] || 0,
      remLeaves?.["Casual Leave"] || 0,
    ];
    cons = [
      remainingLeaves.floaterLeave,
      remainingLeaves.maternityLeave,
      remainingLeaves.sickLeave,
      remainingLeaves.unpaidLeave,
      remainingLeaves.casualLeave,
    ];
  } else if (
    employeeData.materialStatus === "Unmarried" &&
    employeeData.gender === "Male"
  ) {
    leaveLabel = ["Floater    ", "Sick ", "Casual  "];
    total = [
      totalLeaves?.floaterLeave || 0,
      totalLeaves?.sickLeave || 0,
      // totalLeaves?.unpaidLeave || 0,
      totalLeaves?.casualLeave || 0,
    ];
    rems = [
      remLeaves?.["Floater Leave"] || 0,
 
      remLeaves?.["Sick Leave"] || 0,
      // remLeaves?.["Unpaid Leave"] || 0,
      remLeaves?.["Casual Leave"] || 0,
    ];
    cons = [
      remainingLeaves.floaterLeave,
 
      remainingLeaves.sickLeave,
      remainingLeaves.unpaidLeave,
      remainingLeaves.casualLeave,
    ];
  } else if (
    employeeData.materialStatus === "Unmarried" &&
    employeeData.gender === "Female"
  ) {
    leaveLabel = ["Floater", "Sick", "Casual"];
    total = [
      totalLeaves?.floaterLeave || 0,
 
      totalLeaves?.sickLeave || 0,
      // totalLeaves?.unpaidLeave || 0,
      totalLeaves?.casualLeave || 0,
    ];
    rems = [
      remLeaves?.["Floater Leave"] || 0,
 
      remLeaves?.["Sick Leave"] || 0,
      // remLeaves?.["Unpaid Leave"] || 0,
      remLeaves?.["Casual Leave"] || 0,
    ];
    cons = [
      remainingLeaves.floaterLeave,
 
      remainingLeaves.sickLeave,
      remainingLeaves.unpaidLeave,
      remainingLeaves.casualLeave,
    ];
  }
 
  const totalLeaveChartData = {
    labels: leaveLabel,
    datasets: [
      {
        data:
          //[ totalLeaves?.floaterLeave || 0,
          // totalLeaves?.maternityLeave || 0,
          // totalLeaves?.paternityLeave || 0,
          // totalLeaves?.sickLeave || 0,
          // // totalLeaves?.unpaidLeave || 0,
          // totalLeaves?.casualLeave || 0,]
          total,
        backgroundColor: [
          "#d8d4d8",
          "#89b3f1",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(255, 206, 86)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };
 
  //remaiing
 
  const remLeaveChartData = {
    labels: leaveLabel,
    datasets: [
      {
        data:
          //[   remLeaves?.["Floater Leave"] || 0,
          // remLeaves?.["Maternity Leave"] || 0,
          // remLeaves?.["Paternity Leave"] || 0,
          // remLeaves?.["Sick Leave"] || 0,
          // // remLeaves?.["Unpaid Leave"] || 0,
          // remLeaves?.["Casual Leave"] || 0,]
 
          rems,
        backgroundColor: [
          "#d8d4d8",
          "#89b3f1",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(255, 206, 86)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };
  //consumed
 
  const conLeaveChartData = {
    labels: leaveLabel,
    datasets: [
      {
        // data: [
        //   remainingLeaves.floaterLeave,
        //   remainingLeaves.maternityLeave,
        //   remainingLeaves.paternityLeave,
        //   remainingLeaves.sickLeave,
        //   remainingLeaves.unpaidLeave,
        //   remainingLeaves.casualLeave,
        // ],
        data: cons,
        backgroundColor: [
          "#d8d4d8",
          "#89b3f1",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(255, 206, 86)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };
 
  const [isHovered, setIsHovered] = useState(false);
 
  const handleMouseEnter = (e) => {
    e.preventDefault();
    setIsHovered(true);
  };
 
  const handleMouseLeave = (e) => {
    e.preventDefault();
    setIsHovered(false);
  };
 
  return (
    <>
      <div className="Leave-leave-page">
        <div className="Leave-leave-request-button-section">
          <div className="Leave-i-icon">
            <HiInformationCircle
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer" }}
            />
            {isHovered && (
              <span className="Leave-hover-text">
                Unpaid Leave balance is infinite
              </span>
            )}
          </div>
          <button
            className="Leave-leave"
            onClick={() => {
              setIsRequestingLeave(true);
             
              setIsLeavePopupVisible(true)
            }}
          >
            Request Leave
          </button>
 
          {isRequestingLeave && (
            <LeavePopup
              startDate={leaveDetails.startDate}
              endDate={leaveDetails.endDate}
              leaveType={leaveDetails.leaveType}
              notes={leaveDetails.notes}
              handleStartDateChange={(value) =>
                handleLeaveInputChange("startDate", value)
              }
              handleEndDateChange={(value) =>
                handleLeaveInputChange("endDate", value)
              }
              handleLeaveTypeChange={(value) =>
                handleLeaveInputChange("leaveType", value)
              }
              handlenotes={(value) => handleLeaveInputChange("notes", value)}
              handleRequestLeave={handleRequestLeave} // Pass the new handler to close the popup
              handleCancel={() => {
                setIsRequestingLeave(false);
                setIsLeavePopupVisible(false); // Close the LeavePopup on cancel
              }}
              halfDayStartDate={leaveDetails.halfDayStartDate}
              handleHalfDayStartDateChange={(value) =>
                handleLeaveInputChange("halfDayStartDate", value)
              }
              halfDayEndDate={leaveDetails.halfDayEndDate}
              handleHalfDayEndDateChange={(value) =>
                handleLeaveInputChange("halfDayEndDate", value)
              }
              notify={leaveDetails.notify}
              handleNotifyChange={(value) =>
                handleLeaveInputChange("notify", value)
              }
              options={options}
            />
          )}
        </div>
 
        <div className="Leave-leave-upper-section">
          <div className="Leave-chart-container Leave-chart-for-leave">
            <label className="Leave-Leave-headings">
              Remaining Leave Balances
            </label>
            <Chart
              // className="Leave-chart-content"
              type="pie"
              data={remLeaveChartData}
              style={{ height: "250px", width: "250px" }}
            />
          </div>
 
          <div className="Leave-consumed-leave Leave-chart-for-consumed-leave">
            <label className="Leave-Leave-headings">Consumed Leaves</label>
            <Chart
              type="pie"
              data={conLeaveChartData}
              style={{ height: "250px", width: "250px" }}
            />
          </div>
 
          <div className="Leave-chart-for-total-leave">
            <label className="Leave-Leave-headings">Total Leaves</label>
            <Chart
              type="pie"
              data={totalLeaveChartData}
              style={{ height: "250px", width: "250px" }}
            />
          </div>
        </div>
 
        <div className="Leave-table-for-leave-history">
          <TableforLeaveHistory leavehistoryData={leavehistoryData} />
        </div>
      </div>
      {console.log("ar ", lastSlNo)}
      {/* <div style={{ display: "none" }}>
        {lastSlNo && <ApproveReject leaveId={lastSlNo} />}
      </div> */}
    </>
  );
};
 
export default Leave;


