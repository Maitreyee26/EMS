import React from 'react'
import Navbar from '../Navbar'
import Header from '../Header/Header'
import FooterDemo from '../Footer/Footer'
import { useAuth } from '../AuthContext';
import SubHeaderForPerformanceByManagerRen from '../SubHeaderForPerformanceByManager/SubHeaderForPerformanceByManagerRen';
import SubHeaderEmp from '../PerformanceByEmployee/SubHeaderEmp';
export default function () {
    const { empId,jobId,employeeId } = useAuth();
  return (
    <div>
        <Header/>
        <Navbar/>
        {jobId===2 || (jobId===3 && employeeId===2) ? <SubHeaderForPerformanceByManagerRen/>:<SubHeaderEmp/>}
        <FooterDemo/>
    </div>
  )
}
