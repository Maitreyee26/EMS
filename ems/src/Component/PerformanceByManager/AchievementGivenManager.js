 import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiSearchLine } from "react-icons/ri";
import axios from "axios";
import "./AchievementGivenManager.css";

import { useAuth } from '../AuthContext';
const AchievementManager = () => {
  const [achievements, setAchievements] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showNoRecordsMessage, setShowNoRecordsMessage] = useState(false);

 
  const { empId,jobId,employeeId } = useAuth();

  useEffect(() => {
    axios.get("https://ems-backend-production-3f3d.up.railway.app/viewFiles")
      .then(response => {
        const updatedAchievements = Object.entries(response.data).map(([id, documentName]) => ({
          Id: id,
          EmpName: "Employee Name",
          DocumentName: documentName,
          viewdocument: id,
          status: ""
        }));
        setAchievements(updatedAchievements);
      })
      .catch(error => {
        console.error("Error fetching document data:", error);
      });
  }, []);

  const handleSearch = () => {
    const filteredAchievements = achievements.filter((achievement) => {
      if (searchBy === "Id") {
        return keyword === "" || achievement.Id.toString() === keyword;
      } else if (searchBy === "EmpName") {
        return (
          keyword === "" ||
          achievement.EmpName.toLowerCase().includes(keyword.toLowerCase())
        );
      } else if (searchBy === "DocumentName") {
        return (
          keyword === "" || achievement.DocumentName.toString() === keyword
        );
      }
      return false;
    });

    setSearchResults(filteredAchievements);
    setShowNoRecordsMessage(filteredAchievements.length === 0);
  };

  const handleSave = async (achievementId, selectedStatus) => {
    try {
      const apiUrl = `https://ems-backend-production-3f3d.up.railway.app/changeFileStatus/${achievementId}/${selectedStatus}`;
      const response = await axios.put(apiUrl, {});
      
      if (response.status === 200) {
        toast.success("Record Updated");
      } else {
        console.error("Error updating document status. Unexpected response:", response);
        toast.error("Error updating document status");
      }
    } catch (error) {
      console.error("Error updating document status:", error);
      toast.error("Error updating document status");
    }
  };

  const openFile = (fileId) => {
    const fileUrl = `https://ems-backend-production-3f3d.up.railway.app/viewFileById/${fileId}`
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="achievement-given-Achievement-container">
      <div className="achievement-given-button-container">
        <div className="achievement-given-filter-search">
          <select
            id="searchBy"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="" disabled>
              Select Filter
            </option>
            <option value="Id" className="achievement-given-select-option">
              Id
            </option>
            <option value="EmpName" className="achievement-given-select-option">
              Employee Name
            </option>
            <option value="DocumentName" className="achievement-given-select-option">
              Document Name
            </option>
          </select>
          <input
            type="text"
            id="keyword"
            className="achievement-given-search-field"
            placeholder="Search Employee"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleSearch} className="achievement-given-search-button">
            <RiSearchLine className="achievement-given-search-icon" />
          </button>
        </div>
      </div>

      <div className="achievement-given-table-container">
        <table className="achievement-given-custom-table">
          <thead>
            <tr>
              <th className="achievement-given-tableheader">Id</th>
              <th className="achievement-given-tableheader">Employee Name</th>
              <th className="achievement-given-tableheader">Document Name</th>
              <th className="achievement-given-tableheader">View</th>
              <th className="achievement-given-tableheader">Feedback</th>
              <th className="achievement-given-tableheader"></th>
            </tr>
          </thead>
          <tbody>
            {(searchResults.length > 0 ? searchResults : achievements).map((achievement) => (
              <tr key={achievement.Id}>
                <td>{achievement.Id}</td>
                <td>{achievement.EmpName}</td>
                <td>{achievement.DocumentName}</td>
                <td>
                  <button
                    className="achievement-given-fileButton"
                    onClick={() => openFile(achievement.viewdocument)}
                  >
                    View
                  </button>
                </td>
                <td>
                  <select
                    value={achievement.status}
                    onChange={(e) => {
                      const selectedStatus = e.target.value;
                      setAchievements((prevAchievements) =>
                        prevAchievements.map((prevAchievement) =>
                          prevAchievement.Id === achievement.Id
                            ? { ...prevAchievement, status: selectedStatus }
                            : prevAchievement
                        )
                      );
                    }}
                  >
                    <option value="" disabled>
                      Select Status </option>

                      <option value="Completed">Completed</option>

                   <option value="Not Completed">Not Completed</option>

                   </select>

                </td>

               <td>

                  <button

                    onClick={() => handleSave(achievement.Id, achievement.status)}

                    className="achievement-given-search-b"

                  >

                    Save

                  </button>

                 </td>

              </tr>

            ))}

           </tbody>

        </table>

      </div>

      <ToastContainer position="bottom-right" style={{ marginBottom: '40px' }} />

     </div>

  );

}
 
 export default AchievementManager;


