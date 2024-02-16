import React from 'react'
import MyDetailsProfilePic from './MyDetails_ProfilePic'
import AboutMyDetails from './AboutMyDetails'
import MyDetailsDesc from './MyDetailsDesc'
import './MyDetails.css'
export default function My_Details() {
  return (
    <> 
     <div className="my-details-container">
      <MyDetailsProfilePic/>
      <div className="details-info">
      <AboutMyDetails/>
      <MyDetailsDesc/>
     </div>
     </div>
    </>
  )
}
