// UserContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [empId, setEmpId] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [jobId, setJobId] = useState('');
  const [employeeTypeId, setEmployeeTypeId] = useState('');
  const updateEmpId = (newEmpId) => {
    setEmpId(newEmpId);
  };

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const updateProfilePicture = (newProfilePicture) => {
    setProfilePicture(newProfilePicture);
  };
  const updateJobId = (newJobId) => {
    setJobId(newJobId);
  };

  const updateEmployeeTypeId = (newEmployeeTypeId) => {
    setEmployeeTypeId(newEmployeeTypeId);
  };

  return (
    <AuthContext.Provider
      value={{  empId,
        updateEmpId,
        username,
        updateUsername,
        profilePicture,
        updateProfilePicture,
        jobId,
        updateJobId,
        employeeTypeId,
        updateEmployeeTypeId}}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
