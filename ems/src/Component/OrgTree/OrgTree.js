// import React, { useState } from "react";
// import { OrganizationChart } from "primereact/organizationchart";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import './OrgTree.css'

// export default function ColoredDemo() {

//   const [data] = useState([
//     {
//       expanded: true,
//       type: "person",
//       className: " text-black",
//       style: {
//         borderRadius: "12px",
//         boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//         padding: "10px",
//         width: "150px",
//         textAlign: "center"
//       },
//       data: {
//         image:
//           "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
//         name: "Ema",
//         title: "CEO",
//       },
//       children: [
//         {
//           expanded: true,
//           type: "person",
//           className: "text-black",
//           style: {
//             borderRadius: "12px",
//             boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//             padding: "10px",
//             width: "150px",
//             textAlign: "center",
//           },
//           data: {
//             image:
//               "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//             name: "John",
//             title: "IT Head",
//           },
//           children: [
//             {
//               expanded: true,
//               type: "person",
//               className: " text-black",
//               style: {
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                 padding: "10px",
//                 width: "150px",
//                 textAlign: "center",
//               },
//               data: {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                 name: "Rik",
//                 title: "IT",
//               },
//               children: [
//                 {
//                   expanded: true,
//                   type: "person",
//                   className: " text-black",
//                   style: {
//                     borderRadius: "12px",
//                     boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                     padding: "10px",
//                     width: "150px",
//                     textAlign: "center",
//                   },
//                   data: {
//                     image:
//                       "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                     name: "Anna Fali",
//                     title: "IT",
//                   },
//                 },
//               ],
//             },
//             {
//               expanded: true,
//               type: "person",
//               className: " text-black",
//               style: {
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                 padding: "10px",
//                 width: "150px",
//                 textAlign: "center",
//               },
//               data: {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                 name: "Anna Fali",
//                 title: "IT",
//               },
//             },
//             {
//               expanded: true,
//               type: "person",
//               className: " text-black",
//               style: {
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                 padding: "10px",
//                 width: "150px",
//                 textAlign: "center",
//               },
//               data: {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                 name: "Anna Fali",
//                 title: "IT",
//               },
//             },
//             {
//               expanded: true,
//               type: "person",
//               className: " text-black",
//               style: {
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                 padding: "10px",
//                 width: "150px",
//                 textAlign: "center",
//               },
//               data: {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                 name: "Anna Fali",
//                 title: "IT",
//               },
//             },
//           ],
//         },
//         {
//           expanded: true,
//           type: "person",
//           className: "text-black",
//           style: {
//             borderRadius: "12px",
//             boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//             padding: "10px",
//             width: "150px",
//             textAlign: "center",
//           },
//           data: {
//             image:
//               "https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png",
//             name: "Stephen Shaw",
//             title: "MARKETING HEAD",
//           },
//           children: [
//             {
//               expanded: true,
//               type: "person",
//               className: " text-black",
//               style: {
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                 padding: "10px",
//                 width: "150px",
//                 textAlign: "center",
//               },
//               data: {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                 name: "Anna Fali",
//                 title: "Marketing",
//               },
//             },
//             {
//               expanded: true,
//               type: "person",
//               className: " text-black",
//               style: {
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                 padding: "10px",
//                 width: "150px",
//                 textAlign: "center",
//               },
//               data: {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                 name: "Anna Fali",
//                 title: "Marketing",
//               },
//             },
//             {
//               expanded: true,
//               type: "person",
//               className: " text-black",
//               style: {
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                 padding: "10px",
//                 width: "150px",
//                 textAlign: "center",
//               },
//               data: {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                 name: "Anna Fali",
//                 title: "Marketing",
//               },
//             },
//             {
//               expanded: true,
//               type: "person",
//               className: " text-black",
//               style: {
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//                 padding: "10px",
//                 width: "150px",
//                 textAlign: "center",
//               },
//               data: {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
//                 name: "Anna Fali",
//                 title: "Marketing",
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   // const nodeTemplate = (node) => {
//   //   if (node.type === "person") {
//   //     return (
//   //       <div>
//   //         <div>
//   //           <img
//   //             alt={node.data.name}
//   //             src={node.data.image}
//   //             style={{ width: "60px", height: "60px", borderRadius: "50%" }}
//   //           />
//   //           <span  style={{display:"flex",justifyContent:"center",fontWeight:"600"}}>{node.data.name}</span>

//   //           <span>{node.data.title}</span>
//   //         </div>
//   //       </div>
//   //     );
//   //   }
//   //   return node.label;
//   // };

//   const nodeTemplate = (node) => {
//     const isPerson = node.type === "person";
//     const isExpanded = node.expanded;

//     const containerStyle = {
//       // borderRadius: "12px",
//       // boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//       // padding: "10px",
//       // width: "150px",
//       // textAlign: "center",
//       border: isPerson && isExpanded ? "1px solid black" : "none", // Apply border for expanded person nodes
//     };

//     if (isPerson) {
//       return (
//         <div>
//           <div style={containerStyle}>
//             <img
//               alt={node.data.name}
//               src={node.data.image}
//               style={{ width: "60px", height: "60px", borderRadius: "50%" }}
//             />
//             <span style={{ display: "flex", justifyContent: "center", fontWeight: "600" }}>{node.data.name}</span>
//             <span>{node.data.title}</span>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div style={containerStyle}>
//         {node.children && (
//           <button
//             style={{ position: "absolute", right: "5px", top: "5px", cursor: "pointer" }}
//             onClick={() => node.toggle()}
//           >
//             {isExpanded ? "▼" : "►"}
//           </button>
//         )}
//         <div>{node.label}</div>
//       </div>
//     );
//   };
  
 

   


//   return (
//     <div
//       className="card overflow-x-auto "
//       style={{
//         maxWidth: "1050px",
//         marginLeft: "150px",
//         marginTop: "30px",
//         marginBottom: "30px",
//         boxShadow: "0 2px 5px rgba(3, 3, 3, 0.8)",
//         padding: "20px",
//         background:"transparent",
//       }}
//     >
//       <OrganizationChart value={data} nodeTemplate={nodeTemplate} className="org"/>
//     </div>
//   );

 
// }


 
// import React from 'react';
// import Tree from 'react-d3-tree';

// // This is a simplified example of an org chart with a depth of 2.
// // Note how deeper levels are defined recursively via the `children` property.
// const orgChart = {
//   name: 'CEO',
//   children: [
//     {
//       name: 'Manager',
//       attributes: {
//         department: 'Production',
//       },
//       children: [
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Fabrication',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Assembly',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// export default function OrgChartTree() {
//   return (
//     // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
//     <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
//       <Tree data={orgChart} />
//     </div>
//   );
// }




// import React,{useState} from 'react';
// import './OrgTree.css'
// const data = [
//   {
//     id: 1,
//     expanded: true,
//     name: "John Doe",
//     title: "CEO",
//     image: "https://example.com/person1.jpg",
//     children: [
//       {
//         id: 2,
//         expanded: false,
//         name: "Jane Smith",
//         title: "COO",
//         image: "https://example.com/person2.jpg",
//         children: [
//           {
//             id: 5,
//             expanded: false,
//             name: "Emily Johnson",
//             title: "VP of Marketing",
//             image: "https://example.com/person5.jpg",
//             children: [],
//           },
//           {
//             id: 6,
//             expanded: false,
//             name: "David Lee",
//             title: "VP of Sales",
//             image: "https://example.com/person6.jpg",
//             children: [],
//           },
//         ],
//       },
//       {
//         id: 3,
//         expanded: false,
//         name: "Bob Brown",
//         title: "CTO",
//         image: "https://example.com/person3.jpg",
//         children: [],
//       },
//       {
//         id: 4,
//         expanded: false,
//         name: "Anna White",
//         title: "CFO",
//         image: "https://example.com/person4.jpg",
//         children: [],
//       },
//     ],
//   },
// ];

// const Node = ({ node, onClick }) => {
//   return (
//     <div className="node">
//       <img src={node.image} alt={node.name} />
//       <div className="node-info">
//         <h4>{node.name}</h4>
//         <p>{node.title}</p>
//       </div>
//       {node.expanded && (
//         <ul>
//           {node.children.map((child) => (
//             <Node key={child.id} node={child} onClick={onClick} />
//           ))}
//         </ul>
//       )}
//       <button onClick={() => onClick(node)}>
//         {node.expanded ? "Collapse" : "Expand"}
//       </button>
//     </div>
//   );
// };

// const OrganizationTree = () => {
//   const [treeData, setTreeData] = useState(data);
//   const updateNodeInTree = (nodes, id, updates) => {
//     return nodes.map((node) => {
//       if (node.id === id) {
//         // Toggle the expanded state of the clicked node
//         return { ...node, expanded: !node.expanded };
//       } else if (node.children) {
//         // Recursively update child nodes
//         return { ...node, children: updateNodeInTree(node.children, id, updates) };
//       }
//       return node;
//     });
//   };

  
//   const handleNodeClick = (node) => {
//     // Update the expanded state of the clicked node (and potentially its children)
//     setTreeData((prevTreeData) => updateNodeInTree(prevTreeData, node.id, {}));
//   };
//   return (
//     <div className="tree">
//       <Node node={treeData[0]} onClick={handleNodeClick} />
//     </div>
//   );
// };

// export default OrganizationTree;





//chat

// const data = [
//   {
//     id: 1,
//     expanded: true,
//     name: 'John Doe',
//     title: 'CEO',
//     image: 'https://example.com/person1.jpg',
//     children: [
//       {
//         id: 2,
//         expanded: false,
//         name: 'Jane Smith',
//         title: 'COO',
//         image: 'https://example.com/person2.jpg',
//         children: [
//           {
//             id: 5,
//             expanded: false,
//             name: 'Emily Johnson',
//             title: 'VP of Marketing',
//             image: 'https://example.com/person5.jpg',
//             children: [],
//           },
//           {
//             id: 6,
//             expanded: false,
//             name: 'David Lee',
//             title: 'VP of Sales',
//             image: 'https://example.com/person6.jpg',
//             children: [],
//           },
//         ],
//       },
//       {
//         id: 3,
//         expanded: false,
//         name: 'Bob Brown',
//         title: 'CTO',
//         image: 'https://example.com/person3.jpg',
//         children: [],
//       },
//       {
//         id: 4,
//         expanded: false,
//         name: 'Anna White',
//         title: 'CFO',
//         image: 'https://example.com/person4.jpg',
//         children: [],
//       },
//     ],
//   },
// ];

// const Node = ({ node, onClick }) => {
//   return (
//     <div className="node" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <img src={node.image} alt={node.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//       <div className="node-info" style={{ textAlign: 'center' }}>
//         <h4>{node.name}</h4>
//         <p>{node.title}</p>
//       </div>
//       {node.expanded && (
//         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
//           {node.children.map((child) => (
//             <Node key={child.id} node={child} onClick={onClick} />
//           ))}
//         </div>
//       )}
//       <button onClick={() => onClick(node)}>
//         {node.expanded ? 'Collapse' : 'Expand'}
//       </button>
//     </div>
//   );
// };

// const OrganizationTree = () => {
//   const [treeData, setTreeData] = useState(data);

//   const updateNodeInTree = (nodes, id, updates) => {
//     return nodes.map((node) => {
//       if (node.id === id) {
//         // Toggle the expanded state of the clicked node
//         return { ...node, expanded: !node.expanded };
//       } else if (node.children) {
//         // Recursively update child nodes
//         return { ...node, children: updateNodeInTree(node.children, id, updates) };
//       }
//       return node;
//     });
//   };

//   const handleNodeClick = (node) => {
//     // Update the expanded state of the clicked node (and potentially its children)
//     setTreeData((prevTreeData) => updateNodeInTree(prevTreeData, node.id, {}));
//   };

//   return (
//     <div className="tree" style={{ display: 'flex', justifyContent: 'center' }}>
//       <Node node={treeData[0]} onClick={handleNodeClick} />
//     </div>
//   );
// };

// export default OrganizationTree;
// import React, { useEffect, useState, useRef } from 'react';

// const OrganizationalTree = () => {
//   const [data, setData] = useState(null);
//   const nodeRef = useRef(null);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/your-data-endpoint');
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className='org-tree'>
//       <div ref={nodeRef} />
//     </div>
//   );
// };
// export default OrganizationalTree
// import React, { useState, useEffect } from 'react';
// import vis from 'vis'; // Assuming Vis.js is installed in your project
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Organization = () => {
//   const [parents, setParents] = useState([]);
//   const [children, setChildren] = useState({});

//   useEffect(() => {
//     // Fetch parent nodes
//     axios.get('http://localhost:8080/findByEmployeeTypeEmployeeTypeId')
//       .then(response => setParents(response.data))
//       .catch(error => console.error('Error fetching parents:', error));
//       console.log(parents);
//   }, []);

//   const fetchChildren = parentId => {
//     // Fetch child nodes for a given parent
//     axios.get(`http://localhost:8080/getEmployeesByManagerId/$${parentId}`)
//       .then(response => setChildren(prevChildren => ({ ...prevChildren, [parentId]: response.data })))
//       .catch(error => console.error(`Error fetching children for parent ${parentId}:`, error));
//   };

//   return (
//     <div>
//       <h1>Organization Structure</h1>
//       <ul>
//         {parents.map(parent => (
//           <li key={parent.id}>
//             {parent.name}
//             <ul>
//               {children[parent.id] && children[parent.id].map(child => (
//                 <li key={child.id}>{child.name}</li>
//               ))}
//             </ul>
//             <button onClick={() => fetchChildren(parent.id)}>Load Children</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Organization;



// import React, { useState, useEffect } from 'react';
// import './OrgTree.css';

// const Organization = () => {
//   const [parents, setParents] = useState([]);
//   const [children, setChildren] = useState({});


// const fetchParents = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/findByEmployeeTypeEmployeeTypeId');

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);
//       setParents(data);
//     } catch (error) {
//       console.error('Error fetching parents:', error);
//     }
//   };

//   const fetchChildren = async (parentId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/getEmployeesByManagerId/${parentId}`);
//       const data = await response.json();
//       console.log("parentId", parentId);
//       setChildren((prevChildren) => ({ ...prevChildren, [parentId]: data }));
//     } catch (error) {
//       console.error(`Error fetching children for parent ${parentId}:`, error);
//     }
//   };

//   useEffect(() => {
//     fetchParents();
//   }, []);
//   const renderConnectionLines = (parent, childrenIds) => {
//     return childrenIds.map((childId) => (
//       <line
//         key={`${parent.empId}-${childId}`}
//         x1="0" y1="0"
//         x2="0" y2="100%" // Adjust the percentage based on your layout
//         stroke="black"
//       />
//     ));
//   };
//   return (
//     <div className="org-tree">
//       <h1>Organization Structure</h1>

//       <ul>
//         {parents.map((parent) => (
//           <li key={parent.empId}>
//             <div>
//               {parent.emp_name}
//               <ul>
//                 {children[parent.empId] &&
//                   children[parent.empId].map((child) => (
//                     <li key={child.empId}>
//                       {child.emp_name}
//                       {children[child.empId] &&
//                         renderConnectionLines(child, children[child.empId].map((c) => c.empId))
//                       }
//                     </li>
//                   ))}
//               </ul>
//               <button onClick={() => fetchChildren(parent.empId)}>Load Children</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Organization;
// import React, { useState, useEffect } from 'react';
// import './OrgTree.css';
// const Organization = () => {
//   const [parents, setParents] = useState([]);
//   const [children, setChildren] = useState({});

//   const fetchParents = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/findByEmployeeTypeEmployeeTypeId');

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);
//       setParents(data);
//     } catch (error) {
//       console.error('Error fetching parents:', error);
//     }
//   };

//   const fetchChildren = async (parentId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/getChildrenByParentId/${parentId}`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("parentId", parentId);
//       setChildren((prevChildren) => ({ ...prevChildren, [parentId]: data }));
//     } catch (error) {
//       console.error(`Error fetching children for parent ${parentId}:`, error);
//     }
//   };

//   useEffect(() => {
//     fetchParents();
//   }, []);

//   const renderConnectionLines = (parent, childrenIds) => {
//     return childrenIds.map((childId) => (
//       <line
//         key={`${parent.empId}-${childId}`}
//         x1="0" y1="0"
//         x2="0" y2="100%" // Adjust the percentage based on your layout
//         stroke="black"
//       />
//     ));
//   };

//   return (
//     <div className="org-tree">
//       <h1>Organization Structure</h1>
//       <ul>
//         {parents.map((parent) => (
//           <li key={parent.empId}>
//             {parent.emp_name}
//             <ul>
//               {children[parent.empId] &&
//                 children[parent.empId].map((child) => (
//                   <li key={child.empId}>
//                     {child.emp_name}
//                     {children[child.empId] &&
//                       renderConnectionLines(child, children[child.empId].map((c) => c.empId))
//                     }
//                   </li>
//                 ))}
//             </ul>
//             <button onClick={() => fetchChildren(parent.empId)}>Load Children</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Organization;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrganizationTree() {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    // Fetch employee data from the database
    axios.get('http://localhost:8080/getAllEmployees')
      .then(response => {
        setEmployeeData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const organizeEmployees = () => {
    const hierarchy = {};

    // Group employees by employee_type_id
    employeeData.forEach(employee => {
      if (!hierarchy[employee.employeeType.employeeTypeId]) {
        hierarchy[employee.employeeType.employeeTypeId] = [];
      }
      hierarchy[employee.employeeType.employeeTypeId].push(employee);
    });

    const organizationTree = {
      Level1: hierarchy[3] || [],
      Level2: {},
      Level3: {}
    };

    // Assign Level 2 employees to their respective Level 1 superiors
    organizationTree.Level1.forEach(level1Employee => {
      organizationTree.Level2[level1Employee.id] = hierarchy[2]
        ? hierarchy[2].filter(level2Employee => level2Employee.superior_id === level1Employee.id)
        : [];
    });

    // Assign Level 3 employees to their respective Level 2 superiors
    Object.keys(organizationTree.Level2).forEach(level1Id => {
      organizationTree.Level2[level1Id].forEach(level2Employee => {
        organizationTree.Level3[level2Employee.id] = hierarchy[1]
          ? hierarchy[1].filter(level3Employee => level3Employee.superior_id === level2Employee.id)
          : [];
      });
    });

    return organizationTree;
  };

  const renderTree = () => {
    const organizationTree = organizeEmployees();

    return (
      <div className="organization-tree">
        <h2>Organization Tree</h2>
        <ul>
          {organizationTree.Level1.map(level1Employee => (
            <li key={level1Employee.id} className="level-1">
              <span>{level1Employee.name}</span> - Emp ID: {level1Employee.empId} - Email: {level1Employee.email}
              <ul>
                {organizationTree.Level2[level1Employee.id].map(level2Employee => (
                  <li key={level2Employee.id} className="level-2">
                    <span>{level2Employee.name}</span> - Emp ID: {level2Employee.empId} - Email: {level2Employee.email}
                    <ul>
                      {organizationTree.Level3[level2Employee.id].map(level3Employee => (
                        <li key={level3Employee.id} className="level-3">
                          {level3Employee.name} - Emp ID: {level3Employee.empId} - Email: {level3Employee.email}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {renderTree()}
    </div>
  );
}

export default OrganizationTree;