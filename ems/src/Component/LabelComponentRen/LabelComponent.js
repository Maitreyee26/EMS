// // LabelComponent.js

// import React from "react";
// import "./LabelComponent.css";

// const LabelComponent = ({ label, inputType, value, onChange, options }) => {
//   return (
//     <div className="Labelcomponent-custom-group">
//       {inputType === "select" ? (
//         <select value={value} onChange={onChange} className="Labelcomponent-custom-input">
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
//           className="Labelcomponent-custom-input"
//         />
//       )}
//       <span className="Labelcomponent-custom-highlight"></span>
//       <span className="Labelcomponent-custom-bar"></span>
//       <label className="Labelcomponent-label-class">{label}</label>
//     </div>
//   );
// };
 
// export default LabelComponent;
// Inside LabelComponent.js


// import React from "react";
// import "./LabelComponent.css";

// const LabelComponent = ({ label, inputType, value, onChange, options }) => {
//   return (
//     <div className="Labelcomponent-custom-group">
//       {inputType === "select" ? (
//         <select value={value} onChange={onChange} className="Labelcomponent-custom-input">
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
//           className="Labelcomponent-custom-input"
//         />
//       )}
//       <span className="Labelcomponent-custom-highlight"></span>
//       <span className="Labelcomponent-custom-bar"></span>
//       <label className="Labelcomponent-label-class">{label}</label>
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
//     <div className="Labelcomponent-custom-group">
//       {inputType === "select" ? (
//         <select value={value} onChange={handleInputChange} className="Labelcomponent-custom-input">
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
//           className="Labelcomponent-custom-input"
//         />
//       )}
//       <span className="Labelcomponent-custom-highlight"></span>
//       <span className="Labelcomponent-custom-bar"></span>
//       <label className="Labelcomponent-label-class">{label}</label>
//     </div>
//   );
// };

// export default LabelComponent;

//3rd code 

// import React from "react";
// import "./LabelComponent.css";

// const LabelComponent = ({ label, inputType, value, onChange, options }) => {
//   const handleInputChange = (e) => {
//     const inputValue = inputType === "date" ? e.target.value : e.target.value;

//     if (onChange && typeof onChange === "function") {
//       if (inputType === "select") {
//         const selectedOption = options ? options.find((option) => option.value === inputValue) : null;
//         onChange(selectedOption);
//       } else {
//         onChange(inputValue);
//       }
//     }
//   };

//   return (
//     <div className="Labelcomponent-custom-group">
//       {inputType === "select" && (
//         <select onChange={handleInputChange} className="Labelcomponent-custom-input">
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
//           className="Labelcomponent-custom-input"
//         />
//       )}
//       <span className="Labelcomponent-custom-highlight"></span>
//       <span className="Labelcomponent-custom-bar"></span>
//       <label className="Labelcomponent-label-class">{label}</label>
//     </div>
//   );
// };

// export default LabelComponent;

import React from "react";
import "./LabelComponent.css";

const LabelComponent = ({ label, inputType, value, onChange, options, min, max }) => {
  const handleInputChange = (e) => {
    const inputValue = inputType === "date" ? e.target.value : e.target.value;

    if (onChange && typeof onChange === "function") {
      if (inputType === "select") {
        const selectedOption = options ? options.find((option) => option.value === inputValue) : null;
        onChange(selectedOption);
      } else {
        onChange(inputValue);
      }
    }
  };

  return (
    <div className="Labelcomponent-custom-group">
      {inputType === "select" && (
        <select onChange={handleInputChange} className="Labelcomponent-custom-input">
          <option key="default" value="" disabled hidden>
            Select
          </option>
          {options && options.map((option, index) => (
            <option key={`option-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {inputType === "date" && (
        <input
          required
          type={inputType}
          value={value}
          onChange={handleInputChange}
          className="Labelcomponent-custom-input"
          min={min}
          max={max}
        />
      )}
      {inputType !== "select" && inputType !== "date" && (
        <input
          required
          type={inputType}
          value={value}
          onChange={handleInputChange}
          className="Labelcomponent-custom-input"
        />
      )}
      <span className="Labelcomponent-custom-highlight"></span>
      <span className="Labelcomponent-custom-bar"></span>
      <label className="Labelcomponent-label-class">{label}</label>
    </div>
  );
};

export default LabelComponent;








