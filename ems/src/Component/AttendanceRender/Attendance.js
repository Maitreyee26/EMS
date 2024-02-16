import React, { useState, useEffect } from "react";
import Select from "react-select";
import WeeklyAttendancePieChart from "./WeeklyAttendancePieChart";
import MonthlyAttendancePieChart from "./MonthlyAttendancePieChart";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Attendance.css";
import Shift1 from "./Shift1";
import Shift2 from "./Shift2";
import DigitalClock from "./DigitalClock";
import TableForAttendance from "./TableForAttendance";
import LeavePopup from "../Popup-screens/LeavePopup.js";
import LabelComponent from "../LabelComponentRen/LabelComponent.js";
import LocationForAttendance from "./LocationForAttendance";
import { FaLocationDot } from "react-icons/fa6";
import { useAuth } from "../AuthContext";
// import { Tooltip } from "react-tooltip";
import axios from "axios";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDateGrossHours, setCurrentDateGrossHours] = useState(0);
  const [selectedShiftComponent, setSelectedShiftComponent] = useState(null);
  const [isRequestingLeave, setIsRequestingLeave] = useState(false);
  const [showLocationComponent, setShowLocationComponent] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [error, setError] = useState(null); 
  const [selectedStat, setSelectedStat] = useState({
    value: "Monthly",
    label: "Monthly Attendance Stats",
  });
  const [selectedShift, setSelectedShift] = useState(null);
  const [defaultSelectedDay, setDefaultSelectedDay] = useState(
    new Date().getDay()
  );
  // const [selectedMode, setSelectedMode] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimateStartTime, setEstimateStartTime] = useState(null);
  const [estimateElapsedTime, setEstimateElapsedTime] = useState(0);
  const [selectedMode, setSelectedMode] = useState("");
  const [clockStatus, setClockStatus] = useState("Clock In");
  const { empId } = useAuth();
  const [leaveDetails, setLeaveDetails] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const modes = [
    { value: "", label: "Mode of Work" },
    { value: "1", label: "Work From Office" },
    { value: "2", label: "Work From Home" },
    { value: "3", label: "Remote Clock In" },
  ];
  // console.log(modes);

console.log(empId);
  const handleLocationChange = (location) => {
    // Handle the location change if needed in the parent component
    console.log("Location changed:", location);
  };

  const fetchAttendanceData = (empId) => {
    fetch(`http://localhost:8080/getAttendanceOfEmp/${empId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Attendance Data:", data);
        setAttendanceData(data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error.message);
      });
  };

  const handleModeChange = (selectedOption) => {
    // const selectedMode = selectedOption.value;
    setSelectedMode(selectedOption.value);

    console.log(selectedOption.value);
    if (selectedOption.value && !startTime) {
      setStartTime(new Date().getTime());
      setEstimateStartTime(new Date().getTime());
      setShowLocationComponent(true); // Show location component when mode is selected
    } else if (!selectedOption.value && startTime) {
      setStartTime(null);
      setEstimateStartTime(null);
      setEndTime(null);
      setShowLocationComponent(false); // Hide location component when mode is not selected
    }
  };

  const calculateGrossHours = () => {
    if (startTime && !endTime) {
      // If still running, display "In Progress"

      return "In Progress";
    } else if (startTime && endTime) {
      const grossHoursInSeconds = Math.floor((endTime - startTime) / 1000);

      return formatTime(grossHoursInSeconds);
    }

    return "00:00:00";
  };
  const handleClockButtonClick = () => {
    console.log("Selected Mode:", selectedMode);

    // Check if the clock status is already in the desired state
    if (
      (clockStatus === "Clock In" && !startTime) ||
      (clockStatus === "Clock Out" && endTime)
    ) {
      return;
    }

    if (clockStatus === "Clock In") {
      setEndTime(null); // Reset end time when clocking in
      setStartTime(new Date().getTime());
      setEstimateStartTime(new Date().getTime());
      setShowLocationComponent(true); // Show location component when clocking in
      setClockStatus("Clock Out");
      // Call clockIn function directly
      clockIn(selectedMode);

      updateGrossHoursForCurrentDate(0);
    } else {
      // If clocking out, set the end time
      setEndTime(new Date().getTime());
      setShowLocationComponent(false); // Hide location component when clocking out
      setClockStatus("Clock In");

      // Call clockOut function directly
      clockOut();
      updateGrossHoursForCurrentDate(calculateGrossHours());
      setCurrentDateGrossHours(calculateGrossHours());
    }
  };
  // const handleLocationChange = (location) => {
  //   setCurrentLocation(location);
  // };

  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;

  //         // Set the current location in the state
  //         setCurrentLocation(`${latitude},${longitude}`);
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //         // Handle errors if any
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //     // Handle the case when geolocation is not supported
  //   }
  // };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
  
            // Get the location name using the Nominatim API
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`;
  
            const response = await axios.get(apiUrl);
            const address = response.data.display_name;
  
            // Set the current location in the state
            setCurrentLocation(address);
          } catch (error) {
            setError(`Error getting location: ${error.message}`);
          }
        },
        (error) => {
          setError(`Error getting location: ${error.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };
  

  useEffect(() => {
    // Fetch the current location when the component mounts
    getLocation();
  }, []);

  const updateGrossHoursForCurrentDate = (grossHours) => {
    setCurrentDateGrossHours(grossHours);
  };

  const clockIn = (selectedMode) => {
    console.log("Selected Mode:", selectedMode);

    const modeInt = parseInt(selectedMode, 10);

    if (!isNaN(modeInt)) {
      // Use the selected mode when making the API call
      fetch(
        `http://localhost:8080/addAttendance/${empId}/${currentLocation}/${modeInt}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginDateAndTime: startTime,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} - ${response.statusText}`
            );
          }
          return response.text(); // Change to response.text() if the server sends plain text
        })
        .then((data) => {
          console.log("Clock-in successful", data);
          setClockStatus("Clock Out");

          fetchAttendanceData(empId);
        })
        .catch((error) => {
          console.error("Error during clock-in:", error.message);
        });
      console.log("Clock In Clicked");
    } else {
      console.error("Invalid mode selected");
    }
  };

  const clockOut = () => {
    fetch(`http://localhost:8080/addLogoutDateAndTime/${empId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logout_date_and_time: endTime,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.text(); // Change to response.text() to handle plain text
      })
      .then((data) => {
        console.log("Clock-out successful", data);
        setClockStatus("Clock In");

        fetchAttendanceData(empId) ;
        updateGrossHoursForCurrentDate(calculateGrossHours());
      })
      .catch((error) => {
        console.error("Error during clock-out:", error);
      });
    console.log("Clock Out Clicked");
  };
  useEffect(() => {
    fetchAttendanceData(empId); // Replace 1 with the actual employee ID
    // ... (other useEffect logic)
  }, []);

  const handleLeaveInputChange = (field, value) => {
    setLeaveDetails({
      ...leaveDetails,
      [field]: value,
    });
  };

  const handleRequestLeave = () => {
    console.log("Requesting Leave", leaveDetails);
    // Add logic to handle the leave request (e.g., API call, state update)
    setIsRequestingLeave(false);
  };

  const handleCancelLeave = () => {
    // Handle cancel leave logic here
    setIsRequestingLeave(false);
  };

  useEffect(() => {
    let timer;

    if (startTime) {
      timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTimeInSeconds = Math.floor(
          (currentTime - startTime) / 1000
        );
        setElapsedTime(elapsedTimeInSeconds);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [startTime]);

  useEffect(() => {
    let estimateTimer;

    if (estimateStartTime) {
      estimateTimer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedEstimateTimeInSeconds = Math.floor(
          (currentTime - estimateStartTime) / 1000
        );
        setEstimateElapsedTime(elapsedEstimateTimeInSeconds);
      }, 1000);
    }

    return () => {
      clearInterval(estimateTimer);
    };
  }, [estimateStartTime]);

  const handleModeClick = (mode) => {
    if (selectedMode === mode) {
      setEndTime(new Date().getTime());
      setSelectedMode(null);
      setEstimateStartTime(null);
    } else {
      if (selectedMode) {
        setEndTime(new Date().getTime());
        setSelectedMode(null);
        setEstimateStartTime(null);
      } else {
        setSelectedMode(mode);
        setStartTime(new Date().getTime());
        setEstimateStartTime(new Date().getTime());
      }
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const stats = [
    { value: "Weekly", label: "Yearly Attendance Stats" },
    { value: "Monthly", label: "Monthly Attendance Stats" },
  ];

 

  useEffect(() => {
   
  }, []);

  const handleStatChange = (selectedOption) => {
    setSelectedStat(selectedOption);
   
  };

  const handleShift1 = () => {
    setSelectedShiftComponent(
      <Shift1
        style={{
          height: "250px",
          width: "250px",
          margin: "20px",
          marginLeft: "26px",
        }}
      />
    );
  };

  const handleShift2 = () => {
    setSelectedShiftComponent(
      <Shift2
        style={{
          height: "250px",
          width: "250px",
          margin: "20px",
          marginLeft: "26px",
        }}
      />
    );
  };

  useEffect(() => {
    const defaultDayButton = document.getElementById(
      `shift${defaultSelectedDay}`
    );
    if (defaultDayButton) {
      defaultDayButton.click();
    }
  }, [defaultSelectedDay]);

  const handleSaveLeaveDetails = () => {
    console.log("Saving Leave Details", leaveDetails);
    setLeaveDetails({
      startDate: "",
      endDate: "",
      reason: "",
    });
    setIsRequestingLeave(false);
  };

  useEffect(() => {
    const defaultDayButton = document.getElementById(
      `shift${defaultSelectedDay}`
    );
    if (defaultDayButton) {
      defaultDayButton.click();
      defaultDayButton.classList.add("selected-day"); // Add a class for selected day
    }
  }, [defaultSelectedDay]);

  return (
    <div className="attendance-main-div">
      <div className="attendance-clockin">
        <div className="attendance-stats-container">
          <label className="attandence-headings">Attendance Stats</label>
          <Select
            options={stats}
            value={selectedStat}
            onChange={handleStatChange}
            className="attendance-stats-dropdown"
          />
          {selectedStat?.value === "Weekly" && <WeeklyAttendancePieChart />}
          {selectedStat?.value === "Monthly" && <MonthlyAttendancePieChart />}
        </div>
        <div className="timming">
          <label className="attandence-headings">Attendance Timing</label>
          <div className="attendance-shift-buttons">
            <button
              id="shift1"
              className={`shiftdays ${
                defaultSelectedDay === 1 ? "selected-day" : ""
              }`}
              onClick={handleShift1}
            >
              Mon
            </button>
            <button
              id="shift2"
              className={`shiftdays ${
                defaultSelectedDay === 2 ? "selected-day" : ""
              }`}
              onClick={handleShift2}
            >
              Tue
            </button>
            <button
              id="shift3"
              className={`shiftdays ${
                defaultSelectedDay === 3 ? "selected-day" : ""
              }`}
              onClick={handleShift1}
            >
              Wed
            </button>
            <button
              id="shift4"
              className={`shiftdays ${
                defaultSelectedDay === 4 ? "selected-day" : ""
              }`}
              onClick={handleShift2}
            >
              Thu
            </button>
            <button
              id="shift5"
              className={`shiftdays ${
                defaultSelectedDay === 5 ? "selected-day" : ""
              }`}
              onClick={handleShift1}
            >
              Fri
            </button>
            <button id="shift6" className="shiftdays" disabled>
              Sat
            </button>
            <button id="shift7" className="shiftdays" disabled>
              Sun
            </button>
          </div>
          {selectedShiftComponent}
        </div>

        <div className="clock-in-buttons">
          <label className="attandence-headings">Attendance Actions</label>
          <div className="clock-for-clockin">
            <DigitalClock />
          </div>
          <div className="h-o-r">
            <LabelComponent
              inputType="select"
              options={modes}
              value={selectedMode}
              onChange={(selectedOption) => handleModeChange(selectedOption)}
              style={{ width: "100px" }}
            />

            <div
              className="location-details"
              onMouseEnter={() => setShowLocationComponent(true)}
              onMouseLeave={() => setShowLocationComponent(false)}
            >
              <FaLocationDot className="attendance-location-icon" />
              {showLocationComponent && clockStatus === "Clock Out" && (
                <LocationForAttendance />
              )}
            </div>
          </div>

          <div className="estimate-gross">
            <p>
              Gross Hours: <br />
              {calculateGrossHours()}
            </p>
            <button
              id="clock-button"
              className="clockin-clockout-button"
              onClick={handleClockButtonClick}
            >
              {clockStatus}
            </button>
          </div>
        </div>
      </div>
      <div className="attandance-table" style={{marginTop:"50px"}}>
        <TableForAttendance
        attendanceData={attendanceData}
        
        />
      </div>
    </div>
  );
};

export default Attendance;


