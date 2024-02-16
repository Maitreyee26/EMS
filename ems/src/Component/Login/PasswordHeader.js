import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './PasswordHeader.css';

import pursuit_logo from '../pursuit_logo.png';

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const profileContainerRef = useRef(null);

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

        </div>
      </nav>
    </div>
  );
}
