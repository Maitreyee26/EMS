// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AdminProfilePageRen from './Component/AdminProfilePage/AdminProfilePageRen';
import EmpRegiRen from './Component/EmployeeRegistration/EmpRegiRen';
import LoginRen from './Component/Login/LoginRen';
import EmpMyDetailsRen from './Component/EmpMyDetails/EmpMyDetailsRen';
// import Documents from './Component/UploadDocument/Documents';
// import AddDepartmentFormRen from './Component/AddDepartment/AddDepartmentFormRen';
import EmpDocumentsRen from './Component/UploadDocument/EmpDocumentsRen';
// import Feed from './Component/Feed/Feed';
import SetPassword from './Component/SetPassword/SetPassword';
import DashBoard from './Component/Feed/DashBoard';
import OtpRen from './Component/OtpRen/OtpRen';
import UserNameRen from './Component/UsernameForPassWord/UserNameRen';
import DashboardRen from './Component/Feed/DashboardRen';
// import Header from './Component/Header/Header';
// import Navbar from './Component/Navbar';
// import Footer from './Component/Footer/FooterDemo';
// import SubHeader from './Component/SubHeader/SubHeader'
import SubHeaderForOrgRen from './Component/SubHeaderForOrg/SubHeaderForOrgRen';
import { AuthProvider} from './Component/AuthContext';
import TaskAssignRen from './Component/TaskAssign/TaskAssignRen';
import AttendanceRen from './Component/AttendanceRender/AttendanceRen';
import PerformanceByManagerRen from './Component/PerformanceByManager/PerformanceByManagerRen';
// import Attendance from './Component/AttendanceRender/Attendance'
// import Demo from './Component/Demo';
// import BarchartForLeave from './Component/BarchartForLeave';
function App() {
  // const [username, setUsername] = useState('');
  const [empId, setEmpId] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [jobId, setJobId] = useState('');
  
  const handleEmpIdChange = (newEmpId) => {
    setEmpId(newEmpId);
  };
  
  return (
    <>
   
     <Router>
      < AuthProvider>
    <Routes>
          {/* <Route path="/AdminProfile" exact element={<AdminProfilePageRen/>} /> */}
         <Route path="/admin/org" element={<SubHeaderForOrgRen/>} />
         <Route path="/addEmployee" element={<EmpRegiRen/>} />
         <Route path="/" element={<LoginRen onEmpIdChange={handleEmpIdChange} />} />
        {/* <Route path="/home" element={<DashboardRen empId={empId} />} /> */}
        <Route path="/home" element={<DashboardRen empId={empId} employeeType={employeeType} jobId={jobId} />} />
         <Route path="/homei" element={<EmpMyDetailsRen/>} />
         <Route path="/emp/uploadDocument" element={<EmpDocumentsRen/>} />

         <Route path="/otp/:username" element={<OtpRen />} />
         <Route path="/setPassword/username" element={<UserNameRen />} />
         <Route path="/setPassword/:username" element={<SetPassword />} />
         <Route path="/admin/performance" element={<PerformanceByManagerRen/>}/>
         <Route path="/Myprofilepage" element={<EmpMyDetailsRen/>} />
         <Route path="/emp/taskassign" element={<TaskAssignRen/>} />
         <Route path="/emp/attendance" element={<AttendanceRen/>} />
            {/* <Route path="/home" element={<DashboardRen empId={empId} />}/> */}
            {/* <Route path="/" element={<SubHeaderForOrgRen/>} /> */}
       </Routes> 
       </ AuthProvider>
    </Router> 


  
    </>
  );
}

export default App;
// {/* <Route path="/setPassword/otp/:id" element={<SetPassword username={username} />} /> */}
//          {/* <Route path="/setPassword/username" element={<UserNameRen/>}/> */}
//          {/* <Route path="/setPassword/username" element={<UserNameRen setUsername={setUsername} />}/> */}
//          {/* <Route path="/setPassword/otp" element={<OtpRen/>}/> */