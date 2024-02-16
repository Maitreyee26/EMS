// Layout.js

import React from 'react';
import Header from './Header/Header';
import Navbar from './Navbar';


const Layout = ({ children }) => {
  return (
    <div>
      <Header />
     
      <div style={{ display: 'flex' }}>
      <Navbar/>
        <main style={{ flexGrow: 1 }}>{children}</main>
        
      </div>
     
    </div>
  );
};

export default Layout;
