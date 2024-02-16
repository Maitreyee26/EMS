// import React from 'react'
// import "./ApproveReject.css"
// import { TiTickOutline } from "react-icons/ti";
// import { RxCross2 } from "react-icons/rx";

// export default function ApproveReject() {
//   return (
//     <div>
//       <div className="approvereject">
//         <p className='approve-text'>if you want to approve the request click on <strong>"Approve"</strong> button</p>
//         <p className='reject-text'>if you want to reject the request click on <strong>"Reject"</strong> button</p>
//         <button className="approve"><p><TiTickOutline className='tick'/></p>Approve </button>
//         <button className="reject"><p><RxCross2 className='tick'/></p>Reject</button>
//       </div>
//     </div>
//   )
// }

import React from 'react';
import "./ApproveRejectDocument .css";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
const API_URL = "http://localhost:8080"; // Replace with your actual backend API URL

const ApproveReject = ({ fileId}) => {
  const handleAction = async (action) => {
    try {
      const response = await axios.put(
        `${API_URL}/changeFileStatus/${fileId}/${action}`
      );
  
      if (!response.ok) {
        console.error('Error:', response.statusText);
      } else {
        const result = response.data;
        console.log('Success:', result);
  
        // Perform additional actions if needed (e.g., update UI, show a success message)
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <div className="approvereject">
        <p className='approve-text'>if you want to approve the request click on <strong>"Approve"</strong> button</p>
        <p className='reject-text'>if you want to reject the request click on <strong>"Reject"</strong> button</p>
        <button className="approve" onClick={() => handleAction('Approve')}>
          <p><TiTickOutline className='tick'/></p>Approve
        </button>
        <button className="reject" onClick={() => handleAction('Reject')}>
          <p><RxCross2 className='tick'/></p>Reject
        </button>
      </div>
    </div>
  );
};

export default ApproveReject;


