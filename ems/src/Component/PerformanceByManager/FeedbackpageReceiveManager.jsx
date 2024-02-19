
import React, { useState, useEffect } from "react";
import "./FeedbackpageReceiveManager.css";
import axios from "axios";

import { useAuth } from '../AuthContext';
const Feedback = () => {
  const [Feedback] = useState([
    // { id: 1, name: "Tosca Certificate", type:'PDF', size:"30" },
    // { id: 2, name: "uploadpage",},
    // {id: 1, task: "katalon",feedback: "good work",given: 'A' ,rating:"5" },
    // {id: 2, task: "tosca",feedback: "improve more",given: 'B' ,rating: "3"  },
    // {id: 3, task: "Qtest",feedback: "good work",given: 'C' ,rating: "4"  },
  ]);

 
const { empId,jobId,employeeId } = useAuth();

  // const rating;
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
    <div className="feedbackreceivemanager-container">
      <div className="feedbackreceivemanager-table-container">
        <table className="feedbackreceivemanager-custom-table">
          <thead>
            <tr>
              <th className="feedbackreceivemanager-tableheader">S.No</th>
              
              <th className="feedbackreceivemanager-tableheader">Task</th>
              <th className="feedbackreceivemanager-tableheader">Feedback</th>
              <th className="feedbackreceivemanager-tableheader">Given By</th>
              <th className="feedbackreceivemanager-tableheader">Rating</th>
             
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
          
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default Feedback;