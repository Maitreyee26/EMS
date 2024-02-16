import React from 'react'
import Documents from './Documents'
import Header from '../Header/Header'
import Navbar from '../Navbar'
import FooterDemo from '../Footer/Footer'
import SubHeaderUploadDocument from '../SubHeaderUploadDocument/SubHeaderUploadDocument'
export default function EmpDocumentsRen() {
  return (
    <div>
          <Header/>
        <Navbar/>
        <SubHeaderUploadDocument/>
        {/* <Documents/> */}
        <FooterDemo/>
    </div>
  )
}
