import React, {useEffect, useState } from "react";
import Login from './login'
import Footer from '../Footer/Footer'
import PasswordHeader from './PasswordHeader'
import { useAuth } from '../AuthContext';
export default function 
() {
  const { updateEmpId } = useAuth();

  const handleLogin = (newEmpId) => {
    // Perform login logic and then update the empId
    updateEmpId(newEmpId);
  };
  return (
    <div>
        <PasswordHeader/>
        <Login onLogin={handleLogin} />
        <Footer/>
    </div>
  )
}
