import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function WeeklyAttendancePieChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['On Time', 'Late Arrival', 'On Leave'],
            datasets: [
                {
                    data: [120, 30, 15], // Update with your actual data for on-time, late arrival, and on leave
                    backgroundColor: [
                        '#d8d4d8',
                        '#89b3f1',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ],
                      borderWidth: 1
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card  flex justify-content-center" style={{ height: '250px', width: '250px',margin:"20px",marginLeft:"26px"}}>
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
