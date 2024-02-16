import React from 'react';
import Calendar from './Calender';
import Feed from './Feed';
import './DashBoard.css'
const DashBoard = () => {
  return (
    <div className="calendar-feed-container">
      <Calendar style={{float:"left",width:"50vw",background:"red"}}/>
      <Feed style={{float:"right",boxShadow: "0 2px 5px rgba(3, 3, 3, 0.2)"}}/>
    </div>
  );
};

export default DashBoard;
