import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/Footer';

const MainLayOut = () => {
  return (
    <div>

<Navbar/>
      <Outlet />
      <Footer/>

      
    </div>
  );
};

export default MainLayOut;