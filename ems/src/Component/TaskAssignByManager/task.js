
// import React, { useState,useEffect } from "react";
// import "./task.css";
// import { RiSearchLine } from "react-icons/ri";
// import Swal from "sweetalert2";
// import axios from 'axios';
// export default function TaskAssignByManager() {
 
//  const [searchResults, setSearchResults] = useState([]);
//   const [showNoRecordsMessage, setShowNoRecordsMessage] = useState(false);
//   const [searchBy, setSearchBy] = useState(""); // Define searchBy state variable
//   const [keyword, setKeyword] = useState("");
 
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [newTask, setNewTask] = useState({
//     TaskId: "",
//     taskTitle: "",
//     assignedBy: "",
//     startDate: "",
//     endDate: "",
//     Priority: "",
//   });
 
//   // Function to add a new task
//   const handleAssign = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/addTask', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           taskTitle: newTask.taskTitle,
//           employeeEntity: {
//             empId: 3
//           },
//           startDate: "2024-01-24",
//           endDate: "2024-01-24",
//           taskPriorityEntity: {
//             priorityId: 1
//           }
//         }),
//       });
 
//       if (!response.ok) {
//         throw new Error('Failed to add task');
//       }
 
//       // If the response is successful (status code 2xx), you can perform further actions here
//       // For example, you might want to display a success message to the user or update the UI in some way
//       console.log('Task added successfully');
//       alert('Task added successfully');
 
//     } catch (error) {
//       console.error('Error assigning task:', error.message);
//       alert('Failed to assign task. Please try again.');
//     }
//   };
 
//  // Add a new state for priorities
// const [priorities, setPriorities] = useState([]);

// // Fetch priorities when the component mounts
// useEffect(() => {
//     const fetchPriorities = async () => {
//         try {
//             const response = await axios.put('http://localhost:8080/updatePriorityLevel/1/1');
//             setPriorities(response.data);
//         } catch (error) {
//             console.error('Error fetching priorities:', error);
//         }
//     };

//     fetchPriorities();
// }, []);

// // Update the JSX for rendering priorities in the table
// <td className="inputField">
//     {editingTaskId === Taskassign.TaskId ? (
//         <select
//             value={newTask.priority.priorityId}
//             onChange={(e) => setNewTask({ ...newTask, priority: { priorityId: e.target.value } })}
//             className="small-input"
//         >
//             <option value="">-</option>
//             {priorities.map((priority) => (
//                 <option key={priority.priorityId} value={priority.priorityId}>
//                     {priority.priorityName} {/* Use the actual field from your Priority model */}
//                 </option>
//             ))}
//         </select>
//     ) : (
//         // Display priority name instead of ID
//         `${Taskassign.priority.priorityName}`
//     )}
// </td>

 
 
//   const handleEdit = (taskId) => {
//     setEditingTaskId(taskId);
 
//     const taskToEdit = searchResults.find((task) => task.TaskId === taskId);
//     if (taskToEdit) {
//       setNewTask({ ...taskToEdit });
//     }
//   };
 
//   // const handleSearch = () => {
//   //     const Taskassign = [
//   //       // ... (existing task data)
//   //     ];
   
 
//   const [tasks, setTasks] = useState([]);
 
//   useEffect(() => {
//     fetchTasks();
//   }, []);
 
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/findByEmployeeEntityEmpId/2'); // Replace with your backend endpoint
//       setTasks(response.data);
//       setSearchResults(response.data); // Set search results initially to all tasks
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       // Handle error (e.g., show error message to the user)
//     }
//   };
 
//   const handleSearch = async () => {
//     try {
//         let response;

//         if (searchBy === "Priority") {
//             // Fetch data based on priority filter
//             response = await axios.get(`http://localhost:8080/findTasksByPriority/${keyword}`);
//         } else {
//             // Fetch data based on other filters
//             response = await axios.get(`http://localhost:8080/findByEmployeeEntityEmpId/2`);
//         }

//         setTasks(response.data);
//         setSearchResults(response.data);
//         setShowNoRecordsMessage(response.data.length === 0);
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         // Handle error (e.g., show error message to the user)
//     }
// };

 
//   const handleApprove = (taskIdToRemove) => {
//     Swal.fire({
//       title: "Are you sure?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Approve it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setSearchResults(prevResults =>
//           prevResults.filter(task => task.TaskId !== taskIdToRemove)
//         );
 
//         Swal.fire("Task Approved!", "The task has been removed.", "success");
//       }
//     });
//   };
 
//   return (
//     <div className="TaskAssignBymanager-container">
//       <img
//         src="https://images.unsplash.com/photo-1590402494610-2c378a9114c6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Placeholder"
//         className="header-image"
//       />
//       <div className="filter-search">
//         <select
//           id="searchBy"
//           value={searchBy}
//           onChange={(e) => setSearchBy(e.target.value)}
//         >
//           <option value="" disabled>
//             Select Filter
//           </option>
//           <option value="TaskId" className="select-option">
//             Task ID
//           </option>
//           <option value="assignedBy" className="select-option">
//             Assign To
//           </option>
//           <option value="Priority" className="select-option">
//             Priority
//           </option>
//         </select>
//         <input
//           type="text"
//           id="keyword"
//           className="search-field"
//           placeholder="Search Employee"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//         />
//         <button  className="search-button"  onClick={handleSearch}>
//           <RiSearchLine className="search-icon" />
//         </button>
//       </div>
//       <div className="table-container">
       
//         <table className="custom-table">
//           <thead>
//             <tr>
//               {/* <th className="tableheader">Task ID</th> */}
//               <th className="tableheader">Task</th>
//               <th className="tableheader">Assign To</th>
//               <th className="tableheader">Start Date</th>
//               <th className="tableheader">End Date</th>
//               <th className="tableheader">Priority</th>
//               <th className="tableheader">Assign</th>
//               <th className="tableheader">Approve</th>
//             </tr>
//           </thead>
//           <tbody>
//             {searchResults.map((Taskassign) => (
//               <tr key={Taskassign.TaskId}>
//                 <td>{`${Taskassign.TaskId}`}</td>
//                 <td className="inputField">
//                   {editingTaskId === Taskassign.TaskId ? (
//                     <input
//                       type="text"
//                       value={newTask.Task}
//                       onChange={(e) =>
//                         setNewTask({ ...newTask, Task: e.target.value })
//                       }
//                       className="small-input"
//                     />
//                   ) : (
//                     `${Taskassign.Task}`
//                   )}
//                 </td>
//                 <td className="inputField">
//                   {editingTaskId === Taskassign.TaskId ? (
//                     <input
//                       type="text"
//                       value={newTask.assignedBy}
//                       onChange={(e) =>
//                         setNewTask({ ...newTask, assignedBy: e.target.value })
//                       }
//                       className="small-input"
//                     />
//                   ) : (
//                     `${Taskassign.assignedBy}`
//                   )}
//                 </td>
//                 <td className="inputField">
//                   {editingTaskId === Taskassign.TaskId ? (
//                     <input
//                       type="date"
//                       value={newTask.startDate}
//                       onChange={(e) =>
//                         setNewTask({ ...newTask, startDate: e.target.value })
//                       }
//                       className="small-input"
//                     />
//                   ) : (
//                     `${Taskassign.startDate}`
//                   )}
//                 </td>
//                 <td className="inputField">
//                   {editingTaskId === Taskassign.TaskId ? (
//                     <input
//                       type="date"
//                       value={newTask.endDate}
//                       onChange={(e) =>
//                         setNewTask({ ...newTask, endDate: e.target.value })
//                       }
//                       className="small-input"
//                     />
//                   ) : (
//                     `${Taskassign.endDate}`
//                   )}
//                 </td>
//                 <td className="inputField">
//                   {editingTaskId === Taskassign.TaskId ? (
//                     <select value={newTask.Priority} onChange={handlePriorityChange=>
//                       setNewTask({ ...newTask, Priority: handlePriorityChange.target.value })}
                   
//                     // onChange={(e) =>
//                     //   setNewTask({ ...newTask, Priority: e.target.value })
//                     // }
//                     className="small-input"
//                   >
//                      <select
//             value={newTask.priority.priorityId}
//             onChange={(e) => setNewTask({ ...newTask, priority: { priorityId: e.target.value } })}
//             className="small-input"
//         >
//             <option value="">-</option>
//             {priorities.map((priority) => (
//                 <option key={priority.priorityId} value={priority.priorityId}>
//                     {priority.priorityName} {/* Use the actual field from your Priority model */}
//                 </option>
//             ))}
//         </select> 
//                     <option value="">-</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                   ) : (
//                     `${Taskassign.Priority}`
//                   )}
//                 </td>
//                 <td>
//                   {editingTaskId === Taskassign.TaskId ? (
//                     <button
//                       className="completedButton"
//                       onClick={handleAssign}
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <button
//                       className="completedButton"
//                       onClick={() => handleEdit(Taskassign.TaskId)}
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </td>
//                 <td>
//                   <button
//                     className="completedButton"
//                     onClick={() => handleApprove(Taskassign.TaskId)}
//                   >
//                     Approve
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {!searchResults.length && showNoRecordsMessage && (
//               <tr>
//                 <td colSpan="8">No matching records found.</td>
//               </tr>
//             )}
//             <tr>
//               {/* <td>
//                 <input
//                   type="text"
//                   value={newTask.TaskId}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, TaskId: e.target.value })
//                   }
//                   className="small-input1"
//                 />
//               </td> */}
//               <td>
//                 <input
//                   type="text"
//                   value={newTask.taskTitle
//                   }
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, taskTitle: e.target.value })
//                   }
//                   className="small-input"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={newTask.assignedBy}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, assignedBy: e.target.value })
//                   }
//                   className="small-input"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="date"
//                   value={newTask.startDate}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, startDate: e.target.value })
//                   }
//                   className="small-input"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="date"
//                   value={newTask.endDate}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, endDate: e.target.value })
//                   }
//                   className="small-input"
//                 />
//               </td>
//               <td>
//                 <select
//                   value={newTask.Priority}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, Priority: e.target.value })
//                   }
//                   className="small-input"
//                 >
//                   <option>-</option>
//                   <option>High</option>
//                   <option>Medium</option>
//                   <option>Low</option>
//                 </select>
//               </td>
//               <td>
//                 <button
//                   className="completedButton"
//                   onClick={handleAssign}
//                 >
//                   Assign
//                 </button>
//               </td>
//               <td>
//                 <button
//                   className="completedButton"
//                   onClick={() => handleApprove(newTask.TaskId)}
//                 >
//                   Approve
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
 
 
 
import React, { useState, useEffect } from "react";
import "./task.css";
import { RiSearchLine } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from 'axios';
 
export default function TaskAssignByManager() {
 
  const [searchResults, setSearchResults] = useState([]);
  const [showNoRecordsMessage, setShowNoRecordsMessage] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [keyword, setKeyword] = useState("");
 
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    TaskId: "",
    taskTitle: "",
    assignedBy: "",
    startDate: "",
    endDate: "",
    Priority: "",
  });
 
  const handleAssign = async () => {
    try {
      const response = await fetch('http://localhost:8080/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskTitle: newTask.taskTitle,
          employeeEntity: {
            empId: 3
          },
          startDate: "2024-01-24",
          endDate: "2024-01-24",
          taskPriorityEntity: {
            priorityId: 1
          }
        }),
      });
 
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
 
      console.log('Task added successfully');
      alert('Task added successfully');
 
    } catch (error) {
      console.error('Error assigning task:', error.message);
      alert('Failed to assign task. Please try again.');
    }
  };
 
  const [priorities, setPriorities] = useState([]);
 
  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const response = await axios.put('http://localhost:8080/updatePriorityLevel/1/1');
        setPriorities(response.data);
      } catch (error) {
        console.error('Error fetching priorities:', error);
      }
    };
 
    fetchPriorities();
  }, []);
 
  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
 
    const taskToEdit = searchResults.find((task) => task.TaskId === taskId);
    if (taskToEdit) {
      setNewTask({ ...taskToEdit });
    }
  };
 
  const [tasks, setTasks] = useState([]);
 
  useEffect(() => {
    fetchTasks();
  }, []);
 
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/findByEmployeeEntityEmpId/2');
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
        response = await axios.get(`http://localhost:8080/findTasksByPriority/${keyword}`);
      } else {
        response = await axios.get(`http://localhost:8080/findByEmployeeEntityEmpId/2`);
      }
 
      setTasks(response.data);
      setSearchResults(response.data);
      setShowNoRecordsMessage(response.data.length === 0);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
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
          prevResults.filter(task => task.TaskId !== taskIdToRemove)
        );
 
        Swal.fire("Task Approved!", "The task has been removed.", "success");
      }
    });
  };
 
  return (
    <div className="TaskAssignBymanager-container">
      <img
        src="https://images.unsplash.com/photo-1590402494610-2c378a9114c6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Placeholder"
        className="header-image"
      />
      <div className="filter-search">
        <select
          id="searchBy"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="" disabled>
            Select Filter
          </option>
          <option value="TaskId" className="select-option">
            Task ID
          </option>
          <option value="assignedBy" className="select-option">
            Assign To
          </option>
          <option value="Priority" className="select-option">
            Priority
          </option>
        </select>
        <input
          type="text"
          id="keyword"
          className="search-field"
          placeholder="Search Employee"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button  className="search-button"  onClick={handleSearch}>
          <RiSearchLine className="search-icon" />
        </button>
      </div>
      <div className="table-container">
       
        <table className="custom-table">
          <thead>
            <tr>
              {/* <th className="tableheader">Task ID</th> */}
              <th className="tableheader">Task</th>
              <th className="tableheader">Assign To</th>
              <th className="tableheader">Start Date</th>
              <th className="tableheader">End Date</th>
              <th className="tableheader">Priority</th>
              <th className="tableheader">Assign</th>
              <th className="tableheader">Approve</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((Taskassign) => (
              <tr key={Taskassign.TaskId}>
                <td>{`${Taskassign.TaskId}`}</td>
                <td className="inputField">
                  {editingTaskId === Taskassign.TaskId ? (
                    <input
                      type="text"
                      value={newTask.Task}
                      onChange={(e) =>
                        setNewTask({ ...newTask, Task: e.target.value })
                      }
                      className="small-input"
                    />
                  ) : (
                    `${Taskassign.Task}`
                  )}
                </td>
                <td className="inputField">
                  {editingTaskId === Taskassign.TaskId ? (
                    <input
                      type="text"
                      value={newTask.assignedBy}
                      onChange={(e) =>
                        setNewTask({ ...newTask, assignedBy: e.target.value })
                      }
                      className="small-input"
                    />
                  ) : (
                    `${Taskassign.assignedBy}`
                  )}
                </td>
                <td className="inputField">
                  {editingTaskId === Taskassign.TaskId ? (
                    <input
                      type="date"
                      value={newTask.startDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, startDate: e.target.value })
                      }
                      className="small-input"
                    />
                  ) : (
                    `${Taskassign.startDate}`
                  )}
                </td>
                <td className="inputField">
                  {editingTaskId === Taskassign.TaskId ? (
                    <input
                      type="date"
                      value={newTask.endDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, endDate: e.target.value })
                      }
                      className="small-input"
                    />
                  ) : (
                    `${Taskassign.endDate}`
                  )}
                </td>
                <td className="inputField">
                  {editingTaskId === Taskassign.TaskId ? (
                    <select value={newTask.Priority} onChange={handlePriorityChange=>
                      setNewTask({ ...newTask, Priority: handlePriorityChange.target.value })}
                   
                    // onChange={(e) =>
                    //   setNewTask({ ...newTask, Priority: e.target.value })
                    // }
                    className="small-input"
                  >
                    <option value="">-</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  ) : (
                    `${Taskassign.Priority}`
                  )}
                </td>
                <td>
                  {editingTaskId === Taskassign.TaskId ? (
                    <button
                      className="completedButton"
                      onClick={handleAssign}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="completedButton"
                      onClick={() => handleEdit(Taskassign.TaskId)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="completedButton"
                    onClick={() => handleApprove(Taskassign.TaskId)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
            {!searchResults.length && showNoRecordsMessage && (
              <tr>
                <td colSpan="8">No matching records found.</td>
              </tr>
            )}
            <tr>
              {/* <td>
                <input
                  type="text"
                  value={newTask.TaskId}
                  onChange={(e) =>
                    setNewTask({ ...newTask, TaskId: e.target.value })
                  }
                  className="small-input1"
                />
              </td> */}
              <td>
                <input
                  type="text"
                  value={newTask.taskTitle
                  }
                  onChange={(e) =>
                    setNewTask({ ...newTask, taskTitle: e.target.value })
                  }
                  className="small-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newTask.assignedBy}
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignedBy: e.target.value })
                  }
                  className="small-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={newTask.startDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, startDate: e.target.value })
                  }
                  className="small-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={newTask.endDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, endDate: e.target.value })
                  }
                  className="small-input"
                />
              </td>
              <td>
                <select
                  value={newTask.Priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, Priority: e.target.value })
                  }
                  className="small-input"
                >
                  <option>-</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </td>
              <td>
                <button
                  className="completedButton"
                  onClick={handleAssign}
                >
                  Assign
                </button>
              </td>
              <td>
                <button
                  className="completedButton"
                  onClick={() => handleApprove(newTask.TaskId)}
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
 
     