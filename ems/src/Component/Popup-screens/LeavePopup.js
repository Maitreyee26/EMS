// // LeavePopup.js
// import React from "react";
// import "./LeavePopup.css";
// import LabelComponent from "../LabelComponent";

// const LeavePopup = ({
//   startDate,
//   endDate,
//   leaveType,
//   notes,
//   handleStartDateChange,
//   handleEndDateChange,
//   handleLeaveTypeChange,
//   handleRequestLeave,
//   handleCancel,
//   handlenotes,
// }) => {
//   return (
//     <div className="leave-popup">
//       <div
//         className="dates-leavepopup"
//         style={{ display: "flex", gap: "20px" }}
//       >
//         <LabelComponent
//           label="Start Date:"
//           inputType="date"
//           value={startDate}
//           onChange={(e) => handleStartDateChange(e.target.value)}
//           className="attendance-label-input attendance-startdate"
//         />
//         <LabelComponent
//           label="End Date:"
//           inputType="date"
//           value={endDate}
//           onChange={(e) => handleEndDateChange(e.target.value)}
//           className="attendance-label-input attendance-enddate"
//         />
//       </div>
//       <div
//         className="type-note-leave"
//         style={{ display: "flex", gap: "20px", marginTop: "30px" }}
//       >

//         <LabelComponent
//           inputType="select"
//           value={leaveType}
//           onChange={(e) => handleLeaveTypeChange(e.target.value)}
//           className="attendance-label-input attendance-type"
//           options={[
//             { value:"", label: "Leave Type" },
//             { value: "Sick Leave", label: "Sick Leave" },
//             { value: "Floater Leave", label: "Floater Leave" },
//             { value: "Casual Leave", label: "Casual Leave" },
//           ]}
//         />

//         <LabelComponent
//           label="Notes"
//           inputType="text"
//           value={notes}
//           onChange={(e) => handlenotes(e.target.value)}
//           className="attendance-label-input attendance-notes"
//         />
//       </div>

//       <div className="button-container">
//         <button className="leave-request-cancel-button" onClick={handleRequestLeave}>Request</button>
//         <button className="leave-request-cancel-button" onClick={handleCancel}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default LeavePopup;

// LeavePopup.js
// LeavePopup.js
import React from "react";
import "./LeavePopup.css";
import LabelComponent from "../LabelComponentRen/LabelComponent";

const LeavePopup = ({
  startDate,
  endDate,
  leaveType,
  notes,
  halfDayStartDate,
  halfDayEndDate,
  handleStartDateChange,
  handleEndDateChange,
  handleLeaveTypeChange,
  handleRequestLeave,
  handleCancel,
  handlenotes,
  handleHalfDayStartDateChange,
  handleHalfDayEndDateChange,
  notify,
  handleNotifyChange,
  options,
}) => {
  const isSameDate = startDate === endDate;
  const handleInputChange = (field, value) => {
    if (options) {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        // setLeaveDetails({
        //   ...leaveDetails,
        //   [field]: selectedOption.value,
        // });
      } else {
        console.error(`Option with value ${value} not found`);
      }
    } else {
      console.error('Options array is undefined');
    }
  };
  const isEndDateValid = () => {
    return new Date(endDate) >= new Date(startDate);
  };

  const handleRequest = () => {
    if (isEndDateValid()) {
      handleRequestLeave();
    } else {
      alert("End date should not be greater than or equal to the start date");
    }
  };

  return (
    <div className="leave-popup">
      <div className="dates-leavepopup" style={{ display: "flex", gap: "20px" }}>
        <LabelComponent
          label="Start Date:"
          inputType="date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          className="attendance-label-input attendance-startdate"
        />
        <LabelComponent
          label="End Date:"
          inputType="date"
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
          className="attendance-label-input attendance-enddate"
        />
      </div>

      <div className="type-note-leave" style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <LabelComponent
          inputType="select"
          value={leaveType}
          onChange={(e) => handleLeaveTypeChange(e.target.value)}
          className="attendance-label-input attendance-type"
           options={options} 
        />

        <LabelComponent
          label="Notes"
          inputType="text"
          value={notes}
          onChange={(e) => handlenotes(e.target.value)}
          className="attendance-label-input attendance-notes"
        />
      </div>

      {isSameDate ? (
        <div className="half-full-day-dropdowns" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <LabelComponent
            inputType="select"
            style={{ marginTop: "100px" }}
            value={halfDayStartDate}
            onChange={(e) => handleHalfDayStartDateChange(e.target.value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Select" },
              { value: "First Half", label: "First Half" },
              { value: "Second Half", label: "Second Half" },
              { value: "Full Day", label: "Full Day" },
            ]}
          />

          <LabelComponent
            label="Notify"
            inputType="text"
            value={notify}
            style={{ border: "2px solid red" }}
            onChange={(e) => handleNotifyChange(e.target.value)}
            className="attendance-label-input attendance-notify"
          />
        </div>
      ) : (
        <div className="half-full-day-dropdowns" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <LabelComponent
            label="Start Date:"
            inputType="select"
            value={halfDayStartDate}
            onChange={(e) => handleHalfDayStartDateChange(e.target.value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Select" },
              { value: "First Half", label: "First Half" },
              { value: "Second Half", label: "Second Half" },
            ]}
          />
          <LabelComponent
            label="End Date:"
            inputType="select"
            value={halfDayEndDate}
            onChange={(e) => handleHalfDayEndDateChange(e.target.value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Select" },
              { value: "First Half", label: "First Half" },
              { value: "Second Half", label: "Second Half" },
            ]}
          />
          <LabelComponent
            label="Notify"
            inputType="text"
            value={notify}
            style={{ border: "2px solid red" }}
            onChange={(e) => handleNotifyChange(e.target.value)}
            className="attendance-label-input attendance-notify"
          />
        </div>
      )}

      <div className="button-container">
        <button className="leave-request-cancel-button" onClick={handleRequest}>
          Request Leave
        </button>

        <button className="leave-request-cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LeavePopup;




//className="leave-request-cancel-button"
{
  /* <LabelComponent
            label="Start Date:"
            inputType="select"
            value={halfDayStartDate}
            onChange={(e) => handleHalfDayStartDateChange(e.target.value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Select" },
              { value: "First Half", label: "First Half" },
              { value: "Second Half", label: "Second Half" },
            ]}
          />
          <LabelComponent
            label="End Date:"
            inputType="select"
            value={halfDayEndDate}
            onChange={(e) => handleHalfDayEndDateChange(e.target.value)}
            className="attendance-label-input attendance-half-full-day"
            options={[
              { value: "", label: "Select" },
              { value: "First Half", label: "First Half" },
              { value: "Second Half", label: "Second Half" },
            ]}
          /> */
}
