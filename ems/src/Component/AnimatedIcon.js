// AnimatedLocationIcon.js
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./AnimatedIcon.css";



const AnimatedLocationIcon = () => {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    setIsBouncing(true);

    const timeoutId = setTimeout(() => {
      setIsBouncing(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <FaMapMarkerAlt
      className={isBouncing ? "bouncing" : ""}
      style={{
        fontSize: "24px",
        boxShadow: isBouncing ? "0px 2px 5px rgba(0, 0, 0, 0.2)" : "none",
      }}
    />
  );
};

export default AnimatedLocationIcon;
