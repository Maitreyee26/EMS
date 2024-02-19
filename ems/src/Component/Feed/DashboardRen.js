import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar'
import DashBoard from './DashBoard'
import FooterDemo from '../Footer/FooterDemo'
import { useAuth } from '../AuthContext';
import CalendarAdmin from './CalenderForAdmin';
import Calendar from './Calender'
import Feed from './Feed';
export default function DashboardRen() {
  const { empId,jobId,employeeId } = useAuth();  // employeeid=>empid, employeeId=>employeetypeid
  console.log("hiiiiiiiiiii",jobId,employeeId)
  return (
    <div>
        <Header/>
        <Navbar/>
        <div className="calendar-feed-container">
      {true?<CalendarAdmin style={{float:"left",width:"50vw",background:"red"}}/>:<Calendar style={{float:"left",width:"50vw",background:"red"}}/>}
      <Feed empid={empId} style={{float:"right",boxShadow: "0 2px 5px rgba(3, 3, 3, 0.2)"}}/>
    </div>
        <FooterDemo/>
    </div>
  )
}
