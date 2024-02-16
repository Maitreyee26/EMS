import React, { useState, useEffect,useRef } from "react";
import "./Calender.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import axios from "axios";
import { Messages } from "primereact/messages";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [isFloater, setIsFloater] = useState(false);
  const [holidays, setHolidays] = useState({});
  const messagesRef = useRef(null);
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const nextYear = currentYear + 1;

  //   // Calculate the minimum and maximum dates for the input field
  //   const minDate = new Date(currentYear, 0, 1); // January 1st of the current year
  //   const maxDate = new Date(nextYear, 0, 0); // December 31st of the current year

  //   // Function to format the date to 'YYYY-MM-DD' format
  //   const formatDate = (date) => {
  //     return date.toISOString().split('T')[0];
  //   };

  // Function to check if a given date is a Sunday or Saturday
  const isWeekend = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };
  // const handleDayClick = (day) => {
  //   const newSelectedDates = [...selectedDates];
  //   const index = newSelectedDates.findIndex(
  //     (date) => date.getTime() === day.date.getTime()
  //   );

  //   if (index === -1) {
  //     newSelectedDates.push(day.date);
  //   } else {
  //     newSelectedDates.splice(index, 1);
  //   }

  //   setSelectedDates(newSelectedDates);
  // };
  const handleDayClick = (day) => {
    const newSelectedDates = [...selectedDates];
    const index = newSelectedDates.findIndex(
      (date) => date.getTime() === day.date.getTime()
    );

    // Check if the selected day is a holiday
    const isHoliday = holidays[formatDate(day.date)];
    // Check if the selected day is a Sunday (dayIndex === 0) or Saturday (dayIndex === 6)
    const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;

    if (isHoliday) {
      alert("This date is already a holiday.");
      return; // Prevent further execution of the function
    }

    if (isWeekend) {
      alert("This date is a Sunday or Saturday.");
      return; // Prevent further execution of the function
    }

    if (index === -1) {
      newSelectedDates.push(day.date);
    } else {
      newSelectedDates.splice(index, 1);
    }

    setSelectedDates(newSelectedDates);
  };
  // const getHolidayTitle = (day, holidays) => {

  //   // const holidayTitles = Object.values(holidays).map(obj => Object.values(obj)[0]);
  //   const holidayTitles = Object.values(holidays).map(obj => obj[Object.keys(obj)[0]]);
  //   //console.log("titles",day !== null ? holidayTitles.find(title => title !== "") || "" : "");
  //   const result = day !== null ? (holidayTitles.find(title => title !== "") || "") : "";
  //   console.log("result", typeof(result));
  //   return result;

  // };

  //   const holidayTitles = Object.values(holidays).map(obj => obj[Object.keys(obj)[0]]);
  //   console.log("holidayTitles:",holidays);

  //   const result = day !== null ? (holidayTitles.find(title => title !== "") || "") : "";
  //   if (typeof result === 'object' && result.name) {
  //     console.log("Result:", result.name);
  //     return result.name;
  // } else {
  //     console.log("Result is empty or not an object with a name property.");
  //     return "";
  // }

  //   const getHolidayTitle = (day, holidays) => {
  //   if (!day) return ""; // If day is null or undefined, return an empty string

  //   const allHolidays = Object.values(holidays).flatMap(obj => obj);
  //   const matchingHoliday = allHolidays.find(holiday => {
  //       const holidayDate = holiday.date;
  //       console.log("holidayDate", holidayDate);
  //       const dayDate = day.date;
  //       return holidayDate === dayDate;
  //   });
  //     console.log("Result:oooo", allHolidays);
  //     if (matchingHoliday && matchingHoliday.name) {
  //         console.log("Result:", matchingHoliday.name);
  //         return matchingHoliday.name;
  //     } else {
  //         console.log("No holiday found for the given date.");
  //         return "";
  //     }
  // };
  // const getClassNames = (day, dayIndex, holidays) => {
  //   let classNames = day === null ? "empty-cell" : "";

  //   if (day !== null) {
  //     const isHoliday = holidays[formatDate(day.date)];
  //     const isFirstColumn = dayIndex === 0;
  //     const isLastColumn = dayIndex === 6;

  //     if (isHoliday) {
  //       classNames += " holiday-cell";
  //       if (isFloatingHoliday(day.date)) {
  //         classNames += " floating-holiday-cell";
  //       }
  //     }

  //     if (isFirstColumn || isLastColumn) {
  //       classNames += " light-yellow-cell";
  //     }
  //   }

  //   return classNames;
  // };

  // const getClassNames = (day, dayIndex, holidays) => {
  //   let classNames = day === null ? "empty-cell" : "";
  //  console.log("hi",holidays);
  //   if (day !== null) {
  //     // const isHoliday = holidays[formatDate(day.date)];
  //     const isFirstColumn = dayIndex === 0;
  //     const isLastColumn = dayIndex === 6;

  //     if (holidays.holiday_type === false) { // Check if holiday_type is true
  //       classNames += " holiday-cell";
  //       console.log(holidays.holiday_type)
  //       if (isFloatingHoliday(day.date)) {
  //         classNames += " floating-holiday-cell";
  //       }
  //     }

  //     if (isFirstColumn || isLastColumn) {
  //       classNames += " light-yellow-cell";
  //     }
  //   }

  //   return classNames;
  // };
  const [holidayDate, setHolidayDate] = useState("");
  const [holidayName, setHolidayName] = useState("");
  const [message, setMessage] = useState(null);
  const messageRef = useRef(null);

  const handleAddHoliday = async () => {
    try {
      if (!holidayName) {
        console.error("Holiday name is required.");
        messagesRef.current.show({ severity: 'error', summary: '', detail:"Holiday name is required.", life: 3000 });
        return; // Exit the function early
      }
      
      const response = await fetch("http://localhost:8080/addHoliday", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: holidayDate,
          name: holidayName,
          holiday_type: isFloater,
        }),
      });

      if (response.ok) {
        // Display success message
        messagesRef.current.show({ severity: 'success', summary: 'Success', detail: 'Holiday added successfully', life: 3000 });
      } else {
        console.error("Failed to add holiday");
      }
    } catch (error) {
      console.error("Error adding holiday:", error.message);
      messagesRef.current.show({ severity: 'error', summary: '', detail:error.message, life: 3000 });
    }
  };
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch("http://localhost:8080/findAllHolidays");
        if (response.ok) {
          const holidaysData = await response.json();
          setHolidays(holidaysData);
        } else {
          console.error("Failed to fetch holidays");
        }
      } catch (error) {
        console.error("Error fetching holidays:", error.message);
      }
    };

    fetchHolidays();
  }, []);
  useEffect(() => {
    const allHolidays = calculateHolidaysForYear(holidays);
    // Use allHolidays for further processing, e.g., rendering the calendar
    console.log(allHolidays);
  }, [holidays]);
  // const isFloatingHoliday = (date) => {
  //   const dayOfMonth = date.getDate();
  //   return dayOfMonth === 1 || dayOfMonth === 15;
  // };

  const calculateHolidaysForYear = (holidays) => {
    if (typeof holidays !== "object" || holidays === null) {
      console.error("holidaysData is not an object");
      return { trueHolidays: {}, falseHolidays: {} };
    }

    const trueHolidays = {};
    const falseHolidays = {};

    for (const date in holidays) {
      const holiday = holidays[date];
      if (holiday.holiday_type === "true") {
        trueHolidays[date] = { date: holiday.date, name: holiday.name };
      } else if (holiday.holiday_type === "false") {
        falseHolidays[date] = { date: holiday.date, name: holiday.name };
      }
    }
    console.log("Dates where holiday_type is true:", holidays);
    console.log("Dates where holiday_type is false:", falseHolidays);

    return { trueHolidays, falseHolidays };
  };
  useEffect(() => {
    const allHolidays = calculateHolidaysForYear(holidays);
    // Use allHolidays for further processing, e.g., rendering the calendar
    console.log("hi", allHolidays);
  }, [holidays]);

  const getHolidayTitle = (day, holidays) => {
    console.log("holidays", holidays);
    // Initialize holidayName with an empty string
    let holidayName = "";
    if (day === null) {
      return "";
    }
    // Get an array of the values of the holidays object
    const allHolidays = Object.values(holidays);
    // Find the first holiday that matches the day date
    const matchingHoliday = allHolidays.find((holiday) => {
      const holidayDate = holiday.date;
      console.log(".......holidayDate", holidayDate);
      const dayDate = formatDate(day.date);
      console.log("daydate", dayDate);
      // Use strict equality comparison
      return holidayDate === dayDate;
    });
    // If a matching holiday is found, assign its name to holidayName and return it
    if (matchingHoliday) {
      holidayName = matchingHoliday.name;
      return holidayName;
    }
    // If no matching holiday is found, return an empty string
    return holidayName;
  };

  const getClassNames = (day, dayIndex, allHolidays) => {
    let classNames = day === null ? "empty-cell" : "";

    if (day !== null) {
      const isFirstColumn = dayIndex === 0;
      const isLastColumn = dayIndex === 6;

      const formattedDate = formatDate(day.date);

      // Check in falseHolidays
      for (const date in allHolidays.falseHolidays) {
        const holiday = allHolidays.falseHolidays[date];
        if (holiday.date === formattedDate) {
          classNames += " holiday-cell";

          break;
        }
        if (isFirstColumn || isLastColumn) {
          classNames += " light-yellow-cell";
        }
      }

      // Check in trueHolidays
      for (const date in allHolidays.trueHolidays) {
        const holiday = allHolidays.trueHolidays[date];
        if (holiday.date === formattedDate) {
          classNames += " floating-holiday-cell";
          break;
        }
      }

      if (isFirstColumn || isLastColumn) {
        classNames += " light-yellow-cell";
      }
    }

    return classNames;
  };

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const getCurrentMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalWeeks = Math.ceil((firstDayOfMonth + daysInMonth) / 7);

    const monthData = [];

    let dayCounter = 1;

    for (let i = 0; i < totalWeeks; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          week.push(null);
        } else {
          const currentDate = new Date(year, month, dayCounter);
          week.push({ day: dayCounter++, date: currentDate });
        }
      }
      monthData.push(week);
    }

    return monthData;
  };

  const handlePrevMonth = () => {
    const previousMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    setCurrentDate(previousMonthDate);
  };

  const handleNextMonth = () => {
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const lastMonthOfCurrentYear = new Date(new Date().getFullYear(), 11, 1);

    if (nextMonthDate <= lastMonthOfCurrentYear) {
      setCurrentDate(nextMonthDate);
    }
  };

  const renderCalendarHeader = () => (
    <tr>
      <th>
        <IoIosArrowDropleftCircle
          className="calender-button"
          onClick={handlePrevMonth}
        />
      </th>
      <th colSpan="5">
        {new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
        }).format(currentDate)}
      </th>
      <th className="calender-arrow-icon">
        <IoIosArrowDroprightCircle
          className="calender-button"
          onClick={handleNextMonth}
        />
      </th>
    </tr>
  );

  const renderCalendarRows = () => {
    const monthData = getCurrentMonthData();

    const year = currentDate.getFullYear();
    const allHolidays = {
      ...calculateHolidaysForYear(holidays),
    };

    return monthData.map((week, weekIndex) => (
      <tr key={weekIndex}>
        {week.map((day, dayIndex) => (
          <td
            key={dayIndex}
            className={getClassNames(day, dayIndex, allHolidays)}
            title={getHolidayTitle(day, holidays)}
            onClick={() => handleDayClick(day)} // Call handleDayClick when a day is clicked
          >
            {day !== null ? (
              <span>
                {day.day}
                {allHolidays[formatDate(day.date)] && (
                  <span className="holiday-text">
                    {/* {allHolidays[formatDate(day.date)]} */}
                    {allHolidays[formatDate(day.date)].name}
                  </span>
                )}
              </span>
            ) : (
              ""
            )}
          </td>
        ))}
      </tr>
    ));
  };

  const formatDate = (date) => {
    return date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
      : "";
  };

  return (
    <div className="calendar-container">
      <h2 className="feed-container-header">Holiday Calendar</h2>
      <table className="calendar-table">
        <thead>
          {renderCalendarHeader()}
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendarRows()}</tbody>
      </table>

      <div className="add-holiday-form">
        <div className="calender-date-floater">
          {/* <input
          type="date"
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
          required
        /> */}
          <input
            type="date"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
            onFocus={(e) => {
              const selectedDate = new Date(e.target.value);
              const dayOfWeek = selectedDate.getDay();
              // Disable Sundays (0) and Saturdays (6)
              if (dayOfWeek === 0 || dayOfWeek === 6) {
                e.target.value = ""; // Clear the input value
              }
            }}
            required
          />
          <select
            value={isFloater}
            onChange={(e) => setIsFloater(e.target.value)}
          >
          <option value=""disabled>Select Type of Holiday</option>
            <option value={false}>Not a Floater</option>
            <option value={true}>Floater</option>
          </select>
        </div>
        <div className="holidy-name-input-button">
          <input
            type="text"
            placeholder="Holiday Name"
            value={holidayName}
            onChange={(e) => setHolidayName(e.target.value)}
            required
          />

          <button className="add-holiday-button" onClick={handleAddHoliday}>
            Add Holiday
          </button>
        
        </div>
        <Messages ref={messagesRef} className="calender-primereact-message" />
      </div>
    </div>
  );
};

export default Calendar;
