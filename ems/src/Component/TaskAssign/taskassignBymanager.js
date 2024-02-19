import React, { useState, useEffect } from "react";
import "./taskassignBymanager.css";
import { RiSearchLine } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from 'axios';
import { useAuth } from '../AuthContext';
export default function TaskAssignByManager() {
  const [searchResults, setSearchResults] = useState([]);
  const [showNoRecordsMessage, setShowNoRecordsMessage] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [keyword, setKeyword] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const { empId,jobId,employeeId } = useAuth();
  const [priorities, setPriorities] = useState(["High", "Medium", "Low"]);
  const [taskId, setTaskId] = useState("");
  const [selectedPriorityId, setSelectedPriorityId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    taskTitle: "",
    //assignedBy: "",
    startDate: "",
    endDate: "",
    priority: "",
    // assignedBy: "", // Dynamically set based on user selection
    //Assign To
    employeeEntity: {
      empId: "" // Dynamically set based on user selection
    },
    taskPriorityEntity: {
      taskPriorityId: ""
    },
  });
  
 
  const [newTask, setNewTask] = useState({
    taskTitle: "",
        //assignedBy: "",
        startDate: "",
        endDate: "",
        employeeEntity: {
          empId: empId // Reset the employee ID field
        },
        taskPriorityEntity: {
          taskPriorityId:"" },
    
  });
 
  const handleAssign = async () => {
    try {
      const response = await axios.post(`https://ems-backend-production-3f3d.up.railway.app/addTask`, {
        taskTitle: newTask.taskTitle,
        // assignedBy: newTask.assignedBy,
        startDate: newTask.startDate,
        endDate: newTask.endDate,
        employeeEntity: {
          empId: empId
        },
        taskPriorityEntity: {
          priorityId: 1,
          priorityLevel: newTask.Priority
        }
      });
      console.log(response.data); // Assuming the response contains the newly created task
      alert("Task assigned successfully!");
      // Reset the form fields after successful assignment
      setNewTask({
        taskTitle: "",
        assignedBy: "",
        startDate: "",
        endDate: "",
        Priority: ""
      });
      fetchTasks(); // Refresh the task list after assignment
    } catch (error) {
      console.error("Error assigning task:", error.message);
      alert("Failed to assign task. Please try again.");
    }
  };
 
  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = searchResults.find(task => task.taskId === taskId);
    setEditedTask({ ...taskToEdit });
  };
 
  const handleChange = (fieldName, value) => {
    setEditedTask({
      ...editedTask,
      [fieldName]: value
    });
  };
 
 
  const handleSave = async (taskId) => {
    try {
      await axios.put(`https://ems-backend-production-3f3d.up.railway.app/updateTaskAssigned/${taskId}`, editedTask);
      fetchTasks(); // Refresh the task list after saving
      setEditingTaskId(null); // Exit editing mode
      Swal.fire("Success!", "Task updated successfully.", "success");
    } catch (error) {
      console.error('Error updating task:', error);
      Swal.fire("Error!", "Failed to update task. Please try again later.", "error");
    }
  };
  
 
 
  useEffect(() => {
    const fetchPriorities = async (taskId,priorityId) => {
      try {
        const response = await axios.put(`https://ems-backend-production-3f3d.up.railway.app/updatePriorityLevel/${taskId}/`);
        setPriorities(response.data);
      } catch (error) {
        console.error('Error fetching priorities:', error);
      }
    };
 
    fetchPriorities();
  }, []);
 
 
  const [tasks, setTasks] = useState([]);
 
  useEffect(() => {
    fetchTasks();
  }, []);
 
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://ems-backend-production-3f3d.up.railway.app/findByEmployeeEntityEmpId/${empId}`);
      setTasks(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const handleSearch = async () => {
    try {
      let response;
  
      if (searchBy === "Priority") {
        response = await axios.get(`https://ems-backend-production-3f3d.up.railway.app/findByPriorityId/${selectedPriorityId}`);
      } else if (searchBy === "assignedTo") {
        response = await axios.get(`https://ems-backend-production-3f3d.up.railway.app/findByEmployeeEntityEmpId/${empId}`);
      } else if (searchBy === "taskId") {
        response = await axios.get(`https://ems-backend-production-3f3d.up.railway.app/findByTaskId/${taskId}`);
      } else {
        // Default to searching by employee ID if no specific search criteria is selected
        response = await axios.get(`https://ems-backend-production-3f3d.up.railway.app/findByEmployeeEntityEmpId/${empId}`);
      }
  
      setTasks(response.data);
      setSearchResults(response.data);
      setShowNoRecordsMessage(response.data.length === 0);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    // Add leading zeros if necessary
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    return `${year}-${month}-${day}`;
  };
  
 
  const handleApprove = (taskIdToRemove) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSearchResults(prevResults =>
          prevResults.filter(task => task.taskId !== taskIdToRemove)
        );
 
        Swal.fire("Task Approved!", "The task has been removed.", "success");
      }
    });
  };
 
  const handleEmployeeIdChange = (empId) => {
    setNewTask({
      ...newTask,
      employeeEntity: {
        ...newTask.employeeEntity,
        empId: empId
      }
    });
  };
  
  return (
    <div className="Taskassign-manager-TaskAssignBymanager-container">
      <img
        src="https://images.unsplash.com/photo-1590402494610-2c378a9114c6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Placeholder"
        className="Taskassign-manager-header-image"
      />
      <div className="Taskassign-manager-filter-search">
        <select
          id="searchBy"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="" disabled>
            Select Filter
          </option>
          <option value="taskId" className="Taskassign-manager-select-option">
            Task ID
          </option>
          <option value="assignedBy" className="Taskassign-manager-select-option">
            Assign To
          </option>
          <option value="Priority" className="Taskassign-manager-select-option">
            Priority
          </option>
        </select>
        <input
          type="text"
          id="keyword"
          className="Taskassign-manager-search-field"
          placeholder="Search Employee"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="Taskassign-manager-search-button" onClick={handleSearch}>
  <RiSearchLine className="Taskassign-manager-search-icon" />
</button>
        
      </div>
      <div className="Taskassign-manager-table-container">
       
        <table className="Taskassign-manager-custom-table">
          <thead>
            <tr>
              {/* <th className="tableheader">Task ID</th> */}
              <th className="Taskassign-manager-tableheader">ID</th>
              <th className="Taskassign-manager-tableheader">Task</th>
              <th className="Taskassign-manager-tableheader">Assign To</th>
              <th className="Taskassign-manager-tableheader">Start Date</th>
              <th className="Taskassign-manager-tableheader">End Date</th>
              <th className="Taskassign-manager-tableheader">Priority</th>
              <th className="Taskassign-manager-tableheader">Assign</th>
              <th className="Taskassign-manager-tableheader">Approve</th>
            </tr>
          </thead>
          
          <tbody>
          {searchResults.map((task) => (
  <tr key={task.taskId}>
    <td>{task.taskId}</td>
    <td>
      {editingTaskId === task.taskId ? (
        <input
          type="text"
          value={editedTask.taskTitle || task.taskTitle}
          onChange={(e) => handleChange('taskTitle', e.target.value)}
        />
      ) : (
        task.taskTitle
      )}
    </td>
    {/* <td>{task.employeeEntity.empId}</td> */}
    {/* <td>
  {editingTaskId === task.taskId ? (
    <input
      type="text"
      value={editedTask.employeeEntity.empId || task.employeeEntity.empId}
      onChange={(e) => handleChange('employeeEntity.empId', e.target.value)}
    />
  ) : (
    task.employeeEntity ? task.employeeEntity.empId : ""
  )}
</td> */}
{editingTaskId === task.taskId ? (
  <input
    type="text"
    value={task.employeeEntity ? task.employeeEntity.empId : ""}
    onChange={(e) => handleEmployeeIdChange(e.target.value)}
  />
) : (
  task.employeeEntity ? task.employeeEntity.empId : ""
)}
 
             
    <td>
      {editingTaskId === task.taskId ? (
        <input
          type="date"
          value={editedTask.startDate || task.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
        />
      ) : (
        task.startDate
      )}
    </td>
    <td>
      {editingTaskId === task.taskId ? (
        <input
          type="date"
          value={editedTask.endDate || task.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
        />
      ) : (
        task.endDate
      )}
    </td>
    <td>
      {editingTaskId === task.taskId ? (
        <select value={editedTask.priority || task.priority} onChange={(e) => handleChange('priority', e.target.value)}>
          {priorities.map((priority, index) => (
            <option key={index} value={priority}>{priority}</option>
          ))}
        </select>
      ) : (
        task.priority
      )}
    </td>
    <td>
      {editingTaskId === task.taskId ? (
        <button className="Taskassign-manager-completedButton" onClick={() => handleSave(task.taskId)}>Save</button>
      ) : (
        <button className="Taskassign-manager-completedButton" onClick={() => handleEdit(task.taskId)}>Edit</button>
      )}
    </td>
    <td>
      <button className="Taskassign-manager-completedButton" onClick={() => handleApprove(task.taskId)}>Approve</button>
    </td>
  </tr>
))}
            {!searchResults.length && showNoRecordsMessage && (
              <tr>
                <td colSpan="8">No matching records found.</td>
              </tr>
            )}
       
         
            
      
            <tr>
         
              <td></td>
              <td>
                <input
                  type="text"
                  value={newTask.taskTitle
                  }
                  onChange={(e) =>
                    setNewTask({ ...newTask, taskTitle: e.target.value })
                  }
                  className="Taskassign-manager-small-input"
                  placeholder="Given task"
                />
              </td>
              <td>
              {/* <input
          type="text"
          value={newTask.employeeEntity.empId}
          onChange={(e) => handleEmployeeIdChange(e.target.value)}
          className="small-input"
          placeholder="Assign To (Employee ID)"
        /> */}
                <input
                  type="text"
                  value={newTask.employeeId}
                  onChange={(e) =>setNewTask({ ...newTask, employeeId: e.target.value })
 
                    // setNewTask({ ...newTask, employeeEntity.empId: e.target.value })
                  }
                  className="Taskassign-manager-small-input"
                  placeholder="Assign"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={newTask.startDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, startDate: e.target.value })
                  }
                  className="Taskassign-manager-small-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={newTask.endDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, endDate: e.target.value })
                  }
                  className="Taskassign-manager-small-input"
                />
              </td>
              <td>
                <select
                  value={newTask.Priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, Priority: e.target.value })
                  }
                  className="Taskassign-manager-small-input"
                >
                  <option>-</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </td>
              <td>
                <button
                  className="Taskassign-manager-completedButton"
                  onClick={handleAssign}
                >
                  Assign
                </button>
              </td>
              <td>
                <button
                  className="Taskassign-manager-completedButton"
                  onClick={() => handleApprove(newTask.taskId)}
                >
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
 
 
