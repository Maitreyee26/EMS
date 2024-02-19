import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function YearlyPieCharts({yearNumber}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  // console.log("year ",yearNumber);
  useEffect(() => {
    const fetchData = async () => {
     

      try {
        const currentYear = new Date().getFullYear().toString();
        console.log("year ",typeof(currentYear));
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/filterAttendanceByYear/${currentYear}/1`
        );
        const data = await response.text();
        console.log("leave ",data);
        const [onLeave, lateArrival, onTime] = data.match(/\d+/g).map(Number);

        const updatedChartData = {
          labels: ["On Leave", "Late Arrival", "On Time"],
          datasets: [
            {
                data: [onLeave, lateArrival, onTime],
              backgroundColor: [
                "#d8d4d8",
                "#89b3f1",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgb(255, 159, 64)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
              ],
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

        setChartData(updatedChartData);
        setChartOptions(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="card flex justify-content-center"
      style={{
        height: "250px",
        width: "250px",
        margin: "20px",
        marginLeft: "26px",
      }}
    >
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
