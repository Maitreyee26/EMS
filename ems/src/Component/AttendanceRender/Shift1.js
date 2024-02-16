import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const Shift1 = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const shiftStart = '09:30';
    const shiftEnd = '18:30';
    
    // Convert timings to minutes for calculations
    const shiftStartMinutes = convertToMinutes(shiftStart);
    const shiftEndMinutes = convertToMinutes(shiftEnd);

    // Calculate shift duration and break duration
    const shiftDuration = shiftEndMinutes - shiftStartMinutes;
    const breakDuration = 60; // 1 hour break

   

    const shiftPercentage = ((shiftDuration-breakDuration) / shiftDuration) * 100;
    const breakPercentage = (breakDuration / shiftDuration) * 100;

    const shiftColor = '#d8d4d8';
    const breakColor = '#89b3f1';
    const shiftHoverColor = '#d8d4d8';
    const breakHoverColor = '#89b3f1';
    const shiftBorderColor ='rgb(255, 159, 64)';
    const breakBorderColor='rgb(156, 156, 255)';

    const shiftLabel = `Shift 1 (${shiftStart} - ${shiftEnd})`;
    const breakLabel = `Break (${breakDuration} minutes)`;

    const data = {
      labels: [shiftLabel, breakLabel],
      datasets: [
        {
          data: [shiftPercentage, breakPercentage],
          backgroundColor: [shiftColor, breakColor],
          hoverBackgroundColor: [shiftHoverColor, breakHoverColor],
          borderColor:[shiftBorderColor,breakBorderColor],
          borderWidth: 1
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
  }, []);

  // Function to convert time to minutes
  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  return (
    <div className="card flex justify-content-center" style={{ height: '250px', width: '250px',margin:"20px",marginTop:"30px",marginLeft:"26px"}}>
      <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
    </div>
  
  );
};

export default Shift1;



















