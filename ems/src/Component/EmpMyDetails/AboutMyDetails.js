import React, {useState,useEffect} from 'react'
import './AboutMyDetails.css';
import './DropdownButton.css'
import { IoLocationOutline } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";  
import { useAuth } from "../AuthContext";
import { FaUserTie } from "react-icons/fa"; 
import { FcManager } from "react-icons/fc";
import { FaClock, FaCheck } from 'react-icons/fa';
import { IoBagCheckSharp } from "react-icons/io5";
import { FaInfoCircle } from 'react-icons/fa';
const Spinner = () => (
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);


export default function AboutMyDetails() {
  const [employeeData, setEmployeeData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reportingManagerData, setReportingManagerData] = useState(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { username } = useAuth();
  const { empId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pendingStatus, setPendingStatus] = useState(false);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://ems-backend-production-3f3d.up.railway.app/${username}`
        );
        const data = await response.json();
        setEmployeeData(data);
        console.log("userdetails:", data); // Log 'data' instead of 'userDetails'
        // console.log("userdetails:", employeeData.departmentEntity);
        setLoading(false);
       
          setPendingStatus(data.
            approvalStatus);
       
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        setLoading(false);
      }
    };
    const fetchReportingManagerDetails = async () => {
      try {
        // Replace 'API_URL' with the actual URL of the reporting manager API
        const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/${empId}`);
        const data = await response.json();
        setReportingManagerData(data.emp_name);
        console.log("reportingManagerData:", data.emp_name); 
      } catch (error) {
        console.error("Error fetching reporting manager details:", error.message);
      }
    };
    if (username) {
      fetchUserDetails();
      fetchReportingManagerDetails();
    }
  }, [username,empId]);
  const resignEmployee = async () => {
    try {
      const response = await fetch(`https://ems-backend-production-3f3d.up.railway.app/${empId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to resign employee');
      }
      console.log("Employee resigned successfully!");
    } catch (error) {
      console.error("Error while resigning employee:", error);
    }
  };
 
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
 
  const handleItemClick = (action) => {
    if (action === 'resign') {
      resignEmployee(); // Call resignEmployee function when action is "resign"
    }
    setIsOpen(false); // Close dropdown after action
  };
  return (

<>
<div className="about-main-div">
  <div className="grid-container">
    {loading ? (
      <Spinner /> // Display spinner while loading
    ) : employeeData ? (
      <>
        <div className="grid-item">
          <IoLocationOutline /> {employeeData.departmentEntity.location}
        </div>
        <div className="grid-item">
          <AiTwotoneMail /> <a href={`mailto:${employeeData.email}`}>{employeeData.email}</a>
        </div>
        <div className="grid-item">
          <FaPhone /> {employeeData.contact_no}
        </div>
        <div className="grid-item">
          <FaUserTie /> {employeeData.empId}
        </div>
      
     <div className="grid-item">
     <IoBagCheckSharp /> {employeeData.jobRoleEntity.job_role}
     </div>
    <div className="grid-item">
    <FcManager />  {reportingManagerData}
    </div>
   
      </>
    ) : (
      <p>No employee data available.</p>
    )}

<div className="dropdown">
      <button className="dropdown-toggle action-button" onClick={toggleDropdown}>
        Action
      </button>  
      {pendingStatus === false? <span className="aboutmydetails-pending"> Pending</span>:<span className="aboutmydetails-verified"> Verified</span>}
      <span  className='icon-container'> <FaInfoCircle
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      /> {isHovered &&(<span className="hover-text">Primary Details or Contact Details or Address Details may be changed </span>)}</span>
      {console.log("pendingStatus",pendingStatus)}
      {isOpen && (
        <p onClick={() => handleItemClick('resign')} className="dropdown-menu">
          Resign
        </p>
      )}
    </div>
   
  </div>
</div>
</>
);
};
