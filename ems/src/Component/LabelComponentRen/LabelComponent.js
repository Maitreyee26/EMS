// // LabelComponent.js

// import React from "react";
// import "./LabelComponent.css";

// const LabelComponent = ({ label, inputType, value, onChange, options }) => {
//   return (
//     <div className="custom-group">
//       {inputType === "select" ? (
//         <select value={value} onChange={onChange} className="custom-input">
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           required
//           // placeholder={inputType === "date" ?"" : null}
//           type={inputType}
//           value={value}
//           onChange={onChange}
//           className="custom-input"
//         />
//       )}
//       <span className="custom-highlight"></span>
//       <span className="custom-bar"></span>
//       <label className="label-class">{label}</label>
//     </div>
//   );
// };

// export default LabelComponent;



// import React from "react";
// import "./LabelComponent.css";
 
// const LabelComponent = ({ label, inputType, value, onChange, options }) => {
//   const handleInputChange = (e) => {
//     if (e && e.target && e.target.value !== undefined) {
//       const inputValue = e.target.value;
//       const inputType = e.target.type; // Assuming inputType is defined elsewhere
  
//       if (onChange && typeof onChange === "function") {
//         console.log("Input Value:", inputValue);
//         onChange(inputValue); // Pass the input value directly to onChange
//       }
//     } else {
//       console.error("Invalid event or event target:", e);
//     }
//   };
  

 
//   return (
//     <div className="custom-group">
//       {inputType === "select" && (
//         <select onChange={handleInputChange} value={value} className="custom-input">
//           <option key="default" value="" disabled hidden>
//             Select
//           </option>
//           {options && options.map((option, index) => (
//             <option key={`option-${index}`} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       )}
//       {inputType !== "select" && (
//         <input
//           required
//           type={inputType}
//           value={value}
//           onChange={handleInputChange}
//           className="custom-input"
//         />
//       )}
//       <span className="custom-highlight"></span>
//       <span className="custom-bar"></span>
//       <label className="label-class">{label}</label>
//     </div>
//   );
// };
 
// export default LabelComponent;





// const LabelComponent = ({ label, inputType, value, onChange, options }) => {
//   return (
//     <div className="custom-group">
//       {inputType === "select" ? (
//         <select value={value} onChange={onChange} className="custom-input">
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           required
//           type={inputType}
//           value={value}
//           onChange={onChange}
//           className="custom-input"
//         />
//       )}
//       <span className="custom-highlight"></span>
//       <span className="custom-bar"></span>
//       <label className="label-class">{label}</label>
//     </div>
//   );
// };
 
// export default LabelComponent;
// import React from "react";
// import "./LabelComponent.css";

// const LabelComponent = ({ label, inputType, value, onChange, options }) => {
//   const handleInputChange = (e) => {
//     const selectedValue = e.target.value;
//     const selectedOption = options.find((option) => option.value === selectedValue);

//     if (onChange && typeof onChange === "function") {
//       onChange(selectedOption);
//     }
//   };

//   return (
//     <div className="custom-group">
//       {inputType === "select" ? (
//         <select value={value} onChange={handleInputChange} className="custom-input">
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           required
//           type={inputType}
//           value={value}
//           onChange={handleInputChange}
//           className="custom-input"
//         />
//       )}
//       <span className="custom-highlight"></span>
//       <span className="custom-bar"></span>
//       <label className="label-class">{label}</label>
//     </div>
//   );
// };
// export default LabelComponent;
// import React from "react";
// import "./LabelComponent.css";
 
// const LabelComponent = ({ label, inputType, value, onChange, options }) => {
//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     if (onChange && typeof onChange === "function") {
//       onChange(inputValue);
//     }
//   };
//   return (
//     <div className="custom-group">
//       {inputType === "select" && (
//         <select onChange={handleInputChange} className="custom-input">
//           <option key="default" value="" disabled hidden>
//             Select
//           </option>
//           {options && options.map((option, index) => (
//             <option key={`option-${index}`} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       )}
//       {inputType !== "select" && (
//         <input
//           required
//           type={inputType}
//           value={value}
//           onChange={handleInputChange}
//           className="custom-input"
//         />
//       )}
//       <span className="custom-highlight"></span>
//       <span className="custom-bar"></span>
//       <label className="label-class">{label}</label>
//     </div>
//   );
// };
 
// export default LabelComponent;


import React from "react";
import "./LabelComponent.css";

const LabelComponent = ({ label, inputType, value, onChange, options }) => {
  const handleInputChange = (e) => {
    console.log('Event:', e);
    if (e && e.target) {
      const inputValue = e.target.value;
      if (onChange && typeof onChange === "function") {
        onChange(inputValue);
      }
    } else {
      console.error('Invalid event or event target is undefined:', e);
    }
  };
  return (
    <div className="custom-group">
      {inputType === "select" && (
        <select
          onChange={handleInputChange}
          className="custom-input"
          value={value || ""} // Set value to an empty string if it's undefined
        >
          <option key="default" value="" disabled hidden>
            Select
          </option>
          {options &&
            options.map((option, index) => (
              <option key={`option-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      )}
      {inputType !== "select" && (
       <input
       required
       type={inputType}
       value={value || ''} // Ensure value is not undefined
       onChange={handleInputChange}
       className="custom-input"
     />
      )}
      <span className="custom-highlight"></span>
      <span className="custom-bar"></span>
      <label className="label-class">{label}</label>
    </div>
  );
};

export default LabelComponent;