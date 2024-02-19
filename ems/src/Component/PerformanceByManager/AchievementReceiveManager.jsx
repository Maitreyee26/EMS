import React, { useState, useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AchievementReceiveManager.css";
import axios from "axios";

import { useAuth } from '../AuthContext';
const Achievement = () => {
  const [achievements, setAchievements] = useState([
    { id: 1, documentname: "Tosca Certificate", viewdocument: "View", feedback: 'Completed' },
    { id: 2, documentname: "Qtest",  viewdocument: "View", feedback: 'Completed' },
    { id: 3, documentname: "SQL",  viewdocument: "View", feedback: 'Completed' },
  ]);

 
  const { empId,jobId,employeeId } = useAuth();

  const [achievementsData, setAchievementData] = useState([]);
  useEffect(() => {
    // Replace 'your-api-url' with the actual URL of your Spring Boot application
    axios.get("https://ems-backend-production-3f3d.up.railway.app/viewFiles")
        .then(response => {
            setAchievementData(response.data);
            const updatedAchievements = Object.entries(response.data).map(([id, documentname]) => ({
              id,
              documentname,
              viewdocument: "View",
              feedback: "Completed"
            // console.log(response.data);
        }));
        setAchievements(updatedAchievements);
      })
        .catch(error => {
            console.error("Error fetching feedback data:", error);

        }); 
}, []);



  // const deleteAchievement = (id,index) => {

  //   axios.delete(`http://localhost:8080/deleteFile/12`)
  //   .then(response => {
  //     // Handle success
  //     console.log("File deleted successfully:", response.data);



  //   const updatedAchievements = [...achievements];
  //   updatedAchievements.splice(index, 1);
  //   setAchievements(updatedAchievements);





  //   // Show the toast notification at the bottom
  //   toast.success("Record deleted");
  //   })
  //   .catch(error => {
  //     // Handle error
  //     console.error("Error deleting file:", error);
  //     toast.error("Error deleting record");
  //   });
  // const openFile = (file) => {
  //   window.open(file);
  // };

  // 

  // const openFile = (file) => {
  //   window.open(file);
// };
const openFile = (fileId) => {
  // Replace 'http://localhost:8080/viewFileById/' with the actual URL of your endpoint
  const fileUrl = `https://ems-backend-production-3f3d.up.railway.app/viewFileById/${fileId}`

  // Open the file URL in a new tab
  window.open(fileUrl, '_blank');
};

const deleteFile = (fileId) => {
  const fileUrl = `https://ems-backend-production-3f3d.up.railway.app/deleteFile/${fileId}`;

  axios.delete(fileUrl)
    .then(response => {
      // Handle success, if needed
      console.log("File deleted successfully:", response.data);
    })
    .catch(error => {
      // Handle error
      console.error("Error deleting file:", error);
    });

    toast.success("Record deleted");
};

  return (
    <div className="achievement-receive-Achievement-container">
      <div className="achievement-receive-table-container">
        <table className="achievement-receive-custom-table">
          <thead>
            <tr>
              <th className="achievement-receive-tableheader">ID</th>
              <th className="achievement-receive-tableheader">Document Name</th>
              {/* <th className="tableheader">Document Description</th> */}
              <th className="achievement-receive-tableheader">View Document</th>
              <th className="achievement-receive-tableheader">Feedback</th>
              <th className="achievement-receive-tableheader">Delete</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((achievement, index) => (
              <tr key={achievement.id}>
                <td>{achievement.id}</td>
                 <td>{achievement.documentname}</td> 
                {/* <td>{achievement.documentdescription}</td> */} 
                <td>
                  <button
                    className="achievement-receive-fileButton"
                    onClick={() => openFile(achievement.id)}
                  >
                    {achievement.viewdocument}
                  </button>
                </td>
                <td>{achievement.feedback}</td>
                <td>
                  <button
                    className="achievement-receive-completedButton"
                    onClick={() => deleteFile(achievement.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Include ToastContainer with style prop for bottom positioning */}
      <ToastContainer position="bottom-right" style={{ marginBottom: '40px' }} />
    </div>
  );
};

export default Achievement;
