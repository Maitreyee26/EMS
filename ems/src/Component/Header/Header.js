import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';
import ProfilePicture from '../ProfilePicture';
import pursuit_logo from '../pursuit_logo.png';
import { useAuth } from '../AuthContext';

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const profileContainerRef = useRef(null);
  const {username}=useAuth()
const navigate = useNavigate(); // Initialize useNavigate

  

  const handlelogout = () => {
    navigate("/"); // Navigate to the /addEmployee route
  };
  
 const handleProfile=() =>{
  navigate("/Myprofilepage")
 }
 const handlePasswordChange=()=>{
  navigate(`/setPassword/${username}`)
 }
  useEffect(() => {
    const handleMouseLeave = () => setDropdownVisible(false);

    if (profileContainerRef.current) {
      profileContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (profileContainerRef.current) {
        profileContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  let imgSrc = "";
   // let imgSrc = "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg";

  const handleClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <nav className="navbar header-main">
        <div className="container">
          {/* Pursuit logo */}
          <img src={pursuit_logo} alt="pursuit_logo " className="pursuit-logo" />

          {/* Profile pic and dropdown */}
          <div className="profile-container" onClick={handleClick} ref={profileContainerRef}>
            {dropdownVisible && (
              <div className="dropdown-content">
                {/* Dropdown content goes here */}
                
                 <p onClick={handleProfile}>Profile </p>
                  <p onClick={handlePasswordChange}>Change Password</p>
                  <p onClick={handlelogout}>Logout</p>
                  {/* <p >Logout</p>  */}
                {/* Add more menu items as needed */}
              </div>
            )}
            {imgSrc.length === 0 ? (
              <ProfilePicture />
            ) : (
              <img id="preview" src={imgSrc}  alt="profile_pic" />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
