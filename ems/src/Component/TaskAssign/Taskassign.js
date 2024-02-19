import React, { useState,useEffect } from "react";
import axios from 'axios';
import "./Taskassign.css";
import Swal from "sweetalert2";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useAuth } from "../AuthContext";
const Taskassign = () => {
  const [tasks, setTasks] = useState([]);
  const { empId,jobId,employeeId } = useAuth();
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      const apiUrl = `https://ems-backend-production-3f3d.up.railway.app/findByEmployeeEntityEmpId/${empId}`;
      try {
        const response = await axios.get(apiUrl);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);// Empty dependency array ensures the effect runs only once after initial render
  
  const findManagerById = async (managerId) => {
    try {
      const response = await axios.get(`https://ems-backend-production-3f3d.up.railway.app/findEmployeeById/${managerId}`);
      return response.data.emp_name; // Assuming the manager's name is stored in the 'emp_name' field
    } catch (error) {
      console.error('Error fetching manager details:', error);
      return null;
    }
  };
  const AsyncManagerName = ({ managerId }) => {
    const [managerName, setManagerName] = useState(null);
  
    useEffect(() => {
      const fetchManagerName = async () => {
        const name = await findManagerById(managerId);
        setManagerName(name);
      };
      fetchManagerName();
    }, [managerId]);
  
    return <>{managerName }</>;
  };
 
  const handleStatusChange = (taskId, status) => {
    // If status is empty, set it to "-"
    status = status || "-";
    
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.Id === taskId);
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
      const apiUrl = `https://ems-backend-production-3f3d.up.railway.app/findByEmployeeEntityEmpId/${empId}`;
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
 
  
  const sendEmailAndUpdateStatus = async (taskId, status) => {
    try {
      // Update status via PUT request
      await axios.put(`https://ems-backend-production-3f3d.up.railway.app/changeStatus/${taskId}/${status}`);
  
      // Send email via POST request
      await axios.get(`https://ems-backend-production-3f3d.up.railway.app/sendEmailToManager/${taskId}/${status}`, {
        taskId,
        status,
        recipient: "example@example.com", // Replace with actual recipient email
        subject: "Task Status Update",
        body: `The status of Task 4 has been updated to ${status}.`,
      });
  
      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Email sent successfully and status updated!",
        icon: "success",
        confirmButtonText: "Close",
      });
  
      // Update local state to reflect the new status
      const updatedTasks = tasks.map((task) =>
        task.Id === taskId ? { ...task, status } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to send email or update status. Please try again later.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  
 
  return (
    <div className="Taskassign-Employee-TaskAssign-container">
      <div className="Taskassign-Employee-table-container">
        <table className="Taskassign-Employee-custom-table">
          <thead>
            <tr>
              <th className="Taskassign-Employee-tableheader">Task ID</th>
              <th className="Taskassign-Employee-tableheader">Task</th>
              <th className="Taskassign-Employee-tableheader">Assign By</th>
              <th className="Taskassign-Employee-tableheader">Start Date</th>
              <th className="Taskassign-Employee-tableheader">End Date</th>
              <th className="Taskassign-Employee-tableheader">Priority</th>
              <th className="Taskassign-Employee-tableheader">Status</th>
              <th className="Taskassign-Employee-tableheader">Project%</th>
              <th className="Taskassign-Employee-tableheader">Current</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.Id}>
                <td>{task.taskId}</td>
                <td>{task.taskTitle}</td>
                
                {/* <td>{task.assignedByName}</td>  */}
                {/* <td>{task.assignedBy}</td> */}
                <td>
                  {task.assignedBy && (
                    <AsyncManagerName managerId={task.assignedBy} />
                  )}
                </td>
                <td>{new Date(task.startDate).toLocaleDateString()}</td>
                <td>{new Date(task.endDate).toLocaleDateString()}</td>
                <td>{task.taskPriorityEntity?.priorityLevel || 'N/A'}</td>
                <td>
                <select
  onChange={(event) => handleStatusChange(task.Id, event.target.value)}
  value={task.status}
>
  <option value="">Select Status</option>
  <option value="Plan">Plan</option>
  <option value="Pending">Pending</option>
  <option value="In work">In work</option>
  <option value="Finished">Finished</option>
</select>
                  
                </td>
                
                <td>
                  <div className="Taskassign-Employee-progressCircle-container">
                    <div key={task.id} className="Taskassign-Employee-progressCircle">
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
                <button className="Taskassign-Employee-completedButton" onClick={() => sendEmailAndUpdateStatus(task.Id, task.status)}>Send Email</button>
                {/* <button className="completedButton" onClick={() => sendEmail(task.taskId, task.status)}>Send Email
                
                  
                  </button> */}
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
 