// import React, { useState, useRef, useEffect } from 'react';
// import './SubHeader.css';


// export default function Header() {

//   return (
//     <div>
//       <nav className="navbar header-sub">
//         <div className="container">
//           <div className="subheader-content">
//             <button className="each-content">Personal Document</button>
//             <button className="each-content">Achievement Document</button>
//             {/* <button className="each-content">Organizational Tree</button> */}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import './SubHeader.css';
// import Documents from '../UploadDocument/Documents';

// export default function Header() {
//   const [selectedDocumentType, setSelectedDocumentType] = useState("Personal Document");

//   const handleDocumentButtonClick = (documentType) => {
//     setSelectedDocumentType(documentType);
//   };

//   return (
//     <>
//       <nav className="navbar header-sub">
//         <div className="container">
//           <div className="subheader-content">
//             <button
//               className={`each-content ${selectedDocumentType === "Personal Document" ? "active" : ""}`}
//               onClick={() => handleDocumentButtonClick("Personal Document")}
//             >
//               Personal Document
//             </button>
            
//             <button
//               className={`each-content ${selectedDocumentType === "Achievement Document" ? "active" : ""}`}
//               onClick={() => handleDocumentButtonClick("Achievement Document")}
//             >
//               Achievement Document
//             </button>
//           </div>
//         </div>
//       </nav>
//       {selectedDocumentType && (
//         <Documents showPersonalDocumentDropdown={selectedDocumentType === "Personal Document"} />
//       )}
//     </>
//   );
// }

