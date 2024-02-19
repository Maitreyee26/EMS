
import React, { useState, useEffect } from "react";

import { useAuth } from '../AuthContext';
import "./FeedbackReceive.css";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import Swal from "sweetalert2";
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';



const Feedback = () => {

 
const { empId,jobId,employeeId } = useAuth();

  const [Feedback, setFeedbacks] = useState([
    // { id: 1, name: "Tosca Certificate", type:'PDF', size:"30" },
    // { id: 2, name: "uploadpage",},
    {id: 1, task: "Tosca",feedback: "dfdfd",given: 'A' ,rating:"2" },
    {id: 2, task: "Tosca",feedback: "dfdfd",given: 'A' ,rating: "5"  },
    {id: 3, task: "Tosca",feedback: "dfdfd",given: 'A' ,rating: "4"  },
  ]);
  const [feedbackData, setFeedbackData] = useState([]);
useEffect(() => {
    // Replace 'your-api-url' with the actual URL of your Spring Boot application
    axios.get(`https://ems-backend-production-3f3d.up.railway.app/findFeedbackByEmpId/${empId}`)
        .then(response => {
            setFeedbackData(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error fetching feedback data:", error);

        });
}, []);
  


  // const rating;
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    const renderStars = () => {
      const stars = [];
  
      for (let i = 1; i <= fullStars; i++) {
        stars.push(<span key={i}>&#9733;</span>); // Unicode character for a filled star
      }
  
      if (hasHalfStar) {
        stars.push(<span key="half">&#9734;&#9733;</span>); // Unicode characters for a half-filled star
      }
  
      return stars;
    };
  
    return (
      <div>
        {renderStars()}
      </div>
    );
  };
 
 
  
 

 
 
  return (
    <div className="Feedback-container">
      <div className="feedback-receive-table-container">
        <table className="feedback-receive-custom-table">
          <thead>
            <tr>
              <th className="feedback-receive-tableheader">S.No</th>
              
              <th className="feedback-receive-tableheader">Task</th>
              <th className="feedback-receive-tableheader">Feedback</th>
              <th className="feedback-receive-tableheader">Given By</th>
              <th className="feedback-receive-tableheader">Rating</th>
             
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
               
                <td>{feedback.task}</td>
                <td>{feedback.feedback}</td>
                <td>{feedback.given}</td>
                <td>
                 {/* // Set your desired rating here */}
                 <div>
    {/* <h1>Product Rating:</h1> */}
    <StarRating rating={feedback.rating} />
  </div>
</td>
            <td>
                  {/* <button
                    className="completedButton"
                    onClick={() => handleCompletedClick(Feedback.id)}
                  >
                    Delete
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
 
export default Feedback;