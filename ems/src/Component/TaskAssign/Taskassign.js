import React, { useState,useEffect } from "react";
import axios from 'axios';
 
import "./Taskassign.css";
import Swal from "sweetalert2";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
 
const Taskassign = () => {
  const [tasks, setTasks] = useState([]);
 
 
  const handleStatusChange = (taskId, status) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);
    updatedTasks[taskIndex].status = status;
 
    // Set percentage based on status
    switch (status) {
      case "-":
        updatedTasks[taskIndex].percentage = "-";
        break;
      case "Plan":
        updatedTasks[taskIndex].percentage = "25";
        break;
      case "Pending":
        updatedTasks[taskIndex].percentage = "50";
        break;
      case "In work":
        updatedTasks[taskIndex].percentage = "75";
        break;
      case "Finished":
        updatedTasks[taskIndex].percentage = "100";
        // Show popup for Finished status
        Swal.fire({
          title: "Task Finished!",
          text: `Task ${taskId} has been marked as Finished.`,
          icon: "success",
          confirmButtonText: "Close",
        });
        break;
      default:
        updatedTasks[taskIndex].percentage = "";
    }
 
    setTasks(updatedTasks);
  };
 
  useEffect(() => {
    // Fetch data from the API
   
    const fetchData = async () => {
      const apiUrl = `http://localhost:8080/findByEmployeeEntityEmpId/1`;
      try {
        const response = await axios.get(apiUrl);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after initial render
 
  const valueToColor = (value) => {
    return value == 100 ? '#4caf50' : value < 100 && value >= 75 ? '#006994' : value < 75 && value >= 50 ? '#ff9800' : value < 50 ? '#f44336' : null;
  };
  const sendEmail = (taskId, status) => {
    const apiUrl = `http://localhost:8080/changeStatus/${taskId}/${status}`;
    axios.post(apiUrl, {
      // Provide any necessary data for sending the email, such as recipient, subject, body, etc.
      // You can pass this data in the request body
      recipient: "example@example.com",
      subject: "Your Email Subject",
      body: "Your Email Body",
    })
 
    .then(response => {
      // Handle success, maybe show a success message to the user
      Swal.fire({
        title: "Success!",
        text: "Email sent successfully!",
        icon: "success",
        confirmButtonText: "Close",
      });
    })
    .catch(error => {
      // Handle error, show error message to the user
      console.error("Error sending email:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to send email. Please try again later.",
        icon: "error",
        confirmButtonText: "Close",
      });
    });
  };
 
 
 
  return (
    <div className="TaskAssign-container">
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th className="tableheader">Task ID</th>
              <th className="tableheader">Task</th>
              <th className="tableheader">Assign By</th>
              <th className="tableheader">Start Date</th>
              <th className="tableheader">End Date</th>
              <th className="tableheader">Priority</th>
              <th className="tableheader">Status</th>
              <th className="tableheader">Project%</th>
              <th className="tableheader">Current</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.Id}>
                <td>{task.taskId}</td>
                <td>{task.taskTitle}</td>
             
                <td>{task.assignedBy}</td>
               
                <td>{new Date(task.startDate).toLocaleDateString()}</td>
                <td>{new Date(task.endDate).toLocaleDateString()}</td>
                <td>{task.taskPriorityEntity?.priorityLevel || 'N/A'}</td>
                <td>
                  <select
                    onChange={(event) => handleStatusChange(task.Id, event.target.value)}
                    value={task.status}
                  >
                    <option value="">-</option>
                    <option value="Plan">Plan</option>
                    <option value="Pending">Pending</option>
                    <option value="In work">In work</option>
                    <option value="Finished">Finished</option>
                  </select>
                </td>
                <td>
                  <div className="progressCircle-container">
                    <div key={task.id} className="progressCircle">
                      <CircularProgressbar
                        value={parseInt(task.percentage, 10) || 0}
                        text={`${task.percentage}%`}
                        styles={buildStyles({
                          pathColor: valueToColor(task.percentage),
                          trailColor: '#d6d6d6',
                          textColor: valueToColor(task.percentage),
                          strokeLinecap: 'round',
                          transition: 'stroke-dashoffset 0.5s ease 0s',
                        })}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <button className="completedButton" onClick={() => sendEmail(task.id, task.status)}>
                    Send Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default Taskassign;