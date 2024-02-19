import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useAuth } from "../AuthContext";
export default function MonthlyAttendancePieChart({monthNumber}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("");
  const [error, setError] = useState(null);
  // console.log("month ",monthNumber);
  const { empId } = useAuth();
  useEffect(() => {
    // console.log("month ",typeof(monthNumber));

    const getCurrentMonth = () => {
      const currentDate = new Date();
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      return currentMonth;
    };
    
    const fetchData = async () => {
      try {
        // var month =   parseInt(monthNumber, 10);
        
        const currentMonth = getCurrentMonth();
        console.log("month ",(currentMonth));
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/filterAttendanceByMonth/${currentMonth}/${empId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.text();
        console.log("monthly attendance ", data);

        const [onLeave, lateArrival, onTime] = data.match(/\d+/g).map(Number);

        const updatedChartData = {
          labels: ["On Time", "Late Arrival", "On Leave"],
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [monthNumber]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      className="card  flex justify-content-center"
      style={{ height: "250px", width: "250px", margin: "20px", marginLeft: "26px" }}
    >
      <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
    </div>
  );
}
