
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
 
const Shift = ({ employeeData }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
 
  function extractTimeStrings(timeRange) {
    if (typeof timeRange !== 'string') {
      return ['', '']; // Return default values or handle it according to your needs
    }
 
    const [start, end] = timeRange.split(' - ');
    return [start.trim(), end.trim()];
  }
 
  const timeRange = employeeData.shift;
  const [startTime, endTime] = extractTimeStrings(timeRange);
 
  function convertTo24HourFormat(timeString) {
    if (!timeString) {
      return ''; // Handle the case when timeString is not valid
    }
 
    const [time, period] = timeString.split(/(?=[apm]+)/i);
    const [hours, minutes] = time.split(':').map(Number);
 
    if (isNaN(hours) || isNaN(minutes)) {
      return ''; // Handle the case when hours or minutes are not valid numbers
    }
 
    let hours24 = hours % 12;
    if (period && period.toLowerCase() === 'pm') {
      hours24 += 12;
    }
 
    const hoursString = hours24.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
 
    return `${hoursString}:${minutesString}`;
  }
 
  const newStartTime = convertTo24HourFormat(startTime);
  const newEndtime = convertTo24HourFormat(endTime);
 
  const [hours, minutes] = endTime.split(':');
 
  const numericHours = parseInt(hours, 10);
const numericMinutes = parseInt(minutes, 10);
 
console.log("Numeric Hours:", numericHours);    // Output: 6
console.log("Numeric Minutes:", numericMinutes); // Output: 30
 
const actualEndTime = (numericHours+12) *60 +numericMinutes;
console.log("actualEndTime",actualEndTime);
 
const [Shours, Sminutes] = endTime.split(':');
 
const SnumericHours = parseInt(Shours, 10);
const SnumericMinutes = parseInt(Sminutes, 10);
 
console.log("Numeric Hours:", SnumericHours);    // Output: 6
console.log("Numeric Minutes:", SnumericMinutes); // Output: 30
 
const actualStartTime = (SnumericHours) *60 + SnumericMinutes;
console.log("actualstartTime",actualStartTime);
 
   console.log("newshift ",newStartTime,newEndtime);
  useEffect(() => {
    if (!newStartTime || !newEndtime) {
      return; // Handle the case when start or end time is not valid
    }
 
    const shiftDuration = actualEndTime - actualStartTime;
    const breakDuration = 60; // 1 hour break
 
    console.log(shiftDuration);
    const shiftPercentage = ((shiftDuration - breakDuration) / shiftDuration) * 100;
    const breakPercentage = (breakDuration / shiftDuration) * 100;
 
    const shiftColor = '#d8d4d8';
    const breakColor = '#89b3f1';
    const shiftHoverColor = '#d8d4d8';
    const breakHoverColor = '#89b3f1';
    const shiftBorderColor = 'rgb(255, 159, 64)';
    const breakBorderColor = 'rgb(156, 156, 255)';
 
    const shiftLabel = `Shift 1 (${newStartTime} - ${newEndtime})`;
    const breakLabel = `Break (${breakDuration} minutes)`;
 
    const data = {
      labels: [shiftLabel, breakLabel],
      datasets: [
        {
          data: [shiftPercentage, breakPercentage],
          backgroundColor: [shiftColor, breakColor],
          hoverBackgroundColor: [shiftHoverColor, breakHoverColor],
          borderColor: [shiftBorderColor, breakBorderColor],
          borderWidth: 1,
        },
      ],
    };
 
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };
 
    setChartData(data);
    setChartOptions(options);
  }, [newStartTime, newEndtime]);
 
  return (
    <div className="card flex justify-content-center" style={{ height: '250px', width: '250px', margin: "20px", marginLeft: "26px", marginTop: "30px" }}>
      <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
    </div>
  );
};
 
export default Shift;
 
 
 