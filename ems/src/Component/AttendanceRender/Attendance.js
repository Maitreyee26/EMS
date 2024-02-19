import React, { useState, useEffect } from "react";
import Select from "react-select";
import YearlyPieCharts from "./YearlyPieCharts.js";
import MonthlyAttendancePieChart from "./MonthlyAttendancePieChart";
// import ProgressBar from "react-bootstrap/ProgressBar";
import "./Attendance.css";

import Shift from "./Shift.js";
import DigitalClock from "./DigitalClock";
import TableForAttendance from "./TableForAttendance";
import LeavePopup from "../Popup-screens/LeavePopup.js";
import LabelComponent from "../LabelComponentRen/LabelComponent.js";
import LocationForAttendance from "./LocationForAttendance";
import { FaLocationDot } from "react-icons/fa6";
import { useAuth } from "../AuthContext.js";
import axios from "axios";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [Log, setLog] = useState("");
  const [currentDateGrossHours, setCurrentDateGrossHours] = useState(0);
  const [selectedShiftComponent, setSelectedShiftComponent] = useState(null);
  const [isRequestingLeave, setIsRequestingLeave] = useState(false);
  const [showLocationComponent, setShowLocationComponent] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [error, setError] = useState(null);
  const{empId}=useAuth();
  const [selectedStat, setSelectedStat] = useState({
    value: "Monthly",
    label: "Monthly Attendance Stats",
  });
  const [selectedShift, setSelectedShift] = useState(null);
  const [defaultSelectedDay, setDefaultSelectedDay] = useState(
    new Date().getDay()
  );
  // const [selectedMode, setSelectedMode] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [timerRef, setTimerRef] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimateStartTime, setEstimateStartTime] = useState(null);
  const [estimateElapsedTime, setEstimateElapsedTime] = useState(0);
  const [selectedMode, setSelectedMode] = useState("");
  const [clockStatus, setClockStatus] = useState("Clock In");

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

  const extractShiftStartTime = (shiftTimeString) => {
    const startTimeMatch = shiftTimeString.match(/(\d{1,2}:\d{2}[APMapm]+)/); // Extract time portion
    if (startTimeMatch) {
      const formattedTime = startTimeMatch[0];
      return formattedTime; // Return the extracted time
    }
    return null; // Handle error or return a default value
  };
  // console.log(extractShiftStartTime("9:30am - 6:30pm"));
  const subtractTimes = (time1, time2) => {
    const date1 = new Date(`2022-01-01T${time1}`);
    const date2 = new Date(`2022-01-01T${time2}`);

    const differenceInMilliseconds = date1 - date2;

    // Convert the difference to your desired format
    const resultHours = Math.floor(differenceInMilliseconds / 3600000);
    const resultMinutes = Math.floor(
      (differenceInMilliseconds % 3600000) / 60000
    );

    return `${resultHours}:${String(resultMinutes).padStart(2, "0")}`;
  };

  const extractTimeAmPm = (timestamp) => {
    const dateObject = new Date(timestamp);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes}${
      hours >= 12 ? "pm" : "am"
    }`;
    return formattedTime;
  };
  // console.log(subtractTimes(extractShiftStartTime("9:30am - 6:30pm"),extractTimeAndAmPm("2024-01-27 18:59:09.145767")));

  // console.log(extractTimeAndAmPm("2024-01-27 18:59:09.145767"));
  // const handleLocationChange = (location) => {
  //   // Handle the location change if needed in the parent component
  //   console.log("Location changed:", location);
  // };

  const fetchAttendanceData = (empId) => {
    fetch(
      `https://ems-backend-production-3f3d.up.railway.app/getAttendanceOfEmp/${empId}`
    )
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
  useEffect(() => {
    fetchAttendanceData(1);

    // ... (other useEffect logic)
  }, []);
  console.log("all attendance ", attendanceData);
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
    fetchEmployeeData(1);

    // ... (other useEffect logic)
  }, []);

  console.log(employeeData.shift);
  //  const shift = employeeData.shift;

  const handleModeChange = (selectedOption) => {
    setSelectedMode(selectedOption.value);

    if (selectedOption.value && !startTime && clockStatus === "Clock In") {
      setStartTime(new Date().getTime());
      setEstimateStartTime(new Date().getTime());
      setShowLocationComponent(true);
    } else if (!selectedOption.value && startTime) {
      setStartTime(null);
      setEstimateStartTime(null);
      setEndTime(null);
      setShowLocationComponent(false);
    }
  };

  const calculateGrossHours = () => {
    if (startTime) {
      const currentTime = endTime || new Date().getTime();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

      return formatTime(elapsedSeconds);
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
      setEndTime(null);
      setStartTime(new Date().getTime());
      setEstimateStartTime(new Date().getTime());
      setShowLocationComponent(true);

      // Start the timer only when the Clock In button is clicked
      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsedSeconds);
      }, 1000);

      setTimerRef(timer);

      setClockStatus("Clock Out");
      // Call clockIn function directly
      clockIn(selectedMode);

      updateGrossHoursForCurrentDate(0);
      // Cookies.set("clockStatus", "Clock Out");
      // Cookies.set("startTime", startTime.toString());
    } 
    else {
      // If clocking out, set the end time
      setEndTime(new Date().getTime());
      setShowLocationComponent(false);

      // Clear the timer when clocking out
      clearInterval(timerRef);
      setTimerRef(null);
      setClockStatus("Clock In");

      // Call clockOut function directly
      clockOut();
      updateGrossHoursForCurrentDate(calculateGrossHours());
      setCurrentDateGrossHours(calculateGrossHours());
      // Remove data from cookies on clock out
      // Cookies.set("clockStatus", "Clock In");
      // Cookies.remove("startTime");

    }

  };
  // const updateGrossHoursForCurrentDate = (grossHours) => {
  //   setCurrentDateGrossHours(grossHours);
 
  //   // Store gross hours in cookies
  //   Cookies.set('grossHours', grossHours);
  // };

  useEffect(() => {
    fetchAttendanceData(1);

    // ... (other useEffect logic)
  }, []);

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
      setError("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    // const storedStatus = Cookies.get("clockStatus");
    // if (storedStatus) {
    //   setClockStatus(storedStatus);
    // }

    // Retrieve other necessary data...
    // const storedGrossHours = Cookies.get("grossHours");
    // if (storedGrossHours) {
    //   setCurrentDateGrossHours(storedGrossHours);
    // }

    // // Retrieve start time from sessionStorage
    // const storedStartTime = sessionStorage.getItem("startTime");
    // if (storedStartTime) {
    //   setStartTime(parseInt(storedStartTime));
    // }
    // Fetch the current location when the component mounts
    getLocation();
  }, []);

  const updateGrossHoursForCurrentDate = (grossHours) => {
    setCurrentDateGrossHours(grossHours);
  };

  // const compareTimes = (time1, time2) => {
  //   // Convert time strings to comparable format
  //   const date1 = new Date(`2022-01-01T${time1}`);
  //   const date2 = new Date(`2022-01-01T${time2}`);

  //   // Compare dates
  //   if (date1 < date2) {
  //     return -1; // time1 is earlier
  //   } else if (date1 > date2) {
  //     return 1; // time1 is later
  //   } else {
  //     return 0; // times are equal
  //   }
  // };

  // function parseTime(time) {
  //   const [timePart, ampm] = time.split(' ');
  //   const [hours, minutes] = timePart.split(':').map(Number);

  //   return [hours, minutes, ampm];
  // }
  //  const logindata = attendanceData.loginDateAndTime;
  //  console.log("new login ",attendanceData.loginDateAndTime );

  const clockIn = (selectedMode) => {
    console.log("Selected Mode:", selectedMode);

    const modeInt = parseInt(selectedMode, 10);
    const shiftStartTimeString = employeeData.shift;
    const shiftStartTime = extractShiftStartTime(shiftStartTimeString);
    // console.log(shiftStartTime);
    // const loginTime = extractTimeAmPm(attendanceData.loginDateAndTime);
    // console.log(attendanceData.loginDateAndTime);
    // console.log(loginTime);

    // const loginTime = extractedData.slice(-1);
    const extractedData = attendanceData.map((entry) => {
      const loginTime = extractTimeAmPm(entry.loginDateAndTime);
      //  console.log("hii ",loginTime);
      return loginTime;
    });
    console.log(extractedData[extractedData.length - 1]);
    const loginTime = extractedData[extractedData.length - 1];

    function compareArrivalTimes(
      expectedArrivalTimeString,
      actualArrivalTimeString
    ) {
      // Function to convert string to time
      function convertStringToTime(timeString) {
        const [time, period] = timeString
          .split(/([0-9:]+)([aApPmM]{2})/)
          .filter(Boolean);
        const [hours, minutes] = time.split(":").map(Number);
        const adjustedHours =
          period.toLowerCase() === "pm" && hours !== 12 ? hours + 12 : hours;
        const currentDate = new Date();
        return new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          adjustedHours,
          minutes
        );
      }

      // Convert expected and actual arrival times to Date objects
      const expectedArrivalTime = convertStringToTime(
        expectedArrivalTimeString
      );
      const actualArrivalTime = convertStringToTime(actualArrivalTimeString);

      // Check if actual arrival time is on time or late
      // const isOnTime = actualArrivalTime <= expectedArrivalTime;

      // Return the result
      return {
        expectedArrivalTime,
        actualArrivalTime,
        // isOnTime,
      };
    }

    // Example usage
    const comparisonResult = compareArrivalTimes(shiftStartTime, loginTime);
    if (
      comparisonResult.actualArrivalTime <= comparisonResult.expectedArrivalTime
    ) {
      console.log("User clocked in On time");
      fetch(
        `https://ems-backend-production-3f3d.up.railway.app/addAttendance/${empId}/${currentLocation}/${modeInt}/On%20Time`, // Directly set the value "On Time"
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
          return response.text();
        })
        .then((data) => {
          console.log("Clock-in successful", data);
          setClockStatus("Clock Out");
          fetchAttendanceData(1);
        })
        .catch((error) => {
          console.error("Error during clock-in:", error.message);
        });
    } else {
      console.log("User had a Late Arrival");
      fetch(
        `https://ems-backend-production-3f3d.up.railway.app/addAttendance/${empId}/${currentLocation}/${modeInt}/Late%20Arrival`, // Directly set the value "Late arrival"
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
          return response.text();
        })
        .then((data) => {
          console.log("Clock-in successful", data);
          setClockStatus("Clock Out");
          fetchAttendanceData(1);
        })
        .catch((error) => {
          console.error("Error during clock-in:", error.message);
        });
    }
    console.log("Clock In Clicked");
  };

  const clockOut = () => {
    // const grossHours = clockStatus === "Clock In" ? 0 : calculateGrossHours();
    const grossHours = calculateGrossHours();
    // Assuming loginDateAndTime is the time when the employee clocked in
    const loginDateAndTime = startTime;

    fetch(
      `https://ems-backend-production-3f3d.up.railway.app/addLogoutDateAndTime/${empId}/${grossHours}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logout_date_and_time: endTime,
          loginDateAndTime: loginDateAndTime,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Clock-out successful", data);
        setClockStatus("Clock In");

        fetchAttendanceData(1);

        if (clockStatus !== "Clock In") {
          updateGrossHoursForCurrentDate(grossHours);
        }
      })
      .catch((error) => {
        console.error("Error during clock-out:", error);
      });
    console.log("Clock Out Clicked");
  };

  // useEffect(() => {
  //   fetchAttendanceData(1); // Replace 1 with the actual employee ID

  //   // ... (other useEffect logic)
  // }, []);

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
    { value: "yearly", label: "Yearly Attendance Stats" },
    { value: "Monthly", label: "Monthly Attendance Stats" },
  ];

  useEffect(() => {}, []);

  const handleStatChange = (selectedOption) => {
    setSelectedStat(selectedOption);
  };

  // const handleShift1 = () => {
  //   setSelectedShiftComponent(
  //     <Shift1
  //       style={{
  //         height: "250px",
  //         width: "250px",
  //         margin: "20px",
  //         marginLeft: "26px",
  //       }}
  //     />
  //   );
  // };

  const handleShift = (day) => {
    // Set the selected shift component based on the day
    setSelectedShiftComponent(
      <Shift
        employeeData={employeeData}
        style={{
          height: "250px",
          width: "250px",
          margin: "20px",
          marginLeft: "26px",
        }}
      />
    );
  };
  // setDefaultSelectedDay( new Date().getDay());
  useEffect(() => {
    // Set the default day and trigger the handleShift function
    const defaultDay = new Date().getDay();
    setDefaultSelectedDay(defaultDay);
    handleShift(defaultDay);
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleSaveLeaveDetails = () => {
    console.log("Saving Leave Details", leaveDetails);
    setLeaveDetails({
      startDate: "",
      endDate: "",
      reason: "",
    });
    setIsRequestingLeave(false);
  };

  // useEffect(() => {
  //   const defaultDayButton = document.getElementById(
  //     `shift${defaultSelectedDay}`
  //   );
  //   if (defaultDayButton) {
  //     defaultDayButton.click();
  //     defaultDayButton.classList.add("selected-day"); // Add a class for selected day
  //   }
  //   console.log("defaultSelectedDay ",defaultSelectedDay);
  // }, [defaultSelectedDay]);

  return (
    <div className="Attendance-attendance-main-div">
      <div className="Attendance-attendance-clockin">
        <div className="Attendance-attendance-stats-container">
          <label className="Attendance-attandence-headings">
            Attendance Stats
          </label>
          <Select
            options={stats}
            value={selectedStat}
            onChange={handleStatChange}
            className="Attendance-attendance-stats-dropdown"
          />

          {selectedStat?.value === "yearly" && <YearlyPieCharts />}
          {selectedStat?.value === "Monthly" && <MonthlyAttendancePieChart />}
        </div>
        <div className="Attendance-timming">
          <label className="Attendance-attandence-headings">
            Attendance Timing
          </label>
          <div className="Attendance-attendance-shift-buttons">
            <button
              id="shift1"
              className={`Attendance-shiftdays ${
                defaultSelectedDay === 1 ? "Attendance-selected-day" : ""
              }`}
              onClick={handleShift}
            >
              Mon
            </button>
            <button
              id="shift2"
              className={`Attendance-shiftdays ${
                defaultSelectedDay === 2 ? "Attendance-selected-day" : ""
              }`}
              onClick={handleShift}
            >
              Tue
            </button>
            <button
              id="shift3"
              className={`Attendance-shiftdays ${
                defaultSelectedDay === 3 ? "Attendance-selected-day" : ""
              }`}
              onClick={handleShift}
            >
              Wed
            </button>
            <button
              id="shift4"
              className={`Attendance-shiftdays ${
                defaultSelectedDay === 4 ? "Attendance-selected-day" : ""
              }`}
              onClick={handleShift}
            >
              Thu
            </button>
            <button
              id="shift5"
              className={`Attendance-shiftdays ${
                defaultSelectedDay === 5 ? "Attendance-selected-day" : ""
              }`}
              onClick={handleShift}
            >
              Fri
            </button>
            <button id="shift6" className="Attendance-shiftdays" disabled>
              Sat
            </button>
            <button id="shift7" className="Attendance-shiftdays" disabled>
              Sun
            </button>
          </div>
          {/* {selectedShiftComponent} */}
          <Shift
            style={{
              height: "250px",
              width: "250px",
              margin: "20px",
              marginLeft: "26px",
            }}
          />
        </div>

        <div className="Attendance-clock-in-buttons">
          <label className="Attendance-attandence-headings">
            Attendance Actions
          </label>
          <div className="Attendance-clock-for-clockin">
            <DigitalClock />
          </div>
          <div className="Attendance-h-o-r">
            <LabelComponent
              inputType="select"
              options={modes}
              value={selectedMode}
              onChange={(selectedOption) => handleModeChange(selectedOption)}
              style={{ width: "100px" }}
            />

            <div
              className="Attendance-location-details"
              onMouseEnter={() => setShowLocationComponent(true)}
              onMouseLeave={() => setShowLocationComponent(false)}
            >
              <FaLocationDot className="Attendance-attendance-location-icon" />
              {showLocationComponent && clockStatus === "Clock Out" && (
                <LocationForAttendance />
              )}
            </div>
          </div>

          <div className="Attendance-estimate-gross">
            <p>
              Gross Hours: <br />
              {calculateGrossHours()}
            </p>
            <button
              id="clock-button"
              className="Attendance-clockin-clockout-button"
              onClick={handleClockButtonClick}
            >
              {clockStatus}
            </button>
          </div>
        </div>
      </div>
      <div
        className="Attendance-attandance-table"
        style={{ marginTop: "50px" }}
      >
        <TableForAttendance
          attendanceData={attendanceData}
          employeeData={employeeData}
        />
      </div>
    </div>
  );
};

export default Attendance;
