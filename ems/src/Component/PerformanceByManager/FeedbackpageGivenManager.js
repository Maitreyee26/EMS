




import React, { useState, useEffect , useRef } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Rating } from "primereact/rating";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FeedbackpageGivenManager.css";

import { useAuth } from '../AuthContext';
const FeedbackByManager = () => {
  // const givenToOptions = [
  //   { value: "", label: "select name" },
  //   { value: "Harsh", label: "Harsh" },
  //   { value: "Malka", label: "Malka" },
  // ];
  // const givenToOptions = [
  //   { value: "-", empId: null },
  //   { value: "Malka", empId: 1 },
  //   { value: "Harsh", empId: 2 }
  // ];
  



 
  const { empId,jobId,employeeId } = useAuth();

   const givenToOptions= ["-", "Malka" , "Harsh"]

  const [searchBy, setSearchBy] = useState("GivenTo");
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    Task: "",
    Feedback: "",
    GivenTo: "",
    Rating: null,
  });
  const alreadyRun = useRef(false);
  const addFeedback = async () => {
    try {
      
    //   const givenToOption = givenToOptions.find(option => option === newFeedback.GivenTo);
    // const empId = givenToOption ? givenToOption.empId : null;


      const response = await fetch("https://ems-backend-production-3f3d.up.railway.app/addFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // {
        //   "rating": 4,
        //   "feedback": "nice work",
        //   "task": "Change font size",
        //   "employeeEntity": {
        //       "empId": 2
        //   }
      // }
        body: JSON.stringify({
          rating: newFeedback.Rating,
          feedback: newFeedback.Feedback,
          task: newFeedback.Task,
          employeeEntity:{
            empId: 3
          }
        }),
      });
  
      if (response.ok) {
        const responseData = await response.text();
        const lowerCaseMessage = responseData.trim().toLowerCase();
  
        // ... rest of the code
      } else {
        console.error("Server responded with an error:", response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {   if (!alreadyRun.current) {     addFeedback();     alreadyRun.current = true;   } }, []);
  
  // Call the asynchronous function
  // addFeedback();
  


  const [editingId, setEditingId] = useState(null);
  const [showNoRecordsMessage, setShowNoRecordsMessage] = useState(false);
  const [error, setError] = useState("");

  // const handleGiven = () => {
  //   setError(""); // Clear the error state

  //   if (
  //     !newFeedback.Task ||
  //     !newFeedback.Feedback ||
  //     !newFeedback.GivenTo ||
  //     newFeedback.Rating === null
  //   ) {
  //     setError("Please fill in all fields");
  //     return;
  //   }

  //   // Clear error state if no errors
  //   setError("");

  //   if (editingId !== null) {
  //     setSearchResults((prevResults) =>
  //       prevResults.map((Feedback) =>
  //         Feedback.Id === editingId ? { ...Feedback, ...newFeedback } : Feedback
  //       )
  //     );

  //     setEditingId(null);
  //   } else {
  //     setSearchResults((prevResults) => [...prevResults, newFeedback]);
  //   }

  //   setNewFeedback({
  //     Task: "",
  //     Feedback: "",
  //     GivenTo: "",
  //     Rating: null,
  //   });
  // };

  const handleGiven = async () => {
    setError(""); // Clear the error state
   
    if (
      !newFeedback.Task ||
      !newFeedback.Feedback ||
      !newFeedback.GivenTo ||
      newFeedback.Rating === null
    ) {
      setError("Please fill in all fields");
      return;
    }
   
    // Clear error state if no errors
    setError("");
   
    try {
      await addFeedback(); // Call addFeedback function to post newFeedback data to the database
   
      if (editingId !== null) {
        setSearchResults((prevResults) =>
          prevResults.map((Feedback) =>
            Feedback.Id === editingId ? { ...Feedback, ...newFeedback } : Feedback
          )
        );
   
        setEditingId(null);
      } else {
        setSearchResults((prevResults) => [...prevResults, newFeedback]);
      }
   
      setNewFeedback({
        Task: "",
        Feedback: "",
        GivenTo: "",
        Rating: null,
      });
    } catch (error) {
      console.error("Error while adding feedback:", error);
      setError("Failed to add feedback");
    }
  };



  const handleEdit = (Id) => {
    setEditingId(Id);

    const FeedbackToEdit = searchResults.find((Feedback) => Feedback.Id === Id);
    if (FeedbackToEdit) {
      setNewFeedback({ ...FeedbackToEdit });
    }
  };

  const handleApprove = (IdToRemove) => {
    setSearchResults((prevResults) =>
      prevResults.filter((Feedback) => Feedback.Id !== IdToRemove)
    );

    toast.success("Record deleted");
  };

  const handleSearch = () => {
    const FeedbackGiven = [
      {
        Id: 1,
        Task: "Tosca",
        Feedback: "Good",
        GivenTo: "Malka",
        Rating: 3,
      },
      {
        Id: 2,
        Task: "qTest",
        Feedback: "Excellent",
        GivenTo: "Harsh",
        Rating: 5,
      },
      // Add more task data as needed
    ];

    const filteredFeedbackGiven = FeedbackGiven.filter((employee) => {
      if (searchBy === "GivenTo") {
        return (
          keyword === "" ||
          employee.GivenTo.toLowerCase().includes(keyword.toLowerCase())
        );
      } else if (searchBy === "Rating") {
        return (
          keyword === "" || employee.Rating.toString() === keyword
        );
      }

      return false;
    });

    setSearchResults(filteredFeedbackGiven);
    setShowNoRecordsMessage(filteredFeedbackGiven.length === 0);
  };

  return (
    <div className="feedbackpagegivenmanager-container">
      <div className="feedbackpagegivenmanager-filter-search">
        <select
          id="searchBy"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="GivenTo" className="feedbackpagegivenmanager-select-option">
            Given To
          </option>
          <option value="Rating" className="feedbackpagegivenmanager-select-option">
            Rating
          </option>
        </select>
        <input
          type="text"
          id="keyword"
          className="feedbackpagegivenmanager-search-field"
          placeholder="Search Employee"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch} className="feedbackpagegivenmanager-search-button">
          <RiSearchLine className="feedbackpagegivenmanager-search-icon" />
        </button>
      </div>
      <div className="feedbackpagegivenmanager-table-container">
        <table className="feedbackpagegivenmanager-custom-table">
          <thead>
            <tr>
              <th className="feedbackpagegivenmanager-tableheader">Task</th>
              <th className="feedbackpagegivenmanager-tableheader">Feedback</th>
              <th className="feedbackpagegivenmanager-tableheader">Given To</th>
              <th className="feedbackpagegivenmanager-tableheader">Rating</th>
              <th className="feedbackpagegivenmanager-tableheader">Given</th>
              <th className="feedbackpagegivenmanager-tableheader">Delete</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((FeedbackGiven) => (
              <tr key={FeedbackGiven.Id}>
                <td className="feedbackpagegivenmanager-inputField">
                  {editingId === FeedbackGiven.Id ? (
                    <input
                      type="text"
                      value={newFeedback.Task}
                      onChange={(e) =>
                        setNewFeedback({ ...newFeedback, Task: e.target.value })
                      }
                      className="feedbackpagegivenmanager-small-input"
                    />
                  ) : (
                    `${FeedbackGiven.Task}`
                  )}
                </td>
                <td className="feedbackpagegivenmanager-inputField">
                  {editingId === FeedbackGiven.Id ? (
                    <input
                      type="text"
                      value={newFeedback.Feedback}
                      onChange={(e) =>
                        setNewFeedback({ ...newFeedback, Feedback: e.target.value })
                      }
                      className="feedbackpagegivenmanager-small-input"
                    />
                  ) : (
                    `${FeedbackGiven.Feedback}`
                  )}
                </td>
                <td className="feedbackpagegivenmanager-inputField">
                  {editingId === FeedbackGiven.Id ? (
                    <select
                      value={newFeedback.GivenTo}
                      onChange={(e) =>
                        setNewFeedback({ ...newFeedback, GivenTo: e.target.value })
                      }
                      className="feedbackpagegivenmanager-small-input"
                    >
                      {givenToOptions.map((option) => (
                        <option key={option} value={option} selected={newFeedback.GivenTo === option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    `${FeedbackGiven.GivenTo}`
                  )}
                </td>
                <td className="feedbackpagegivenmanager-inputField">
                  {editingId === FeedbackGiven.Id ? (
                    <Rating
                      value={newFeedback.Rating}
                      onChange={(e) =>
                        setNewFeedback({ ...newFeedback, Rating: e.value })
                      }
                      cancel={false}
                    />
                  ) : (
                    <Rating value={FeedbackGiven.Rating} readOnly cancel={false} />
                  )}
                </td>
                <td>
                  {editingId === FeedbackGiven.Id ? (
                    <button
                      className="feedbackpagegivenmanager-completedButton"
                      onClick={handleGiven}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="feedbackpagegivenmanager-completedButton"
                      onClick={() => handleEdit(FeedbackGiven.Id)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="feedbackpagegivenmanager-completedButton"
                    onClick={() => handleApprove(FeedbackGiven.Id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!searchResults.length && showNoRecordsMessage && (
              <tr>
                <td colSpan="6">No matching records found.</td>
              </tr>
            )}
            <tr>
              <td>
                <input
                  type="text"
                  value={newFeedback.Task}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, Task: e.target.value })
                  }
                  className="feedbackpagegivenmanager-small-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newFeedback.Feedback}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, Feedback: e.target.value })
                  }
                  className="feedbackpagegivenmanager-small-input"
                />
              </td>
              <td>
                <select
                  value={newFeedback.GivenTo}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, GivenTo: e.target.value })
                  }
                  className="feedbackpagegivenmanager-small-input"
                >
                  {givenToOptions.map((option) => (
                    <option key={option} value={option} selected={newFeedback.GivenTo === option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <Rating
                  value={newFeedback.Rating}
                  onChange={(e) => setNewFeedback({ ...newFeedback, Rating: e.value })}
                  cancel={false}
                />
              </td>
              <td>
                <button
                  className="feedbackpagegivenmanager-completedButton"
                  onClick={handleGiven}
                >
                  Give
                </button>
              </td>
              <td>
                <button
                  className="feedbackpagegivenmanager-completedButton"
                  onClick={() => handleApprove(newFeedback.Id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {error && (
        <div className="feedbackpagegivenmanager-error-message">
          {error}
        </div>
      )}

      <ToastContainer position="bottom-right" style={{ marginBottom: '40px' }} />
    </div>
  );
};

export default FeedbackByManager;
