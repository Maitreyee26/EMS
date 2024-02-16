// EmployeeLeaveChart.js
import React, { useState } from 'react';
import './BarchartForLeave.css';

const EmployeeLeaveChart = () => {
  const [data] = useState([
    { type: 'Vacation', consumed: 5, remaining: 15 },
    { type: 'Sick Leave', consumed: 3, remaining: 12 },
    { type: 'Personal Leave', consumed: 2, remaining: 8 },
  ]);

  const [hoveredBar, setHoveredBar] = useState(null);

  const handleMouseOver = (index) => {
    setHoveredBar(index);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  return (
    <div className="bar-graph-container">
      {data.map((leave, index) => (
        <div
          key={index}
          className={`bar ${hoveredBar === index ? 'hovered' : ''}`}
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="consumed"
            style={{ height: `${(leave.consumed / (leave.consumed + leave.remaining)) * 100}%` }}
          />
          <div
            className="remaining"
            style={{ height: `${(leave.remaining / (leave.consumed + leave.remaining)) * 100}%` }}
          />
          {hoveredBar === index && (
            <span className="tooltip">
              {`${leave.type} - Consumed: ${leave.consumed}, Remaining: ${leave.remaining}`}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployeeLeaveChart;
