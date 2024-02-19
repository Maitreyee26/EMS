import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar'
import Taskassign from './Taskassign'
import FooterDemo from '../Footer/Footer'
import { useAuth } from '../AuthContext';
import TaskAssignByManager from './taskassignBymanager.js';
export default function () {
  const { empId,jobId,employeeId } = useAuth();  
  return (
    <div>
    <Header/>
    <Navbar/>
    {jobId===2 || (jobId===3 && employeeId===2)?<TaskAssignByManager/>:<Taskassign/>}
    <FooterDemo/> 
    </div>
  )
}
